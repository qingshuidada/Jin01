package com.mdoa.repertory.bo;

import java.util.Date;
import java.util.List;

import com.mdoa.base.model.BaseModel;
import com.mdoa.base.model.PageModel;
import com.mdoa.util.DateUtil;

public class RepertoryInvoiceForm extends BaseModel{

	private String invoiceId;
	private String invoiceIds;
	private String invoiceNumber;
	private Date openDate;
	private String openDateStr;
	private Double invoiceAmount;
	private String text;
	private Date createTime;
	private String createTimeStr;
	private String createUserId;
	private String createUserName;
	private Date updateTime;
	private String updateTimeStr;
	private String updateUserId;
	private String updateUserName;
	private String aliveFlag;
	private String pInvoiceId;
	
	private String jsonString;
	private String startTimeStr;
	private String endTimeStr;
	private Double nowNoWriteAmount;
	private String invoiceRecordId;
	private String inRecordId;
	private Double writeAmount;//核销金额
	private Double shouldWriteAmount;//核销金额
	private Double noWriteAmount;//未核销金额	
	
	private Double taxRate;//税率
	private String redId;
	private String providerCode;
	private Double taxAmount;//入库金额
	private Double previousNoWriteAmount;//上期未开票金额
	
	private String goodsId;
	private String repertoryId;
	private String repertoryName;
	private String goodsPositionId;
	private String goodsPositionName;
	private Integer inNumber;
	private Double pretaxAmount;
	private Double pretaxAverPrice;
	private Double taxAverPrice;
	private String operateUserId;
	private String operate_userName;
	private Date inTime;
	private String inTimeStr;
	private String putUserId;
	private String putUserName;
	private String record;
	private String providerName;
	private String goodsName;
	private Double currentNoWriteAmount;
	private Double currentTaxAmount;
	private Double currentWriteAmount;
	private boolean isRed;
	private List<RepertoryInvoiceForm> list;
	private PageModel<RepertoryInvoiceForm> pageModel;
	private String goodsSize;
	private boolean isDelete;
	private Double initAmount;
	private Double redAmount;
	private Double lastedWriteAmount;
	private Double lastedTaxAmount;
	private String cptName;
	private String sumFlag;
	private Double previousNoWriteAmountTotal;
	private Double currentTaxAmountTotal;
	private Double currentWriteAmountTotal;
	private Double currentNoWriteAmountTotal;
	
	
	public Double getPreviousNoWriteAmountTotal() {
		return previousNoWriteAmountTotal;
	}

	public void setPreviousNoWriteAmountTotal(Double previousNoWriteAmountTotal) {
		this.previousNoWriteAmountTotal = previousNoWriteAmountTotal;
	}

	public Double getCurrentTaxAmountTotal() {
		return currentTaxAmountTotal;
	}

	public void setCurrentTaxAmountTotal(Double currentTaxAmountTotal) {
		this.currentTaxAmountTotal = currentTaxAmountTotal;
	}

	public Double getCurrentWriteAmountTotal() {
		return currentWriteAmountTotal;
	}

	public void setCurrentWriteAmountTotal(Double currentWriteAmountTotal) {
		this.currentWriteAmountTotal = currentWriteAmountTotal;
	}

	public Double getCurrentNoWriteAmountTotal() {
		return currentNoWriteAmountTotal;
	}

	public void setCurrentNoWriteAmountTotal(Double currentNoWriteAmountTotal) {
		this.currentNoWriteAmountTotal = currentNoWriteAmountTotal;
	}

	public String getSumFlag() {
		return sumFlag;
	}

	public void setSumFlag(String sumFlag) {
		this.sumFlag = sumFlag;
	}

	public Double getNoWriteAmountTotal() {
		return noWriteAmountTotal;
	}

	public void setNoWriteAmountTotal(Double noWriteAmountTotal) {
		this.noWriteAmountTotal = noWriteAmountTotal;
	}

	public Double getTaxAmountTotal() {
		return taxAmountTotal;
	}

	public void setTaxAmountTotal(Double taxAmountTotal) {
		this.taxAmountTotal = taxAmountTotal;
	}

	private Double noWriteAmountTotal;
	private Double taxAmountTotal;
	
	
	public String getpInvoiceId() {
		return pInvoiceId;
	}

	public void setpInvoiceId(String pInvoiceId) {
		this.pInvoiceId = pInvoiceId;
	}

	public Double getLastedWriteAmount() {
		return lastedWriteAmount;
	}

