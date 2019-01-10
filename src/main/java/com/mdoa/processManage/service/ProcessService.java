package com.mdoa.processManage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.base.model.PageModel;
import com.mdoa.dictionary.model.Dictionary;
import com.mdoa.processManage.dao.ProcessDao;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.StringUtil;

@Service
public class ProcessService {
	
	@Autowired
	private ProcessDao processDao;
	
	public PageModel<UserInfo> queryUserList(UserInfo userInfo){
		PageHelper.startPage(userInfo.getPage(), userInfo.getRows());
		userInfo.setDepartmentUrl(StringUtil.toLikeRight(userInfo.getDepartmentUrl()));
		userInfo.setUserName(StringUtil.toLikeAll(userInfo.getUserName()));
		List<UserInfo> list = processDao.queryUserList(userInfo);
		PageModel<UserInfo> page = new PageModel<UserInfo>((Page<UserInfo>) list);
		return page;
	}
	
	public String addAllUser(UserInfo userInfo){
		if(StringUtil.isEmpty(userInfo.getGroupId())){
			userInfo.setGroupId(processDao.getuuid());
		}
		userInfo.setDepartmentUrl(StringUtil.toLikeRight(userInfo.getDepartmentUrl()));
		userInfo.setUserName(StringUtil.toLikeAll(userInfo.getUserName()));
		processDao.addAllUser(userInfo);
		processDao.deleteRepetitionUser();
		return userInfo.getGroupId();
	}
	
	public String addUser(String userId, String groupId){
		if(StringUtil.isEmpty(groupId)){
			groupId = processDao.getuuid();
		}
		Map<String, String> params = new HashMap<String ,String>();
		params.put("userId", userId);
		params.put("groupId", groupId);
		processDao.addUser(params);
		processDao.deleteRepetitionUser();
		return groupId;
	}
	
	public void deleteUser(String userId, String groupId){
		Map<String, String> params = new HashMap<String ,String>();
		params.put("userId", userId);
		params.put("groupId", groupId);
		processDao.deleteUser(params);
	}
	
	public PageModel<UserInfo> getSelectedUserList(UserInfo userInfo){
		userInfo.setDepartmentUrl(StringUtil.toLikeRight(userInfo.getDepartmentUrl()));
		userInfo.setUserName(StringUtil.toLikeAll(userInfo.getUserName()));
		PageHelper.startPage(userInfo.getPage(), userInfo.getRows());
		List<UserInfo> list = processDao.getSelectedUserList(userInfo);
		PageModel<UserInfo> page = new PageModel<UserInfo>((Page<UserInfo>) list);
		return page;
	}
	
	public List<Dictionary> getDirc(String selectKey){
		return processDao.getDirc(selectKey);
	}
	
}
