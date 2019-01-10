package com.mdoa.app.controller;

import java.net.URLDecoder;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.google.gson.Gson;
import com.informix.util.stringUtil;
import com.mdoa.base.model.JsonReturnObject;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.erp.bo.ErpRegisterForm;
import com.mdoa.erp.bo.ErpSelectForm;
import com.mdoa.security.session.PhSession;
import com.mdoa.security.session.SessionContainer;
import com.mdoa.app.service.AppSelectErpService;

@RequestMapping("/appSelectErp")
@RestController
public class AppSelectErpController {

	@Autowired
	private AppSelectErpService erpAppService;

	@RequestMapping("/error.app")
	public String error(HttpServletRequest request){
		JsonReturnObject jro = (JsonReturnObject)request.getAttribute("jsonReturnObject");
		Gson gson = new Gson();
		return gson.toJson(jro);
	}
	
	/**
	 * 查询数据库名字
	 */
	@RequestMapping("/queryDataResourceName.app")
	public String queryDataResourceName(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			List<ErpRegisterForm> list = erpAppService.queryDataResourceName(erpRegisterForm);
			jro.setSuccess(true);
			jro.setReturnObj(list);
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
		return gson.toJson(jro);
	}
	/**
	 * 白胚入库明细
	 * @param erpSelectForm
	 * @param request
	 * @return
	 */
	@RequestMapping("queryVbprkmxApp.app")
	public String queryVbprkmxApp(ErpSelectForm erpSelectForm,HttpServletRequest request){
		try {
			String 	dingzi = URLDecoder.decode(erpSelectForm.getDingzi(),"utf-8");
			erpSelectForm.setDingzi(dingzi);
			if (getSubNameFromSession(erpSelectForm,request) == null)
				return null;
			erpSelectForm.setSubNameList(getSubNameFromSession(erpSelectForm,request));
			PageModel<ErpSelectForm> pageModel = erpAppService.queryVbprkmxApp(erpSelectForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 从缓存中取出对应数据库的
	 * @param erpSelectForm 
	 * @param request
	 * @return
	 */
	private List<String> getSubNameFromSession(ErpSelectForm erpSelectForm, HttpServletRequest request) {
		HttpSession session = request.getSession();
		List<String> list = (List<String>) session.getAttribute(erpSelectForm.getDataSourceKey());
		System.out.println("dataKey = "+erpSelectForm.getDataSourceKey());
		System.out.println("哈哈="+session.getAttribute(erpSelectForm.getDataSourceKey()));
		return list;
	}
	/**
	/**
	 * 白胚库存
	 * @param erpSelectForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/queryVbpkc.app")
	public String queryVbpkc(ErpSelectForm erpSelectForm,HttpServletRequest request){
		try {
			String 	dingzi = URLDecoder.decode(erpSelectForm.getDingzi(),"utf-8");
			erpSelectForm.setDingzi(dingzi);
			if (getSubNameFromSession(erpSelectForm,request) == null) 
				return null;
			erpSelectForm.setSubNameList(getSubNameFromSession(erpSelectForm,request));
			PageModel<ErpSelectForm> pageModel = erpAppService.queryVbpkc(erpSelectForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			System.out.println("jsonString="+jsonString);
			return jsonString;
			
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 订单查询
	 * @param erpSelectForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/queryVsaleordermx.app")
	public String queryVsaleordermx(ErpSelectForm erpSelectForm,HttpServletRequest request){
		try {
			String 	dingzi = URLDecoder.decode(erpSelectForm.getDingzi(),"utf-8");
			erpSelectForm.setDingzi(dingzi);
			if (getSubNameFromSession(erpSelectForm,request) == null) 
				return null;
			erpSelectForm.setSubNameList(getSubNameFromSession(erpSelectForm,request));
			PageModel<ErpSelectForm> pageModel = erpAppService.queryVsaleordermx(erpSelectForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 生产进度
	 * @param erpSelectForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/queryVkasheng.app")
	public String queryVkasheng(ErpSelectForm erpSelectForm,HttpServletRequest request){
		try {
			String 	dingzi = URLDecoder.decode(erpSelectForm.getDingzi(),"utf-8");
			erpSelectForm.setDingzi(dingzi);
			if (getSubNameFromSession(erpSelectForm,request) == null) 
				return null;
			erpSelectForm.setSubNameList(getSubNameFromSession(erpSelectForm,request));
			PageModel<ErpSelectForm> pageModel = erpAppService.queryVkasheng(erpSelectForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 成品入库明细
	 * @param erpSelectForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/queryVspinput.app")
	public String queryVspinput(ErpSelectForm erpSelectForm,HttpServletRequest request){
		try {
			String 	dingzi = URLDecoder.decode(erpSelectForm.getDingzi(),"utf-8");
			erpSelectForm.setDingzi(dingzi);
			if (getSubNameFromSession(erpSelectForm,request) == null) 
				return null;
			erpSelectForm.setSubNameList(getSubNameFromSession(erpSelectForm,request));
			PageModel<ErpSelectForm> pageModel = erpAppService.queryVspinput(erpSelectForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 成品库存
	 * @param erpSelectForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/queryVspkc.app")
	public String queryVspkc(ErpSelectForm erpSelectForm,HttpServletRequest request){
		try {
			//@SuppressWarnings("unused")
			String 	dingzi = URLDecoder.decode(erpSelectForm.getDingzi(),"utf-8");
			erpSelectForm.setDingzi(dingzi);
			if (getSubNameFromSession(erpSelectForm,request) == null) 
				return null;
			erpSelectForm.setSubNameList(getSubNameFromSession(erpSelectForm,request));
			PageModel<ErpSelectForm> pageModel = erpAppService.queryVspkc(erpSelectForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 工序
	 * @param erpSelectForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/queryVkashenggx.app")
	public String queryVkashenggx(ErpSelectForm erpSelectForm,HttpServletRequest request){
		try {
			if (getSubNameFromSession(erpSelectForm,request) == null) 
				return null;
			erpSelectForm.setSubNameList(getSubNameFromSession(erpSelectForm,request));
			List<ErpSelectForm> list = erpAppService.queryVkashenggx(erpSelectForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(list);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 客户查询
	 * @param erpRegisterForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/queryCustomerBySalesman.erp")
	public String queryCustomerBySalesman(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
		try {
			HttpSession session = request.getSession();
			System.out.println(session.getAttribute("salesmanId"));
			erpRegisterForm.setSalesmanId((String)session.getAttribute("salesmanId"));
			PageModel<ErpRegisterForm> pageModel = erpAppService.queryCustomerBySalesman(erpRegisterForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			System.out.println(jsonString);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	} 
	

}
