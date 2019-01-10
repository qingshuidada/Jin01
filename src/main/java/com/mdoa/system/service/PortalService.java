package com.mdoa.system.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mdoa.base.service.BaseService;
import com.mdoa.system.bo.PortalForm;
import com.mdoa.system.dao.PortalDao;
import com.mdoa.system.model.PortalInfo;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.StringUtil;

@Service
public class PortalService extends BaseService{
	
	@Autowired
	private PortalDao portalDao;
	
	/**
	 * 插入门户信息
	 * @param request
	 * @param portalForm
	 */
	public void insertPortalInfo(HttpServletRequest request, PortalForm portalForm) {
		UserInfo userInfo = getUser(request);
		portalForm.setCreateUserId(userInfo.getUserId());
		portalForm.setCreateUserName(userInfo.getUserName());
		if(!portalDao.insertPortalInfo(portalForm))
			throw new RuntimeException("插入门户信息、草稿失败");	
	}
	
	/**
	 * 删除
	 * @param request
	 * @param portalForm
	 */
	public void deletePortalInfo(HttpServletRequest request, PortalForm portalForm) {
		UserInfo userInfo = getUser(request);
		portalForm.setUpdateUserId(userInfo.getUserId());
		portalForm.setUpdateUserName(userInfo.getUserName());
		if(!portalDao.deletePortalInfo(portalForm))
			throw new RuntimeException("删除门户信息、草稿失败");
		
	}
	
	/**
	 * 更新
	 * @param request
	 * @param portalForm
	 */
	public void updatePortalDraft(HttpServletRequest request, PortalForm portalForm) {
		UserInfo userInfo = getUser(request);
		portalForm.setUpdateUserId(userInfo.getUserId());
		portalForm.setUpdateUserName(userInfo.getUserName());
		if(!portalDao.updatePortalDraft(portalForm))
			throw new RuntimeException("更新草稿失败");
		
	}
	
	/**
	 * 查询
	 * @param request
	 * @param portalForm
	 * @return
	 */
	public List<PortalInfo> findPortalByCondition(HttpServletRequest request, PortalForm portalForm) {
		UserInfo userInfo = getUser(request);
		portalForm.setCreateUserId(userInfo.getUserId());
		portalForm.setCreateUserName(StringUtil.toLikeRight(userInfo.getUserName()));
		List<PortalInfo> portalInfos = portalDao.findPortalByCondition(portalForm);
		return portalInfos;
	}
	
	
}
