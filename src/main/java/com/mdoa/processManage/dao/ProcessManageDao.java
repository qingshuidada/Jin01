package com.mdoa.processManage.dao;

import java.util.List;
import java.util.Map;

import com.mdoa.processManage.po.GroupForm;
import com.mdoa.user.model.UserInfo;
import com.zhou.myProcess.instance.GroupModel;
import com.zhou.myProcess.instance.TaskModel;

public interface ProcessManageDao {
	
	List<GroupModel> getGroupList(GroupForm groupForm);

	boolean updateGroupName(GroupModel group);
	
	boolean addGroup(GroupModel group);
	
	boolean deleteGroup(GroupModel group);
	
	boolean addMustUser(Map<String, String> params);
	
	boolean addAllMustUser(UserInfo userInfo);
	
	void deleteRepetitionGroupUser();
	
	List<UserInfo> getGroupUserList(UserInfo userInfo);

	List<TaskModel> getProcessMustTask(Map<String, String> params);
	
	List<TaskModel> getProcessMustCopyToTask(Map<String, String> params);
}
