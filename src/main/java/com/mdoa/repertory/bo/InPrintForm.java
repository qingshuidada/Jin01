package com.mdoa.repertory.bo;

import com.mdoa.base.model.BaseModel;

public class InPrintForm extends BaseModel{
    
    private String inRecordId;
    private String goodsId;
    private String goodsName;
    private String goodsSize;
    private String unit;
    private String inNumber;
    private String pretaxAverPrice;
    private String pretaxAmount;
    private String taxRate;
    private String taxedAmount;//税额
    private String invoiceId;//发票id
    private String invoiceNumber;//发票号
    
    private String inBatchFlowId;
    private String inBatchFlowCode;
    private String batchText;
    private String repertoryId;
    private String repertoryName;
    private String putUserName;
    private String inTime;
    private String providerCode;
    private String providerName;
    private String makerUserId;//制单人id
    private String makerUserName;//制单人姓名
    
    public String getInBatchFlowId() {
        return inBatchFlowId;
    }
    public void setInBatchFlowId(String inBatchFlowId) {
        this.inBatchFlowId = inBatchFlowId;
    }
    public String getInBatchFlowCode() {
        return inBatchFlowCode;
    }
    public void setInBatchFlowCode(String inBatchFlowCode) {
        this.inBatchFlowCode = inBatchFlowCode;
    }
    public String getBatchText() {
        return batchText;
    }
    public void setBatchText(String batchText) {
        this.batchText = batchText;
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
    public String getPutUserName() {
        return putUserName;
    }
    public void setPutUserName(String putUserName) {
        this.putUserName = putUserName;
    }
    public String getInTime() {
        return inTime;
    }
    public void setInTime(String inTime) {
        this.inTime = inTime;
    }
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
    public String getGoodsSize() {
        return goodsSize;
    }
    public void setGoodsSize(String goodsSize) {
        this.goodsSize = goodsSize;
    }
    public String getUnit() {
        return unit;
    }
    public void setUnit(String unit) {
        this.unit = unit;
    }
    public String getInNumber() {
        return inNumber;
    }
    public void setInNumber(String inNumber) {
        this.inNumber = inNumber;
    }
    public String getPretaxAverPrice() {
        return pretaxAverPrice;
    }
    public void setPretaxAverPrice(String pretaxAverPrice) {
        this.pretaxAverPrice = pretaxAverPrice;
    }
    public String getPretaxAmount() {
        return pretaxAmount;
    }
    public void setPretaxAmount(String pretaxAmount) {
        this.pretaxAmount = pretaxAmount;
    }
    public String getTaxRate() {
        return taxRate;
    }
    public void setTaxRate(String taxRate) {
        this.taxRate = taxRate;
    }
    public String getTaxedAmount() {
        return taxedAmount;
    }
    public void setTaxedAmount(String taxedAmount) {
        this.taxedAmount = taxedAmount;
    }
    public String getInvoiceId() {
        return invoiceId;
    }
    public void setInvoiceId(String invoiceId) {
        this.invoiceId = invoiceId;
    }
    public String getInRecordId() {
	return inRecordId;
    }
    public void setInRecordId(String inRecordId) {
	this.inRecordId = inRecordId;
    }
    public String getInvoiceNumber() {
	return invoiceNumber;
    }
    public void setInvoiceNumber(String invoiceNumber) {
	this.invoiceNumber = invoiceNumber;
    }
    
}
