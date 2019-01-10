package com.mdoa.personnel.service;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.base.model.PageModel;
import com.mdoa.base.service.BaseService;
import com.mdoa.framework.dao.DepartmentDao;
import com.mdoa.framework.dao.PostDao;
import com.mdoa.personnel.bo.BirthForm;
import com.mdoa.personnel.bo.WelfareApplyExamineForm;
import com.mdoa.personnel.bo.WelfareApplyForm;
import com.mdoa.personnel.bo.WelfareObjForm;
import com.mdoa.personnel.bo.WelfareRecordForm;
import com.mdoa.personnel.bo.WelfareStreamForm;
import com.mdoa.personnel.dao.WelfareDao;
import com.mdoa.personnel.model.Welfare;
import com.mdoa.user.dao.UserInfoDao;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.DateUtil;
import com.mdoa.util.ExcelModel;
import com.mdoa.util.ExcelUtil;
import com.mdoa.util.JSONUtil;
import com.mdoa.util.StringUtil;

@Service
@Transactional
public class WelfareService extends BaseService {

	@Autowired
	private WelfareDao welfareDao;
	@Autowired
	private DepartmentDao departmentDao;
	@Autowired
	private PostDao postDao;
	@Autowired
	private UserInfoDao userInfoDao;
	
	/**
	 * 查询所有福利名称
	 * @param welfareApplyForm
	 * @return
	 */
	public List<WelfareApplyForm> queryWelfareNameAll(WelfareApplyForm welfareApplyForm) {
		return welfareDao.queryWelfareNameAll(welfareApplyForm);
	}
	/**
	 * 删除福利记录
	 * @param welfareApplyForm
	 */
	@Transactional
	public void deleteRecordForGet(WelfareApplyForm welfareApplyForm) {
		Double average= 0.0;
		if (welfareApplyForm.getBudgetAmount() != null) {
			average = welfareApplyForm.getBudgetAmount()/((welfareApplyForm.getPopulation()+1)*1.0);
			welfareApplyForm.setBudgetAmount(welfareApplyForm.getBudgetAmount()-average);
		}
		if (!welfareDao.deleteRecordForGet(welfareApplyForm)) 
			throw new RuntimeException("删除福利记录失败");
		if (welfareApplyForm.getBudgetAmount() != null) {
			if (!welfareDao.updateWelfareOnly(welfareApplyForm)) 
				throw new RuntimeException("修改福利表失败");
		}
	}
	/**
	 * 发起福利流程
	 */
	@Transactional
	public void insertWelfareStream(WelfareApplyForm welfareApplyForm) {
		if (!welfareDao.insertWelfareStream(welfareApplyForm))
			throw new RuntimeException("添加福利流程表");
		if (!welfareDao.updateWelfareStatus(welfareApplyForm)) 
			throw  new RuntimeException("修改福利信息状态失败");
	}
	/**
	 * 发起福利申请
	 * @param welfareApplyForm
	 */
	@Transactional
	public void addWelfareApply(WelfareApplyForm welfareApplyForm) {
		String welfareId = welfareDao.getuuid();
		welfareApplyForm.setWelfareId(welfareId);
		//添加福利表
		if (!welfareDao.insertWelfare(welfareApplyForm))
			throw new RuntimeException("添加福利表失败");
		//添加福利流程表
		/*if (!welfareDao.insertWelfareStream(welfareApplyForm))
			throw new RuntimeException("添加福利流程表");*/
		//添加福利记录表
		if (welfareApplyForm.getPopulation() != 0) {
		List<WelfareApplyForm> list = queryPersonMessage(welfareApplyForm);
		for (int i = 0; i < list.size(); i++) {
			list.get(i).setWelfareApplyForm(welfareApplyForm);
		}
			if (!welfareDao.addWelfareRecord(list)) 
				throw new RuntimeException("添加福利记录表失败");
		}
	}
	
