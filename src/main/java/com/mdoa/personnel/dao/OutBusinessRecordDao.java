package com.mdoa.personnel.dao;

import java.util.List;

import com.mdoa.personnel.bo.OutBusinessRecordForm;
import com.mdoa.personnel.model.OutBusinessRecord;

public interface OutBusinessRecordDao {
	
	/**
	 * 插入公出记录
	 * @param outBusinessRecordForm
	 * @return
	 */
	boolean insertOutBusinessRecord(OutBusinessRecordForm outBusinessRecordForm);
	
	/**
	 * 查询公出记录
	 * @param outBusinessRecordForm
	 * @return
	 */
	List<OutBusinessRecord> selectOutBusinessRecord(OutBusinessRecordForm outBusinessRecordForm);

	boolean updateOutBusinessRecord(OutBusinessRecordForm outBusinessRecordForm);
	
	
}
