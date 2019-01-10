package com.mdoa.personnel.bo;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;


public class ProcessWelfareForm {
	
	private String welfareId;// id
	private String welfareName;
	private String processRecordId;//相关流程id
	private String userGroup;
	private String text;// 描述
	private String reason;// 发放原因
	private Date giveTime;// 发放时间 没有时分秒
	private String giveTimeStr;
	private Double budgetAmount;//预算金额
	private Integer population;//发放福利人数
	private String userId;
	private String userName;
	

	public int getPopulation() {
		return population;
	}

	public void setPopulation(int population) {
		this.population = population;
	}

	public Double getBudgetAmount() {
		return budgetAmount;
	}

	public void setBudgetAmount(Double budgetAmount) {
		this.budgetAmount = budgetAmount;
	}

	public String getWelfareId() {
		return welfareId;
	}

	public void setWelfareId(String welfareId) {
		this.welfareId = welfareId;
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

	public void setGiveTime(Date giveTime) {
		this.giveTime = giveTime;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		giveTimeStr = sdf.format(giveTime);
	}

	public String getGiveTimeStr() {
		return giveTimeStr;
	}

	public void setGiveTimeStr(String giveTimeStr) {
		this.giveTimeStr = giveTimeStr;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		try {
			giveTime = sdf.parse(giveTimeStr);
		} catch (ParseException e) {
			e.printStackTrace();
		}
	}

	public String getWelfareName() {
		return welfareName;
	}

	public void setWelfareName(String welfareName) {
		this.welfareName = welfareName;
	}

	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getProcessRecordId() {
		return processRecordId;
	}

	public void setProcessRecordId(String processRecordId) {
		this.processRecordId = processRecordId;
	}

	@Override
	public String toString() {
		return "ProcessWelfareForm [welfareId=" + welfareId + ", welfareName=" + welfareName + ", processRecordId="
				+ processRecordId + ", userGroup=" + userGroup + ", text=" + text + ", reason=" + reason
				+ ", giveTime=" + giveTime + ", giveTimeStr=" + giveTimeStr + ", budgetAmount=" + budgetAmount
				+ ", population=" + population + ", userId=" + userId + ", userName=" + userName + "]";
	}

	public String getUserGroup() {
		return userGroup;
	}

	public void setUserGroup(String userGroup) {
		this.userGroup = userGroup;
	}

	
}
