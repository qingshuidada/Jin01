package com.mdoa.erp.bo;

import java.util.List;

/**
 * 经济指标、车间报表表单类
 * @author Administrator
 *
 */
public class EconomicReportFormsForm {

	private List<String> workshopIds;
	private List<String> economicIds;
	private String reportFormsDate;

	public List<String> getWorkshopIds() {
		return workshopIds;
	}
	public void setWorkshopIds(List<String> workshopIds) {
		this.workshopIds = workshopIds;
	}
	public List<String> getEconomicIds() {
		return economicIds;
	}
	public void setEconomicIds(List<String> economicIds) {
		this.economicIds = economicIds;
	}
	public String getReportFormsDate() {
		return reportFormsDate;
	}
	public void setReportFormsDate(String reportFormsDate) {
		this.reportFormsDate = reportFormsDate;
	}
}
