package com.mdoa.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.admin.model.InStockModel;
import com.mdoa.admin.model.OfficeSupplies;
import com.mdoa.admin.model.SuppliesApply;
import com.mdoa.admin.service.SuppliesService;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;

@RestController
@RequestMapping("/admin")
public class SuppliesController {
	@Autowired
	private SuppliesService suppliesService;
	
	/**
	 * 添加办公用品
	 * @param officeSupplies
	 * @return
	 */
	@RequestMapping("/insertOfficeSupplies.do")
	public String insertOfficeSupplies(OfficeSupplies officeSupplies){
		try{
			suppliesService.insertOfficeSupplies(officeSupplies);
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
	 * 删除办公用品
	 * @param officeSupplies
	 * @return
	 */
	@RequestMapping("/deleteOfficeSupplies.do")
	public String deleteOfficeSupplies(OfficeSupplies officeSupplies){
		try{
			suppliesService.deleteOfficeSupplies(officeSupplies);
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
	 * 修改办公用品
	 * @param officeSupplies
	 * @return
	 */
	@RequestMapping("/updateOfficeSupplies.do")
	public String updateOfficeSupplies(OfficeSupplies officeSupplies){
		try{
			suppliesService.updateOfficeSupplies(officeSupplies);
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
	 * 查询办公用品
	 * @param officeSupplies
	 * @return
	 */
	@RequestMapping("/selectOfficeSupplies.do")
	public String selectOfficeSupplies(OfficeSupplies officeSupplies){
		try{
			PageModel<OfficeSupplies> pageModel = suppliesService.selectOfficeSupplies(officeSupplies);
			Gson gson = new Gson();
			return gson.toJson(pageModel);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
		
	}
	
	/**
	 * 添加入库单
	 * @param officeSupplies
	 * @return
	 */
	@RequestMapping("/addInStock.do")
	public String addInStock(InStockModel stockModel){
		try{
			suppliesService.addInStock(stockModel);
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
	 * 添加入库单
	 * @param officeSupplies
	 * @return
	 */
	@RequestMapping("/deleteInStock.do")
	public String deleteInStock(InStockModel stockModel){
		try{
			suppliesService.deleteInStock(stockModel);
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
	 * 更新入库单
	 * @param officeSupplies
	 * @return
	 */
	@RequestMapping("/updateInStock.do")
	public String updateInStock(InStockModel stockModel){
		try{
			suppliesService.updateInStock(stockModel);
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
	 * 入库单
	 * @param officeSupplies
	 * @return
	 */
	@RequestMapping("/selectInStock.do")
	public String selectInStock(InStockModel stockModel){
		try{
			PageModel<InStockModel> pageModel = suppliesService.selectInStock(stockModel);
			Gson gson = new Gson();
			return gson.toJson(pageModel);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
		
	}
	
	/**
	 * 添加申请单
	 * @param officeSupplies
	 * @return
	 */
	@RequestMapping("/addSuppliesApply.do")
	public String addSuppliesApply(SuppliesApply suppliesApply){	
		try{
			suppliesService.addSuppliesApply(suppliesApply);
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
	 *  可以删除 alive_flag = 0
	 * @param suppliesApply
	 * @return
	 */
	@RequestMapping("/deleteSuppliesApply.do")
	public String deleteSuppliesApply(SuppliesApply suppliesApply){	
		try{
			suppliesService.deleteSuppliesApply(suppliesApply);
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
	 *
	 * 更改此申请的状态   approval_status 0 审批中 1 审批通过 2 审批不通过
	 * @param officeSupplies
	 * @return
	 */
	@RequestMapping("/updateSuppliesApply.do")
	public String updateSuppliesApply(SuppliesApply suppliesApply){	
		try{
			suppliesService.updateSuppliesApply(suppliesApply);
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
	 * 查询申请单
	 * @param officeSupplies
	 * @return
	 */
	@RequestMapping("/selectSuppliesApply.do")
	public String selectSuppliesApply(SuppliesApply suppliesApply){	
		try{
			PageModel<SuppliesApply> pageModel = suppliesService.selectSuppliesApply(suppliesApply);
			Gson gson = new Gson();
			return gson.toJson(pageModel);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
	
	
}
