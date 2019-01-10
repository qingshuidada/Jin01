package com.mdoa.personnel.bo;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.mdoa.base.model.BaseModel;
import com.mdoa.util.DateUtil;

public class ClockForm extends BaseModel{
	
	private String recordId;
	private String todayId;
	private String userId;
	private String userName;
	private Date date;// 时间
	private String dateStr;
	private Date recordDate;//记录时间
	private String recordDateStr;
	private String onDutyTime;//上班时间
	private String offDutyTime;//00:00:00 下班时间
	private String clockInTime;//实际上班时间
	private String clockOutTime;//00:00:00 实际下班时间
	private String leaveFlag;//请假状态 0正常 1病假 2事假 3外出 4休息 5放假
	private String outFlag;//是否外出 1是0否
	private String beLateFlag;//是否迟到
	private String leaveEarlyFlag;//是否早退
	private String createUserId;
	private String createUserName;
	private Date createTime;
	private String createTimeStr;
	private String updateUserId;
	private String updateUserName;
	private Date updateTime;
	private String clockTime;
	private String updateTimeStr;
	private String balanceMonth;//月统计查询时间 yyyy-MM
	private String aliveFlag;
	private String isLeave;//是否请假
	private String isOut;//是否外出
	private String attendanceGroupId;//考勤组
	private String departmentUrl;//部门
	private String postId;//岗位
	private String idCard;
	private String userAccount;
	private String onDutyOutAddress;//外出的地址
	private String onDutyOutLocation;//外出的坐标，经纬度
	private String onDutyWifiId;//正常打卡的wifiId
	private String onDutyWifiName;//正常打卡的wifi名称
	private String offDutyOutAddress;//外出的地址
	private String offDutyOutLocation;//外出的坐标，经纬度
	private String offDutyWifiId;//正常打卡的wifiId
	private String offDutyWifiName;//正常打卡的wifi名称
	private String wifiId;
	private String wifiName;
	private String outAddress;
	private String outLocation;//经纬度
	private String isPhone;//是否为手机端接口
	private String phoneType;//1 android 2 ios
	private String ips;
	
	public String getAttendanceGroupId() {
		return attendanceGroupId;
	}

	public void setAttendanceGroupId(String attendanceGroupId) {
		this.attendanceGroupId = attendanceGroupId;
	}

	public String getDepartmentUrl() {
		return departmentUrl;
	}

	public void setDepartmentUrl(String departmentUrl) {
		this.departmentUrl = departmentUrl;
	}

	public String getPostId() {
		return postId;
	}

	public void setPostId(String postId) {
		this.postId = postId;
	}

