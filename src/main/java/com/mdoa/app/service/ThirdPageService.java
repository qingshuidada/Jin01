package com.mdoa.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.app.bo.ThirdPageForm;
import com.mdoa.app.bo.ThirdPageTwoForm;
import com.mdoa.app.dao.AppSortDao;
import com.mdoa.app.dao.ThirdPageDao;
import com.mdoa.app.model.AppImage;
import com.mdoa.app.model.AppProduct;
import com.mdoa.app.model.AppProductType;
import com.mdoa.app.model.AppSort;
import com.mdoa.base.model.PageModel;

@Service
public class ThirdPageService {

	@Autowired
	private ThirdPageDao thirdPageDao;
	
	@Autowired
	private AppSortDao sortDao;
	
	public ThirdPageForm selectAllWorkshop() {
		ThirdPageForm thirdPageForm = new ThirdPageForm();
		thirdPageForm.setAppSorts(sortDao.selectSortsBySortId("3"));
		thirdPageForm.setAppSort(sortDao.selectSortBySortId("3"));
		return thirdPageForm;
	}
	
	
	public ThirdPageTwoForm selectAllProduct(String sortId) {
		ThirdPageTwoForm pageTwoForm = new ThirdPageTwoForm();
		pageTwoForm.setAppProductTypes(thirdPageDao.selectProductTypeBySortId(sortId));
		pageTwoForm.setProducts(thirdPageDao.selectProdutBySortId(sortId));
		return pageTwoForm;
	}
	
	public List<AppProduct> selectProductByTypeId(String TypeId){
		List<AppProduct> products = thirdPageDao.selectProductByTypeId(TypeId);
		return products;
	}
	
	public AppProduct selectProductById(String productId){
		
		AppProduct product = thirdPageDao.selectProductById(productId);
		return product;
	}
	
	public PageModel<AppProduct> selectProdutBySortId(AppProduct appProduct){
		PageHelper.startPage(appProduct.getPage(), appProduct.getRows());
		List<AppProduct> list = thirdPageDao.selectProdutBySortId(appProduct.getSortId());
		PageModel<AppProduct> pageModel = new PageModel<>((Page<AppProduct>)list);
		return pageModel;
	}
	
	public  PageModel<AppProductType> selectProductTypeBySortId(AppProductType appProductType){
		PageHelper.startPage(appProductType.getPage(), appProductType.getRows());
		List<AppProductType> list = thirdPageDao.selectProductTypeBySortId(appProductType.getSortId());
		PageModel<AppProductType> pageModel = new PageModel<>((Page<AppProductType>)list);
		return pageModel;
	}
	
	public void addProduct(AppProduct appProduct){
		if(!thirdPageDao.addProduct(appProduct)){
			throw new RuntimeException("添加失败");
		}
	}
	
	public void deleteProductById(AppProduct appProduct){
		if(!thirdPageDao.deleteProductById(appProduct)){
			throw new RuntimeException("删除失败");
		}
	}
}
