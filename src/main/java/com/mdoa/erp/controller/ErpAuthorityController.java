package com.mdoa.erp.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.erp.bo.ErpAuthorityForm;
import com.mdoa.erp.service.ErpAuthorityService;

/**
 * erp查询权限
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/authority")
public class ErpAuthorityController extends BaseController{
    
    @Autowired
    private ErpAuthorityService erpAuthorityService;
    
    /**
     * 添加erp查询权限
     * @param erpAuthorityForm
     * @param httpServletRequest
     * @param response
     * @return
     */
    @RequestMapping("/insertAuthority.erp")
    public String insertAuthority(ErpAuthorityForm erpAuthorityForm, HttpServletRequest httpServletRequest, HttpServletResponse response){
	try {
	    erpAuthorityService.insertAuthority(erpAuthorityForm);
	    return Constant.SUCCESS_CODE;
	} catch (RuntimeException e) {
	    e.printStackTrace();
	    return Constant.DATA_ERROR_CODE;
	} catch (Exception e) {
	    e.printStackTrace();
	    return Constant.SERVER_ERROR_CODE;
	}
    }
    
    /**
     * 删除erp查询权限
     * @param erpAuthorityForm
     * @param httpServletRequest
     * @param response
     * @return
     */
    @RequestMapping("/deleteAuthority.erp")
    public String deleteAuthority(ErpAuthorityForm erpAuthorityForm, HttpServletRequest httpServletRequest, HttpServletResponse response){
	try {
	    erpAuthorityService.deleteAuthority(erpAuthorityForm);
	    return Constant.SUCCESS_CODE;
	} catch (RuntimeException e) {
	    e.printStackTrace();
	    return Constant.DATA_ERROR_CODE;
	} catch (Exception e) {
	    e.printStackTrace();
	    return Constant.SERVER_ERROR_CODE;
	}
    }
    
    /**
     * 查询erp查询权限人员
     * @param erpAuthorityForm
     * @param httpServletRequest
     * @param response
     * @return
     */
    @RequestMapping("queryAuthorityPerson.erp")
    public String queryAuthorityPerson(ErpAuthorityForm erpAuthorityForm, HttpServletRequest httpServletRequest, HttpServletResponse response){
	try {
	    PageModel<ErpAuthorityForm> pageModel= erpAuthorityService.queryAuthorityPerson(erpAuthorityForm);
	    Gson gson = new Gson();
	    return gson.toJson(pageModel);
	} catch (Exception e) {
	    e.printStackTrace();
	    return Constant.SERVER_ERROR_CODE;
	}
    }
    
    /**
     * 查询erp查询权限
     * @param erpAuthorityForm
     * @param httpServletRequest
     * @param response
     * @return
     */
    @RequestMapping("queryAuthorityByUser.erp")
    public String queryAuthorityByUser(ErpAuthorityForm erpAuthorityForm, HttpServletRequest httpServletRequest, HttpServletResponse response){
	try {
	    PageModel<ErpAuthorityForm> pageModel= erpAuthorityService.queryAuthorityByUser(erpAuthorityForm);
	    Gson gson = new Gson();
	    return gson.toJson(pageModel);
	} catch (Exception e) {
	    e.printStackTrace();
	    return Constant.SERVER_ERROR_CODE;
	}
    }
}
