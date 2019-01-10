package com.mdoa.personnel.controller;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.constant.FileConstant;
import com.mdoa.personnel.model.PunishRecord;
import com.mdoa.personnel.service.PunishRecordService;
import com.mdoa.util.FileUtil;
import com.mdoa.util.StringUtil; 
@RestController
@RequestMapping("personnel")
public class PunishRecordController {

	@Autowired
	private PunishRecordService punishRecordService;
	
	
	/**
	 * 打印扣款记录数据
	 * @param goodsForm
	 * @param request
	 * @param response
	 */
	@RequestMapping("/printRewardPenalties.do")
	public void printRewardPenalties(HttpServletRequest request,HttpServletResponse response){
	    try {
		String cptName = StringUtil.getUTU8String(request.getParameter("cptName"));
		String dateStr = StringUtil.getUTU8String(request.getParameter("dateStr"));
		String endTimeStr = StringUtil.getUTU8String(request.getParameter("endTimeStr"));
		System.out.println("dateStr:" + dateStr + "endTimeStr" + endTimeStr);
		String url = "/ReportServer?reportlet=" + cptName + ".cpt"  + "&dateStr=" + dateStr + "&endTimeStr=" + endTimeStr;
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
	 * 添加惩罚记录
	 * @param punishRecord
	 * @return
	 */
	@RequestMapping("addPunishRecord.do")
	public String addPunishRecord(PunishRecord punishRecord){
		try{
			punishRecordService.addPunishRecord(punishRecord);
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
	 * 导出惩罚记录到Excel
	 * @param punishRecord
	 * @param jsonString
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("writeRewardPenaltiesToExcel.do")
	public String writeRewardPenaltiesToExcel(PunishRecord punishRecord,String jsonString,HttpServletRequest request,HttpServletResponse response){
	    try {
			String filePath = FileConstant.FILE_PATH + FileConstant.SHORT_TIME_EXCEL + "/" +new Date().getTime() + ".xls";
			punishRecordService.writeRewardPenaltiesToExcel(punishRecord, jsonString, filePath);
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
	 * 查询惩罚记录
	 * @param punishRecord
	 * @return
	 */
	@RequestMapping("selectPunishRecord.do")
	public String selectPunishRecord(PunishRecord punishRecord){
		try{
			PageModel<PunishRecord> pageModel = punishRecordService.selectPunishRecord(punishRecord);
			Gson gson = new Gson();
			return gson.toJson(pageModel);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 修改和删除惩罚记录
	 * @param punishRecord
	 * @return
	 */
	@RequestMapping("updatePunishRecord.do")
	public String updatePunishRecord(PunishRecord punishRecord){
		try{
			punishRecordService.updatePunishRecord(punishRecord);
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
	 * 导入excel
	 * @param file
	 * @param request
	 * @param punishRecord
	 * @return
	 */
	@RequestMapping("leadInExcel.do")
	public String leadInExcel(MultipartFile file,HttpServletRequest request,PunishRecord punishRecord){
		try{
			punishRecordService.readExcelFile(file);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
		
	}
	
	
}
