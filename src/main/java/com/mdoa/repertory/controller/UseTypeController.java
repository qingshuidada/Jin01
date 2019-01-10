package com.mdoa.repertory.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.repertory.bo.UseTypeForm;
import com.mdoa.repertory.model.RepertoryUseType;
import com.mdoa.repertory.service.UseTypeService;

@RestController
@RequestMapping("/useType")
public class UseTypeController {
	
	@Autowired
	private UseTypeService useTypeService;
	
	/**
	 * 插入用途
	 * @param useTypeForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/insertUseType.do")
	public String insertUseType(UseTypeForm useTypeForm,HttpServletRequest request){
		try {
			useTypeService.insertUseType(useTypeForm,request);
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
	 * 删除用途
	 * @param useTypeForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/deleteUseType.do")
	public String deleteUseType(UseTypeForm useTypeForm,HttpServletRequest request){
		try {
			useTypeService.deleteUseType(useTypeForm,request);
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
	 * 修改用途名称
	 * @param useTypeForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/updateUseTypeName.do")
	public String updateUseTypeName(UseTypeForm useTypeForm,HttpServletRequest request){
		try {
			useTypeService.updateUseTypeName(useTypeForm,request);
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
	 * 查询用途
	 * @param useTypeForm
	 * @return
	 */
	@RequestMapping("/findUseType.do")
	public String findUseType(UseTypeForm useTypeForm){
		try {
			PageModel<RepertoryUseType> useTypes = useTypeService.findUseType(useTypeForm);
			Gson gson = new Gson();
			return gson.toJson(useTypes);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
}
