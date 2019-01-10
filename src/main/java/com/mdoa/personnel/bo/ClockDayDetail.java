package com.mdoa.personnel.bo;

import java.util.List;

import com.mdoa.personnel.model.AttendanceRecord;
import com.mdoa.personnel.model.GoOutApply;
import com.mdoa.personnel.model.LeaveApply;
import com.mdoa.personnel.model.OutBusinessRecord;

public class ClockDayDetail {
	
	private AttendanceRecord attendanceRecord;
	private List<LeaveApply> leaveApplys;
	private List<OutBusinessRecord> outBusinessRecords;
	
	public AttendanceRecord getAttendanceRecord() {
		return attendanceRecord;
	}
	public void setAttendanceRecord(AttendanceRecord attendanceRecord) {
		this.attendanceRecord = attendanceRecord;
	}
	public List<LeaveApply> getLeaveApplys() {
		return leaveApplys;
	}
	public void setLeaveApplys(List<LeaveApply> leaveApplys) {
		this.leaveApplys = leaveApplys;
	}
	public List<OutBusinessRecord> getOutBusinessRecords() {
		return outBusinessRecords;
	}
	public void setOutBusinessRecords(List<OutBusinessRecord> outBusinessRecords) {
		this.outBusinessRecords = outBusinessRecords;
	}
	
}
