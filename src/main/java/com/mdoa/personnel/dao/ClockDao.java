package com.mdoa.personnel.dao;

import java.util.List;

import com.mdoa.personnel.bo.ClockDayForm;
import com.mdoa.personnel.bo.ClockForm;
import com.mdoa.personnel.bo.ClockMonthBalanceForm;
import com.mdoa.personnel.bo.ProcessClockForm;
import com.mdoa.personnel.model.AttendanceRecord;
import com.mdoa.personnel.model.AttendanceToday;
import com.mdoa.personnel.model.AttendanceWifi;
import com.mdoa.personnel.model.LeaveApply;
import com.mdoa.personnel.model.OutBusinessRecord;

public interface ClockDao {
	
	/**
	 * 对前一天打卡记录处理迟到早退标志位
	 */
	void dealToday();
	
	/**
	 * 从today表转存记录进record表
	 */
	void saveRecordFromToday();
	
	/**
	 * 删除前一天记录
	 */
	void truncateToday();
	
	/*void truncateGoOutApply();
	void truncateGoOutStream();*/
	
	/**
	 * 插入新的today预备记录
	 */
	void insertPreToday();
	
	/**
	 * 当考勤组没有班次时按默认时间插入班次
	 */
	void insertClassByDefault();
	
	/**
	 * 对当天打卡记录处理leave_flag标志位
	 */
	void dealTodayLeaveFlag();
	
	/**
	 * 获取打卡Wifi
	 */
	List<AttendanceWifi> getWifi(ClockForm clockForm);
	
	/**
	 * 通过员工id获取员工当天打卡记录
	 * @param userId
	 * @return
	 */
	AttendanceToday findTodayByCondition(ClockForm clockForm);
	
	/**
	 * 上班打卡
	 * @param clockForm
	 * @return
	 */
	boolean clock(ClockForm clockForm);
	
	/**
	 * 正常上班打卡
	 * @param clockForm
	 * @return
	 */
	boolean clockIn(ClockForm clockForm);
	
	/**
	 * 迟到上班打卡
	 * @param clockForm
	 * @return
	 */
	boolean clockInLate(ClockForm clockForm);

	/**
	 * 正常下班打卡
	 * @param clockForm
	 * @return
	 */
	boolean clockOut(ClockForm clockForm);
	
	/**
	 * 早退下班打卡
	 * @param clockForm
	 * @return
	 */
	boolean clockOutEarly(ClockForm clockForm);
	
	/**
	 * 获取以月为单位每日打卡简略信息
	 * @param clockForm
	 * @return
	 */
	List<ClockDayForm> findDayFormByMonth(ClockForm clockForm);
	
	/**
	 * 获取以月为单位打卡汇总信息
	 * @param clockForm
	 * @return
	 */
	ClockMonthBalanceForm findBalanceFormByMonth(ClockForm clockForm);
	
	/**
	 * 条件查询考勤记录
	 * @param clockForm
	 * @return
	 */
	AttendanceRecord findRecordByCondition(ClockForm clockForm);
	
	/**
	 * 查询请假信息
	 * @param clockForm
	 * @return
	 */
	List<LeaveApply> findLeaveApply(ClockForm clockForm);
	
	/**
	 * 查询月考勤汇总信息
	 * @param clockForm
	 * @return
	 */
	List<ClockMonthBalanceForm> getMonthFormByCondition(ClockForm clockForm);
	
	/**
	 * 查询考勤月份
	 * @return
	 */
	List<String> getBalanceMonth();
	
	/**
	 * 设置考勤WIFI
	 * @param clockForm
	 * @return
	 */
	boolean setWifi(ClockForm clockForm);
	
	/**
	 * 更新考勤WIFI
	 * @param clockForm
	 * @return
	 */
	boolean updateWifi(ClockForm clockForm);
	
	/**
	 * 删除考勤WIFI
	 * @param clockForm
	 * @return
	 */
	boolean deleteWifi(ClockForm clockForm);
	
	/**
	 * 查询外出信息
	 * @param clockForm
	 * @return
	 */
	List<OutBusinessRecord> findOutBusinessRecords(ClockForm clockForm);
	
	/**
	 * 请假申请通过后，修改today表leave字段
	 * @param processClockForm
	 * @return
	 */
	boolean updateTodayForLeave(ProcessClockForm processClockForm);
	
	/**
	 * 请假申请通过后，修改today表leave字段
	 * @param processClockForm
	 * @return
	 */
	boolean updateRecordForLeave(ProcessClockForm processClockForm);
	
	/**
	 * 公出申请通过后，修改today表leave字段
	 * @param processClockForm
	 * @return
	 */
	boolean updateTodayForOutBusiness(ProcessClockForm processClockForm);
	
	/**
	 * 公出申请通过后，修改today表leave字段
	 * @param processClockForm
	 * @return
	 */
	boolean updateRecordForOutBusiness(ProcessClockForm processClockForm);
	
	/**
	 * 插入补卡记录
	 * @param processClockForm
	 * @return
	 */
	boolean insertClockReplace(ProcessClockForm processClockForm);
	
	/**
	 * 补卡申请通过后更新record表
	 * @param processClockForm
	 * @return
	 */
	boolean updateRecordForClockReplace(ProcessClockForm processClockForm);
	
}
