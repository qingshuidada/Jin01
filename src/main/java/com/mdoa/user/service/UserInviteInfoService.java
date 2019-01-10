package com.mdoa.user.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.base.model.PageModel;
import com.mdoa.base.service.BaseService;
import com.mdoa.constant.Constant;
import com.mdoa.user.dao.UserInfoDao;
import com.mdoa.user.dao.UserInviteInfoDao;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.ExcelModel;
import com.mdoa.util.ExcelUtil;
import com.mdoa.util.JSONUtil;
import com.mdoa.util.Md5Util;
import com.mdoa.util.StringUtil;

@Service
@Transactional
public class UserInviteInfoService extends BaseService{
	
	@Autowired
	private UserInviteInfoDao userInviteInfoDao;
	
	@Autowired
	private UserInfoService userInfoService;
	
	@Autowired
	private UserInfoDao userInfoDao;
	
	/**
	 * 添加用户基本信息
	 * @param userInfo
	 * @return
	 * @throws Exception 
	 */
	public String saveUserInfo(UserInfo userInfo) throws Exception{
		if (StringUtil.isEmpty(userInfo.getBirthdayStr()))
			throw new RuntimeException("添加员工信息失败");
		userInfoService.saveIdCardImg(userInfo);
		userInfo.setUserId(getuuid());
		userInfo.setPassword(Md5Util.getMd5Str("123456"));
		if(!userInviteInfoDao.saveUserInfo(userInfo)){
			throw new RuntimeException("添加员工基本信息失败");
		}
		return userInfo.getUserId();
	}
	
	/**
	 * 查询用户基本信息
	 * @param userInfo
	 * @return
	 */
	public PageModel<UserInfo> selectUserInfo(UserInfo userInfo){
		userInfo.setDepartmentName(StringUtil.toLikeRight(userInfo.getDepartmentName()));
		userInfo.setUserName(StringUtil.toLikeRight(userInfo.getUserName()));
		userInfo.setPostName(StringUtil.toLikeRight(userInfo.getPostName()));
		userInfo.setDepartmentUrl(StringUtil.toLikeRight(userInfo.getDepartmentUrl()));
		userInfo.setAddress(StringUtil.toLikeAll(userInfo.getAddress()));
		userInfo.setNativePlace(StringUtil.toLikeAll(userInfo.getNativePlace()));
		PageHelper.startPage(userInfo.getPage(), userInfo.getRows());
		List<UserInfo> list = userInviteInfoDao.selectUserInfo(userInfo);
		PageModel<UserInfo> pageModel = new PageModel<UserInfo>((Page<UserInfo>)list);
		return pageModel;
	}
	/**
	 * 查询用户基本信息
	 * @param userInfo
	 * @return
	 */
	public PageModel<UserInfo> selectInviteUser(UserInfo userInfo){
		userInfo.setDepartmentName(StringUtil.toLikeRight(userInfo.getDepartmentName()));
		userInfo.setUserName(StringUtil.toLikeRight(userInfo.getUserName()));
		userInfo.setPostName(StringUtil.toLikeRight(userInfo.getPostName()));
		userInfo.setDepartmentUrl(StringUtil.toLikeRight(userInfo.getDepartmentUrl()));
		userInfo.setAddress(StringUtil.toLikeAll(userInfo.getAddress()));
		userInfo.setNativePlace(StringUtil.toLikeAll(userInfo.getNativePlace()));
		PageHelper.startPage(userInfo.getPage(), userInfo.getRows());
		List<UserInfo> list = userInviteInfoDao.selectInviteUser(userInfo);
		PageModel<UserInfo> pageModel = new PageModel<UserInfo>((Page<UserInfo>)list);
		return pageModel;
	}
	
	/**
	 * 修改用户基本信息
	 * @param userInfo
	 * @return
	 * @throws Exception 
	 */
	public String updateUserInfo(UserInfo userInfo) throws Exception{
		if(!StringUtil.isEmpty(userInfo.getPassword())){
			userInfo.setPassword(Md5Util.getMd5Str(userInfo.getPassword()));
		}
		//保存所上传的图片base编码到服务器
		userInfoService.saveIdCardImg(userInfo);
		if(!userInviteInfoDao.updateUserInfo(userInfo)){
			throw new RuntimeException("修改员工基本信息失败");
		}
		return userInfo.getUserId();
	}
	
	/**
	 * 录用员工
	 * @throws Exception 
	 */
	public void hireUser(UserInfo userInfo, HttpServletRequest request) throws Exception {
		
		if(userInviteInfoDao.checkOnJobUser(userInfo.getUserId()) > 0)
			throw new RuntimeException("使用了在职员工身份证号进行了录用");
		
		UserInfo user = getUser(request);
		String inviteFlag = userInfo.getInviteFlag();
		userInfo.setInviteFlag(null);
		UserInfo userInfo1 = userInviteInfoDao.selectUserInfo(userInfo).get(0);
		
		userInfo1.setInviteFlag(inviteFlag);
		userInfo1.setUserAccount(userInfo.getUserAccount());
		userInfo1.setDorm(userInfo.getDorm());
		userInfo1.setDormFlag(userInfo.getDormFlag());
		userInfo1.setLeaderFlag(userInfo.getLeaderFlag());
		userInfo1.setWageAccount(userInfo.getWageAccount());
		userInfo1.setLeadId(userInfo.getLeadId());
		userInfo1.setLeadName(userInfo.getLeadName());
		userInfo1.setWorkTimeStr(userInfo.getWorkTimeStr());
		userInfo1.setPassword(Md5Util.getMd5Str("123456"));
		userInfo1.setRetireFlag("1");
		userInfoService.saveUserInfo(userInfo1);
		
		userInfo = new UserInfo();
		userInfo.setUserId(userInfo1.getUserId());
		userInfo.setUpdateUserId(user.getUserId());
		userInfo.setUpdateUserName(user.getUserName());
		userInfo.setInviteFlag("1");
		if(!userInviteInfoDao.updateUserInfo(userInfo))
			throw new RuntimeException("修改员工招聘记录为已聘用失败");
	}
	
	/**
	 * 导出人员数据到Excel的方法
	 * @param jsonString 
	 * @param userInfo 
	 */
	public void writeToExcel(UserInfo userInfo, String jsonString, String filePath) throws Exception{
		List<ExcelModel> modelDetails = JSONUtil.jsonToExcelModelList(jsonString);
		PageModel<UserInfo> page = this.selectUserInfo(userInfo);
		List<UserInfo> userList = page.getRows();
		for(int i = 0 ; i<userList.size();i++){
			userList.get(i).parseData();
		}
		ExcelUtil.writeListToExcel(filePath,userList, modelDetails);
	}
}











