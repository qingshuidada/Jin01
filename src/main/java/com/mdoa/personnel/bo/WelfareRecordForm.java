package com.mdoa.personnel.bo;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.mdoa.base.model.BaseModel;
import com.mdoa.util.DateUtil;
import com.mdoa.util.StringUtil;

public class WelfareRecordForm extends BaseModel{
	private String welfareRecordId;// 福利发放记录id
	private String welfareId;// 所属福利id
	private String getUserId;// 获得用户id
	private String getUserIdCard;// 获得福利用户身份证
	private String getUserName;// 用户姓名
	private Date giveTime;// 发放时间
	private String giveTimeStr;
	private Date getTime;// 领取时间
	private String getTimeStr;
	private String getFlag;// 是否已领取0 没有 1 领取了
	private String objFlag;
	private String welfareName;
	private String welfareCode;
	private String departmentName;
	private String postName;
	private Date createTime;
	private String createTimeStr;
	private String createUserId;
	private String createUserName;
	private String text;
	private String reason;
	private String finishFlag;
	private Double budgetAmount;
	
	
	public Double getBudgetAmount() {
		return budgetAmount;
	}

	public void setBudgetAmount(Double budgetAmount) {
		this.budgetAmount = budgetAmount;
	}

	public String getFinishFlag() {
		return finishFlag;
	}

	public void setFinishFlag(String finishFlag) {
		this.finishFlag = finishFlag;
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

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public Date getGiveTime() {
		return giveTime;
	}

	public String getGiveTimeStr() {
		return giveTimeStr;
	}

	public Date getGetTime() {
		return getTime;
	}

	public String getGetTimeStr() {
		return getTimeStr;
	}

	public String getWelfareRecordId() {
		return welfareRecordId;
	}

	public void setWelfareRecordId(String welfareRecordId) {
		this.welfareRecordId = welfareRecordId;
	}

	public String getWelfareId() {
		return welfareId;
	}

	public void setWelfareId(String welfareId) {
		this.welfareId = welfareId;
	}

	public String getGetUserId() {
		return getUserId;
	}

	public void setGetUserId(String getUserId) {
		this.getUserId = getUserId;
	}

	public String getGetUserIdCard() {
		return getUserIdCard;
	}

	public void setGetUserIdCard(String getUserIdCard) {
		this.getUserIdCard = getUserIdCard;
	}

	public String getGetUserName() {
		return getUserName;
	}

	public void setGetUserName(String getUserName) {
		this.getUserName = getUserName;
	}

	public String getGetFlag() {
		return getFlag;
	}

	public void setGetFlag(String getFlag) {
		this.getFlag = getFlag;
	}

	public void setGiveTime(Date giveTime) {
		this.giveTime = giveTime;
		this.giveTimeStr = DateUtil.dateToStr(giveTime,"yyyy-MM-dd");
	}

	public void setGetTime(Date getTime) {
		this.getTime = getTime;
		this.getTimeStr = DateUtil.dateToStr(getTime);
	}

	public void setGiveTimeStr(String giveTimeStr) {
		this.giveTimeStr = giveTimeStr;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			this.giveTime = sdf.parse(giveTimeStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
	}

	public void setGetTimeStr(String getTimeStr) {
		this.getTimeStr = getTimeStr;
		this.getTime = DateUtil.strToDate(getTimeStr);
	}

	public String getObjFlag() {
		return objFlag;
	}

	public void setObjFlag(String objFlag) {
		this.objFlag = objFlag;
	}

	public String getWelfareName() {
		return welfareName;
	}

	public void setWelfareName(String welfareName) {
		this.welfareName = welfareName;
	}

	public String getWelfareCode() {
		return welfareCode;
	}

	public void setWelfareCode(String welfareCode) {
		this.welfareCode = welfareCode;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getPostName() {
		return postName;
	}

	public void setPostName(String postName) {
		this.postName = postName;
	}
	
	public void parseGetFlag(){
		if(StringUtil.isEmpty(getFlag)){
			getFlag="";
 	 	}else if(getFlag.equals("0")){
	 	 	getFlag="未领取";
 	   }else if(getFlag.equals("1")){
	 		getFlag="已领取";
 	   }
	}
}
