package com.mdoa.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.app.bo.SeventhPageForm;
import com.mdoa.app.model.AppContact;
import com.mdoa.app.model.AppOnlineMessage;
import com.mdoa.app.service.SeventhPageService;
import com.mdoa.constant.Constant;

@RestController
@RequestMapping("/seventhPage")
public class SeventhPageController {

	@Autowired
	private SeventhPageService seventhPageService;
	@RequestMapping("/selectAllMessage.do")
	public String selectAllMessage(){
		Gson gson = new Gson();
		try{
			SeventhPageForm pageForm = seventhPageService.selectAllMessage();
			return gson.toJson(pageForm);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	@RequestMapping("/addOnlineMessage.do")
	public String addOnlineMessage(AppOnlineMessage message){
		try {
			seventhPageService.addOnlineMessage(message);
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	@RequestMapping("/selectAppContact.do")
	public String selectAppContact(){
		Gson gson = new Gson();
		try{
			List<AppContact> list = seventhPageService.selectAppContact();
			return gson.toJson(list);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@RequestMapping("/updateContact.do")
	public String updateContact(AppContact appContact){
		try {
			seventhPageService.updateContact(appContact);
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
}
