package com.mdoa.personnel.service;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.base.model.PageModel;
import com.mdoa.base.service.BaseService;
import com.mdoa.personnel.bo.ClockDayDetail;
import com.mdoa.personnel.bo.ClockDayForm;
import com.mdoa.personnel.bo.ClockForm;
import com.mdoa.personnel.bo.ClockMonthBalanceForm;
import com.mdoa.personnel.bo.ClockMonthForm;
import com.mdoa.personnel.bo.ClockState;
import com.mdoa.personnel.dao.ClockDao;
import com.mdoa.personnel.model.AttendanceRecord;
import com.mdoa.personnel.model.AttendanceToday;
import com.mdoa.personnel.model.AttendanceWifi;
import com.mdoa.personnel.model.LeaveApply;
import com.mdoa.personnel.model.OutBusinessRecord;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.DateUtil;
import com.mdoa.util.ExcelModel;
import com.mdoa.util.ExcelUtil;
import com.mdoa.util.JSONUtil;
import com.mdoa.util.StringUtil;

@Service
@Transactional
public class ClockService extends BaseService{
	
	@Autowired
	private ClockDao clockDao;
	
	/**
	 * 定时任务 处理前一天打卡记录 并插入新的预备记录
	 */
	@Transactional
	public void autoDeal() {
		//对前一天打卡记录处理迟到早退标志位
		clockDao.dealToday();
		//将前一天打卡记录转存入记录表
		clockDao.saveRecordFromToday();
		//将前一天today记录删除
		clockDao.truncateToday();
		//当考勤组没有班次时按默认时间插入班次
		clockDao.insertClassByDefault();
		//插入新的预备记录
		clockDao.insertPreToday();
		//对today打卡记录处理leave_flag标志位
		clockDao.dealTodayLeaveFlag();
		System.out.println("---------------------------"+DateUtil.dateToStr(new Date()));
	}
	
	/**
	 * 获取用户当前打卡状态以及系统时间
	 * @param request
	 * @param clockForm
	 * @return
	 */
	public ClockState getMyClockState(HttpServletRequest request, ClockForm clockForm) {
		return this.getMyClockState(request, clockForm,getUser(request));
	}
	
	/**
	 * 获取用户当前打卡状态以及系统时间 check
	 * @param request
	 * @param clockForm
	 * @return
	 */
	public ClockState getMyClockState(HttpServletRequest request, ClockForm clockForm, UserInfo userInfo) {
		clockForm.setUserId(userInfo.getUserId());
		ClockState clockState = new ClockState();
		if("1".equals(clockForm.getIsPhone())){
			List<AttendanceWifi> list = clockDao.getWifi(clockForm);
			if(list != null && list.size() > 0){
				clockState.setWifiId(list.get(0).getWifiId());
				clockState.setWifiName(list.get(0).getWifiName());
				clockState.setCanClock("1");
			}else{
				clockState.setCanClock("0");
			}
		}
		AttendanceToday attendanceToday = clockDao.findTodayByCondition(clockForm);
		clockState.setUserName(userInfo.getUserName());
		clockState.setServerTime(new Date());
		clockState.setAttendanceToday(attendanceToday);
		return clockState;
	}
	
	/**
	 * 打卡重载方法
	 * 不带地址，外勤时
	 * @param request
	 * @return
	 */
	public String clock(HttpServletRequest request){
		return this.clock(request, new ClockForm());
	}
	
