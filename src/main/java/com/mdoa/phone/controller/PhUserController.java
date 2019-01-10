package com.mdoa.phone.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.JsonReturnObject;
import com.mdoa.framework.dao.RoleDao;
import com.mdoa.personnel.bo.AttendanceGroupForm;
import com.mdoa.personnel.dao.AttendanceDao;
import com.mdoa.security.session.PhSession;
import com.mdoa.security.session.SessionContainer;
import com.mdoa.user.dao.UserInfoDao;
import com.mdoa.user.model.UserInfo;
import com.mdoa.user.service.UserService;
import com.mdoa.util.StringUtil;


@RestController
@RequestMapping("/phUser")
public class PhUserController extends BaseController{
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserInfoDao userInfoDao;
	
	@Autowired
	private RoleDao roleDao;
	
	@Autowired
	private AttendanceDao attendanceDao;
	
	@RequestMapping("/login.ph")
	public String login(UserInfo userInfo, HttpServletRequest request, HttpServletResponse response){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try{
			String key = (String)request.getParameter("sessionId");
			PhSession session = null;
			if(StringUtil.isEmpty(key)){
				session = SessionContainer.createSession();
				request.setAttribute("sessionId", session.getSessionKey());
				jro.setSessionId(session.getSessionKey());
			}else{
				session = SessionContainer.getSession(key);
				if(session == null){
					session = SessionContainer.createSession();
					request.setAttribute("sessionId", session.getSessionKey());
					jro.setSessionId(session.getSessionKey());
				}
			}
			UserInfo user = userService.login(userInfo, request);
			jro.setReturnObj(user);
			session.setAttribut("userInfo", user);
			jro.setSuccess(true);
		}catch(Exception e){
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	
	@RequestMapping("/error.ph")
	public String error(HttpServletRequest request){
		JsonReturnObject jro = (JsonReturnObject)request.getAttribute("jsonReturnObject");
		Gson gson = new Gson();
		return gson.toJson(jro);
	}
	
	/**
	 * 获取用户的信息
	 * @param request
	 * @return
	 */
	@RequestMapping("/getUser.ph")
	public String getUserMessage(HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try{
			PhSession phSession = this.getPhSession(request);
			UserInfo userInfo = (UserInfo)phSession.getAttribute("userInfo");
			UserInfo user = new UserInfo();
			user.setUserAccount(userInfo.getUserAccount());
			user.setIsPhone("1");
			UserInfo returnUser = userInfoDao.selectUserInfo(user).get(0);
			returnUser.setRoles(roleDao.queryRoleByUser(returnUser.getUserId()));
//			if(!StringUtil.isEmpty(returnUser.getAttendanceGroupId())){
//				AttendanceGroupForm attendanceGroupForm = new AttendanceGroupForm();
//				attendanceGroupForm.setGroupId(returnUser.getAttendanceGroupId());
//				returnUser.setAttendanceGroupName(attendanceDao.findGroupByCondition(attendanceGroupForm).get(0).getGroupName());
//			}	
			PhSession session = getPhSession(request);
			session.setAttribut("userInfo", returnUser);
			jro.setReturnObj(returnUser);
			jro.setSuccess(true);
		}catch(Exception e){
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
}
