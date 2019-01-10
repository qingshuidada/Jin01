package com.mdoa.work.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mdoa.base.model.PageModel;
import com.mdoa.base.service.BaseService;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.DateUtil;
import com.mdoa.util.StringUtil;
import com.mdoa.work.bo.WorkOfficeKnowEntity;
import com.mdoa.work.bo.WorkOfficeKnowForm;
import com.mdoa.work.dao.KnowDao;
import com.mdoa.work.model.WorkOfficeKnowFirstCategory;

@Service
public class KnowService extends BaseService{
	
	@Autowired
	private KnowDao knowDao;
	
	/**
	 * 查询一级类别
	 * @param workOfficeDocForm
	 * @return
	 */
	@Transactional
	public PageModel<WorkOfficeKnowForm> queryFirstCategory(WorkOfficeKnowForm workOfficeKnowForm) {
		
		PageHelper.startPage(workOfficeKnowForm.getPage(), workOfficeKnowForm.getRows());
		List<WorkOfficeKnowForm> list = knowDao.queryFirstCategory(workOfficeKnowForm);
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getDocId() == null) {
				list.get(i).setIsDeleteFlag("1");
			}else{
				list.get(i).setIsDeleteFlag("0");
			}
		}
		PageModel<WorkOfficeKnowForm> pageModel = new PageModel<>((Page<WorkOfficeKnowForm>)list);
		
		return pageModel;
	}
	/**
	 * 添加一级类别
	 * @param workOfficeDocForm
	 */
	@Transactional
	public void addFirstCategory(WorkOfficeKnowForm workOfficeKnowForm) {
		List<WorkOfficeKnowForm> list = knowDao.queryFirstCategory(workOfficeKnowForm);
		if (StringUtil.isEmpty(workOfficeKnowForm.getFirstCategoryName())) 
			throw new RuntimeException("类名不能为空");
		if (list.size() == 0) {
			workOfficeKnowForm.setOrderCode(0);
		}else{
			workOfficeKnowForm.setOrderCode(list.get(list.size()-1).getOrderCode()+1);
		}
		if (!knowDao.addFirstCategory(workOfficeKnowForm)) 
			throw new RuntimeException("添加一级类别失败");
		
	}
	/**
	 * 修改一级类别
	 * @param workOfficeKnowForm
	 */
	@Transactional
	public void updateFirstCategory(WorkOfficeKnowForm workOfficeKnowForm) {
		if (!knowDao.updateFirstCategory(workOfficeKnowForm)) 
			throw new RuntimeException("修改一级类别失败");
	}
	/**
	 * 上下移动一级类别
	 * @param workOfficeKnowForm
	 */
	@Transactional
	public void upDownMoveForFirstCategory(String jsonString, HttpServletRequest request) {
		UserInfo userInfo = getUser(request);
		String updateUserId =userInfo.getUserId();
		String updateUserName = userInfo.getUserName();
		Gson gson = new Gson();
		List<WorkOfficeKnowFirstCategory> list = gson.fromJson(jsonString, new TypeToken<List<WorkOfficeKnowFirstCategory>>(){}.getType());
		for (int i = 0; i < list.size(); i++) {
			WorkOfficeKnowForm workOfficeKnowForm = new WorkOfficeKnowForm();
			workOfficeKnowForm.setFirstCategoryId(list.get(i).getFirstCategoryId());
			workOfficeKnowForm.setOrderCode(list.get(i).getOrderCode());
			workOfficeKnowForm.setUpdateUserId(updateUserId);
			workOfficeKnowForm.setUpdateUserName(updateUserName);
			updateFirstCategory(workOfficeKnowForm);
		}
	}
	/**
	 * 保存文档
	 */
	@Transactional
	public void saveDoc(WorkOfficeKnowForm workOfficeKnowForm) {
		if (StringUtil.isEmpty(workOfficeKnowForm.getTitleName())) 
			workOfficeKnowForm.setTitleName("未命名");
		if (StringUtil.isEmpty(workOfficeKnowForm.getText())) 
			workOfficeKnowForm.setText(null);
		if (StringUtil.isEmpty(workOfficeKnowForm.getFirstCategoryId())) 
			workOfficeKnowForm.setFirstCategoryId(null);			
		if (!knowDao.saveDoc(workOfficeKnowForm)) 
			throw new RuntimeException("保存文档失败");
	}
	/**
	 * 修改文档
	 * @param workOfficeKnowForm
	 */
	@Transactional
	public void updateDoc(WorkOfficeKnowForm workOfficeKnowForm) {
		if (!knowDao.updateDoc(workOfficeKnowForm)) 
			throw new RuntimeException("修改文档表失败");
	}
	/**
	 * 查询文档
	 */
	public PageModel<WorkOfficeKnowForm> queryDoc(WorkOfficeKnowForm workOfficeKnowForm) {
		if (!StringUtil.isEmpty(workOfficeKnowForm.getTitleName())) 
			workOfficeKnowForm.setTitleName("%"+workOfficeKnowForm.getTitleName()+"%");
		if (!StringUtil.isEmpty(workOfficeKnowForm.getDepartmentUrl()))
			workOfficeKnowForm.setDepartmentUrl(workOfficeKnowForm.getDepartmentUrl()+"%");
		PageHelper.startPage(workOfficeKnowForm.getPage(), workOfficeKnowForm.getRows());
		List<WorkOfficeKnowForm> list = knowDao.queryDoc(workOfficeKnowForm);
		PageModel<WorkOfficeKnowForm> pageModel = new PageModel<>((Page<WorkOfficeKnowForm>)list);
		
		return pageModel;
	}
	/**
	 * 查询文档详情内容
	 * @param workOfficeKnowForm
	 * @return
	 */
	@Transactional
	public WorkOfficeKnowForm queryDocDetail(WorkOfficeKnowForm workOfficeKnowForm) {
		if (!StringUtil.isEmpty(workOfficeKnowForm.getTitleName())) 
			workOfficeKnowForm.setTitleName("%"+workOfficeKnowForm.getTitleName()+"%");
		WorkOfficeKnowForm form = new WorkOfficeKnowForm();
		
		//查询评论数据
		//List<WorkOfficeKnowForm> cList = groupCommentUser(knowDao.queyComment(workOfficeKnowForm),workOfficeKnowForm);
		List<WorkOfficeKnowForm> queyComment = knowDao.queyComment(workOfficeKnowForm);
		PageHelper.startPage(workOfficeKnowForm.getPage(), workOfficeKnowForm.getRows());
		List<WorkOfficeKnowForm> list = knowDao.queryDoc(workOfficeKnowForm);
		PageModel<WorkOfficeKnowForm> pageModel = new PageModel<>((Page<WorkOfficeKnowForm>)list);
		
		form.setPageModel(pageModel);
		form.setList(queyComment);
		return form;
	}
	private  List<WorkOfficeKnowForm> groupCommentUser(List<WorkOfficeKnowForm> queyComment, WorkOfficeKnowForm workOfficeKnowForm) {
		HashMap<String, List<WorkOfficeKnowForm>> hashMap = new HashMap<>();
		
		for (int i = 0; i < queyComment.size(); i++) {
			if (hashMap.get(queyComment.get(i).getCommentUserId()) == null){
				List<WorkOfficeKnowForm> list1 = new ArrayList<>();
				list1.add(queyComment.get(i));
				hashMap.put(queyComment.get(i).getCommentUserId(), list1);
			}else{
				hashMap.get(queyComment.get(i).getCommentUserId()).add(queyComment.get(i));
			}
		}
		List<WorkOfficeKnowForm> list = knowDao.queryGroupUser(workOfficeKnowForm);//查询所有评论人ID
		List<WorkOfficeKnowForm> list2 = new ArrayList<>();
		for (int i = 0; i < list.size(); i++) {
			String createTimeStr = hashMap.get(list.get(i).getCommentUserId()).get(0).getCreateTimeStr();
			WorkOfficeKnowForm form = new WorkOfficeKnowForm();
			form.setCommentUserId(list.get(i).getCommentUserId());
			form.setCommentUserName(list.get(i).getCommentUserName());
			form.setCreateTimeStr(createTimeStr);
			list2.add(form);
		}
		for (int i = 0; i < list2.size(); i++)
        {
            for (int j = i; j < list2.size(); j++)
            {
                if (DateUtil.compare_date(list2.get(i).getCreateTimeStr(), list2.get(j).getCreateTimeStr()) == -1)
                {
                    WorkOfficeKnowForm tempi = list2.get(i);
                    WorkOfficeKnowForm tempj = list2.get(j);
                    list2.set(i, tempj);
                    list2.set(j, tempi);
                }
            }
        }
		for (int i = 0; i < list2.size(); i++) {
			list2.get(i).setList(hashMap.get(list2.get(i).getCommentUserId()));
		}
		return list2;
	}
	/**
	 * 提交评论
	 * @param workOfficeKnowForm
	 */
	@Transactional
	public void saveComment(WorkOfficeKnowForm workOfficeKnowForm) {
		workOfficeKnowForm.setReplyFlag("--");
		if (!knowDao.saveComment(workOfficeKnowForm)) 
			throw new RuntimeException("评论失败");
		if (!knowDao.updateDoc(workOfficeKnowForm)) 
			throw new RuntimeException("修改评论数失败");
	}
	/**
	 * 测试啦啦啦
	 * @param workOfficeKnowForm
	 * @return
	 */
	public String test(WorkOfficeKnowForm workOfficeKnowForm) {
		
		List<WorkOfficeKnowForm> cList = groupCommentUser(knowDao.queyComment(workOfficeKnowForm),workOfficeKnowForm);
		Gson gson = new Gson();
		return gson.toJson(cList);
	}
	/**
	 * 查询二级分类
	 * @param workOfficeKnowForm
	 * @return
	 */
	public PageModel<WorkOfficeKnowForm> querySecondCategory(WorkOfficeKnowForm workOfficeKnowForm) {
		
		PageHelper.startPage(workOfficeKnowForm.getPage(),workOfficeKnowForm.getRows());
		List<WorkOfficeKnowForm> list = knowDao.querySecondCategory(workOfficeKnowForm);
		for (int i = 0; i < list.size(); i++) {
			System.out.println("i="+i+",docId="+list.get(i).getDocId());
			if (list.get(i).getDocId() == null) {
				list.get(i).setIsDeleteFlag("1");
			}else{
				list.get(i).setIsDeleteFlag("0");
			}
		}
		PageModel<WorkOfficeKnowForm> pageModel = new PageModel<>((Page<WorkOfficeKnowForm>)list);
		return pageModel;
	}
	/**
	 * 添加二级分类
	 * @param workOfficeKnowForm
	 */
	public void addSecondCategory(WorkOfficeKnowForm workOfficeKnowForm) {
		/*List<WorkOfficeKnowForm> list = knowDao.querySecondCategory(workOfficeKnowForm);
		if (list.size() == 0) {
			workOfficeKnowForm.setOrderCode(0);
		}else{
			workOfficeKnowForm.setOrderCode(list.get(0).getOrderCode()+1);
		}*/
		System.out.println("----二级添加类别");
		if (!knowDao.addSecondCategory(workOfficeKnowForm)) 
			throw new RuntimeException("添加二级分类失败");
	}
	/**
	 * 查询一级分类以及二级分类
	 */
	@Transactional
	public PageModel<WorkOfficeKnowForm> queryFirstAndSecondCategory(WorkOfficeKnowForm workOfficeKnowForm) {
		
		List<WorkOfficeKnowForm> secondList = knowDao.queryFirstAndSecondCategory(workOfficeKnowForm);
		PageHelper.startPage(workOfficeKnowForm.getPage(),workOfficeKnowForm.getRows());
		List<WorkOfficeKnowForm> list = knowDao.queryFirstCategory(workOfficeKnowForm);
		
		for (int i = 0; i < list.size(); i++) {
			for (int j = 0; j < secondList.size(); j++) {
				System.out.println(list.get(i).getFirstCategoryId()+",,,,"+secondList.get(j).getFirstCategoryId());
				if (list.get(i).getFirstCategoryId().equals(secondList.get(j).getFirstCategoryId())) {
					if (list.get(i).getList() == null) {
						list.get(i).setList(new ArrayList<>());
					}
					list.get(i).getList().add(secondList.get(j));
				}
			}
		}
		PageModel<WorkOfficeKnowForm> pageModel = new PageModel<>((Page<WorkOfficeKnowForm>)list);
		return pageModel;
	}
	/**
	 * 修改二级类别
	 * @param form 
	 */
	public void updateSecondCategory(WorkOfficeKnowForm form){
		if (!knowDao.updateSecondCategory(form)) 
			throw new RuntimeException("修改二级类别失败");
	}
	/**
	 * 修改子类别
	 * @param jsonString
	 * @param request
	 */
	@Transactional
	public void updateSubCategory(String jsonString, HttpServletRequest request) {
		UserInfo userInfo = getUser(request);
		String updateUserId =userInfo.getUserId();
		String updateUserName = userInfo.getUserName();
		Gson gson = new Gson();
		WorkOfficeKnowEntity workOfficeKnowEntity = gson.fromJson(jsonString,WorkOfficeKnowEntity.class);
		for (int i = 0; i < workOfficeKnowEntity.getList().size(); i++) {
			if (workOfficeKnowEntity.getList().get(i).getDeleteFlag() != null && workOfficeKnowEntity.getList().get(i).getDeleteFlag().equals("1")) {//删除
				WorkOfficeKnowForm form = new WorkOfficeKnowForm();
				form.setSecondCategoryId(workOfficeKnowEntity.getList().get(i).getSecondCategoryId());
				form.setAliveFlag("0");
				form.setUpdateUserId(updateUserId);
				form.setUpdateUserName(updateUserName);
				updateSecondCategory(form);
			}else if(workOfficeKnowEntity.getList().get(i).getAddFlag() != null && workOfficeKnowEntity.getList().get(i).getAddFlag().equals("1")){//添加
				WorkOfficeKnowForm form = new WorkOfficeKnowForm();
				form.setCreateUserId(updateUserId);
				form.setCreateUserName(updateUserName);
				form.setSecondCategoryName(workOfficeKnowEntity.getList().get(i).getSecondCategoryName());
				form.setFirstCategoryId(workOfficeKnowEntity.getFirstCategoryId());
				form.setOrderCode(workOfficeKnowEntity.getList().get(i).getOrderCode());
				addSecondCategory(form);
			}else {//修改
				WorkOfficeKnowForm form = new WorkOfficeKnowForm();
				form.setSecondCategoryId(workOfficeKnowEntity.getList().get(i).getSecondCategoryId());
				form.setSecondCategoryName(workOfficeKnowEntity.getList().get(i).getSecondCategoryName());
				form.setOrderCode(workOfficeKnowEntity.getList().get(i).getOrderCode());
				form.setUpdateUserId(updateUserId);
				form.setUpdateUserName(updateUserName);
				updateSecondCategory(form);
			}
		}
		
	}
	
	
	
	
	
}
