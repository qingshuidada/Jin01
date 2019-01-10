package com.mdoa.admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.admin.dao.SuppliesDao;
import com.mdoa.admin.model.InStockModel;
import com.mdoa.admin.model.OfficeSupplies;
import com.mdoa.admin.model.SuppliesApply;
import com.mdoa.base.model.PageModel;
import com.mdoa.util.StringUtil;

@Service
@Transactional
public class SuppliesService {
	@Autowired
	private SuppliesDao suppliesDao;
	
	public void insertOfficeSupplies(OfficeSupplies officeSupplies){
		officeSupplies.setSuppliesTypeId(StringUtil.getIdFromUrl(officeSupplies.getSuppliesTypeUrl()));
		if(!suppliesDao.insertOfficeSupplies(officeSupplies)){
			throw new RuntimeException("添加办公用品失败");
		}
	}
	
	public void deleteOfficeSupplies(OfficeSupplies officeSupplies){
		if(!suppliesDao.deleteOfficeSupplies(officeSupplies)){
			throw new RuntimeException("删除办公用品失败");
		}
	}
	
	public void updateOfficeSupplies(OfficeSupplies officeSupplies){
		if(!suppliesDao.updateOfficeSupplies(officeSupplies)){
			throw new RuntimeException("修改办公用品失败");
		}
	}
	
	public PageModel<OfficeSupplies> selectOfficeSupplies(OfficeSupplies officeSupplies){
		if(!StringUtil.isEmpty(officeSupplies.getSuppliesName())){
			officeSupplies.setSuppliesName(officeSupplies.getSuppliesName()+"%");
		}
		if (!StringUtil.isEmpty(officeSupplies.getSuppliesTypeName())) {
			officeSupplies.setSuppliesTypeName(officeSupplies.getSuppliesTypeName()+"%");
		}
		if (!StringUtil.isEmpty(officeSupplies.getSuppliesTypeUrl())) {
			officeSupplies.setSuppliesTypeUrl(officeSupplies.getSuppliesTypeUrl()+"%");
		}
		PageHelper.startPage(officeSupplies.getPage(),officeSupplies.getRows());
		List<OfficeSupplies> list = suppliesDao.selectOfficeSupplies(officeSupplies);
		PageModel<OfficeSupplies> pageModel = new PageModel((Page)list);
		return pageModel;
						
	}
	
	/**
	 * 添加入库单
	 * @param inStockModel
	 */
	public void addInStock(InStockModel inStockModel){
		if(!suppliesDao.addInStock(inStockModel)){
			throw new RuntimeException("添加入库单失败");
		}
		OfficeSupplies officeSupplies = suppliesDao.selectOfficeSuppliesById(inStockModel.getSuppliesId());
		officeSupplies.setStockCounts(officeSupplies.getStockCounts() + inStockModel.getInCounts());
		if(!suppliesDao.updateOfficeSupplies(officeSupplies)){
			throw new RuntimeException("修改办公用品数量失败");
		}
	}
	
	public void deleteInStock(InStockModel inStockModel){
		if(!suppliesDao.deleteInStock(inStockModel)){
			throw new RuntimeException("删除入库单失败");
		}
	}
	/**
	 * 修改入库单
	 * @param inStockModel
	 */
	public void updateInStock(InStockModel inStockModel){
		InStockModel inStock = suppliesDao.selectInStockById(inStockModel.getBuyId());
		Integer oldInCount = inStock.getInCounts();
		OfficeSupplies officeSupplies = suppliesDao.selectOfficeSuppliesById(inStockModel.getSuppliesId());
		Integer newInCount = inStockModel.getInCounts();
		if (!oldInCount.equals(newInCount)) {
			officeSupplies.setStockCounts(officeSupplies.getStockCounts()-oldInCount+newInCount);
		}
		if (!suppliesDao.updateOfficeSupplies(officeSupplies)) {
			throw new RuntimeException("修改办公用品数量失败");
		}
		if(!suppliesDao.updateInStock(inStockModel)){
			throw new RuntimeException("更新入库单失败");
		}
	}
	
	public PageModel<InStockModel> selectInStock(InStockModel inStockModel){
		if (!StringUtil.isEmpty(inStockModel.getSuppliesName())) {
			inStockModel.setSuppliesName(inStockModel.getSuppliesName()+"%");
		}
		if (!StringUtil.isEmpty(inStockModel.getProviderName())) {
			inStockModel.setProviderName(inStockModel.getProviderName()+"%");
		}
		if(!StringUtil.isEmpty(inStockModel.getUserName())){
			inStockModel.setUserName(inStockModel.getUserName()+"%");
		}
		PageHelper.startPage(inStockModel.getPage(), inStockModel.getRows());
		List<InStockModel> list = suppliesDao.selectInStock(inStockModel);
		PageModel<InStockModel> pageModel = new PageModel((Page)list);
		return pageModel;
	}
	
	public void addSuppliesApply(SuppliesApply suppliesApply){
		if (!suppliesDao.addSuppliesApply(suppliesApply)) {
			throw new RuntimeException("添加办公用品申请单失败");
		}
		
	}
	
	public void deleteSuppliesApply(SuppliesApply suppliesApply){
		if (!suppliesDao.updateSuppliesApply(suppliesApply)) {
			throw new RuntimeException("删除入库单申请");
		}
	}
	
	public void updateSuppliesApply(SuppliesApply suppliesApply){
		if (!suppliesDao.updateSuppliesApply(suppliesApply)) {
			throw new RuntimeException("更新入库单申请");
		}
		if (suppliesApply.getApprovalStatus().equals("1")) {
			OfficeSupplies officeSupplies = suppliesDao.selectOfficeSuppliesById(suppliesApply.getSuppliesId());
			SuppliesApply suppliesApply2 = suppliesDao.selectSuppliesApplyById(suppliesApply.getApplyId());
			officeSupplies.setStockCounts(officeSupplies.getStockCounts() - suppliesApply2.getUseCounts());
			if(!suppliesDao.updateOfficeSupplies(officeSupplies)){
				throw new RuntimeException("修改办公用品数量失败");
			}
		}
		
	}
	public PageModel<SuppliesApply> selectSuppliesApply(SuppliesApply suppliesApply){
		if (!StringUtil.isEmpty(suppliesApply.getSuppliesName())) {
			suppliesApply.setSuppliesName(suppliesApply.getSuppliesName()+"%");
		}
		if (!StringUtil.isEmpty(suppliesApply.getUserName())) {
			suppliesApply.setUserName(suppliesApply.getUserName()+"%");
		}
		if(!StringUtil.isEmpty(suppliesApply.getApplyNo())){
			suppliesApply.setApplyNo(suppliesApply.getApplyNo()+"%");
		}
		PageHelper.startPage(suppliesApply.getPage(),suppliesApply.getRows());
		List<SuppliesApply> list = suppliesDao.selectSuppliesApply(suppliesApply);
		PageModel<SuppliesApply> pageModel = new PageModel((Page)list);
		return pageModel;
	}
}
