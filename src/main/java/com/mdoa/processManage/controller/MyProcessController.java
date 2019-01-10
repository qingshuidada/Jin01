package com.mdoa.processManage.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.constant.Constant;
import com.mdoa.processManage.model.ProcessMessage;
import com.mdoa.processManage.po.GetMyRelatedProcessForm;
import com.mdoa.processManage.service.MyProcessService;
import com.mdoa.user.model.UserInfo;
import com.zhou.myProcess.instance.TaskModel;
import com.zhou.myProcess.util.ProcessConstant;
import com.zhou.myProcess.instance.Process;

@RestController
@RequestMapping("myProcess")
public class MyProcessController extends BaseController{
	
	@Autowired
	private MyProcessService myProcessService;
	
	/**
	 * 获取流程信息的流程列表
	 * @return
	 */
	@RequestMapping("getProcesses.do")
	public String getProcesses(){
		try{
			Map<String, Process> processes = myProcessService.getProcesses();
			Gson gson = new Gson();
			return gson.toJson(processes);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 根据流程类别ID和当前登录的用户的Id，来获取用户的这个流程的审批及抄送信息
	 * @param request
	 * @param typeId
	 * @return
	 */
	@RequestMapping("getProcessMessage.do")
	public String getProcessMessage(HttpServletRequest request, String typeId){
		try{
			Map<String, String> params = new HashMap<String, String>();
			params.put("typeId", typeId);
			params.put("userId", getUser(request).getUserId());
			ProcessMessage message = myProcessService.getProcessMessage(params ,false);
			Gson gson = new Gson();
			return gson.toJson(message);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 添加审批人，需要流程类型Id，当前登录的用户的Id，以及执行人的信息
	 * @param typeId
	 * @param executor
	 * @param request
	 * @return
	 */
	@RequestMapping("addExecute.do")
	public String addExecute(String typeId, UserInfo executor, HttpServletRequest request){
		try{
			return myProcessService.addTask(typeId, getUser(request), executor, ProcessConstant.USER_TASK);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	
	/**
	 * 添加抄送人，与添加审批人相同，但是在调用service时，使用了不同的参数传入service层
	 * @param typeId
	 * @param executor
	 * @param request
	 * @return
	 */
	@RequestMapping("addCopyTo.do")
	public String addCopyTo(String typeId, UserInfo executor, HttpServletRequest request){
		try{
			return myProcessService.addTask(typeId, getUser(request), executor, ProcessConstant.COPY_TO_TASK);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	
	
	/**
	 * 删除审批人，需要taskId即可
	 * @param task
	 * @return
	 */
	@RequestMapping("deleteExecute.do")
	public String deleteExecute(TaskModel task){
		try{
			myProcessService.deleteTask(task, ProcessConstant.USER_TASK);
			return Constant.SUCCESS_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	
	
	/**
	 * 删除抄送人，需要的参数为
	 * @param task
	 * @return
	 */
	@RequestMapping("deleteCopyTo.do")
	public String deleteCopyTo(TaskModel task){
		try{
			myProcessService.deleteTask(task, ProcessConstant.COPY_TO_TASK);
			return Constant.SUCCESS_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	
	@RequestMapping("startProcess.do")
	public String startProcess(HttpServletRequest request){
		try{
			myProcessService.startProcess(request, getUser(request));
			return Constant.SUCCESS_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@RequestMapping("getExamineIdea.do")
	public String getExamineIdea(String processRecordId){
		try{
			Gson gson = new Gson();
			return gson.toJson(myProcessService.getExamineIdea(processRecordId));
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@RequestMapping("getCopyToProcessList.do")
	public String getCopyToProcessList(GetMyRelatedProcessForm getMyRelatedProcessForm, HttpServletRequest request){
		try{
			Gson gson = new Gson();
			getMyRelatedProcessForm.setUserId(getUser(request).getUserId());
			return gson.toJson(myProcessService.getCopyToProcessList(getMyRelatedProcessForm));
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@RequestMapping("getWaitExamineProcess.do")
	public String getWaitExamineProcess(GetMyRelatedProcessForm getMyRelatedProcessForm, HttpServletRequest request){
		try{
			Gson gson = new Gson();
			getMyRelatedProcessForm.setUserId(getUser(request).getUserId());
			return gson.toJson(myProcessService.getWaitExamineProcess(getMyRelatedProcessForm));
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@RequestMapping("examineTask.do")
	public String examineTask(TaskModel taskModel){
		try{
			myProcessService.examineTask(taskModel);
			return Constant.SUCCESS_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
}
