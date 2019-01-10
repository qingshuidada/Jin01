package com.mdoa.repertory.dao;

import java.util.List;

import com.mdoa.repertory.bo.GoodsForm;
import com.mdoa.repertory.bo.InPrintForm;
import com.mdoa.repertory.bo.OutPrintForm;
import com.mdoa.repertory.model.RepertoryDepartment;
import com.mdoa.repertory.model.RepertoryInRecord;
import com.mdoa.repertory.model.RepertoryOutRecord;
import com.mdoa.repertory.model.RepertoryProvider;
/**
 * 出库入库记录dao层
 * @author Administrator
 *
 */
public interface RepertoryInOutRecordDao {
	
	String getuuid();
	/**
	 * 插入入库记录
	 * @param inRecord
	 * @return
	 */
	boolean insertInRecord(GoodsForm goodsForm);
	/**
	 * 插入出库记录
	 * @param outRecord
	 * @return
	 */
	boolean insertOutRecord(GoodsForm goodsForm);
	/**
	 * 查询所有物品入库流水列表 以及各种查询
	 * @param goodsForm
	 * @return
	 */
	List<GoodsForm> selectGoodsInRecord(GoodsForm goodsForm);
	/**
	 * 查询所有物品的出库明细列表 以及各种查询
	 * @param goodsForm
	 * @return
	 */
	List<GoodsForm> selectGoodsOutRecord(GoodsForm goodsForm);
	/**
	 * 根据入库记录id查询入库记录
	 * @param inRecordId
	 * @return
	 */
	RepertoryInRecord selectGoodsInRecordById(String inRecordId);
	/**
	 * 根据出库记录id查询出库记录
	 * @param outRecordId
	 * @return
	 */
	RepertoryOutRecord selectGoodsOutRecordById(String outRecordId);
	/**
	 *  查询全部的出库入库记录  以及各种条件查询
	 * @param goodsForm
	 * @return
	 */
	List<GoodsForm> selectAllInOutRecord(GoodsForm goodsForm);
	/**
	 * 删除一条入库记录
	 * @param inRecordId
	 * @return
	 */
	boolean deleteGoodsInRecord(String inRecordId);
	/**
	 * 删除一条出库记录
	 * @param outRecordId
	 * @return
	 */
	boolean deleteGoodsOutRecord(String outRecordId);
	/**
	 * 修改一条入库记录
	 * @param inRecordId
	 * @return
	 */
	boolean updateGoodsInRecord(GoodsForm goodsForm);
	/**
	 * 修改一条出库记录
	 * @param outRecordId
	 * @return
	 */
	boolean updateGoodsOutRecord(GoodsForm goodsForm);
	/**
	 * 插入领用部门的信息
	 * @param goodsForm
	 * @return
	 */
	boolean insertGetDepartment(RepertoryDepartment department);
	/**
	 * 删除一个领用部门
	 * @param departmentId
	 * @return
	 */
	boolean deleteGetDepartment(String departmentId);
	/**
	 * 修改领用部门的信息
	 * @param department
	 * @return
	 */
	boolean updateGetDepartment(RepertoryDepartment department);
	/**
	 * 查询所有部门信息 
	 * @return
	 */
	List<GoodsForm> selectGetDepartment(GoodsForm goodsForm);
	
	/**
	 * 查询出入库汇总
	 * @param goodsForm
	 * @return
	 */
	GoodsForm findSumInOutRecord(GoodsForm goodsForm);
	
	/**
	 * 查询入库汇总
	 * @param goodsForm
	 * @return
	 */
	GoodsForm findSumInRecord(GoodsForm goodsForm);
	
	/**
	 * 查询出库汇总
	 * @param goodsForm
	 * @return
	 */
	GoodsForm findSumOutRecord(GoodsForm goodsForm);
	/**
	 * ===========================供应商==============================================
	 */
	boolean insertProviderMessage(RepertoryProvider provider);
	
	boolean deleteProvider(RepertoryProvider provider);
	
	boolean updateProviderMessage(RepertoryProvider provider);
	/**
	 * 查询供应商
	 * @param provider
	 * @return
	 */
	List<RepertoryProvider> selectProviderMessage(RepertoryProvider provider);
	/**
	 * 修改供应商的未核销金额
	 * @param goodsForm
	 * @return
	 */
	boolean updateProviderNoWriteAmount(GoodsForm goodsForm);
	/**
	 * 根据providerCode查询信息
	 * @param providerCode
	 * @return
	 */
	RepertoryProvider selectProviderNoWriteAmount(String providerCode);
	/**
	 * 发票
	 * @param goodsForm
	 * @return
	 */
	List<GoodsForm> selectGoodsInRecordForInvoice(GoodsForm goodsForm);
	
	/**
	 * 插入入库流水
	 * @param inRecord
	 */
	boolean insertInBatchFlow(RepertoryInRecord inRecord);
	
	/**
	 * 插入出库流水
	 * @param outRecord
	 * @return
	 */
	boolean insertOutBatchFlow(RepertoryOutRecord outRecord);
	
	/**
	 * 查询入库流水
	 * @param goodsForm
	 * @return
	 */
	List<GoodsForm> selectInBatchFlow(GoodsForm goodsForm);
	
	/**
	 * 查询出库流水
	 * @param goodsForm
	 * @return
	 */
	List<GoodsForm> selectOutBatchFlow(GoodsForm goodsForm);
	
	/**
	 * 打印物料入库单时查询入库信息
	 * @param goodsForm
	 * @return
	 */
	List<InPrintForm> selectInRecordForPrint(GoodsForm goodsForm);
	
	/**
	 * 打印物品领料单时查询出库信息
	 * @param goodsForm
	 * @return
	 */
	List<OutPrintForm> selectOutRecordForPrint(GoodsForm goodsForm);
}
