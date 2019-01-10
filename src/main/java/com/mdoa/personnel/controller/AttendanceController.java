package com.mdoa.personnel.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.personnel.bo.AttendanceClassForm;
import com.mdoa.personnel.bo.AttendanceGroupForm;
import com.mdoa.personnel.bo.AttendanceUserInfoForm;
import com.mdoa.personnel.model.AttendanceClass;
import com.mdoa.personnel.model.AttendanceGroup;
import com.mdoa.personnel.service.AttendanceService;
import com.mdoa.security.annotation.HasPermissions;
import com.mdoa.user.model.UserInfo;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {
	
	@Autowired
	private AttendanceService attendanceService;
	
	/**
	 * 添加考勤组
	 * @param attendanceGroupForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/insertGroup.do")
	@HasPermissions(permissions = { "admin:personnel:attendanceManage:checkGroupManage:add" })
	public String insertGroup(AttendanceGroupForm attendanceGroupForm, HttpServletRequest request){
		try{
			attendanceService.insertGroup(attendanceGroupForm, request);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询考勤组
	 * @param attendanceGroupForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/findGroupByCondition.do")
	public String findGroupByCondition(AttendanceGroupForm attendanceGroupForm, HttpServletRequest request){
		try{
			PageModel<AttendanceGroup> pageInfo = attendanceService.findGroupByCondition(attendanceGroupForm, request);
			Gson gson = new Gson();
			return gson.toJson(pageInfo);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 更新考勤组
	 * @param attendanceGroupForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/updateGroupByCondition.do")
	@HasPermissions(permissions = { "admin:personnel:attendanceManage:checkGroupManage:update" })
	public String updateGroupByCondition(AttendanceGroupForm attendanceGroupForm, HttpServletRequest request){
		try{
			attendanceService.updateGroupByCondition(attendanceGroupForm, request);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 删除考勤组
	 * @param attendanceGroupForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/deleteGroup.do")
	@HasPermissions(permissions = { "admin:personnel:attendanceManage:checkGroupManage:delete" })
	public String deleteGroup(AttendanceGroupForm attendanceGroupForm, HttpServletRequest request){
		try{
			attendanceService.deleteGroup(attendanceGroupForm, request);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 通过高级查询条件方式添加人员进考勤组
	 * @param userInfo
	 * @return
	 */
	@RequestMapping("/addGroupMemberByAdvancedQuery.do")
	public String addGroupMemberByAdavacedQuery(AttendanceUserInfoForm userInfo, HttpServletRequest request){
		try{
			attendanceService.addGroupMemberByAdvacedQuery(userInfo, request);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 通过ids方式添加人员进考勤组
	 * @param userInfo
	 * @return
	 */
	@RequestMapping("/addGroupMemberByIds.do")
	@HasPermissions(permissions = { "admin:personnel:attendanceManage:checkGroupAllot:add" })
	public String addGroupMemberByIds(AttendanceUserInfoForm userInfo, HttpServletRequest request){
		try{
			attendanceService.addGroupMemberByIds(userInfo, request);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 移除考勤组人员
	 * @param userInfo
	 * @param request
	 * @return
	 */
	@RequestMapping("/removeGroupMember.do")
	@HasPermissions(permissions = { "admin:personnel:attendanceManage:checkGroupAllot:delete" })
	public String removeGroupMember(AttendanceUserInfoForm userInfo, HttpServletRequest request){
		try{
			attendanceService.removeGroupMember(userInfo, request);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 添加班次
	 * @param attendanceGroupForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/insertClass.do")
	public String insertClass(AttendanceClassForm attendanceClassForm, HttpServletRequest request){
		try{
			attendanceService.insertClass(attendanceClassForm, request);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询班次
	 * @param attendanceClassForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/findClassByCondition.do")
	public String findClassByCondition(AttendanceClassForm attendanceClassForm, HttpServletRequest request){
		try{
			PageModel<AttendanceClass> pageInfo = attendanceService.findClassByCondition(attendanceClassForm, request);
			Gson gson = new Gson();
			return gson.toJson(pageInfo);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 更新班次
	 * @param attendanceClassForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/updateClassByCondition.do")
	public String updateClassByCondition(AttendanceClassForm attendanceClassForm, HttpServletRequest request){
		try{
			attendanceService.updateClassByCondition(attendanceClassForm, request);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 删除班次
	 * @param attendanceClassForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/deleteClass.do")
	public String deleteClass(AttendanceClassForm attendanceClassForm, HttpServletRequest request){
		try{
			attendanceService.deleteClass(attendanceClassForm, request);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	
}
