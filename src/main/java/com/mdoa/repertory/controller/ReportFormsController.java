package com.mdoa.repertory.controller;

import java.util.Date;
import java.util.List;

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
import com.mdoa.repertory.bo.DynamicBalanceForm;
import com.mdoa.repertory.bo.GoodsMonthBalanceForm;
import com.mdoa.repertory.bo.GoodsPriceForm;
import com.mdoa.repertory.bo.GoodsReportFormsForm;
import com.mdoa.repertory.bo.TypeMonthBalanceForm;
import com.mdoa.repertory.form.DepartmentUseDataForm;
import com.mdoa.repertory.model.RepertoryGoodsMonthBalance;
import com.mdoa.repertory.model.crosstab.CrosstabModel;
import com.mdoa.repertory.model.highcharts.CastGraphicModel;
import com.mdoa.repertory.model.highcharts.FoldLineModel;
import com.mdoa.repertory.model.highcharts.LineGraphicModel;
import com.mdoa.repertory.service.ReportFormsService;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.ExcelUtil;
import com.mdoa.util.FileUtil;
import com.mdoa.util.StringUtil;

/**
 * 报表相关Controller
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/reportForms")
public class ReportFormsController extends BaseController{
	
	@Autowired
	private ReportFormsService reportFormsService;
	
	/**
	 * 导出物品月报表到Excel
	 * @param jsonString
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/writeMonthFormToExcel.do")
	public String writeMonthFormToExcel(GoodsMonthBalanceForm goodsMonthBalanceForm,String jsonString,HttpServletRequest request,HttpServletResponse response){
		try {
			String filePath = FileConstant.FILE_PATH + FileConstant.SHORT_TIME_EXCEL + "/" +new Date().getTime() + ".xls";
			reportFormsService.writeMonthFormToExcel(goodsMonthBalanceForm, jsonString, filePath);
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
	 * 导出物品类别月报表到Excel
	 * @param jsonString
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/writeTypeMonthFormToExcel.do")
	public String writeTypeMonthFormToExcel(TypeMonthBalanceForm typeMonthBalanceForm,String jsonString,HttpServletRequest request,HttpServletResponse response){
		try {
			String filePath = FileConstant.FILE_PATH + FileConstant.SHORT_TIME_EXCEL + "/" +new Date().getTime() + ".xls";
			reportFormsService.writeTypeMonthFormToExcel(typeMonthBalanceForm, jsonString, filePath);
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
	 * 导出动态报表到Excel
	 * @param jsonString
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/writeVariationFormToExcel.do")
	public String writeVariationFormToExcel(DynamicBalanceForm dynamicBalanceForm,String jsonString,HttpServletRequest request,HttpServletResponse response){
		try {
			String filePath = FileConstant.FILE_PATH + FileConstant.SHORT_TIME_EXCEL + "/" +new Date().getTime() + ".xls";
			reportFormsService.writeVariationFormToExcel(dynamicBalanceForm, jsonString, filePath);
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
	 * 获取价格走势数据
	 */
	@RequestMapping("/getPriceTrendData.do")
	public String getPriceTrendData(GoodsPriceForm goodsPriceForm){
		try {
			FoldLineModel foldLineModel=reportFormsService.getPriceTrendData(goodsPriceForm);
			Gson gson=new Gson();
			String jsonString = gson.toJson(foldLineModel);
			return jsonString;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 查询物品领用报表数据的方法
	 * @param goodsReportFormsForm
	 * @return
	 */
	@RequestMapping("/findGoodsReportByCondition.do")
	public String findGoodsReportByCondition(GoodsReportFormsForm goodsReportFormsForm){
		try {
			CastGraphicModel castGraphicModel = reportFormsService.findGoodsReportByCondition(goodsReportFormsForm);
			Gson gson = new Gson();
			return gson.toJson(castGraphicModel);
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询物品月结报表的方法
	 * @return
	 */
	@RequestMapping("/findGoodsMonthBalanceByCondition.do")
	public String findGoodsMonthBalanceByCondition(GoodsMonthBalanceForm goodsMonthBalanceForm){
		try {
			PageModel<RepertoryGoodsMonthBalance> pageInfo = reportFormsService.findGoodsMonthBalanceByCondition(goodsMonthBalanceForm);
			Gson gson = new Gson();
			return gson.toJson(pageInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询物品月结报表汇总
	 * @return
	 */
	@RequestMapping("/findSumGoodsMonthBalance.do")
	public String findSumGoodsMonthBalance(GoodsMonthBalanceForm goodsMonthBalanceForm){
		try {
			RepertoryGoodsMonthBalance goodsMonthBalance = reportFormsService.findSumGoodsMonthBalance(goodsMonthBalanceForm);
			Gson gson = new Gson();
			return gson.toJson(goodsMonthBalance);
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 开始月结的方法
	 * 传参 startTime endTime lastBalanceTime 
	 * @return
	 */
	@RequestMapping("/startMonthBalance.do")
	public String startMonthBalance(GoodsMonthBalanceForm goodsMonthBalanceForm, HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			goodsMonthBalanceForm.setUserId(userInfo.getUserId());
			goodsMonthBalanceForm.setUserName(userInfo.getUserName());
			reportFormsService.startMonthBalance(goodsMonthBalanceForm);
			return Constant.SUCCESS_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 撤回上次月结操作的方法
	 * @param goodsMonthBalanceForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/withdrawLastMonthBalance.do")
	public String withdrawLastMonthBalance(GoodsMonthBalanceForm goodsMonthBalanceForm, HttpServletRequest request){
	    try {
		UserInfo userInfo = getUser(request);
		goodsMonthBalanceForm.setUserId(userInfo.getUserId());
		goodsMonthBalanceForm.setUserName(userInfo.getUserName());
		reportFormsService.withdrawLastMonthBalance(goodsMonthBalanceForm);
		return Constant.SUCCESS_CODE;
	} catch (Exception e) {
		e.printStackTrace();
		return Constant.SERVER_ERROR_CODE;
	}
	}
	
	/**
	 * 查询动态报表的方法
	 * @param dynamicBalanceForm
	 * @return
	 */
	@RequestMapping("/findDynamicBalance.do")
	public String findDynamicBalance(DynamicBalanceForm dynamicBalanceForm){
		try {
			PageModel<RepertoryGoodsMonthBalance> pageInfo = reportFormsService.findDynamicBalance(dynamicBalanceForm);
			Gson gson = new Gson();
			return gson.toJson(pageInfo);
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询动态报表汇总
	 * @param dynamicBalanceForm
	 * @return
	 */
	@RequestMapping("/findSumDynamicBalance.do")
	public String findSumDynamicBalance(DynamicBalanceForm dynamicBalanceForm){
		try {
			RepertoryGoodsMonthBalance monthBalance = reportFormsService.findSumDynamicBalance(dynamicBalanceForm);
			Gson gson = new Gson();
			return gson.toJson(monthBalance);
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询分类月结报表的方法
	 * @param typeMonthBalanceForm
	 * @return
	 */
	@RequestMapping("/findTypeMonthBalanceByCondition.do")
	public String findTypeMonthBalanceByCondition(TypeMonthBalanceForm typeMonthBalanceForm){
		try {
			PageModel<TypeMonthBalanceForm> pageInfo = reportFormsService.findTypeMonthBalanceByCondition(typeMonthBalanceForm);
			Gson gson = new Gson();
			return gson.toJson(pageInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询分类物品领用入库走势图数据的方法
	 * @param goodsTypeUrl
	 * @return
	 */
	@RequestMapping("/findTypeReportByCondition.do")
	public String findTypeReportByCondition(String goodsTypeUrl){
		try {
			LineGraphicModel lineGraphicModel = reportFormsService.findTypeReportByCondition(goodsTypeUrl);
			Gson gson = new Gson();
			return gson.toJson(lineGraphicModel);
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询月结日期 
	 * @return
	 */
	@RequestMapping("/findMonthBalanceTime.do")
	public String findMonthBalanceTime(){
		try {
			List<String> dates = reportFormsService.findMonthBalanceTime();
			Gson gson = new Gson();
			return gson.toJson(dates);
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询最后一次月结日期 
	 * @return
	 */
	@RequestMapping("/findLastMonthBalanceTime.do")
	public String findLastMonthBalanceTime(){
		try {
			String date = reportFormsService.findLastMonthBalanceTime();
			return date;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询部门领用各物品类的总金额
	 */
	@RequestMapping("/selectAmountByDepartmentId.do")
	public String selectAmountByDepartmentId(DepartmentUseDataForm departmentUseDataForm){
		try {
			CrosstabModel model=reportFormsService.selectAmountByDepartmentId(departmentUseDataForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(model);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 导出Excel部门领用各物品类的总金额
	 */
	@RequestMapping("/exportAmountByDepartmentIdExcel.do")
	public String exportAmountByDepartmentIdExcel(DepartmentUseDataForm departmentUseDataForm,
			HttpServletRequest request, HttpServletResponse response){
		try {
			CrosstabModel model = reportFormsService.selectAmountByDepartmentId(departmentUseDataForm);
			String fileUrl = FileConstant.FILE_PATH+FileConstant.SHORT_TIME_EXCEL+System.currentTimeMillis()+".xls";
			ExcelUtil.writeCrosstabToExcel(fileUrl, model);
			FileUtil.download(request, response, fileUrl, new Date().getTime()+".xls");
			return Constant.SUCCESS_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 获取部门物品领用报表
	 * goodsDeptGetForm
	 */
	@RequestMapping("goodsDeptGetForm.do")
	public String goodsDeptGetForm(DepartmentUseDataForm departmentUseDataForm){
		try{
			CrosstabModel model = reportFormsService.goodsDeptGetForm(departmentUseDataForm);
			Gson gson = new Gson();
			String json = gson.toJson(model);
			System.out.println(json);
			return json;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 导出Excel部门领用各物品类的总金额
	 */
	@RequestMapping("/exportGoodsDeptGetExcel.do")
	public String exportGoodsDeptGetExcel(DepartmentUseDataForm departmentUseDataForm,
			HttpServletRequest request, HttpServletResponse response){
		try {
			CrosstabModel model = reportFormsService.goodsDeptGetForm(departmentUseDataForm);
			String fileUrl = FileConstant.FILE_PATH+FileConstant.SHORT_TIME_EXCEL+System.currentTimeMillis()+".xls";
			ExcelUtil.writeCrosstabToExcel(fileUrl, model);
			FileUtil.download(request, response, fileUrl, new Date().getTime()+".xls");
			return Constant.SUCCESS_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 打印物品类别月结报表
	 * @param typeMonthBalanceForm
	 * @param request
	 * @param response
	 */
	@RequestMapping("/printTypeMonthForm.do")
	public void printTypeMonthForm(HttpServletRequest request,HttpServletResponse response){
	    try {
		String cptName = StringUtil.getUTU8String(request.getParameter("cptName"));
		String monthBalanceTime = StringUtil.getUTU8String(request.getParameter("monthBalanceTime"));
		String url = "/ReportServer?reportlet=" + cptName + ".cpt" + "&monthBalanceTime=" + monthBalanceTime;
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
	 * 打印物品月结报表
	 * @param typeMonthBalanceForm
	 * @param request
	 * @param response
	 */
	@RequestMapping("/printGoodsMonthForm.do")
	public void printGoodsMonthForm(HttpServletRequest request,HttpServletResponse response){
	    try {
		String cptName = StringUtil.getUTU8String(request.getParameter("cptName"));
		String goodsName = StringUtil.getUTU8String(request.getParameter("goodsName"));
		String goodsSize = StringUtil.getUTU8String(request.getParameter("goodsSize"));
		String monthBalanceTime = StringUtil.getUTU8String(request.getParameter("monthBalanceTime"));
		String url = "/ReportServer?reportlet=" + cptName + ".cpt" + "&goodName=" + goodsName + "&monthBalanceTime=" + monthBalanceTime + "&goodsSize=" + goodsSize;
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
	 * 打印动态报表
	 * @param typeMonthBalanceForm
	 * @param request
	 * @param response
	 */
	@RequestMapping("/printGoodsVariationForm.do")
	public void printGoodsVariationForm(HttpServletRequest request,HttpServletResponse response){
	    try {
		String cptName = StringUtil.getUTU8String(request.getParameter("cptName"));
		String goodsName = StringUtil.getUTU8String(request.getParameter("goodsName"));
		String goodsSize = StringUtil.getUTU8String(request.getParameter("goodsSize"));
		String startTime = StringUtil.getUTU8String(request.getParameter("startTime"));
		String endTime = StringUtil.getUTU8String(request.getParameter("endTime"));
		String goodsTypeUrls = StringUtil.getUTU8String(request.getParameter("goodsTypeUrls"));
		if(StringUtil.isEmpty(startTime) || StringUtil.isEmpty(endTime))
		    return;
		if(StringUtil.isEmpty(goodsTypeUrls)){
		    goodsTypeUrls = "'0'";
		}
		String url = "/ReportServer?reportlet=" + cptName + ".cpt" + "&goodName=" + goodsName + "&startTime=" + startTime + "&goodsSize=" + goodsSize
			+ "&endTime=" + endTime + "&goodsTypeUrls=" + goodsTypeUrls;
		try {
			request.getRequestDispatcher(url).forward(request, response);
		} catch (ServletException e) {
			e.printStackTrace();
		};
	    } catch (Exception e) {
		e.printStackTrace();
	    }
	}
	
	
}
