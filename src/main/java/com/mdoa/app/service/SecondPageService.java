package com.mdoa.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mdoa.app.bo.ComponyCulture;
import com.mdoa.app.bo.ComponyFramework;
import com.mdoa.app.bo.ComponyHonor;
import com.mdoa.app.bo.ComponyStyle;
import com.mdoa.app.bo.SecondPageForm;
import com.mdoa.app.dao.AppSortDao;
import com.mdoa.app.dao.SecondPageDao;
import com.mdoa.app.model.AppCompony;
import com.mdoa.app.model.AppImage;
import com.mdoa.app.model.AppManager;
import com.mdoa.app.model.AppSort;
@Service
public class SecondPageService {

	@Autowired
	private SecondPageDao secondPageDao;
	
	@Autowired
	private AppSortDao appSortDao;
	
	public SecondPageForm selectAllInformation(AppSort appSort) {
		SecondPageForm secondPageForm = new SecondPageForm();
		secondPageForm.setAppSort(appSortDao.selectSortBySortId("2"));
		AppCompony appCompony = secondPageDao.selectComponyBySortId("8");
		secondPageForm.setAppCompony(appCompony);
		List<ComponyCulture> componyCultures = secondPageDao.selectComponyCultureBySortId("9");
		secondPageForm.setComponyCultures(componyCultures);
		ComponyFramework componyFramework = secondPageDao.selectComponyFrameworkBySortId("10");
		secondPageForm.setFramework(componyFramework);
		List<ComponyStyle> componyStyles = secondPageDao.selectComponyStyleBySortId("11");
		secondPageForm.setComponyStyles(componyStyles);
		ComponyHonor componyHonor = new ComponyHonor();
		componyHonor.setFirstComponyHonors(secondPageDao.selectFirstComponyHonorBySortId("12","1"));
		componyHonor.setSecondComponyHonors(secondPageDao.selectSecondComponyHonorBySortId("12","2"));
		secondPageForm.setComponyHonor(componyHonor);
		AppManager appManager = secondPageDao.selectManagerBySortId("13");
		secondPageForm.setAppManager(appManager);
		return secondPageForm;
	}
	
	public AppCompony seletAppCompony(AppSort sort){
		return secondPageDao.selectComponyBySortId("8");
	}
	
	public List<ComponyCulture> selectComponyCulture(AppSort sort){
		return secondPageDao.selectComponyCultureBySortId("9");
	}
	
	public ComponyFramework selectComponyFramework(AppSort sort){
		return secondPageDao.selectComponyFrameworkBySortId("10");
	}
	
	public List<ComponyStyle> selectComponyStyle(AppSort sort){
		return secondPageDao.selectComponyStyleBySortId("11");
	}
	
	public ComponyHonor selectComponyHonor(AppSort sort){
		ComponyHonor componyHonor = new ComponyHonor();
		componyHonor.setFirstComponyHonors(secondPageDao.selectFirstComponyHonorBySortId("12","1"));
		componyHonor.setSecondComponyHonors(secondPageDao.selectSecondComponyHonorBySortId("12","2"));
		return componyHonor;
	}
	
	public AppManager selectAppManager(AppSort sort){
		return secondPageDao.selectManagerBySortId("13");
	}
	
	public void updateComponyById(AppCompony appCompony){
		if(!secondPageDao.updateComponyById(appCompony)){
			throw new RuntimeException("修改失败");
		}
	}
	
	public void updateImage(AppImage appImage){
		if(!secondPageDao.updateImage(appImage)){
			throw new RuntimeException("修改失败");
		}
	}
}