	public String getIdCard() {
		return idCard;
	}

	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}

	public String getUserAccount() {
		return userAccount;
	}

	public void setUserAccount(String userAccount) {
		this.userAccount = userAccount;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
		this.dateStr = DateUtil.dateToStr(date, "yyyy-MM-dd");
	}

	public String getDateStr() {
		return dateStr;
	}

	public void setDateStr(String dateStr) {
		this.dateStr = dateStr;
		this.date = DateUtil.strToDate(dateStr, "yyyy-MM-dd");
	}

	public String getOffDutyTime() {
		return offDutyTime;
	}
	public void setOffDutyTime(String offDutyTime) {
		SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
		try {
			sdf.parse(offDutyTime);
		} catch (ParseException e) {
			e.printStackTrace();
			offDutyTime = null;
		}finally{	
			this.offDutyTime = offDutyTime;
		}
	}
	public String getOnDutyTime() {
		return onDutyTime;
	}
	public void setOnDutyTime(String onDutyTime) {
		SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
		try {
			sdf.parse(onDutyTime);
		} catch (ParseException e) {
			e.printStackTrace();
			onDutyTime = null;
		}finally{	
			this.onDutyTime = onDutyTime;
		}
	}
	public String getCreateUserId() {
		return createUserId;
	}
	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}
	public String getCreateUserName() {
		return createUserName;
	}
	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
		this.createTimeStr = DateUtil.dateToStr(createTime);
	}
	public String getCreateTimeStr() {
		return createTimeStr;
	}
	public void setCreateTimeStr(String createTimeStr) {
		this.createTimeStr = createTimeStr;
		this.createTime = DateUtil.strToDate(createTimeStr);
	}
	public String getUpdateUserId() {
		return updateUserId;
	}
	public void setUpdateUserId(String updateUserId) {
		this.updateUserId = updateUserId;
	}
	public String getUpdateUserName() {
		return updateUserName;
	}
	public void setUpdateUserName(String updateUserName) {
		this.updateUserName = updateUserName;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
		this.updateTimeStr = DateUtil.dateToStr(updateTime);
	}
	public String getUpdateTimeStr() {
		return updateTimeStr;
	}
	public void setUpdateTimeStr(String updateTimeStr) {
		this.updateTimeStr = updateTimeStr;
		this.updateTime = DateUtil.strToDate(updateTimeStr);
	}
	public String getAliveFlag() {
		return aliveFlag;
	}
	public void setAliveFlag(String aliveFlag) {
		this.aliveFlag = aliveFlag;
	}
	public String getRecordId() {
		return recordId;
	}
	public void setRecordId(String recordId) {
		this.recordId = recordId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public Date getRecordDate() {
		return recordDate;
	}
	public void setRecordDate(Date recordDate) {
		this.recordDate = recordDate;
		this.recordDateStr = DateUtil.dateToStr(recordDate,"yyyy-MM-dd");
	}
	public String getRecordDateStr() {
		return recordDateStr;
	}
	public void setRecordDateStr(String recordDateStr) {
		this.recordDateStr = recordDateStr;
		this.recordDate = DateUtil.strToDate(recordDateStr,"yyyy-MM-dd");
	}
	public String getClockInTime() {
		return clockInTime;
	}
	public void setClockInTime(String clockInTime) {
		SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
		try {
			sdf.parse(clockInTime);
		} catch (ParseException e) {
			e.printStackTrace();
			clockInTime = null;
		}finally{	
			this.clockInTime = clockInTime;
		}
	}
	public String getClockOutTime() {
		return clockOutTime;
	}
	public void setClockOutTime(String clockOutTime) {
		SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
		try {
			sdf.parse(clockOutTime);
		} catch (ParseException e) {
			e.printStackTrace();
			clockOutTime = null;
		}finally{	
			this.clockOutTime = clockOutTime;
		}
	}
	public String getClockTime() {
		return clockTime;
	}
	public void setClockTime(String clockTime) {
		SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
		try {
			sdf.parse(clockTime);
		} catch (ParseException e) {
			e.printStackTrace();
			clockTime = null;
		}finally{	
			this.clockTime = clockTime;
		}
	}
	public String getBeLateFlag() {
		return beLateFlag;
	}
	public void setBeLateFlag(String beLateFlag) {
		this.beLateFlag = beLateFlag;
	}
	public String getLeaveEarlyFlag() {
		return leaveEarlyFlag;
	}
	public void setLeaveEarlyFlag(String leaveEarlyFlag) {
		this.leaveEarlyFlag = leaveEarlyFlag;
	}
	public String getLeaveFlag() {
		return leaveFlag;
	}
	public void setLeaveFlag(String leaveFlag) {
		this.leaveFlag = leaveFlag;
	}
	public String getTodayId() {
		return todayId;
	}
	public void setTodayId(String todayId) {
		this.todayId = todayId;
	}

	public String getOutFlag() {
		return outFlag;
	}

	public void setOutFlag(String outFlag) {
		this.outFlag = outFlag;
	}

	public String getBalanceMonth() {
		return balanceMonth;
	}

	public void setBalanceMonth(String balanceMonth) {
		SimpleDateFormat sdf = new SimpleDateFormat("YY-mm");
		try {
			sdf.parse(balanceMonth);
		} catch (ParseException e) {
			e.printStackTrace();
			balanceMonth = null;
		}finally{	
			this.balanceMonth = balanceMonth;
		}
		
	}

	public String getIsLeave() {
		return isLeave;
	}

	public void setIsLeave(String isLeave) {
		this.isLeave = isLeave;
	}

	public String getIsOut() {
		return isOut;
	}

	public void setIsOut(String isOut) {
		this.isOut = isOut;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getOnDutyOutAddress() {
		return onDutyOutAddress;
	}

	public void setOnDutyOutAddress(String onDutyOutAddress) {
		this.onDutyOutAddress = onDutyOutAddress;
	}

	public String getOnDutyOutLocation() {
		return onDutyOutLocation;
	}

	public void setOnDutyOutLocation(String onDutyOutLocation) {
		this.onDutyOutLocation = onDutyOutLocation;
	}

	public String getOnDutyWifiId() {
		return onDutyWifiId;
	}

	public void setOnDutyWifiId(String onDutyWifiId) {
		this.onDutyWifiId = onDutyWifiId;
	}

	public String getOnDutyWifiName() {
		return onDutyWifiName;
	}

	public void setOnDutyWifiName(String onDutyWifiName) {
		this.onDutyWifiName = onDutyWifiName;
	}

	public String getOffDutyOutAddress() {
		return offDutyOutAddress;
	}

	public void setOffDutyOutAddress(String offDutyOutAddress) {
		this.offDutyOutAddress = offDutyOutAddress;
	}

	public String getOffDutyOutLocation() {
		return offDutyOutLocation;
	}

	public void setOffDutyOutLocation(String offDutyOutLocation) {
		this.offDutyOutLocation = offDutyOutLocation;
	}

	public String getOffDutyWifiId() {
		return offDutyWifiId;
	}

	public void setOffDutyWifiId(String offDutyWifiId) {
		this.offDutyWifiId = offDutyWifiId;
	}

	public String getOffDutyWifiName() {
		return offDutyWifiName;
	}

	public void setOffDutyWifiName(String offDutyWifiName) {
		this.offDutyWifiName = offDutyWifiName;
	}

	public String getIsPhone() {
		return isPhone;
	}

	public void setIsPhone(String isPhone) {
		this.isPhone = isPhone;
	}

	public String getPhoneType() {
		return phoneType;
	}

	public void setPhoneType(String phoneType) {
		this.phoneType = phoneType;
	}

	public String getIps() {
		return ips;
	}

	public void setIps(String ips) {
		this.ips = ips;
	}

	public String getWifiId() {
		return wifiId;
	}

	public void setWifiId(String wifiId) {
		this.wifiId = wifiId;
	}

	public String getWifiName() {
		return wifiName;
	}

	public void setWifiName(String wifiName) {
		this.wifiName = wifiName;
	}

	public String getOutAddress() {
		return outAddress;
	}

	public void setOutAddress(String outAddress) {
		this.outAddress = outAddress;
	}

	public String getOutLocation() {
		return outLocation;
	}

	public void setOutLocation(String outLocation) {
		this.outLocation = outLocation;
	}
	
}
