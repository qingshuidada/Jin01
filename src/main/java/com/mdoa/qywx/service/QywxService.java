package com.mdoa.qywx.service;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mdoa.qywx.bo.CheckAccountForm;
import com.mdoa.qywx.bo.ClickEventMessage;
import com.mdoa.qywx.bo.QywxForm;
import com.mdoa.qywx.bo.ReplyTextMessage;
import com.mdoa.qywx.dao.QywxDao;
import com.mdoa.qywx.util.XMLParse;
import com.mdoa.util.Md5Util;
import com.mdoa.weixin.bo.WeixinForm;
import com.mdoa.weixin.util.MessageUtil;
import com.zhou.myProcess.instance.TaskModel;




@Service
public class QywxService{

	@Autowired
	private QywxDao qywxDao;
	
	/**
	 * 绑定oa账号
	 * @param qywxForm
	 */
	public void bindOaAccount(QywxForm qywxForm) {
		qywxForm.setPassword(Md5Util.getMd5Str(qywxForm.getPassword()));
		List<CheckAccountForm> checkAccountForms = qywxDao.checkBind(qywxForm.getQywxUserId());
		CheckAccountForm checkAccountForm = checkAccountForms.get(0);
		if("1".equals(checkAccountForm.getIsBound()))
			throw new RuntimeException("您的微信已绑定账号：" + checkAccountForm.getUserAccount());
		checkAccountForms = qywxDao.checkAccountStatus(qywxForm);
		checkAccountForm = checkAccountForms.get(0);
		System.out.println(checkAccountForm.toString());
		if("0".equals(checkAccountForm.getIsChecked()))
			throw new RuntimeException("账号或密码不正确！");
		if("1".equals(checkAccountForm.getIsBound()))
			throw new RuntimeException(checkAccountForm.getUserAccount() + "的账号已绑定UserId为：" + checkAccountForm.getBindingUserId() + "的微信号！");
		qywxForm.setUpdateUserId(checkAccountForm.getUserId());
		qywxForm.setUpdateUserName(checkAccountForm.getUserName());
		if(!qywxDao.bindOaAccount(qywxForm))
			throw new RuntimeException("未知原因，绑定账号失败，请稍后重试！");
	}
	
	/**
	 * 判断微信号是否已绑定账号
	 * @param userId
	 * @return
	 */
	public boolean checkBind(String qywxUserId) {
		List<CheckAccountForm> checkAccountForms = qywxDao.checkBind(qywxUserId);
		CheckAccountForm checkAccountForm = checkAccountForms.get(0);
		if("0".equals(checkAccountForm.getIsBound()))
			return false;
		return true;
	}
	
	public boolean checkReportAuthority(String qywxUserId){
		List<CheckAccountForm> checkAccountForms = qywxDao.checkBind(qywxUserId);
		CheckAccountForm checkAccountForm = checkAccountForms.get(0);
		if("1".equals(checkAccountForm.getReportAuthorityFlag())){
			return true;
		}else{
			return false;
		}
	}
	
	/**
	 * 通过qywxUserId获取账号密码
	 * @param request
	 * @param qywxUserId
	 * @return
	 */
	public QywxForm getAccount(HttpServletRequest request, String qywxUserId) {
		List<QywxForm> qywxForms = qywxDao.getAccount(qywxUserId);
		if(qywxForms == null || qywxForms.size() != 1)
			throw new RuntimeException("数据异常，请确认微信号是否已绑定账号！");
		QywxForm qywxForm = qywxForms.get(0);
		return qywxForm;
	}

	/**
	 * 将map中消息装入对应消息类对象中
	 * @param map
	 * @return
	 */
	public ClickEventMessage getMessageFromMap(Map<String, String> map) {
		ClickEventMessage clickEventMessage = new ClickEventMessage();
		clickEventMessage.setToUserName(map.get("ToUserName"));
		clickEventMessage.setFromUserName(map.get("FromUserName"));
		clickEventMessage.setCreateTime(Long.parseLong(map.get("CreateTime")));
		clickEventMessage.setMsgType(map.get("MsgType"));
		clickEventMessage.setEvent(map.get("Event"));
		clickEventMessage.setEventKey(map.get("EventKey"));
		clickEventMessage.setAgentID(Integer.parseInt(map.get("AgentID")));
		System.out.println(clickEventMessage);
		return clickEventMessage;
	}

