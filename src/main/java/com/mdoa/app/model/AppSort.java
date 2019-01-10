package com.mdoa.app.model;

import java.util.List;

import com.mdoa.base.model.BaseModel;

/**
 * 类别model
 * @author Administrator
 *
 */
public class AppSort extends BaseModel{

	private String sortId;//类别id
	private String title;//标题或类别名称
	private String sortDescribe;//简介
	private String parentSortId;//父类别id
	private String imageUrl;
	private List<AppSort> chidren;
	private	List<AppProductType> productTypes;
	public String getSortId() {
		return sortId;
	}
	public void setSortId(String sortId) {
		this.sortId = sortId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getSortDescribe() {
		return sortDescribe;
	}
	public void setSortDescribe(String sortDescribe) {
		this.sortDescribe = sortDescribe;
	}
	public String getParentSortId() {
		return parentSortId;
	}
	public void setParentSortId(String parentSortId) {
		this.parentSortId = parentSortId;
	}
	public List<AppSort> getChidren() {
		return chidren;
	}
	public void setChidren(List<AppSort> chidren) {
		this.chidren = chidren;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public List<AppProductType> getProductTypes() {
		return productTypes;
	}
	public void setProductTypes(List<AppProductType> productTypes) {
		this.productTypes = productTypes;
	}

	
}
