package com.mdoa.personnel.dao;

import java.util.List;

import com.mdoa.personnel.model.Dimission;
import com.mdoa.user.bo.DimissionForm;

public interface DimissionDao {
	
	/**
	 * 获取员工的离职记录列表信息
	 * @param userInfo
	 * @return
	 */
	List<Dimission> getDimissionList(Dimission dimission);
	
	/**
	 * 添加员工的离职记录
	 * @param dimission
	 * @return
	 */
	boolean addDimissionRecord(Dimission dimission);
	
	/**
	 * 员工离职申请通过后添加员工的离职记录
	 * @param dimission
	 * @return
	 */
	boolean insertDimissionRecord(DimissionForm dimissionForm);
	
	/**
	 * 删除离职记录
	 */
	boolean deleteDimissionRecord(String userId);
	
	/**
	 * 验证是否有在职的该身份证号员工
	 */
	Integer checkOnJobUser(String userId);
	/**
	 * 查询一个员工最近离职的时间
	 * @param idCard
	 * @return
	 */
	Dimission selectUserMaxDimissionTime(String idCard);
}
