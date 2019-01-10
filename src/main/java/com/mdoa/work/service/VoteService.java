package com.mdoa.work.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.google.gson.Gson;
import com.mdoa.base.model.PageModel;
import com.mdoa.base.service.BaseService;
import com.mdoa.constant.SqlSessionMap;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.DateUtil;
import com.mdoa.util.StringUtil;
import com.mdoa.work.bo.WorkOfficeVoteEntity;
import com.mdoa.work.bo.WorkOfficeVoteForm;
import com.mdoa.work.dao.VoteDao;

@Service
public class VoteService extends BaseService{

	@Autowired
	private VoteDao voteDao;
	/**
	 * 发起投票
	 * @param jsonString
	 * @param request
	 */
	@Transactional
	public void addVote(String jsonString, HttpServletRequest request) {
		UserInfo userInfo = getUser(request);
		
		Gson gson = new Gson();
		WorkOfficeVoteEntity workOfficeVoteEntity = gson.fromJson(jsonString, WorkOfficeVoteEntity.class);
		workOfficeVoteEntity.setCreateUserId(userInfo.getUserId());
		workOfficeVoteEntity.setCreateUserName(userInfo.getUserName());
		workOfficeVoteEntity.setVoteId(getuuid());
		if (!voteDao.addVote(workOfficeVoteEntity))
			throw new RuntimeException("添加投票失败");
		if (!voteDao.addVoteItem(workOfficeVoteEntity))
			throw new RuntimeException("添加投票选项失败");
		
	}
	/**
	 * 查询发票
	 * @param workOfficeVoteForm
	 * @return
	 */
	@Transactional
	public PageModel<WorkOfficeVoteForm> queryVote(WorkOfficeVoteForm workOfficeVoteForm) {
		
		
		if (!StringUtil.isEmpty(workOfficeVoteForm.getVoteName())) 
			workOfficeVoteForm.setVoteName("%"+workOfficeVoteForm.getVoteName()+"%");
		
		PageHelper.startPage(workOfficeVoteForm.getPage(),workOfficeVoteForm.getRows());
		List<WorkOfficeVoteForm> list = voteDao.queryVote(workOfficeVoteForm);
		for (int i = 0; i < list.size(); i++) {
			if (DateUtil.compare_date(voteDao.getNowTime(), list.get(i).getEndTimeStr()) == -1 && list.get(i).getStatus().equals("1")){
				list.get(i).setStatus("2");
				WorkOfficeVoteForm form = new WorkOfficeVoteForm();
				form.setVoteId(list.get(i).getVoteId());
				form.setStatus(list.get(i).getStatus());
				if (!voteDao.updateVote(form))
					throw new RuntimeException("修改投票状态失败");
			}
			if (list.get(i).getCreateUserId().equals(workOfficeVoteForm.getUserId())) {
				list.get(i).setClose(true);
			}
		}
		PageModel<WorkOfficeVoteForm> pageModel = new PageModel<>((Page<WorkOfficeVoteForm>)list);
		return pageModel;
	}
	/**
	 * 投票
	 * @param workOfficeVoteForm
	 * @param request
	 */
	@Transactional
	public void doVote(WorkOfficeVoteForm workOfficeVoteForm) {
		
		List<WorkOfficeVoteForm> list = voteDao.isFirstVote(workOfficeVoteForm);
		if (list.size() > 0 && list.get(0).getVoteItemId() != null)
			throw new RuntimeException("无法进行二次投票");
		if (list.size() > 0 && DateUtil.compare_date(voteDao.getNowTime(), list.get(0).getEndTimeStr()) == -1) 
			throw new RuntimeException("投票已结束");
		if (!voteDao.updateVoteItem(workOfficeVoteForm))
			throw new RuntimeException("投票项修改失败");
		if (!voteDao.addVoteRecord(workOfficeVoteForm))
			throw new RuntimeException("添加投票记录失败");
	}
	/**
	 * 发票详情
	 * @param workOfficeVoteForm
	 * @return
	 */
	public WorkOfficeVoteForm queryVoteDetail(WorkOfficeVoteForm workOfficeVoteForm) {
		
		List<WorkOfficeVoteForm> list = voteDao.queryVote(workOfficeVoteForm);
		WorkOfficeVoteForm form = list.get(0);
		List<WorkOfficeVoteForm> list2 = voteDao.queryVoteItem(workOfficeVoteForm);
		form.setList(list2);
		
		return form;
	}
	
	/**
	 * 修改发票
	 * @param workOfficeVoteForm
	 */
	public void updateVote(WorkOfficeVoteForm workOfficeVoteForm) {
		if (!voteDao.updateVote(workOfficeVoteForm)) 
			throw new RuntimeException("修改发票失败");
		
	}
	
}
