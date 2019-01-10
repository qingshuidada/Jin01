package com.mdoa.erp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.base.model.PageModel;
import com.mdoa.erp.dao.WaterReportDao;
import com.mdoa.erp.model.WaterReport;

@Service
public class WaterReportService {

	@Autowired
	private WaterReportDao reportDao;
	
	public void insertWaterReport(WaterReport waterReport){
		if(!reportDao.insertWaterReport(waterReport)){
			throw new RuntimeException("添加水质报告失败");
		}
	}
	
	public void deleteWaterReport(String reportId){
		if(!reportDao.deleteWaterReport(reportId)){
			throw new RuntimeException("删除水质报告失败");
		}
	}
	
	public void updateWaterReport(WaterReport report){
		if(!reportDao.updateWaterReport(report)){
			throw new RuntimeException("修改水质报告失败");
		}
	}
	
	public PageModel<WaterReport> selectWaterReport(WaterReport report){
		
		PageHelper.startPage(report.getPage(), report.getRows());
		List<WaterReport> list = reportDao.selectWaterReport(report);
		Page<WaterReport> page = (Page<WaterReport>) list;
		PageModel<WaterReport> pageModel = new PageModel<>(page);
		return pageModel;
	}
}
