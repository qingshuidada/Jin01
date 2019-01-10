package com.mdoa.repertory.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.base.model.PageModel;
import com.mdoa.base.service.BaseService;
import com.mdoa.repertory.bo.UseTypeForm;
import com.mdoa.repertory.dao.UseTypeDao;
import com.mdoa.repertory.model.RepertoryGoods;
import com.mdoa.repertory.model.RepertoryUseType;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.StringUtil;

@Service
public class UseTypeService extends BaseService{
	
	@Autowired
	private UseTypeDao useTypeDao;
	
	/**
	 * 插入用途
	 * @param useTypeForm
	 * @param request
	 */
	public void insertUseType(UseTypeForm useTypeForm, HttpServletRequest request) {
		UserInfo userInfo = getUser(request);
		useTypeForm.setCreateUserId(userInfo.getUserId());
		useTypeForm.setCreateUserName(userInfo.getUserName());
		if(!useTypeDao.insertUseType(useTypeForm))
			throw new RuntimeException("插入物品领用用途失败");
	}
	
	/**
	 * 删除用途
	 * @param useTypeForm
	 * @param request
	 */
	public void deleteUseType(UseTypeForm useTypeForm, HttpServletRequest request) {
		UserInfo userInfo = getUser(request);
		useTypeForm.setUpdateUserId(userInfo.getUserId());
		useTypeForm.setUpdateUserName(userInfo.getUserName());
		if(!useTypeDao.deleteUseType(useTypeForm))
			throw new RuntimeException("删除物品领用用途失败");
		
	}
	
	/**
	 * 修改用途名称
	 * @param useTypeForm
	 * @param request
	 */
	public void updateUseTypeName(UseTypeForm useTypeForm, HttpServletRequest request) {
		UserInfo userInfo = getUser(request);
		useTypeForm.setUpdateUserId(userInfo.getUserId());
		useTypeForm.setUpdateUserName(userInfo.getUserName());
		if(!useTypeDao.updateUseTypeName(useTypeForm))
			throw new RuntimeException("修改物品领用用途名称失败");
	}
	
	/**
	 * 查询用途
	 * @param useTypeForm
	 * @return
	 */
	public PageModel<RepertoryUseType> findUseType(UseTypeForm useTypeForm) {
		if(!StringUtil.isEmpty(useTypeForm.getUseTypeName())){
			useTypeForm.setUserName(StringUtil.toLikeRight(useTypeForm.getUseTypeName()));;
		}
		PageHelper.startPage(useTypeForm.getPage(), useTypeForm.getRows());
		List<RepertoryUseType> list = useTypeDao.findUseType(useTypeForm);
		PageModel<RepertoryUseType> pageModel = new PageModel((Page)list);
		return pageModel;
	}
	
	
}
