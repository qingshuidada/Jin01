package com.mdoa.personnel.controller;


import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.constant.FileConstant;
import com.mdoa.personnel.model.Dimission;
import com.mdoa.personnel.service.DimissionService;
import com.mdoa.security.annotation.HasPermissions;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.FileUtil;

@RestController
@RequestMapping("dimission")
public class DimissionController {
	
	@Autowired
	private DimissionService dimissionService;
	
	@RequestMapping("writeDimissionToExcel.do")
	public String writeDimissionToExcel(Dimission dimission,String jsonString,HttpServletRequest request,HttpServletResponse response) {
		try {
			String filePath = FileConstant.FILE_PATH + FileConstant.SHORT_TIME_EXCEL + "/" +new Date().getTime() + ".xls";
			dimissionService.writeDimissionToExcel(dimission, jsonString, filePath);
			FileUtil.download(request, response, filePath, new Date().getTime()+".xls");
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
		    e.printStackTrace();
		    return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
		    e.printStackTrace();
		    return Constant.SERVER_ERROR_CODE;
		}
	}
	
	
	/**
	 * 获取员工的离职记录列表信息
	 * @param userInfo
	 * @return
	 */
	@RequestMapping("getDimissionList.do")
	public String getDimissionList(Dimission dimission){
		try{
			PageModel<Dimission> pageModel = dimissionService.getDimissionList(dimission);
			Gson gson = new Gson();
			return gson.toJson(pageModel);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 获取员工最近离职的时间
	 * @param idCard
	 * @return
	 */
	@RequestMapping("selectUserMaxDimissionTime.do")
	public String selectUserMaxDimissionTime(String idCard){
		try{
			Dimission dimission = dimissionService.selectUserMaxDimissionTime(idCard);
			Gson gson = new Gson();
			return gson.toJson(dimission);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 添加员工的离职记录
	 * @param dimission
	 * @return
	 */
	@RequestMapping("addDimissionRecord.do")
	public String addDimissionRecord(Dimission dimission, HttpServletRequest request){
		try{
			dimissionService.addDimissionRecord(dimission, request);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 添加员工的离职记录,离职有手续 
	 * @param dimission
	 * @return
	 */
	@RequestMapping("fireUserFinish.do")
	public String fireUserFinish(Dimission dimission, HttpServletRequest request){
		try{
			dimissionService.fireUserFinish(dimission, request);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 非正常离职员工
	 * @param dimission
	 * @param request
	 * @return
	 */
	@RequestMapping("improperFireUser.do")
	public String improperFireUser(Dimission dimission, HttpServletRequest request){
		try{
			dimissionService.improperFireUser(dimission, request);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	
	
	/**
	 * 添加员工的离职记录
	 * @param dimission
	 * @return
	 */
	@RequestMapping("fireFinish.do")
	@HasPermissions(permissions = { "admin:personnel:staffRecord:dimission:manage" })
	public String fireFinish(Dimission dimission, HttpServletRequest request){
		try{
			dimissionService.fireFinish(dimission, request);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 取消离职
	 * @return
	 */
	@RequestMapping("fireCancel.do")
	@HasPermissions(permissions = { "admin:personnel:staffRecord:dimission:manage" })
	public String fireCancel(String userId, HttpServletRequest request){
		try{
			dimissionService.fireCancel(userId, request);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
}
