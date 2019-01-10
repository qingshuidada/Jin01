package com.mdoa.processManage.po;

import com.mdoa.base.model.BaseModel;

public class GroupForm extends BaseModel{
	private String groupName;
	private String hasUserId;
	
	public GroupForm(){
		
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getHasUserId() {
		return hasUserId;
	}

	public void setHasUserId(String hasUserId) {
		this.hasUserId = hasUserId;
	}
	
	
}
