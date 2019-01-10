package com.mdoa.repertory.controller;


import java.io.IOException;
import java.net.URLEncoder;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.constant.FileConstant;
import com.mdoa.repertory.bo.GoodsForm;
import com.mdoa.repertory.bo.GoodsMonthBalanceForm;
import com.mdoa.repertory.bo.RepertoryInvoiceForm;
import com.mdoa.repertory.service.RepertoryInvoiceService;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.FileUtil;
import com.mdoa.util.StringUtil;

@RequestMapping("/invoice")
@RestController
public class RepertoryInvoiceController extends BaseController{

	@Autowired
	private RepertoryInvoiceService repertoryInvoiceService;
	
	//private String jsonString = "{invoiceNumber:\"123\",openDateStr:\"2017-05-25\",invoiceAmount:\"1900\",providerCode:\"00002\",text:\"165465\",list:[{inRecordId:\"17de0eb2-410f-11e7-b178-704d7bb3a4f4\",taxRate:\"17\",noWriteAmount:\"83\",writeAmount:\"50\",shouldWriteAmount:\"33\"}]}";
	/**
	 * 保存发票登记
	 */
	@RequestMapping("/saveInvoiceRegister.do")
	public String saveInvoiceRegister(String jsonString,HttpServletRequest request){
		try {
			repertoryInvoiceService.saveInvoiceRegister(jsonString,request);
			
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
	 * 发票查询
	 */
	@RequestMapping("/queryInvoice.do")
	public String queryInvoice(RepertoryInvoiceForm repertoryInvoiceForm,HttpServletRequest request){
		try {
			PageModel<RepertoryInvoiceForm> pageModel = repertoryInvoiceService.queryInvoice(repertoryInvoiceForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 导出发票记录到Excel
	 * @param jsonString
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/writeVerificationRecordToExcel.do")
	public String writeVerificationRecordToExcel(RepertoryInvoiceForm repertoryInvoiceForm,String jsonString,HttpServletRequest request,HttpServletResponse response){
		try {
			String filePath = FileConstant.FILE_PATH + FileConstant.SHORT_TIME_EXCEL + "/" +new Date().getTime() + ".xls";
			repertoryInvoiceService.writeVerificationRecordToExcel(repertoryInvoiceForm, jsonString, filePath);
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
	 * 打印发票记录数据
	 * @param repertoryInvoiceForm
	 * @param request
	 * @param response
	 */
	@RequestMapping("/printVerificationRecord.do")
	public void printVerificationRecord(HttpServletRequest request,HttpServletResponse response){
	    try {
		String cptName = StringUtil.getUTU8String(request.getParameter("cptName"));
		String providerCode = StringUtil.getUTU8String(request.getParameter("providerCode"));
		String startTimeStr = StringUtil.getUTU8String(request.getParameter("startTimeStr"));
		String endTimeStr = StringUtil.getUTU8String(request.getParameter("endTimeStr"));
		String invoiceAmount = StringUtil.getUTU8String(request.getParameter("invoiceAmount"));
		String invoiceNumber = StringUtil.getUTU8String(request.getParameter("invoiceNumber"));
		System.out.println("providerCode" + providerCode);
		String url = "/ReportServer?reportlet=" + cptName + ".cpt" + "&providerCode=" + providerCode + "&startTimeStr=" + startTimeStr
			+ "&endTimeStr=" + endTimeStr + "&invoiceNumber=" + invoiceNumber + "&invoiceAmount=" + invoiceAmount;
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
	 * 打印未核销发票记录数据
	 * @param repertoryInvoiceForm
	 * @param request
	 * @param response
	 */
	@RequestMapping("/printNoInvoiceRecord.do")
	public void printNoInvoiceRecord(HttpServletRequest request,HttpServletResponse response){
	    try {
		String cptName = StringUtil.getUTU8String(request.getParameter("cptName"));
		String goodsName = StringUtil.getUTU8String(request.getParameter("goodsName"));
		String startTimeStr = StringUtil.getUTU8String(request.getParameter("startTimeStr"));
		String endTimeStr = StringUtil.getUTU8String(request.getParameter("endTimeStr"));
		System.out.println("goodsName:" + goodsName);
		System.out.println("startTimeStr:" + startTimeStr);
		System.out.println("endTimeStr:" + endTimeStr);
		String url = "/ReportServer?reportlet=" + cptName + ".cpt" + "&goodsName=" + goodsName + "&startTimeStr=" + startTimeStr
			+ "&endTimeStr=" + endTimeStr;
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
	 * 打印货到未开票汇总数据
	 * @param repertoryInvoiceForm
	 * @param request
	 * @param response
	 */
	@RequestMapping("/printNoInvoiceCollect.do")
	public void printNoInvoiceCollect(RepertoryInvoiceForm repertoryInvoiceForm,HttpServletRequest request,HttpServletResponse response){
	    try {
		String cptName = StringUtil.getUTU8String(request.getParameter("cptName"));
		String providerName = StringUtil.getUTU8String(request.getParameter("providerName"));
		String startTimeStr = StringUtil.getUTU8String(request.getParameter("startTimeStr"));
		String endTimeStr = StringUtil.getUTU8String(request.getParameter("endTimeStr"));
		if(StringUtil.isEmpty(startTimeStr) || StringUtil.isEmpty(endTimeStr))
		    return;
		String url = "/ReportServer?reportlet=" + cptName + ".cpt" + "&providerName=" + providerName + "&startTimeStr=" + startTimeStr
			+ "&endTimeStr=" + endTimeStr;
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
	 * 发票详情查询
	 */
	@RequestMapping("/queryInvoiceDetail.do")
	public String queryInvoiceDetail(RepertoryInvoiceForm repertoryInvoiceForm,HttpServletRequest request){
		try {
			RepertoryInvoiceForm pageModel = repertoryInvoiceService.queryInvoiceDetail(repertoryInvoiceForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 导出未核销发票记录到Excel
	 * @param jsonString
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/writeNoInvoiceRecordToExcel.do")
	public String writeNoInvoiceRecordToExcel(RepertoryInvoiceForm repertoryInvoiceForm,String jsonString,HttpServletRequest request,HttpServletResponse response){
		try {
			String filePath = FileConstant.FILE_PATH + FileConstant.SHORT_TIME_EXCEL + "/" +new Date().getTime() + ".xls";
			repertoryInvoiceService.writeNoInvoiceRecordToExcel(repertoryInvoiceForm, jsonString, filePath);
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
	 * 未核销记录查询
	 */
	@RequestMapping("/queryNoInvoiceRecord.do")
	public String queryNoInvoiceRecord(RepertoryInvoiceForm repertoryInvoiceForm,HttpServletRequest request){
		try {
			PageModel<RepertoryInvoiceForm> pageModel = repertoryInvoiceService.queryNoInvoiceRecord(repertoryInvoiceForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 导出货到未开票汇总到Excel
	 * @param jsonString
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/writeGatherInvoiceAmountToExcel.do")
	public String writeGatherInvoiceAmountToExcel(RepertoryInvoiceForm repertoryInvoiceForm,String jsonString,HttpServletRequest request,HttpServletResponse response){
		try {
			String filePath = FileConstant.FILE_PATH + FileConstant.SHORT_TIME_EXCEL + "/" +new Date().getTime() + ".xls";
			repertoryInvoiceService.writeGatherInvoiceAmountToExcel(repertoryInvoiceForm, jsonString, filePath);
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
	 * 汇总
	 */
	@RequestMapping("/gatherInvoiceAmount.do")
	public String gatherInvoiceAmount(RepertoryInvoiceForm repertoryInvoiceForm,HttpServletRequest request){
		try {
			PageModel<RepertoryInvoiceForm> pageModel = repertoryInvoiceService.gatherInvoiceAmount(repertoryInvoiceForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	
	
	/**
	 * 冲红
	 */
	@RequestMapping("/redInRecordGoodsByInvoice.do")
	public String redInRecordGoodsByInvoice(RepertoryInvoiceForm repertoryInvoiceForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			repertoryInvoiceForm.setUpdateUserId(userInfo.getUserId());
			repertoryInvoiceForm.setUpdateUserName(userInfo.getUserName());
			repertoryInvoiceForm.setCreateUserId(userInfo.getUserId());
			repertoryInvoiceForm.setCreateUserName(userInfo.getUserName());
			repertoryInvoiceService.redInRecordGoodsByInvoice(repertoryInvoiceForm);
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
		
	}
	@RequestMapping("/redInRecordGoodsByInvoiceTwo.do")
	public String redInRecordGoodsByInvoiceTwo(RepertoryInvoiceForm repertoryInvoiceForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			repertoryInvoiceForm.setUpdateUserId(userInfo.getUserId());
			repertoryInvoiceForm.setUpdateUserName(userInfo.getUserName());
			repertoryInvoiceForm.setCreateUserId(userInfo.getUserId());
			repertoryInvoiceForm.setCreateUserName(userInfo.getUserName());
			repertoryInvoiceService.redInRecordGoodsByInvoiceTwo(repertoryInvoiceForm);
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
	 * 删除
	 */
	@RequestMapping("/deleteInvoice.do")
	public String deleteInvoice(RepertoryInvoiceForm repertoryInvoiceForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			repertoryInvoiceForm.setUpdateUserId(userInfo.getUserId());
			repertoryInvoiceForm.setUpdateUserName(userInfo.getUserName());
			repertoryInvoiceService.deleteInvoice(repertoryInvoiceForm);
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
	 * 初始金额核销
	 */
	@RequestMapping("/initVerification.do")
	public String initVerification(RepertoryInvoiceForm repertoryInvoiceForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			repertoryInvoiceForm.setCreateUserId(userInfo.getUserId());
			repertoryInvoiceForm.setCreateUserName(userInfo.getUserName());
			repertoryInvoiceForm.setUpdateUserId(userInfo.getUserId());
			repertoryInvoiceForm.setUpdateUserName(userInfo.getUserName());
			repertoryInvoiceService.initVerification(repertoryInvoiceForm);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
}
