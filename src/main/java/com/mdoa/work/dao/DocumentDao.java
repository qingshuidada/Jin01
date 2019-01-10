package com.mdoa.work.dao;

import java.util.List;

import com.mdoa.work.bo.WorkOfficeDocForm;
import com.mdoa.work.model.DTreeModel;
import com.mdoa.work.model.DocumentDoc;

public interface DocumentDao {

	/**
	 * 获取UUID
	 */
	String getUuid();
	/**
	 * 根据父Id查询下一级类
	 * @param pid
	 * @return
	 */
	List<DTreeModel> list(String pid);
	/**
	 * 添加目录或者文件
	 * @param workOfficeDocForm
	 * @return
	 */
	boolean addDocument(WorkOfficeDocForm workOfficeDocForm);
	/**
	 * 删除目录或文件
	 * @param workOfficeDocForm
	 * @return
	 */
	boolean removeDocument(WorkOfficeDocForm workOfficeDocForm);
	/**
	 * 修改文件或目录名
	 * @param workOfficeDocForm
	 * @return
	 */
	boolean updateDocument(WorkOfficeDocForm workOfficeDocForm);
	/**
	 * 根据ID修改Url(append)
	 * @param workOfficeDocForm
	 * @return
	 */
	boolean updateDragSourceGoodsUrl(WorkOfficeDocForm workOfficeDocForm);
	/**
	 * 拖动的时候下面的物品类url全部更改
	 * @param workOfficeDocForm
	 * @return
	 */
	boolean updateDragLaterUrl(WorkOfficeDocForm workOfficeDocForm);
	/**
	 * 拖动插入后修改source的下属物品类的url(bottom,top)
	 * @param dragModel
	 * @return
	 */
	boolean updateDragSourceGoodsUrlBt(WorkOfficeDocForm workOfficeDocForm);
	
	/**
	 * 添加公文信息
	 * @return
	 */
	boolean addDocumentDoc(DocumentDoc documentDoc);
	
	/**
	 * 查询一个公文类别下的公文列表
	 */
	List<DocumentDoc> queryDoc(DocumentDoc documentDoc);
	
	/**
	 * 删除公文
	 */
	boolean deleteDoc(String docId);
}
