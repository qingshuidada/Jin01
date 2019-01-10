package com.mdoa.erp.dao;

import java.util.List;

import com.mdoa.erp.bo.ErpRegisterForm;

public interface ErpLoginDao {
	
	/**
	 * 客户登录
	 * @param erpRegisterForm
	 * @return
	 */
	List<ErpRegisterForm> customerLogin(ErpRegisterForm erpRegisterForm);

	/**
	 * 查询自客户
	 * @param erpRegisterForm
	 * @return
	 */
	List<ErpRegisterForm> querySubCustomer(ErpRegisterForm erpRegisterForm);
	
	/**
	 * 业务员登录
	 * @param erpRegisterForm
	 * @return
	 */
	List<ErpRegisterForm> salesmanLogin(ErpRegisterForm erpRegisterForm);

	List<ErpRegisterForm> querySubSalesman(ErpRegisterForm erpRegisterForm);
	
	/**
	 * 企业微信账号登录erp查询
	 * @param erpRegisterForm
	 * @return
	 */
	List<ErpRegisterForm> wxErpLogin(ErpRegisterForm erpRegisterForm);

}
