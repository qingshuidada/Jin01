package com.mdoa.admin.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mdoa.admin.dao.SuppliesTreeDao;
import com.mdoa.admin.model.OfficeSuppliesType;
import com.mdoa.admin.model.SuppliesModel;
import com.mdoa.constant.TreeModelConstant;
import com.mdoa.util.StringUtil;

@Service
@Transactional
public class SuppliesTreeService {

	@Autowired
	private SuppliesTreeDao suppliesTreeDao;
	
	
	
	public void allTreeMethod(OfficeSuppliesType suppliesType){
		synchronized (this) {
			
			if (suppliesType.getAction().equals("添加")) {
				addSuppliesType(suppliesType);
			}
			if (suppliesType.getAction().equals("删除")) {
				removeSuppliesType(suppliesType);
			}
			if (suppliesType.getAction().equals("修改")) {
				editSuppliesType(suppliesType);
			}
			if (suppliesType.getAction().equals("拖动")) {
				dragSuppliesType(suppliesType);
			}
		}
		
	}
	
	
	
	/**
	 * 修改
	 * @param suppliesType
	 * @param list
	 */
	public void updateTreeState(OfficeSuppliesType suppliesType,List<SuppliesModel> list){
		for(int i = 0; i < list.size();i++ ){
			if (list.get(i).getId().equals(suppliesType.getSuppliesTypeUrl()) && suppliesType.getState().equals("onCollapse"))
				list.get(i).setState("closed");
			if (list.get(i).getId().equals(suppliesType.getSuppliesTypeUrl()) && suppliesType.getState().equals("onExpand"))
				list.get(i).setState("open");
			if (list.get(i).getChildren() != null)
				updateTreeState(suppliesType, list.get(i).getChildren());
		}
	}
	/**
	 * 根据父ID实现树结构
	 * @param pid
	 * @return
	 */
	public List<SuppliesModel> selectTree(String pid){
		//根据父ID获得子类集合
		List<SuppliesModel> models=suppliesTreeDao.list(pid);
		for(SuppliesModel model : models){
			model.setChildren(selectTree(model.getThisId()));
		}
		return models;
	}
	
	/**
	 *在当前父id下添加一个办公类
	 * @param assetsType
	 */
	public void addSuppliesType(OfficeSuppliesType suppliesType){
		if(suppliesType.getSuppliesTypeName() == null || suppliesType.getSuppliesTypeName() == "")
		throw new RuntimeException("添加的办公类不能为空");
		suppliesType.setParentTypeId(StringUtil.getIdFromUrl(suppliesType.getSuppliesTypeUrl()));
		String uuid = suppliesTreeDao.getuuid();
		suppliesType.setSuppliesTypeId(uuid);
		suppliesType.setSuppliesTypeUrl(suppliesType.getSuppliesTypeUrl()+"_"+uuid);
		if (!suppliesTreeDao.addSuppliesType(suppliesType)) {
			throw new RuntimeException("添加办公类型失败");
		}else{
			updateDocument(suppliesType, TreeModelConstant.supplieslist, uuid);//递归把添加的类设置进去
		}
		
	}
	
