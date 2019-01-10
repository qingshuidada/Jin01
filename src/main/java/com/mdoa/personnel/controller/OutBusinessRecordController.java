package com.mdoa.personnel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.personnel.bo.OutBusinessRecordForm;
import com.mdoa.personnel.model.OutBusinessRecord;
import com.mdoa.personnel.service.OutBusinessRecordService;

@RestController
@RequestMapping("/outBusinessRecord")
public class OutBusinessRecordController extends BaseController{

	@Autowired
	private OutBusinessRecordService outBusinessRecordService;
	
	/**
	 * 查询请假记录
	 * @param 
	 * @return
	 */
	@RequestMapping("/selectOutBusinessRecord.do")
	public String selectOutBusinessRecord(OutBusinessRecordForm outBusinessRecordForm) {
		try {
			PageModel<OutBusinessRecord> pageInfo = outBusinessRecordService.selectOutBusinessRecord(outBusinessRecordForm);
			Gson gson = new Gson();
			return gson.toJson(pageInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 修改请假记录
	 */
	@RequestMapping("/updateOutBusinessRecord.do")
	public String updateOutBusinessRecord(OutBusinessRecordForm outBusinessRecordForm){
		try {
			String string = outBusinessRecordService.updateOutBusinessRecord(outBusinessRecordForm);
			return string;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
}
