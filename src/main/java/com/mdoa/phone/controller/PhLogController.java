package com.mdoa.phone.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.JsonReturnObject;
import com.mdoa.base.model.PageModel;
import com.mdoa.user.model.UserInfo;
import com.mdoa.work.bo.LogForm;
import com.mdoa.work.service.LogService;

@RequestMapping("/phLog")
@RestController
public class PhLogController extends BaseController{

	@Autowired
	private LogService logService;
	
	/**
	 * 添加日志
	 */
	@RequestMapping("/addLog.ph")
	public String addLog(LogForm logForm,HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			UserInfo userInfo = (UserInfo)getPhSession(request).getAttribute("userInfo");
			logForm.setCreateUserId(userInfo.getUserId());
			logForm.setCreateUserName(userInfo.getUserName());
			
			jro.setMessage(logService.addLog(logForm));
			jro.setSuccess(true);
		}  catch (Exception e) {
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	
	/**
	 * 查询个人日志
	 */
	@RequestMapping("/queryYourselfLog.ph")
	public String queryYourselfLog(LogForm logForm,HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			UserInfo userInfo = (UserInfo)getPhSession(request).getAttribute("userInfo");
			logForm.setCreateUserId(userInfo.getUserId());
			logForm.setCreateUserName(userInfo.getUserName());
			PageModel<LogForm> pageModel = logService.queryYourselfLog(logForm);
			jro.setReturnObj(pageModel);
			jro.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();
			jro.setSuccess(false);
			jro.setMessage(e.getMessage());
		}
		return gson.toJson(jro);
	}
	/**
	 * 修改日志
	 */
	@RequestMapping("/updateYourselfLog.ph")
	public String updateYourselfLog(LogForm logForm,HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			UserInfo userInfo = (UserInfo)getPhSession(request).getAttribute("userInfo");
			logForm.setUpdateUserId(userInfo.getUserId());
			logForm.setUpdateUserName(userInfo.getUserName());
			
			jro.setMessage(logService.updateYourselfLog(logForm));
			jro.setSuccess(true);
		}  catch (Exception e) {
			e.printStackTrace();
			jro.setSuccess(false);
			jro.setMessage(e.getMessage());
		}
		return gson.toJson(jro);
	}
	/**
	 * 查询下级日志
	 */
	@RequestMapping("/querySubLog.ph")
	public String querySubLog(LogForm logForm,HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			UserInfo userInfo = (UserInfo)getPhSession(request).getAttribute("userInfo");
			logForm.setLeadId(userInfo.getUserId());
			PageModel<LogForm> pageModel = logService.querySubLog(logForm);
			jro.setReturnObj(pageModel);
			jro.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();
			jro.setSuccess(false);
			jro.setMessage(e.getMessage());
		}
		return gson.toJson(jro);
	}
	/**
	 * 查询自己和下级的日志
	 */
	@RequestMapping("/queryOneselfAndSubLog.ph")
	public String queryOneselfAndSubLog(LogForm logForm,HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			UserInfo userInfo = (UserInfo)getPhSession(request).getAttribute("userInfo");
			System.out.println("name="+userInfo.getUserName());
			logForm.setLeadId(userInfo.getUserId());
			PageModel<LogForm> pageModel = logService.queryOneselfAndSubLog(logForm);
			jro.setReturnObj(pageModel);
			jro.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();
			jro.setSuccess(false);
			jro.setMessage(e.getMessage());
		}
		return gson.toJson(jro);
	}
	
}
