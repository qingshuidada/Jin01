package com.mdoa.processManage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.base.model.PageModel;
import com.mdoa.processManage.dao.MyProcessDao;
import com.mdoa.processManage.dao.ProcessManageDao;
import com.mdoa.processManage.model.ProcessMessage;
import com.mdoa.processManage.po.GroupForm;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.StringUtil;
import com.zhou.myProcess.instance.GroupModel;
import com.zhou.myProcess.instance.GroupTaskModel;
import com.zhou.myProcess.process.ProcessEngine;
import com.zhou.myProcess.service.ExecutorService;
import com.zhou.myProcess.util.ProcessConstant;

@Service
@Transactional
public class ProcessManageService {
	
	@Autowired
	private ProcessManageDao processManageDao;
	
	@Autowired
	private MyProcessDao myProcessDao;
	
	@Autowired
	private ProcessEngine processEngine;
	
	public PageModel<GroupModel> getGroupList(GroupForm groupForm){
		groupForm.setGroupName(StringUtil.toLikeAll(groupForm.getGroupName()));
		PageHelper.startPage(groupForm.getPage(), groupForm.getRows());
		List<GroupModel> groups = processManageDao.getGroupList(groupForm);
		return new PageModel<GroupModel>((Page<GroupModel>)groups);
	}

	public void updateGroupName(GroupModel group){
		if(!processManageDao.updateGroupName(group)){
			throw new RuntimeException("修改用户组名称失败");
		}
	}
	
	public void addGroup(GroupModel group){
		if(!processManageDao.addGroup(group)){
			throw new RuntimeException("添加用户组信息失败");
		}
	}
	
	public void deleteGroup(GroupModel group){
		if(!processManageDao.deleteGroup(group)){
			throw new RuntimeException("删除用户组信息失败");
		}
	}
	
	public ProcessMessage getMustTask(String groupId, String processTypeId){
		ProcessMessage message = new ProcessMessage();
		Map<String, String> params = new HashMap<String, String>(); 
		params.put("groupId", groupId);
		params.put("processTypeId", processTypeId);
		message.setTypeId(params.get("processTypeId"));
		message.setMustExcuteUserHead(processManageDao.getProcessMustTask(params));
		message.setMustCopyToUsers(processManageDao.getProcessMustCopyToTask(params));
		return message;
	}
	
	public String addMustTask(GroupTaskModel task) throws Exception{
		return processEngine.getProcessService().addGroupTask(task, ProcessConstant.USER_TASK);
	}
	
	public String addMustCopyToTask(GroupTaskModel task) throws Exception{
		return processEngine.getProcessService().addGroupTask(task, ProcessConstant.COPY_TO_TASK);
	}
	
	public PageModel<UserInfo> getGroupUserList(UserInfo userInfo){
		userInfo.setUserName(StringUtil.toLikeAll(userInfo.getUserName()));
		PageHelper.startPage(userInfo.getPage(), userInfo.getRows());
		List<UserInfo> list = processManageDao.getGroupUserList(userInfo);
		return new PageModel<UserInfo>((Page<UserInfo>)list);
	}
	
	public void addMustUser(String userId, String groupId){
		Map<String, String> params = new HashMap<String, String>();
		params.put("userId", userId);
		params.put("groupId", groupId);
		processManageDao.addMustUser(params);
		processManageDao.deleteRepetitionGroupUser();
	}
	
	public void addAllMustUser(UserInfo userInfo){
		processManageDao.addAllMustUser(userInfo);
		processManageDao.deleteRepetitionGroupUser();
	}
	
	public void deleteTask(GroupTaskModel task, String taskType) throws Exception{
		Map<String, String> params = new HashMap<String, String>();
		ExecutorService processService = processEngine.getProcessService();
		processService.deleteGroupTask(task, taskType);
	}
}
