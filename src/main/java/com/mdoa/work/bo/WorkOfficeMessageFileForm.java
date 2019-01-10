package com.mdoa.work.bo;

import com.mdoa.base.model.BaseModel;
import com.mdoa.util.StringUtil;

public class WorkOfficeMessageFileForm extends BaseModel{
	
	private String fileFolderId;
	private String fileFolderName;
	private String departmentId;
	private String fileUrl;
	private String typeFlag;
	private String previousFileFolderId;
	private String createTime;
	private String createUserId;
	private String createUserName;
	private String updateTime;
	private String updateUserId;
	private String updateUserName;
	private String aliveFlag;
	private String url;
	private String departmentUrl;
	private String oldFileUrl;
	private String newFileUrl;
	private String departmentName;
	private String[] fileFolderIds;
	private String oldFileFolderName;
	private String newFileFolderName;
	
	
	
	public String getNewFileFolderName() {
		return newFileFolderName;
	}
	public void setNewFileFolderName(String newFileFolderName) {
		this.newFileFolderName = newFileFolderName;
	}
	public String getOldFileFolderName() {
		return oldFileFolderName;
	}
	public void setOldFileFolderName(String oldFileFolderName) {
		this.oldFileFolderName = oldFileFolderName;
	}
	public String[] getFileFolderIds() {
		return fileFolderIds;
	}
	public void setFileFolderIds(String[] fileFolderIds) {
		this.fileFolderIds = fileFolderIds;
	}
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public String getNewFileUrl() {
		return newFileUrl;
	}
	public void setNewFileUrl(String newFileUrl) {
		this.newFileUrl = newFileUrl;
	}
	public String getOldFileUrl() {
		return oldFileUrl;
	}
	public void setOldFileUrl(String oldFileUrl) {
		this.oldFileUrl = oldFileUrl;
	}
	public String getDepartmentUrl() {
		return departmentUrl;
	}
	public void setDepartmentUrl(String departmentUrl) {
		this.departmentUrl = departmentUrl;
		this.departmentId = StringUtil.getIdFromUrl(departmentUrl);
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getFileFolderId() {
		return fileFolderId;
	}
	public void setFileFolderId(String fileFolderId) {
		this.fileFolderId = fileFolderId;
	}
	public String getFileFolderName() {
		return fileFolderName;
	}
	public void setFileFolderName(String fileFolderName) {
		this.fileFolderName = fileFolderName;
	}
	public String getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}
	public String getFileUrl() {
		return fileUrl;
	}
	public void setFileUrl(String fileUrl) {
		this.fileUrl = fileUrl;
	}
	public String getTypeFlag() {
		return typeFlag;
	}
	public void setTypeFlag(String typeFlag) {
		this.typeFlag = typeFlag;
	}
	public String getPreviousFileFolderId() {
		return previousFileFolderId;
	}
	public void setPreviousFileFolderId(String previousFileFolderId) {
		this.previousFileFolderId = previousFileFolderId;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getCreateUserId() {
		return createUserId;
	}
	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}
	public String getCreateUserName() {
		return createUserName;
	}
	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}
	public String getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}
	public String getUpdateUserId() {
		return updateUserId;
	}
	public void setUpdateUserId(String updateUserId) {
		this.updateUserId = updateUserId;
	}
	public String getUpdateUserName() {
		return updateUserName;
	}
	public void setUpdateUserName(String updateUserName) {
		this.updateUserName = updateUserName;
	}
	public String getAliveFlag() {
		return aliveFlag;
	}
	public void setAliveFlag(String aliveFlag) {
		this.aliveFlag = aliveFlag;
	}

	
}
