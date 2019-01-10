package com.mdoa.processManage.service;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.google.gson.Gson;
import com.mdoa.base.model.PageModel;
import com.mdoa.processManage.dao.MyProcessDao;
import com.mdoa.processManage.model.ProcessMessage;
import com.mdoa.processManage.model.TaskRecord;
import com.mdoa.processManage.po.GetMyRelatedProcessForm;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.StringUtil;
import com.zhou.myProcess.instance.Process;
import com.zhou.myProcess.instance.ProcessModel;
import com.zhou.myProcess.instance.TaskModel;
import com.zhou.myProcess.process.ProcessEngine;

@Service
public class MyProcessService {
	
	@Autowired
	private MyProcessDao myProcessDao;
	
	@Autowired
	private ProcessEngine processEngine;
	
	public Map<String, Process> getProcesses(){
		return processEngine.getProcessMessage();
	}
	
	public ProcessMessage getProcessMessage(Map<String, String> params, boolean isRecord){
		ProcessMessage message = new ProcessMessage();
		if(isRecord){
			message.setExcuteUserHead(myProcessDao.getProcessRecordTask(params));
			message.setCopyToUsers(myProcessDao.getProcessRecordCopyToTask(params));
		}else{
			message.setTypeId(params.get("typeId"));
			message.setUserId(params.get("userId"));
			message.setExcuteUserHead(myProcessDao.getProcessTask(params));
			message.setCopyToUsers(myProcessDao.getProcessCopyToTask(params));
			message.setMustExcuteUserHead(myProcessDao.getProcessMustTask(params));
			message.setMustCopyToUsers(myProcessDao.getProcessMustCopyToTask(params));
		}
		return message;
	}
	
	public String addTask(String typeId, UserInfo user, UserInfo executor,  String taskType) throws Exception{
		TaskModel task = new TaskModel();
		task.setExecutorId(executor.getUserId());
		task.setExecutorName(executor.getUserName());
		ProcessModel process = new ProcessModel();
		process.setUserId(user.getUserId());
		process.setProcessTypeId(typeId);
		return processEngine.getProcessService().addTask(task, process, taskType);
	}
	
	public String deleteTask(TaskModel task, String taskType) throws Exception{
		processEngine.getProcessService().deleteTask(task, taskType);
		return "删除成功";
	}
	
	public void startProcess(HttpServletRequest request, UserInfo user) throws Exception{
		Enumeration<String> enu = request.getParameterNames();
		Map<String, String> param = new HashMap<String, String>();
		while(enu.hasMoreElements()){
			String name = enu.nextElement();
			param.put(name, request.getParameter(name));
		}
		Gson gson = new Gson();
		String json = gson.toJson(param);
		ProcessModel process = new ProcessModel();
		process.setJsonData(json);
		process.setUserId(user.getUserId());
		process.setTitle(param.get("title"));
		process.setProcessTypeId(param.get("typeId"));
		processEngine.getProcessService().startProcess(process);
	}
	
	public List<TaskRecord> getExamineIdea(String processRecordId){
		List<TaskRecord> tasks = myProcessDao.getExamineIdea(processRecordId);
		return tasks;
	}
	
	public PageModel<ProcessMessage> getCopyToProcessList(GetMyRelatedProcessForm getMyRelatedProcessForm){
		getMyRelatedProcessForm.setCreateUserName(
				StringUtil.toLikeAll(getMyRelatedProcessForm.getCreateUserName()));
		Map<String, Process> processMap = processEngine.getProcessMessage();
		PageHelper.startPage(getMyRelatedProcessForm.getPage(), getMyRelatedProcessForm.getRows());
		List<ProcessMessage> processes = myProcessDao.getCopyToProcessList(getMyRelatedProcessForm);
		//处理显示的内容，将类型转为文字，并判断能够进行撤回
		for(ProcessMessage process : processes){
			process.setProcessTypeName(processMap.get(process.getProcessTypeId()).getName());
		}
		PageModel<ProcessMessage> pageModel = new PageModel<ProcessMessage>((Page<ProcessMessage>)processes);
		return pageModel;
	}
	
	
	public PageModel<ProcessMessage> getWaitExamineProcess(GetMyRelatedProcessForm getMyRelatedProcessForm){
		getMyRelatedProcessForm.setCreateUserName(
				StringUtil.toLikeAll(getMyRelatedProcessForm.getCreateUserName()));
		Map<String, Process> processMap = processEngine.getProcessMessage();
		PageHelper.startPage(getMyRelatedProcessForm.getPage(), getMyRelatedProcessForm.getRows());
		List<ProcessMessage> processes = myProcessDao.getWaitExamineProcess(getMyRelatedProcessForm);
		//处理显示的内容，将类型转为文字，并判断能够进行撤回
		for(ProcessMessage process : processes){
			process.setProcessTypeName(processMap.get(process.getProcessTypeId()).getName());
		}
		PageModel<ProcessMessage> pageModel = new PageModel<ProcessMessage>((Page<ProcessMessage>)processes);
		return pageModel;
	}
	
	public void examineTask(TaskModel taskModel) throws Exception{
		processEngine.getProcessService().excuteTask(taskModel);
	}
}
