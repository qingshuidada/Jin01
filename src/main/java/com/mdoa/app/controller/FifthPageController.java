package com.mdoa.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.app.bo.FifithPageForm;
import com.mdoa.app.model.AppJobs;
import com.mdoa.app.model.AppNews;
import com.mdoa.app.model.AppOnlineMessage;
import com.mdoa.app.model.AppPosition;
import com.mdoa.app.service.FifthPageService;
import com.mdoa.constant.Constant;

@RestController
@RequestMapping("/fifthPage")
public class FifthPageController {

	@Autowired
	private FifthPageService fifthPageService;
	
	/**
	 * 查询新闻资讯下的所有信息
	 * @param appSort
	 * @return
	 */
	@RequestMapping("selectNewsInformation.do")
	public String selectNewsInformation(){
		Gson gson = new Gson();
		try{
			FifithPageForm pageForm = fifthPageService.selectNewsInformation();
			return gson.toJson(pageForm);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 查询新闻资讯下的公司新闻
	 * @param appSort
	 * @return
	 */
	@RequestMapping("selectAllNews.do")
	public String selectAllNews(){
		Gson gson = new Gson();
		try{
			List<AppNews> list = fifthPageService.selectAllNews();
			return gson.toJson(list);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询新闻资讯下的招聘信息
	 * @param appSort
	 * @return
	 */
	@RequestMapping("selectAllJobs.do")
	public String selectAllJobs(){
		Gson gson = new Gson();
		try{
			List<AppJobs> list = fifthPageService.selectAllJobs();
			return gson.toJson(list);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 根据newsId查询新闻的详细信息
	 * @param news
	 * @return
	 */
	@RequestMapping("selectNewsById.do")
	public String selectNewsById(AppNews news){
		Gson gson = new Gson();
		try{
			AppNews appNews = fifthPageService.selectNewsById(news.getNewsId());
			return gson.toJson(appNews);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 申请职位
	 * @param appPosition
	 * @return
	 */
	@RequestMapping("/applyPosition.do")
	public String applyPosition(AppPosition appPosition){
		try {
			fifthPageService.applyPosition(appPosition);
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
