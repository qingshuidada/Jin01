package com.mdoa.app.dao;

import java.util.List;

import com.mdoa.app.bo.ComponyCulture;
import com.mdoa.app.bo.ComponyFramework;
import com.mdoa.app.bo.ComponyHonor;
import com.mdoa.app.bo.ComponyStyle;
import com.mdoa.app.bo.FirstComponyHonor;
import com.mdoa.app.bo.SecondComponyHonor;
import com.mdoa.app.model.AppCompony;
import com.mdoa.app.model.AppImage;
import com.mdoa.app.model.AppManager;

public interface SecondPageDao {

	AppCompony selectComponyBySortId(String sortId);//公司
	
	AppManager selectManagerBySortId(String sortId);//总经理致辞
	
	List<ComponyCulture> selectComponyCultureBySortId(String sortId);//查询模块的图片
	
	ComponyFramework selectComponyFrameworkBySortId(String sortId);//查询模块的图片
	
	List<ComponyStyle> selectComponyStyleBySortId(String sortId);
	
	List<SecondComponyHonor> selectSecondComponyHonorBySortId(String sortId,String imageType);
	
	List<FirstComponyHonor> selectFirstComponyHonorBySortId(String sortId,String imageType);
	
	boolean updateComponyById(AppCompony appCompony);
	
	boolean updateImage(AppImage appImage);
}
