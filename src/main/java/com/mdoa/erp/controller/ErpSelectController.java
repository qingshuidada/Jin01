package com.mdoa.erp.controller;


import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.pagehelper.Page;
import com.google.gson.Gson;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.erp.bo.ErpRegisterForm;
import com.mdoa.erp.bo.ErpSelectForm;
import com.mdoa.erp.service.ErpSelectService;

@RestController
@RequestMapping("/erpSelect")
public class ErpSelectController {

	@Autowired
	private ErpSelectService erpSelectService;
	
	/**
	 * 查询数据库名字
	 */
	@RequestMapping("/queryDataResourceName1.erp")
	public String queryDataResourceName(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
		try {
			Gson gson = new Gson();
			List<ErpRegisterForm> list = erpSelectService.queryDataResourceName(erpRegisterForm);
			//PageModel<ErpRegisterForm> pageModel = new PageModel<>((Page<ErpRegisterForm>)list);
			String jsonString = gson.toJson(list);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
		
	}
	/**
	 * 白胚入库明细
	 */ 
	@RequestMapping("/queryVbprkmx.erp")
	public String queryVbprkmx(ErpSelectForm erpSelectForm,HttpServletRequest request){
		try {
			System.out.println("111"+erpSelectForm.getKehuFlag()+","+erpSelectForm.getDataSourceKey());
			System.out.println("时间="+erpSelectForm.getRiqi());
			if (getSubNameFromSession(erpSelectForm,request) == null)
				return null;
			erpSelectForm.setSubNameList(getSubNameFromSession(erpSelectForm,request));
			PageModel<ErpSelectForm> pageModel = erpSelectService.queryVbprkmx(erpSelectForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	@RequestMapping("/queryVbprkmxOA.erp")
	public String queryVbprkmxOA(ErpSelectForm erpSelectForm,HttpServletRequest request){
	    try {
		PageModel<ErpSelectForm> pageModel = erpSelectService.queryVbprkmx(erpSelectForm);
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
	 * 白胚库存
	 */
	@RequestMapping("/queryVbpkc.erp")
	public String queryVbpkc(ErpSelectForm erpSelectForm,HttpServletRequest request){
		try {
			if (getSubNameFromSession(erpSelectForm,request) == null) 
				return null;
			erpSelectForm.setSubNameList(getSubNameFromSession(erpSelectForm,request));
			PageModel<ErpSelectForm> pageModel = erpSelectService.queryVbpkc(erpSelectForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			System.out.println("jsonString="+jsonString);
			return jsonString;
			
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	@RequestMapping("/queryVbpkcOA.erp")
	public String queryVbpkcOA(ErpSelectForm erpSelectForm,HttpServletRequest request){
	    try {
		PageModel<ErpSelectForm> pageModel = erpSelectService.queryVbpkc(erpSelectForm);
		Gson gson = new Gson();
		String jsonString = gson.toJson(pageModel);
		
		return jsonString;
	    } catch (Exception e) {
		e.printStackTrace();
		return Constant.SERVER_ERROR_CODE;
	    }
	    
	}
	/**
	 * 订单查询
	 */
	@RequestMapping("/queryVsaleordermx.erp")
	public String queryVsaleordermx(ErpSelectForm erpSelectForm,HttpServletRequest request){
		try {
			if (getSubNameFromSession(erpSelectForm,request) == null) 
				return null;
			erpSelectForm.setSubNameList(getSubNameFromSession(erpSelectForm,request));
			PageModel<ErpSelectForm> pageModel = erpSelectService.queryVsaleordermx(erpSelectForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	@RequestMapping("/queryVsaleordermxOA.erp")
	public String queryVsaleordermxOA(ErpSelectForm erpSelectForm,HttpServletRequest request){
	    try {
		PageModel<ErpSelectForm> pageModel = erpSelectService.queryVsaleordermx(erpSelectForm);
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
	 */
	@RequestMapping("/queryVkasheng.erp")
	public String queryVkasheng(ErpSelectForm erpSelectForm,HttpServletRequest request){
		try {
			if (getSubNameFromSession(erpSelectForm,request) == null) 
				return null;
			erpSelectForm.setSubNameList(getSubNameFromSession(erpSelectForm,request));
			PageModel<ErpSelectForm> pageModel = erpSelectService.queryVkasheng(erpSelectForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	@RequestMapping("/queryVkashengOA.erp")
	public String queryVkashengOA(ErpSelectForm erpSelectForm,HttpServletRequest request){
	    try {
		PageModel<ErpSelectForm> pageModel = erpSelectService.queryVkasheng(erpSelectForm);
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
	 */
	@RequestMapping("/queryVspinput.erp")
	public String queryVspinput(ErpSelectForm erpSelectForm,HttpServletRequest request){
		try {
			if (getSubNameFromSession(erpSelectForm,request) == null) 
				return null;
			erpSelectForm.setSubNameList(getSubNameFromSession(erpSelectForm,request));
			PageModel<ErpSelectForm> pageModel = erpSelectService.queryVspinput(erpSelectForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	@RequestMapping("/queryVspinputOA.erp")
	public String queryVspinputOA(ErpSelectForm erpSelectForm,HttpServletRequest request){
	    try {
		PageModel<ErpSelectForm> pageModel = erpSelectService.queryVspinput(erpSelectForm);
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
	 */
	@RequestMapping("/queryVspkc.erp")
	public String queryVspkc(ErpSelectForm erpSelectForm,HttpServletRequest request){
		try {
			if (getSubNameFromSession(erpSelectForm,request) == null) 
				return null;
			erpSelectForm.setSubNameList(getSubNameFromSession(erpSelectForm,request));
			PageModel<ErpSelectForm> pageModel = erpSelectService.queryVspkc(erpSelectForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	@RequestMapping("/queryVspkcOA.erp")
	public String queryVspkcOA(ErpSelectForm erpSelectForm,HttpServletRequest request){
	    try {
		PageModel<ErpSelectForm> pageModel = erpSelectService.queryVspkc(erpSelectForm);
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
	 */
	@RequestMapping("/queryVkashenggx.erp")
	public String queryVkashenggx(ErpSelectForm erpSelectForm,HttpServletRequest request){
		try {
			if (getSubNameFromSession(erpSelectForm,request) == null) 
				return null;
			erpSelectForm.setSubNameList(getSubNameFromSession(erpSelectForm,request));
			List<ErpSelectForm> list = erpSelectService.queryVkashenggx(erpSelectForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(list);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	@RequestMapping("/queryVkashenggxOA.erp")
	public String queryVkashenggxOA(ErpSelectForm erpSelectForm,HttpServletRequest request){
	    try {
	    	List<ErpSelectForm> list = erpSelectService.queryVkashenggx(erpSelectForm);
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
	 */
	@RequestMapping("/queryCustomerBySalesman.erp")
	public String queryCustomerBySalesman(ErpRegisterForm erpRegisterForm,HttpServletRequest request){
		try {
			HttpSession session = request.getSession();
			System.out.println(session.getAttribute("salesmanId"));
			erpRegisterForm.setSalesmanId((String)session.getAttribute("salesmanId"));
			PageModel<ErpRegisterForm> pageModel = erpSelectService.queryCustomerBySalesman(erpRegisterForm);
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
