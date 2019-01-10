package com.mdoa.system.dao;
/**
 * 系统信息
 */
import java.util.List;

import com.mdoa.system.bo.UrgeProcessForm;
import com.mdoa.system.model.UserSystemMessage;
import com.zhou.myProcess.instance.ProcessModel;
import com.zhou.myProcess.instance.TaskModel;

public interface MessageDao {

	/**
	 * 增加一条系统信息
	 * @param userSystemMessage
	 * @return
	 */
	boolean addSystemMessage(UserSystemMessage userSystemMessage);
	/**
	 * 更改消息为已读
	 * @param userSystemMessage
	 * @return
	 */
	boolean updateMessageRead(UserSystemMessage userSystemMessage);
	/**
	 * 查询消息
	 * @param userSystemMessage
	 * @return
	 */
	List<UserSystemMessage> selectMessageByUser(UserSystemMessage userSystemMessage);
	/**
	 * 查询有权限的人员
	 * @param userSystemMessage
	 * @return
	 */
	List<UserSystemMessage> selectpermissionUser(String permission);
	/**
	 * 查询抄送人信息
	 * @param processRecordId
	 * @return
	 */
	List<TaskModel> queryCopyMessage(String processRecordId);
	/**
	 * 获得第一执行者的ID
	 * @param taskId
	 * @return
	 */
	TaskModel getFirstTaskId(String taskId);
	
	/**
	 * 插入一条催办消息
	 * @param urgeProcessForm
	 * @return
	 */
	boolean insertUrgeProcessMessage(UrgeProcessForm urgeProcessForm);
	ProcessModel getFormUrl(String processRecordId);
}
