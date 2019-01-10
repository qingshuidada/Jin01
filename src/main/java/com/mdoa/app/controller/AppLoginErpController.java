package com.mdoa.app.controller;

import javax.json.Json;
import javax.servlet.http.HttpServletRequest;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mdoa.app.service.AppLoginErpService;
import com.mdoa.base.model.JsonReturnObject;
import com.mdoa.erp.bo.ErpRegisterForm;
import com.mdoa.security.session.PhSession;
import com.mdoa.security.session.SessionContainer;
import com.mdoa.util.StringUtil;

@RequestMapping("/loginAppErp")
@RestController
public class AppLoginErpController {

	@Autowired
	private AppLoginErpService loginAppErpService;
	
	/**
	 * app业务员登录
	 * @param erpRegisterForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/salesmanLogin.app")
	@ResponseBody
	public String salesmanLogin(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			String key = (String)request.getParameter("sessionId");
			PhSession session = null;
			if(StringUtil.isEmpty(key)){
				session = SessionContainer.createSession();
				request.setAttribute("sessionId", session.getSessionKey());
				jro.setSessionId(session.getSessionKey());
			}else{
				session = SessionContainer.getSession(key);
				if(session == null){
					session = SessionContainer.createSession();
					request.setAttribute("sessionId", session.getSessionKey());
					jro.setSessionId(session.getSessionKey());
				}
			}
			ErpRegisterForm salesman = loginAppErpService.salesmanLogin(erpRegisterForm,session);
			jro.setReturnObj(salesman);
			jro.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	
	@RequestMapping("/error.app")
	public String error(HttpServletRequest request){
		JsonReturnObject jro = (JsonReturnObject)request.getAttribute("jsonReturnObject");
		Gson gson = new Gson();
		return gson.toJson(jro);
	}
	
	/**
	 * app业务员登录
	 * @param erpRegisterForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/customerLogin.app")
	@ResponseBody
	public String customerLogin(ErpRegisterForm erpRegisterForm, HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			String key = (String)request.getParameter("sessionId");
			PhSession session = null;
			if(StringUtil.isEmpty(key)){
				session = SessionContainer.createSession();
				request.setAttribute("sessionId", session.getSessionKey());
				jro.setSessionId(session.getSessionKey());
			}else{
				session = SessionContainer.getSession(key);
				if(session == null){
					session = SessionContainer.createSession();
					request.setAttribute("sessionId", session.getSessionKey());
					jro.setSessionId(session.getSessionKey());
				}
			}
			ErpRegisterForm customer = loginAppErpService.customerLogin(erpRegisterForm,session);
			jro.setReturnObj(customer);
			jro.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	
	
}
