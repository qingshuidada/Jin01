package com.mdoa.phone.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.JsonReturnObject;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.processManage.model.ProcessMessage;
import com.mdoa.processManage.po.GetMyRelatedProcessForm;
import com.mdoa.processManage.service.MyProcessService;
import com.mdoa.processManage.service.MyRelatedProcessService;
import com.mdoa.user.model.UserInfo;

@RestController
@RequestMapping("/phMyRelated")
public class PhMyRelatedProcessController extends BaseController{

	@Autowired
	private MyRelatedProcessService myRelatedProcessService;
	
	@Autowired
	private MyProcessService myProcessService;
	
	
	@RequestMapping("getProcessFormMessage.ph")
	public String getProcessFormMessage(String processRecordId){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try{
			jro.setMessage(myRelatedProcessService.getProcessFormMessage(processRecordId));
			jro.setSuccess(true);
		}catch(Exception e){
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	
	@RequestMapping("getProcessList.ph")
	public String getProcessList(GetMyRelatedProcessForm getMyRelatedProcessForm, HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try{
			UserInfo userInfo = (UserInfo) getPhSession(request).getAttribute("userInfo");
			getMyRelatedProcessForm.setUserId(userInfo.getUserId());
			PageModel<ProcessMessage> pageModel = myRelatedProcessService.getProcessList(getMyRelatedProcessForm);
			jro.setReturnObj(pageModel);
			jro.setSuccess(true);
		}catch(Exception e){
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	
	@RequestMapping("getProcessExecutor.ph")
	public String getProcessExecutor(String processRecordId,HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try{
			UserInfo userInfo = (UserInfo) getPhSession(request).getAttribute("userInfo");
			Map<String, String> params = new HashMap<String, String>();
			params.put("processRecordId", processRecordId);
			ProcessMessage processMessage = myProcessService.getProcessMessage(params, true);
			jro.setReturnObj(processMessage);
			jro.setSuccess(true);
		}catch(Exception e){
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	
}
