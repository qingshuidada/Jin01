package com.mdoa.phone.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.JsonReturnObject;
import com.mdoa.base.model.PageModel;
import com.mdoa.user.model.UserInfo;
import com.mdoa.work.model.Mission;
import com.mdoa.work.service.MissionService;
@RestController
@RequestMapping("phMission")
public class PhMissionController extends BaseController{

	@Autowired
	private MissionService missionService;
	
	/**
	 * 查询我负责的任务信息
	 * @param mission request
	 * @return
	 */
	@RequestMapping("/selectMyChargeMission.ph")
	public String selectMyChargeMission(Mission mission,HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try{
			UserInfo userInfo = (UserInfo) getPhSession(request).getAttribute("userInfo");
			mission.setHeadUserId(userInfo.getUserId());
			PageModel<Mission> pageModel = missionService.selectUserChargeMission(mission);
			jro.setReturnObj(pageModel);
			jro.setSuccess(true);
		}catch(Exception e){
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	/**
	 * 查询我负责的任务信息
	 * @param mission request
	 * @return
	 */
	@RequestMapping("/selectMyLaunchMission.ph")
	public String selectMyLaunchMission(Mission mission,HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try{
			UserInfo userInfo = (UserInfo) getPhSession(request).getAttribute("userInfo");
			mission.setLaunchUserId(userInfo.getUserId());
			PageModel<Mission> pageModel = missionService.selectMission(mission);
			jro.setReturnObj(pageModel);
			jro.setSuccess(true);
		}catch(Exception e){
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	@RequestMapping("selectMissionById.ph")
	public String selectMissionById(Mission mission,HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try{
			UserInfo userInfo = (UserInfo) getPhSession(request).getAttribute("userInfo");
			mission.setHeadUserId(userInfo.getUserId());
			PageModel<Mission> pageModel = missionService.selectMissionByMissionId(mission);
			jro.setReturnObj(pageModel);
			jro.setSuccess(true);
		}catch(Exception e){
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	@RequestMapping("selectMissionUserName.ph")
	public String selectMissionUserName(Mission mission,HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try{
			UserInfo userInfo = (UserInfo) getPhSession(request).getAttribute("userInfo");
			mission.setHeadUserId(userInfo.getUserId());
			PageModel<Mission> pageModel = missionService.selectMissionUserName(mission);
			jro.setReturnObj(pageModel);
			jro.setSuccess(true);
		}catch(Exception e){
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}

	@RequestMapping("selectMissionHeadUser.ph")
	public String selectMissionHeadUser(Mission mission,HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try{
			UserInfo userInfo = (UserInfo) getPhSession(request).getAttribute("userInfo");
			mission.setHeadUserId(userInfo.getUserId());
			PageModel<Mission> pageModel = missionService.selectMissionHeadUser(mission);
			jro.setReturnObj(pageModel);
			jro.setSuccess(true);
		}catch(Exception e){
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}

	@RequestMapping("updateMissionState.ph")
	public String updateMissionState(Mission mission,HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try{
			UserInfo userInfo = (UserInfo) getPhSession(request).getAttribute("userInfo");
			mission.setHeadUserId(userInfo.getUserId());
			missionService.updateMissionState(mission);
			jro.setSuccess(true);
		}catch(Exception e){
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}

	@RequestMapping("addMission.ph")
	public String insertMissionPerson(Mission mission,HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try{
			UserInfo userInfo = (UserInfo) getPhSession(request).getAttribute("userInfo");
			mission.setLaunchUserId(userInfo.getUserId());
			mission.setLaunchUserName(userInfo.getUserName());
			missionService.insertMission(mission);
			jro.setSuccess(true);
		}catch(Exception e){
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);		
	}
	
}
