package com.mdoa.work.dao;

import java.util.List;

import com.mdoa.work.bo.WorkOfficeKnowForm;

public interface KnowDao {

	/**
	 * 查询一级类别
	 * @param workOfficeKnowForm
	 * @return
	 */
	List<WorkOfficeKnowForm> queryFirstCategory(WorkOfficeKnowForm workOfficeKnowForm);
	/**
	 * 添加一级类别
	 * @param workOfficeKnowForm
	 */
	boolean addFirstCategory(WorkOfficeKnowForm workOfficeKnowForm);
	/**
	 * 保存文档
	 * @param workOfficeKnowForm
	 * @return
	 */
	boolean saveDoc(WorkOfficeKnowForm workOfficeKnowForm);
	/**
	 * 修改文档
	 * @param workOfficeKnowForm
	 * @return
	 */
	boolean updateDoc(WorkOfficeKnowForm workOfficeKnowForm);
	/**
	 * 查询文档详情内容
	 * @param workOfficeKnowForm
	 * @return
	 */
	List<WorkOfficeKnowForm> queryDoc(WorkOfficeKnowForm workOfficeKnowForm);
	/**
	 * 提交评论
	 * @param workOfficeKnowForm
	 * @return
	 */
	boolean saveComment(WorkOfficeKnowForm workOfficeKnowForm);
	/**
	 * 查询评论数据
	 * @param workOfficeKnowForm
	 * @return 
	 */
	List<WorkOfficeKnowForm> queyComment(WorkOfficeKnowForm workOfficeKnowForm);
	/**
	 * 查询评论者
	 * @param workOfficeKnowForm
	 * @return
	 */
	List<WorkOfficeKnowForm> queryGroupUser(WorkOfficeKnowForm workOfficeKnowForm);
	/**
	 * 查询二级分类
	 * @param workOfficeKnowForm
	 */
	List<WorkOfficeKnowForm> querySecondCategory(WorkOfficeKnowForm workOfficeKnowForm);
	/**
	 * 修改一级类别
	 * @param workOfficeKnowForm
	 * @return
	 */
	boolean updateFirstCategory(WorkOfficeKnowForm workOfficeKnowForm);
	/**
	 * 添加二级分类
	 * @param workOfficeKnowForm
	 * @return
	 */
	boolean addSecondCategory(WorkOfficeKnowForm workOfficeKnowForm);
	/**
	 * 查询一级分类以及二级分类
	 * @param workOfficeKnowForm
	 * @return
	 */
	List<WorkOfficeKnowForm> queryFirstAndSecondCategory(WorkOfficeKnowForm workOfficeKnowForm);
	/**
	 * 修改二级类别
	 * @param form
	 * @return
	 */
	boolean updateSecondCategory(WorkOfficeKnowForm form);

}
