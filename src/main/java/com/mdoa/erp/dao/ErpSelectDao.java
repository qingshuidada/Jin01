package com.mdoa.erp.dao;

import java.util.List;

import com.mdoa.erp.bo.ErpRegisterForm;
import com.mdoa.erp.bo.ErpSelectForm;
import com.mdoa.erp.bo.ErpTotalPages;

public interface ErpSelectDao {

	/**
	 * 白胚入库明细
	 */
	List<ErpSelectForm> queryVbprkmx(ErpSelectForm erpSelectForm);
	/**
	 * 白配库存
	 * @param erpSelectForm
	 * @return
	 */
	List<ErpSelectForm> queryVbpkc(ErpSelectForm erpSelectForm);
	/**
	 * 订单查询
	 * @param erpSelectDao
	 * @return
	 */
	List<ErpSelectForm> queryVsaleordermx(ErpSelectForm erpSelectForm);
	/**
	 * 生产进度
	 * @param erpSelectForm
	 * @return
	 */
	List<ErpSelectForm> queryVkasheng(ErpSelectForm erpSelectForm);
	/**
	 * 成品入库明细
	 * @param erpSelectForm
	 * @return
	 */
	List<ErpSelectForm> queryVspinput(ErpSelectForm erpSelectForm);
	/**
	 * 成品库存
	 * @param erpSelectForm
	 * @return
	 */
	List<ErpSelectForm> queryVspkc(ErpSelectForm erpSelectForm);
	/**
	 * 工序
	 * @param erpSelectForm
	 * @return
	 */
	List<ErpSelectForm> queryVkashenggx(ErpSelectForm erpSelectForm);
	
	/**
	 * 白胚入库明细条数查询
	 * @param erpSelectForm
	 * @return
	 */
	ErpTotalPages queryVbprkmxTotal(ErpSelectForm erpSelectForm);
	
	/**
	 * 白胚库存条数查询
	 * @param erpSelectForm
	 * @return
	 */
	ErpTotalPages queryVbpkcTotal(ErpSelectForm erpSelectForm);
	
	/**
	 * 订单条数查询
	 * @param erpSelectForm
	 * @return
	 */
	ErpTotalPages queryVsaleordermxTotal(ErpSelectForm erpSelectForm);
	
	/**
	 * 生产进度条数查询
	 * @param erpSelectForm
	 * @return
	 */
	ErpTotalPages queryVkashengTotal(ErpSelectForm erpSelectForm);
	
	/**
	 * 成品入库明细条数查询
	 * @param erpSelectForm
	 * @return
	 */
	ErpTotalPages queryVspinputTotal(ErpSelectForm erpSelectForm);
	
	/**
	 * 成品库存条数查询
	 * @param erpSelectForm
	 * @return
	 */
	ErpTotalPages queryVspkcTotal(ErpSelectForm erpSelectForm);
	
//	/**
//	 * 查询工序总条数
//	 * @param erpSelectForm
//	 * @return
//	 */
//	ErpTotalPages queryVkashenggxTotal(ErpSelectForm erpSelectForm);
}
