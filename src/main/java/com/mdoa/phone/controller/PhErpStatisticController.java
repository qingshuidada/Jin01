package com.mdoa.phone.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.JsonReturnObject;
import com.mdoa.constant.FileConstant;
import com.mdoa.erp.bo.EcoWorkshopTabData;
import com.mdoa.erp.service.ErpStatisticsService;

@RestController
@RequestMapping("/phErpStatistics")
public class PhErpStatisticController extends BaseController{
	
	@Autowired
	private ErpStatisticsService erpStatisticsService;
	
	/**
	 * 统计经济指标、车间交叉报表数据
	 * @param reportFormsDate
	 * @return
	 */
	@RequestMapping("/getEcoWorkshopTabData.ph")
	public String getEcoWorkshopTabData(String reportFormsDate,HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			EcoWorkshopTabData ecoWorkshopTabData = erpStatisticsService.getEcoWorkshopTabData(reportFormsDate);
			jro.setSuccess(true);
			jro.setReturnObj(ecoWorkshopTabData);
		} catch (Exception e) {
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	
	/**
	 * 验证查询生产报表
	 */
	@RequestMapping("/checkBossPassword.ph")
	public String checkBossPassword(String password,HttpServletRequest request,HttpServletResponse response){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		if(password !=null){
			if(password.equals(FileConstant.BOSS_PASSWORD)){
//				UserInfo userInfo = new UserInfo();
//				userInfo.setUserAccount(Constant.ADMIN_ACCOUNT);
//				userInfo.setPassword(Constant.ADMIN_PASSWORD);
//				userService.login(userInfo, request);
//				Cookie userAccountCookie = new Cookie("userAccount",userInfo.getUserAccount());
//				Cookie passwordCookie = new Cookie("password",Md5Util.getMd5Str(userInfo.getPassword()));
//				passwordCookie.setPath("/");
//				userAccountCookie.setPath("/");
//				response.addCookie(userAccountCookie);
//				response.addCookie(passwordCookie);
//				System.out.println("添加进cookie");
				jro.setSuccess(true);
			}else {
				jro.setSuccess(false);
				jro.setMessage("口令不正确");
			}
		}else{
			jro.setSuccess(false);
			jro.setMessage("口令为空");
		}
		return gson.toJson(jro);
	}
}
