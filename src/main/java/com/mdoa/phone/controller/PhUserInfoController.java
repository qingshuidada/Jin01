package com.mdoa.phone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.model.JsonReturnObject;
import com.mdoa.user.model.UserInfo;
import com.mdoa.user.service.UserInfoService;

@RestController
@RequestMapping("/phUserInfo")
public class PhUserInfoController {
	
	@Autowired
	private UserInfoService userInfoService;
	
	/**
	 * 查询基本信息
	 */
	@RequestMapping("/selectUserInfo.ph")
	public String selectUserInfo(UserInfo userInfo){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try{
			jro.setSuccess(true);
			jro.setReturnObj(userInfoService.selectUserInfo(userInfo));
			return gson.toJson(jro);
		}catch(Exception e){
			e.printStackTrace();
			jro.setSuccess(false);
			jro.setMessage(e.getMessage());
			return gson.toJson(jro);
		}
	}
}
