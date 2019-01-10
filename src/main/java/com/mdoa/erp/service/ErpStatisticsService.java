package com.mdoa.erp.service;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FilterOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.base.model.PageModel;
import com.mdoa.erp.bo.EcoWorkshopTabData;
import com.mdoa.erp.bo.EconomicReportFormsForm;
import com.mdoa.erp.bo.EconomicTabData;
import com.mdoa.erp.bo.ErpStatisticsForm;
import com.mdoa.erp.bo.WorkshopTabData;
import com.mdoa.erp.dao.ErpStatisticsDao;
import com.mdoa.util.ExcelUtil;
import com.mdoa.util.StringUtil;

@Service
public class ErpStatisticsService {

	@Autowired
	private ErpStatisticsDao erpStatisticsDao;

	/**
	 * 添加经济指标
	 * @param erpStatisticsForm
	 */
	public void addEconomic(ErpStatisticsForm erpStatisticsForm) {
		
		if (!erpStatisticsDao.addEconomic(erpStatisticsForm)) 
			throw new RuntimeException("添加经济指标失败");
	}
	/**
	 * 修改经济指标
	 */

	public void updateEconomic(ErpStatisticsForm erpStatisticsForm) {
		
		if (!erpStatisticsDao.updateEconomic(erpStatisticsForm)) 
			throw new RuntimeException("删除经济指标失败");
	}
	/**
	 * 查询经济指标
	 * @param erpStatisticsForm
	 * @return
	 */
	public PageModel<ErpStatisticsForm> queryEconomic(ErpStatisticsForm erpStatisticsForm) {
		if (!StringUtil.isEmpty(erpStatisticsForm.getEconomicName())) 
			erpStatisticsForm.setEconomicName(erpStatisticsForm.getEconomicName()+"%");
		PageHelper.startPage(erpStatisticsForm.getPage(), erpStatisticsForm.getRows());
		List<ErpStatisticsForm> list = erpStatisticsDao.queryEconomic(erpStatisticsForm);
		PageModel<ErpStatisticsForm> pageModel = new PageModel<>((Page<ErpStatisticsForm>)list);
		return pageModel;
	}
	/**
	 * 添加车间
	 * @param erpStatisticsForm
	 */
	public void addWorkshop(ErpStatisticsForm erpStatisticsForm) {
		
		if (!erpStatisticsDao.addWorkshop(erpStatisticsForm)) 			
			throw new RuntimeException("添加车间失败");
	}
	/**
	 * 修改车间
	 * @param erpStatisticsForm
	 */
	public void updateWorkshop(ErpStatisticsForm erpStatisticsForm) {
		
		if (!erpStatisticsDao.updateWorkshop(erpStatisticsForm)) 
			throw new RuntimeException("修改车间失败");
			
	}
	/**
	 * 查询车间
	 * @param erpStatisticsForm
	 * @return
	 */
	public PageModel<ErpStatisticsForm> queryWorkshop(ErpStatisticsForm erpStatisticsForm) {
		if (!StringUtil.isEmpty(erpStatisticsForm.getWorkshopName())) 
			erpStatisticsForm.setWorkshopName(erpStatisticsForm.getWorkshopName()+"%");
		PageHelper.startPage(erpStatisticsForm.getPage(), erpStatisticsForm.getRows());
		List<ErpStatisticsForm> list = erpStatisticsDao.queryWorkshop(erpStatisticsForm);
		PageModel<ErpStatisticsForm> pageModel = new PageModel<>((Page<ErpStatisticsForm>)list);
		return pageModel;
		
	}
	/**
	 * 人员上报管理(查询)
	 * @param erpStatisticsForm
	 * @return
	 */
	public PageModel<ErpStatisticsForm> queryUserFromWE(ErpStatisticsForm erpStatisticsForm) {
		if (!StringUtil.isEmpty(erpStatisticsForm.getWorkshopName())) 
			erpStatisticsForm.setWorkshopName(erpStatisticsForm.getWorkshopName());
		if (!StringUtil.isEmpty(erpStatisticsForm.getEconomicName())) 
			erpStatisticsForm.setEconomicName(erpStatisticsForm.getEconomicName());
		PageHelper.startPage(erpStatisticsForm.getPage(), erpStatisticsForm.getRows());
		List<ErpStatisticsForm> list = erpStatisticsDao.queryUserFromWE(erpStatisticsForm);
		PageModel<ErpStatisticsForm> pageModel = new PageModel<>((Page<ErpStatisticsForm>)list);
		return pageModel;
	}
	/**
	 * 人员上报
	 * @param erpStatisticsForm
	 */
	public void reportUserFromWE(ErpStatisticsForm erpStatisticsForm) {
		ErpStatisticsForm checkStatistics = new ErpStatisticsForm();
		if (erpStatisticsForm.getEconomicId() != null ) 
			checkStatistics.setEconomicId(erpStatisticsForm.getEconomicId());
		if (erpStatisticsForm.getWorkshopId() != null ) 
			checkStatistics.setWorkshopId(erpStatisticsForm.getWorkshopId());
		List<ErpStatisticsForm> list = erpStatisticsDao.queryStatisticsUser(checkStatistics);//验证该车间的该指标是否有任命的人
		if (list != null && list.size() == 0) 
			if (!erpStatisticsDao.addStatisticsUser(erpStatisticsForm)) 
				throw new RuntimeException("添加人员信息失败");
		if (list != null && list.size() > 0) 
			if (!erpStatisticsDao.updateStatisticsUser(erpStatisticsForm)) 
				throw new RuntimeException("修改人员信息失败");
		 
	}
	/**
	 * 查询信息上报页面
	 * @param erpStatisticsForm
	 * @return
	 */
	public PageModel<ErpStatisticsForm> queryStatisticsUser(ErpStatisticsForm erpStatisticsForm) {
		
		PageHelper.startPage(erpStatisticsForm.getPage(), erpStatisticsForm.getRows());
		List<ErpStatisticsForm> list = erpStatisticsDao.queryStatisticsUser(erpStatisticsForm);
		PageModel<ErpStatisticsForm> pageModel = new PageModel<>((Page<ErpStatisticsForm>)list);
		return pageModel;
	}
	/**
	 * 添加数据信息
	 * @param erpStatisticsForm
	 */
	public void addStatisticsMessage(ErpStatisticsForm erpStatisticsForm) {
		ErpStatisticsForm checkStatistics = new ErpStatisticsForm();
		if (erpStatisticsForm.getEconomicId() != null ) 
			checkStatistics.setEconomicId(erpStatisticsForm.getEconomicId());
		if (erpStatisticsForm.getWorkshopId() != null ) 
			checkStatistics.setWorkshopId(erpStatisticsForm.getWorkshopId());
		List<ErpStatisticsForm> list = erpStatisticsDao.queryStatisticsUser(checkStatistics);//验证该车间的该指标是否有任命的人
		if (list != null && list.get(0).getUserId().equals(erpStatisticsForm.getCreateUserId())){ 
			if (!erpStatisticsDao.addStatisticsMessage(erpStatisticsForm))
				throw new RuntimeException("添加数据信息失败");
		}else{
			throw new RuntimeException("你没有权限添加数据");
		}
	}
	/**
	 * 信息查询
	 * @param erpStatisticsForm
	 * @return
	 */
	public PageModel<ErpStatisticsForm> queryStatisticsMessage(ErpStatisticsForm erpStatisticsForm) {
		PageHelper.startPage(erpStatisticsForm.getPage(), erpStatisticsForm.getRows());
		List<ErpStatisticsForm> list = erpStatisticsDao.queryStatisticsMessage(erpStatisticsForm);
		PageModel<ErpStatisticsForm> pageModel = new PageModel<>((Page<ErpStatisticsForm>)list);
		return pageModel;
	}
	
