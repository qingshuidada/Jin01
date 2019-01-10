package com.mdoa.repertory.bo;

import java.util.Date;
import java.util.List;



import com.mdoa.util.DateUtil;

public class RepertoryInvoiceEntity {
	
	private String invoiceId;
	private String invoiceNumber;
	private Date openDate;
	private String openDateStr;
	private Double invoiceAmount;
	private String providerCode;
	private String text;
	private String createUserId;
	private String createUserName;
	private String updateUserId;
	private String updateUserName;
	private List<Data> list;
	private Double writeAmountSum;
	
	
	public Double getWriteAmountSum() {
		return writeAmountSum;
	}

	public void setWriteAmountSum(Double writeAmountSum) {
		this.writeAmountSum = writeAmountSum;
	}

	public String getInvoiceId() {
		return invoiceId;
	}

	public void setInvoiceId(String invoiceId) {
		this.invoiceId = invoiceId;
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
		this.openDateStr = DateUtil.dateToStr(openDate,"yyyy-MM-dd");
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

	public String getProviderCode() {
		return providerCode;
	}

	public void setProviderCode(String providerCode) {
		this.providerCode = providerCode;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public List<Data> getList() {
		return list;
	}

	public void setList(List<Data> list) {
		this.list = list;
	}

	public class Data{
		private String inRecordId;
		private Double taxRate;
		private Double noWriteAmount;
		private Double writeAmount;
		private Double shouldWriteAmount;
		private String createUserId;
		private String createUserName;
		private String updateUserId;
		private String updateUserName;
		private String providerCode;
		private String invoiceId;
		
		public String getInvoiceId() {
			return invoiceId;
		}
		public void setInvoiceId(String invoiceId) {
			this.invoiceId = invoiceId;
		}
		public String getProviderCode() {
			return providerCode;
		}
		public void setProviderCode(String providerCode) {
			this.providerCode = providerCode;
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
		
		public String getInRecordId() {
			return inRecordId;
		}
		public void setInRecordId(String inRecordId) {
			this.inRecordId = inRecordId;
		}
		public Double getTaxRate() {
			return taxRate;
		}
		public void setTaxRate(Double taxRate) {
			this.taxRate = taxRate;
		}
		public Double getNoWriteAmount() {
			return noWriteAmount;
		}
		public void setNoWriteAmount(Double noWriteAmount) {
			this.noWriteAmount = noWriteAmount;
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
		
		
	}
	
}
