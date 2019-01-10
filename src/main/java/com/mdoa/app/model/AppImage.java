package com.mdoa.app.model;

import com.mdoa.base.model.BaseModel;

/**
 * 图片model
 * @author Administrator
 *
 */
public class AppImage extends BaseModel{

	private String imageId;
	private String title;
	private String imageDescribe;
	private String sortId;
	private String imageUrl;
	private String imageType;
	
	public String getImageType() {
		return imageType;
	}
	public void setImageType(String imageType) {
		this.imageType = imageType;
	}
	public String getImageId() {
		return imageId;
	}
	public void setImageId(String imageId) {
		this.imageId = imageId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getImageDescribe() {
		return imageDescribe;
	}
	public void setImageDescribe(String imageDescribe) {
		this.imageDescribe = imageDescribe;
	}
	public String getSortId() {
		return sortId;
	}
	public void setSortId(String sortId) {
		this.sortId = sortId;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
}
