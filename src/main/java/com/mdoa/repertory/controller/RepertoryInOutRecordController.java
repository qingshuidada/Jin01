package com.mdoa.repertory.controller;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.lang.model.type.UnknownTypeException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.constant.FileConstant;
import com.mdoa.repertory.bo.GoodsForm;
import com.mdoa.repertory.bo.InPrintForm;
import com.mdoa.repertory.bo.OutPrintForm;
import com.mdoa.repertory.model.RepertoryDepartment;
import com.mdoa.repertory.model.RepertoryInRecord;
import com.mdoa.repertory.model.RepertoryOutRecord;
import com.mdoa.repertory.model.RepertoryProvider;
import com.mdoa.repertory.service.RepertoryInOutRecordService;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.FileUtil;
import com.mdoa.util.JSONUtil;
import com.mdoa.util.StringUtil;

/**
 * 入库出库的controller
 * @author Administrator
 */
@RestController
@RequestMapping("/repertory")
public class RepertoryInOutRecordController extends BaseController{
	
	@Autowired
	private RepertoryInOutRecordService inOutRecordService;
	
	/**
	 * 打印出入库记录数据
	 * @param goodsForm
	 * @param request
	 * @param response
	 */
	@RequestMapping("/printInOutRecord.do")
	public void printInOutRecord(HttpServletRequest request,HttpServletResponse response){
	    try {
		String cptName = StringUtil.getUTU8String(request.getParameter("cptName"));
		String goodsName = StringUtil.getUTU8String(request.getParameter("goodsName"));
		String goodsSize = StringUtil.getUTU8String(request.getParameter("goodsSize"));
		String beginNumber = StringUtil.getUTU8String(request.getParameter("beginNumber"));
		String endNumber = StringUtil.getUTU8String(request.getParameter("endNumber"));
		String goodsPositionName = StringUtil.getUTU8String(request.getParameter("goodsPositionName"));
		String putUserName = StringUtil.getUTU8String(request.getParameter("putUserName"));
		String departmentId = StringUtil.getUTU8String(request.getParameter("departmentId"));
		String repertoryId = StringUtil.getUTU8String(request.getParameter("repertoryId"));
		String beginTime = StringUtil.getUTU8String(request.getParameter("beginTime"));
		String endTime = StringUtil.getUTU8String(request.getParameter("endTime"));
		String goodsTypeUrl = StringUtil.getUTU8String(request.getParameter("goodsTypeUrl"));
		System.out.println("goodsTypeUrl:" + goodsTypeUrl);
		String url = "/ReportServer?reportlet=" + cptName + ".cpt"  + "&goodsName=" + goodsName + "&goodsSize=" + goodsSize + "&beginNumber=" + beginNumber
 			+ "&endNumber=" + endNumber  + "&repertoryId=" + repertoryId  + "&beginTime=" + beginTime + "&goodsTypeUrl=" + goodsTypeUrl
 			+ "&goodsPositionName=" + goodsPositionName  + "&putUserName=" + putUserName + "&departmentId=" + departmentId
 			+ "&endTime=" + endTime;
		try {
			request.getRequestDispatcher(url).forward(request, response);
		} catch (ServletException e) {
			e.printStackTrace();
		};
	    } catch (Exception e) {
		e.printStackTrace();
	    }
	}
	
	/**
	 * 打印入库记录数据
	 * @param goodsForm
	 * @param request
	 * @param response
	 */
	@RequestMapping("/printInRecord.do")
	public void printInRecord(HttpServletRequest request,HttpServletResponse response){
	    try {
		String cptName = StringUtil.getUTU8String(request.getParameter("cptName"));
		String goodsName = StringUtil.getUTU8String(request.getParameter("goodsName"));
		String goodsSize = StringUtil.getUTU8String(request.getParameter("goodsSize"));
		String beginNumber = StringUtil.getUTU8String(request.getParameter("beginNumber"));
		String endNumber = StringUtil.getUTU8String(request.getParameter("endNumber"));
		String goodsPositionName = StringUtil.getUTU8String(request.getParameter("goodsPositionName"));
		String putUserName = StringUtil.getUTU8String(request.getParameter("putUserName"));
		String providerCode = StringUtil.getUTU8String(request.getParameter("providerCode"));
		String repertoryId = StringUtil.getUTU8String(request.getParameter("repertoryId"));
		String beginTime = StringUtil.getUTU8String(request.getParameter("beginTime"));
		String endTime = StringUtil.getUTU8String(request.getParameter("endTime"));
		String goodsTypeUrl = StringUtil.getUTU8String(request.getParameter("goodsTypeUrl"));
		System.out.println("goodsTypeUrl:" + goodsTypeUrl);
		String url = "/ReportServer?reportlet=" + cptName + ".cpt" + "&goodsName=" + goodsName + "&goodsSize=" + goodsSize + "&beginNumber=" + beginNumber
			+ "&endNumber=" + endNumber  + "&repertoryId=" + repertoryId + "&goodsTypeUrl=" + goodsTypeUrl + "&beginTime=" + beginTime
			+ "&goodsPositionName=" + goodsPositionName  + "&putUserName=" + putUserName + "&providerCode=" + providerCode
			+ "&endTime=" + endTime;
		try {
			request.getRequestDispatcher(url).forward(request, response);
		} catch (ServletException e) {
			e.printStackTrace();
		};
	    } catch (Exception e) {
		e.printStackTrace();
	    }
	}
	