	/**
	 * 查询人员信息
	 */
	public List<WelfareApplyForm> queryPersonMessage(WelfareApplyForm welfareApplyForm) {
		if (!StringUtil.isEmpty(welfareApplyForm.getUserName())) 
			welfareApplyForm.setUserName("'"+welfareApplyForm.getUserName()+"%'");
		if (!StringUtil.isEmpty(welfareApplyForm.getPostName())) 
			welfareApplyForm.setPostName("'"+welfareApplyForm.getPostName()+"%'");
		if (!StringUtil.isEmpty(welfareApplyForm.getDepartmentName())) 
			welfareApplyForm.setDepartmentName("'"+welfareApplyForm.getDepartmentName()+"%'");
		if (!StringUtil.isEmpty(welfareApplyForm.getDepartmentUrl())) 
			welfareApplyForm.setDepartmentUrl("'"+welfareApplyForm.getDepartmentUrl()+"%'");
		if (!StringUtil.isEmpty(welfareApplyForm.getIdCard())) 
			welfareApplyForm.setIdCard("'"+welfareApplyForm.getIdCard()+"%'");
		return welfareDao.queryPersonMessage(welfareApplyForm);
	}
	
	
	
	
	
	
	
	/**
	 * 根据员工的生日来查询员工信息的方法，只接受MM-dd格式
	 * 
	 * @param startDate
	 *            查询起始日期
	 * @param endDate
	 *            查询结束日期
	 * @param pageSize
	 *            每页大小
	 * @param pageNum
	 *            查询页码
	 * @return
	 */
	public PageModel<UserInfo> findUserInfoByBirth(BirthForm birthForm) {
		//判断查询起始日期是否跨年
		if(DateUtil.isSpanYear(birthForm.getStartDate(), birthForm.getEndDate())){
			//跨年时处理日期
			birthForm.setSpanYearStartDate("01-01");
			birthForm.setSpanYearEndDate(birthForm.getEndDate());
			birthForm.setEndDate("12-31");
		}
		if (!StringUtil.isEmpty(birthForm.getDepartmentName())) {
			birthForm.setDepartmentName("'" + birthForm.getDepartmentName() + "%'");
		}
		if (!StringUtil.isEmpty(birthForm.getPostName())) {
			birthForm.setPostName("'" + birthForm.getPostName() + "%'");
		}
		if (!StringUtil.isEmpty(birthForm.getUserName())) {
			birthForm.setUserName("'" + birthForm.getUserName() + "%'");
		}
		if (!StringUtil.isEmpty(birthForm.getAddress())) {
			birthForm.setAddress("'" + birthForm.getAddress() + "%'");
		}
		// 设置分页所需的当前页和总页数
		PageHelper.startPage(birthForm.getPage(), birthForm.getRows());
		// 调用持久层查询
		List<UserInfo> list = welfareDao.findUserInfoByBirth(birthForm);
		PageModel<UserInfo> pageInfo = new PageModel<>((Page<UserInfo>) list);
		return pageInfo;
	}

	

	/**
	 * 获得岗位人员list
	 * 
	 * @param welfareApplyForm
	 * @return
	 */
	private List<WelfareObjForm> getPostForms(WelfareApplyForm welfareApplyForm, HttpServletRequest request) {
		List<WelfareObjForm> objForms = new ArrayList<>();
		// 拆分岗位字符串
		String[] postIds = welfareApplyForm.getPostId().split(",");
		String[] postNames = welfareApplyForm.getPostName().split(",");
		if (postIds.length != postNames.length)
			throw new RuntimeException("岗位id与岗位name数目不匹配");
		for (int i = 0; i < postIds.length; i++) {
			WelfareObjForm form = new WelfareObjForm();
			form = welfareApplyForm.toObjForm();
			form.setPostId(postIds[i]);
			form.setPostName(postNames[i]);
			form.setCreateUserId(getUser(request).getUserId());
			form.setCreateUserName(getUser(request).getUserName());
			objForms.add(form);
		}
		return objForms;
	}

