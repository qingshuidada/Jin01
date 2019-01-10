package com.mdoa.app.dao;

import com.mdoa.app.model.AppFirm;
import com.mdoa.app.model.AppProductType;

public interface HomePageDao {
	
	AppFirm selectFirmBySortId();

	AppProductType selectProductTypeByProductId(String productId);
	
	boolean updateAppFirm(AppFirm appFirm);
}
