package com.mdoa.erp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.erp.model.RainWaterReport;
import com.mdoa.erp.service.RainWaterReportService;

@RestController
@RequestMapping("rainWaterReport")
public class RainWaterReportController {

	@Autowired
	private RainWaterReportService reportService;
	
	/**
	 * 添加水质检测报告
	 * @param report
	 * @return
	 */
	@RequestMapping("/insertRainWaterReport.erp")
	public String insertRainWaterReport(RainWaterReport report){
		try {
			reportService.insertRainWaterReport(report);
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
	@RequestMapping("/deleteRainWaterReport.erp")
	public String deleteRainWaterReport(String  rainId){
		try {
			reportService.deleteRainWaterReport(rainId);
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
	@RequestMapping("/updateRainWaterReport.erp")
	public String updateRainWaterReport(RainWaterReport report){
		try {
			reportService.updateRainWaterReport(report);
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
	@RequestMapping("/selectRainWaterReport.erp")
	public String selectRainWaterReport(RainWaterReport report){
		try {
			PageModel<RainWaterReport> model = reportService.selectRainWaterReport(report);
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
