package com.mdoa.repertory.dao;

import java.util.List;

import com.mdoa.repertory.bo.RepertoryInvoiceForm;
import com.mdoa.repertory.model.RepertoryInRecord;
import com.mdoa.repertory.bo.RepertoryInvoiceEntity;
import com.mdoa.repertory.bo.RepertoryInvoiceEntity.Data;

public interface RepertoryInvoiceDao {
	
	/**
	 * 获取ID
	 */
	String getuuid();
	/**
	 * 保存发票信息
	 * @param repertoryInvoiceForm
	 * @return
	 */
	boolean saveInvoiceMessage(RepertoryInvoiceEntity repertoryInvoiceEntity);
	/**
	 * 保存发票记录
	 * @param repertoryInvoiceEntity
	 * @return
	 */
	boolean saveInvoiceRecord(RepertoryInvoiceEntity repertoryInvoiceEntity);
	/**
	 * 修改入库记录
	 * @param repertoryInvoiceForm
	 * @return
	 */
	boolean updateInRecord(RepertoryInvoiceForm repertoryInvoiceForm);
	/**
	 * 修改供应商表的未核销金额
	 * @param repertoryInvoiceEntity
	 * @return
	 */
	boolean updateProvider(RepertoryInvoiceEntity repertoryInvoiceEntity);
	/**
	 * 查询发票记录
	 * @param repertoryInvoiceForm
	 * @return
	 */
	List<RepertoryInvoiceForm> queryInvoice(RepertoryInvoiceForm repertoryInvoiceForm);
	/**
	 * 汇总
	 * @param repertoryInvoiceForm
	 * @return
	 */
	List<RepertoryInvoiceForm> gatherInvoiceAmount(RepertoryInvoiceForm repertoryInvoiceForm);
	/**
	 * 发票详情查询
	 * @param repertoryInvoiceForm
	 * @return
	 */
	List<RepertoryInvoiceForm> queryInvoiceDetail(RepertoryInvoiceForm repertoryInvoiceForm);
	/**
	 * 未核销记录查询
	 * @param repertoryInvoiceForm
	 * @return
	 */
	List<RepertoryInvoiceForm> queryNoInvoiceRecord(RepertoryInvoiceForm repertoryInvoiceForm);
	/**
	 * 查询入库记录
	 * @return
	 */
	List<RepertoryInRecord> queryInRecord();
	/**
	 * 冲红
	 * @param repertoryInvoiceForm
	 * @return
	 */
	boolean updateInRecordForRed(RepertoryInvoiceForm repertoryInvoiceForm);
	boolean insertInRecordForRed(RepertoryInvoiceForm repertoryInvoiceForm);
	/**
	 * 根据发票找出所有与该发票有关的入库记录
	 * @param string
	 * @return
	 */
	List<RepertoryInvoiceForm> queryInRecordByInvoiceRecord(String invoiceId);
	/**
	 * 删除发票
	 * @param repertoryInvoiceForm
	 * @return
	 */
	boolean deleteInvoice(RepertoryInvoiceForm repertoryInvoiceForm);
	/**
	 * 入库记录金额撤回(没有冲红过)
	 * @param inRecordId
	 * @param writeAmount
	 * @return
	 */
	boolean backInRecordAmount(RepertoryInvoiceForm repertoryInvoiceForm);
	/**
	 * 入库记录金额撤回(冲红过)
	 * @param inRecordId
	 * @param writeAmount
	 * @return
	 */
	boolean backInRecordAmountNo(RepertoryInvoiceForm repertoryInvoiceForm);
	/**
	 * 删除冲红记录
	 * @param inRecordId
	 * @return
	 */
	boolean deleteRedRecord(RepertoryInvoiceForm form);
	/**
	 * 删除发票记录
	 * @param repertoryInvoiceForm
	 * @return
	 */
	boolean deleteInvoiceRecord(RepertoryInvoiceForm repertoryInvoiceForm);
	/**
	 * 冲红的时候修改供应商的未核销金额
	 * @param repertoryInvoiceForm
	 * @return
	 */
	boolean updateProviderForRed(RepertoryInvoiceForm repertoryInvoiceForm);
	boolean updateProviderForNoRed(RepertoryInvoiceForm repertoryInvoiceForm);
	boolean updateProviderForHaveRed(RepertoryInvoiceForm repertoryInvoiceForm);
	/**
	 * 初始金额核销
	 * @param repertoryInvoiceForm
	 * @return
	 */
	boolean initVerificationRecord(RepertoryInvoiceForm repertoryInvoiceForm);
	boolean initVerificationInvoice(RepertoryInvoiceForm repertoryInvoiceForm);
	boolean updateProviderInitAmount(RepertoryInvoiceForm repertoryInvoiceForm);
	/**
	 * 查询上一张发票
	 * @param repertoryInvoiceForm
	 * @return
	 */
	List<RepertoryInvoiceForm> queryPrevoiusInvoice(RepertoryInvoiceForm repertoryInvoiceForm);
	

}
