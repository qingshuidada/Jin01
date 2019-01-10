package com.mdoa.qywx.dao;

import java.util.List;

import com.mdoa.qywx.bo.CheckAccountForm;
import com.mdoa.qywx.bo.QywxForm;
import com.zhou.myProcess.instance.TaskModel;

public interface QywxDao {
	
	/**
	 * 验证绑定信息的正确性
	 * @param qywxForm
	 * @return
	 */
	List<CheckAccountForm> checkAccountStatus(QywxForm qywxForm);
	
	/**
	 * 绑定OA账号
	 * @param qywxForm
	 * @return
	 */
	boolean bindOaAccount(QywxForm qywxForm);
	
	/**
	 * 检测微信是否已绑定账号
	 * @param userId
	 * @return
	 */
	List<CheckAccountForm> checkBind(String qywxUserId);
	
	/**
	 * qywxUserId获取账号密码
	 * @param qywxUserId
	 * @return
	 */
	List<QywxForm> getAccount(String qywxUserId);
	
	/**
	 * userId查询qywxUserId
	 * @param userId
	 * @return
	 */
	List<QywxForm> getQywxUserId(String userId);
	
	/**
	 * 解除绑定OA账号
	 * @param qywxUserId
	 */
	boolean unBindOaAccount(QywxForm qywxForm);
	
	/**
	 * 获取抄送任务
	 * @param processId
	 * @return
	 */
	List<TaskModel> getCopyTask(String processId);
	
	/**
	 * 获取第一个审核任务
	 * @param taskId
	 * @return
	 */
	List<TaskModel> getFirstTask(String taskId);
	
	/**
	 * 检测微信是否已绑定账号
	 * @param qywxUserId
	 * @return
	 */
	List<CheckAccountForm> checkErpBind(String qywxUserId);
	
}
