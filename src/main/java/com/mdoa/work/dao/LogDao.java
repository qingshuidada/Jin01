package com.mdoa.work.dao;

import java.util.List;

import com.mdoa.work.bo.LogForm;

public interface LogDao {

	/**
	 * 添加日志
	 * @param logForm
	 * @return
	 */
	boolean addLog(LogForm logForm);
	/**
	 * 查询个人日志
	 * @param logForm
	 * @return
	 */
	List<LogForm> queryYourselfLog(LogForm logForm);
	/**
	 * 修改日志
	 * @param logForm
	 * @return
	 */
	boolean updateYourselfLog(LogForm logForm);
	/**
	 * 查询下级日志
	 * @param logForm
	 * @return
	 */
	List<LogForm> querySubLog(LogForm logForm);
	/**
	 * 查询自己和下级的日志
	 * @param logForm
	 * @return
	 */
	List<LogForm> queryOneselfAndSubLog(LogForm logForm);

	
}
