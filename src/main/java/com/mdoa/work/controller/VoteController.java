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
import com.mdoa.work.bo.WorkOfficeVoteForm;
import com.mdoa.work.service.VoteService;

@RestController
@RequestMapping("/vote")
public class VoteController extends BaseController{
	
	@Autowired
	private VoteService voteService;
	 
	//private String jsonStrings = "{voteName:\"无聊的投票\",detail:\"无聊的一批\",endTimeStr:\"2017-06-20 23:59:59\",itemList:[{voteItemName:\"无聊\"},{voteItemName:\"不无聊\"},{voteItemName:\"弃权\"}]}";
	//private String jsonString = "{\"voteName\":\"无聊的投票\",\"detail\":\"无聊的一批\",\"endTimeStr\":\"2017-06-20 23:59:59\",\"itemList\":[{\"voteItemName\":\"无聊\"},{\"voteItemName\":\"不无聊\"},{\"voteItemName\":\"弃权\"}]}";
	/**
	 * 发起投票
	 */
	@RequestMapping("/addVote.do")
	@HasPermissions(permissions = { "admin:workOfficeDoc:voteManage:voteManage:add" })
	public String addVote(String jsonString,HttpServletRequest request){
		try {
			
			voteService.addVote(jsonString,request);
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
	 * 查询投票
	 */
	@RequestMapping("/queryVote.do")
	public String queryVote(WorkOfficeVoteForm workOfficeVoteForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			System.out.println(userInfo);
			workOfficeVoteForm.setUserId(userInfo.getUserId());
			PageModel<WorkOfficeVoteForm> pageModel = voteService.queryVote(workOfficeVoteForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(pageModel);
			
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 投票
	 */
	@RequestMapping("/doVote.do")
	public String doVote(WorkOfficeVoteForm workOfficeVoteForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			workOfficeVoteForm.setUpdateUserId(userInfo.getUserId());
			workOfficeVoteForm.setUpdateUserName(userInfo.getUserName());
			workOfficeVoteForm.setCreateUserId(userInfo.getUserId());
			workOfficeVoteForm.setCreateUserName(userInfo.getUserName());
			workOfficeVoteForm.setUserId(userInfo.getUserId());
			
			voteService.doVote(workOfficeVoteForm);
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
	 * 投票详情
	 */
	@RequestMapping("/queryVoteDetail.do")
	public String queryVoteDetail(WorkOfficeVoteForm workOfficeVoteForm,HttpServletRequest request){
		try {
			WorkOfficeVoteForm workOfficeVoteForm2 = voteService.queryVoteDetail(workOfficeVoteForm);
			Gson gson = new Gson();
			String jsonString = gson.toJson(workOfficeVoteForm2);
			return jsonString;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 修改投票
	 */
	@RequestMapping("/updateVote.do")
	@HasPermissions(permissions = { "admin:workOfficeDoc:voteManage:voteManage:close" })
	public String updateVote(WorkOfficeVoteForm workOfficeVoteForm,HttpServletRequest request){
		try {
			voteService.updateVote(workOfficeVoteForm);	
			
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
}
