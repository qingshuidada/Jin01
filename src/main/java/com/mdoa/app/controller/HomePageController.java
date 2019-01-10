package com.mdoa.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.app.bo.HomePageForm;
import com.mdoa.app.model.AppFirm;
import com.mdoa.app.model.AppProductType;
import com.mdoa.app.model.AppSort;
import com.mdoa.app.service.HomePageService;
import com.mdoa.constant.Constant;

@RestController
@RequestMapping("/homePage")
public class HomePageController {

	@Autowired
	private HomePageService homePageService;
	
	/**
	 * 查询首页的所有信息
	 * @param appSort
	 * @return
	 */
	@RequestMapping("/selectHomePage.do")
	public String selectHomePage(AppSort appSort){
		Gson gson = new Gson();
		try{
			HomePageForm pageForm = homePageService.selectHomePage(appSort);
			return gson.toJson(pageForm);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 根据sortid查询车间的详情
	 * @param sortId
	 * @return
	 */
	@RequestMapping("/selectWorkshopById.do")//待开发
	public String selectWorkshopById(String sortId){
		Gson gson = new Gson();
		try{
			AppSort appSort = homePageService.selectWorkshopById(sortId);
			return gson.toJson(appSort);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 根据产品id查询车间和产品类型
	 * @param productId
	 * @return
	 */
	@RequestMapping("/selectWorkshopAndType.do")
	public String selectWorkshopAndType(String productId){
		Gson gson = new Gson();
		try{
			AppProductType appProductType = homePageService.selectWorkshopAndType(productId);
			return gson.toJson(appProductType);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	@RequestMapping("/selectAppFirm.do")
	public String selectAppFirm(){
		Gson gson = new Gson();
		try{
			AppFirm appFirm = homePageService.selectFirm();
			return gson.toJson(appFirm);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	@RequestMapping("/updateAppFirm.do")
	public String updateAppFirm(AppFirm appFirm){
		try{
			homePageService.updateAppFirm(appFirm);
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
