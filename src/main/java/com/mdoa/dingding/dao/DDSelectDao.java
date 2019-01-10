package com.mdoa.dingding.dao;

import com.mdoa.user.model.UserInfo;

public interface DDSelectDao {

	UserInfo selectUserInfo(String userName);
}