	/**
	 * 手机端打卡方法
	 * @param request
	 * @param clockForm
	 * @param userInfo
	 * @return
	 */
	public String clock(HttpServletRequest request, ClockForm clockForm, UserInfo userInfo) {
		clockForm.setUserId(userInfo.getUserId());
		AttendanceToday today = clockDao.findTodayByCondition(clockForm);
		String response = "";
		String clockTime = DateUtil.dateToStr(new Date(),"HH:mm:ss");
		String onDutyTime = today.getOnDutyTime();
		String offDutyTime = today.getOffDutyTime();
		String leaveFlag = today.getLeaveFlag();
		
		clockForm.setClockTime(clockTime);
		clockForm.setLeaveFlag(leaveFlag);
		if(today.getClockInTime() == null && clockTime.compareTo(offDutyTime) < 0){
			//尚未上班打卡且未过下班时间
			if(onDutyTime == null || clockTime.compareTo(onDutyTime) <= 0 ){
				//当天无班次或尚未过上班打卡时间 正常上班打卡
				if(!clockDao.clockIn(clockForm))
					throw new RuntimeException("上班打卡失败");
				response = "上班打卡成功";
			}else if(onDutyTime != null && clockTime.compareTo(onDutyTime) > 0){
				if(!clockDao.clockInLate(clockForm))
					throw new RuntimeException("迟到上班打卡失败");
				response = "迟到上班打卡成功";
			}
		}else if((today.getClockInTime() != null && today.getClockOutTime() == null )||
				( today.getClockInTime() == null && clockTime.compareTo(offDutyTime) >= 0 && today.getClockOutTime() == null)){
			//已上班打卡尚未下班打卡或未上班打卡但已过下班时间且未下班打卡
			if(offDutyTime == null || clockTime.compareTo(offDutyTime) >= 0 ){
				//当天无班次或已过下班打卡时间 正常下班打卡
				if(!clockDao.clockOut(clockForm))
					throw new RuntimeException("下班打卡失败");
				response = "下班打卡成功";
			}else if(offDutyTime != null && clockTime.compareTo(offDutyTime) < 0){
				if(!clockDao.clockOutEarly(clockForm))
					throw new RuntimeException("早退下班打卡失败");
				response = "早退下班打卡成功";
			}
		}else{
			//则视为更新下班打卡时间
			if(offDutyTime == null || clockTime.compareTo(offDutyTime) >= 0 ){
				//当天无班次或已过下班打卡时间 正常下班打卡
				if(!clockDao.clockOut(clockForm))
					throw new RuntimeException("更新下班打卡失败");
				response = "下班打卡状态更新成功，为正常下班打卡";
			}else if(offDutyTime != null && clockTime.compareTo(offDutyTime) < 0){
				if(!clockDao.clockOutEarly(clockForm))
					throw new RuntimeException("更新下班打卡失败");
				response = "下班打卡状态更新成功,为早退下班打卡";
			}
		}
		return response;
	}
	
	/**
	 * 打卡重载方法
	 * 带地址，wifi外勤
	 */
	public String clock(HttpServletRequest request, ClockForm clockForm) {
		UserInfo userInfo = getUser(request);
		return this.clock(request,clockForm,userInfo);
	}
	
	/**
	 * 获取我的月打卡记录以及汇总信息
	 * @param request
	 * @param clockForm
	 * @return
	 */
	public ClockMonthForm getMyClockMonthForm(HttpServletRequest request, ClockForm clockForm) {
		UserInfo userInfo = getUser(request);
		return this.getMyClockMonthForm(request, clockForm,userInfo);
	}
	
	/**
	 * 手机端获取我的月打卡记录以及汇总信息
	 * @param request
	 * @param clockForm
	 * @return
	 */
	public ClockMonthForm getMyClockMonthForm(HttpServletRequest request, ClockForm clockForm, UserInfo userInfo) {
		ClockMonthForm clockMonthForm = new ClockMonthForm();
		clockMonthForm.setUserId(userInfo.getUserId());
		clockMonthForm.setUserName(userInfo.getUserName());
		
		clockForm.setUserId(userInfo.getUserId());
		//获取每日简略信息
		List<ClockDayForm> clockDayForms = clockDao.findDayFormByMonth(clockForm);
		//获取打卡汇总信息
		ClockMonthBalanceForm clockMonthBalanceForm = clockDao.findBalanceFormByMonth(clockForm);
		
		clockMonthForm.setClockDayForms(clockDayForms);
		clockMonthForm.setClockMonthBalanceForm(clockMonthBalanceForm);
		return clockMonthForm;
	}
	
	/**
	 * 查询月打卡记录以及汇总信息
	 * @param clockForm
	 * @return
	 */
	public ClockMonthForm getClockMonthForm(ClockForm clockForm) {
		ClockMonthForm clockMonthForm = new ClockMonthForm();
		clockMonthForm.setUserId(clockForm.getUserId());
		clockMonthForm.setUserName(clockForm.getUserName());
		//获取每日简略信息
		List<ClockDayForm> clockDayForms = clockDao.findDayFormByMonth(clockForm);
		//获取打卡汇总信息
		ClockMonthBalanceForm clockMonthBalanceForm = clockDao.findBalanceFormByMonth(clockForm);
		clockMonthForm.setClockDayForms(clockDayForms);
		clockMonthForm.setClockMonthBalanceForm(clockMonthBalanceForm);
		return clockMonthForm;
	}
	
	/**
	 * 获取我的某天详细考勤信息
	 * @param request
	 * @param clockForm
	 * @return
	 */
	public ClockDayDetail getMyClockDayDetail(HttpServletRequest request, ClockForm clockForm) {
		UserInfo userInfo = getUser(request);
		return this.getMyClockDayDetail(request, clockForm,userInfo);
	}
	
