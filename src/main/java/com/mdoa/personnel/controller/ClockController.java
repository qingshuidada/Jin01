package com.mdoa.personnel.controller;



import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.constant.FileConstant;
import com.mdoa.personnel.bo.ClockDayDetail;
import com.mdoa.personnel.bo.ClockForm;
import com.mdoa.personnel.bo.ClockMonthBalanceForm;
import com.mdoa.personnel.bo.ClockMonthForm;
import com.mdoa.personnel.bo.ClockState;
import com.mdoa.personnel.service.ClockService;
import com.mdoa.util.FileUtil;

@RestController
@RequestMapping("/clock")
@Component
@Lazy(value=false)
public class ClockController extends BaseController{
	
	@Autowired
	private ClockService clockService;
	
	/**
	 * 处理前一天的打卡记录并生成当天新的预备记录
	 * @throws Exception
	 */
	@Scheduled(cron = "1 0 0 * * ?")//每天上午零点零一分触发 
	public void autoDeal() throws Exception{
		clockService.autoDeal();
	}
	
	/**
	 * 获取系统当前时间 以及打卡信息
	 * @param request
	 * @param clockForm
	 * @return
	 */
	@RequestMapping("/getMyClockState.do")
	public String getMyClockState(HttpServletRequest request, ClockForm clockForm){
		try {
			ClockState clockState = clockService.getMyClockState(request, clockForm);
			Gson gson = new Gson();
			return gson.toJson(clockState);
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 用户打卡
	 */
	@RequestMapping("/clock.do")
	public String clock(HttpServletRequest request){
		try {
			return clockService.clock(request);
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 获取我的月打卡记录以及汇总信息
	 * @param request
	 * @return
	 */
	@RequestMapping("/getMyClockMonthForm.do")
	public String getMyClockMonthForm(HttpServletRequest request , ClockForm clockForm){
		try {
			ClockMonthForm clockMonthForm = clockService.getMyClockMonthForm(request,clockForm);
			Gson gson = new Gson();
			return gson.toJson(clockMonthForm);
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询月打卡记录以及汇总信息
	 * @param clockForm
	 * @return
	 */
	@RequestMapping("/getClockMonthForm.do")
	public String getClockMonthForm(ClockForm clockForm){
		try {
			ClockMonthForm clockMonthForm = clockService.getClockMonthForm(clockForm);
			Gson gson = new Gson();
			return gson.toJson(clockMonthForm);
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 获取我的某天详细考勤信息
	 * @param request
	 * @param clockForm
	 * @return
	 */
	@RequestMapping("/getMyClockDayDetail.do")
	public String getMyClockDayDetail(HttpServletRequest request , ClockForm clockForm){
		try {
			ClockDayDetail clockDayDetail = clockService.getMyClockDayDetail(request,clockForm);
			Gson gson = new Gson();
			return gson.toJson(clockDayDetail);
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 获取某天详细考勤信息
	 * @param clockForm
	 * @return
	 */
	@RequestMapping("/getClockDayDetail.do")
	public String getClockDayDetail(ClockForm clockForm){
		try {
			ClockDayDetail clockDayDetail = clockService.getClockDayDetail(clockForm);
			Gson gson = new Gson();
			return gson.toJson(clockDayDetail);
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 根据条件查询考勤汇总信息
	 * @param request
	 * @param clockForm
	 * @return
	 */
	@RequestMapping("/getMonthFormByCondition.do")
	public String getMonthFormByCondition(HttpServletRequest request, ClockForm clockForm){
		try {
			PageModel<ClockMonthBalanceForm> pageModel = clockService.getMonthFormByCondition(request,clockForm);
			Gson gson = new Gson();
			return gson.toJson(pageModel);
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 根据条件查询打印考勤汇总信息
	 * @param request
	 * @param clockForm
	 * @return
	 */
	@RequestMapping("/writeToExcel.do")
	public String writeToExcel(ClockForm clockForm,String jsonString,HttpServletRequest request,HttpServletResponse response){
		try {
			String filePath = FileConstant.FILE_PATH + FileConstant.SHORT_TIME_EXCEL + "/" +new Date().getTime() + ".xls";
			clockService.writeToExcel(clockForm,jsonString,filePath);
			FileUtil.download(request, response, filePath, new Date().getTime()+".xls");
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询考勤月份
	 * @return
	 */
	@RequestMapping("/getBalanceMonth.do")
	public String getBalanceMonth(){
		try {
			List<String> balanceMonthes = clockService.getBalanceMotnh();
			Gson gson = new Gson();
			return gson.toJson(balanceMonthes);
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
}
