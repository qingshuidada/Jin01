package com.mdoa.processManage.dao;

import java.util.List;

import javax.annotation.Resource;
import com.mdoa.processManage.model.ProcessMessage;
import com.mdoa.processManage.po.GetMyRelatedProcessForm;
import com.zhou.myProcess.instance.Process;;

@Resource
public interface MyRelatedProcessDao {
	
	List<ProcessMessage> getProcessList(GetMyRelatedProcessForm getMyRelatedProcessForm);

	/**
	 * 根据流程记录Id获取流程的信息
	 * @param processRecordId
	 */
	Process getProcessFormMessage(String processRecordId);
}