	/**
	 * 手机端获取我的某天详细考勤信息
	 * @param request
	 * @param clockForm
	 * @return
	 */
	public ClockDayDetail getMyClockDayDetail(HttpServletRequest request, ClockForm clockForm, UserInfo userInfo) {
		ClockDayDetail clockDayDetail = new ClockDayDetail();
		clockForm.setUserId(userInfo.getUserId());
		AttendanceRecord attendanceRecord = clockDao.findRecordByCondition(clockForm);
		clockDayDetail.setAttendanceRecord(attendanceRecord);
		if("1".equals(clockForm.getIsLeave())){
			List<LeaveApply> leaveApplys = clockDao.findLeaveApply(clockForm);
			clockDayDetail.setLeaveApplys(leaveApplys);
		}
		if("1".equals(clockForm.getIsOut())){
			List<OutBusinessRecord> outBusinessRecords = clockDao.findOutBusinessRecords(clockForm);
			clockDayDetail.setOutBusinessRecords(outBusinessRecords);
		}
		return clockDayDetail;
	}
	
	/**
	 * 获取某天详细考勤信息
	 * @param clockForm
	 * @return
	 */
	public ClockDayDetail getClockDayDetail(ClockForm clockForm) {
		ClockDayDetail clockDayDetail = new ClockDayDetail();
		AttendanceRecord attendanceRecord = clockDao.findRecordByCondition(clockForm);
		clockDayDetail.setAttendanceRecord(attendanceRecord);
		if("1".equals(clockForm.getIsLeave())){
			List<LeaveApply> leaveApplys = clockDao.findLeaveApply(clockForm);
			clockDayDetail.setLeaveApplys(leaveApplys);
		}
		if("1".equals(clockForm.getIsOut())){
			List<OutBusinessRecord> outBusinessRecords = clockDao.findOutBusinessRecords(clockForm);
			clockDayDetail.setOutBusinessRecords(outBusinessRecords);
		}
		return clockDayDetail;
	}
	
	
	/**
	 * 查询月考勤汇总信息
	 * @param request
	 * @param clockForm
	 * @return
	 */
	public PageModel<ClockMonthBalanceForm> getMonthFormByCondition(HttpServletRequest request, ClockForm clockForm) {
		if(!StringUtil.isEmpty(clockForm.getUserName())){
			clockForm.setUserName(StringUtil.toLikeRight(clockForm.getUserName()));
		}
		if(!StringUtil.isEmpty(clockForm.getDepartmentUrl())){
			clockForm.setDepartmentUrl(StringUtil.toLikeRight(clockForm.getDepartmentUrl()));
		}
		PageHelper.startPage(clockForm.getPage(), clockForm.getRows());
		List<ClockMonthBalanceForm> list = clockDao.getMonthFormByCondition(clockForm);
		PageModel<ClockMonthBalanceForm> pageInfo = new PageModel<>((Page<ClockMonthBalanceForm>)list);
		return pageInfo;
	}
	
	/**
	 * 查询考勤月份
	 * @return
	 */
	public List<String> getBalanceMotnh() {
		List<String> balanceMonthes = clockDao.getBalanceMonth();
		return balanceMonthes;
	}
	
	/**
	 * 导出考勤信息到Excel
	 * @param clockForm
	 * @param jsonString
	 * @param filePath
	 */
	public void writeToExcel(ClockForm clockForm, String jsonString, String filePath) throws Exception{
		List<ExcelModel> modelDetails = JSONUtil.jsonToExcelModelList(jsonString);
		if(!StringUtil.isEmpty(clockForm.getUserName())){
			clockForm.setUserName(StringUtil.toLikeRight(clockForm.getUserName()));
		}
		if(!StringUtil.isEmpty(clockForm.getDepartmentUrl())){
			clockForm.setDepartmentUrl(StringUtil.toLikeRight(clockForm.getDepartmentUrl()));
		}
		List<ClockMonthBalanceForm> list = clockDao.getMonthFormByCondition(clockForm);
		for(int i = 0 ; i<list.size();i++){
			list.get(i).parseSex();
		}
		ExcelUtil.writeListToExcel(filePath, list, modelDetails);
	}

	/*@Transactional
	public void test() {
		clockDao.truncateGoOutApply();
		if(true){
			throw new RuntimeException("站住，老子抛异常啦！！！");
		}
		clockDao.truncateGoOutStream();
	}*/

	

	
	
	
	
}
