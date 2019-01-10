package com.mdoa.repertory.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.constant.FileConstant;
import com.mdoa.repertory.bo.DynamicBalanceForm;
import com.mdoa.repertory.bo.GoodsForm;
import com.mdoa.repertory.model.RepertoryGoods;
import com.mdoa.repertory.service.GoodsService;
import com.mdoa.security.annotation.ExistPermissions;
import com.mdoa.security.annotation.HasPermissions;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.FileUtil;
import com.mdoa.util.StringUtil;
/**
 * 物品的controller层
 * @author Administrator
 */
@RestController
@RequestMapping("/repertory")
public class GoodsController extends BaseController{
	@Autowired
	private GoodsService goodsService;
	
	/**
	 * 打印物品数据
	 * @param goodsForm
	 * @param request
	 * @param response
	 */
	@RequestMapping("/printGoods.do")
	public void printGoods(HttpServletRequest request,HttpServletResponse response){
	    try {
		String cptName = StringUtil.getUTU8String(request.getParameter("cptName"));
		String goodsName = StringUtil.getUTU8String(request.getParameter("goodsName"));
		String goodsSize = StringUtil.getUTU8String(request.getParameter("goodsSize"));
		String beginNumber = StringUtil.getUTU8String(request.getParameter("beginNumber"));
		String endNumber = StringUtil.getUTU8String(request.getParameter("endNumber"));
		String repertoryId = StringUtil.getUTU8String(request.getParameter("repertoryId"));
		String goodsLack = StringUtil.getUTU8String(request.getParameter("goodsLack"));
		String goodsTypeUrl = StringUtil.getUTU8String(request.getParameter("goodsTypeUrl"));
		String url = "/ReportServer?reportlet=" + cptName + ".cpt"  + "&goodsName=" + goodsName + "&goodsSize=" + goodsSize + "&beginNumber=" + beginNumber
 			+ "&endNumber=" + endNumber  + "&repertoryId=" + repertoryId  + "&goodsLack=" + goodsLack + "&goodsTypeUrl=" + goodsTypeUrl;
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
	 * 导出物品信息到Excel
	 * @param goodsForm
	 * @param jsonString
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/writeGoodsToExcel.do")
	public String writeToExcel(GoodsForm goodsForm,String jsonString,HttpServletRequest request,HttpServletResponse response){
		try {
			String filePath = FileConstant.FILE_PATH + FileConstant.SHORT_TIME_EXCEL + "/" +new Date().getTime() + ".xls";
			goodsService.writeToExcel(goodsForm, jsonString, filePath);
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
	 * 添加物品信息
	 * @param repertoryGoods
	 * @return
	 */
	@ResponseBody
	@RequestMapping("insertGoods.do")
	public String insertGoods(RepertoryGoods repertoryGoods, HttpServletRequest request){
		try{
			UserInfo user = getUser(request);
			repertoryGoods.setCreateUserId(user.getCreateUserId());
			repertoryGoods.setCreateUserName(user.getCreateUserName());
			goodsService.insertGoods(repertoryGoods);
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
	 * 修改物品信息
	 * @param repertoryGoods
	 * @return
	 */
	@ResponseBody
	@RequestMapping("updateGoods.do")
	public String updateGoods(GoodsForm goodsForm, HttpServletRequest request){
		try{
			UserInfo user = getUser(request);
			goodsForm.setUpdateUserId(user.getUpdateUserId());
			goodsForm.setUpdateUserName(user.getUpdateUserName());
			goodsService.updateGoods(goodsForm);
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
	 * 删除物品
	 * @param goodsId
	 * @return
	 */
	@ResponseBody
	@RequestMapping("deleteGoods.do")
	public String deleteGoods(GoodsForm goodsForm, HttpServletRequest request){
		try{
			UserInfo user = getUser(request);
			goodsForm.setUpdateUserId(user.getUpdateUserId());
			goodsForm.setUpdateUserName(user.getUpdateUserName());
			goodsService.deleteGoods(goodsForm);
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
	 * 用户在点击物品的时候，在右侧会显示物品的出入库和仓库的信息
	 * @param goodsId
	 * @return
	 */
	@ResponseBody
	@RequestMapping("selectRecordAndRepertoryById.do")
	public String selectRecordAndRepertoryById(String goodsId){	
		try{
			List<GoodsForm> list = goodsService.selectRecordAndRepertoryById(goodsId);
			Gson gson = new Gson();
			return gson.toJson(list);
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}

	/**
	 * 根据时间去查询物品以及查询条件
	 * @param repertoryGoods
	 * @return
	 */
	@ResponseBody
	@ExistPermissions(permissions = {"admin:repertory:repertoryManage"})
	@RequestMapping("selectGoodsByTime.do")
	public String selectGoodsByTime(GoodsForm goodsForm){
		try{
			PageModel<RepertoryGoods> pageModel = goodsService.selectGoodsByTime(goodsForm);
			Gson gson = new Gson();
			return gson.toJson(pageModel);
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 根据时间去查询物品以及查询条件
	 * @param repertoryGoods
	 * @return
	 */
	@ResponseBody
	@RequestMapping("findSum.do")
	public String findSum(GoodsForm goodsForm){
		try{
			RepertoryGoods repertoryGoods = goodsService.findSum(goodsForm);
			Gson gson = new Gson();
			return gson.toJson(repertoryGoods);
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}

}
