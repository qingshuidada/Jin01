package com.mdoa.processManage.model;

import java.util.List;

import com.zhou.myProcess.instance.TaskModel;

public class ProcessMessage {
	private String processId;
	private String processName;
	private String title;
	private String processTypeId;
	private String processTypeName;
	private String processRecordId;
	private String createTime;
	private String updateTime;
	private String userId;
	private String userName;
	private String departmentName;
	private String canCallBack;
	private String typeId;
	private String executeStatus;
	private String formUrl;
	private List<TaskModel> excuteUserHead;
	private List<TaskModel> copyToUsers;
	private List<TaskModel> mustExcuteUserHead;
	private List<TaskModel> mustCopyToUsers;
	
	public ProcessMessage(){
		
	}
	
	public String getProcessId() {
		return processId;
	}
	public void setProcessId(String processId) {
		this.processId = processId;
	}
	public String getProcessName() {
		return processName;
	}
	public void setProcessName(String processName) {
		this.processName = processName;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}

	public List<TaskModel> getExcuteUserHead() {
		return excuteUserHead;
	}

	public void setExcuteUserHead(List<TaskModel> excuteUserHead) {
		this.excuteUserHead = excuteUserHead;
	}

	public List<TaskModel> getCopyToUsers() {
		return copyToUsers;
	}

	public void setCopyToUsers(List<TaskModel> copyToUsers) {
		this.copyToUsers = copyToUsers;
	}

	public String getTypeId() {
		return typeId;
	}

	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getProcessTypeId() {
		return processTypeId;
	}

	public void setProcessTypeId(String processTypeId) {
		this.processTypeId = processTypeId;
	}

	public String getProcessTypeName() {
		return processTypeName;
	}

	public void setProcessTypeName(String processTypeName) {
		this.processTypeName = processTypeName;
	}

	public String getProcessRecordId() {
		return processRecordId;
	}

	public void setProcessRecordId(String processRecordId) {
		this.processRecordId = processRecordId;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(String updateTime) {
		this.updateTime = updateTime;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getCanCallBack() {
		return canCallBack;
	}

	public void setCanCallBack(String canCallBack) {
		this.canCallBack = canCallBack;
	}
	
	public String getExecuteStatus() {
		return executeStatus;
	}

	public void setExecuteStatus(String executeStatus) {
		this.executeStatus = executeStatus;
	}

	public String getFormUrl() {
		return formUrl;
	}

	public void setFormUrl(String formUrl) {
		this.formUrl = formUrl;
	}

	public List<TaskModel> getMustExcuteUserHead() {
		return mustExcuteUserHead;
	}

	public void setMustExcuteUserHead(List<TaskModel> mustExcuteUserHead) {
		this.mustExcuteUserHead = mustExcuteUserHead;
	}

	public List<TaskModel> getMustCopyToUsers() {
		return mustCopyToUsers;
	}

	public void setMustCopyToUsers(List<TaskModel> mustCopyToUsers) {
		this.mustCopyToUsers = mustCopyToUsers;
	}

	public void canCallBack(String userId) {
		if(this.executeStatus.equals("1") && this.userId.equals(userId)){
			this.canCallBack = "true";
		}else{
			this.canCallBack = "false";
		}
	}
}
