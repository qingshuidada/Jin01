package com.mdoa.erp.controller;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.constant.FileConstant;
import com.mdoa.erp.bo.EcoWorkshopTabData;
import com.mdoa.erp.bo.ErpStatisticsForm;
import com.mdoa.erp.service.ErpStatisticsService;
import com.mdoa.security.annotation.HasPermissions;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.FileUtil;

@RestController
@RequestMapping("/ErpStatistics")
public class ErpStatisticsController extends BaseController{

	@Autowired
	private ErpStatisticsService erpStatisticsService;
	
	/**
	 * 添加经济指标
	 */
	@RequestMapping("/addEconomic.do")
	@HasPermissions(permissions = { "admin:erp:statisticsInfo:targetManage:add" })
	public String addEconomic(ErpStatisticsForm erpStatisticsForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			erpStatisticsForm.setCreateUserId(userInfo.getUserId());
			erpStatisticsForm.setCreateUserName(userInfo.getUserName());
			erpStatisticsService.addEconomic(erpStatisticsForm);
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
	 * 修改经济指标(deleteFlag == 1的时候为删除接口)
	 */
	@RequestMapping("/updateEconomic.do")
	@HasPermissions(permissions = { "admin:erp:statisticsInfo:targetManage:update" })
	public String updateEconomic(ErpStatisticsForm erpStatisticsForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			erpStatisticsForm.setUpdateUserId(userInfo.getUserId());
			erpStatisticsForm.setUpdateUserName(userInfo.getUserName());
			erpStatisticsService.updateEconomic(erpStatisticsForm);
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
	 * 查询经济指标
	 */
	@RequestMapping("/queryEconomic.do")
	public String queryEconomic(ErpStatisticsForm erpStatisticsForm,HttpServletRequest request){
		try {
			Gson gson = new Gson();
			PageModel<ErpStatisticsForm> pageModel = erpStatisticsService.queryEconomic(erpStatisticsForm);
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 添加车间
	 */
	@RequestMapping("/addWorkshop.do")
	@HasPermissions(permissions = { "admin:erp:statisticsInfo:shopManage:add" })
	public String addWorkshop(ErpStatisticsForm erpStatisticsForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			erpStatisticsForm.setCreateUserId(userInfo.getUserId());
			erpStatisticsForm.setCreateUserName(userInfo.getUserName());
			erpStatisticsService.addWorkshop(erpStatisticsForm);
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
	 * 修改车间(deleteFlag == 1的时候为删除接口)
	 */
	@RequestMapping("/updateWorkshop.do")
	@HasPermissions(permissions = { "admin:erp:statisticsInfo:shopManage:update" })
	public String updateWorkshop(ErpStatisticsForm erpStatisticsForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			erpStatisticsForm.setUpdateUserId(userInfo.getUserId());
			erpStatisticsForm.setUpdateUserName(userInfo.getUserName());
			erpStatisticsService.updateWorkshop(erpStatisticsForm);
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
	 * 查询车间 
	 */
	@RequestMapping("/queryWorkshop.do")
	public String queryWorkshop(ErpStatisticsForm erpStatisticsForm,HttpServletRequest request){
		try {
			Gson gson = new Gson();
			PageModel<ErpStatisticsForm> pageModel = erpStatisticsService.queryWorkshop(erpStatisticsForm);
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 人员上报管理(查询)
	 */
	@RequestMapping("/queryUserFromWE.do")
	public String queryUserFromWE(ErpStatisticsForm erpStatisticsForm,HttpServletRequest request){
		try {
			Gson gson = new Gson();
			PageModel<ErpStatisticsForm> pageModel = erpStatisticsService.queryUserFromWE(erpStatisticsForm);
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 人员上报
	 */
	@RequestMapping("/reportUserFromWE.do")
	@HasPermissions(permissions = { "admin:erp:statisticsInfo:appearStaffManage:manage" })
	public String reportUserFromWE(ErpStatisticsForm erpStatisticsForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			erpStatisticsForm.setCreateUserId(userInfo.getUserId());
			erpStatisticsForm.setCreateUserName(userInfo.getUserName());
			erpStatisticsForm.setUpdateUserId(userInfo.getUserId());
			erpStatisticsForm.setUpdateUserName(userInfo.getUserName());
			erpStatisticsService.reportUserFromWE(erpStatisticsForm);
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
	 * 查询信息上报页面
	 */
	@RequestMapping("/queryStatisticsUser.do")
	public String queryStatisticsUser(ErpStatisticsForm erpStatisticsForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			erpStatisticsForm.setUserId(userInfo.getUserId());
			Gson gson = new Gson();
			PageModel<ErpStatisticsForm> pageModel = erpStatisticsService.queryStatisticsUser(erpStatisticsForm);
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 添加信息数据
	 */
	@RequestMapping("/addStatisticsMessage.do")
	@HasPermissions(permissions = { "admin:erp:statisticsInfo:infoAppear:manage" })
	public String addStatisticsMessage(ErpStatisticsForm erpStatisticsForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			erpStatisticsForm.setCreateUserId(userInfo.getUserId());
			erpStatisticsForm.setCreateUserName(userInfo.getUserName());
			erpStatisticsService.addStatisticsMessage(erpStatisticsForm);
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
	 * 信息查询
	 */
	@RequestMapping("/queryStatisticsMessage.do")
	public String queryStatisticsMessage(ErpStatisticsForm erpStatisticsForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			if (erpStatisticsForm.getYourselfFlag() != null && erpStatisticsForm.getYourselfFlag().equals("1")) {
				erpStatisticsForm.setUserId(userInfo.getUserId());
			}
			Gson gson = new Gson();
			PageModel<ErpStatisticsForm> pageModel = erpStatisticsService.queryStatisticsMessage(erpStatisticsForm);
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	
	/**
	 * 以下接口未加权限*********************************************
	 */
	
	/**
	 * 确认某车间的某一天的某一项上报信息
	 * @param erpStatisticsForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/ensureStatisticsMessage.do")
	public String ensureStatisticsMessage(ErpStatisticsForm erpStatisticsForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			erpStatisticsForm.setCreateUserId(userInfo.getUserId());
			erpStatisticsForm.setCreateUserName(userInfo.getUserName());
			erpStatisticsService.ensureStatisticsMessage(erpStatisticsForm);
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
	 * 删除经济指标
	 * @param erpStatisticsForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/deleteEconomic.do")
	public String deleteEconomic(ErpStatisticsForm erpStatisticsForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			erpStatisticsForm.setUpdateUserId(userInfo.getUserId());
			erpStatisticsForm.setUpdateUserName(userInfo.getUserName());
			erpStatisticsService.deleteEconomic(erpStatisticsForm);
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
	 * 经济指标设为产值
	 * @param erpStatisticsForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/setEcoOptValue.do")
	public String setEcoOptValue(ErpStatisticsForm erpStatisticsForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			erpStatisticsForm.setUpdateUserId(userInfo.getUserId());
			erpStatisticsForm.setUpdateUserName(userInfo.getUserName());
			erpStatisticsService.setEcoOptValue(erpStatisticsForm);
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
	 * 统计经济指标、车间交叉报表数据
	 * @param reportFormsDate
	 * @return
	 */
	@RequestMapping("/getEcoWorkshopTabData.do")
	public String getEcoWorkshopTabData(String reportFormsDate,HttpServletRequest request){
		try {
			Gson gson = new Gson();
			EcoWorkshopTabData ecoWorkshopTabData = erpStatisticsService.getEcoWorkshopTabData(reportFormsDate);
			String jsonString = gson.toJson(ecoWorkshopTabData);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 导出经济指标、车间交叉报表数据到Excel
	 * @param reportFormsDate
	 * @return
	 */
	@RequestMapping("/writeEcoWorkshopTabToExcel.do")
	public String writeEcoWorkshopTabToExcel(String reportFormsDate,HttpServletRequest request,HttpServletResponse response){
		try {
			String filePath = FileConstant.FILE_PATH + FileConstant.SHORT_TIME_EXCEL + "/" +new Date().getTime() + ".xls";
			erpStatisticsService.writeEcoWorkshopTabToExcel(reportFormsDate,filePath);
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

}

