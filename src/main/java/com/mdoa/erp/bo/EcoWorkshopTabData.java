package com.mdoa.erp.bo;

import java.util.HashMap;
import java.util.List;

/**
 * 经济指标、车间交叉表 表格数据
 * @author Administrator
 *
 */
public class EcoWorkshopTabData {
	
	private String reportFormsDate;
	private List<EconomicTabData> economicTabDatas;
	private List<WorkshopTabData> workshopTabDatas;
	private HashMap<String, Double> numberDatas;
	
	
	public List<EconomicTabData> getEconomicTabDatas() {
		return economicTabDatas;
	}
	public void setEconomicTabDatas(List<EconomicTabData> economicTabDatas) {
		this.economicTabDatas = economicTabDatas;
	}
	public List<WorkshopTabData> getWorkshopTabDatas() {
		return workshopTabDatas;
	}
	public void setWorkshopTabDatas(List<WorkshopTabData> workshopTabDatas) {
		this.workshopTabDatas = workshopTabDatas;
	}
	public HashMap<String, Double> getNumberDatas() {
		return numberDatas;
	}
	public void setNumberDatas(HashMap<String, Double> numberDatas) {
		this.numberDatas = numberDatas;
	}
	public String getReportFormsDate() {
		return reportFormsDate;
	}
	public void setReportFormsDate(String reportFormsDate) {
		this.reportFormsDate = reportFormsDate;
	}
}
