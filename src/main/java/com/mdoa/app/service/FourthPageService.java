package com.mdoa.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.app.bo.FourthPageForm;
import com.mdoa.app.dao.AppSortDao;
import com.mdoa.app.dao.FourthPageDao;
import com.mdoa.app.model.AppNewProduct;
import com.mdoa.app.model.AppProduct;
import com.mdoa.app.model.AppProductType;
import com.mdoa.app.model.AppSort;
import com.mdoa.base.model.PageModel;

@Service
public class FourthPageService {

	@Autowired
	private FourthPageDao pageDao;
	
	@Autowired
	private AppSortDao sortDao;
	
	public FourthPageForm selectNewProductBySortId(){
		FourthPageForm fourthPageForm = new FourthPageForm();
		fourthPageForm.setAppSort(sortDao.selectSortBySortId("4"));
		fourthPageForm.setList(pageDao.selectNewProductBySortId("4"));
		return fourthPageForm;
	}
	
	public AppNewProduct selectNewProductById(AppNewProduct appNewProduct){
		return pageDao.selectNewProductById(appNewProduct.getProductId());
	}
	
	public PageModel<AppNewProduct> selectNewProduct(AppNewProduct appNewProduct){
		PageHelper.startPage(appNewProduct.getPage(), appNewProduct.getRows());
		List<AppNewProduct> list = pageDao.selectNewProductBySortId(appNewProduct.getSortId());
	//	List<AppNewProduct> list = pageDao.selectNewProductBySortIdJZH(appNewProduct.getProductId());
		PageModel<AppNewProduct> pageModel = new PageModel<>((Page<AppNewProduct>)list);
		return pageModel;
	}
	
	public void addNewProduct(AppNewProduct appNewProduct){
		if(!pageDao.addNewProduct(appNewProduct)){
			throw new RuntimeException("添加失败");
		}
	}
	
	public void deleteNewProductById(AppNewProduct appNewProduct){
		if(!pageDao.deleteProductById(appNewProduct)){
			throw new RuntimeException("删除失败");
		}
	}
}
