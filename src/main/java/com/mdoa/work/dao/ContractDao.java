package com.mdoa.work.dao;

import java.util.List;

import com.mdoa.work.bo.ContractForm;
import com.mdoa.work.bo.ContractRecordForm;
import com.mdoa.work.model.Contract;
import com.mdoa.work.model.ContractPayRecord;
import com.mdoa.work.model.ContractRecord;

public interface ContractDao {
	
	/**
	 * 查询即将到期合同
	 * @param contractForm
	 * @return
	 */
	List<Contract> findExpireContract(ContractForm contractForm);
	/**
	 * 添加合同
	 * @param contractForm
	 * @return
	 */
	boolean insertContract(ContractForm contractForm);
	
	/**
	 * 查询合同
	 * @param contractForm
	 * @return
	 */
	List<Contract> findContract(ContractForm contractForm);
	/**
	 * 合同交单
	 * @param contractForm
	 * @return
	 */
	boolean presentContract(ContractForm contractForm);
	
	/**
	 * 关闭合同
	 * @param contractForm
	 * @return
	 */
	boolean closeContract(ContractForm contractForm);
	
	/**
	 * 提交合同记录
	 * @param contractRecordForm
	 * @return
	 */
	boolean insertContractRecord(ContractRecordForm contractRecordForm);
	
	/**
	 * 查询合同记录
	 * @param contractRecordForm
	 * @return
	 */
	List<ContractRecord> findContractRecord(ContractRecordForm contractRecordForm);
	/**
	 * 修改合同
	 * @param contractForm
	 * @return
	 */
	boolean editContract(ContractForm contractForm);
	/**
	 * 插入合同支付记录
	 * @param contractForm
	 * @return
	 */
	boolean insertContractPayRecord(ContractForm contractForm);
	/**
	 * 根据id查询合同
	 * @param id
	 * @return
	 */
	Contract findContractById(String id);
	/**
	 * 查询合同支付记录
	 * @param contractForm
	 * @return
	 */
	List<ContractPayRecord> findPayRecordById(ContractForm contractForm);
}
