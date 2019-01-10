package com.mdoa.erp.dao;

import java.util.List;

import com.mdoa.erp.bo.ErpRegisterForm;
import com.mdoa.erp.bo.ErpSelectForm;
import com.mdoa.user.model.UserInfo;

public interface ErpRegisterDao {

	/**
	 * 获取ID
	 */
	String getUuid();
	/**
	 * 添加父业务员
	 * @param erpRegisterForm
	 * @return
	 */
	boolean addParentSalesman(ErpRegisterForm erpRegisterForm);
	/**
	 * 添加子业务员 
	 * @param erpRegisterForm
	 * @return
	 */
	boolean addSubSalesman(ErpRegisterForm erpRegisterForm);
	/**
	 * 查询父业务员
	 * @param erpRegisterForm
	 * @return
	 */
	List<ErpRegisterForm> queryParentSalesman(ErpRegisterForm erpRegisterForm);
	/**
	 * 查询子业务员
	 * @param erpRegisterForm
	 * @return
	 */
	List<ErpRegisterForm> querySubSalesman(ErpRegisterForm erpRegisterForm);
	/**
	 * 删除子业务员
	 * @param erpRegisterForm
	 * @return
	 */
	boolean deleteSubSalesman(ErpRegisterForm erpRegisterForm);
	/**
	 * 删除父业务员
	 * @param erpRegisterForm
	 * @return
	 */
	boolean deleteParentSalesman(ErpRegisterForm erpRegisterForm);
	/**
	 * 添加父客户
	 * @param erpRegisterForm
	 * @return
	 */
	boolean addParentCustomer(ErpRegisterForm erpRegisterForm);
	/**
	 * 添加客户和业务员关系
	 * @param erpRegisterForm
	 * @return
	 */
	boolean addCusSaleCorrelation(ErpRegisterForm erpRegisterForm);
	/**
	 * 添加子客户
	 * @param erpRegisterForm
	 * @return
	 */
	boolean addSubCustomer(ErpRegisterForm erpRegisterForm);
	/**
	 * 查询父客户
	 * @param erpRegisterForm
	 * @return
	 */
	List<ErpRegisterForm> queryParentCustomer(ErpRegisterForm erpRegisterForm);
	List<ErpRegisterForm> queryParentCustomerO(ErpRegisterForm erpRegisterForm);
	/**
	 * 查询子客户
	 * @param erpRegisterForm
	 * @return
	 */
	List<ErpRegisterForm> querySubCustomer(ErpRegisterForm erpRegisterForm);
	/**
	 * 删除原来的业务员
	 * @param erpRegisterForm
	 * @return
	 */
	boolean updateCusSaleCorrelation(ErpRegisterForm erpRegisterForm);
	/**
	 * 删除子客户
	 * @param erpRegisterForm
	 * @return
	 */
	boolean deleteSubCustomer(ErpRegisterForm erpRegisterForm);
	/**
	 * 修改客户
	 * @param erpRegisterForm
	 * @return
	 */
	boolean updateParentCustomer(ErpRegisterForm erpRegisterForm);
	/**
	 * 修改客户密码
	 * @param erpRegisterForm
	 * @return
	 */
	boolean updateParentPassword(ErpRegisterForm erpRegisterForm);
	/**
	 * 删除父客户
	 * @param erpRegisterForm
	 * @return
	 */
	boolean deleteParentCustomer(ErpRegisterForm erpRegisterForm);
	/**
	 * 查询关系
	 * @param erpRegisterForm
	 * @return
	 */
	List<ErpRegisterForm> queryCorrelation(ErpRegisterForm erpRegisterForm);
	/**
	 * 删除关系
	 * @param erpRegisterForm
	 * @return
	 */
	boolean deleteCorrelation(ErpRegisterForm erpRegisterForm);
	/**
	 * 查询客户
	 * @param erpRegisterForm
	 * @return
	 */
	List<ErpRegisterForm> queryCustomerBySalesman(ErpRegisterForm erpRegisterForm);
	
	/**
	 * 修改业务员密码
	 * @param erpRegisterForm
	 * @return
	 */
	boolean updateSalesmanPassword(ErpRegisterForm erpRegisterForm);
	

	List<UserInfo> selectRepotAuthorityUser(UserInfo info);
	
	boolean updateReportAuthorityFlag(String userId);
}
