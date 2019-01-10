package com.mdoa.system.dao;

import java.util.List;

import com.mdoa.system.bo.PortalForm;
import com.mdoa.system.model.PortalInfo;

public interface PortalDao {
	
	/**
	 * 插入门户信息、草稿
	 * @param portalForm
	 * @return
	 */
	boolean insertPortalInfo(PortalForm portalForm);
	
	/**
	 * 删除门户信息、草稿
	 * @param portalForm
	 * @return
	 */
	boolean deletePortalInfo(PortalForm portalForm);
	
	/**
	 * 更新草稿信息
	 * @param portalForm
	 * @return
	 */
	boolean updatePortalDraft(PortalForm portalForm);
	
	/**
	 * 查询
	 * @param portalForm
	 * @return
	 */
	List<PortalInfo> findPortalByCondition(PortalForm portalForm);
	
}
