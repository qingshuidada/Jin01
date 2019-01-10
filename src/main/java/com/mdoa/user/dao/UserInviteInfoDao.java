package com.mdoa.user.dao;

import java.util.List;

import com.mdoa.base.dao.BaseDao;
import com.mdoa.user.model.UserInfo;

public interface UserInviteInfoDao extends BaseDao{
	
	/**
	 * 根据前端传入的信息，添加用户基本信息，然后返回用户Id
	 * @param userInfo
	 * @return
	 */
	boolean saveUserInfo(UserInfo userInfo);
	
	/**
	 * 查询用户信息
	 * @param userInfo
	 * @return
	 */
	List<UserInfo> selectUserInfo(UserInfo userInfo);
	/**
	 * 查询用户信息
	 * @param userInfo
	 * @return
	 */
	List<UserInfo> selectInviteUser(UserInfo userInfo);
	/**
	 * 修改用户信息
	 * @param userInfo
	 * @return
	 */
	boolean updateUserInfo(UserInfo userInfo);
	
	/**
	 * 验证是否有在职的该身份证号员工
	 */
	Integer checkOnJobUser(String userId);
}