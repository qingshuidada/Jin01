package com.mdoa.personnel.dao;

import com.mdoa.personnel.bo.ProcessWelfareForm;
import com.mdoa.personnel.bo.ProcessWelfareRecordForm;

public interface ProcessWelfareDao {
	
	/**
	 * 福利发放申请流程完成时插入福利
	 * @param processWelfareForm
	 * @return
	 */
	boolean insertProcessWelfare(ProcessWelfareForm processWelfareForm);
	
	/**
	 * 福利发放申请流程完成时插入福利发放记录
	 * @return
	 */
	Integer insertProcessWelfareRecords(ProcessWelfareRecordForm processWelfareRecordForm);
	
}
