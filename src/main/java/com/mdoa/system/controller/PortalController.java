package com.mdoa.system.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.constant.Constant;
import com.mdoa.system.bo.PortalForm;
import com.mdoa.system.model.PortalInfo;
import com.mdoa.system.service.PortalService;

@RestController
@RequestMapping("/portal")
public class PortalController extends BaseController{

	@Autowired
	private PortalService portalService;
	
	/**
	 * 发布门户信息
	 * @param request
	 * @param portalForm
	 * @return
	 */
	@RequestMapping("/insertPortalInfo.do")
	public String publishPortalInfo(HttpServletRequest request,PortalForm portalForm){
		try {
			portalService.insertPortalInfo(request,portalForm);
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 删除信息
	 * @param request
	 * @param portalForm
	 * @return
	 */
	public String deletePortalInfo(HttpServletRequest request,PortalForm portalForm){
		try {
			portalService.deletePortalInfo(request,portalForm);
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 更改信息
	 * @param request
	 * @param portalForm
	 * @return
	 */
	public String updatePortalDraft(HttpServletRequest request,PortalForm portalForm){
		try {
			portalService.updatePortalDraft(request,portalForm);
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询信息
	 */
	public String findPortalByCondition(HttpServletRequest request,PortalForm portalForm){
		try {
			List<PortalInfo> portalInfos = portalService.findPortalByCondition(request,portalForm);
			Gson gson = new Gson();
			return gson.toJson(portalInfos);
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
}