	public void setLastedWriteAmount(Double lastedWriteAmount) {
		this.lastedWriteAmount = lastedWriteAmount;
	}

	public Double getLastedTaxAmount() {
		return lastedTaxAmount;
	}

	public void setLastedTaxAmount(Double lastedTaxAmount) {
		this.lastedTaxAmount = lastedTaxAmount;
	}

	public Double getNowNoWriteAmount() {
		return nowNoWriteAmount;
	}

	public void setNowNoWriteAmount(Double nowNoWriteAmount) {
		this.nowNoWriteAmount = nowNoWriteAmount;
	}

	public Double getRedAmount() {
		return redAmount;
	}

	public void setRedAmount(Double redAmount) {
		this.redAmount = redAmount;
	}

	public Double getInitAmount() {
		return initAmount;
	}

	public void setInitAmount(Double initAmount) {
		this.initAmount = initAmount;
	}

	public boolean isDelete() {
		return isDelete;
	}

	public void setDelete(boolean isDelete) {
		this.isDelete = isDelete;
	}

	public String getGoodsSize() {
		return goodsSize;
	}

	public void setGoodsSize(String goodsSize) {
		this.goodsSize = goodsSize;
	}

	public PageModel<RepertoryInvoiceForm> getPageModel() {
		return pageModel;
	}

	public void setPageModel(PageModel<RepertoryInvoiceForm> pageModel) {
		this.pageModel = pageModel;
	}

	public List<RepertoryInvoiceForm> getList() {
		return list;
	}

	public void setList(List<RepertoryInvoiceForm> list) {
		this.list = list;
	}

	public boolean isRed() {
		return isRed;
	}

	public void setRed(boolean isRed) {
		this.isRed = isRed;
	}

	public Double getCurrentTaxAmount() {
		return currentTaxAmount;
	}

	public void setCurrentTaxAmount(Double currentTaxAmount) {
		this.currentTaxAmount = currentTaxAmount;
	}

	public Double getCurrentWriteAmount() {
		return currentWriteAmount;
	}

	public void setCurrentWriteAmount(Double currentWriteAmount) {
		this.currentWriteAmount = currentWriteAmount;
	}

	public Double getCurrentNoWriteAmount() {
		return currentNoWriteAmount;
	}

	public void setCurrentNoWriteAmount(Double currentNoWriteAmount) {
		this.currentNoWriteAmount = currentNoWriteAmount;
	}

	public String getInvoiceIds() {
		return invoiceIds;
	}

	public void setInvoiceIds(String invoiceIds) {
		this.invoiceIds = invoiceIds;
	}

	public String getGoodsName() {
		return goodsName;
	}

	public void setGoodsName(String goodsName) {
		this.goodsName = goodsName;
	}

	public String getProviderName() {
		return providerName;
	}

	public void setProviderName(String providerName) {
		this.providerName = providerName;
	}

	public String getGoodsId() {
		return goodsId;
	}

