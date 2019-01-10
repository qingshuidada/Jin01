package com.mdoa.salary.dao;

import java.util.List;

import com.mdoa.salary.bo.SalaryInfoForm;

public interface SalaryDao {
	
	/**批量插入工资信息
	 * 
	 * @param list
	 * @return
	 */
	Integer insertSalaryInfoByBatch(List<SalaryInfoForm> list);
	
	/**
	 * 条件查询工资信息
	 * @param salaryInfoForm
	 * @return
	 */
	List<SalaryInfoForm> findSalaryInfoByCondition(SalaryInfoForm salaryInfoForm);
	
	/**
	 * 查询工资日期
	 * @return
	 */
	List<SalaryInfoForm> findMonthDate();
	
	/**
	 * 修改工资信息
	 * @param salaryInfoForm
	 * @return
	 */
	boolean updateSalaryInfo(SalaryInfoForm salaryInfoForm);
	
	/**
	 * 查询出错工资信息
	 * @param salaryInfoForm
	 * @return
	 */
	List<SalaryInfoForm> findSalaryInfoForError(SalaryInfoForm salaryInfoForm);
	
	/**
	 * 删除未确认信息
	 */
	void deleteNotSureData();
	
	/**
	 * 确认信息
	 */
	void ensureSalaryInfo();

	/**
	 * 查询工资统计信息
	 * @param salaryInfoForm
	 * @return
	 */
	List<SalaryInfoForm> findSalaryInfoByTotal(SalaryInfoForm salaryInfoForm);
}
