package com.mdoa.system.service;
/**
 * 系统信息
 */
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.google.gson.Gson;
import com.mdoa.base.model.PageModel;
import com.mdoa.system.bo.UrgeProcessForm;
import com.mdoa.system.dao.MessageDao;
import com.mdoa.system.model.UserSystemMessage;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.StringUtil;
import com.zhou.myProcess.instance.ProcessModel;
import com.zhou.myProcess.instance.TaskModel;
import com.zhou.myProcess.util.SendMessage;


@Service
public class MessageService implements SendMessage{
	@Autowired
	private MessageDao messageDao;
	
	/**
	 * 将需要对用户发送的消息，存储到数据库中
	 * @param message 对象中，包含以下参数
	 * @param userId 接收人UserId
	 * @param url 只能使用MessageConstant包中的地址，用于跳转，如果不跳转可以为空
	 */
	public void sendSystemMessage(UserSystemMessage message, String permission){
		message.setSendTime(new SimpleDateFormat().format(new Date()));
		if (!StringUtil.isEmpty(permission) && StringUtil.isEmpty(message.getUserId())) {
			//执行其他操作，对具有某个权限的用户进行发送消息（批量发送）
			//查询拥有permission权限的人员
			List<UserSystemMessage> list = messageDao.selectpermissionUser(permission);
			for (int i = 0; i < list.size(); i++) {
				message.setUserId(list.get(i).getUserId());
				if (!messageDao.addSystemMessage(message)) {
					throw new RuntimeException("添加一条信息失败");
				}
			}
		}else if(StringUtil.isEmpty(permission) && !StringUtil.isEmpty(message.getUserId())){
			//执行正常操作，对一个用户添加消息
			if (!messageDao.addSystemMessage(message)){
				throw new RuntimeException("增加一条消息失败");
			}	
		}
		
	}
	/**
	 * 查询系统信息
	 * @param userSystemMessage
	 * @param request
	 * @return
	 */
	public PageModel<UserSystemMessage> selectMessageByUser(UserSystemMessage message,HttpServletRequest request){
		//获取到当前登录的人
		UserInfo userInfo = getUser(request);
		message.setUserId(userInfo.getUserId());
		if (!StringUtil.isEmpty(message.getSendUserName())) {
			message.setSendUserName(message.getSendUserName()+"%");//根据发送人右模糊查询
		}
		PageHelper.startPage(message.getPage(), message.getRows());
		List<UserSystemMessage> list = messageDao.selectMessageByUser(message);
		PageModel<UserSystemMessage> pageModel = new PageModel<>((Page<UserSystemMessage>)list);
		return pageModel;
	}
	/**
	 * 更改信息为已读
	 * @param message
	 */
	public void updateMessageRead(UserSystemMessage message){
		if (!messageDao.updateMessageRead(message)) {
			throw new RuntimeException("更改信息为已读失败");
		}
	}
	/**
	 * 发送结束流程的消息
	 */
	@Override
	public void sendEndMessage(ProcessModel process, List<TaskModel> copyToTasks) {
		Map<String, String> mapParams = null;
		UserSystemMessage userSystemMessage = new UserSystemMessage();
		userSystemMessage.setSendUserId("system");
		userSystemMessage.setSendUserName("系统");
		userSystemMessage.setUrl(process.getFormUrl());
		userSystemMessage.setUserId(process.getUserId());
		if (process.getJsonData() != null) 
			mapParams = new Gson().fromJson(process.getJsonData(), HashMap.class);
		String type = process.getProcessTypeName();
		if (process.getExecuteStatus().equals("3")){//驳回
			userSystemMessage.setMessage("您的"+type+"<"+mapParams.get("title")+"> 被驳回");
			if (!messageDao.addSystemMessage(userSystemMessage))
				throw new RuntimeException("增加一条消息失败");
		}else if (process.getExecuteStatus().equals("2")) {//通过
			userSystemMessage.setMessage("您的"+type+":<"+mapParams.get("title")+"> 已通过");//给发起人
			if (!messageDao.addSystemMessage(userSystemMessage))
				throw new RuntimeException("增加一条消息失败");
			if (copyToTasks != null) {
				for(TaskModel copyToTask : copyToTasks){
					userSystemMessage.setMessage("抄送消息："+":<"+mapParams.get("title")+">的"+type);
					userSystemMessage.setUserId(copyToTask.getExecutorId());
					if (!messageDao.addSystemMessage(userSystemMessage))
						throw new RuntimeException("增加一条消息失败");
				}
			}else{  
				System.out.println("找不到抄送人");
			}
		}
	}
	/**
	 * 发送下一个审批人的消息
	 */
	@Override
	public void sendNextMessage(ProcessModel process, TaskModel taskModel) {
		UserSystemMessage userSystemMessage = new UserSystemMessage();
		userSystemMessage.setUrl(process.getFormUrl());
		userSystemMessage.setSendUserId("system");
		userSystemMessage.setSendUserName("系统");
		userSystemMessage.setUserId(taskModel.getExecutorId());
		userSystemMessage.setMessage("您有一条"+process.getUserName()+"发起的"+process.getProcessTypeName()+"流程需要你审批");
		if (!messageDao.addSystemMessage(userSystemMessage))
			throw new RuntimeException("增加一条消息失败");
	}
	
	private UserInfo getUser(HttpServletRequest request){
		return (UserInfo)request.getSession().getAttribute("userInfo");
	}
	
	/**
	 * 插入一条催办消息
	 * @param urgeProcessForm
	 */
	public void insertUrgeProcessMessage(UrgeProcessForm urgeProcessForm) {
		if (!messageDao.insertUrgeProcessMessage(urgeProcessForm)){
			throw new RuntimeException("增加催办消息失败");
		}
		
	}
}
