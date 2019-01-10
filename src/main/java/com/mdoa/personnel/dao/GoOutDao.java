package com.mdoa.personnel.dao;

import java.util.List;

import com.mdoa.personnel.bo.GoOutApplyForm;
import com.mdoa.personnel.bo.GoOutExamineForm;
import com.mdoa.personnel.bo.GoOutStreamForm;
import com.mdoa.personnel.model.GoOutApply;
import com.mdoa.personnel.model.GoOutStream;


public interface GoOutDao {
	
	/**
	 * 获得uuid
	 */
	String getuuid();
	
	/**
	 * 插入外出申请
	 * @param goOutApplyForm
	 * @return
	 */
	boolean insertGoOutApply(GoOutApplyForm goOutApplyForm);
	
	/**
	 * 插入外出审批流程
	 * @param goOutApplyForm
	 * @return
	 */
	boolean insertGoOutStream(GoOutApplyForm goOutApplyForm);
	boolean AddGoOutStream(GoOutExamineForm examineForm);
	/**
	 * 条件查询外出申请信息
	 * @param goOutApplyForm
	 * @return
	 */
	List<GoOutApply> findApplyByCondition(GoOutApplyForm goOutApplyForm);
	/**
	 * 条件查询备案外出流程
	 * @param goOutApplyForm
	 * @return
	 */
	List<GoOutStreamForm> findStream(GoOutApplyForm goOutApplyForm);
	/**
	 * 条件查询外出流程
	 * @param goOutApplyForm
	 * @return
	 */
	List<GoOutStreamForm> findStreamByCondition(GoOutApplyForm goOutApplyForm);
	
	/**
	 * 更新外出流程
	 * @param goOutExamineForm
	 * @return
	 */
	boolean updateGoOutStream(GoOutExamineForm goOutExamineForm);
	
	/**
	 * 插入外出备案流程
	 * @param goOutExamineForm
	 * @return
	 */
	boolean insertRecordGoOutStream(GoOutExamineForm goOutExamineForm);
	
	/**
	 * 驳回外出申请
	 * @param goOutExamineForm
	 * @return
	 */
	boolean rejectGoOutApply(GoOutExamineForm goOutExamineForm);
	
	/**
	 * 备案外出流程
	 * @param goOutExamineForm
	 * @return
	 */
	boolean recordGoOutStream(GoOutExamineForm goOutExamineForm);
	
	/**
	 * 备案外出申请
	 * @param goOutExamineForm
	 * @return
	 */
	boolean recordGoOutApply(GoOutExamineForm goOutExamineForm);
	
	/**
	 * 撤回外出流程
	 * @param goOutExamineForm
	 * @return
	 */
	boolean withdrawGoOutStream(GoOutExamineForm goOutExamineForm);
	
	/**
	 * 撤回外出申请
	 * @param goOutExamineForm
	 * @return
	 */
	boolean withdrawGoOutApply(GoOutExamineForm goOutExamineForm);
	/**
	 * 确认员工已经返回
	 * @param goOutExamineForm
	 * @return
	 */
	boolean confirmUserBack(GoOutExamineForm goOutExamineForm);
}
