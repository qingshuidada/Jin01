package com.mdoa.app.model;

import java.util.List;

import com.mdoa.base.model.BaseModel;

/**
 * 产品类别
 * @author Administrator
 *
 */
public class AppProductType extends BaseModel{

	private String productTypeId;
	private String productTypeName;
	private String sortId;
	private String title;
	private List<AppProduct> appProducts;
	public String getProductTypeId() {
		return productTypeId;
	}
	public void setProductTypeId(String productTypeId) {
		this.productTypeId = productTypeId;
	}
	public String getProductTypeName() {
		return productTypeName;
	}
	public void setProductTypeName(String productTypeName) {
		this.productTypeName = productTypeName;
	}
	public String getSortId() {
		return sortId;
	}
	public void setSortId(String sortId) {
		this.sortId = sortId;
	}
	public List<AppProduct> getAppProducts() {
		return appProducts;
	}
	public void setAppProducts(List<AppProduct> appProducts) {
		this.appProducts = appProducts;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
	
}
