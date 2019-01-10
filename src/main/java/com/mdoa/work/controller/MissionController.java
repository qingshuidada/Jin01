package com.mdoa.work.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.user.model.UserInfo;
import com.mdoa.work.model.Mission;
import com.mdoa.work.service.MissionService;

@RestController
@RequestMapping("/mission")
public class MissionController extends BaseController{

	@Autowired
	private MissionService missionService;
	
	
	/**
	 * 增加任务
	 * @param mission
	 * @return
	 */
	@RequestMapping("insertMission.do")
	public String insertMission(Mission mission){
		try {
			missionService.insertMission(mission);
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 修改任务
	 * @param mission
	 * @return
	 */
	@RequestMapping("updateMission.do")
	public String updateMission(Mission mission){
		try {
			missionService.updateMission(mission);
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 修改任务
	 * @param mission
	 * @return
	 */
	@RequestMapping("updateMissionHead.do")
	public String updateMissionHead(Mission mission){
		try {
			missionService.updateMissionHead(mission);
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 修改任务的状态
	 * @param mission
	 * @return
	 */
	@RequestMapping("updateMissionState.do")
	public String updateMissionState(Mission mission){
		try {
			missionService.updateMissionState(mission);
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 删除任务
	 * @param mission
	 * @return
	 */
	@RequestMapping("deleteMission.do")
	public String deleteMission(Mission mission){
		try {
			missionService.deleteMission(mission);
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询我发起的任务信息
	 * @param mission request
	 * @return
	 */
	@RequestMapping("selectMyLaunchMission.do")
	public String selectMyLaunchMission(Mission mission,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);//获取当前登陆人
			mission.setLaunchUserId(userInfo.getUserId());
			PageModel<Mission> model = missionService.selectMission(mission);
			Gson gson = new Gson();
			return gson.toJson(model);
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询我负责的任务信息
	 * @param mission request
	 * @return
	 */
	@RequestMapping("selectMyChargeMission.do")
	public String selectMyChargeMission(Mission mission,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);//获取当前登陆人
			mission.setHeadUserId(userInfo.getUserId());
			PageModel<Mission> model = missionService.selectUserChargeMission(mission);
			Gson gson = new Gson();
			return gson.toJson(model);
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询任务信息
	 * @param mission
	 * @return
	 */
	@RequestMapping("selectMission.do")
	public String selectMission(Mission mission){
		try {
			PageModel<Mission> model = missionService.selectMission(mission);
			Gson gson = new Gson();
			return gson.toJson(model);
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询当前登录人可查看的任务
	 * @param mission request
	 * @return
	 */
	@RequestMapping("selectUserToviewMission.do")
	public String selectUserToviewMission(Mission mission,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);//获取当前登陆人
			mission.setUserId(userInfo.getUserId());
			PageModel<Mission> model = missionService.selectUserToviewMission(mission);
			Gson gson = new Gson();
			return gson.toJson(model);
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询一个任务的可查看人员
	 * @param mission request
	 * @return
	 */
	@RequestMapping("selectMissionUserName.do")
	public String selectMissionUserName(Mission mission,HttpServletRequest request){
		try {
			PageModel<Mission> model = missionService.selectMissionUserName(mission);
			Gson gson = new Gson();
			return gson.toJson(model);
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询一个任务的可查看人员
	 * @param mission request
	 * @return
	 */
	@RequestMapping("selectMissionHeadUser.do")
	public String selectMissionHeadUser(Mission mission,HttpServletRequest request){
		try {
			PageModel<Mission> model = missionService.selectMissionHeadUser(mission);
			Gson gson = new Gson();
			return gson.toJson(model);
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询与我相关的任务
	 * @param mission request
	 * @return
	 */
	@RequestMapping("selectMissionByUser.do")
	public String selectMissionByUser(Mission mission,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);//获取当前登陆人
			mission.setUserId(userInfo.getUserId());
			PageModel<Mission> model = missionService.selectMissionByUser(mission);
			Gson gson = new Gson();
			return gson.toJson(model);
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 根据missionId查询任务的详情
	 * @param mission request
	 * @return
	 */
	@RequestMapping("selectMissionByMissionId.do")
	public String selectMissionByMissionId(Mission mission,HttpServletRequest request){
		try {
			PageModel<Mission> model = missionService.selectMissionByMissionId(mission);
			Gson gson = new Gson();
			return gson.toJson(model);
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
}
