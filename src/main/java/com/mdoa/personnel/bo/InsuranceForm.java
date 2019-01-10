package com.mdoa.personnel.bo;

import java.util.Date;

import com.mdoa.base.model.BaseModel;
import com.mdoa.util.DateUtil;

public class InsuranceForm extends BaseModel{
	private String insuranceId;
	private String insuranceTypeId;
	private String insuranceTypeName;
	private Date createTime;
	private String createTimeStr;
	private String createUserId;
	private String superType;
	private String text;
	private String idCard;
	private String insuranceSuperType;
	private String departmentName;
	
	
	
	public String getInsuranceTypeName() {
		return insuranceTypeName;
	}

	public void setInsuranceTypeName(String insuranceTypeName) {
		this.insuranceTypeName = insuranceTypeName;
	}

	public String getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}

	public String getInsuranceTypeId() {
		return insuranceTypeId;
	}

	public void setInsuranceTypeId(String insuranceTypeId) {
		this.insuranceTypeId = insuranceTypeId;
	}

	public String getInsuranceId() {
		return insuranceId;
	}

	public void setInsuranceId(String insuranceId) {
		this.insuranceId = insuranceId;
	}

	public String getSuperType() {
		return superType;
	}

	public void setSuperType(String superType) {
		this.superType = superType;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getIdCard() {
		return idCard;
	}

	public void setIdCard(String idCard) {
		this.idCard = idCard;
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

	public String getInsuranceSuperType() {
	    return insuranceSuperType;
	}

	public void setInsuranceSuperType(String insuranceSuperType) {
	    this.insuranceSuperType = insuranceSuperType;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public void parseData() {
		if("01".equals(insuranceSuperType)){
			insuranceSuperType = "集团养老保险";
		}else if ("02".equals(insuranceSuperType)){
			insuranceSuperType = "达美养老保险";
		}else if ("03".equals(insuranceSuperType)){
			insuranceSuperType = "雇主险";
		}else if ("04".equals(insuranceSuperType)){
			insuranceSuperType = "意外险";
		}else if ("05".equals(insuranceSuperType)){
			insuranceSuperType = "其他";
		}else if ("06".equals(insuranceSuperType)){
			insuranceSuperType = "住房公积金";
		}
		
	}
	
}
