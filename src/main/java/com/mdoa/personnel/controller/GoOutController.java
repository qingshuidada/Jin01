                                                                                                                                                                           package com.mdoa.personnel.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.personnel.bo.GoOutApplyForm;
import com.mdoa.personnel.bo.GoOutExamineForm;
import com.mdoa.personnel.bo.GoOutStreamForm;
import com.mdoa.personnel.bo.WelfareApplyForm;
import com.mdoa.personnel.model.GoOutApply;
import com.mdoa.personnel.model.GoOutStream;
import com.mdoa.personnel.service.GoOutService;
import com.mdoa.security.annotation.HasPermissions;
import com.mdoa.system.model.UserSystemMessage;
import com.mdoa.system.service.MessageService;
import com.mdoa.user.model.UserInfo;

@RestController
@RequestMapping("/goout")
public class GoOutController extends BaseController{
	
	@Autowired
	private GoOutService goOutService;
	@Autowired
	private MessageService messageService;
	/**
	 * 申请外出的方法
	 * @param goOutApplyForm 
	 * 		goOutUserId:'001',
			goOutUserName:'陈涛',
			reason:'132',
			startTimeStr:'2017-02-28 09:00:00',
			endTimeStr:'2017-03-03 18:00:00',
			examineUserId:'002',
			examineUserName:'吕冰'
	 * @return
	 */
	@RequestMapping("/applyForGoOut.do")
	@HasPermissions(permissions = { "admin:personnel:attendanceManage:goout:add" })
	public String applyForGoOut(GoOutApplyForm goOutApplyForm, HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			goOutApplyForm.setUserId(userInfo.getUserId());
			goOutApplyForm.setUserName(userInfo.getUserName());
			goOutService.applyForGoOut(goOutApplyForm);
			
			UserSystemMessage message = new UserSystemMessage();
			message.setUserId(goOutApplyForm.getExamineUserId());//插入审批人
			message.setSendUserId(userInfo.getUserId());
			message.setSendUserName(userInfo.getUserName());
			message.setMessage("你有一条"+userInfo.getUserName()+"发起的申请外出流程需要你审批");
			message.setUrl(Constant.GO_OUT_EXAMINE);
			messageService.sendSystemMessage(message,"");
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
	 * 查询外出申请信息
	 * @param goOutApplyForm
	 * @return
	 */
	@RequestMapping("/findApplyByCondition.do")
	public String findApplyByCondition(GoOutApplyForm goOutApplyForm) {
		try {
			System.out.println(goOutApplyForm.getUserName());
			PageModel<GoOutApply> pageInfo = goOutService.findApplyByCondition(goOutApplyForm);
			Gson gson = new Gson();
			return gson.toJson(pageInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 条件查询外出流程
	 * @param goOutApplyForm
	 * @return
	 */
	@RequestMapping("findStream.do")
	public String findStream(GoOutApplyForm goOutApplyForm){
		try {
			PageModel<GoOutStreamForm> pageInfo = goOutService.findStream(goOutApplyForm);
			Gson gson = new Gson();
			return gson.toJson(pageInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 条件查询外出流程
	 * @param goOutApplyForm
	 * @return
	 */
	@RequestMapping("findStreamByCondition.do")
	public String findStreamByCondition(GoOutApplyForm goOutApplyForm,HttpServletRequest request){
		try {
			PageModel<GoOutStreamForm> pageInfo = goOutService.findStreamByCondition(goOutApplyForm,request);
			Gson gson = new Gson();
			return gson.toJson(pageInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询待我审核外出流程
	 * @return
	 */
	@RequestMapping("findMyExamineStream.do")
	public String findMyExamineStream(GoOutApplyForm goOutApplyForm,HttpServletRequest request){
		try {
			PageModel<GoOutStreamForm> pageInfo = goOutService.findStreamByCondition(goOutApplyForm,request);
			Gson gson = new Gson();
			return gson.toJson(pageInfo);
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 通过外出申请但仍需审核的方法
	 * @param goOutExamineForm
	 * @return
	 */
	@RequestMapping("passGoOutApply.do")
	public String passGoOutApply(GoOutExamineForm goOutExamineForm){
		try{
			goOutExamineForm.setExamineStatus("3");
			goOutService.passGoOutApply(goOutExamineForm);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 通过外出申请且无需审核的方法
	 * @param goOutExamineForm
	 * @return
	 */
	@RequestMapping("finallyPassGoOutApply.do")
	public String finallyPassGoOutApply(GoOutExamineForm goOutExamineForm){
		try{
			goOutService.finallyPassGoOutApply(goOutExamineForm);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 驳回外出申请的方法
	 * @param goOutExamineForm
	 * @return
	 */
	@RequestMapping("/rejectGoOutApply.do")
	public String rejectGoOutApply(GoOutExamineForm goOutExamineForm, HttpServletRequest request){
		try{
			UserInfo userInfo = getUser(request);
			goOutExamineForm.setUserId(userInfo.getUserId());
			goOutExamineForm.setUserName(userInfo.getUserName());
			goOutService.rejectGoOutApply(goOutExamineForm);
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
	 * 备案人驳回备案请求且需再审核的方法
	 * @param goOutExamineForm
	 * @return
	 */
	@RequestMapping("/rejectRecordApply.do")
	public String rejectRecordApply(GoOutExamineForm goOutExamineForm, HttpServletRequest request){
		try{
			System.out.println(goOutExamineForm.getExamineUserId());
			UserInfo userInfo = getUser(request);
			goOutExamineForm.setExamineStatus("4");
			goOutService.passGoOutApply(goOutExamineForm);
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
	 * 备案人通过备案请求并备案的方法
	 * @param goOutExamineForm
	 * @return
	 */
	@RequestMapping("/recordGoOutApply.do")
	public String recordGoOutApply(GoOutExamineForm goOutExamineForm, HttpServletRequest request){
		try{
			UserInfo userInfo = getUser(request);
			goOutExamineForm.setUserId(userInfo.getUserId());
			goOutExamineForm.setUserName(userInfo.getUserName());
			goOutService.recordGoOutApply(goOutExamineForm);
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
	 * 申请人撤回外出申请的方法
	 * @param leaveExamineForm
	 * @return
	 */
	@RequestMapping("/withdrawGoOutApply.do")
	public String withdrawGoOutApply(GoOutExamineForm goOutExamineForm, HttpServletRequest request){
		try{
			UserInfo userInfo = getUser(request);
			goOutExamineForm.setUserId(userInfo.getUserId());
			goOutExamineForm.setUserName(userInfo.getUserName());
			goOutService.withdrawGoOutApply(goOutExamineForm);
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
	 * 确认员工已经返回
	 * @param goOutExamineForm
	 * @return
	 */
	@RequestMapping("/confirmUserBack.do")
	public String confirmUserBack(GoOutExamineForm goOutExamineForm){
		try{
			goOutService.confirmUserBack(goOutExamineForm);
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