	/**
	 * 打印出库记录数据
	 * @param goodsForm
	 * @param request
	 * @param response
	 */
	@RequestMapping("/printOutRecord.do")
	public void printOutRecord(HttpServletRequest request,HttpServletResponse response){
	    try {
		String cptName = StringUtil.getUTU8String(request.getParameter("cptName"));
		String goodsName = StringUtil.getUTU8String(request.getParameter("goodsName"));
		String goodsSize = StringUtil.getUTU8String(request.getParameter("goodsSize"));
		String beginNumber = StringUtil.getUTU8String(request.getParameter("beginNumber"));
		String endNumber = StringUtil.getUTU8String(request.getParameter("endNumber"));
		String goodsPositionName = StringUtil.getUTU8String(request.getParameter("goodsPositionName"));
		String getUserName = StringUtil.getUTU8String(request.getParameter("getUserName"));
		String getDepartmentId = StringUtil.getUTU8String(request.getParameter("getDepartmentId"));
		String useType = StringUtil.getUTU8String(request.getParameter("useType"));
		String repertoryId = StringUtil.getUTU8String(request.getParameter("repertoryId"));
		String beginTime = StringUtil.getUTU8String(request.getParameter("beginTime"));
		String endTime = StringUtil.getUTU8String(request.getParameter("endTime"));
		String goodsTypeUrl = StringUtil.getUTU8String(request.getParameter("goodsTypeUrl"));
		System.out.println("goodsTypeUrl:" + goodsTypeUrl);
		String url = "/ReportServer?reportlet=" + cptName + ".cpt" + "&goodsName=" + goodsName + "&goodsSize=" + goodsSize + "&beginNumber=" + beginNumber
			+ "&endNumber=" + endNumber + "&useType=" + useType + "&repertoryId=" + repertoryId + "&goodsTypeUrl=" + goodsTypeUrl + "&beginTime=" + beginTime
			+ "&goodsPositionName=" + goodsPositionName  + "&getUserName=" + getUserName + "&getDepartmentId=" + getDepartmentId
			+ "&endTime=" + endTime;
		try {
			request.getRequestDispatcher(url).forward(request, response);
		} catch (ServletException e) {
			e.printStackTrace();
		};
	    } catch (Exception e) {
		e.printStackTrace();
	    }
	}
	
