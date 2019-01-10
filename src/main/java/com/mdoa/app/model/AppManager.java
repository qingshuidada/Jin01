package com.mdoa.app.model;
/**
 * 公司领导
 * @author Administrator
 *
 */
public class AppManager {

	private String managerId;
	private String managerTitle;
	private String managerEnglishTitle;
	private String managerSubtitle;
	private String managerAbstract;
	private String managerImageUrl;
	private String sortId;//类别id
	public String getManagerId() {
		return managerId;
	}
	public void setManagerId(String managerId) {
		this.managerId = managerId;
	}
	public String getManagerTitle() {
		return managerTitle;
	}
	public void setManagerTitle(String managerTitle) {
		this.managerTitle = managerTitle;
	}
	public String getManagerEnglishTitle() {
		return managerEnglishTitle;
	}
	public void setManagerEnglishTitle(String managerEnglishTitle) {
		this.managerEnglishTitle = managerEnglishTitle;
	}
	public String getManagerSubtitle() {
		return managerSubtitle;
	}
	public void setManagerSubtitle(String managerSubtitle) {
		this.managerSubtitle = managerSubtitle;
	}
	public String getManagerAbstract() {
		return managerAbstract;
	}
	public void setManagerAbstract(String managerAbstract) {
		this.managerAbstract = managerAbstract;
	}
	public String getManagerImageUrl() {
		return managerImageUrl;
	}
	public void setManagerImageUrl(String managerImageUrl) {
		this.managerImageUrl = managerImageUrl;
	}
	public String getSortId() {
		return sortId;
	}
	public void setSortId(String sortId) {
		this.sortId = sortId;
	}

	
}