	/**
	 * 获得部门人员list
	 * 
	 * @param welfareApplyForm
	 * @return
	 */
	private List<WelfareObjForm> getDepartmentForms(WelfareApplyForm welfareApplyForm, HttpServletRequest request) {
		List<WelfareObjForm> objForms = new ArrayList<>();
		String[] departmentIds = welfareApplyForm.getDepartmentId().split(",");
		String[] departmentNames = welfareApplyForm.getDepartmentName().split(",");
		if (departmentIds.length < 1 || departmentIds.length != departmentNames.length)
			throw new RuntimeException("部门id与部门name数目不匹配");
		for (int i = 0; i < departmentIds.length; i++) {
			WelfareObjForm form = new WelfareObjForm();
			form = welfareApplyForm.toObjForm();
			form.setDepartmentId(departmentIds[i]);
			form.setDepartmentName(departmentNames[i]);
			form.setCreateUserId(getUser(request).getUserId());
			form.setCreateUserName(getUser(request).getUserName());
			objForms.add(form);
		}
		return objForms;
	}

	/**
	 * 撤回福利申请的方法
	 * 
	 * @param welfareApplyExamineForm
	 */
	@Transactional
	public void withdrawWelfareApply(WelfareApplyExamineForm welfareApplyExamineForm) {
		if (!welfareDao.updateWelfare(welfareApplyExamineForm))
			throw new RuntimeException("撤回福利申请失败");
		if (!welfareDao.withdrawWelfareStream(welfareApplyExamineForm))
			throw new RuntimeException("撤回福利申请流程失败");
		//删除福利记录
		WelfareApplyForm welfareApplyForm = new WelfareApplyForm();
		welfareApplyForm.setWelfareId(welfareApplyExamineForm.getWelfareId());
		deleteRecordForGet(welfareApplyForm);
		
	}

	/**
	 * 驳回福利申请的方法
	 * 
	 * @param welfareApplyExamineForm
	 */
	@Transactional
	public void rejectWelfareApply(WelfareApplyExamineForm welfareApplyExamineForm) {
		if (!welfareDao.updateWelfare(welfareApplyExamineForm))
			throw new RuntimeException("更改福利信息失败");
		if (!welfareDao.updateWelfareStream(welfareApplyExamineForm))
			throw new RuntimeException("更改福利流程信息失败");
		//删除福利记录
		WelfareApplyForm welfareApplyForm = new WelfareApplyForm();
		welfareApplyForm.setWelfareId(welfareApplyExamineForm.getWelfareId());
		deleteRecordForGet(welfareApplyForm);
	}

	/**
	 * 通过福利申请但仍需审核
	 * 
	 * @param welfareApplyExamineForm
	 */
	@Transactional
	public void passWelfareApply(WelfareApplyExamineForm welfareApplyExamineForm) {
		if (!welfareDao.updateWelfareStream(welfareApplyExamineForm))
			throw new RuntimeException("更改福利流程信息失败");
		// 因为这里用到参数类型不同的方法，就转了一下类型
		if (!welfareDao.insertWelfareStream(welfareApplyExamineForm.transToApplyForm()))
			throw new RuntimeException("插入福利流程信息失败");
	}

	/**
	 * 通过福利申请且不需再审核(进入备案流程)
	 * 
	 * @param welfareApplyExamineForm
	 */
	@Transactional
	public void finallyPassWelfareApply(WelfareApplyExamineForm welfareApplyExamineForm) {
		if (!welfareDao.updateWelfareStream(welfareApplyExamineForm))
			throw new RuntimeException("更改福利流程信息失败");
		if (!welfareDao.insertRecordWelfareStream(welfareApplyExamineForm))
			throw new RuntimeException("插入备案流程信息失败");
	}

	/**
	 * 备案人驳回备案请求且仍需审核的方法
	 * 
	 * @param welfareApplyExamineForm
	 */
	@Transactional
	public void rejectRecordApply(WelfareApplyExamineForm welfareApplyExamineForm) {
		welfareApplyExamineForm.setExamineStatus("4");
		if (!welfareDao.updateWelfareStream(welfareApplyExamineForm))
			throw new RuntimeException("更改福利流程信息失败");
		//因为这里用到参数类型不同的方法，就转了一下类型
		if (!welfareDao.insertWelfareStream(welfareApplyExamineForm.transToApplyForm()))
			throw new RuntimeException("插入福利流程信息失败");
	}

