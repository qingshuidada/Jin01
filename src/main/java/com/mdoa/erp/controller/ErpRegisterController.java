package com.mdoa.erp.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.JsonReturnObject;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.erp.bo.ErpRegisterForm;
import com.mdoa.erp.service.ErpRegisterService;
import com.mdoa.security.annotation.HasPermissions;
import com.mdoa.user.model.UserInfo;
import com.mdoa.weixin.bo.WeixinForm;

@RequestMapping("/erpRegister")
@RestController
public class ErpRegisterController extends BaseController{

	@Autowired
	private ErpRegisterService erpRegisterService;
	
	/**
	 * 查询数据库名字
	 */
	@RequestMapping("/queryDataResourceName.do")
	public String queryDataResourceName(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
		try {
			System.out.println("呵呵呵呵");
			List<ErpRegisterForm> list = erpRegisterService.queryDataResourceName(erpRegisterForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(list);
			System.out.println(jsonString);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
		
	}
	/**
	 * 添加父业务员
	 */
	@RequestMapping("/addParentSalesman.do")
	@HasPermissions(permissions = { "admin:erp:erpRegister:salesmanRegister:add" })
	public String addParentSalesman(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			erpRegisterForm.setCreateUserId(userInfo.getUserId());
			erpRegisterForm.setCreateUserName(userInfo.getUserName());
			String string = erpRegisterService.addParentSalesman(erpRegisterForm);
			return string;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 添加子业务员
	 */
	@RequestMapping("/addSubSalesman.do")
	@HasPermissions(permissions = { "admin:erp:erpRegister:salesmanRegister:manage" })
	public String addSubSalesman(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			erpRegisterForm.setCreateUserId(userInfo.getUserId());
			erpRegisterForm.setCreateUserName(userInfo.getUserName());
			erpRegisterService.addSubSalesman(erpRegisterForm);
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
	 * 查询父业务员
	 */
	@RequestMapping("/queryParentSalesman.do")
	public String queryParentSalesman(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
		try {
			PageModel<ErpRegisterForm> pageModel = erpRegisterService.queryParentSalesman(erpRegisterForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 查询子业务员
	 */
	@RequestMapping("/querySubSalesman.do")
	public String querySubSalesman(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
		try {
			PageModel<ErpRegisterForm> pageModel = erpRegisterService.querySubSalesman(erpRegisterForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 删除父业务员
	 */
	@RequestMapping("/deleteParentSalesman.do")
	@HasPermissions(permissions = { "admin:erp:erpRegister:salesmanRegister:delete" })
	public String deleteParentSalesman(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			erpRegisterForm.setUpdateUserId(userInfo.getUserId());
			erpRegisterForm.setUpdateUserName(userInfo.getUserName());
			erpRegisterService.deleteParentSalesman(erpRegisterForm);
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
	 * 删除子业务员
	 */
	@RequestMapping("/deleteSubSalesman.do")
	@HasPermissions(permissions = { "admin:erp:erpRegister:salesmanRegister:manage" })
	public String deleteSubSalesman(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			erpRegisterForm.setUpdateUserId(userInfo.getUserId());
			erpRegisterForm.setUpdateUserName(userInfo.getUserName());
			erpRegisterService.deleteSubSalesman(erpRegisterForm);
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
	 * 添加父客户
	 */
	@RequestMapping("/addParentCustomer.do")
	@HasPermissions(permissions = { "admin:erp:erpRegister:clientRegister:add" })
	public String addParentCustomer(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			erpRegisterForm.setCreateUserId(userInfo.getUserId());
			erpRegisterForm.setCreateUserName(userInfo.getUserName());
			erpRegisterService.addParentCustomer(erpRegisterForm);
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
	 * 添加子客户
	 */
	@RequestMapping("/addSubCustomer.do")
	@HasPermissions(permissions = { "admin:erp:erpRegister:clientRegister:manage" })
	public String addSubCustomer(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			erpRegisterForm.setCreateUserId(userInfo.getUserId());
			erpRegisterForm.setCreateUserName(userInfo.getUserName());
			erpRegisterService.addSubCustomer(erpRegisterForm);
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
	 * 查询父客户
	 */
	@RequestMapping("/queryParentCustomer.do")
	public String queryParentCustomer(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
		try {
			PageModel<ErpRegisterForm> pageModel = erpRegisterService.queryParentCustomer(erpRegisterForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 查询子客户
	 */
	@RequestMapping("/querySubCustomer.do")
	public String querySubCustomer(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
		try {
			PageModel<ErpRegisterForm> pageModel = erpRegisterService.querySubCustomer(erpRegisterForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 修改客户
	 */
	@RequestMapping("/updateParentCustomer.do")
	@HasPermissions(permissions = { "admin:erp:erpRegister:clientRegister:update" })
	public String updateParentCustomer(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			erpRegisterForm.setUpdateUserId(userInfo.getUserId());
			erpRegisterForm.setUpdateUserName(userInfo.getUserName());
			erpRegisterForm.setCreateUserId(userInfo.getUserId());
			erpRegisterForm.setCreateUserName(userInfo.getUserName());
			erpRegisterService.updateParentCustomer(erpRegisterForm);
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
	 * 删除父客户
	 */
	@RequestMapping("/deleteParentCustomer.do")
	@HasPermissions(permissions = { "admin:erp:erpRegister:clientRegister:delete" })
	public String deleteParentCustomer(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			erpRegisterForm.setUpdateUserId(userInfo.getUserId());
			erpRegisterForm.setUpdateUserName(userInfo.getUserName());
			erpRegisterService.deleteParentCustomer(erpRegisterForm);
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
	 * 删除子客户
	 */
	@RequestMapping("/deleteSubCustomer.do")
	@HasPermissions(permissions = { "admin:erp:erpRegister:clientRegister:manage" })
	public String deleteSubCustomer(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			erpRegisterForm.setUpdateUserId(userInfo.getUserId());
			erpRegisterForm.setUpdateUserName(userInfo.getUserName());
			erpRegisterService.deleteSubCustomer(erpRegisterForm);
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
	 * 修改客户密码
	 */
	@RequestMapping("/updateParentCustomerPassword.do")
	public String updateParentCustomerPassword(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			erpRegisterForm.setUpdateUserId(userInfo.getUserId());
			erpRegisterForm.setUpdateUserName(userInfo.getUserName());
			erpRegisterService.updateParentCustomerPassword(erpRegisterForm);
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	@RequestMapping("/updateParentCustomerPasswordErp.erp")
	public String updateParentCustomerPasswordErp(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
		try {
			/*UserInfo userInfo = getUser(request);
			erpRegisterForm.setUpdateUserId(userInfo.getUserId());
			erpRegisterForm.setUpdateUserName(userInfo.getUserName());*/
			erpRegisterService.updateParentCustomerPassword(erpRegisterForm);
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
	 * 修改业务员密码
	 */
	@RequestMapping("/updateSalesmanPassword.erp")
	public String updateSalesmanPassword(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
		try {
			/*UserInfo userInfo = getUser(request);
			erpRegisterForm.setUpdateUserId(userInfo.getUserId());
			erpRegisterForm.setUpdateUserName(userInfo.getUserName());*/
			erpRegisterService.updateSalesmanPassword(erpRegisterForm);
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
	 * 解除绑定
	 */
	@RequestMapping("/unBind.do")
	public String unBind(HttpServletRequest request,HttpServletResponse response,WeixinForm weixinForm){
	    JsonReturnObject jro = new JsonReturnObject();
	    try {
        		erpRegisterService.unBind(weixinForm);
        		jro.setSuccess(true);
        	} catch (RuntimeException e) {
        		e.printStackTrace();
        		jro.setSuccess(false);
        		jro.setMessage(e.getMessage());
        	} catch (Exception e) {
        		e.printStackTrace();
        		jro.setSuccess(false);
        		jro.setMessage(e.getMessage());
        	}
	    return new Gson().toJson(jro);
	}
	
	@RequestMapping("/selectRepotAuthorityUser.do")
	public String selectRepotAuthorityUser(UserInfo userInfo){
		Gson gson = new Gson();
		try {
			PageModel<UserInfo> pageModel = erpRegisterService.selectRepotAuthorityUser(userInfo);
			return gson.toJson(pageModel);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@RequestMapping("/updateReportAuthorityFlag.do")
	public String updateReportAuthorityFlag(UserInfo info){
		try {
			erpRegisterService.updateReportAuthorityFlag(info);
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
}
