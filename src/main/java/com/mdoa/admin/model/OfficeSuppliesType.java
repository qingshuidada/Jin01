package com.mdoa.admin.model;

import java.util.List;

public class OfficeSuppliesType {

	private String suppliesTypeId;
	private String suppliesTypeUrl;
	private String suppliesTypeName;
	private String parentTypeId;
	private String aliveFlag;
	private String state;
	
	private String sourceId;
	private String sourceParentId;
	private String sourceName;
	private String targetId;
	private String targetUrl;
	private String targetName;
	private String point;
	private String sourceUrl;
	private String sourceUrlo;
	private SuppliesModel suppliesModel;
	private String replaceUrl;
	private String queryUrl;
	private String previousUrl;
	private String targetParentId;
	private List<SuppliesModel> treeList;
	private boolean flag;
	private boolean mflag;
	private boolean sflag;
	private String flagStr;
	private String ppreviousUrl;
	private String rreplaceUrl;
	private String formerSourceUrl;
	private String action;
	
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getSuppliesTypeId() {
		return suppliesTypeId;
	}
	public void setSuppliesTypeId(String suppliesTypeId) {
		this.suppliesTypeId = suppliesTypeId;
	}
	public String getSuppliesTypeUrl() {
		return suppliesTypeUrl;
	}
	public void setSuppliesTypeUrl(String suppliesTypeUrl) {
		this.suppliesTypeUrl = suppliesTypeUrl;
	}
	public String getSuppliesTypeName() {
		return suppliesTypeName;
	}
	public void setSuppliesTypeName(String suppliesTypeName) {
		this.suppliesTypeName = suppliesTypeName;
	}
	public String getParentTypeId() {
		return parentTypeId;
	}
	public void setParentTypeId(String parentTypeId) {
		this.parentTypeId = parentTypeId;
	}
	public String getAliveFlag() {
		return aliveFlag;
	}
	public void setAliveFlag(String aliveFlag) {
		this.aliveFlag = aliveFlag;
	}
	public String getSourceId() {
		return sourceId;
	}
	public void setSourceId(String sourceId) {
		this.sourceId = sourceId;
	}
	public String getSourceParentId() {
		return sourceParentId;
	}
	public void setSourceParentId(String sourceParentId) {
		this.sourceParentId = sourceParentId;
	}
	public String getSourceName() {
		return sourceName;
	}
	public void setSourceName(String sourceName) {
		this.sourceName = sourceName;
	}
	public String getTargetId() {
		return targetId;
	}
	public void setTargetId(String targetId) {
		this.targetId = targetId;
	}
	public String getTargetUrl() {
		return targetUrl;
	}
	public void setTargetUrl(String targetUrl) {
		this.targetUrl = targetUrl;
	}
	public String getTargetName() {
		return targetName;
	}
	public void setTargetName(String targetName) {
		this.targetName = targetName;
	}
	public String getPoint() {
		return point;
	}
	public void setPoint(String point) {
		this.point = point;
	}
	public String getSourceUrl() {
		return sourceUrl;
	}
	public void setSourceUrl(String sourceUrl) {
		this.sourceUrl = sourceUrl;
	}
	public String getSourceUrlo() {
		return sourceUrlo;
	}
	public void setSourceUrlo(String sourceUrlo) {
		this.sourceUrlo = sourceUrlo;
	}
	public SuppliesModel getSuppliesModel() {
		return suppliesModel;
	}
	public void setSuppliesModel(SuppliesModel suppliesModel) {
		this.suppliesModel = suppliesModel;
	}
	public String getReplaceUrl() {
		return replaceUrl;
	}
	public void setReplaceUrl(String replaceUrl) {
		this.replaceUrl = replaceUrl;
	}
	public String getQueryUrl() {
		return queryUrl;
	}
	public void setQueryUrl(String queryUrl) {
		this.queryUrl = queryUrl;
	}
	public String getPreviousUrl() {
		return previousUrl;
	}
	public void setPreviousUrl(String previousUrl) {
		this.previousUrl = previousUrl;
	}
	public String getTargetParentId() {
		return targetParentId;
	}
	public void setTargetParentId(String targetParentId) {
		this.targetParentId = targetParentId;
	}
	public List<SuppliesModel> getTreeList() {
		return treeList;
	}
	public void setTreeList(List<SuppliesModel> treeList) {
		this.treeList = treeList;
	}
	public boolean isFlag() {
		return flag;
	}
	public void setFlag(boolean flag) {
		this.flag = flag;
	}
	public boolean isMflag() {
		return mflag;
	}
	public void setMflag(boolean mflag) {
		this.mflag = mflag;
	}
	public boolean isSflag() {
		return sflag;
	}
	public void setSflag(boolean sflag) {
		this.sflag = sflag;
	}
	public String getFlagStr() {
		return flagStr;
	}
	public void setFlagStr(String flagStr) {
		this.flagStr = flagStr;
	}
	public String getPpreviousUrl() {
		return ppreviousUrl;
	}
	public void setPpreviousUrl(String ppreviousUrl) {
		this.ppreviousUrl = ppreviousUrl;
	}
	public String getRreplaceUrl() {
		return rreplaceUrl;
	}
	public void setRreplaceUrl(String rreplaceUrl) {
		this.rreplaceUrl = rreplaceUrl;
	}
	public String getFormerSourceUrl() {
		return formerSourceUrl;
	}
	public void setFormerSourceUrl(String formerSourceUrl) {
		this.formerSourceUrl = formerSourceUrl;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}

	
}
