package com.mdoa.app.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.mdoa.app.bo.ComponyCulture;
import com.mdoa.app.bo.ComponyFramework;
import com.mdoa.app.bo.ComponyHonor;
import com.mdoa.app.bo.ComponyStyle;
import com.mdoa.app.bo.SecondPageForm;
import com.mdoa.app.model.AppCompony;
import com.mdoa.app.model.AppImage;
import com.mdoa.app.model.AppManager;
import com.mdoa.app.model.AppSort;
import com.mdoa.app.service.SecondPageService;
import com.mdoa.constant.Constant;
import com.mdoa.util.FileUtil;

@RestController
@RequestMapping("/secondPage")
public class SecondPageController {

	@Autowired
	private SecondPageService secondPageService;
	
	/**
	 * 查询第二个页面的全部信息
	 * @param appSort
	 * @return
	 */
	@RequestMapping("/selectAllInformation.do")
	public String selectAllInformation(AppSort appSort) {
		Gson gson = new Gson();
		try{
			appSort.setSortId("2");
			SecondPageForm secondPageForm = secondPageService.selectAllInformation(appSort);
			return gson.toJson(secondPageForm);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
		
	}
	
	/**
	 * 修改公司信息并上传图片
	 * @param file
	 * @param request
	 * @return
	 */
	@RequestMapping("updateCompony.do")
	public String updateCompony(AppCompony appCompony,MultipartFile file,HttpServletRequest request){
		
		try {
			//判断文件是否为空
			if(!file.isEmpty()){
				String url = request.getServletContext().getRealPath("/img/app/compony/")+file.getOriginalFilename();
				FileUtil.uploadFile(file, url);
				String imageUrl = "/img/app/compony/"+file.getOriginalFilename();
				appCompony.setComponyImageUrl(imageUrl);
				secondPageService.updateComponyById(appCompony);
			}
			return Constant.SUCCESS_CODE;
		} catch (IllegalStateException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	
	
	
	/**
	 * 公司简介
	 * @param appSort
	 * @return
	 */
	@RequestMapping("/seletAppCompony.do")
	public String seletAppCompony(AppSort appSort){
		Gson gson = new Gson();
		try{
			AppCompony appCompony = secondPageService.seletAppCompony(appSort);
			return gson.toJson(appCompony);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 公司文化
	 * @param appSort
	 * @return
	 */
	@RequestMapping("/selectComponyCulture.do")
	public String selectComponyCulture(AppSort appSort){
		Gson gson = new Gson();
		try{
			List<ComponyCulture> list = secondPageService.selectComponyCulture(appSort);
			return gson.toJson(list);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 组织架构
	 * @param appSort
	 * @return
	 */
	@RequestMapping("/selectComponyFramework.do")
	public String selectComponyFramework(AppSort appSort){
		Gson gson = new Gson();
		try{
			ComponyFramework componyFramework = secondPageService.selectComponyFramework(appSort);
			return gson.toJson(componyFramework);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 企业风采
	 * @param appSort
	 * @return
	 */
	@RequestMapping("/selectComponyStyle.do")
	public String selectComponyStyle(AppSort appSort){
		Gson gson = new Gson();
		try{
			List<ComponyStyle> list = secondPageService.selectComponyStyle(appSort);
			return gson.toJson(list);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 荣誉资质
	 * @param appSort
	 * @return
	 */
	@RequestMapping("/selectComponyHonor.do")
	public String selectComponyHonor(AppSort appSort){
		Gson gson = new Gson();
		try{
			ComponyHonor componyHonor = secondPageService.selectComponyHonor(appSort);
			return gson.toJson(componyHonor);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 总经理致辞
	 * @param appSort
	 * @return
	 */
	@RequestMapping("/selectAppManager.do")
	public String selectAppManager(AppSort appSort){
		Gson gson = new Gson();
		try{
			AppManager appManager = secondPageService.selectAppManager(appSort);
			return gson.toJson(appManager);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 修改图片
	 * @param appImage
	 * @return
	 */
	@RequestMapping("updateImage.do")
	public String updateImage(AppImage appImage,MultipartFile file,HttpServletRequest request){
		try{
			if(!file.isEmpty()){
				String url = request.getServletContext().getRealPath("/img/app/compony/")+file.getOriginalFilename();
				FileUtil.uploadFile(file, url);
				String imageUrl = "/img/app/compony/"+file.getOriginalFilename();
				appImage.setImageUrl(imageUrl);
				secondPageService.updateImage(appImage);
			}
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
}
