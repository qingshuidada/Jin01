package com.mdoa.processManage.dao;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mdoa.base.dao.BaseDao;
import com.mdoa.dictionary.model.Dictionary;
import com.mdoa.user.model.UserInfo;

@RequestMapping("process")
@RestController
public interface ProcessDao extends BaseDao{
	
	public List<UserInfo> queryUserList(UserInfo userInfo);
	
	public boolean addAllUser(UserInfo userInfo);
	
	public boolean addUser(Map<String, String> params);
	
	public boolean deleteUser(Map<String, String> params);
	
	public List<UserInfo> getSelectedUserList(UserInfo userInfo);
	
	public boolean deleteRepetitionUser();
	
	public List<Dictionary> getDirc(String selectKey);
}