	/**
	 * 导出出入库记录到Excel
	 * @param goodsForm
	 * @param jsonString
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/writeInOutToExcel.do")
	public String writeInOutToExcel(GoodsForm goodsForm,String jsonString,HttpServletRequest request,HttpServletResponse response){
		try {
			String filePath = FileConstant.FILE_PATH + FileConstant.SHORT_TIME_EXCEL + "/" +new Date().getTime() + ".xls";
			inOutRecordService.writeInOutToExcel(goodsForm, jsonString, filePath);
			FileUtil.download(request, response, filePath, new Date().getTime()+".xls");
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
	 * 导出入库记录到Excel
	 * @param goodsForm
	 * @param jsonString
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/writeInToExcel.do")
	public String writeInToExcel(GoodsForm goodsForm,String jsonString,HttpServletRequest request,HttpServletResponse response){
		try {
			String filePath = FileConstant.FILE_PATH + FileConstant.SHORT_TIME_EXCEL + "/" +new Date().getTime() + ".xls";
			inOutRecordService.writeInToExcel(goodsForm, jsonString, filePath);
			FileUtil.download(request, response, filePath, new Date().getTime()+".xls");
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
	 * 导出出入库记录到Excel
	 * @param goodsForm
	 * @param jsonString
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/writeOutToExcel.do")
	public String writeOutToExcel(GoodsForm goodsForm,String jsonString,HttpServletRequest request,HttpServletResponse response){
		try {
			String filePath = FileConstant.FILE_PATH + FileConstant.SHORT_TIME_EXCEL + "/" +new Date().getTime() + ".xls";
			inOutRecordService.writeOutToExcel(goodsForm, jsonString, filePath);
			FileUtil.download(request, response, filePath, new Date().getTime()+".xls");
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
	 * 批量入库操作
	 * @param json
	 * @return
	 */
	@ResponseBody
	@RequestMapping("batchGoodsIn.do")
	public String batchGoodsIn(String json,HttpServletRequest request){
		try{
		    	UserInfo user = getUser(request);
			JSONObject jsonObject = new JSONObject(json);
			RepertoryInRecord inRecord = new RepertoryInRecord();
			inRecord.setPutUserName(jsonObject.getString("putUserName"));
			inRecord.setRepertoryId(jsonObject.getString("repertoryId"));
			inRecord.setRepertoryName(jsonObject.getString("repertoryName"));
			inRecord.setStrInTime(jsonObject.getString("inTime"));
			inRecord.setProviderCode(jsonObject.getString("providerCode"));
			inRecord.setBatchText(jsonObject.optString("batchText"));
			inRecord.setCreateUserId(user.getUserId());
			String string = jsonObject.get("list").toString();
			String inBatchFlowId = inOutRecordService.insertInBatchFlow(inRecord);
			List<GoodsForm> list = JSONUtil.<GoodsForm>jsonToList(string, GoodsForm[].class);			
			for(int i= 0;i<list.size();i++){
				GoodsForm goodsForm = list.get(i);
				goodsForm.setPutUserName(inRecord.getPutUserName());
				goodsForm.setRepertoryId(inRecord.getRepertoryId());
				goodsForm.setInTimeStr(inRecord.getStrInTime());
				goodsForm.setProviderCode(inRecord.getProviderCode());
				goodsForm.setRepertoryName(inRecord.getRepertoryName());
				goodsForm.setInBatchFlowId(inBatchFlowId);
				if(goodsForm.getGoodsPositionId() == null){
					inOutRecordService.newGoodsPositionPut(goodsForm,request);					
				}else{
					inOutRecordService.putInStorageRecord(goodsForm, request);
				}
			}
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
	 * 批量出库操作
	 * @param json
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping("batchGoodsOut.do")
	public String batchGoodsOut(String json,HttpServletRequest request){
		try{
		    	UserInfo user = getUser(request);
			JSONObject jsonObject = new JSONObject(json);
			RepertoryOutRecord outRecord = new RepertoryOutRecord();
			outRecord.setGetUserName(jsonObject.getString("getUserName"));
			outRecord.setRepertoryId(jsonObject.getString("repertoryId"));
			outRecord.setRepertoryName(jsonObject.getString("repertoryName"));
			outRecord.setGetDepartmentId(jsonObject.getString("getDepartmentId"));
			outRecord.setGetDepartmentName(jsonObject.getString("getDepartmentName"));
			outRecord.setStrOutTime(jsonObject.getString("outTime"));
			outRecord.setUseType(jsonObject.getString("useType"));
			outRecord.setBatchText(jsonObject.getString("batchText"));
			outRecord.setCreateUserId(user.getUserId());
			String string = jsonObject.get("list").toString();
			String outBatchFlowId = inOutRecordService.insertOutBatchFlow(outRecord);
			List<GoodsForm> list = JSONUtil.<GoodsForm>jsonToList(string, GoodsForm[].class);
			for(int i = 0;i<list.size();i++){
				GoodsForm goodsForm = list.get(i);
				goodsForm.setGetUserName(outRecord.getGetUserName());
				goodsForm.setRepertoryId(outRecord.getRepertoryId());
				goodsForm.setRepertoryName(outRecord.getRepertoryName());
				goodsForm.setGetDepartmentId(outRecord.getGetDepartmentId());
				goodsForm.setGetDepartmentName(outRecord.getGetDepartmentName());
				goodsForm.setOutTimeStr(outRecord.getStrOutTime());
				goodsForm.setUseType(outRecord.getUseType());
				goodsForm.setOutBatchFlowId(outBatchFlowId);
				inOutRecordService.putOutStorageRecord(goodsForm,request);
			}
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
	 * 新仓位入库操作
	 * @param goodsForm
	 * @return
	 */
	@ResponseBody
	@RequestMapping("newGoodsPositionPut.do")
	public String newGoodsPositionPut(GoodsForm goodsForm, HttpServletRequest request){
		try{
		    	UserInfo user = getUser(request);
		    	RepertoryInRecord inRecord = new RepertoryInRecord();
		    	inRecord.setBatchText(goodsForm.getBatchText());
		    	inRecord.setStrInTime(goodsForm.getInTimeStr());
		    	inRecord.setCreateUserId(user.getUserId());
		    	inRecord.setRepertoryId(goodsForm.getRepertoryId());
		    	inRecord.setPutUserName(goodsForm.getPutUserName());
		    	inRecord.setProviderCode(goodsForm.getProviderCode());
		    	inRecord.setRepertoryName(goodsForm.getRepertoryName());
		    	String inBatchFlowId = inOutRecordService.insertInBatchFlow(inRecord);
		    	goodsForm.setInBatchFlowId(inBatchFlowId);
			inOutRecordService.newGoodsPositionPut(goodsForm, request);
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
	 * 进行入库操作
	 * @param inRecord
	 * @return
	 */
	@ResponseBody
	@RequestMapping("putInStorageRecord.do")
	public String putInStorageRecord(GoodsForm goodsForm, HttpServletRequest request){
		try{
		    	UserInfo user = getUser(request);
		    	RepertoryInRecord inRecord = new RepertoryInRecord();
		    	inRecord.setBatchText(goodsForm.getBatchText());
		    	inRecord.setStrInTime(goodsForm.getInTimeStr());
		    	inRecord.setCreateUserId(user.getUserId());
		    	inRecord.setRepertoryId(goodsForm.getRepertoryId());
		    	inRecord.setPutUserName(goodsForm.getPutUserName());
		    	inRecord.setProviderCode(goodsForm.getProviderCode());
		    	inRecord.setRepertoryName(goodsForm.getRepertoryName());
		    	String inBatchFlowId = inOutRecordService.insertInBatchFlow(inRecord);
		    	goodsForm.setInBatchFlowId(inBatchFlowId);
			goodsForm.setCreateUserId(user.getCreateUserId());
			goodsForm.setCreateUserName(user.getCreateUserName());
			inOutRecordService.putInStorageRecord(goodsForm, request);
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
	 * 进行出库操作
	 * @param outRecord
	 * @return
	 */
	@ResponseBody
	@RequestMapping("putOutStorageRecord.do")
	public String putOutStorageRecord(GoodsForm goodsForm, HttpServletRequest request){
		try{
		    	UserInfo user = getUser(request);
		    	RepertoryOutRecord outRecord = new RepertoryOutRecord();
		    	outRecord.setBatchText(goodsForm.getBatchText());
		    	outRecord.setStrOutTime(goodsForm.getOutTimeStr());
		    	outRecord.setGetDepartmentId(goodsForm.getGetDepartmentId());
		    	outRecord.setGetDepartmentName(goodsForm.getGetDepartmentName());
		    	outRecord.setRepertoryId(goodsForm.getRepertoryId());
		    	outRecord.setRepertoryName(goodsForm.getRepertoryName());
		    	outRecord.setGetUserName(goodsForm.getGetUserName());
		    	outRecord.setCreateUserId(user.getUserId());
		    	outRecord.setUseType(goodsForm.getUseType());
		    	String outBatchFlowId = inOutRecordService.insertOutBatchFlow(outRecord);
		    	goodsForm.setCreateUserId(user.getCreateUserId());
		    	goodsForm.setCreateUserName(user.getCreateUserName());
		    	goodsForm.setOutBatchFlowId(outBatchFlowId);
			
			inOutRecordService.putOutStorageRecord(goodsForm, request);
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
	 * 进行移库操作
	 * @param goodsForm
	 * @return
	 */
	@ResponseBody
	@RequestMapping("moveGoodsRepertoryByOutIn.do")
	public String moveGoodsRepertoryByOutIn(GoodsForm goodsForm, HttpServletRequest request){
		try{
			inOutRecordService.moveGoodsRepertoryByOutIn(goodsForm, request);
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
	 * 修改入库记录
	 * @param goodsForm
	 * @return
	 */
	@ResponseBody
	@RequestMapping("editGoodsInRecord.do")
	public String editGoodsInRecord(GoodsForm goodsForm, HttpServletRequest request){
		try{
			UserInfo user = getUser(request);
			goodsForm.setUpdateUserId(user.getUpdateUserId());
			goodsForm.setUpdateUserName(user.getUpdateUserName());
			inOutRecordService.editGoodsInRecord(goodsForm,request);
			return Constant.SUCCESS_CODE;
		}catch (UnknownTypeException e) {
			e.printStackTrace();
			return "修改此入库记录后供应商的未核销金额为负数，请更正修改的数量以及金额";
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 修改出库记录
	 * @param goodsForm
	 * @return
	 */
	@ResponseBody
	@RequestMapping("editGoodsOutRecord.do")
	public String editGoodsOutRecord(GoodsForm goodsForm, HttpServletRequest request){
		try{
			UserInfo user = getUser(request);
			goodsForm.setUpdateUserId(user.getUpdateUserId());
			goodsForm.setUpdateUserName(user.getUpdateUserName());
			inOutRecordService.editGoodsOutRecord(goodsForm, request);
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
	 * 查询所有物品的入库流水列表 以及各种查询
	 * @param goodsForm
	 * @return
	 */
	@ResponseBody
	@RequestMapping("selectGoodsInRecord.do")
	public String selectGoodsInRecord(GoodsForm goodsForm){
		try{
			PageModel<GoodsForm> pageModel = inOutRecordService.selectGoodsInRecord(goodsForm);
			Gson gson = new Gson();
			return gson.toJson(pageModel);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 查询所有物品的入库流水列表 以及各种查询
	 * @param goodsForm
	 * @return
	 */
	@ResponseBody
	@RequestMapping("selectGoodsInRecordForInvoice.do")
	public String selectGoodsInRecordForInvoice(GoodsForm goodsForm){
		try{
			PageModel<GoodsForm> pageModel = inOutRecordService.selectGoodsInRecordForInvoice(goodsForm);
			Gson gson = new Gson();
			return gson.toJson(pageModel);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 查询所有物品的出库明细列表 以及各种查询
	 * @param goodsForm
	 * @return
	 */
	@ResponseBody
	@RequestMapping("selectGoodsOutRecord.do")
	public String selectGoodsOutRecord(GoodsForm goodsForm){
		try{
			PageModel<GoodsForm> pageModel = inOutRecordService.selectGoodsOutRecord(goodsForm);
			Gson gson = new Gson();
			return gson.toJson(pageModel);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 查询全部的出库入库记录  以及各种条件查询
	 * @param goodsForm
	 * @return
	 */
	@ResponseBody
	@RequestMapping("selectAllInOutRecord.do")
	public String selectAllInOutRecord(GoodsForm goodsForm){
		try{
			PageModel<GoodsForm> pageModel = inOutRecordService.selectAllInOutRecord(goodsForm);
			Gson gson = new Gson();
			return gson.toJson(pageModel);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询出入库记录汇总
	 * @param goodsForm
	 * @return
	 */
	@ResponseBody
	@RequestMapping("findSumInOutRecord.do")
	public String findSumInOutRecord(GoodsForm goodsForm){
		try{
			GoodsForm form = inOutRecordService.findSumInOutRecord(goodsForm);
			Gson gson = new Gson();
			return gson.toJson(form);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询出库记录汇总
	 * @param goodsForm
	 * @return
	 */
	@ResponseBody
	@RequestMapping("findSumOutRecord.do")
	public String findSumOutRecord(GoodsForm goodsForm){
		try{
			GoodsForm form = inOutRecordService.findSumOutRecord(goodsForm);
			Gson gson = new Gson();
			return gson.toJson(form);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询入库记录汇总
	 * @param goodsForm
	 * @return
	 */
	@ResponseBody
	@RequestMapping("findSumInRecord.do")
	public String findSumInRecord(GoodsForm goodsForm){
		try{
			GoodsForm form = inOutRecordService.findSumInRecord(goodsForm);
			Gson gson = new Gson();
			return gson.toJson(form);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 批量删除入库记录 
	 * @param json
	 * @return
	 */
	@ResponseBody
	@RequestMapping("deleteGoodsInRecord.do")
	public String deleteGoodsInRecord(String json){	
		try{
			JSONArray jsonArray = new JSONArray(json);  
			for(int i = 0;i <jsonArray.length(); i++){
				String inRecordId = (String) jsonArray.getJSONObject(i).get("inRecordId");
				inOutRecordService.deleteGoodsInRecord(inRecordId);	
			}		
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
	 *  批量删除出库记录 
	 * @param json
	 * @return
	 */
	@ResponseBody
	@RequestMapping("deleteGoodsOutRecord.do")
	public String deleteGoodsOutRecord(String json){
		try{
			JSONArray jsonArray = new JSONArray(json);
			for(int i = 0;i <jsonArray.length(); i++){
				String outRecordId = (String) jsonArray.getJSONObject(i).get("outRecordId");
				inOutRecordService.deleteGoodsOutRecord(outRecordId);	
			}		
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
		
	}
	/** 删除一条入库记录
	 * @param inRecordId
	 * @return
	 */
	@ResponseBody
	@RequestMapping("deleteInRecord.do")
	public String deleteInRecord(String inRecordId){
		try{
			inOutRecordService.deleteGoodsInRecord(inRecordId);
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
	 * 删除一条出库记录
	 * @param outRecordId
	 * @return
	 */
	@ResponseBody
	@RequestMapping("deleteOutRecord.do")
	public String deleteOutRecord(String outRecordId){
		try{
			inOutRecordService.deleteGoodsOutRecord(outRecordId);
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
	 * 新建领用部门的信息
	 * @param department
	 * @return
	 */
	@ResponseBody
	@RequestMapping("insertGetDepartment.do")
	public String insertGetDepartment(RepertoryDepartment department, HttpServletRequest request){
		try {
			UserInfo user = getUser(request);
			department.setCreateUserId(user.getUserId());
			department.setCreateUserName(user.getUserName());
			inOutRecordService.insertGetDepartment(department);
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
	 * 删除一个领用部门
	 * @param departmentId
	 * @return
	 */
	@ResponseBody
	@RequestMapping("deleteGetDepartment.do")
	public String deleteGetDepartment(String departmentId){
		try{
			inOutRecordService.deleteGetDepartment(departmentId);
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
	 * 修改领用部门的信息
	 * @param department
	 * @return
	 */
	@ResponseBody
	@RequestMapping("updateGetDepartment.do")
	public String updateGetDepartment(RepertoryDepartment department, HttpServletRequest request){
		try{
			UserInfo user = getUser(request);
			department.setUpdateUserId(user.getUserId());
			department.setUpdateUserName(user.getUserName());
			inOutRecordService.updateGetDepartment(department);
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
	 * 查询所有部门信息 
	 * @return
	 */
	@ResponseBody
	@RequestMapping("selectGetDepartment.do")
	public String selectGetDepartment(GoodsForm goodsForm){
		try{
			PageModel<GoodsForm> pageModel = inOutRecordService.selectGetDepartment(goodsForm);
			Gson gson = new Gson();
			return gson.toJson(pageModel);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
			
	}
	/**
	 * =====================================供应商=================================================
	 */
	@ResponseBody
	@RequestMapping("insertProviderMessage.do")
	public String insertProviderMessage(RepertoryProvider provider,HttpServletRequest request){
		try{
			UserInfo user = getUser(request);
			provider.setCreateUserId(user.getCreateUserId());
			provider.setCreateUserName(user.getCreateUserName());
			inOutRecordService.insertProviderMessage(provider);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	@ResponseBody
	@RequestMapping("deleteProvider.do")
	public String deleteProvider(RepertoryProvider provider,HttpServletRequest request){
		try{
			UserInfo user = getUser(request);
			provider.setUpdateUserId(user.getCreateUserId());
			provider.setUpdateUserName(user.getCreateUserName());
			inOutRecordService.deleteProvider(provider);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@ResponseBody
	@RequestMapping("updateProviderMessage.do")
	public String updateProviderMessage(RepertoryProvider provider,HttpServletRequest request){
		try{
			UserInfo user = getUser(request);
			provider.setUpdateUserId(user.getCreateUserId());
			provider.setUpdateUserName(user.getCreateUserName());
			inOutRecordService.updateProviderMessage(provider);
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
	 * 查询供应商的信息
	 * @param provider
	 * @return
	 */
	@ResponseBody
	@RequestMapping("selectProviderMessage.do")
	public String selectProviderMessage(RepertoryProvider provider){
		try{
			PageModel<RepertoryProvider> pageModel = inOutRecordService.selectProviderMessage(provider);
			Gson gson = new Gson();
			return gson.toJson(pageModel);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
		
	}
	
	/* 入库单 领料单 打印相关查询接口 */
	
	/**
	 * 查询入库流水
	 * @return
	 */
	@RequestMapping("/selectInBatchFlow.do")
	public String selectInBatchFlow(GoodsForm goodsForm){
	    try{
		PageModel<GoodsForm> pageModel = inOutRecordService.selectInBatchFlow(goodsForm);
		Gson gson = new Gson();
		return gson.toJson(pageModel);
        	}catch (Exception e) {
        		e.printStackTrace();
        		return Constant.SERVER_ERROR_CODE;
        	}
	}
	
	/**
	 * 查询出库流水
	 * @return
	 */
	@RequestMapping("/selectOutBatchFlow.do")
	public String selectOutBatchFlow(GoodsForm goodsForm){
	    try{
		PageModel<GoodsForm> pageModel = inOutRecordService.selectOutBatchFlow(goodsForm);
		Gson gson = new Gson();
		return gson.toJson(pageModel);
        	}catch (Exception e) {
        		e.printStackTrace();
        		return Constant.SERVER_ERROR_CODE;
        	}
	}
	
	/**
	 * 打印物料入库单时查询入库信息
	 * @param goodsForm
	 * @return
	 */
	@RequestMapping("/selectInRecordForPrint.do")
	public String selectInRecordForPrint(GoodsForm goodsForm){
	    try{
		PageModel<InPrintForm> pageModel = inOutRecordService.SelectInRecordForPrint(goodsForm);
		Gson gson = new Gson();
		return gson.toJson(pageModel);
        	}catch (Exception e) {
        		e.printStackTrace();
        		return Constant.SERVER_ERROR_CODE;
        	}
	}
	
	/**
	 * 打印物品领料单时查询出库信息
	 * @param goodsForm
	 * @return
	 */
	@RequestMapping("/selectOutRecordForPrint.do")
	public String selectOutRecordForPrint(GoodsForm goodsForm){
	    try{
		PageModel<OutPrintForm> pageModel = inOutRecordService.SelectOutRecordForPrint(goodsForm);
		Gson gson = new Gson();
		return gson.toJson(pageModel);
        	}catch (Exception e) {
        		e.printStackTrace();
        		return Constant.SERVER_ERROR_CODE;
        	}
	}
	
	/**
	 * 打印物料入库单
	 * @param request
	 * @param response
	 */
	@RequestMapping("/printMaterialStorage.do")
	public void printMaterialStorage(HttpServletRequest request,HttpServletResponse response){
	    try {
        	    String cptName = StringUtil.getUTU8String(request.getParameter("cptName"));
        	    String inBatchFlowCode = StringUtil.getUTU8String(request.getParameter("inBatchFlowCode"));
        	    String url = "/ReportServer?reportlet=" + cptName + ".cpt" + "&inBatchFlowCode=" + inBatchFlowCode;
        	    try {
        		    request.getRequestDispatcher(url).forward(request, response);
                	} catch (ServletException e) {
                		e.printStackTrace();
                	};
	    } catch (IOException e) {
		    e.printStackTrace();
	    }
	}
	
	/**
	 * 打印物品领料单
	 * @param request
	 * @param response
	 */
	@RequestMapping("/printMaterialRequisition.do")
	public void printMaterialRequisition(HttpServletRequest request,HttpServletResponse response){
	    try {
        	    String cptName = StringUtil.getUTU8String(request.getParameter("cptName"));
        	    String outBatchFlowCode = StringUtil.getUTU8String(request.getParameter("outBatchFlowCode"));
        	    System.out.println(outBatchFlowCode);
        	    String url = "/ReportServer?reportlet=" + cptName + ".cpt" + "&outBatchFlowCode=" + outBatchFlowCode;
        	    try {
        		    request.getRequestDispatcher(url).forward(request, response);
                	} catch (ServletException e) {
                		e.printStackTrace();
                	};
	    } catch (IOException e) {
		    e.printStackTrace();
	    }
	}
	
}