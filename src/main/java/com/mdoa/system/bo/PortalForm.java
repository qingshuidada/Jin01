package com.mdoa.system.bo;

import java.util.Date;

import com.mdoa.base.model.BaseModel;
import com.mdoa.util.DateUtil;

public class PortalForm extends BaseModel{
	
	private String portalInfoId;
	//private String portalDraftId;
	private String title;//标题
	private String text;//正文
	private String superType;//大类别
	private String subType;//小类别
	private String draftFlag;//是否草稿
	private Date publishTime;//发布时间
	private String publishTimeStr;
	private String createUserId;
	private String createUserName;
	private Date createTime;
	private String createTimeStr;
	private String updateUserId;
	private String updateUserName;
	private Date updateTime;
	private String updateTimeStr;
	private String aliveFlag;
	
	
	public String getPortalInfoId() {
		return portalInfoId;
	}
	public void setPortalInfoId(String portalInfoId) {
		this.portalInfoId = portalInfoId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getSuperType() {
		return superType;
	}
	public void setSuperType(String superType) {
		this.superType = superType;
	}
	public String getSubType() {
		return subType;
	}
	public void setSubType(String subType) {
		this.subType = subType;
	}
	public Date getPublishTime() {
		return publishTime;
	}
	public void setPublishTime(Date publishTime) {
		this.publishTime = publishTime;
		this.publishTimeStr = DateUtil.dateToStr(publishTime);
	}
	public String getPublishTimeStr() {
		return publishTimeStr;
	}
	public void setPublishTimeStr(String publishTimeStr) {
		this.publishTimeStr = publishTimeStr;
		this.publishTime = DateUtil.strToDate(publishTimeStr);
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
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
		this.createTimeStr = DateUtil.dateToStr(createTime);
	}
	public String getCreateTimeStr() {
		return createTimeStr;
	}
	public void setCreateTimeStr(String createTimeStr) {
		this.createTimeStr = createTimeStr;
		this.createTime = DateUtil.strToDate(createTimeStr);
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
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
		this.updateTimeStr = DateUtil.dateToStr(updateTime);
	}
	public String getUpdateTimeStr() {
		return updateTimeStr;
	}
	public void setUpdateTimeStr(String updateTimeStr) {
		this.updateTimeStr = updateTimeStr;
		this.updateTime = DateUtil.strToDate(updateTimeStr);
	}
	public String getAliveFlag() {
		return aliveFlag;
	}
	public void setAliveFlag(String aliveFlag) {
		this.aliveFlag = aliveFlag;
	}
//	public String getPortalDraftId() {
//		return portalDraftId;
//	}
//	public void setPortalDraftId(String portalDraftId) {
//		this.portalDraftId = portalDraftId;
//	}
	public String getDraftFlag() {
		return draftFlag;
	}
	public void setDraftFlag(String draftFlag) {
		this.draftFlag = draftFlag;
	}
}
