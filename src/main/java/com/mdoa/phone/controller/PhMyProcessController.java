package com.mdoa.phone.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.JsonReturnObject;
import com.mdoa.base.model.PageModel;
import com.zhou.myProcess.instance.Process;
import com.zhou.myProcess.instance.TaskModel;
import com.zhou.myProcess.util.ProcessConstant;
import com.mdoa.processManage.model.ProcessMessage;
import com.mdoa.processManage.model.TaskRecord;
import com.mdoa.processManage.po.GetMyRelatedProcessForm;
import com.mdoa.processManage.service.MyProcessService;
import com.mdoa.user.model.UserInfo;

@RestController
@RequestMapping("/phMyProcess")
public class PhMyProcessController extends BaseController{
	
	@Autowired
	private MyProcessService myProcessService;
	
	@RequestMapping("/getCopyToProcessList.ph")
	public String getCopyToProcessList(GetMyRelatedProcessForm getMyRelatedProcessForm, HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try{
			UserInfo userInfo = (UserInfo) getPhSession(request).getAttribute("userInfo");
			getMyRelatedProcessForm.setUserId(userInfo.getUserId());
			jro.setMessage(gson.toJson(myProcessService.getCopyToProcessList(getMyRelatedProcessForm)));
			jro.setSuccess(true);
		}catch(Exception e){
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	
	@RequestMapping("/addExecute.ph")
	public String addExecute(String typeId, UserInfo executor, HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try{
			UserInfo userInfo = (UserInfo) getPhSession(request).getAttribute("userInfo");
			jro.setMessage(myProcessService.addTask(typeId, userInfo, executor, ProcessConstant.USER_TASK));
			jro.setSuccess(true);
		}catch(Exception e){
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	
	@RequestMapping("addCopyTo.ph")
	public String addCopyTo(String typeId, UserInfo executor, HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try{
			UserInfo userInfo = (UserInfo) getPhSession(request).getAttribute("userInfo");
			jro.setMessage(myProcessService.addTask(typeId, userInfo, executor, ProcessConstant.COPY_TO_TASK));
			jro.setSuccess(true);
		}catch(Exception e){
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	
	/**
	 * 手机端  删除审批人，需要taskId即可
	 * @param task
	 * @return
	 */
	@RequestMapping("deleteExecute.ph")
	public String phDeleteExecute(TaskModel task){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			jro.setMessage(myProcessService.deleteTask(task, ProcessConstant.USER_TASK));
			jro.setSuccess(true);
		}catch (Exception e) {
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
		
	}
	
	/**
	 * 手机端  删除抄送人，需要的参数为
	 * @param task
	 * @return
	 */
	@RequestMapping("deleteCopyTo.ph")
	public String phDeleteCopyTo(TaskModel task){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			jro.setMessage(myProcessService.deleteTask(task, ProcessConstant.COPY_TO_TASK));
			jro.setSuccess(true);
		}catch (Exception e) {
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
		
	}
	
	@RequestMapping("startProcess.ph")
	public String startProcess(HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try{
			UserInfo userInfo = (UserInfo) getPhSession(request).getAttribute("userInfo");
			myProcessService.startProcess(request, userInfo);
			jro.setSuccess(true);
		}catch(Exception e){
			e.printStackTrace();
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	
	@RequestMapping("getExamineIdea.ph")
	public String getExamineIdea(String processRecordId){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try{
			List<TaskRecord> examineIdea = myProcessService.getExamineIdea(processRecordId);
			jro.setReturnObj(examineIdea);
			jro.setSuccess(true);
		}catch(Exception e){
			e.printStackTrace();
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	
	/**
	 * 获取流程信息的流程列表
	 * @return
	 */
	@RequestMapping("getProcesses.ph")
	public String getProcesses(){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try{
			Map<String, Process> processes = myProcessService.getProcesses();
			jro.setReturnObj(processes);
			jro.setSuccess(true);
		}catch(Exception e){
			e.printStackTrace();
			jro.setSuccess(false);
		}
		
		return gson.toJson(jro);
	}
	
	@RequestMapping("getWaitExamineProcess.ph")
	public String getWaitExamineProcess(GetMyRelatedProcessForm getMyRelatedProcessForm, HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try{
			UserInfo userInfo = (UserInfo) getPhSession(request).getAttribute("userInfo");
			getMyRelatedProcessForm.setUserId(userInfo.getUserId());
			PageModel<ProcessMessage> pageModel = myProcessService.getWaitExamineProcess(getMyRelatedProcessForm);
			jro.setReturnObj(pageModel);
			jro.setSuccess(true);
		}catch(Exception e){
			e.printStackTrace();
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	
	@RequestMapping("examineTask.ph")
	public String examineTask(TaskModel taskModel){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try{
			myProcessService.examineTask(taskModel);
			System.out.println("成功");
			jro.setSuccess(true);
			jro.setMessage("操作成功");
		}catch(Exception e){
			e.printStackTrace();
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	
	/**
	 * 根据流程类别ID和当前登录的用户的Id，来获取用户的这个流程的审批及抄送信息
	 * @param request
	 * @param typeId
	 * @return
	 */
	@RequestMapping("getProcessMessage.ph")
	public String getProcessMessage(HttpServletRequest request, String typeId){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try{
			UserInfo userInfo = (UserInfo) getPhSession(request).getAttribute("userInfo");
			Map<String, String> params = new HashMap<String, String>();
			params.put("typeId", typeId);
			params.put("userId", userInfo.getUserId());
			ProcessMessage message = myProcessService.getProcessMessage(params ,false);
			jro.setReturnObj(message);
			jro.setSuccess(true);
		}catch(Exception e){
			e.printStackTrace();
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	
}
