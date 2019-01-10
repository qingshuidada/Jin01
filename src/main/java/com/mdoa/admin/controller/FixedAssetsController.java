package com.mdoa.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.admin.bo.FixedAssetsForm;
import com.mdoa.admin.model.DepreRecord;
import com.mdoa.admin.model.DepreType;
import com.mdoa.admin.model.FixedAssets;
import com.mdoa.admin.service.FixedAssetsService;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;

@RestController
@RequestMapping("/admin")
public class FixedAssetsController {

	@Autowired
	private FixedAssetsService fixedAssetsService;
	
	/**
	 * 添加折旧类型
	 * @param depreType
	 * @return
	 */
	@RequestMapping("insertDepreType.do")
	public String insertDepreType(DepreType depreType){
		try {
			fixedAssetsService.insertDepreType(depreType);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
	/**
	 * 删除折旧类型
	 * @param depreType
	 * @return
	 */
	@RequestMapping("deleteDepreType.do")
	public String deleteDepreType(DepreType depreType){
		try {
			fixedAssetsService.deleteDepreType(depreType);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
	
	/**
	 * 修改折旧类型
	 * @param depreType
	 * @return
	 */
	@RequestMapping("updateDepreType.do")
	public String updateDepreType(DepreType depreType){
		try {
			fixedAssetsService.updateDepreType(depreType);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
	/**
	 * 查询折旧类型
	 * @param depreType
	 * @return
	 */
	@RequestMapping("selectDepreType.do")
	public String selectDepreType(DepreType depreType){
		try {
			PageModel<DepreType> pageModel = fixedAssetsService.selectDepreType(depreType);
			Gson gson = new Gson();
			return gson.toJson(pageModel);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
/**********************************固定资产***********************************************/	
	/**
	 * 添加固定资产
	 * @param depreType
	 * @return
	 */
	@RequestMapping("insertFixedAssets.do")
	public String insertFixedAssets(FixedAssets fixedAssets){
		try {
			fixedAssetsService.insertFixedAssets(fixedAssets);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
	/**
	 * 删除固定资产
	 * @param depreType
	 * @return
	 */
	@RequestMapping("deleteFixedAssets.do")
	public String deleteFixedAssets(FixedAssets fixedAssets){
		try {
			fixedAssetsService.deleteFixedAssets(fixedAssets);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
	
	/**
	 * 修改固定资产
	 * @param depreType
	 * @return
	 */
	@RequestMapping("updateFixedAssets.do")
	public String updateFixedAssets(FixedAssets fixedAssets){
		try {
			fixedAssetsService.updateFixedAssets(fixedAssets);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
	/**
	 * 查询固定资产
	 * @param depreType
	 * @return
	 */
	@RequestMapping("selectFixedAssets.do")
	public String selectFixedAssets(FixedAssets fixedAssets){
		try {
			PageModel<FixedAssets> pageModel = fixedAssetsService.selectFixedAssets(fixedAssets);
			Gson gson = new Gson();
			return gson.toJson(pageModel);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
/**********************************折旧记录***********************************************/	
	/**
	 * 添加折旧记录
	 * @param depreType
	 * @return
	 */
	@RequestMapping("insertDepreRecord.do")
	public String insertDepreRecord(DepreRecord depreRecord){
		try {
			fixedAssetsService.insertDepreRecord(depreRecord);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
	/**
	 * 删除折旧记录
	 * @param depreType
	 * @return
	 */
	@RequestMapping("deleteDepreRecord.do")
	public String deleteDepreRecord(DepreRecord depreRecord){
		try {
			fixedAssetsService.deleteDepreRecord(depreRecord);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
	
	/**
	 * 修改折旧记录
	 * @param depreType
	 * @return
	 */
	@RequestMapping("updateDepreRecord.do")
	public String updateDepreRecord(DepreRecord depreRecord){
		try {
			fixedAssetsService.updateDepreRecord(depreRecord);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
	/**
	 * 查询折旧记录
	 * @param depreType
	 * @return
	 */
	@RequestMapping("selectDepreRcord.do")
	public String selectDepreRcord(FixedAssetsForm fixedAssetsForm){
		try {
			PageModel<FixedAssetsForm> pageModel = fixedAssetsService.selectDepreRcord(fixedAssetsForm);
			Gson gson = new Gson();
			return gson.toJson(pageModel);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
	
	/**
	 * 计算折旧方法
	 * @param depreType
	 * @return
	 */
	@RequestMapping("depreciate.do")
	public String depreciate(FixedAssets fixedAssets){
		try {
			fixedAssetsService.depreciate(fixedAssets);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
	
}
