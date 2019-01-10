package com.mdoa.work.dao;

import java.util.List;

import com.mdoa.work.bo.WorkOfficeVoteEntity;
import com.mdoa.work.bo.WorkOfficeVoteForm;

public interface VoteDao {
	
	/**
	 * 获取当前时间
	 */
	String getNowTime();
	/**
	 * 添加投票
	 * @param workOfficeVoteEntity
	 * @return
	 */
	boolean addVote(WorkOfficeVoteEntity workOfficeVoteEntity);
	/**
	 * 添加投票选项
	 * @param workOfficeVoteEntity
	 * @return
	 */
	boolean addVoteItem(WorkOfficeVoteEntity workOfficeVoteEntity);
	/**
	 * 修改投票项
	 * @param workOfficeVoteForm
	 * @return
	 */
	boolean updateVoteItem(WorkOfficeVoteForm workOfficeVoteForm);
	/**
	 * 添加投票记录
	 * @param workOfficeVoteForm
	 * @return
	 */
	boolean addVoteRecord(WorkOfficeVoteForm workOfficeVoteForm);
	/**
	 * 验证是否二次投票
	 * @param workOfficeVoteForm
	 * @return
	 */
	List<WorkOfficeVoteForm> isFirstVote(WorkOfficeVoteForm workOfficeVoteForm);
	/**
	 * 查询发票
	 * @param workOfficeVoteForm
	 * @return
	 */
	List<WorkOfficeVoteForm> queryVote(WorkOfficeVoteForm workOfficeVoteForm);
	/**
	 * 修改发票状态
	 * @param form
	 * @return
	 */
	boolean updateVote(WorkOfficeVoteForm form);
	/**
	 * 查询投票项
	 * @param workOfficeVoteForm
	 * @return
	 */
	List<WorkOfficeVoteForm> queryVoteItem(WorkOfficeVoteForm workOfficeVoteForm);

}
