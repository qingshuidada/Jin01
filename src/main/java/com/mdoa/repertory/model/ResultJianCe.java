package com.mdoa.repertory.model;

import com.mdoa.base.model.BaseModel;

public class ResultJianCe extends BaseModel{
	
	private String resultHot;
	
	private String resultWet;
	
	private String resultMaoZhi;
	
	private String resultMianZhi;
	
	private String resultId;


	public String getResultId() {
		return resultId;
	}

	public void setResultId(String resultId) {
		this.resultId = resultId;
	}

	public String getResultMianZhi() {
		return resultMianZhi;
	}

	public void setResultMianZhi(String resultMianZhi) {
		this.resultMianZhi = resultMianZhi;
	}

	public String getResultHot() {
		return resultHot;
	}

	public void setResultHot(String resultHot) {
		this.resultHot = resultHot;
	}

	public String getResultWet() {
		return resultWet;
	}

	public void setResultWet(String resultWet) {
		this.resultWet = resultWet;
	}

	public String getResultMaoZhi() {
		return resultMaoZhi;
	}

	public void setResultMaoZhi(String resultMaoZhi) {
		this.resultMaoZhi = resultMaoZhi;
	}
}
