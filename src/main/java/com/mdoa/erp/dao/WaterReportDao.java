package com.mdoa.erp.dao;

import java.util.List;

import com.mdoa.erp.model.WaterReport;

public interface WaterReportDao {

	boolean insertWaterReport(WaterReport waterReport);
	
	boolean deleteWaterReport(String reportId);
	
	boolean updateWaterReport(WaterReport waterReport);
	
	List<WaterReport> selectWaterReport(WaterReport waterReport);
}
