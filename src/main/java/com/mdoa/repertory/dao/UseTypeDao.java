package com.mdoa.repertory.dao;

import java.util.List;

import com.mdoa.repertory.bo.UseTypeForm;
import com.mdoa.repertory.model.RepertoryUseType;

public interface UseTypeDao {
	
	/**
	 * 插入用途
	 * @param useTypeForm
	 * @return
	 */
	boolean insertUseType(UseTypeForm useTypeForm);

	/**
	 * 删除用途
	 * @param useTypeForm
	 * @return
	 */
	boolean deleteUseType(UseTypeForm useTypeForm);

	/**
	 * 修改用途名称
	 * @param useTypeForm
	 * @return
	 */
	boolean updateUseTypeName(UseTypeForm useTypeForm);
	
	/**
	 * 查询用途
	 * @param useTypeForm
	 * @return
	 */
	List<RepertoryUseType> findUseType(UseTypeForm useTypeForm);
}
