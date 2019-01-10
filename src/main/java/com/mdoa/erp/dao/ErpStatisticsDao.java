package com.mdoa.erp.dao;

import java.util.HashMap;
import java.util.List;

import com.mdoa.erp.bo.EconomicReportFormsForm;
import com.mdoa.erp.bo.EconomicTabData;
import com.mdoa.erp.bo.ErpStatisticsForm;
import com.mdoa.erp.bo.WorkshopTabData;

public interface ErpStatisticsDao {

	/**
	 * 添加经济指标
	 * @param erpStatisticsForm
	 * @return
	 */
	boolean addEconomic(ErpStatisticsForm erpStatisticsForm);
	/**
	 * 修改经济指标
	 * @param erpStatisticsForm
	 * @return
	 */
	boolean updateEconomic(ErpStatisticsForm erpStatisticsForm);
	/**
	 * 查询经济指标
	 * @param erpStatisticsForm
	 * @return
	 */
	List<ErpStatisticsForm> queryEconomic(ErpStatisticsForm erpStatisticsForm);
	/**
	 * 添加车间
	 * @param erpStatisticsForm
	 * @return
	 */
	boolean addWorkshop(ErpStatisticsForm erpStatisticsForm);
	/**
	 * 修改车间
	 * @param erpStatisticsForm
	 * @return
	 */
	boolean updateWorkshop(ErpStatisticsForm erpStatisticsForm);
	/**
	 * 查询车间
	 * @param erpStatisticsForm
	 * @return
	 */
	List<ErpStatisticsForm> queryWorkshop(ErpStatisticsForm erpStatisticsForm);
	/**
	 * 人员上报管理(查询)
	 * @param erpStatisticsForm
	 * @return
	 */
	List<ErpStatisticsForm> queryUserFromWE(ErpStatisticsForm erpStatisticsForm);
	/**
	 * 验证该车间的经济指标是否任命过人
	 * @param checkStatistics
	 * @return
	 */
	List<ErpStatisticsForm> queryStatisticsUser(ErpStatisticsForm checkStatistics);
	/**
	 * 添加人员上报
	 * @param erpStatisticsForm
	 * @return
	 */
	boolean addStatisticsUser(ErpStatisticsForm erpStatisticsForm);
	/**
	 * 修改人员上报
	 * @param erpStatisticsForm
	 * @return
	 */
	boolean updateStatisticsUser(ErpStatisticsForm erpStatisticsForm);
	/**
	 * 添加数据信息
	 * @param erpStatisticsForm
	 * @return
	 */
	boolean addStatisticsMessage(ErpStatisticsForm erpStatisticsForm);
	/**
	 * 信息查询
	 * @param erpStatisticsForm
	 * @return
	 */
	List<ErpStatisticsForm> queryStatisticsMessage(ErpStatisticsForm erpStatisticsForm);
	
	/**
	 * 确认上报信息
	 * @param erpStatisticsForm
	 * @return
	 */
	boolean ensureStatisticsMessage(ErpStatisticsForm erpStatisticsForm);
	
	/**
	 * 删除经济指标
	 * @param erpStatisticsForm
	 * @return
	 */
	boolean deleteEconomic(ErpStatisticsForm erpStatisticsForm);
	
	/**
	 * 经济指标设为产值
	 * @param erpStatisticsForm
	 * @return
	 */
	boolean setEcoOptValue(ErpStatisticsForm erpStatisticsForm);
	
	/**
	 * 统计经济指标、车间交叉报表数据
	 * @param economicReportForms
	 * @return
	 */
	HashMap<String, Double> countEconomicReportForms(EconomicReportFormsForm economicReportForms);
	
	/**
	 * 查询所有经济指标
	 * @return
	 */
	List<EconomicTabData> findAllEconomic();
	
	/**
	 * 查询所有车间
	 * @return
	 */
	List<WorkshopTabData> findAllWorkshop();
}
