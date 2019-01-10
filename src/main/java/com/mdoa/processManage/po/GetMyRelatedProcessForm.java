package com.mdoa.processManage.po;

import com.mdoa.base.model.BaseModel;

public class GetMyRelatedProcessForm extends BaseModel{
	private String createUserName;
	private String createTimeStart;
	private String createTimeEnd;
	private String processType;
	private String relativeLeave;
	
	public GetMyRelatedProcessForm(){
		
	}

	public String getCreateUserName() {
		return createUserName;
	}

	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}

	public String getCreateTimeStart() {
		return createTimeStart;
	}

	public void setCreateTimeStart(String createTimeStart) {
		this.createTimeStart = createTimeStart;
	}

	public String getCreateTimeEnd() {
		return createTimeEnd;
	}

	public void setCreateTimeEnd(String createTimeEnd) {
		this.createTimeEnd = createTimeEnd;
	}

	public String getProcessType() {
		return processType;
	}

	public void setProcessType(String processType) {
		this.processType = processType;
	}

	public String getRelativeLeave() {
		return relativeLeave;
	}

	public void setRelativeLeave(String relativeLeave) {
		this.relativeLeave = relativeLeave;
	}
	
	
}
