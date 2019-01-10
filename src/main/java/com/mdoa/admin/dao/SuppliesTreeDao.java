package com.mdoa.admin.dao;

import java.util.List;

import com.mdoa.admin.model.OfficeSuppliesType;
import com.mdoa.admin.model.SuppliesModel;

public interface SuppliesTreeDao {
	/**
	 * 获取树结构
	 * @param pid
	 * @return
	 */
	List<SuppliesModel> list(String pid);
	/**
	 * 获取uuiid
	 * @return
	 */
	String getuuid();
	/**
	 * 添加办公用品类
	 * @param suppliesType
	 * @return
	 */
	boolean addSuppliesType(OfficeSuppliesType suppliesType);
	/**
	 * 根据选择的ID查询其url
	 * @param parentTypeId
	 * @return
	 */
	OfficeSuppliesType selectUrlByparentTypeId(String parentTypeId);
	OfficeSuppliesType selectUrlBySuppliesTypeId(String suppliesTypeId);
	
	boolean removeSuppliesType(OfficeSuppliesType suppliesType);
	
	boolean editSuppliesType(OfficeSuppliesType suppliesType);
	
	boolean updateDragSourceSuppliesUrl(OfficeSuppliesType suppliesType);
	
	OfficeSuppliesType selectSuppliesInformationById(String sourceId);
	
	boolean updateDragLaterUrl(OfficeSuppliesType suppliesType);
	
	boolean updateDragSourceSuppliesUrlBt(OfficeSuppliesType suppliesType);
	
	List<OfficeSuppliesType> isSuppliesBelowType(OfficeSuppliesType suppliesType);
	
}
