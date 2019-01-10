package com.mdoa.work.service;

import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.DocumentModelConstant;
import com.mdoa.constant.TreeModelConstant;
import com.mdoa.repertory.model.RepertoryGoodsType;
import com.mdoa.repertory.model.TreeModel;
import com.mdoa.util.StringUtil;
import com.mdoa.work.bo.WorkOfficeDocForm;
import com.mdoa.work.dao.DocumentDao;
import com.mdoa.work.model.DTreeModel;
import com.mdoa.work.model.DocumentDoc;
import com.sun.xml.internal.txw2.Document;

@Service
public class DocumentService {

	@Autowired
	private DocumentDao documentDao;

	/**
	 * 实现文件树结构
	 * @param root
	 * @return
	 */
	@Transactional
	public List<DTreeModel> deptTree(String pid) {
		List<DTreeModel> dTreeModels = documentDao.list(pid);
		for (DTreeModel dTreeModel : dTreeModels) {
			dTreeModel.setChildren(deptTree(dTreeModel.getThisId()));
		}
		return dTreeModels;
	}
	
	/**
	 * 修改state
	 * @param list 
	 * @param repertoryGoodsType
	 * @param list
	 */
	public void updateTreeState(WorkOfficeDocForm workOfficeDocForm, List<DTreeModel> list) {
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getId().equals(workOfficeDocForm.getUrl()) && workOfficeDocForm.getState().equals("onCollapse"))
				list.get(i).setState("closed");
			if (list.get(i).getId().equals(workOfficeDocForm.getUrl()) && workOfficeDocForm.getState().equals("onExpand"))
				list.get(i).setState("open");
			if (list.get(i).getChildren() != null) 
				updateTreeState(workOfficeDocForm,list.get(i).getChildren());
		}	
	}
	/**
	 * 添加文件或目录
	 * @param workOfficeDocForm
	 */
	@Transactional
	public void addDocument(WorkOfficeDocForm workOfficeDocForm) {
		String uuid = documentDao.getUuid();
		//String uuid = "11";
		workOfficeDocForm.setSuperCatalogId(StringUtil.getIdFromUrl(workOfficeDocForm.getUrl()));
		workOfficeDocForm.setUrl(workOfficeDocForm.getUrl()+"_"+uuid);
		workOfficeDocForm.setCatalogId(uuid);
		if (workOfficeDocForm.getDocFlag().equals("0")) {
			workOfficeDocForm.setIconCls("icon-directory");
		}else{
			workOfficeDocForm.setIconCls("icon-file");
		}
		if (!documentDao.addDocument(workOfficeDocForm)) 
			throw new RuntimeException("添加目录或文件失败");
		
		addDocumentForTree(DocumentModelConstant.treeList,workOfficeDocForm);
	}
	/**
	 * 添加后修改相应树结构
	 * @param treeList
	 * @param workOfficeDocForm
	 */
	private void addDocumentForTree(List<DTreeModel> list, WorkOfficeDocForm workOfficeDocForm) {
		
		for (int i = 0; i < list.size(); i++) {
			System.out.println("lef="+list.get(i).getThisId()+",right="+workOfficeDocForm.getSuperCatalogId());
			if (list.get(i).getThisId().equals(workOfficeDocForm.getSuperCatalogId())) {
				DTreeModel dTreeModel = new DTreeModel();
				dTreeModel.setThisId(workOfficeDocForm.getCatalogId());
				dTreeModel.setId(workOfficeDocForm.getUrl());
				dTreeModel.setText(workOfficeDocForm.getCatalogName());
				dTreeModel.setIconCls(workOfficeDocForm.getIconCls());
				dTreeModel.setAttributes(workOfficeDocForm.getDocFlag());
				/*if (list.get(i).getChildren() == null) {
					list.get(i).setChildren(new ArrayList<>());
				}*/
				list.get(i).getChildren().add(dTreeModel);
			}
			if (list.get(i).getChildren() == null || list.get(i).getChildren().size() == 0)
				continue;
			addDocumentForTree(list.get(i).getChildren(), workOfficeDocForm);
		}
	}
	/**
	 * 删除文件或目录
	 * @param workOfficeDocForm
	 */
	@Transactional
	public void removeDocument(WorkOfficeDocForm workOfficeDocForm) {
		if (workOfficeDocForm.getUrl().equals("0")) 
			throw new RuntimeException("无法删除根目录");
		workOfficeDocForm.setCatalogId(StringUtil.getIdFromUrl(workOfficeDocForm.getUrl()));
		DocumentDoc documentDoc = new DocumentDoc();
		//查询该目录下是否有公文文件存在
		documentDoc.setCatalogUrl(StringUtil.toLikeRight(workOfficeDocForm.getUrl()));
		List list = documentDao.queryDoc(documentDoc);
		if(list != null && list.size() > 0 ){
			throw new RuntimeException("该目录下存在公文，无法删除");
		}
		workOfficeDocForm.setUrl("'"+workOfficeDocForm.getUrl()+"%'");
		if (!documentDao.removeDocument(workOfficeDocForm)) 
			throw new RuntimeException("删除目录或文件失败");
		//documentDao.removeDocumentDoc(workOfficeDocForm);//删除文档
		removeDocumentForTree(DocumentModelConstant.treeList,workOfficeDocForm);
	}
	/**
	 * 删除后修改相应树结构
	 * @param treeList
	 * @param workOfficeDocForm
	 */
	private void removeDocumentForTree(List<DTreeModel> list, WorkOfficeDocForm workOfficeDocForm) {
		
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getThisId().equals(workOfficeDocForm.getCatalogId())) {
				list.remove(i);
				continue;
			}
			if (list.get(i).getChildren() == null && list.get(i).getChildren().size() == 0) 
				continue;
			removeDocumentForTree(list.get(i).getChildren(),workOfficeDocForm);
		}
		
	}
	/**
	 * 修改文件名或者目录名
	 */
	public void updateDocument(WorkOfficeDocForm workOfficeDocForm) {
		
		workOfficeDocForm.setCatalogId(StringUtil.getIdFromUrl(workOfficeDocForm.getUrl()));
		if (!documentDao.updateDocument(workOfficeDocForm))
			throw new RuntimeException("修改文件或目录名失败");
			
		updateDocumentForTree(DocumentModelConstant.treeList,workOfficeDocForm);
	}
	/**
	 * 修改后完成相应的树结构更新
	 * @param treeList
	 * @param workOfficeDocForm
	 */
	private void updateDocumentForTree(List<DTreeModel> list, WorkOfficeDocForm workOfficeDocForm) {
		
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getThisId().equals(workOfficeDocForm.getCatalogId())) {
				list.get(i).setText(workOfficeDocForm.getCatalogName());
			}
			if (list.get(i).getChildren() == null && list.get(i).getChildren().size() == 0) 
				continue;
			updateDocumentForTree(list.get(i).getChildren(),workOfficeDocForm);
		}
	}
	/**
	 * 拖动
	 * @param workOfficeDocForm
	 */
	public void dragDocument(WorkOfficeDocForm workOfficeDocForm) {
		if (workOfficeDocForm.getPoint().equals("append")) {//插入的情况需修改Url和souce的parentGoodsId
			workOfficeDocForm.setTargetId(StringUtil.getIdFromUrl(workOfficeDocForm.getTargetUrl()));//目标ID
			workOfficeDocForm.setSourceId(StringUtil.getIdFromUrl(workOfficeDocForm.getSourceUrl()));//拖动的ID
			workOfficeDocForm.setSourceUrlo(workOfficeDocForm.getTargetUrl()+"_"+workOfficeDocForm.getSourceId());//当前的url
			if (!documentDao.updateDragSourceGoodsUrl(workOfficeDocForm)) 
				throw new RuntimeException("数据库移动失败append");
			workOfficeDocForm.setReplaceUrl("'"+workOfficeDocForm.getSourceUrlo()+"_"+"'");
			workOfficeDocForm.setPreviousUrl("'"+workOfficeDocForm.getSourceUrl()+"_"+"'");
			workOfficeDocForm.setQueryUrl("'"+workOfficeDocForm.getSourceUrl()+"%"+"'");//此步操作可以去数据库一次性
			System.out.println("replaceUrl="+workOfficeDocForm.getReplaceUrl()+",previousUrl="+workOfficeDocForm.getPreviousUrl()+",queryurl="+workOfficeDocForm.getQueryUrl());
			List<DTreeModel> list=documentDao.list(workOfficeDocForm.getSourceId());//判断拖动的那个节点是不是叶子节点
			if (list.size()!=0) {
				if (!documentDao.updateDragLaterUrl(workOfficeDocForm)) 
					throw new RuntimeException("下属物品类Url修改失败append");
			}
			
			if (dragAppendDocumentRemove(workOfficeDocForm, DocumentModelConstant.treeList)) {
				dragAppendDocument(workOfficeDocForm, DocumentModelConstant.treeList);
			}
		}
		if (workOfficeDocForm.getPoint().equals("bottom") || workOfficeDocForm.getPoint().equals("top")) {
			workOfficeDocForm.setTargetId(StringUtil.getIdFromUrl(workOfficeDocForm.getTargetUrl()));
			workOfficeDocForm.setSourceId(StringUtil.getIdFromUrl(workOfficeDocForm.getSourceUrl()));
			workOfficeDocForm.setSourceParentId(StringUtil.getParentIdFromUrl(workOfficeDocForm.getSourceUrl()));
			workOfficeDocForm.setTargetParentId(StringUtil.getParentIdFromUrl(workOfficeDocForm.getTargetUrl()));
			if (!workOfficeDocForm.getSourceParentId().equals(workOfficeDocForm.getTargetParentId())) {
				workOfficeDocForm.setSourceUrlo(workOfficeDocForm.getTargetUrl()+"_"+workOfficeDocForm.getSourceId());
				int lastIndexOf = workOfficeDocForm.getTargetUrl().lastIndexOf("_");
				String endTargetUrl = workOfficeDocForm.getTargetUrl().substring(0,lastIndexOf);//据子类的url截取出父类的url
				workOfficeDocForm.setSourceUrlo(endTargetUrl+"_"+workOfficeDocForm.getSourceId());
				if (!documentDao.updateDragSourceGoodsUrlBt(workOfficeDocForm)) 
					throw new RuntimeException("数据库移动失败bottom,top");
				workOfficeDocForm.setReplaceUrl("'"+workOfficeDocForm.getSourceUrlo()+"_"+"'");
				workOfficeDocForm.setPreviousUrl("'"+workOfficeDocForm.getSourceUrl()+"_"+"'");
				workOfficeDocForm.setQueryUrl("'"+workOfficeDocForm.getSourceUrl()+"%"+"'");//此步操作可以去数据库一次性
				List<DTreeModel> list=documentDao.list(workOfficeDocForm.getSourceId());//判断拖动的那个节点是不是叶子节点
				if (list.size()!=0) {
					if (!documentDao.updateDragLaterUrl(workOfficeDocForm)) 
						throw new RuntimeException("下属物品类Url修改失败botom,top");
				}
				if (dragAppendDocumentRemove(workOfficeDocForm, DocumentModelConstant.treeList.get(0).getChildren())) {
					dragAppendDocumentBt(workOfficeDocForm, DocumentModelConstant.treeList.get(0).getChildren());
				}
				
			}else{
				dragPaiXuSameParent(DocumentModelConstant.treeList.get(0).getChildren(),workOfficeDocForm);
				
			}
		}
	}

	/**
	 * top和bottom的情况下把对象放到拖动后位置
	 * @param workOfficeDocForm
	 * @param list
	 */
	private void dragAppendDocumentBt(WorkOfficeDocForm workOfficeDocForm, List<DTreeModel> list) {//top和bottom
		workOfficeDocForm.getDTreeModel().setId(workOfficeDocForm.getSourceUrlo());
		workOfficeDocForm.getDTreeModel().setThisId(workOfficeDocForm.getSourceId());
		if (workOfficeDocForm.getDTreeModel().getChildren() != null) {
			lala(workOfficeDocForm.getDTreeModel().getChildren(),workOfficeDocForm);
		}
		label2:for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getThisId().equals(workOfficeDocForm.getTargetId())) {
				List<DTreeModel> ll=new ArrayList<>();
				ll.addAll(list);
				workOfficeDocForm.setTreeList(ll);
				
				list.removeAll(list);
				System.out.println("list.size="+workOfficeDocForm.getTreeList().size());
				if (workOfficeDocForm.getPoint().equals("bottom")) {
					workOfficeDocForm.setFlagStr("1");
					workOfficeDocForm.setMflag(true);
					label:for (int j = 0; j < workOfficeDocForm.getTreeList().size()+1; j++) {
						if (workOfficeDocForm.getFlagStr()=="2") {
							System.out.println("近来啦");
							list.add(workOfficeDocForm.getDTreeModel());
							workOfficeDocForm.setFlagStr("3");
							continue label;
						}
						if (workOfficeDocForm.isMflag()) {
							if (workOfficeDocForm.getTargetId().equals(workOfficeDocForm.getTreeList().get(j).getThisId())) {
								System.out.println("jjj="+j);
								workOfficeDocForm.setMflag(false);
								workOfficeDocForm.setFlagStr("2");
							}
						}
						if (workOfficeDocForm.getFlagStr()=="1" || workOfficeDocForm.getFlagStr()=="2") {
							list.add(workOfficeDocForm.getTreeList().get(j));
						}else{
							list.add(workOfficeDocForm.getTreeList().get(j-1));
						}
					}
					break label2;
				}
				if (workOfficeDocForm.getPoint().equals("top")) {
					workOfficeDocForm.setMflag(true);
					label1:for (int k = 0; k < workOfficeDocForm.getTreeList().size()+1; k++) {
						if (workOfficeDocForm.isMflag()) {
							System.out.println("k="+k+",value="+workOfficeDocForm.getTreeList().get(k).getThisId());
							if (workOfficeDocForm.getTargetId().equals(workOfficeDocForm.getTreeList().get(k).getThisId())) {
								list.add(workOfficeDocForm.getDTreeModel());
								workOfficeDocForm.setMflag(false);
								continue label1;
							}
						}
						if (workOfficeDocForm.isMflag()) {
							list.add(workOfficeDocForm.getTreeList().get(k));
						}else{
							list.add(workOfficeDocForm.getTreeList().get(k-1));
						}
						
					}
					break label2;
				}
				
			}
			if (list.get(i).getChildren() == null || list.get(i).getChildren().size() == 0) {
				continue;
			}
			dragAppendDocumentBt(workOfficeDocForm,list.get(i).getChildren());
		}
	}
	/**
	 * 同目录下交换位置
	 * @param list
	 * @param workOfficeDocForm
	 */
	private void dragPaiXuSameParent(List<DTreeModel> list, WorkOfficeDocForm workOfficeDocForm) {
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getThisId().equals(workOfficeDocForm.getSourceId())) {
				List<DTreeModel> ll=new ArrayList<>();
				ll.addAll(list);
				workOfficeDocForm.setTreeList(ll);
				list.removeAll(list);
				workOfficeDocForm.setFlag(true);
				workOfficeDocForm.setMflag(false);
				workOfficeDocForm.setSflag(true);
				String sourStr = workOfficeDocForm.getSourceId();
				String tarStr = workOfficeDocForm.getTargetId();
				DTreeModel lalaTreeModel = null;
				for (int j = 0; j < workOfficeDocForm.getTreeList().size(); j++) {
					if (workOfficeDocForm.getTreeList().get(j).getThisId().equals(sourStr)) {
						lalaTreeModel = workOfficeDocForm.getTreeList().remove(j);
					}
				}
				//处理位置顺序
				if (workOfficeDocForm.getPoint().equals("top")) {
					System.out.println("size="+workOfficeDocForm.getTreeList().size()+1);
					for (int j = 0; j < workOfficeDocForm.getTreeList().size()+1; j++) {
						if (workOfficeDocForm.isSflag()) {
							if (workOfficeDocForm.getTreeList().get(j).getThisId().equals(tarStr)) {
								workOfficeDocForm.setFlag(false);
								workOfficeDocForm.setMflag(true);
								workOfficeDocForm.setSflag(false);
							}
						}
						if (workOfficeDocForm.isFlag()) {
							if (workOfficeDocForm.isMflag()) {
								j -= 1;
							}
							list.add(workOfficeDocForm.getTreeList().get(j));
						}else{
							list.add(lalaTreeModel);
							workOfficeDocForm.setFlag(true);
						}
					}
				}
				if (workOfficeDocForm.getPoint().equals("bottom")) {
					for (int j = 0; j < workOfficeDocForm.getTreeList().size()+1; j++) {
					if (workOfficeDocForm.isSflag()) {
						if (workOfficeDocForm.getTreeList().get(j).getThisId().equals(tarStr)) {
							list.add(workOfficeDocForm.getTreeList().get(j));
							workOfficeDocForm.setFlag(false);
							workOfficeDocForm.setMflag(true);
							workOfficeDocForm.setSflag(false);
							continue;
						}
					}
						if (workOfficeDocForm.isFlag()) {
							if (workOfficeDocForm.isMflag()) {
								j -= 1;
							}
							list.add(workOfficeDocForm.getTreeList().get(j));
						}else{
							list.add(lalaTreeModel);
							workOfficeDocForm.setFlag(true);
						}
						
					}
					
				}
				for (int j = 0; j < list.size(); j++) {
					
					System.out.println("====最后的="+list.get(i).getText());
				}
			}
			if (list.get(i).getChildren() != null) {
				dragPaiXuSameParent(list.get(i).getChildren(), workOfficeDocForm);
			}
		}
	}
	/**
	 * append的情况下把对象放到拖动后位置
	 * @param workOfficeDocForm
	 * @param list
	 */
	private void dragAppendDocument(WorkOfficeDocForm workOfficeDocForm, List<DTreeModel> list) {
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getThisId().equals(workOfficeDocForm.getTargetId())) {
				System.out.println("soururlO="+workOfficeDocForm.getSourceUrlo()+",replace="+workOfficeDocForm.getReplaceUrl()+",previous="+workOfficeDocForm.getPreviousUrl());
				workOfficeDocForm.getDTreeModel().setId(workOfficeDocForm.getSourceUrlo());
				workOfficeDocForm.getDTreeModel().setThisId(workOfficeDocForm.getSourceId());
				if (workOfficeDocForm.getDTreeModel().getChildren() != null ) {
					lala(workOfficeDocForm.getDTreeModel().getChildren(),workOfficeDocForm);
				}
				if (list.get(i).getChildren() == null) {
					List<DTreeModel> list2 = new ArrayList<>();
					list.get(i).setChildren(list2);
				}
				list.get(i).getChildren().add(workOfficeDocForm.getDTreeModel());
 			}
			if (list.get(i).getChildren() == null || list.get(i).getChildren().size() == 0 ) {
				continue;
			}
			dragAppendDocument(workOfficeDocForm,list.get(i).getChildren());
		}
	}
	/**
	 * 处理顺序
	 * @param list
	 * @param workOfficeDocForm
	 */
	private void lala(List<DTreeModel> list, WorkOfficeDocForm workOfficeDocForm) {
		for (int i = 0; i < list.size(); i++) {
			System.out.println("原来的每个Url="+list.get(i).getId()+",previousUrl="+workOfficeDocForm.getPreviousUrl().replace("'", "")+",replaceUrl="+workOfficeDocForm.getReplaceUrl().replace("'", "")+",改后的Url="+list.get(i).getId().replace(workOfficeDocForm.getPreviousUrl(), workOfficeDocForm.getReplaceUrl()));
			list.get(i).setId(list.get(i).getId().replace(workOfficeDocForm.getPreviousUrl().replace("'", ""), workOfficeDocForm.getReplaceUrl().replace("'", "")));
			if (list.get(i).getChildren() == null || list.get(i).getChildren().size() == 0) {
				continue;
			}
			lala(list.get(i).getChildren(),workOfficeDocForm);
		}
	}
	/**
	 * 删除拖动前的对象
	 * @param workOfficeDocForm
	 * @param list
	 * @return
	 */
	private boolean dragAppendDocumentRemove(WorkOfficeDocForm workOfficeDocForm, List<DTreeModel> list) {
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getThisId().equals(workOfficeDocForm.getSourceId())) {
				DTreeModel removeTreeModel=list.remove(i);
				workOfficeDocForm.setDTreeModel(removeTreeModel);
				return true;
			}
			if (list.get(i).getChildren() == null || list.get(i).getChildren().size() == 0 ) {
				continue;
			}
			if (list.get(i).getChildren() != null) {
				
				dragAppendDocumentRemove(workOfficeDocForm,list.get(i).getChildren());
			}
		}
		return true;
	}
	
	/**
	 * 查询一个文档类别下的公文文档列表
	 */
	public PageModel<DocumentDoc> queryDoc(DocumentDoc documentDoc){
		documentDoc.setDocName(StringUtil.toLikeAll(documentDoc.getDocName()));
		documentDoc.setCatalogUrl(StringUtil.toLikeRight(documentDoc.getCatalogUrl()));
		PageHelper.startPage(documentDoc.getPage(), documentDoc.getRows());
		List<DocumentDoc>list = documentDao.queryDoc(documentDoc);
		PageModel<DocumentDoc> page = new PageModel<DocumentDoc>((Page<DocumentDoc>)list);
		return page;
	}
	
	/**
	 * 删除一个公文
	 */
	public void deleteDoc(String docId){
		documentDao.deleteDoc(docId);
	}
	
}
