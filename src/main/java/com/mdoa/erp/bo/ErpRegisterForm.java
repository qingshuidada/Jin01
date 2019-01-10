package com.mdoa.erp.bo;

import java.util.Date;

import com.mdoa.base.model.BaseModel;
import com.mdoa.util.DateUtil;

public class ErpRegisterForm extends BaseModel{

	private String customerId;
	private String customerName;
	private String phoneNumber;
	private String password;
	private Date createTime;
	private String createTimeStr;
	private String createUserId;
	private String createUserName;
	private Date updateTime;
	private String updateTimeStr;
	private String updateUserId;
	private String updateUserName;
	private String aliveFlag;
	
	private String customerNameId;
	private String customerNameSub;
	private String dataSourceKey;

	private String salesmanId;
	private String[] salesmanIds;
	private String userAccount;
	private String salesmanName;
	private String[] salesmanNames;

	private String salesmanNameId;
	private String[] salesmanNameIds;
	private String salesmanNameSub;
	
	private String key;
	private String name;
	private Integer salesmanAmount;
	private Integer customerAmount;
	private String dataSourceName;
	private String correlationId;
	private Integer count;
	private String inputStr;
	private String flag;
	private String loginFlag;
	
	private String oldPassword;
	private String newPassword;
	private String bindStatus;
	private String nickName;
	private String openId;
	private String ywmanFlag;
	private String kehuFlag;
	
	
	
	public String getYwmanFlag() {
		return ywmanFlag;
	}
	public void setYwmanFlag(String ywmanFlag) {
		this.ywmanFlag = ywmanFlag;
	}
	public String getKehuFlag() {
		return kehuFlag;
	}
	public void setKehuFlag(String kehuFlag) {
		this.kehuFlag = kehuFlag;
	}
	public String getOpenId() {
	    return openId;
	}
	public void setOpenId(String openId) {
	    this.openId = openId;
	}
	public String getNickName() {
	    return nickName;
	}
	public void setNickName(String nickName) {
	    this.nickName = nickName;
	}
	public String getBindStatus() {
	    return bindStatus;
	}
	public void setBindStatus(String bindStatus) {
	    this.bindStatus = bindStatus;
	}
	public String getLoginFlag() {
		return loginFlag;
	}
	public void setLoginFlag(String loginFlag) {
		this.loginFlag = loginFlag;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	public String getInputStr() {
		return inputStr;
	}
	public void setInputStr(String inputStr) {
		this.inputStr = inputStr;
	}
	public Integer getCount() {
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	public String[] getSalesmanNames() {
		return salesmanNames;
	}
	public void setSalesmanNames(String[] salesmanNames) {
		this.salesmanNames = salesmanNames;
	}
	public String getCorrelationId() {
		return correlationId;
	}
	public void setCorrelationId(String correlationId) {
		this.correlationId = correlationId;
	}
	public String[] getSalesmanIds() {
		return salesmanIds;
	}
	public void setSalesmanIds(String[] salesmanIds) {
		this.salesmanIds = salesmanIds;
	}
	public String[] getSalesmanNameIds() {
		return salesmanNameIds;
	}
	public void setSalesmanNameIds(String[] salesmanNameIds) {
		this.salesmanNameIds = salesmanNameIds;
	}
	public String getDataSourceName() {
		return dataSourceName;
	}
	public void setDataSourceName(String dataSourceName) {
		this.dataSourceName = dataSourceName;
	}
	public Integer getSalesmanAmount() {
		return salesmanAmount;
	}
	public void setSalesmanAmount(Integer salesmanAmount) {
		this.salesmanAmount = salesmanAmount;
	}
	public Integer getCustomerAmount() {
		return customerAmount;
	}
	public void setCustomerAmount(Integer customerAmount) {
		this.customerAmount = customerAmount;
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
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
	public String getCustomerNameId() {
		return customerNameId;
	}
	public void setCustomerNameId(String customerNameId) {
		this.customerNameId = customerNameId;
	}
	public String getCustomerNameSub() {
		return customerNameSub;
	}
	public void setCustomerNameSub(String customerNameSub) {
		this.customerNameSub = customerNameSub;
	}
	public String getDataSourceKey() {
		return dataSourceKey;
	}
	public void setDataSourceKey(String dataSourceKey) {
		this.dataSourceKey = dataSourceKey;
	}
	public String getSalesmanId() {
		return salesmanId;
	}
	public void setSalesmanId(String salesmanId) {
		this.salesmanId = salesmanId;
		this.salesmanIds = salesmanId.split(",");
	}
	public String getUserAccount() {
		return userAccount;
	}
	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}
	public String getSalesmanName() {
		return salesmanName;
	}
	public void setSalesmanName(String salesmanName) {
		this.salesmanName = salesmanName;
		this.salesmanNames = salesmanName.split(",");
	}
	public String getSalesmanNameId() {
		return salesmanNameId;
	}
	public void setSalesmanNameId(String salesmanNameId) {
		this.salesmanNameId = salesmanNameId;
		this.salesmanNameIds = salesmanNameId.split(",");
	}
	public String getSalesmanNameSub() {
		return salesmanNameSub;
	}
	public void setSalesmanNameSub(String salesmanNameSub) {
		this.salesmanNameSub = salesmanNameSub;
	}
	public String getOldPassword() {
		return oldPassword;
	}
	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	
	
}
