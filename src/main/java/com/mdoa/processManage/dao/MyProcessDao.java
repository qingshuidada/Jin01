package com.mdoa.processManage.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.mdoa.processManage.model.ProcessMessage;
import com.mdoa.processManage.model.TaskRecord;
import com.mdoa.processManage.po.GetMyRelatedProcessForm;
import com.zhou.myProcess.instance.TaskModel;

@Resource
public interface MyProcessDao {
	
	List<TaskModel> getProcessTask(Map<String, String> params);
	
	List<TaskModel> getProcessCopyToTask(Map<String, String> params);
	
	List<TaskModel> getProcessMustTask(Map<String, String> params);
	
	List<TaskModel> getProcessMustCopyToTask(Map<String, String> params);
	
	List<TaskModel> getProcessRecordTask(Map<String, String> params);
	
	List<TaskModel> getProcessRecordCopyToTask(Map<String, String> params);
	
	List<TaskRecord> getExamineIdea(String processRecordId);
	
	List<ProcessMessage> getCopyToProcessList(GetMyRelatedProcessForm getMyRelatedProcessForm);
	
	List<ProcessMessage> getWaitExamineProcess(GetMyRelatedProcessForm getMyRelatedProcessForm);
	
}
