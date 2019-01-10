package com.mdoa.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mdoa.app.bo.HomePageForm;
import com.mdoa.app.dao.AppSortDao;
import com.mdoa.app.dao.HomePageDao;
import com.mdoa.app.dao.ThirdPageDao;
import com.mdoa.app.model.AppFirm;
import com.mdoa.app.model.AppProduct;
import com.mdoa.app.model.AppProductType;
import com.mdoa.app.model.AppSort;

@Service
public class HomePageService {

	@Autowired
	private HomePageDao homePageDao;
	
	@Autowired
	private AppSortDao appSortDao;
	
	@Autowired
	private ThirdPageDao thirdPageDao;
	
	public HomePageForm selectHomePage(AppSort appSort){
		
		HomePageForm homePageForm = new HomePageForm();
		homePageForm.setAppSort(appSortDao.selectSortBySortId("1"));
		homePageForm.setSorts(appSortDao.selectSortsBySortId("3"));
	
		List<AppProduct> products = thirdPageDao.selectProducts();
		for (AppProduct appProduct : products) {
			AppProductType appProductType = homePageDao.selectProductTypeByProductId(appProduct.getProductId());
			AppSort sort = appSortDao.selectSortBySortId(appProductType.getSortId());
			appProduct.setSortId(sort.getSortId());
		}
		homePageForm.setProducts(products);
		homePageForm.setAppFirm(homePageDao.selectFirmBySortId());
		return homePageForm;
	}

	public AppSort selectWorkshopById(String sortId) {
		return appSortDao.selectSortBySortId(sortId);
	}

	public AppProductType selectWorkshopAndType(String productId) {
		AppProductType appProductType = homePageDao.selectProductTypeByProductId(productId);
		AppSort appSort = appSortDao.selectSortBySortId(appProductType.getSortId());
		appProductType.setTitle(appSort.getTitle());
		return appProductType;
	}
	
	public AppFirm selectFirm(){
		return homePageDao.selectFirmBySortId();
	}
	
	public void updateAppFirm(AppFirm appFirm){
		if(!homePageDao.updateAppFirm(appFirm)){
			throw new RuntimeException("修改失败");
		}
	}
}
