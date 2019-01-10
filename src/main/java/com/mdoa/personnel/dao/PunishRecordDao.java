package com.mdoa.personnel.dao;

import java.util.List;

import com.mdoa.personnel.model.PunishRecord;

public interface PunishRecordDao {

	
	boolean addPunishRecord(PunishRecord punishRecord);
	
	List<PunishRecord> selectPunishRecord(PunishRecord punishRecord);
	
	boolean updatePunishRecord(PunishRecord punishRecord);
	
	/**
	 * 导出Excel时查询用
	 * @param punishRecord
	 * @return
	 */
	List<PunishRecord> selectPunishRecordForExcel(PunishRecord punishRecord);
}
