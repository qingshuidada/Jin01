package com.mdoa.work.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.base.model.PageModel;
import com.mdoa.base.service.BaseService;
import com.mdoa.util.StringUtil;
import com.mdoa.work.bo.ContractForm;
import com.mdoa.work.bo.ContractRecordForm;
import com.mdoa.work.dao.ContractDao;
import com.mdoa.work.model.Contract;
import com.mdoa.work.model.ContractPayRecord;
import com.mdoa.work.model.ContractRecord;

@Service
public class ContractService extends BaseService{
	
	@Autowired
	private ContractDao contractDao;
	
	/**
	 * 查询合同
	 * @param contractForm
	 * @return
	 */
	public PageModel<Contract> findExpireContract(ContractForm contractForm) {
		PageHelper.startPage(contractForm.getPage(), contractForm.getRows());
		List<Contract> list = contractDao.findExpireContract(contractForm);
		PageModel<Contract> pageModel = new PageModel<>((Page<Contract>)list);
		return pageModel;
	}
	
	/**
	 * 添加合同
	 * @param contractForm
	 */
	public void addContract(ContractForm contractForm) {
		//添加合同的时候未付金额和未开票金额为合同总金额
		contractForm.setUnpaidAmount(contractForm.getContractAmount());
		contractForm.setNoInvoiceAmount(contractForm.getContractAmount());
		if(!contractDao.insertContract(contractForm))
			throw new RuntimeException("添加合同失败！");
	}
	
	/**
	 * 查询合同
	 * @param contractForm
	 * @return
	 */
	public PageModel<Contract> selectContract(ContractForm contractForm) {
		if(!StringUtil.isEmpty(contractForm.getContractName())){
			contractForm.setContractName(StringUtil.toLikeRight(contractForm.getContractName()));
		}
		if(!StringUtil.isEmpty(contractForm.getOrderExecutorName())){
			contractForm.setOrderExecutorName(StringUtil.toLikeRight(contractForm.getOrderExecutorName()));
		}
		if (!StringUtil.isEmpty(contractForm.getDepartmentName())) {
			contractForm.setDepartmentName(StringUtil.toLikeRight(contractForm.getDepartmentName()));
		}
		PageHelper.startPage(contractForm.getPage(), contractForm.getRows());
		List<Contract> list = contractDao.findContract(contractForm);
		PageModel<Contract> pageModel = new PageModel<>((Page<Contract>)list);
		return pageModel;
	}
	
	/**
	 * 关闭合同
	 * @param contractForm
	 */
	public void closeContract(ContractForm contractForm) {
		if(!contractDao.closeContract(contractForm))
			throw new RuntimeException("关闭合同失败！");
	}
	
	/**
	 * 合同交单 弃用
	 * @param contractForm
	 */
	public void presentContract(ContractForm contractForm) {
		if(!contractDao.presentContract(contractForm))
			throw new RuntimeException("合同交单失败！");
	}
	
	/**
	 * 提交合同记录
	 * @param contractRecordForm
	 */
	public void addRecord(ContractRecordForm contractRecordForm) {
		if(!contractDao.insertContractRecord(contractRecordForm))
			throw new RuntimeException("提交合同记录失败！");
	}
	
	/**
	 * 查询合同记录
	 * @param contractRecordForm
	 * @return
	 */
	public PageModel<ContractRecord> selectRecord(ContractRecordForm contractRecordForm) {
		PageHelper.startPage(contractRecordForm.getPage(), contractRecordForm.getRows());
		List<ContractRecord> list = contractDao.findContractRecord(contractRecordForm);
		PageModel<ContractRecord> pageModel = new PageModel<>((Page<ContractRecord>)list);
		return pageModel;
	}
	/**
	 * 修改合同信息
	 * @param contractForm
	 */
	public void editContract(ContractForm contractForm){
		if(!contractDao.editContract(contractForm))
			throw new RuntimeException("修改合同失败");
	}
	/**
	 * 用户支付操作
	 * @param contractForm
	 */
	public void contractPayment(ContractForm contractForm) {
		if(contractForm.getAliveFlag().equals("1")){//支付记录
			Contract contract = contractDao.findContractById(contractForm.getContractId());//查询出合同的信息
			Double spendAmount = contract.getSpendAmount() + contractForm.getPayAmount();//获得已付款总金额
			Double unpaidAmount = contract.getContractAmount() - spendAmount;//获得未付款金额
			System.out.println(unpaidAmount);
			contractForm.setSpendAmount(spendAmount);
			contractForm.setUnpaidAmount(unpaidAmount);
			if(!contractDao.editContract(contractForm)){
				throw new RuntimeException("修改合同失败");
			}
			if(!contractDao.insertContractPayRecord(contractForm)){
				throw new RuntimeException("插入合同支付记录失败");
			}
		}else if(contractForm.getAliveFlag().equals("2")){//开票记录
			
			Contract contract = contractDao.findContractById(contractForm.getContractId());
			Double invoiceAmount = contract.getInvoiceAmount() + contractForm.getPayAmount();//获得总的已开票金额
			Double noInvoiceAmount = contract.getContractAmount() - invoiceAmount;//获得未开票金额
			contractForm.setInvoiceAmount(invoiceAmount);
			contractForm.setNoInvoiceAmount(noInvoiceAmount);
			System.out.println(noInvoiceAmount);
			if(!contractDao.editContract(contractForm)){
				throw new RuntimeException("修改合同失败");
			}
			if(!contractDao.insertContractPayRecord(contractForm)){
				throw new RuntimeException("插入合同支付记录失败");
			}
		}
		
	}
	/**
	 * 查询用户支付记录
	 * @param contractForm
	 * @return
	 */
	public PageModel<ContractPayRecord> findPayRecordById(ContractForm contractForm){
	
		PageHelper.startPage(contractForm.getPage(),contractForm.getRows());
		List<ContractPayRecord> list = contractDao.findPayRecordById(contractForm);
		PageModel<ContractPayRecord> pageModel = new PageModel<>((Page<ContractPayRecord>)list);
		return pageModel;
		
	}
}