	/**
	 * 添加后递归设置数结构
	 * @param assetsType
	 * @param list
	 * @param uuid
	 * @return
	 */
	public List<SuppliesModel> updateDocument(OfficeSuppliesType suppliesType,List<SuppliesModel> list,String uuid){
		if(suppliesType.getParentTypeId() == null)
			throw new RuntimeException("ID不能为空");
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getThisId().equals(suppliesType.getParentTypeId())) {
				SuppliesModel model = new SuppliesModel();
				model.setId(suppliesType.getSuppliesTypeUrl());
				model.setThisId(uuid);
				model.setText(suppliesType.getSuppliesTypeName());
				if(list.get(i).getChildren() == null){
					List<SuppliesModel> list2 = new ArrayList<>();
					list.get(i).setChildren(list2);
				}
				list.get(i).getChildren().add(model);
				continue;
			}
			if(list.get(i).getChildren() == null || list.get(i).getChildren().size() == 0){
				continue;
			}
			updateDocument(suppliesType, list.get(i).getChildren(), uuid);
		}
		return list;	
	}
	
	public void removeSuppliesType(OfficeSuppliesType suppliesType){
		if(StringUtil.getIdFromUrl(suppliesType.getSuppliesTypeUrl()) == "0")
			throw new RuntimeException("无法删除根目录");
		suppliesType.setSuppliesTypeId(StringUtil.getIdFromUrl(suppliesType.getSuppliesTypeUrl()));
		suppliesType.setSuppliesTypeUrl("'"+suppliesType.getSuppliesTypeUrl()+"%"+"'");
		List<OfficeSuppliesType> list = suppliesTreeDao.isSuppliesBelowType(suppliesType);
		if(list.size() != 0)
			throw new RuntimeException("办公类下办公用品为空");
		if(!suppliesTreeDao.removeSuppliesType(suppliesType))
			throw new RuntimeException("删除数据库类别失败");
		
		removeDocument(suppliesType,TreeModelConstant.supplieslist.get(0).getChildren());
	}
	/**
	 * 删除后递归树结构
	 * @param suppliesType
	 * @param list
	 */
	private boolean removeDocument(OfficeSuppliesType suppliesType, List<SuppliesModel> list) {
		if(suppliesType.getSuppliesTypeId() == null || suppliesType.getSuppliesTypeId() == "")
		throw new RuntimeException("删除的办公用品id不能为空");
		for(int i = 0; i < list.size(); i++){
			if (list.get(i).getThisId().equals(suppliesType.getSuppliesTypeId())) {
				list.remove(i);
				return true;
			}
			if(list.get(i).getChildren() == null || list.get(i).getChildren().size() == 0){
				continue;
			}
			
			removeDocument(suppliesType, list.get(i).getChildren());
		}
		return true;
	}
	/**
	 * 根据前台传来的id和名字，进行修改
	 * @param suppliesType
	 */
	public void editSuppliesType(OfficeSuppliesType suppliesType){
		if(suppliesType.getSuppliesTypeName() == null || suppliesType.getSuppliesTypeName() == "")
			throw new RuntimeException("修改的办公用品类名字不能为空");
		suppliesType.setSuppliesTypeId(StringUtil.getIdFromUrl(suppliesType.getSuppliesTypeUrl()));
		if(!suppliesTreeDao.editSuppliesType(suppliesType))
			throw new RuntimeException();
		editDocument(suppliesType,TreeModelConstant.supplieslist);
		
	}
	/**
	 * 修改数据库后对树节点进行相应的修改
	 * @param suppliesType
	 * @param list
	 * @return
	 */
	private boolean editDocument(OfficeSuppliesType suppliesType, List<SuppliesModel> list) {
		
		if(suppliesType.getSuppliesTypeId() == null || suppliesType.getSuppliesTypeId() == "")
			throw new RuntimeException("修改的办公类id不能为空");
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getThisId().equals(suppliesType.getSuppliesTypeId())) {
				list.get(i).setText(suppliesType.getSuppliesTypeName());
				return true;
			}
			if (list.get(i).getChildren() == null || list.get(i).getChildren().size() == 0) {
				continue;
			}
			editDocument(suppliesType, list.get(i).getChildren());
		}
		return true;
	}
	/**
	 * 拖动
	 * @param suppliesType
	 */
	public void dragSuppliesType(OfficeSuppliesType dragModel){
		if(dragModel.getPoint().equals("append")){
			dragModel.setTargetId(StringUtil.getIdFromUrl(dragModel.getTargetUrl()));
			dragModel.setSourceId(StringUtil.getIdFromUrl(dragModel.getSourceUrl()));
			dragModel.setSourceUrlo(dragModel.getTargetUrl()+"_"+dragModel.getSourceId());
			if(!suppliesTreeDao.updateDragSourceSuppliesUrl(dragModel))
				throw new RuntimeException("数据库移动失败append");
			dragModel.setReplaceUrl("'"+dragModel.getSourceUrlo()+"_"+"'");
			dragModel.setPreviousUrl("'"+dragModel.getSourceUrl()+"_"+"'");
			dragModel.setQueryUrl("'"+dragModel.getSourceUrl()+"%"+"'");
			List<SuppliesModel> list = suppliesTreeDao.list(dragModel.getSourceId());
			if(list.size() != 0){
				if(!suppliesTreeDao.updateDragLaterUrl(dragModel))
					throw new RuntimeException("下属办公类url修改失败append");
			}
			if(dragAppendDocumentRemove(dragModel,TreeModelConstant.supplieslist.get(0).getChildren())){
				dragAppendDocumentBt(dragModel,TreeModelConstant.supplieslist.get(0).getChildren());	
			}		
		}else{
			dragPaiXuSameParent(TreeModelConstant.supplieslist.get(0).getChildren(),dragModel);
		}
		
		
		
	}
	private void dragAppendDocumentBt(OfficeSuppliesType dragModel, List<SuppliesModel> list) {
		dragModel.getSuppliesModel().setId(dragModel.getSourceUrlo());
		dragModel.getSuppliesModel().setThisId(dragModel.getSourceId());
		if (dragModel.getSuppliesModel().getChildren() != null) {
			lala(dragModel.getSuppliesModel().getChildren(),dragModel);
		}
		label2:for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getThisId().equals(dragModel.getTargetId())) {
				List<SuppliesModel> ll=new ArrayList<>();
				ll.addAll(list);
				dragModel.setTreeList(ll);
				
				list.removeAll(list);
				System.out.println("list.size="+dragModel.getTreeList().size());
				if (dragModel.getPoint().equals("bottom")) {
					dragModel.setFlagStr("1");
					dragModel.setMflag(true);
					label:for (int j = 0; j < dragModel.getTreeList().size()+1; j++) {
						if (dragModel.getFlagStr()=="2") {
							System.out.println("近来啦");
							list.add(dragModel.getSuppliesModel());
							dragModel.setFlagStr("3");
							continue label;
						}
						if (dragModel.isMflag()) {
							if (dragModel.getTargetId().equals(dragModel.getTreeList().get(j).getThisId())) {
								System.out.println("jjj="+j);
								dragModel.setMflag(false);
								dragModel.setFlagStr("2");
							}
						}
						if (dragModel.getFlagStr()=="1" || dragModel.getFlagStr()=="2") {
							list.add(dragModel.getTreeList().get(j));
						}else{
							list.add(dragModel.getTreeList().get(j-1));
						}
					}
					break label2;
				}
				if (dragModel.getPoint().equals("top")) {
					dragModel.setMflag(true);
					label1:for (int k = 0; k < dragModel.getTreeList().size()+1; k++) {
						if (dragModel.isMflag()) {
							System.out.println("k="+k+",value="+dragModel.getTreeList().get(k).getThisId());
							if (dragModel.getTargetId().equals(dragModel.getTreeList().get(k).getThisId())) {
								list.add(dragModel.getSuppliesModel());
								dragModel.setMflag(false);
								continue label1;
							}
						}
						if (dragModel.isMflag()) {
							list.add(dragModel.getTreeList().get(k));
						}else{
							list.add(dragModel.getTreeList().get(k-1));
						}
						
					}
					break label2;
				}
				
			}
			if (list.get(i).getChildren() == null || list.get(i).getChildren().size() == 0) {
				continue;
			}
			dragAppendDocumentBt(dragModel,list.get(i).getChildren());
		}
	}
	private void dragPaiXuSameParent(List<SuppliesModel> list, OfficeSuppliesType dragModel) {
		for(int i = 0; i < list.size(); i++){
			if(list.get(i).getThisId().equals(dragModel.getSourceId())){
				List<SuppliesModel> ll = new ArrayList<>();
				ll.addAll(list);
				dragModel.setTreeList(ll);
				list.removeAll(list);
				dragModel.setFlag(true);
				dragModel.setMflag(false);
				dragModel.setSflag(true);
				String sourStr = dragModel.getSourceId();
				String tarStr = dragModel.getTargetId();
				SuppliesModel lalaTreeModel = null;
				for (int j = 0; j < dragModel.getTreeList().size(); j++) {
					if (dragModel.getTreeList().get(j).getThisId().equals(sourStr)) {
						lalaTreeModel = dragModel.getTreeList().remove(j);
					}
				}
				//处理位置顺序
				if (dragModel.getPoint().equals("top")) {
					System.out.println("size="+dragModel.getTreeList().size()+1);
					for (int j = 0; j < dragModel.getTreeList().size()+1; j++) {
						if (dragModel.isSflag()) {
							if (dragModel.getTreeList().get(j).getThisId().equals(tarStr)) {
								dragModel.setFlag(false);
								dragModel.setMflag(true);
								dragModel.setSflag(false);
							}
						}
						if (dragModel.isFlag()) {
							if (dragModel.isMflag()) {
								j -= 1;
							}
							list.add(dragModel.getTreeList().get(j));
						}else{
							list.add(lalaTreeModel);
							dragModel.setFlag(true);
						}
					}
				}
				if (dragModel.getPoint().equals("bottom")) {
					for (int j = 0; j < dragModel.getTreeList().size()+1; j++) {
					if (dragModel.isSflag()) {
						if (dragModel.getTreeList().get(j).getThisId().equals(tarStr)) {
							list.add(dragModel.getTreeList().get(j));
							dragModel.setFlag(false);
							dragModel.setMflag(true);
							dragModel.setSflag(false);
							continue;
						}
					}
						if (dragModel.isFlag()) {
							if (dragModel.isMflag()) {
								j -= 1;
							}
							list.add(dragModel.getTreeList().get(j));
						}else{
							list.add(lalaTreeModel);
							dragModel.setFlag(true);
						}
						
					}
					
				}
				
					for (int j = 0; j < list.size(); j++) {
					
					System.out.println("====最后的="+list.get(i).getText());
				}
			}
			if(list.get(i).getChildren() != null){
				dragPaiXuSameParent(list.get(i).getChildren(), dragModel);
			}
			
		}
		
		
		
	}
	private boolean dragAppendDocumentRemove(OfficeSuppliesType dragModel, List<SuppliesModel> list) {

		for(int i = 0; i < list.size(); i++){
			if(list.get(i).getThisId().equals(dragModel.getSourceId())){
				SuppliesModel removeTreeModel = list.remove(i);
				dragModel.setSuppliesModel(removeTreeModel);
				return true;
			}
			if (list.get(i).getChildren() == null || list.get(i).getChildren().size() == 0 ) {
				continue;
			}
			if (list.get(i).getChildren() != null) {
				
				dragAppendDocumentRemove(dragModel,list.get(i).getChildren());
			}
		}	
		return true;
	}
	private void dragAppendDocument(OfficeSuppliesType dragModel, List<SuppliesModel> list) {
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getThisId().equals(dragModel.getTargetId())) {
				System.out.println("soururlO="+dragModel.getSourceUrlo()+",replace="+dragModel.getReplaceUrl()+",previous="+dragModel.getPreviousUrl());
				dragModel.getSuppliesModel().setId(dragModel.getSourceUrlo());
				dragModel.getSuppliesModel().setThisId(dragModel.getSourceId());
				if (dragModel.getSuppliesModel().getChildren() != null ) {
					lala(dragModel.getSuppliesModel().getChildren(),dragModel);
				}
				if (list.get(i).getChildren() == null) {
					List<SuppliesModel> list2 = new ArrayList<>();
					list.get(i).setChildren(list2);
				}
				list.get(i).getChildren().add(dragModel.getSuppliesModel());
 			}
			if (list.get(i).getChildren() == null || list.get(i).getChildren().size() == 0 ) {
				continue;
			}
			dragAppendDocument(dragModel,list.get(i).getChildren());
		}
		
		
		
	}
	private void lala(List<SuppliesModel> list, OfficeSuppliesType dragModel) {
		for (int i = 0; i < list.size(); i++) {
			System.out.println("原来的每个Url="+list.get(i).getId()+",previousUrl="+dragModel.getPreviousUrl().replace("'", "")+",replaceUrl="+dragModel.getReplaceUrl().replace("'", "")+",改后的Url="+list.get(i).getId().replace(dragModel.getPreviousUrl(), dragModel.getReplaceUrl()));
			list.get(i).setId(list.get(i).getId().replace(dragModel.getPreviousUrl().replace("'", ""), dragModel.getReplaceUrl().replace("'", "")));
			if (list.get(i).getChildren() == null || list.get(i).getChildren().size() == 0) {
				continue;
			}
			lala(list.get(i).getChildren(),dragModel);
		}	
		
	}
	
	
	
}
