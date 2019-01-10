package com.mdoa.admin.controller;

import java.util.LinkedList;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.admin.model.AssetsType;
import com.mdoa.admin.model.AssetsModel;
import com.mdoa.admin.service.AssetsService;
import com.mdoa.base.controller.BaseController;
import com.mdoa.constant.Constant;
import com.mdoa.constant.TreeModelConstant;
import com.mdoa.user.model.UserInfo;

@RestController
@RequestMapping("/admin")
public class AssetsController extends BaseController{
	
	@Autowired
	private AssetsService assetsService;
	//表示根目录的pid
	private static final String ROOT = "0";
	
	/**
	 * 测试state
	 * @param assetsType
	 * @return
	 */
	@ResponseBody
	@RequestMapping("updateTreeState.do")
	public String updateTreeState(AssetsType assetsType){
		try {
			assetsService.updateTreeState(assetsType,TreeModelConstant.assetslist);
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
	@RequestMapping("/queryTree.do")
	public String deptTree(){
		try{
			Gson gson = new Gson();
			if (TreeModelConstant.assetslist != null) {
				String json = gson.toJson(TreeModelConstant.assetslist);
				return json;
			}else {
				synchronized(this){
					if (TreeModelConstant.assetslist != null) {
						String json = gson.toJson(TreeModelConstant.assetslist);
						return json;
					}
					AssetsModel treeModel = new AssetsModel();
		        	treeModel.setId(ROOT);
		        	treeModel.setThisId(ROOT);
		        	treeModel.setText("资产类型");
		        	TreeModelConstant.assetslist = new LinkedList<AssetsModel>();
		        	TreeModelConstant.assetslist.add(treeModel);
		        	treeModel.setChildren(assetsService.selectTree(treeModel.getThisId()));
		        	String json = gson.toJson(TreeModelConstant.assetslist);
		        	return json;
				}
			}
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}	
	/**
	 * 在当前父ID下添加一个资产类
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/addAssetsType.do")
	public String addAssetsType(AssetsType assetsType,HttpServletRequest request){
		try{
			UserInfo userInfo=getUser(request);
			assetsType.setCreateUserId(userInfo.getUserId());
			assetsType.setCreateUserName(userInfo.getUserName());
			//assetsService.addRepertoryType(repertoryGoodsType);
			assetsService.allTreeMethod(assetsType);
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
	 * 根据当前父ID删除下面的所有物品类
	 * @param assetsType
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/removeAssetsType.do")
	public String removeAssetsType(AssetsType assetsType,HttpServletRequest request){
		
		try {
			UserInfo userInfo=getUser(request);
			assetsType.setUpdateUserId(userInfo.getUserId());
			assetsType.setUpdateUserName(userInfo.getUserName());
			//assetsService.removeRepertoryType(repertoryGoodsType);
			assetsService.allTreeMethod(assetsType);
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
	 * @param assetsType
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/editAssetsType.do")
	public String editAssetsType(AssetsType assetsType, HttpServletRequest request){
		try {
			UserInfo userInfo=getUser(request);
			assetsType.setUpdateUserId(userInfo.getUserId());
			assetsType.setUpdateUserName(userInfo.getUserName());
			//assetsService.editRepertoryType(repertoryGoodsType);
			assetsService.allTreeMethod(assetsType);
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
	 * (拖动)
	 * @param dragModel
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/dragAssetsType.do")
	public String dragAssetsType(AssetsType dragModel, HttpServletRequest request){
		try {
			UserInfo userInfo=getUser(request);
			dragModel.setUpdateUserId(userInfo.getUserId());
			dragModel.setUpdateUserName(userInfo.getUserName());
			//assetsService.dragRepertoryType(dragModel);
			assetsService.allTreeMethod(dragModel);
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
