package com.mdoa.repertory.bo;

import com.mdoa.base.model.BaseModel;

public class OutPrintForm extends BaseModel{
    
    private String outRecordId;
    private String goodsId;
    private String goodsName;
    private String unit;
    private String goodsSize;
    private String outNumber;
    private String taxAmount;//金额
    private String averPrice;//单价
    private String record;//备注
    
    private String outBatchFlowId;
    private String outBatchFlowCode;
    private String batchText;
    private String outTime;
    private String getDepartmentId;
    private String getDepartmentName;
    private String repertoryId;
    private String repertoryName;
    private String makerUserId;
    private String makerUserName;
    private String getUserName;//领料人
    
    public String getOutRecordId() {
        return outRecordId;
    }
    public void setOutRecordId(String outRecordId) {
        this.outRecordId = outRecordId;
    }
    public String getGoodsId() {
        return goodsId;
    }
    public void setGoodsId(String goodsId) {
        this.goodsId = goodsId;
    }
    public String getGoodsName() {
        return goodsName;
    }
    public void setGoodsName(String goodsName) {
        this.goodsName = goodsName;
    }
    public String getUnit() {
        return unit;
    }
    public void setUnit(String unit) {
        this.unit = unit;
    }
    public String getGoodsSize() {
        return goodsSize;
    }
    public void setGoodsSize(String goodsSize) {
        this.goodsSize = goodsSize;
    }
    public String getOutNumber() {
        return outNumber;
    }
    public void setOutNumber(String outNumber) {
        this.outNumber = outNumber;
    }
    public String getTaxAmount() {
        return taxAmount;
    }
    public void setTaxAmount(String taxAmount) {
        this.taxAmount = taxAmount;
    }
    public String getAverPrice() {
        return averPrice;
    }
    public void setAverPrice(String averPrice) {
        this.averPrice = averPrice;
    }
    public String getRecord() {
        return record;
    }
    public void setRecord(String record) {
        this.record = record;
    }
    public String getOutBatchFlowId() {
        return outBatchFlowId;
    }
    public void setOutBatchFlowId(String outBatchFlowId) {
        this.outBatchFlowId = outBatchFlowId;
    }
    public String getOutBatchFlowCode() {
        return outBatchFlowCode;
    }
    public void setOutBatchFlowCode(String outBatchFlowCode) {
        this.outBatchFlowCode = outBatchFlowCode;
    }
    public String getBatchText() {
        return batchText;
    }
    public void setBatchText(String batchText) {
        this.batchText = batchText;
    }
    public String getOutTime() {
        return outTime;
    }
    public void setOutTime(String outTime) {
        this.outTime = outTime;
    }
    public String getGetDepartmentId() {
        return getDepartmentId;
    }
    public void setGetDepartmentId(String getDepartmentId) {
        this.getDepartmentId = getDepartmentId;
    }
    public String getGetDepartmentName() {
        return getDepartmentName;
    }
    public void setGetDepartmentName(String getDepartmentName) {
        this.getDepartmentName = getDepartmentName;
    }
    public String getRepertoryId() {
        return repertoryId;
    }
    public void setRepertoryId(String repertoryId) {
        this.repertoryId = repertoryId;
    }
    public String getRepertoryName() {
        return repertoryName;
    }
    public void setRepertoryName(String repertoryName) {
        this.repertoryName = repertoryName;
    }
    public String getMakerUserId() {
        return makerUserId;
    }
    public void setMakerUserId(String makerUserId) {
        this.makerUserId = makerUserId;
    }
    public String getMakerUserName() {
        return makerUserName;
    }
    public void setMakerUserName(String makerUserName) {
        this.makerUserName = makerUserName;
    }
    public String getGetUserName() {
	return getUserName;
    }
    public void setGetUserName(String getUserName) {
	this.getUserName = getUserName;
    }
    
    
}
