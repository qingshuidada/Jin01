package com.mdoa.erp.service;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.dom4j.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mdoa.erp.bo.ErpRegisterForm;
import com.mdoa.erp.dao.ErpLoginDao;
import com.mdoa.util.Md5Util;

@Service
public class ErpLoginService {

	@Autowired
	private ErpLoginDao erpLoginDao;
	@Autowired
	private ErpSelectService erpSelectService;
	/**
	 * 客户登录
	 * @param erpRegisterForm
	 * @param request 
	 * @return
	 */
	public List<ErpRegisterForm> customerLogin(ErpRegisterForm erpRegisterForm, HttpServletRequest request) {
		List<ErpRegisterForm> list = erpLoginDao.customerLogin(erpRegisterForm);
		if (list != null && list.size()<1)
			throw new RuntimeException("帐号或密码错误");
		if (erpRegisterForm.getLoginFlag()!=null && erpRegisterForm.getLoginFlag().equals("1")) {
			if (!list.get(0).getPassword().equals(erpRegisterForm.getPassword())) 
				throw new RuntimeException("帐号或密码错误");
		}else{
			if (!list.get(0).getPassword().equals(Md5Util.getMd5Str(erpRegisterForm.getPassword()))) 
				throw new RuntimeException("帐号或密码错误");
		}
		/*if (!list.get(0).getPassword().equals(Md5Util.getMd5Str(erpRegisterForm.getPassword()))) 
			throw new RuntimeException("帐号或密码错误");*/
		erpRegisterForm.setCustomerId(list.get(0).getCustomerId());
		List<ErpRegisterForm> subList = erpLoginDao.querySubCustomer(erpRegisterForm);
		removeSession(request);
		setDataSourceToSession(subList,request);
		setParentNameToSession(list.get(0).getCustomerName(),request);
		request.getSession().setAttribute("customerLogin", "isLogin");
		return list;
	}
	private void setParentNameToSession(String name, HttpServletRequest request) {
		ErpRegisterForm erpRegisterForm = new ErpRegisterForm();
		HttpSession session = request.getSession();
		try {
			List<ErpRegisterForm> list = erpSelectService.queryDataResourceName(erpRegisterForm);
			for (ErpRegisterForm erpRegisterForm2 : list) {
				List<String> nList=(List<String>) session.getAttribute(erpRegisterForm2.getDataSourceKey());
				if(nList == null)
					nList = new ArrayList<>();
				nList.add(name);
				session.setAttribute(erpRegisterForm2.getDataSourceKey(), nList);
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}
	}
	/**
	 * 清除session
	 * @param request 
	 */
	public void removeSession(HttpServletRequest request) {
		ErpRegisterForm erpRegisterForm = new ErpRegisterForm();
		HttpSession session = request.getSession();
		try {
			List<ErpRegisterForm> list = erpSelectService.queryDataResourceName(erpRegisterForm);
			for (ErpRegisterForm erpRegisterForm2 : list) {
				session.removeAttribute(erpRegisterForm2.getDataSourceKey());
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}
	}
	/**
	 * 把每个数据库的名字放到session中
	 * @param subList
	 * @param request 
	 */
	private void setDataSourceToSession(List<ErpRegisterForm> subList, HttpServletRequest request) {
		HttpSession session = request.getSession();
		List<String> list = null;
		for (int i = 0; i < subList.size(); i++) {
			if (i == 0) {
				list = new ArrayList<>();
				session.setAttribute(subList.get(i).getDataSourceKey(), list);
				if (subList.get(i).getCustomerNameSub() != null){ 
					list.add(subList.get(i).getCustomerNameSub());
				}else{
					list.add(subList.get(i).getSalesmanNameSub());
				}
				continue;
			}
			if (subList.get(i).getDataSourceKey().equals(subList.get(i-1).getDataSourceKey())) {
				if (subList.get(i).getCustomerNameSub() != null){ 
					list.add(subList.get(i).getCustomerNameSub());
				}else{
					list.add(subList.get(i).getSalesmanNameSub());
				}
			}else{
				list = new ArrayList<>();
				session.setAttribute(subList.get(i).getDataSourceKey(), list);
				if (subList.get(i).getCustomerNameSub() != null){ 
					list.add(subList.get(i).getCustomerNameSub());
				}else{
					list.add(subList.get(i).getSalesmanNameSub());
				}
			}
		}
	}
	/**
	 * 业务员登录
	 * @param erpRegisterForm
	 * @param request
	 * @return
	 */
	public List<ErpRegisterForm> salesmanLogin(ErpRegisterForm erpRegisterForm, HttpServletRequest request) {
		List<ErpRegisterForm> list = erpLoginDao.salesmanLogin(erpRegisterForm);
		HttpSession session = request.getSession();
		session.setAttribute("salesmanId", list.get(0).getSalesmanId());
		if (list.size() < 1)
			throw new RuntimeException("帐号或密码错误");
		System.out.println(list.get(0).getPassword()+","+erpRegisterForm.getPassword());
		if (erpRegisterForm.getLoginFlag()!=null && erpRegisterForm.getLoginFlag().equals("1")) {
			if (!list.get(0).getPassword().equals(erpRegisterForm.getPassword())) 
				throw new RuntimeException("帐号或密码错误");
		}else{
			if (!list.get(0).getPassword().equals(Md5Util.getMd5Str(erpRegisterForm.getPassword()))) 
				throw new RuntimeException("帐号或密码错误");
		}
		erpRegisterForm.setSalesmanId(list.get(0).getSalesmanId());
		List<ErpRegisterForm> subList = erpLoginDao.querySubSalesman(erpRegisterForm);
		removeSession(request);
		setDataSourceToSession(subList,request);
		setParentNameToSession(list.get(0).getSalesmanName(),request);
		session.setAttribute("salesmanLogin", "isLogin");
		return list;
	}
	
	/**
	 * 企业微信账号登录erp查询
	 * @param erpRegisterForm
	 * @param request
	 * @return
	 */
	public List<ErpRegisterForm> wxErpLogin(ErpRegisterForm erpRegisterForm, HttpServletRequest request) {
    	    List<ErpRegisterForm> list = erpLoginDao.wxErpLogin(erpRegisterForm);
    	    HttpSession session = request.getSession();
    	    session.setAttribute("salesmanId", list.get(0).getSalesmanId());
    	    session.setAttribute("salesmanId", list.get(0).getSalesmanId());
    	    if (list.size() < 1)
    		throw new RuntimeException("帐号或密码错误");
    	    System.out.println(list.get(0).getPassword()+","+erpRegisterForm.getPassword());
    	    if (erpRegisterForm.getLoginFlag()!=null && erpRegisterForm.getLoginFlag().equals("1")) {
    		if (!list.get(0).getPassword().equals(erpRegisterForm.getPassword())) 
    				throw new RuntimeException("帐号或密码错误");
    	    }else{
    		if (!list.get(0).getPassword().equals(Md5Util.getMd5Str(erpRegisterForm.getPassword()))) 
    			throw new RuntimeException("帐号或密码错误");
    	    }
    	    erpRegisterForm.setSalesmanId(list.get(0).getSalesmanId());
    	    List<ErpRegisterForm> subList = erpLoginDao.querySubSalesman(erpRegisterForm);
    	    removeSession(request);
    	    setDataSourceToSession(subList,request);
    	    setParentNameToSession(list.get(0).getSalesmanName(),request);
    	    session.setAttribute("salesmanLogin", "isLogin");
    	    return list;
	}
	
	
}
