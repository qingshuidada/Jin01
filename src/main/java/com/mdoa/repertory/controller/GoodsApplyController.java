package com.mdoa.repertory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.repertory.model.GoodsApply;
import com.mdoa.repertory.service.GoodsApplyService;

@RestController
@RequestMapping("repertory")
public class GoodsApplyController {

	@Autowired
	private GoodsApplyService applyService;
	
	@RequestMapping("deleteGoodsApply.do")
	public String deleteGoodsApply(GoodsApply apply){
		try{
			applyService.deleteGoodsApply(apply.getGoodsId());
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@RequestMapping("selectGoodsApply.do")
	public String selectGoodsApply(GoodsApply apply){
		try{
			PageModel<GoodsApply> pageModel = applyService.selectGoodsApply(apply);
			Gson gson = new Gson();
			return gson.toJson(pageModel);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	
}
