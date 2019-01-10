package com.mdoa.erp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.erp.model.WaterReport;
import com.mdoa.erp.service.WaterReportService;

@RestController
@RequestMapping("/waterReport")
public class WaterReportController {

	@Autowired
	private WaterReportService reportService;
	
	/**
	 * 添加水质检测报告
	 * @param report
	 * @return
	 */
	@RequestMapping("/insertWaterReport.erp")
	public String insertWaterReport(WaterReport report){
		try {
			reportService.insertWaterReport(report);
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
	 * 删除水质检测报告
	 * @param reportId
	 * @return
	 */
	@RequestMapping("/deleteWaterReport.erp")
	public String deleteWaterReport(String  reportId){
		try {
			reportService.deleteWaterReport(reportId);
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
	 * 修改水质检测报告
	 * @param report
	 * @return
	 */
	@RequestMapping("/updateWaterReport.erp")
	public String updateWaterReport(WaterReport report){
		try {
			reportService.updateWaterReport(report);
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
	 * 查询水质检测报告
	 * @param report
	 * @return
	 */
	@RequestMapping("/selectWaterReport.erp")
	public String selectWaterReport(WaterReport report){
		try {
			PageModel<WaterReport> model = reportService.selectWaterReport(report);
			Gson gson = new Gson();
		    return gson.toJson(model);
		} catch (RuntimeException e) {
		    e.printStackTrace();
		    return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
		    e.printStackTrace();
		    return Constant.SERVER_ERROR_CODE;
		}
	}
}
