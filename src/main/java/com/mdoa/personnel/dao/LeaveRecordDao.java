package com.mdoa.personnel.dao;

import java.util.List;

import com.mdoa.personnel.bo.LeaveRecordForm;
import com.mdoa.personnel.model.LeaveRecord;

/**
 * 请假记录Dao层
 * @author Administrator
 *
 */
public interface LeaveRecordDao {
	
	/**
	 * 插入请假记录
	 * @param leaveRecordForm
	 * @return
	 */
	boolean insertLeaveRecord(LeaveRecordForm leaveRecordForm);
	
	/**
	 * 查询请假记录
	 * @param leaveRecordForm
	 * @return
	 */
	List<LeaveRecord> selectLeaveRecord(LeaveRecordForm leaveRecordForm);
	
}
