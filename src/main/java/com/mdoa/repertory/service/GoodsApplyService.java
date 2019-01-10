package com.mdoa.repertory.service;

import java.util.List;

import org.bouncycastle.crypto.RuntimeCryptoException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.base.model.PageModel;
import com.mdoa.repertory.dao.GoodsApplyDao;
import com.mdoa.repertory.model.GoodsApply;
import com.mdoa.repertory.model.RepertoryGoods;
import com.mdoa.util.StringUtil;

@Service
public class GoodsApplyService {

	@Autowired
	private GoodsApplyDao applyDao;
	
	public void deleteGoodsApply(String goodsId){
		if(!applyDao.deleteGoodsApply(goodsId)){
			throw new RuntimeException("删除物资申请失败");
		}
	}
	
	public PageModel<GoodsApply> selectGoodsApply(GoodsApply goodsApply){
		
		if(!StringUtil.isEmpty(goodsApply.getGoodsName())){
			goodsApply.setGoodsName("%"+goodsApply.getGoodsName()+"%");
		}
		if(!StringUtil.isEmpty(goodsApply.getGoodsSize())){
			goodsApply.setGoodsSize("%"+goodsApply.getGoodsSize()+"%");
		}
		if(!StringUtil.isEmpty(goodsApply.getUserName())){
			goodsApply.setUserName("%"+goodsApply.getUserName()+"%");
		}
		if(!StringUtil.isEmpty(goodsApply.getDepartmentName())){
			goodsApply.setDepartmentName("%"+goodsApply.getDepartmentName()+"%");
		}
		PageHelper.startPage(goodsApply.getPage(), goodsApply.getRows());
		List<GoodsApply> list = applyDao.selectGoodsApply(goodsApply);
		PageModel<GoodsApply> pageModel = new PageModel((Page)list);
		return pageModel;
	}
}