	/**
	 * 备案人通过备案请求并备案
	 * 
	 * @param welfareApplyExamineForm
	 */
	@Transactional
	public void recordWelfareApply(WelfareApplyExamineForm welfareApplyExamineForm) {
		if (!welfareDao.updateWelfare(welfareApplyExamineForm))
			throw new RuntimeException("备案福利信息失败");
		if (!welfareDao.updateWelfareStream(welfareApplyExamineForm))
			throw new RuntimeException("备案福利流程信息失败");
		if (!welfareDao.updateWelfareRecord(welfareApplyExamineForm)) 
			throw new RuntimeException("修改福利记录失败");
	}

	

	/**
	 * 通过条件查询福利记录的方法
	 * 
	 * @param welfareRecordForm
	 * @return
	 */

	public PageModel<WelfareRecordForm> findRecordByCondition(WelfareRecordForm welfareRecordForm) {
		if (!StringUtil.isEmpty(welfareRecordForm.getGetUserName())) {
			welfareRecordForm.setGetUserName("'" + welfareRecordForm.getGetUserName() + "%'");
		}
		if (!StringUtil.isEmpty(welfareRecordForm.getWelfareName())) {
			welfareRecordForm.setWelfareName("'" + welfareRecordForm.getWelfareName() + "%'");
		}
		if (!StringUtil.isEmpty(welfareRecordForm.getWelfareCode())) {
			welfareRecordForm.setWelfareCode("'" + welfareRecordForm.getWelfareCode() + "%'");
		}
		if (!StringUtil.isEmpty(welfareRecordForm.getDepartmentName())) {
			welfareRecordForm.setDepartmentName("'" + welfareRecordForm.getDepartmentName() + "%'");
		}
		if (!StringUtil.isEmpty(welfareRecordForm.getPostName())) {
			welfareRecordForm.setPostName("'" + welfareRecordForm.getPostName() + "%'");
		}
		PageHelper.startPage(welfareRecordForm.getPage(), welfareRecordForm.getRows()); // 调用持久层查询
		List<WelfareRecordForm> list = welfareDao.findRecordByCondition(welfareRecordForm);
		PageModel<WelfareRecordForm> pageInfo = new PageModel<>((Page<WelfareRecordForm>) list);
		return pageInfo;
	}

	/**
	 * 员工领取福利后福利记录表的更新
	 * 
	 * @param welfareRecordForm
	 */
	public void updateRecordForGet(WelfareRecordForm welfareRecordForm) {
		if (!welfareDao.updateRecordForGet(welfareRecordForm))
			throw new RuntimeException("更新福利记录信息失败");
	}

	/**
	 * 查询福利流程
	 * 
	 * @param welfareApplyForm
	 * @return
	 */
	public PageModel<WelfareStreamForm> findStreamByCondition(WelfareApplyForm welfareApplyForm) {
		if (!StringUtil.isEmpty(welfareApplyForm.getExamineUserName())) {
			welfareApplyForm.setExamineUserName("'" + welfareApplyForm.getExamineUserName() + "%'");
		}
		if (!StringUtil.isEmpty(welfareApplyForm.getCreateUserName())) {
			welfareApplyForm.setCreateUserName("'" + welfareApplyForm.getCreateUserName() + "%'");
		}
		if (!StringUtil.isEmpty(welfareApplyForm.getWelfareName())) {
			welfareApplyForm.setWelfareName("'" + welfareApplyForm.getWelfareName() + "%'");
		}
		if (!StringUtil.isEmpty(welfareApplyForm.getWelfareCode())) {
			welfareApplyForm.setWelfareCode("'" + welfareApplyForm.getWelfareCode() + "%'");
		}
		PageHelper.startPage(welfareApplyForm.getPage(), welfareApplyForm.getRows()); 
		// 调用持久层查询
		List<WelfareStreamForm> list = welfareDao.findStreamByCondition(welfareApplyForm);
		PageModel<WelfareStreamForm> pageInfo = new PageModel<>((Page<WelfareStreamForm>) list);
		return pageInfo;
	}