	public void setGoodsId(String goodsId) {
		this.goodsId = goodsId;
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

	public String getGoodsPositionId() {
		return goodsPositionId;
	}

	public void setGoodsPositionId(String goodsPositionId) {
		this.goodsPositionId = goodsPositionId;
	}

	public String getGoodsPositionName() {
		return goodsPositionName;
	}

	public void setGoodsPositionName(String goodsPositionName) {
		this.goodsPositionName = goodsPositionName;
	}

	public Integer getInNumber() {
		return inNumber;
	}

	public void setInNumber(Integer inNumber) {
		this.inNumber = inNumber;
	}

	public Double getPretaxAmount() {
		return pretaxAmount;
	}

	public void setPretaxAmount(Double pretaxAmount) {
		this.pretaxAmount = pretaxAmount;
	}

	public Double getPretaxAverPrice() {
		return pretaxAverPrice;
	}

	public void setPretaxAverPrice(Double pretaxAverPrice) {
		this.pretaxAverPrice = pretaxAverPrice;
	}

	public Double getTaxAverPrice() {
		return taxAverPrice;
	}

	public void setTaxAverPrice(Double taxAverPrice) {
		this.taxAverPrice = taxAverPrice;
	}

	public String getOperateUserId() {
		return operateUserId;
	}

	public void setOperateUserId(String operateUserId) {
		this.operateUserId = operateUserId;
	}

	public String getOperate_userName() {
		return operate_userName;
	}

	public void setOperate_userName(String operate_userName) {
		this.operate_userName = operate_userName;
	}

	public Date getInTime() {
		return inTime;
	}

	public void setInTime(Date inTime) {
		this.inTime = inTime;
		this.inTimeStr = DateUtil.dateToStr(inTime);
	}

	public String getInTimeStr() {
		return inTimeStr;
	}

	public void setInTimeStr(String inTimeStr) {
		this.inTimeStr = inTimeStr;
		this.inTime = DateUtil.strToDate(inTimeStr);
	}

	public String getPutUserId() {
		return putUserId;
	}

	public void setPutUserId(String putUserId) {
		this.putUserId = putUserId;
	}

	public String getPutUserName() {
		return putUserName;
	}

	public void setPutUserName(String putUserName) {
		this.putUserName = putUserName;
	}

	public String getRecord() {
		return record;
	}

	public void setRecord(String record) {
		this.record = record;
	}

	public String getStartTimeStr() {
		return startTimeStr;
	}

	public void setStartTimeStr(String startTimeStr) {
		this.startTimeStr = startTimeStr;
	}

	public String getEndTimeStr() {
		return endTimeStr;
	}

	public void setEndTimeStr(String endTimeStr) {
		this.endTimeStr = endTimeStr;
	}

	public String getRedId() {
		return redId;
	}

	public void setRedId(String redId) {
		this.redId = redId;
	}

	public String getProviderCode() {
		return providerCode;
	}

	public void setProviderCode(String providerCode) {
		this.providerCode = providerCode;
	}

	public Double getPreviousNoWriteAmount() {
		return previousNoWriteAmount;
	}

	public void setPreviousNoWriteAmount(Double previousNoWriteAmount) {
		this.previousNoWriteAmount = previousNoWriteAmount;
	}

	public Double getTaxAmount() {
		return taxAmount;
	}

	public void setTaxAmount(Double taxAmount) {
		this.taxAmount = taxAmount;
	}

	public String getInvoiceId() {
		return invoiceId;
	}

	public void setInvoiceId(String invoiceId) {
		this.invoiceId = invoiceId;
	}

	public String getInvoiceNumber() {
		return invoiceNumber;
	}

	public void setInvoiceNumber(String invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}

	public Date getOpenDate() {
		return openDate;
	}

	public void setOpenDate(Date openDate) {
		this.openDate = openDate;
	}

	public String getOpenDateStr() {
		return openDateStr;
	}

	public void setOpenDateStr(String openDateStr) {
		this.openDateStr = openDateStr;
		this.openDate = DateUtil.strToDate(openDateStr,"yyyy-MM-dd");
	}

	public Double getInvoiceAmount() {
		return invoiceAmount;
	}

	public void setInvoiceAmount(Double invoiceAmount) {
		this.invoiceAmount = invoiceAmount;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public String getCreateTimeStr() {
		return createTimeStr;
	}

	public void setCreateTimeStr(String createTimeStr) {
		this.createTimeStr = createTimeStr;
		System.out.println(createTimeStr+"========="+DateUtil.strToDate(createTimeStr)+"-------------");
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

	public String getJsonString() {
		return jsonString;
	}

	public void setJsonString(String jsonString) {
		this.jsonString = jsonString;
	}

	public String getInvoiceRecordId() {
		return invoiceRecordId;
	}

	public void setInvoiceRecordId(String invoiceRecordId) {
		this.invoiceRecordId = invoiceRecordId;
	}

	public String getInRecordId() {
		return inRecordId;
	}

	public void setInRecordId(String inRecordId) {
		this.inRecordId = inRecordId;
	}

	public Double getWriteAmount() {
		return writeAmount;
	}

	public void setWriteAmount(Double writeAmount) {
		this.writeAmount = writeAmount;
	}

	public Double getShouldWriteAmount() {
		return shouldWriteAmount;
	}

	public void setShouldWriteAmount(Double shouldWriteAmount) {
		this.shouldWriteAmount = shouldWriteAmount;
	}

	public Double getNoWriteAmount() {
		return noWriteAmount;
	}

	public void setNoWriteAmount(Double noWriteAmount) {
		this.noWriteAmount = noWriteAmount;
	}

	public Double getTaxRate() {
		return taxRate;
	}

	public void setTaxRate(Double taxRate) {
		this.taxRate = taxRate;
	}

	public String getCptName() {
	    return cptName;
	}

	public void setCptName(String cptName) {
	    this.cptName = cptName;
	}

	
	
}
