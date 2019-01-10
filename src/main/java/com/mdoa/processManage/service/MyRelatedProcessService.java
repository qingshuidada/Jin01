package com.mdoa.processManage.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.base.model.PageModel;
import com.mdoa.base.service.BaseService;
import com.mdoa.processManage.dao.MyRelatedProcessDao;
import com.mdoa.processManage.model.ProcessMessage;
import com.mdoa.processManage.po.GetMyRelatedProcessForm;
import com.mdoa.util.StringUtil;
import com.zhou.myProcess.instance.ProcessModel;
import com.zhou.myProcess.instance.Process;
import com.zhou.myProcess.process.ProcessEngine;

@Service
public class MyRelatedProcessService extends BaseService{
	@Autowired
	private MyRelatedProcessDao myRelatedProcessDao;
	
	@Autowired
	private ProcessEngine processEngine;
	
	public PageModel<ProcessMessage> getProcessList(GetMyRelatedProcessForm getMyRelatedProcessForm){
		getMyRelatedProcessForm.setCreateUserName(
				StringUtil.toLikeAll(getMyRelatedProcessForm.getCreateUserName()));
		Map<String, Process> processMap = processEngine.getProcessMessage();
		PageHelper.startPage(getMyRelatedProcessForm.getPage(), getMyRelatedProcessForm.getRows());
		List<ProcessMessage> processes = myRelatedProcessDao.getProcessList(getMyRelatedProcessForm);
		//处理显示的内容，将类型转为文字，并判断能够进行撤回
		for(ProcessMessage process : processes){
			process.canCallBack(getMyRelatedProcessForm.getUserId());
			process.setProcessTypeName(processMap.get(process.getProcessTypeId()).getName());
		}
		PageModel<ProcessMessage> pageModel = new PageModel<ProcessMessage>((Page<ProcessMessage>)processes);
		return pageModel;
	}
	
	public void callBackProcess(String processRecordId) throws Exception{
		ProcessModel process = new ProcessModel();
		process.setProcessRecordId(processRecordId);
		processEngine.getProcessService().withdrawProcess(process);
	}
	
	public String getProcessFormMessage(String processRecordId){
		Process process = myRelatedProcessDao.getProcessFormMessage(processRecordId);
		return process.getJsonData();
	}
}
