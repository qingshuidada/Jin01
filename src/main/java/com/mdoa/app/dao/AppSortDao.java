package com.mdoa.app.dao;

import java.util.List;

import com.mdoa.app.model.AppImage;
import com.mdoa.app.model.AppSort;

public interface AppSortDao {
	
	List<AppSort> getSortBySuperId(AppSort sort);
	
	List<AppSort> selectSortsBySortId(String sortId);
	
	List<AppSort> selectSortsBySortIdJ(AppSort appSort);
	
	AppSort selectSortBySortId(String sortId);
	
	boolean editSortById(AppSort appSort);
	
	List<AppSort> selectAllSort();

	List<AppImage> selectAppImage(AppImage appImage);
	
	boolean addAppImage(AppImage appImage);
	
	boolean deleteImage(AppImage appImage);
}
