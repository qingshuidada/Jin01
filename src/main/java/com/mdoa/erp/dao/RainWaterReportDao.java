package com.mdoa.erp.dao;

import java.util.List;

import com.mdoa.erp.model.RainWaterReport;

public interface RainWaterReportDao {

	boolean insertRainWaterReport(RainWaterReport report);
	
	boolean deleteRainWaterReport(String rainId);
	
	boolean updateRainWaterReport(RainWaterReport report);
	
	List<RainWaterReport> selectRainWaterReport(RainWaterReport report);
}
