package com.mdoa.processManage.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.google.gson.Gson;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.processManage.po.GroupForm;
import com.mdoa.processManage.service.ProcessManageService;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.StringUtil;
import com.zhou.myProcess.instance.GroupModel;
import com.zhou.myProcess.instance.GroupTaskModel;
import com.zhou.myProcess.util.ProcessConstant;

@RestController
@RequestMapping("processManage")
public class ProcessManageController {
	
	@Autowired
	private ProcessManageService processManageService;
	
	@RequestMapping("getGroupList.do")
	public String getGroupList(GroupForm groupForm){
		try{
			Gson gson = new Gson();
			return gson.toJson(processManageService.getGroupList(groupForm));
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}

	@RequestMapping("updateGroupName.do")
	public String updateGroupName(GroupModel group){
		try{
			processManageService.updateGroupName(group);
			return Constant.SUCCESS_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@RequestMapping("addGroup.do")
	public String addGroup(GroupModel group){
		try{
			processManageService.addGroup(group);
			return Constant.SUCCESS_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@RequestMapping("deleteGroup.do")
	public String deleteGroup(GroupModel group){
		try{
			processManageService.deleteGroup(group);
			return Constant.SUCCESS_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@RequestMapping("getMustTask.do")
	public String getMustTask(String groupId, String processTypeId){
		try{
			Gson gson = new Gson();
			return gson.toJson(processManageService.getMustTask(groupId, processTypeId));
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@RequestMapping("addMustTask.do")
	public String addMustTask(GroupTaskModel task){
		try{
			return processManageService.addMustTask(task);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@RequestMapping("addMustCopyToTask.do")
	public String addMustCopyToTask(GroupTaskModel task){
		try{
			return processManageService.addMustCopyToTask(task);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@RequestMapping("getGroupUserList.do")
	public String getGroupUserList(UserInfo userInfo){
		try{
			Gson gson = new Gson();
			return gson.toJson(processManageService.getGroupUserList(userInfo));
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@RequestMapping("addMustUser.do")
	public String addMustUser(String userId, String groupId){
		try{
			processManageService.addMustUser(userId, groupId);
			return Constant.SUCCESS_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@RequestMapping("addAllMustUser.do")
	public String addMustUser(UserInfo userInfo){
		try{
			processManageService.addAllMustUser(userInfo);
			return Constant.SUCCESS_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@RequestMapping("deleteMustExecute.do")
	public String deleteMustExecute(GroupTaskModel task){
		try{
			processManageService.deleteTask(task, ProcessConstant.USER_TASK);
			return Constant.SUCCESS_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@RequestMapping("deleteMustCoptTo.do")
	public String deleteMustCoptToUser(GroupTaskModel task){
		try{
			processManageService.deleteTask(task, ProcessConstant.COPY_TO_TASK);
			return Constant.SUCCESS_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
}
