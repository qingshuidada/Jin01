package com.mdoa.admin.model;

import java.math.BigDecimal;
import java.util.Date;

import com.mdoa.base.model.BaseModel;
import com.mdoa.util.DateUtil;
/**
 * 入库管理
 * @author Administrator
 *
 */
public class InStockModel extends BaseModel{

	private String buyId;
	private String suppliesId;
	private String suppliesName;
	private String providerName;
	private String stockNo;
	private BigDecimal price;
	private Integer inCounts;
	private BigDecimal amount;
	private Date inDate;
	private String inDateStr;
	private String buyer;
	private String aliveFlag;
	
	
	public String getSuppliesName() {
		return suppliesName;
	}
	public void setSuppliesName(String suppliesName) {
		this.suppliesName = suppliesName;
	}
	public String getBuyId() {
		return buyId;
	}
	public void setBuyId(String buyId) {
		this.buyId = buyId;
	}
	public String getSuppliesId() {
		return suppliesId;
	}
	public void setSuppliesId(String suppliesId) {
		this.suppliesId = suppliesId;
	}
	public String getProviderName() {
		return providerName;
	}
	public void setProviderName(String providerName) {
		this.providerName = providerName;
	}
	public String getStockNo() {
		return stockNo;
	}
	public void setStockNo(String stockNo) {
		this.stockNo = stockNo;
	}
	public BigDecimal getPrice() {
		return price;
	}
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	public Integer getInCounts() {
		return inCounts;
	}
	public void setInCounts(Integer inCounts) {
		this.inCounts = inCounts;
	}
	public BigDecimal getAmount() {
		return amount;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	public Date getInDate() {
		return inDate;
	}
	public void setInDate(Date inDate) {
		this.inDate = inDate;
		this.inDateStr = DateUtil.dateToStr(inDate,"yyyy-MM-dd");
	}
	public String getInDateStr() {
		return inDateStr;
	}
	public void setInDateStr(String inDateStr) {
		this.inDateStr = inDateStr;
		this.inDate = DateUtil.strToDate(inDateStr,"yyyy-MM-dd");
	}
	public String getBuyer() {
		return buyer;
	}
	public void setBuyer(String buyer) {
		this.buyer = buyer;
	}
	public String getAliveFlag() {
		return aliveFlag;
	}
	public void setAliveFlag(String aliveFlag) {
		this.aliveFlag = aliveFlag;
	}

	
}
