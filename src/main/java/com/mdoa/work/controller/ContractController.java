package com.mdoa.work.controller;


import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.security.annotation.HasPermissions;
import com.mdoa.user.model.UserInfo;
import com.mdoa.work.bo.ContractForm;
import com.mdoa.work.bo.ContractRecordForm;
import com.mdoa.work.model.Contract;
import com.mdoa.work.model.ContractPayRecord;
import com.mdoa.work.model.ContractRecord;
import com.mdoa.work.service.ContractService;

@RestController
@RequestMapping("/contract")
public class ContractController extends BaseController{

	@Autowired
	private ContractService contractService;
	
	/**
	 * 合同到期提醒
	 */
	@RequestMapping("/contractRemind.do")
	public String contractRemind(ContractForm contractForm){

		Gson gson = new Gson();
		try {
			PageModel<Contract> list = contractService.findExpireContract(contractForm);
			return gson.toJson(list);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 添加合同
	 * @param request
	 * @param contractForm
	 * @return
	 */
	@RequestMapping("/addContract.do")
	@HasPermissions(permissions = { "admin:workOfficeDoc:contractManage:contractManage:add" })
	private String addContract(HttpServletRequest request , ContractForm contractForm){
		UserInfo userInfo = getUser(request);
		try {
			contractForm.setCreateUserId(userInfo.getUserId());
			contractForm.setCreateUserName(userInfo.getUserName());
			contractService.addContract(contractForm);
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
	 * 合同交单 弃用
	 * @param request
	 * @param contractForm
	 * @return
	 */
	private String presentContract(HttpServletRequest request , ContractForm contractForm){
		UserInfo userInfo = getUser(request);
		try {
			contractForm.setUpdateUserId(userInfo.getUserId());
			contractForm.setUpdateUserName(userInfo.getUserName());
			contractService.presentContract(contractForm);
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
	 * 关闭合同
	 * @param request
	 * @param contractForm
	 * @return
	 */
	@RequestMapping("/closeContract.do")
	@HasPermissions(permissions = { "admin:workOfficeDoc:contractManage:contractManage:close" })
	private String closeContract(HttpServletRequest request , ContractForm contractForm){
		UserInfo userInfo = getUser(request);
		try {
			contractForm.setUpdateUserId(userInfo.getUserId());
			contractForm.setUpdateUserName(userInfo.getUserName());
			contractService.closeContract(contractForm);
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
	 * 查询合同
	 * @param request
	 * @param contractForm
	 * @return
	 */
	@RequestMapping("/selectContract.do")
	private String selectContract(ContractForm contractForm){
		Gson gson = new Gson();
		try {
			PageModel<Contract> list = contractService.selectContract(contractForm);
			return gson.toJson(list);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 提交合同记录
	 * @param contractRecordForm
	 * @return
	 */
	@RequestMapping("/addRecord.do")
	@HasPermissions(permissions = { "admin:workOfficeDoc:contractManage:contractManage:documentary" })
	private String addRecord(HttpServletRequest request , ContractRecordForm contractRecordForm){
		UserInfo userInfo = getUser(request);
		try {
			contractRecordForm.setOrderExecutorId(userInfo.getUserId());
			contractService.addRecord(contractRecordForm);
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
	 * 查询合同记录
	 * @param request
	 * @param contractForm
	 * @return
	 */
	@RequestMapping("/selectRecord.do")
	private String selectRecord(ContractRecordForm contractRecordForm){
		Gson gson = new Gson();
		try {
			PageModel<ContractRecord> list = contractService.selectRecord(contractRecordForm);
			return gson.toJson(list);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 修改合同
	 * @param request
	 * @param contractForm
	 * @return
	 */
	@RequestMapping("/editContract.do")
	private String editContract(HttpServletRequest request , ContractForm contractForm){
		UserInfo userInfo = getUser(request);
		try {
			contractForm.setUpdateUserId(userInfo.getUserId());
			contractForm.setUpdateUserName(userInfo.getUserName());
			contractService.editContract(contractForm);
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
	 * 用户支付合同金额
	 * @param contractForm
	 * @return
	 */
	@RequestMapping("contractPayment.do")
	private String contractPayment(ContractForm contractForm){
		try {
			contractService.contractPayment(contractForm);
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
	 * 查询合同记录
	 * @param request
	 * @param contractForm
	 * @return
	 */
	@RequestMapping("/findPayRecordById.do")
	private String findPayRecordById(ContractForm contractForm){
		Gson gson = new Gson();
		try {
			PageModel<ContractPayRecord> list = contractService.findPayRecordById(contractForm);
			return gson.toJson(list);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
}
