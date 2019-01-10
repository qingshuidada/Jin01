package com.mdoa.work.controller;



import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.security.annotation.HasPermissions;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.DateUtil;
import com.mdoa.work.bo.WorkOfficeKnowForm;
import com.mdoa.work.service.KnowService;

@RestController
@RequestMapping("/know")
public class KnowController extends BaseController{
	
	@Autowired
	private KnowService knowService;
	
	/**
	 * 查询一级类别
	 */
	@RequestMapping("/queryFirstCategory.do")
	public String queryFirstCategory(WorkOfficeKnowForm workOfficeKnowForm,HttpServletRequest request){
		try {
			PageModel<WorkOfficeKnowForm> list = knowService.queryFirstCategory(workOfficeKnowForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(list);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 添加一级类别
	 */
	@RequestMapping("/addFirstCategory.do")
	@HasPermissions(permissions = { "admin:workOfficeDoc:knowManage:knowType:add" })
	public String addFirstCategory(WorkOfficeKnowForm workOfficeKnowForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			workOfficeKnowForm.setCreateUserId(userInfo.getUserId());
			workOfficeKnowForm.setCreateUserName(userInfo.getUserName());
			knowService.addFirstCategory(workOfficeKnowForm);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 修改一级类别
	 */
	@RequestMapping("/updateFirstCategory.do")
	@HasPermissions(permissions = { "admin:workOfficeDoc:knowManage:knowType:update" })
	public String updateFirstCategory(WorkOfficeKnowForm workOfficeKnowForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			workOfficeKnowForm.setUpdateUserId(userInfo.getUserId());
			workOfficeKnowForm.setUpdateUserName(userInfo.getUserName());
			knowService.updateFirstCategory(workOfficeKnowForm);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 上下移动一级类别
	 */
	@RequestMapping("/upDownMoveForFirstCategory.do")
	@HasPermissions(permissions = { "admin:workOfficeDoc:knowManage:knowType:order" })
	public String upDownMoveForFirstCategory(String jsonString,HttpServletRequest request){
		try {
			knowService.upDownMoveForFirstCategory(jsonString,request);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
		
	}
	/**
	 * 保存文档
	 */
	@RequestMapping("/saveDoc.do")
	public String saveDoc(WorkOfficeKnowForm workOfficeKnowForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			workOfficeKnowForm.setCreateUserId(userInfo.getUserId());
			workOfficeKnowForm.setCreateUserName(userInfo.getUserName());
			knowService.saveDoc(workOfficeKnowForm);
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
	 * 修改文档
	 */
	@RequestMapping("/updateDoc.do")
	@HasPermissions(permissions = { "admin:workOfficeDoc:knowManage:know:update" })
	public String updateDoc(WorkOfficeKnowForm workOfficeKnowForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			workOfficeKnowForm.setUpdateUserId(userInfo.getUserId());
			workOfficeKnowForm.setUpdateUserName(userInfo.getUserName());
			knowService.updateDoc(workOfficeKnowForm);
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 查询文档
	 */
	@RequestMapping("/queryDoc.do")
	public String queryDoc(WorkOfficeKnowForm workOfficeKnowForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			workOfficeKnowForm.setUpdateUserId(userInfo.getUserId());
			workOfficeKnowForm.setUpdateUserName(userInfo.getUserName());
			PageModel<WorkOfficeKnowForm> pageModel = knowService.queryDoc(workOfficeKnowForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 查询文档详情内容
	 */
	@RequestMapping("/queryDocDetail.do")
	public String queryDocDetail(WorkOfficeKnowForm workOfficeKnowForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			workOfficeKnowForm.setUpdateUserId(userInfo.getUserId());
			workOfficeKnowForm.setUpdateUserName(userInfo.getUserName());
			WorkOfficeKnowForm workOfficeKnowForm1 = knowService.queryDocDetail(workOfficeKnowForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(workOfficeKnowForm1);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 提交评论
	 */
	@RequestMapping("/saveComment.do")
	public String saveComment(WorkOfficeKnowForm workOfficeKnowForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			workOfficeKnowForm.setCreateUserId(userInfo.getUserId());
			workOfficeKnowForm.setCreateUserName(userInfo.getUserName());
			workOfficeKnowForm.setUpdateUserId(userInfo.getUserId());
			workOfficeKnowForm.setUpdateUserName(userInfo.getUserName());
			knowService.saveComment(workOfficeKnowForm);
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 测试
	 * @param workOfficeKnowForm
	 * @param request
	 * @return
	 */
	@RequestMapping("/test.do")
	public String test(WorkOfficeKnowForm workOfficeKnowForm,HttpServletRequest request){
		System.out.println(DateUtil.compare_date("2017-06-20 09:03:27", "2017-06-20 09:03:28"));
		return knowService.test(workOfficeKnowForm);
	}
	/**
	 * 查询二级分类
	 */
	@RequestMapping("/querySecondCategory.do")
	public String querySecondCategory(WorkOfficeKnowForm workOfficeKnowForm,HttpServletRequest request){
		try {
			PageModel<WorkOfficeKnowForm> pageModel = knowService.querySecondCategory(workOfficeKnowForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 添加二级分类
	 */
	@RequestMapping("/addSecondCategory.do")
	@HasPermissions(permissions = { "admin:workOfficeDoc:knowManage:knowType:manage" })
	public String addSecondCategory(WorkOfficeKnowForm workOfficeKnowForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			workOfficeKnowForm.setCreateUserId(userInfo.getUserId());
			workOfficeKnowForm.setCreateUserName(userInfo.getUserName());
			knowService.addSecondCategory(workOfficeKnowForm);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 查询一级分类以及二级分类
	 */
	@RequestMapping("/queryFirstAndSecondCategory.do")
	public String queryFirstAndSecondCategory(WorkOfficeKnowForm workOfficeKnowForm,HttpServletRequest request){
		try {
			PageModel<WorkOfficeKnowForm> pageModel = knowService.queryFirstAndSecondCategory(workOfficeKnowForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 修改子类别
	 */
	@RequestMapping("/updateSubCategory.do")
	@HasPermissions(permissions = { "admin:workOfficeDoc:knowManage:knowType:manage" })
	public String updateSubCategory(String jsonString,HttpServletRequest request){
		try {
			
			knowService.updateSubCategory(jsonString,request);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
}
