package com.mdoa.admin.dao;

import java.util.Date;
import java.util.List;

import com.mdoa.admin.bo.FixedAssetsForm;
import com.mdoa.admin.model.DepreRecord;
import com.mdoa.admin.model.DepreType;
import com.mdoa.admin.model.FixedAssets;

public interface FixedAssetsDao {

	/**
	 * 插入折旧类型
	 * @param depreType
	 * @return
	 */
	boolean insertDepreType(DepreType depreType);
	/**
	 * 删除一条折旧类型
	 * @param depreType
	 * @return
	 */
	boolean deleteDepreType(DepreType depreType);
	/**
	 * 修改折旧类型
	 * @param depreType
	 * @return
	 */
	boolean updateDepreType(DepreType depreType);
	/**
	 * 查询折旧类型
	 * @param depreType
	 * @return
	 */
	List<DepreType> selectDepreType(DepreType depreType);
	/**
	 * 增加固定资产
	 * @param fixedAssets
	 * @return
	 */
	boolean insertFixedAssets(FixedAssets fixedAssets);
	/**
	 * 删除固定资产
	 * @param fixedAssets
	 * @return
	 */
	boolean deleteFixedAssets(FixedAssets fixedAssets);
	/**
	 * 修改固定资产的信息
	 * @param fixedAssets
	 * @return
	 */
	boolean updateFixedAssets(FixedAssets fixedAssets);
	/**
	 * 更新固定资产的资产当前量
	 * @param fixedAssets
	 * @return
	 */
	boolean updateFixedAssetsCurValue(FixedAssets fixedAssets);
	/**
	 * 查询固定资产
	 * @param fixedAssets
	 * @return
	 */
	List<FixedAssets> selectFixedAssets(FixedAssets fixedAssets);
	/**
	 * 插入折旧记录
	 * @param depreRecord
	 * @return
	 */
	boolean insertDepreRecord(DepreRecord depreRecord);
	/**
	 * 删除折旧记录
	 * @param depreRecord
	 * @return
	 */
	boolean deleteDepreRecord(DepreRecord depreRecord);
	/**
	 * 修改折旧记录
	 * @param depreRecord
	 * @return
	 */
	boolean updateDepreRecord(DepreRecord depreRecord);
	/**
	 * 查询折旧记录
	 * @param fixedAssetsForm
	 * @return
	 */
	List<FixedAssetsForm> selectDepreRcord(FixedAssetsForm fixedAssetsForm);
	/**
	 * 查询多条记录的最大时间
	 * @param assetsId
	 * @return
	 */
	Date selectMaxDate(String assetsId);
}
