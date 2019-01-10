package com.mdoa.work.bo;

import java.util.List;

public class WorkOfficeKnowEntity {

	private String firstCategoryId;
	private String firstCategoryName;
	private String openness;
	private Integer orderCode;
	private String aliveFlag;
	private List<Data> list;
	public String getFirstCategoryId() {
		return firstCategoryId;
	}
	public void setFirstCategoryId(String firstCategoryId) {
		this.firstCategoryId = firstCategoryId;
	}
	public String getFirstCategoryName() {
		return firstCategoryName;
	}
	public void setFirstCategoryName(String firstCategoryName) {
		this.firstCategoryName = firstCategoryName;
	}
	public String getOpenness() {
		return openness;
	}
	public void setOpenness(String openness) {
		this.openness = openness;
	}
	public Integer getOrderCode() {
		return orderCode;
	}
	public void setOrderCode(Integer orderCode) {
		this.orderCode = orderCode;
	}
	public String getAliveFlag() {
		return aliveFlag;
	}
	public void setAliveFlag(String aliveFlag) {
		this.aliveFlag = aliveFlag;
	}
	public List<Data> getList() {
		return list;
	}
	public void setList(List<Data> list) {
		this.list = list;
	}
	public class Data{
		private String secondCategoryId;
		private String secondCategoryName;
		private String firstCategoryId;
		private Integer orderCode;
		private String aliveFlag;
		private String deleteFlag;
		private String addFlag;
		
		
		public String getDeleteFlag() {
			return deleteFlag;
		}
		public void setDeleteFlag(String deleteFlag) {
			this.deleteFlag = deleteFlag;
		}
		public String getAddFlag() {
			return addFlag;
		}
		public void setAddFlag(String addFlag) {
			this.addFlag = addFlag;
		}
		public String getSecondCategoryId() {
			return secondCategoryId;
		}
		public void setSecondCategoryId(String secondCategoryId) {
			this.secondCategoryId = secondCategoryId;
		}
		public String getSecondCategoryName() {
			return secondCategoryName;
		}
		public void setSecondCategoryName(String secondCategoryName) {
			this.secondCategoryName = secondCategoryName;
		}
		public String getFirstCategoryId() {
			return firstCategoryId;
		}
		public void setFirstCategoryId(String firstCategoryId) {
			this.firstCategoryId = firstCategoryId;
		}
		public Integer getOrderCode() {
			return orderCode;
		}
		public void setOrderCode(Integer orderCode) {
			this.orderCode = orderCode;
		}
		public String getAliveFlag() {
			return aliveFlag;
		}
		public void setAliveFlag(String aliveFlag) {
			this.aliveFlag = aliveFlag;
		}
		
		
	}
}
