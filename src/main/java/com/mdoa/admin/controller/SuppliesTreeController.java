package com.mdoa.admin.controller;

import java.util.LinkedList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.admin.model.OfficeSuppliesType;
import com.mdoa.admin.model.SuppliesModel;
import com.mdoa.admin.service.SuppliesTreeService;
import com.mdoa.base.controller.BaseController;
import com.mdoa.constant.Constant;
import com.mdoa.constant.TreeModelConstant;

@RestController
@RequestMapping("/admin")
public class SuppliesTreeController extends BaseController{
	@Autowired
	private SuppliesTreeService suppliesService;
	//表示根目录的pid
	private static final String ROOT = "0";
	
	/**
	 * 测试state
	 * @param suppliesType
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/updateSuppliesTree.do")
	public String updateSuppliesTree(OfficeSuppliesType suppliesType){
		try{
			suppliesService.updateTreeState(suppliesType, TreeModelConstant.supplieslist);
			return Constant.SUCCESS_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
	
	/**
	 * 展示树结构
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/showTree.do")
	public String showTree(){
		try{
			Gson gson = new Gson();
			if (TreeModelConstant.supplieslist != null) {
				String json = gson.toJson(TreeModelConstant.supplieslist);
				return json;
			}else{
				synchronized (this) {
					if (TreeModelConstant.supplieslist != null) {
						String json = gson.toJson(TreeModelConstant.supplieslist);
						return json;
					}
					SuppliesModel suppliesModel =  new SuppliesModel();
					suppliesModel.setId(ROOT);
					suppliesModel.setThisId(ROOT);
					suppliesModel.setText("办公用品分类");
					TreeModelConstant.supplieslist = new LinkedList<SuppliesModel>();
					TreeModelConstant.supplieslist.add(suppliesModel);
					suppliesModel.setChildren(suppliesService.selectTree(suppliesModel.getThisId()));
					String json = gson.toJson(TreeModelConstant.supplieslist);
		        	return json;
				}
				
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		} 
		
	}

	/**
	 * 在当前父ID下添加一个办公类
	 * @param suppliesType
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/addSuppliesType.do")
	public String addSuppliesType(OfficeSuppliesType suppliesType){
		try{
			suppliesService.allTreeMethod(suppliesType);
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 根据当前父ID删除下面的所有办公类
	 * @param suppliesType
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/removeSuppliesType.do")
	public String removeSuppliesType(OfficeSuppliesType suppliesType){
		try{
			suppliesService.allTreeMethod(suppliesType);
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 根据前台传来的ID和Name,完成修改
	 * @param suppliesType
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/editSuppliesType.do")
	public String editSuppliesType(OfficeSuppliesType suppliesType){
		try{
			suppliesService.allTreeMethod(suppliesType);
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 拖动
	 * @param suppliesType
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/dragSuppliesType.do")
	public String dragSuppliesType(OfficeSuppliesType suppliesType){
		try{
			suppliesService.allTreeMethod(suppliesType);
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	
}
