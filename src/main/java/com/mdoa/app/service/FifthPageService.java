package com.mdoa.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mdoa.app.bo.FifithPageForm;
import com.mdoa.app.dao.AppSortDao;
import com.mdoa.app.dao.FifthPageDao;
import com.mdoa.app.model.AppJobs;
import com.mdoa.app.model.AppNews;
import com.mdoa.app.model.AppPosition;

@Service
public class FifthPageService {

	@Autowired
	private FifthPageDao pageDao;
	
	@Autowired
	private AppSortDao sortDao;
	
	public FifithPageForm selectNewsInformation(){
		FifithPageForm fifithPageForm = new FifithPageForm();
		fifithPageForm.setAppSort(sortDao.selectSortBySortId("5"));
		fifithPageForm.setJobs(pageDao.selectJobsBySortId("22"));
		fifithPageForm.setNews(pageDao.selectNewsBySortId("21"));
		return fifithPageForm;
	}
	
	public List<AppNews> selectAllNews(){
		return pageDao.selectNewsBySortId("21");
	}
	
	public List<AppJobs> selectAllJobs(){
		return pageDao.selectJobsBySortId("22");
	}
	
	public AppNews selectNewsById(String newsId){
		AppNews appNews = pageDao.selectNewsById(newsId);
		return appNews;
	}
	
	public void applyPosition(AppPosition appPosition){
		if(!pageDao.addPosition(appPosition)){
			throw new RuntimeException("添加失败");
		}
	}
}
