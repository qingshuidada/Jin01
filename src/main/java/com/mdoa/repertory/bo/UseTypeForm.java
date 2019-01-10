package com.mdoa.repertory.bo;

import java.util.Date;

import com.mdoa.base.model.BaseModel;

/**
 * 仓库类型
 * 
 * @author Administrator
 *
 */
public class UseTypeForm extends BaseModel{

	private String useTypeId;
	private String useTypeName;
	private String createTime;
	private Date strCreateTime;
	private String createUserId;
	private String createUserName;
	private String updateTime;
	private Date strUpdateTime;
	private String updateUserId;
	private String updateUserName;
	private String aliveFlag;

	public String getUseTypeId() {
		return useTypeId;
	}

	public void setUseTypeId(String useTypeId) {
		this.useTypeId = useTypeId;
	}

	public String getUseTypeName() {
		return useTypeName;
	}

	public void setUseTypeName(String useTypeName) {
		this.useTypeName = useTypeName;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public Date getStrCreateTime() {
		return strCreateTime;
	}

	public void setStrCreateTime(Date strCreateTime) {
		this.strCreateTime = strCreateTime;
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

	public Date getStrUpdateTime() {
		return strUpdateTime;
	}

	public void setStrUpdateTime(Date strUpdateTime) {
		this.strUpdateTime = strUpdateTime;
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
