package com.mdoa.salary.controller;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.bouncycastle.jcajce.provider.asymmetric.ec.SignatureSpi.ecCVCDSA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.informix.msg.net;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.constant.FileConstant;
import com.mdoa.salary.bo.SalaryForm;
import com.mdoa.salary.bo.SalaryInfoForm;
import com.mdoa.salary.service.SalaryService;
import com.mdoa.util.ExcelUtil;
import com.mdoa.util.FileUtil;
import com.mdoa.util.StringUtil;

@RestController
@RequestMapping("/salary")
public class SalaryController {
	
	@Autowired
	private SalaryService salaryService;
	
	/**
	 * 工资管理系统口令验证
	 * @param salaryForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/login.salary")
	public String check(SalaryForm salaryForm,HttpServletRequest request){
		try {
			salaryService.check(salaryForm,request);
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
	 * 登出 清除session
	 * @param request
	 * @return
	 */
	@RequestMapping("/exit.salary")
	public void exit(HttpServletRequest request){
		try {
			salaryService.exit(request);
			System.out.println("工资管理系统登出成功！");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 从excel导入工资信息数据
	 * @throws Exception
	 */
	@RequestMapping("/readSalaryFromExcel.salary")
	public String readSalaryFromExcel(MultipartFile file){
		try {
			List<SalaryInfoForm> list = ExcelUtil.readSalaryInfoFromExcel(file,file.getOriginalFilename());
			System.out.println("导入数据条数：" + list.size());
			salaryService.insertSalaryInfoByBatch(list);
			System.out.println("导入成功：" + list.size());
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
	 * 条件查询工资信息
	 * @param salaryInfoForm
	 * @return
	 */
	@RequestMapping("/findSalaryInfoByCondition.salary")
	public String findSalaryInfoByCondition(SalaryInfoForm salaryInfoForm){
		try {
			PageModel<SalaryInfoForm> pageModel = salaryService.findSalaryInfoByCondition(salaryInfoForm);
			Gson gson = new Gson();
			return gson.toJson(pageModel);
		} catch (Exception e) {
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询出错的工资信息
	 * @param salaryInfoForm
	 * @return
	 */
	@RequestMapping("/findSalaryInfoForError.salary")
	public String findSalaryInfoForError(SalaryInfoForm salaryInfoForm){
		try {
			PageModel<SalaryInfoForm> pageModel = salaryService.findSalaryInfoForError(salaryInfoForm);
			Gson gson = new Gson();
			return gson.toJson(pageModel);
		} catch (Exception e) {
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询工资统计信息
	 * @param salaryInfoForm
	 * @return
	 */
	@RequestMapping("/findSalaryInfoByTotal.salary")
	public String findSalaryInfoByTotal(SalaryInfoForm salaryInfoForm){
		try {
			PageModel<SalaryInfoForm> pageModel = salaryService.findSalaryInfoByTotal(salaryInfoForm);
			Gson gson = new Gson();
			return gson.toJson(pageModel);
		} catch (Exception e) {
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询工资日期
	 * @return
	 */
	@RequestMapping("/findMonthDate.salary")
	public String findMonthDate(){
		try {
			List<SalaryInfoForm> list = salaryService.findMonthDate();
			Gson gson = new Gson();
			return gson.toJson(list);
		} catch (Exception e) {
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 更新工资信息
	 * @return
	 */
	@RequestMapping("/updateSalaryInfo.salary")
	public String updateSalaryInfo(SalaryInfoForm salaryInfoForm){
		try {
			salaryService.updateSalaryInfo(salaryInfoForm);
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@RequestMapping("/test.salary")
	public void test() throws Exception{
		SalaryInfoForm salaryInfoForm =new SalaryInfoForm();
		Map<Integer, String> methods = new HashMap<>();
		methods.put(0, "setMonthDate");
		salaryInfoForm.setPropertyMethods(methods);
		salaryInfoForm.setProperty("200202", 0);
		System.out.println(salaryInfoForm.getMonthDate());
	}
	/**
	 * 导出工资记录到Excel
	 * @param salaryInfoForm
	 * @return
	 */
	@RequestMapping("/writeSalaryToExcel.salary")
	public String writeSalaryToExcel(SalaryInfoForm salaryInfoForm,String jsonString,HttpServletRequest request,HttpServletResponse response){
		try {
			String filePath = FileConstant.FILE_PATH + FileConstant.SHORT_TIME_EXCEL + "/" +new Date().getTime() + ".xls";
			salaryService.writeSalaryToExcel(salaryInfoForm,jsonString,filePath);
			FileUtil.download(request, response, filePath, new Date().getTime()+".xls");
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
	 * 打印工资信息表单
	 * @param request
	 * @param response
	 */
	@RequestMapping("/printSalaryInfo.salary")
	public void printSalaryInfo(HttpServletRequest request,HttpServletResponse response){
	    try {
        	    String cptName = StringUtil.getUTU8String(request.getParameter("cptName"));
        	    String monthDate = StringUtil.getUTU8String(request.getParameter("monthDate"));
        	    System.out.println(monthDate);
        	    String url = "/ReportServer?reportlet=" + cptName + ".cpt" + "&monthDate=" + monthDate;
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
	 * 删除未确认工资信息
	 * @param request
	 * @return
	 */
	@RequestMapping("/deleteNotSureData.salary")
	public String deleteNotSureData(HttpServletRequest request){
		try {
			salaryService.deleteNotSureData();
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 确认工资信息
	 * @param request
	 * @return
	 */
	@RequestMapping("/ensureSalaryInfo.salary")
	public String ensureSalaryInfo(HttpServletRequest request){
		try {
			salaryService.ensureSalaryInfo();
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			return Constant.SERVER_ERROR_CODE;
		}
	}
}