	/**
	 * 确认某车间的某一天的某一项上报信息
	 * @param erpStatisticsForm
	 */
	public void ensureStatisticsMessage(ErpStatisticsForm erpStatisticsForm) {
		if(!erpStatisticsDao.ensureStatisticsMessage(erpStatisticsForm))
			throw new RuntimeException("确认上报信息失败");
	}
	
	/**
	 * 删除经济指标
	 * @param erpStatisticsForm
	 */
	public void deleteEconomic(ErpStatisticsForm erpStatisticsForm) {
		if (!erpStatisticsDao.deleteEconomic(erpStatisticsForm))
			throw new RuntimeException("删除经济指标失败");
	}
	
	/**
	 * 经济指标设为产值
	 * @param erpStatisticsForm
	 */
	public void setEcoOptValue(ErpStatisticsForm erpStatisticsForm){
		if (!erpStatisticsDao.setEcoOptValue(erpStatisticsForm))
			throw new RuntimeException("删除经济指标失败");
	}
	
	
	
	public void test(String fileUrl) throws Exception{
		Workbook workbook = new XSSFWorkbook();
		File file = new File(fileUrl);
		File fileFolder=new File(fileUrl.substring(0,fileUrl.lastIndexOf("/")+1));
		if(!fileFolder.exists()){
			fileFolder.mkdirs();
		}
		Sheet sheet = workbook.createSheet();
		CellStyle cellStyle = workbook.createCellStyle();
		cellStyle.setAlignment(CellStyle.ALIGN_CENTER);
		
		sheet.setColumnWidth(0 ,10 * 256);
		sheet.setColumnWidth(1 ,10 * 256);
		
		Row headRow = sheet.createRow(0);
		Cell cell = headRow.createCell(0);
		cell.setCellValue("各项经济指标");
		cell.setCellStyle(cellStyle);
		
		Cell cell2 = headRow.createCell(1);
		cell2.setCellValue("针织车间");
		cell2.setCellStyle(cellStyle);
		
		CellRangeAddress cellRangeAddress = new CellRangeAddress(0, 0, 0, 1);
		sheet.addMergedRegion(cellRangeAddress);
		
		FileOutputStream fileOutputStream = new FileOutputStream(file);
		BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(fileOutputStream);
		workbook.write(bufferedOutputStream);
		if(fileOutputStream!=null){
			fileOutputStream.close();
		}
		((FilterOutputStream) workbook).close();
	}
	
