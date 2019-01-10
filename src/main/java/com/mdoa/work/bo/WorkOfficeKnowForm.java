package com.mdoa.work.bo;

import java.util.Date;
import java.util.List;

import com.mdoa.base.model.BaseModel;
import com.mdoa.base.model.PageModel;
import com.mdoa.util.DateUtil;

public class WorkOfficeKnowForm extends BaseModel{

	private String docId;
	private String titleName;
	private String secondCategoryId;
	private String text;
	private String firstCategoryId;
	private String typeFlag;
	private Integer clickAmount;
	private Integer replyAmount;
	
	private String firstCategoryName;
	private String openness;
	private Integer orderCode;
	
	private String secondCategoryName;
	
	private String commentId;
	private String commentUserId;
	private String commentUserName;
	private String content;
	
	private Date createTime;
	private String createTimeStr;
	private String createUserId;
	private String createUserName;
	private Date updateTime;
	private String updateTimeStr;
	private String updateUserId;
	private String updateUserName;
	private String aliveFlag;
	
	private String startTimeStr;
	private String endTimeStr;
	private String clickFlag;
	private String replyFlag;
	private String isDeleteFlag;
	private String deleteFlag;
	private String addFlag;
	private String departmentName;
	private String departmentUrl;
	private PageModel<WorkOfficeKnowForm> pageModel;
	
	
	
	
	public String getAddFlag() {
		return addFlag;
	}
	public void setAddFlag(String addFlag) {
		this.addFlag = addFlag;
	}
	public String getIsDeleteFlag() {
		return isDeleteFlag;
	}
	public void setIsDeleteFlag(String isDeleteFlag) {
		this.isDeleteFlag = isDeleteFlag;
	}
	public String getDeleteFlag() {
		return deleteFlag;
	}
	public void setDeleteFlag(String deleteFlag) {
		this.deleteFlag = deleteFlag;
	}
	public PageModel<WorkOfficeKnowForm> getPageModel() {
		return pageModel;
	}
	public void setPageModel(PageModel<WorkOfficeKnowForm> pageModel) {
		this.pageModel = pageModel;
	}
	private List<WorkOfficeKnowForm> list;
	
	
	public List<WorkOfficeKnowForm> getList() {
		return list;
	}
	public void setList(List<WorkOfficeKnowForm> list) {
		this.list = list;
	}
	public String getClickFlag() {
		return clickFlag;
	}
	public void setClickFlag(String clickFlag) {
		this.clickFlag = clickFlag;
	}
	public String getReplyFlag() {
		return replyFlag;
	}
	public void setReplyFlag(String replyFlag) {
		this.replyFlag = replyFlag;
	}
	public String getCommentId() {
		return commentId;
	}
	public void setCommentId(String commentId) {
		this.commentId = commentId;
	}
	public String getCommentUserId() {
		return commentUserId;
	}
	public void setCommentUserId(String commentUserId) {
		this.commentUserId = commentUserId;
	}
	public String getCommentUserName() {
		return commentUserName;
	}
	public void setCommentUserName(String commentUserName) {
		this.commentUserName = commentUserName;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Integer getReplyAmount() {
		return replyAmount;
	}
	public void setReplyAmount(Integer replyAmount) {
		this.replyAmount = replyAmount;
	}
	public Integer getClickAmount() {
		return clickAmount;
	}
	public void setClickAmount(Integer clickAmount) {
		this.clickAmount = clickAmount;
	}
	public String getStartTimeStr() {
		return startTimeStr;
	}
	public void setStartTimeStr(String startTimeStr) {
		this.startTimeStr = startTimeStr;
	}
	public String getEndTimeStr() {
		return endTimeStr;
	}
	public void setEndTimeStr(String endTimeStr) {
		this.endTimeStr = endTimeStr;
	}
	public String getDocId() {
		return docId;
	}
	public void setDocId(String docId) {
		this.docId = docId;
	}
	public String getTitleName() {
		return titleName;
	}
	public void setTitleName(String titleName) {
		this.titleName = titleName;
	}
	public String getSecondCategoryId() {
		return secondCategoryId;
	}
	public void setSecondCategoryId(String secondCategoryId) {
		this.secondCategoryId = secondCategoryId;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getFirstCategoryId() {
		return firstCategoryId;
	}
	public void setFirstCategoryId(String firstCategoryId) {
		this.firstCategoryId = firstCategoryId;
	}
	public String getTypeFlag() {
		return typeFlag;
	}
	public void setTypeFlag(String typeFlag) {
		this.typeFlag = typeFlag;
	}
	public String getFirstCategoryName() {
		return firstCategoryName;
	}
	public void setFirstCategoryName(String firstCategoryName) {
		this.firstCategoryName = firstCategoryName;
	}
	public String getOpenness() {
		return openness;
	}
	public void setOpenness(String openness) {
		this.openness = openness;
	}
	public Integer getOrderCode() {
		return orderCode;
	}
	public void setOrderCode(Integer orderCode) {
		this.orderCode = orderCode;
	}
	public String getSecondCategoryName() {
		return secondCategoryName;
	}
	public void setSecondCategoryName(String secondCategoryName) {
		this.secondCategoryName = secondCategoryName;
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
	public String getDepartmentName() {
		return departmentName;
	}
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}
	public String getDepartmentUrl() {
		return departmentUrl;
	}
	public void setDepartmentUrl(String departmentUrl) {
		this.departmentUrl = departmentUrl;
	}
	
}
