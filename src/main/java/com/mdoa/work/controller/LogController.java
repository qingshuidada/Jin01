package com.mdoa.work.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.user.model.UserInfo;
import com.mdoa.work.bo.LogForm;
import com.mdoa.work.service.LogService;

@RequestMapping("/log")
@RestController
public class LogController extends BaseController{

	@Autowired
	private LogService logService;
	
	/**
	 * 添加日志
	 */
	@RequestMapping("/addLog.do")
	public String addLog(LogForm logForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			logForm.setCreateUserId(userInfo.getUserId());
			logForm.setCreateUserName(userInfo.getUserName());
			logService.addLog(logForm);
			
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
		
	}
	
	/**
	 * 查询个人日志
	 */
	@RequestMapping("/queryYourselfLog.do")
	public String queryYourselfLog(LogForm logForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			logForm.setCreateUserId(userInfo.getUserId());
			logForm.setCreateUserName(userInfo.getUserName());
			System.out.println("================"+userInfo.getUserId()+",,,,"+userInfo.getUserName()+",,,,"+logForm.getYourSelfFlag());
			PageModel<LogForm> pageModel = logService.queryYourselfLog(logForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			System.out.println(jsonString);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 修改日志
	 */
	@RequestMapping("/updateYourselfLog.do")
	public String updateYourselfLog(LogForm logForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			logForm.setUpdateUserId(userInfo.getUserId());
			logForm.setUpdateUserName(userInfo.getUserName());
			logService.updateYourselfLog(logForm);
			
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 查询下级日志
	 */
	@RequestMapping("/querySubLog.do")
	public String querySubLog(LogForm logForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			logForm.setLeadId(userInfo.getUserId());
			PageModel<LogForm> pageModel = logService.querySubLog(logForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 查询自己和下级的日志
	 */
	@RequestMapping("/queryOneselfAndSubLog.do")
	public String queryOneselfAndSubLog(LogForm logForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			System.out.println("name="+userInfo.getUserName());
			logForm.setLeadId(userInfo.getUserId());
			PageModel<LogForm> pageModel = logService.queryOneselfAndSubLog(logForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
}
