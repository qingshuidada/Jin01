package com.mdoa.repertory.service;

import java.util.List;

import javax.print.attribute.Size2DSyntax;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.google.gson.Gson;
import com.mdoa.base.model.PageModel;
import com.mdoa.base.service.BaseService;
import com.mdoa.repertory.bo.RepertoryInvoiceForm;
import com.mdoa.repertory.bo.TypeMonthBalanceForm;
import com.mdoa.repertory.bo.RepertoryInvoiceEntity;
import com.mdoa.repertory.dao.RepertoryInvoiceDao;
import com.mdoa.repertory.model.RepertoryInRecord;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.ExcelModel;
import com.mdoa.util.ExcelUtil;
import com.mdoa.util.JSONUtil;
import com.mdoa.util.StringUtil;

@Service
public class RepertoryInvoiceService extends BaseService{

	@Autowired
	private RepertoryInvoiceDao repertoryInvoiceDao;
	
	
	
	/**
	 * 保存登记信息
	 * @param jsonString
	 */
	@Transactional
	public void saveInvoiceRegister(String jsonString,HttpServletRequest request) {
		Gson gson = new Gson();
		RepertoryInvoiceEntity repertoryInvoiceEntity=gson.fromJson(jsonString, RepertoryInvoiceEntity.class);
		UserInfo userInfo = getUser(request);
		repertoryInvoiceEntity.setCreateUserId(userInfo.getUserId());
		repertoryInvoiceEntity.setCreateUserName(userInfo.getUserName());
		repertoryInvoiceEntity.setInvoiceId(getuuid());
		//保存发票信息
		if (!repertoryInvoiceDao.saveInvoiceMessage(repertoryInvoiceEntity)) 
			throw new RuntimeException("保存发票信息失败");
		//保存发票记录
		if (!repertoryInvoiceDao.saveInvoiceRecord(repertoryInvoiceEntity)) 
			throw new RuntimeException("保存发票记录失败");
		//修改入库记录
		for (int i = 0; i < repertoryInvoiceEntity.getList().size(); i++) {
			RepertoryInvoiceForm repertoryInvoiceForm = new RepertoryInvoiceForm();
			repertoryInvoiceForm.setInRecordId(repertoryInvoiceEntity.getList().get(i).getInRecordId());
			repertoryInvoiceForm.setNoWriteAmount(repertoryInvoiceEntity.getList().get(i).getNoWriteAmount());
			repertoryInvoiceForm.setInvoiceId(repertoryInvoiceEntity.getInvoiceId());
			if (!repertoryInvoiceDao.updateInRecord(repertoryInvoiceForm)) 
				throw new RuntimeException("修改入库记录失败");
		}
		repertoryInvoiceEntity.setWriteAmountSum(writeAmountSum(repertoryInvoiceEntity));
		//修改供应商表的未核销金额
		if (!repertoryInvoiceDao.updateProvider(repertoryInvoiceEntity)) 
			throw new RuntimeException("修改供应商失败");
		
	}
	private Double writeAmountSum(RepertoryInvoiceEntity repertoryInvoiceEntity) {
		Double writeAmountSum = 0.0;
		for (int i = 0; i < repertoryInvoiceEntity.getList().size(); i++) {
			writeAmountSum += repertoryInvoiceEntity.getList().get(i).getWriteAmount();
		}
		return writeAmountSum;
	}
	/**
	 * 查询发票
	 * @param repertoryInvoiceForm
	 * @return
	 */
	@Transactional
	public PageModel<RepertoryInvoiceForm> queryInvoice(RepertoryInvoiceForm repertoryInvoiceForm) {
		
		if (!StringUtil.isEmpty(repertoryInvoiceForm.getProviderName())) 
			repertoryInvoiceForm.setProviderName(repertoryInvoiceForm.getProviderName()+"%");
			
		PageHelper.startPage(repertoryInvoiceForm.getPage(),repertoryInvoiceForm.getRows());
		List<RepertoryInvoiceForm> list = repertoryInvoiceDao.queryInvoice(repertoryInvoiceForm);
		for (int i = 0; i < list.size(); i++) {
			List<RepertoryInvoiceForm> list1 = repertoryInvoiceDao.queryInRecordByInvoiceRecord(list.get(i).getInvoiceId());
			for (int j = 0;j < list1.size(); j++) {
				if (list1.get(j).getRedId() != null && !(list1.get(j).getInvoiceId().equals(list.get(i).getInvoiceId()))) {
					list.get(i).setDelete(false);
					break;
				}
					list.get(i).setDelete(true);
			}
		}
		PageModel<RepertoryInvoiceForm> pageModel = new PageModel<>((Page<RepertoryInvoiceForm>)list); 
		
		return pageModel;
	}
	/**
	 * 汇总
	 * @param repertoryInvoiceForm
	 * @return
	 */
	@Transactional
	public PageModel<RepertoryInvoiceForm> gatherInvoiceAmount(RepertoryInvoiceForm repertoryInvoiceForm) {
		if (!StringUtil.isEmpty(repertoryInvoiceForm.getProviderName())) 
			repertoryInvoiceForm.setProviderName(repertoryInvoiceForm.getProviderName()+"%");
		
		PageHelper.startPage(repertoryInvoiceForm.getPage(),repertoryInvoiceForm.getRows());
		List<RepertoryInvoiceForm> list = repertoryInvoiceDao.gatherInvoiceAmount(repertoryInvoiceForm);
		PageModel<RepertoryInvoiceForm> pageModel = new PageModel<>((Page<RepertoryInvoiceForm>)list);
		return pageModel;
	}
	/**
	 * 发票详情查询
	 * @param repertoryInvoiceForm
	 * @return
	 */
	@Transactional
	public RepertoryInvoiceForm queryInvoiceDetail(RepertoryInvoiceForm repertoryInvoiceForm) {
		PageHelper.startPage(repertoryInvoiceForm.getPage(),repertoryInvoiceForm.getRows());
		List<RepertoryInvoiceForm> list = repertoryInvoiceDao.queryInvoiceDetail(repertoryInvoiceForm);
		List<RepertoryInvoiceForm> invoiceList = repertoryInvoiceDao.queryInvoice(repertoryInvoiceForm);
		RepertoryInvoiceForm form = new RepertoryInvoiceForm();
		if (invoiceList.size() != 0) {
			form = invoiceList.get(0);
		}
		List<RepertoryInRecord> inList = repertoryInvoiceDao.queryInRecord();
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getNoWriteAmount()>0 && list.get(i).getRedId() == null && list.get(i).getInRecordId() != null) {
				for (int j = 0; j < inList.size(); j++) {
					if (list.get(i).getInRecordId() == null || list.get(i).getInvoiceIds() == null ||inList.get(j).getInRecordId() == null || inList.get(j).getInvoiceId() == null || list.get(i).getInvoiceId() == null) {
						continue;
					} 
					if (inList.get(j).getInvoiceId() != null) {
						if ( list.get(i).getInRecordId().equals(inList.get(j).getInRecordId()) && inList.get(j).getInvoiceId().equals(list.get(i).getInvoiceId())) {
							list.get(i).setRed(true);
						}
					}
				}
			}
		}
		PageModel<RepertoryInvoiceForm> pageModel = new PageModel<>((Page<RepertoryInvoiceForm>)list);
		form.setPageModel(pageModel);
		return form;
	}
	/**
	 * 未核销记录查询
	 * @param repertoryInvoiceForm
	 * @return
	 */
	@Transactional
	public PageModel<RepertoryInvoiceForm> queryNoInvoiceRecord(RepertoryInvoiceForm repertoryInvoiceForm) {
		if (!StringUtil.isEmpty(repertoryInvoiceForm.getGoodsName())) 
			repertoryInvoiceForm.setGoodsName(repertoryInvoiceForm.getGoodsName()+"%");
		if (!StringUtil.isEmpty(repertoryInvoiceForm.getProviderName())) 
			repertoryInvoiceForm.setProviderName(repertoryInvoiceForm.getProviderName()+"%");
		PageHelper.startPage(repertoryInvoiceForm.getPage(),repertoryInvoiceForm.getRows());
		List<RepertoryInvoiceForm> list = repertoryInvoiceDao.queryNoInvoiceRecord(repertoryInvoiceForm);
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getRedId() == null && list.get(i).getInvoiceId() != null) {
				list.get(i).setRed(true);
			}
		}
		PageModel<RepertoryInvoiceForm> pageModel = new PageModel<>((Page<RepertoryInvoiceForm>)list);
		return pageModel;
	}
	/**
	 * 冲红(未核销记录查询)
	 * @param repertoryInvoiceForm
	 */
	@Transactional
	public void redInRecordGoodsByInvoice(RepertoryInvoiceForm repertoryInvoiceForm) {
		List<RepertoryInvoiceForm> list1 = repertoryInvoiceDao.queryNoInvoiceRecord(repertoryInvoiceForm);
		for (int i = 0; i < list1.size(); i++) {
			if (list1.get(i).getRedId() == null && list1.get(i).getInvoiceId() != null) {
				list1.get(i).setRed(true);
				continue;
			}
				throw new RuntimeException();
		}
		repertoryInvoiceForm.setRedId(getuuid());
		List<RepertoryInvoiceForm> list = repertoryInvoiceDao.queryInvoice(repertoryInvoiceForm);
		repertoryInvoiceForm.setNoWriteAmount(repertoryInvoiceForm.getNoWriteAmount()*(-1));
		System.out.println("lala="+repertoryInvoiceForm.getNoWriteAmount());
		if (list.size() != 0) 
			repertoryInvoiceForm.setOpenDateStr(list.get(0).getOpenDateStr());
		if (!repertoryInvoiceDao.updateInRecordForRed(repertoryInvoiceForm))
			throw new RuntimeException("修改redId失败");
		if (!repertoryInvoiceDao.insertInRecordForRed(repertoryInvoiceForm))
			throw new RuntimeException("添加冲红失败");
		if (!repertoryInvoiceDao.updateProviderForRed(repertoryInvoiceForm)) 
			throw new RuntimeException("修改供应商失败");
	}
	/**
	 * 冲红(发票详情查询)
	 * @param repertoryInvoiceForm
	 */
	@Transactional
	public void redInRecordGoodsByInvoiceTwo(RepertoryInvoiceForm repertoryInvoiceForm) {
		System.out.println("==================="+repertoryInvoiceForm.getInRecordId());
		List<RepertoryInvoiceForm> list1 = repertoryInvoiceDao.queryInvoiceDetail(repertoryInvoiceForm);
		//List<RepertoryInRecord> inList = repertoryInvoiceDao.queryInRecord();
		System.out.println("thisSize="+list1.size());
		for (int i = 0; i < list1.size(); i++) {
			System.out.println(list1.get(i).getNoWriteAmount()+",redId="+list1.get(i).getRedId()+",inrecordId="+list1.get(i).getInRecordId()+",invoiceIds="+list1.get(i).getInvoiceIds());
			if (list1.get(i).getNoWriteAmount()>0 && list1.get(i).getRedId() == null && list1.get(i).getInRecordId() != null && list1.get(i).getInvoiceIds() != null) {
					if (list1.get(i).getInRecordId() == null || list1.get(i).getInvoiceId() == null) {
						continue;
					} 
					if (list1.get(i).getInvoiceIds().equals(list1.get(i).getInvoiceId())) {
						list1.get(i).setRed(true);
						continue;
					}
					throw new RuntimeException();
			}else{
				throw new RuntimeException();
			}
		}
		
		repertoryInvoiceForm.setRedId(getuuid());
		List<RepertoryInvoiceForm> list = repertoryInvoiceDao.queryInvoice(repertoryInvoiceForm);
		repertoryInvoiceForm.setNoWriteAmount(repertoryInvoiceForm.getNoWriteAmount()*(-1));
		if (list.size() != 0) 
			repertoryInvoiceForm.setOpenDateStr(list.get(0).getOpenDateStr());
		if (!repertoryInvoiceDao.updateInRecordForRed(repertoryInvoiceForm))
			throw new RuntimeException("修改redId失败");
		if (!repertoryInvoiceDao.insertInRecordForRed(repertoryInvoiceForm))
			throw new RuntimeException("添加冲红失败");
		if (!repertoryInvoiceDao.updateProviderForRed(repertoryInvoiceForm)) 
			throw new RuntimeException("修改供应商失败");
	}
	/**
	 * 删除发票
	 */
	@Transactional
	public void deleteInvoice(RepertoryInvoiceForm repertoryInvoiceForm) {
		List<RepertoryInvoiceForm> list1 = repertoryInvoiceDao.queryInRecordByInvoiceRecord(repertoryInvoiceForm.getInvoiceId());
		for (int j = 0;j < list1.size(); j++) {
			if (list1.get(j).getRedId() != null && !(list1.get(j).getInvoiceId().equals(repertoryInvoiceForm.getInvoiceId()))) {
				throw new RuntimeException("删除按钮不存在");
			}
		}
		List<RepertoryInvoiceForm> list = repertoryInvoiceDao.queryInRecordByInvoiceRecord(repertoryInvoiceForm.getInvoiceId());
		for (int i = 0; i < list.size(); i++) {
			RepertoryInvoiceForm form = new RepertoryInvoiceForm();
			form.setInRecordId(list.get(i).getInRecordId());
			form.setWriteAmount(list.get(i).getWriteAmount());
			form.setProviderCode(list.get(i).getProviderCode());
			form.setInvoiceRecordId(list.get(i).getInvoiceRecordId());
			//查询上一张发票
			List<RepertoryInvoiceForm> pList = repertoryInvoiceDao.queryPrevoiusInvoice(form);
			if (pList.size()>1) {
				form.setpInvoiceId(pList.get(1).getInvoiceId());
			}else{
				form.setpInvoiceId(null);
			}
			if (list.get(i).getRedId() == null) {
				if (!repertoryInvoiceDao.backInRecordAmount(form))
					throw new RuntimeException("入库记录金额撤回失败无冲红");
				if (!repertoryInvoiceDao.updateProviderForNoRed(form)) 
					throw new RuntimeException("修改供应商失败");
			}else {
				form.setRedId(list.get(i).getRedId());
				form.setRedAmount(list.get(i).getNoWriteAmount());
				
				if (!repertoryInvoiceDao.backInRecordAmountNo(form)) 
					throw new RuntimeException("入库记录金额撤回失败有冲红");
				if (!repertoryInvoiceDao.deleteRedRecord(form)) 
					throw new RuntimeException("删除冲红记录失败");
				if (!repertoryInvoiceDao.updateProviderForHaveRed(form)) 
					throw new RuntimeException("修改供应商失败");
			}
		}
		if (!repertoryInvoiceDao.deleteInvoice(repertoryInvoiceForm)) 
			throw new RuntimeException("删除发票失败");
		if (!repertoryInvoiceDao.deleteInvoiceRecord(repertoryInvoiceForm)) 
			throw new RuntimeException("删除发票记录失败");
		
	}
	/**
	 * 初始金额核销
	 * @param repertoryInvoiceForm
	 */
	public void initVerification(RepertoryInvoiceForm repertoryInvoiceForm) {
		repertoryInvoiceForm.setInvoiceId(getuuid());
		if (!repertoryInvoiceDao.initVerificationRecord(repertoryInvoiceForm)) 
			throw new RuntimeException("添加发票记录失败");
		if (!repertoryInvoiceDao.initVerificationInvoice(repertoryInvoiceForm)) 
			throw new RuntimeException("添加发票失败");
		if (!repertoryInvoiceDao.updateProviderInitAmount(repertoryInvoiceForm)) 
			throw new RuntimeException("修改供应商初始金额失败");
		
	}
	
	/**
	 * 导出发票记录到Excel
	 * @param repertoryInvoiceForm
	 * @param jsonString
	 * @param filePath
	 */
	public void writeVerificationRecordToExcel(RepertoryInvoiceForm repertoryInvoiceForm, String jsonString,
			String filePath) throws Exception{
		List<ExcelModel> modelDetails = JSONUtil.jsonToExcelModelList(jsonString);
		if (!StringUtil.isEmpty(repertoryInvoiceForm.getProviderName())) 
			repertoryInvoiceForm.setProviderName(repertoryInvoiceForm.getProviderName()+"%");
		List<RepertoryInvoiceForm> list = repertoryInvoiceDao.queryInvoice(repertoryInvoiceForm);
		for (int i = 0; i < list.size(); i++) {
			List<RepertoryInvoiceForm> list1 = repertoryInvoiceDao.queryInRecordByInvoiceRecord(list.get(i).getInvoiceId());
			for (int j = 0;j < list1.size(); j++) {
				if (list1.get(j).getRedId() != null && !(list1.get(j).getInvoiceId().equals(list.get(i).getInvoiceId()))) {
					list.get(i).setDelete(false);
					break;
				}
					list.get(i).setDelete(true);
			}
		}
		ExcelUtil.writeListToExcel(filePath,list, modelDetails);
		
	}
	
	/**
	 * 导出未核销发票记录到Excel
	 * @param repertoryInvoiceForm
	 * @param jsonString
	 * @param filePath
	 */
	public void writeNoInvoiceRecordToExcel(RepertoryInvoiceForm repertoryInvoiceForm, String jsonString,
			String filePath) throws Exception{
		List<ExcelModel> modelDetails = JSONUtil.jsonToExcelModelList(jsonString);
		if (!StringUtil.isEmpty(repertoryInvoiceForm.getGoodsName())) 
			repertoryInvoiceForm.setGoodsName(repertoryInvoiceForm.getGoodsName()+"%");
		PageHelper.startPage(repertoryInvoiceForm.getPage(),repertoryInvoiceForm.getRows());
		List<RepertoryInvoiceForm> list = repertoryInvoiceDao.queryNoInvoiceRecord(repertoryInvoiceForm);
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getRedId() == null && list.get(i).getInvoiceId() != null) {
				list.get(i).setRed(true);
			}
		}
		ExcelUtil.writeListToExcel(filePath,list, modelDetails);
	}
	
	/**
	 * 导出货到未开票汇总到Excel
	 * @param repertoryInvoiceForm
	 * @param jsonString
	 * @param filePath
	 */
	public void writeGatherInvoiceAmountToExcel(RepertoryInvoiceForm repertoryInvoiceForm, String jsonString,
			String filePath) throws Exception{
		List<ExcelModel> modelDetails = JSONUtil.jsonToExcelModelList(jsonString);
		if (!StringUtil.isEmpty(repertoryInvoiceForm.getProviderName())) 
			repertoryInvoiceForm.setProviderName(repertoryInvoiceForm.getProviderName()+"%");
		
		PageHelper.startPage(repertoryInvoiceForm.getPage(),repertoryInvoiceForm.getRows());
		List<RepertoryInvoiceForm> list = repertoryInvoiceDao.gatherInvoiceAmount(repertoryInvoiceForm);
		ExcelUtil.writeListToExcel(filePath,list, modelDetails);
	}
	
	
	
	
}