	/**
	 * 获取经济指标、车间交叉表相应数据
	 * @param reportFormsDate
	 * @return
	 */
	public EcoWorkshopTabData getEcoWorkshopTabData(String reportFormsDate) {
		EcoWorkshopTabData ecoWorkshopTabData = new EcoWorkshopTabData();
		
		List<EconomicTabData> economicTabDatas = erpStatisticsDao.findAllEconomic();
		List<WorkshopTabData> workshopTabDatas = erpStatisticsDao.findAllWorkshop();
		
		EconomicReportFormsForm economicReportFormsForm = new EconomicReportFormsForm();
		List<String> economicIds = new ArrayList<>();
		for(int i = 0; i < economicTabDatas.size() ; i++){
			economicIds.add(economicTabDatas.get(i).getEconomicId());
		}
		List<String> workshopIds = new ArrayList<>();
		for(int i = 0; i < workshopTabDatas.size() ; i++){
			workshopIds.add(workshopTabDatas.get(i).getWorkshopId());
		}
		economicReportFormsForm.setWorkshopIds(workshopIds);
		economicReportFormsForm.setEconomicIds(economicIds);
		economicReportFormsForm.setReportFormsDate(reportFormsDate);
		HashMap<String, Double> numberDatas = erpStatisticsDao.countEconomicReportForms(economicReportFormsForm);
		
		ecoWorkshopTabData.setReportFormsDate(reportFormsDate);
		ecoWorkshopTabData.setEconomicTabDatas(economicTabDatas);
		ecoWorkshopTabData.setWorkshopTabDatas(workshopTabDatas);
		ecoWorkshopTabData.setNumberDatas(numberDatas);
		
		return ecoWorkshopTabData;
	}
	
	/**
	 * 导出经济指标、车间交叉表
	 * @param reportFormsDate
	 * @param filePath
	 */
	public void writeEcoWorkshopTabToExcel(String reportFormsDate, String filePath) throws Exception{
		EcoWorkshopTabData ecoWorkshopTabData = getEcoWorkshopTabData(reportFormsDate);
		ExcelUtil.writeCrossTabToExcel(filePath, ecoWorkshopTabData);
	}
}
