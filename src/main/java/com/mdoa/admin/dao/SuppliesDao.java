package com.mdoa.admin.dao;

import java.util.List;

import com.mdoa.admin.model.InStockModel;
import com.mdoa.admin.model.OfficeSupplies;
import com.mdoa.admin.model.SuppliesApply;

public interface SuppliesDao {

	
	boolean insertOfficeSupplies(OfficeSupplies officeSupplies);
	
	boolean deleteOfficeSupplies(OfficeSupplies officeSupplies);
	
	boolean updateOfficeSupplies(OfficeSupplies officeSupplies);
	
	List<OfficeSupplies> selectOfficeSupplies(OfficeSupplies officeSupplies);
	
	OfficeSupplies selectOfficeSuppliesById(String suppliesId);
	
	boolean addInStock(InStockModel inStockModel);
	
	boolean deleteInStock(InStockModel inStockModel);
	
	boolean updateInStock(InStockModel inStockModel);
	
	List<InStockModel> selectInStock(InStockModel inStockModel);
	
	InStockModel selectInStockById(String buyId);
	
	boolean addSuppliesApply(SuppliesApply suppliesApply);
	
	boolean updateSuppliesApply(SuppliesApply suppliesApply);
	
	List<SuppliesApply> selectSuppliesApply(SuppliesApply suppliesApply);
	
	SuppliesApply selectSuppliesApplyById(String applyId);
}
