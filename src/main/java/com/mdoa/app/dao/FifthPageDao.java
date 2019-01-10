package com.mdoa.app.dao;

import java.util.List;

import com.mdoa.app.model.AppJobs;
import com.mdoa.app.model.AppNews;
import com.mdoa.app.model.AppPosition;

public interface FifthPageDao {

	List<AppNews> selectNewsBySortId(String sortId);
	
	AppNews selectNewsById(String newsId);
	
	List<AppJobs> selectJobsBySortId(String sortId);
	
	boolean addPosition(AppPosition appPosition);
}
