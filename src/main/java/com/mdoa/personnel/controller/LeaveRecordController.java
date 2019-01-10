package com.mdoa.personnel.controller;


import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.constant.FileConstant;
import com.mdoa.personnel.bo.LeaveRecordForm;
import com.mdoa.personnel.model.LeaveRecord;
import com.mdoa.personnel.service.LeaveRecordService;
import com.mdoa.util.FileUtil;

@RestController
@RequestMapping("/leaveRecord")
public class LeaveRecordController extends BaseController {

	@Autowired
	private LeaveRecordService leaveRecordService;

	/**
	 * 查询请假记录
	 * 
	 * @param 
	 * @return
	 */
	@RequestMapping("/selectLeaveRecord.do")
	public String selectLeaveRecord(LeaveRecordForm leaveRecordForm) {
		try {
			PageModel<LeaveRecord> pageInfo = leaveRecordService.selectLeaveRecord(leaveRecordForm);
			Gson gson = new Gson();
			return gson.toJson(pageInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 导出请假信息到excel
	 * 
	 * @param 
	 * @return
	 */
	@RequestMapping("/writeLeaveRecordToExcel.do")
	public String writeLeaveRecordToExcel(LeaveRecordForm leaveRecordForm,String jsonString,HttpServletRequest request,HttpServletResponse response) {
		try {
			String filePath = FileConstant.FILE_PATH + FileConstant.SHORT_TIME_EXCEL + "/" +new Date().getTime() + ".xls";
			leaveRecordService.writeLeaveRecordToExcel(leaveRecordForm, jsonString, filePath);
			FileUtil.download(request, response, filePath, new Date().getTime()+".xls");
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
}
