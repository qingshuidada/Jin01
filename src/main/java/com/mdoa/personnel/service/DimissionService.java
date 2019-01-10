package com.mdoa.personnel.service;

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
import com.mdoa.constant.Constant;
import com.mdoa.personnel.dao.DimissionDao;
import com.mdoa.personnel.model.Dimission;
import com.mdoa.personnel.model.PunishRecord;
import com.mdoa.user.dao.UserInfoDao;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.ExcelModel;
import com.mdoa.util.ExcelUtil;
import com.mdoa.util.JSONUtil;
import com.mdoa.util.StringUtil;

@Service
@Transactional
public class DimissionService extends BaseService{
	
	@Autowired
	private DimissionDao dimissionDao;
	
	@Autowired
	private UserInfoDao userInfoDao;
	
	
	public void writeDimissionToExcel(Dimission dimission, String jsonString, String filePath) throws Exception {
		List<ExcelModel> modelDetails = JSONUtil.jsonToExcelModelList(jsonString);
		List<Dimission> list = dimissionDao.getDimissionList(dimission);
		for(int i = 0 ; i<list.size();i++){
			list.get(i).parseData();
		}
		ExcelUtil.writeListToExcel(filePath, list, modelDetails);
	}
	
	
	/**
	 * 获取员工的离职记录列表信息
	 * @param userInfo
	 * @return
	 */
	public PageModel<Dimission> getDimissionList(Dimission dimission){
		dimission.setDepartmentUrl(StringUtil.toLikeRight(dimission.getDepartmentUrl()));
		dimission.setPostName(StringUtil.toLikeRight(dimission.getPostName()));
		dimission.setUserName(StringUtil.toLikeRight(dimission.getUserName()));
		PageHelper.startPage(dimission.getPage(), dimission.getRows());
		Page<Dimission> page = (Page<Dimission>)dimissionDao.getDimissionList(dimission);
		PageModel<Dimission> pageModel = new PageModel<Dimission>(page);
		return pageModel;
	}
	
	/**
	 * 添加员工的离职记录
	 * @param dimission
	 * @return
	 */
	public void addDimissionRecord(Dimission dimission, HttpServletRequest request){
		UserInfo user = getUser(request);
		dimission.setCreateUserId(user.getUserId());
		dimission.setCreateUserName(user.getUserName());
		if(!dimissionDao.addDimissionRecord(dimission)){
			throw new RuntimeException("添加离职记录失败");
		}
		UserInfo userInfo = new UserInfo();
		userInfo.setInviteFlag("2");
		userInfo.setUserId(dimission.getUserId());
		userInfo.setUpdateUserId(user.getUserId());
		userInfo.setUpdateUserName(user.getUserName());
		if(!userInfoDao.updateUserInfo(userInfo)) {
			throw new RuntimeException("修改离职标志失败");
		}
	}
	/**
	 * 添加员工的离职记录
	 * @param dimission
	 * @return
	 */
	public void fireUserFinish(Dimission dimission, HttpServletRequest request){
		UserInfo user = getUser(request);
		dimission.setCreateUserId(user.getUserId());
		dimission.setCreateUserName(user.getUserName());
		if(!dimissionDao.addDimissionRecord(dimission)){
			throw new RuntimeException("添加离职记录失败");
		}
		UserInfo userInfo = new UserInfo();
		userInfo.setInviteFlag("3");
		userInfo.setUserId(dimission.getUserId());
		userInfo.setUpdateUserId(user.getUserId());
		userInfo.setUpdateUserName(user.getUserName());
		if(!userInfoDao.updateUserInfo(userInfo)) {
			throw new RuntimeException("修改离职标志失败");
		}
	}
	
	
	/**
	 * 添加员工的离职记录
	 * @param dimission
	 * @return
	 */
	public void fireFinish(Dimission dimission, HttpServletRequest request){
		UserInfo user = getUser(request);
		UserInfo userInfo = new UserInfo();
		userInfo.setInviteFlag("3");
		userInfo.setUserId(dimission.getUserId());
		userInfo.setUpdateUserId(user.getUserId());
		userInfo.setUpdateUserName(user.getUserName());
		if(!userInfoDao.updateUserInfo(userInfo)) {
			throw new RuntimeException("修改离职标志失败");
		}
	}
	
	/**
	 * 取消离职
	 */
	public void fireCancel(String userId, HttpServletRequest request){
		Integer count = dimissionDao.checkOnJobUser(userId);
		if(count > 0)
			throw new RuntimeException("对在职员工进行了取消离职");
		UserInfo user = getUser(request);
		if(!dimissionDao.deleteDimissionRecord(userId)){
			throw new RuntimeException("删除离职记录失败");
		}
		UserInfo userInfo = new UserInfo();
		userInfo.setInviteFlag("1");
		userInfo.setUserId(userId);
		userInfo.setUpdateUserId(user.getUserId());
		userInfo.setUpdateUserName(user.getUserName());
		if(!userInfoDao.updateUserInfo(userInfo)) {
			throw new RuntimeException("修改离职标志失败");
		}
	}
	/**
	 * 查询员工离职时间
	 * @param idCard
	 * @return
	 */
	public Dimission selectUserMaxDimissionTime(String idCard){
		return  dimissionDao.selectUserMaxDimissionTime(idCard);
	}

	/**
	 * 非正常离职员工
	 * @param dimission
	 * @param request
	 */
	public void improperFireUser(Dimission dimission, HttpServletRequest request) {
		UserInfo user = getUser(request);
		dimission.setCreateUserId(user.getUserId());
		dimission.setCreateUserName(user.getUserName());
		if(!dimissionDao.addDimissionRecord(dimission)){
			throw new RuntimeException("添加离职记录失败");
		}
		UserInfo userInfo = new UserInfo();
		userInfo.setInviteFlag(dimission.getInviteFlag());
		userInfo.setUserId(dimission.getUserId());
		userInfo.setUpdateUserId(user.getUserId());
		userInfo.setUpdateUserName(user.getUserName());
		if(!userInfoDao.updateUserInfo(userInfo)) {
			throw new RuntimeException("修改离职标志失败");
		}
		
	}
}
