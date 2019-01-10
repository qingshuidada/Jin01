package com.mdoa.phone.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.JsonReturnObject;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.personnel.bo.ClockDayDetail;
import com.mdoa.personnel.bo.ClockForm;
import com.mdoa.personnel.bo.ClockMonthForm;
import com.mdoa.personnel.bo.ClockState;
import com.mdoa.personnel.bo.OutBusinessRecordForm;
import com.mdoa.personnel.dao.ClockDao;
import com.mdoa.personnel.model.AttendanceWifi;
import com.mdoa.personnel.model.OutBusinessRecord;
import com.mdoa.personnel.service.ClockService;
import com.mdoa.personnel.service.OutBusinessRecordService;
import com.mdoa.user.model.UserInfo;

@RestController
@RequestMapping("/phClock")
public class PhClockController extends BaseController{
	
	@Autowired
	private ClockService clockService;
	
	@Autowired
	private ClockDao clockDao;
	@Autowired
	private OutBusinessRecordService outBusinessRecordService;
	
	/**
	 * 查询请假记录
	 * @param 
	 * @return
	 */
	@RequestMapping("/selectOutBusinessRecord.ph")
	public String selectOutBusinessRecord(OutBusinessRecordForm outBusinessRecordForm,HttpServletRequest request) {
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			UserInfo userInfo = (UserInfo) getPhSession(request).getAttribute("userInfo");
			outBusinessRecordForm.setUserId(userInfo.getUserId());
			PageModel<OutBusinessRecord> pageInfo = outBusinessRecordService.selectOutBusinessRecord(outBusinessRecordForm);
			
			jro.setSuccess(true);
			jro.setReturnObj(pageInfo);
		} catch (Exception e) {
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	/**
	 * 修改公出记录
	 */
	@RequestMapping("/updateOutBusinessRecord.ph")
	public String updateOutBusinessRecord(OutBusinessRecordForm outBusinessRecordForm,HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			String string = outBusinessRecordService.updateOutBusinessRecord(outBusinessRecordForm);
			jro.setSuccess(true);
			jro.setMessage(string);
		} catch (RuntimeException e) {
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}catch (Exception e) {
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	/**
	 * 获取系统当前时间 以及打卡信息 check
	 * @param request
	 * @param clockForm
	 * @return
	 */
	@RequestMapping("/getMyClockState.ph")
	public String getMyClockState(HttpServletRequest request, ClockForm clockForm){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			UserInfo userInfo = (UserInfo) getPhSession(request).getAttribute("userInfo");
			clockForm.setIsPhone("1");
			ClockState clockState = clockService.getMyClockState(request,clockForm,userInfo);
			jro.setSuccess(true);
			jro.setReturnObj(clockState);
		} catch (Exception e) {
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	
	/**
	 * 用户打卡
	 */
	@RequestMapping("/clock.ph")
	public String clock(HttpServletRequest request, ClockForm clockForm){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			UserInfo userInfo = (UserInfo) getPhSession(request).getAttribute("userInfo");
			clockForm.setIsPhone("1");
			jro.setMessage(clockService.clock(request, clockForm,userInfo));
			jro.setSuccess(true);
		}catch (Exception e) {
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	
	/**
	 * 获取我的月打卡记录以及汇总信息
	 * @param request
	 * @return
	 */
	@RequestMapping("/getMyClockMonthForm.ph")
	public String getMyClockMonthForm(HttpServletRequest request , ClockForm clockForm){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			UserInfo userInfo = (UserInfo) getPhSession(request).getAttribute("userInfo");
			ClockMonthForm clockMonthForm = clockService.getMyClockMonthForm(request,clockForm,userInfo);
			jro.setReturnObj(clockMonthForm);
			jro.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	
	/**
	 * 获取某天详细考勤信息
	 * @param clockForm
	 * @return
	 */
	@RequestMapping("/getClockDayDetail.ph")
	public String getClockDayDetail(ClockForm clockForm){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			ClockDayDetail clockDayDetail = clockService.getClockDayDetail(clockForm);
			jro.setReturnObj(clockDayDetail);
			jro.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	

	/**
	 * 获取我的某天详细考勤信息
	 * @param request
	 * @param clockForm
	 * @return
	 */
	@RequestMapping("/getMyClockDayDetail.ph")
	public String getMyClockDayDetail(HttpServletRequest request , ClockForm clockForm){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			UserInfo userInfo = (UserInfo) getPhSession(request).getAttribute("userInfo");
			ClockDayDetail clockDayDetail = clockService.getMyClockDayDetail(request,clockForm,userInfo);
			jro.setReturnObj(clockDayDetail);
			jro.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	


	/**
	 * 设置考勤WIFI
	 * @param request
	 * @param clockForm
	 * @return
	 */
	@RequestMapping("/setWifi.ph")
	public String setWifi(HttpServletRequest request , ClockForm clockForm){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			UserInfo userInfo = (UserInfo) getPhSession(request).getAttribute("userInfo");
			clockForm.setCreateUserId(userInfo.getUserId());
			clockForm.setCreateUserName(userInfo.getUserName());
			if(clockDao.setWifi(clockForm)){
				jro.setMessage("设置考勤WIFI成功！");
			}else{
				jro.setMessage("未知原因，设置失败！");
			}
			//jro.setMessage(clockService.clock(request, clockForm,userInfo));
			jro.setSuccess(true);
		}catch (Exception e) {
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	
	/**
	 * 更新考勤WIFI
	 * @param request
	 * @param clockForm
	 * @return
	 */
	@RequestMapping("/updateWifi.ph")
	public String updateWifi(HttpServletRequest request , ClockForm clockForm){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			UserInfo userInfo = (UserInfo) getPhSession(request).getAttribute("userInfo");
			clockForm.setUpdateUserId(userInfo.getUserId());
			clockForm.setUpdateUserName(userInfo.getUserName());
			if(clockDao.updateWifi(clockForm)){
				jro.setMessage("更新考勤WIFI成功！");
			}else{
				jro.setMessage("未知原因，更新失败！");
			}
			//jro.setMessage(clockService.clock(request, clockForm,userInfo));
			jro.setSuccess(true);
		}catch (Exception e) {
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	
	/**
	 * 查询考勤WIFI
	 * @param request
	 * @param clockForm
	 * @return
	 */
	@RequestMapping("/getWifi.ph")
	public String getWifi(HttpServletRequest request , ClockForm clockForm){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			jro.setReturnObj(clockDao.getWifi(clockForm));
			jro.setSuccess(true);
		}catch (Exception e) {
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	
	/**
	 * 更新考勤WIFI
	 * @param request
	 * @param clockForm
	 * @return
	 */
	@RequestMapping("/deleteWifi.ph")
	public String deleteWifi(HttpServletRequest request , ClockForm clockForm){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			UserInfo userInfo = (UserInfo) getPhSession(request).getAttribute("userInfo");
			clockForm.setUpdateUserId(userInfo.getUserId());
			clockForm.setUpdateUserName(userInfo.getUserName());
			if(clockDao.deleteWifi(clockForm)){
				jro.setMessage("删除考勤WIFI成功！");
			}else{
				jro.setMessage("未知原因，删除失败！");
			}
			//jro.setMessage(clockService.clock(request, clockForm,userInfo));
			jro.setSuccess(true);
		}catch (Exception e) {
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
}
