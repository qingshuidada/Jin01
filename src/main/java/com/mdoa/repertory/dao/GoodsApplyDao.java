package com.mdoa.repertory.dao;
import java.util.List;

import com.mdoa.repertory.model.GoodsApply;
/**
 * 物品的dao层
 * @author Administrator
 *
 */
public interface GoodsApplyDao {
	
	boolean insertGoodsApply(GoodsApply goodsApply);
	
	boolean deleteGoodsApply(String goodsId);
	
	List<GoodsApply> selectGoodsApply(GoodsApply goodsApply);
}