	/**
	 * 解除绑定oa账号
	 * @param clickEventMessage
	 * @return 明文xml字符串
	 */
	public String unBindOaAccount(ClickEventMessage clickEventMessage) throws Exception{
		QywxForm qywxForm = new QywxForm();
		qywxForm.setQywxUserId(clickEventMessage.getFromUserName());
		List<CheckAccountForm> checkAccountForms = qywxDao.checkBind(qywxForm.getQywxUserId());
		CheckAccountForm checkAccountForm = checkAccountForms.get(0);
		boolean isNotBound = false;
		boolean isSuccess = true;
		if("0".equals(checkAccountForm.getIsBound()))
			isNotBound = true;
		if(!qywxDao.unBindOaAccount(qywxForm))
			isSuccess = false;
		ReplyTextMessage replyTextMessage = new ReplyTextMessage();
		System.out.println("成员userId：" + clickEventMessage.getFromUserName() + "\n企业corpId：" + clickEventMessage.getToUserName());
		replyTextMessage.setMsgType("text");
		replyTextMessage.setCreateTime(System.currentTimeMillis());
		replyTextMessage.setFromUserName(clickEventMessage.getToUserName());
		replyTextMessage.setToUserName(clickEventMessage.getFromUserName());
		if(isNotBound){
			replyTextMessage.setContent("微信尚未绑定账号,请确认！");
		}else if(!isSuccess){
			replyTextMessage.setContent("未知原因解绑失败，稍后重试！");
		}else {
			replyTextMessage.setContent("解绑成功！");
		}
		String decrpt = XMLParse.objectToXml(replyTextMessage);
		System.out.println("decrpt明文：" + decrpt);
		return decrpt;
	}
	
	/**
	 * 解除绑定erp
	 * @param clickEventMessage
	 * @return
	 */
	public String unBindAccount(ClickEventMessage clickEventMessage) {
	    	QywxForm qywxForm = new QywxForm();
		qywxForm.setQywxUserId(clickEventMessage.getFromUserName());
		List<CheckAccountForm> checkAccountForms = qywxDao.checkErpBind(qywxForm.getQywxUserId());
//	    	WeixinForm weixinForm = new WeixinForm();
//		weixinForm.setOpenId(textMessage.getToUserName());
//		List<WeixinForm> list = weixinDao.checkOpenForUserHaveOpenId(weixinForm);  //查询该用户是否已经绑定账号
//		if(list != null && list.size() >0){
//			if (!weixinDao.unBind(weixinForm)){
//				textMessage.setContent("未知原因，解除失败");
//			}else{
//				textMessage.setContent("解除成功");
//			}
//		}else{
//		    textMessage.setContent("该用户未绑定账号，解除失败");
//		}
//		request.setCharacterEncoding("UTF-8");
//		response.setCharacterEncoding("UTF-8");
//		PrintWriter out = null;
//		try {
//			out = response.getWriter();
//			String message = null;
//			System.out.println("开发者微信号="+textMessage.getFromUserName());
//			
//			textMessage.setMsgType("text");
//			message = MessageUtil.textMessageToXml(textMessage);
//			System.out.println(message);
//			out.println(message);
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		out.close();
	    return null;
	}
	
	/**
	 * 获取qywxUserId sex userName
	 * @param userId
	 * @return
	 */
	public List<QywxForm> getQywxUserId(String userId) {
		List<QywxForm> qywxForms = qywxDao.getQywxUserId(userId);
		return qywxForms;
	}
	
	/**
	 * 查询抄送任务
	 * @param processId
	 * @return
	 */
	public List<TaskModel> getCopyTask(String processId) {
		return qywxDao.getCopyTask(processId);
	}

	public TaskModel getFirstTask(String taskId) {
	    	List<TaskModel> taskModels = qywxDao.getFirstTask(taskId);
		if(taskModels != null && taskModels.size() >0){
			return taskModels.get(0);
		}
		return null;
	}

	

}
