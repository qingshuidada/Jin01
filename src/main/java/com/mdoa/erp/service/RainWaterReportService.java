package com.mdoa.erp.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.base.model.PageModel;
import com.mdoa.erp.dao.RainWaterReportDao;
import com.mdoa.erp.model.RainWaterReport;

@Service
public class RainWaterReportService {

	@Autowired
	private RainWaterReportDao reportDao;
	
	public void insertRainWaterReport(RainWaterReport report){
		if(!reportDao.insertRainWaterReport(report)){
			throw new RuntimeException("添加雨水检测报告失败");
		}
	}
	
	public void deleteRainWaterReport(String rainId){
		if(!reportDao.deleteRainWaterReport(rainId)){
			throw new RuntimeException("删除雨水检测报告失败");
		}
	}
	
	public void updateRainWaterReport(RainWaterReport report){
		if(!reportDao.updateRainWaterReport(report)){
			throw new RuntimeException("删除雨水检测报告失败");
		}
	}
	
	public PageModel<RainWaterReport> selectRainWaterReport(RainWaterReport report){
		PageHelper.startPage(report.getPage(), report.getRows());
		List<RainWaterReport> list = reportDao.selectRainWaterReport(report);
		Page<RainWaterReport> page = (Page<RainWaterReport>) list;
		PageModel<RainWaterReport> pageModel = new PageModel<>(page);
		return pageModel;
	}
	
}
