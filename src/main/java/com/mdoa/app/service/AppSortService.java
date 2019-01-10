package com.mdoa.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.app.dao.AppSortDao;
import com.mdoa.app.model.AppImage;
import com.mdoa.app.model.AppSort;
import com.mdoa.base.model.PageModel;

@Service
public class AppSortService {

	@Autowired
	private AppSortDao sortDao;
	
	public List<AppSort> getSortBySuperId(AppSort sort){
		List<AppSort> sorts = sortDao.getSortBySuperId(sort);
		for (AppSort sort1 : sorts) {
			sort1.setChidren(this.getSortBySuperId(sort1));
		}
		return sorts;
	}
	
	public PageModel<AppSort> selectSortsBySortIdJ (AppSort appSort){
		PageHelper.startPage(appSort.getPage(), appSort.getRows());
		List<AppSort> sortList = sortDao.selectSortsBySortIdJ(appSort);
		PageModel<AppSort> pageModel = new PageModel<>((Page<AppSort>)sortList);
		return pageModel;
	}
	public PageModel<AppSort> selectAllSort(AppSort appSort){
		PageHelper.startPage(appSort.getPage(), appSort.getRows());
		List<AppSort> list = sortDao.selectAllSort();
		PageModel<AppSort> pageModel = new PageModel<>((Page<AppSort>)list);
		return pageModel;
	}
	
	public void editSortById(AppSort sort){
		if(!sortDao.editSortById(sort)){
			throw new RuntimeException("修改类别失败");
		}
	}

	public PageModel<AppImage> selectAppImage(AppImage appImage) {
		PageHelper.startPage(appImage.getPage(), appImage.getRows());
		List<AppImage> list = sortDao.selectAppImage(appImage);
		PageModel<AppImage> pageModel = new PageModel<>((Page<AppImage>)list);
		return pageModel;
	}
	
	public void addAppImage(AppImage appImage){
		if(!sortDao.addAppImage(appImage)){
			throw new RuntimeException("添加图片失败");
		}
	}
	
	public void deleteImage(AppImage appImage){
		if(!sortDao.deleteImage(appImage)){
			throw new RuntimeException("删除图片失败");
		}
	}
}
