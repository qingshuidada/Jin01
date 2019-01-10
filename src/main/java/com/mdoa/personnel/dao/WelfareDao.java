package com.mdoa.personnel.dao;

import java.util.Date;
import java.util.List;

import com.mdoa.personnel.bo.BirthForm;
import com.mdoa.personnel.bo.WelfareApplyExamineForm;
import com.mdoa.personnel.bo.WelfareApplyForm;
import com.mdoa.personnel.bo.WelfareObjForm;
import com.mdoa.personnel.bo.ProcessWelfareForm;
import com.mdoa.personnel.bo.WelfareRecordForm;
import com.mdoa.personnel.bo.WelfareStreamForm;
import com.mdoa.personnel.model.Welfare;
import com.mdoa.personnel.model.WelfareObj;
import com.mdoa.personnel.model.WelfareRecord;
import com.mdoa.user.model.UserInfo;

public interface WelfareDao {

	/**
	 * 获取uuid
	 */
	String getuuid();
	
	/**
	 * 查询所有福利名称
	 */
	List<WelfareApplyForm> queryWelfareNameAll(WelfareApplyForm welfareApplyForm);
	
	/**
	 * 添加福利记录
	 * @param list
	 */
	boolean addWelfareRecord(List<WelfareApplyForm> list);
	
	/**
	 * 查询人员信息
	 * @param userInfo
	 * @return
	 */
	List<WelfareApplyForm> queryPersonMessage(WelfareApplyForm welfareApplyForm);
	
	/**
	 * 通过生日查询员工信息
	 * 
	 * @param params
	 * @return
	 */
	List<UserInfo> findUserInfoByBirth(BirthForm birthForm);

	/**
	 * 插入福利信息
	 * 
	 * @param welfareApplyForm
	 * @return
	 */
	boolean insertWelfare(WelfareApplyForm welfareApplyForm);

	/**
	 * 插入福利流程信息
	 * 
	 * @param welfareApplyForm
	 * @return
	 */
	boolean insertWelfareStream(WelfareApplyForm welfareApplyForm);

	/**
	 * 插入福利对象信息
	 * 
	 * @param welfareApplyForm
	 * @return
	 */
	//boolean insertRetireWelfareObj(WelfareApplyForm welfareApplyForm);
	
	/**
	 * 批量插入福利对象信息
	 * @param objForms
	 * @return
	 */
	//int insertWelfareObjByBatch(List<WelfareObjForm> objForms);
	
	/**
	 * 撤回福利申请流程
	 * 
	 * @param welfareApplyExamineForm
	 * @return
	 */
	boolean withdrawWelfareStream(WelfareApplyExamineForm welfareApplyExamineForm);
	
	/**
	 * 更新福利信息
	 * 
	 * @param welfareApplyExamineForm
	 * @return
	 */
	boolean updateWelfare(WelfareApplyExamineForm welfareApplyExamineForm);

	
	/**
	 * 更新福利流程信息
	 * 
	 * @param welfareApplyExamineForm
	 * @return
	 */
	boolean updateWelfareStream(WelfareApplyExamineForm welfareApplyExamineForm);

	/**
	 * 插入备案流程信息
	 * 
	 * @param welfareApplyExamineForm
	 * @return
	 */
	boolean insertRecordWelfareStream(WelfareApplyExamineForm welfareApplyExamineForm);
	
	/**
	 * 通过福利id查询福利发放时间
	 * @param welfareId
	 * @return
	 */
	Date findGiveTimeByWelfareId(String welfareId);
	
	/**
	 * 通过福利id查询福利对象
	 * @param welfareId
	 * @return
	 */
	//List<WelfareObjForm> findWelfareObjByWelfareId(String welfareId);
	
	/**
	 * 批量插入福利发放记录
	 * @param recordList
	 * @return
	 */
	int insertRecordByBatch(List<WelfareRecordForm> records);

	/**
	 * 条件查询福利记录
	 * @param welfareRecordForm
	 * @return
	 */
	List<WelfareRecordForm> findRecordByCondition(WelfareRecordForm welfareRecordForm);
	
	/**
	 * 员工领取福利后福利记录表的更新
	 * @param welfareRecordForm
	 * @return
	 */
	boolean updateRecordForGet(WelfareRecordForm welfareRecordForm);
	
	/**
	 * 查询福利流程
	 * @param welfareApplyForm
	 * @return
	 */
	List<WelfareStreamForm> findStreamByCondition(WelfareApplyForm welfareApplyForm);
	
	/**
	 * 查询福利
	 * @param welfareApplyForm
	 * @return
	 */
	List<Welfare> findWelfareByCondition(WelfareApplyForm welfareApplyForm);
	/**
	 * 删除福利记录
	 * @param welfareApplyForm
	 * @return
	 */
	boolean deleteRecordForGet(WelfareApplyForm welfareApplyForm);
	/**
	 * 修改福利信息(计划中→申请中)
	 * @param welfareApplyForm
	 * @return
	 */
	boolean updateWelfareStatus(WelfareApplyForm welfareApplyForm);
	/**
	 * 修改福利记录
	 * @param welfareApplyExamineForm
	 * @return
	 */
	boolean updateWelfareRecord(WelfareApplyExamineForm welfareApplyExamineForm);
	/**
	 * 修改福利
	 * @param welfareApplyForm
	 * @return
	 */
	boolean updateWelfareo(WelfareApplyForm welfareApplyForm);
	/**
	 * 只修改人数和金额
	 * @param welfareApplyForm
	 * @return
	 */
	boolean updateWelfareOnly(WelfareApplyForm welfareApplyForm);	
	
	/**
	 * 查询福利对象
	 * @param welfareObjForm
	 * @return
	 */
	//List<WelfareObj> findObjByCondition(WelfareObjForm welfareObjForm);
	
	
}