	/**
	 * 查询福利
	 * 
	 * @param welfareApplyForm
	 * @return
	 */
	public PageModel<Welfare> findWelfareByCondition(WelfareApplyForm welfareApplyForm) {
		if (!StringUtil.isEmpty(welfareApplyForm.getCreateUserName())) {
			welfareApplyForm.setCreateUserName("'" + welfareApplyForm.getCreateUserName() + "%'");
		}
		if (!StringUtil.isEmpty(welfareApplyForm.getWelfareName())) {
			welfareApplyForm.setWelfareName("'" + welfareApplyForm.getWelfareName() + "%'");
		}
		if (!StringUtil.isEmpty(welfareApplyForm.getWelfareCode())) {
			welfareApplyForm.setWelfareCode("'" + welfareApplyForm.getWelfareCode() + "%'");
		}
		PageHelper.startPage(welfareApplyForm.getPage(), welfareApplyForm.getRows()); // 调用持久层查询
		List<Welfare> list = welfareDao.findWelfareByCondition(welfareApplyForm);
		PageModel<Welfare> pageInfo = new PageModel<>((Page<Welfare>) list);
		return pageInfo;
	}
	
	/**
	 * 导出福利领取记录到表格
	 * @param welfareRecordForm
	 * @param jsonString
	 * @param filePath
	 */
	public void writeToExcel(WelfareRecordForm welfareRecordForm, String jsonString, String filePath) throws Exception{
		List<ExcelModel> modelDetails = JSONUtil.jsonToExcelModelList(jsonString);
		if (!StringUtil.isEmpty(welfareRecordForm.getGetUserName())) {
			welfareRecordForm.setGetUserName("'" + welfareRecordForm.getGetUserName() + "%'");
		}
		if (!StringUtil.isEmpty(welfareRecordForm.getWelfareName())) {
			welfareRecordForm.setWelfareName("'" + welfareRecordForm.getWelfareName() + "%'");
		}
		if (!StringUtil.isEmpty(welfareRecordForm.getWelfareCode())) {
			welfareRecordForm.setWelfareCode("'" + welfareRecordForm.getWelfareCode() + "%'");
		}
		if (!StringUtil.isEmpty(welfareRecordForm.getDepartmentName())) {
			welfareRecordForm.setDepartmentName("'" + welfareRecordForm.getDepartmentName() + "%'");
		}
		if (!StringUtil.isEmpty(welfareRecordForm.getPostName())) {
			welfareRecordForm.setPostName("'" + welfareRecordForm.getPostName() + "%'");
		}
		List<WelfareRecordForm> recordList = welfareDao.findRecordByCondition(welfareRecordForm);
		for(int i = 0 ; i<recordList.size();i++){
			WelfareRecordForm recordForm = recordList.get(i);
			recordForm.parseGetFlag();
		}
		ExcelUtil.writeListToExcel(filePath,recordList, modelDetails);
	}
	/**
	 * 修改福利
	 * @param welfareApplyForm
	 */
	public void updateWelfareo(WelfareApplyForm welfareApplyForm) {
		if (!welfareDao.updateWelfareo(welfareApplyForm)) 
			throw new RuntimeException("福利修改失败");
			
	}
	/**
	 * 导出excel表格
	 * @param welfareApplyForm
	 * @param jsonString
	 * @param filePath
	 */
	public void writeToExcel(BirthForm birthForm, String jsonString, String filePath) {
		List<ExcelModel> modelDetails = JSONUtil.jsonToExcelModelList(jsonString);
		PageModel<UserInfo> page = this.findUserInfoByBirth(birthForm);
		List<UserInfo> userList = page.getRows();
		for(int i = 0 ; i<userList.size();i++){
			userList.get(i).parseData();
		}
		try {
			ExcelUtil.writeListToExcel(filePath,userList, modelDetails);
		} catch (Exception e) {
			e.printStackTrace();
		}		
	}

}
