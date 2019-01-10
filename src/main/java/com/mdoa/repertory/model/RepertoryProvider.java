package com.mdoa.repertory.model;

import java.util.Date;

import com.mdoa.base.model.BaseModel;

//供应商
public class RepertoryProvider extends BaseModel{

	private String providerCode;//供应商编码
	private String providerName;//供应商名字
	private Double noWriteAmount;//未核销金额
	private Double initAmount;//初始化金额
	private Date createTime;
	private String createUserId;
	private String createUserName;
	private Date updatetime;
	private String updateUserId;
	private String updateUserName;
	private String aliveFlag;
	
	public String getProviderCode() {
		return providerCode;
	}
	public void setProviderCode(String providerCode) {
		this.providerCode = providerCode;
	}
	public String getProviderName() {
		return providerName;
	}
	public void setProviderName(String providerName) {
		this.providerName = providerName;
	}
	public Double getNoWriteAmount() {
		return noWriteAmount;
	}
	public void setNoWriteAmount(Double noWriteAmount) {
		this.noWriteAmount = noWriteAmount;
	}
	public Double getInitAmount() {
		return initAmount;
	}
	public void setInitAmount(Double initAmount) {
		this.initAmount = initAmount;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
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
	public Date getUpdatetime() {
		return updatetime;
	}
	public void setUpdatetime(Date updatetime) {
		this.updatetime = updatetime;
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
