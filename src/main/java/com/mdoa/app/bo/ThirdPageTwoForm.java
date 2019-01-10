package com.mdoa.app.bo;

import java.util.List;

import com.mdoa.app.model.AppProduct;
import com.mdoa.app.model.AppProductType;

public class ThirdPageTwoForm {

	private List<AppProductType> appProductTypes;
	private List<AppProduct> products;
	public List<AppProductType> getAppProductTypes() {
		return appProductTypes;
	}
	public void setAppProductTypes(List<AppProductType> appProductTypes) {
		this.appProductTypes = appProductTypes;
	}
	public List<AppProduct> getProducts() {
		return products;
	}
	public void setProducts(List<AppProduct> products) {
		this.products = products;
	}
	
	
}
