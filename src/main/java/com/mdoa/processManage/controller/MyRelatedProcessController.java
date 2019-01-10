package com.mdoa.processManage.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.constant.Constant;
import com.mdoa.processManage.po.GetMyRelatedProcessForm;
import com.mdoa.processManage.service.MyProcessService;
import com.mdoa.processManage.service.MyRelatedProcessService;

@RestController
@RequestMapping("relatedProcess")
public class MyRelatedProcessController extends BaseController{
	
	@Autowired
	private MyRelatedProcessService myRelatedProcessService;
	
	@Autowired
	private MyProcessService myProcessService;
	
	@RequestMapping("getProcessList.do")
	public String getProcessList(GetMyRelatedProcessForm getMyRelatedProcessForm, HttpServletRequest request){
		try{
			Gson gson = new Gson();
			getMyRelatedProcessForm.setUserId(getUser(request).getUserId());
			return gson.toJson(myRelatedProcessService.getProcessList(getMyRelatedProcessForm));
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@RequestMapping("callBackProcess.do")
	public String callBackProcess(String processRecordId){
		try{
			myRelatedProcessService.callBackProcess(processRecordId);
			return Constant.SUCCESS_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@RequestMapping("getProcessFormMessage.do")
	public String getProcessFormMessage(String processRecordId){
		try{
			return myRelatedProcessService.getProcessFormMessage(processRecordId);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@RequestMapping("getProcessExecutor.do")
	public String getProcessExecutor(String processRecordId){
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("processRecordId", processRecordId);
			Gson gson = new Gson();
			return gson.toJson(myProcessService.getProcessMessage(params, true));
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
}
