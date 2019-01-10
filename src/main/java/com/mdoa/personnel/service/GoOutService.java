package com.mdoa.personnel.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.base.model.PageModel;
import com.mdoa.base.service.BaseService;
import com.mdoa.personnel.bo.GoOutApplyForm;
import com.mdoa.personnel.bo.GoOutExamineForm;
import com.mdoa.personnel.bo.GoOutStreamForm;
import com.mdoa.personnel.dao.GoOutDao;
import com.mdoa.personnel.model.GoOutApply;
import com.mdoa.personnel.model.GoOutStream;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.StringUtil;

@Service
@Transactional
public class GoOutService extends BaseService{
	
	@Autowired
	private GoOutDao goOutDao;
	
	/**
	 * 提交外出申请
	 * @param goOutApplyForm
	 */
	public void applyForGoOut(GoOutApplyForm goOutApplyForm) {
		//获取uuid
		goOutApplyForm.setGoOutApplyId(goOutDao.getuuid());
		if(!goOutDao.insertGoOutApply(goOutApplyForm))
			throw new RuntimeException("插入外出申请信息失败");
		if(!goOutDao.insertGoOutStream(goOutApplyForm))
			throw new RuntimeException("插入外出流程信息失败");
	}
	
	/**
	 * 条件查询外出申请
	 * @param goOutApplyForm
	 * @return
	 */
	public PageModel<GoOutApply> findApplyByCondition(GoOutApplyForm goOutApplyForm) {
		//申请人姓名模糊查询
		if(!StringUtil.isEmpty(goOutApplyForm.getUserName())){
			goOutApplyForm.setUserName("'"+goOutApplyForm.getUserName()+"%'");
		}
		//外出人姓名模糊查询
		if(!StringUtil.isEmpty(goOutApplyForm.getGoOutUserName())){
			goOutApplyForm.setGoOutUserName("'"+goOutApplyForm.getGoOutUserName()+"%'");
		}
		//审核人姓名模糊查询
		if(!StringUtil.isEmpty(goOutApplyForm.getExamineUserName())){
			goOutApplyForm.setExamineUserName("'"+goOutApplyForm.getExamineUserName()+"%'");
		}
		//设置分页信息
		PageHelper.startPage(goOutApplyForm.getPage(),goOutApplyForm.getRows());
		List<GoOutApply> list = goOutDao.findApplyByCondition(goOutApplyForm);
		PageModel<GoOutApply> pageInfo =new PageModel<>((Page<GoOutApply>)list);
		return pageInfo;
	}
	/**
	 * 条件查询外出流程信息
	 * @param goOutApplyForm
	 * @return
	 */
	public PageModel<GoOutStreamForm> findStream(GoOutApplyForm goOutApplyForm) {
		//申请人姓名模糊查询
		if(!StringUtil.isEmpty(goOutApplyForm.getUserName())){
			goOutApplyForm.setUserName("'"+goOutApplyForm.getUserName()+"%'");
		}
		//设置分页信息
		PageHelper.startPage(goOutApplyForm.getPage(),goOutApplyForm.getRows());
		List<GoOutStreamForm> list = goOutDao.findStream(goOutApplyForm);
		PageModel<GoOutStreamForm> pageInfo =new PageModel<>((Page<GoOutStreamForm>)list);
		return pageInfo;
	}
	/**
	 * 条件查询外出流程信息
	 * @param goOutApplyForm
	 * @return
	 */
	public PageModel<GoOutStreamForm> findStreamByCondition(GoOutApplyForm goOutApplyForm,HttpServletRequest request) {
		UserInfo userInfo=getUser(request);
		goOutApplyForm.setExamineUserId(userInfo.getUserId());
		goOutApplyForm.setExamineUserName(userInfo.getUserName());
		//设置分页信息
		//申请人姓名模糊查询
		if(!StringUtil.isEmpty(goOutApplyForm.getUserName())){
			goOutApplyForm.setUserName("'"+goOutApplyForm.getUserName()+"%'");
		}
		PageHelper.startPage(goOutApplyForm.getPage(),goOutApplyForm.getRows());
		List<GoOutStreamForm> list = goOutDao.findStreamByCondition(goOutApplyForm);
		PageModel<GoOutStreamForm> pageInfo =new PageModel<>((Page<GoOutStreamForm>)list);
		return pageInfo;
	}
	
	/**
	 * 通过外出申请但仍需审核
	 * @param goOutExamineForm
	 */
	public void passGoOutApply(GoOutExamineForm goOutExamineForm){
		
		if(!goOutDao.updateGoOutStream(goOutExamineForm))
			throw new RuntimeException("更新外出审核流程信息失败");
		if(!goOutDao.AddGoOutStream(goOutExamineForm))
			throw new RuntimeException("插入外出审核流程信息失败");
	}

	/**
	 * 通过外出申请且无需再审核
	 * @param goOutExamineForm
	 */
	public void finallyPassGoOutApply(GoOutExamineForm goOutExamineForm) {
		if(!goOutDao.insertRecordGoOutStream(goOutExamineForm))
			throw new RuntimeException("插入外出申请备案流程信息失败");
		goOutExamineForm.setExamineStatus("3");
		if(!goOutDao.updateGoOutStream(goOutExamineForm))
			throw new RuntimeException("更新外出申请流程信息失败");
		
	}

	/**
	 * 驳回外出申请
	 * @param goOutExamineForm
	 */
	public void rejectGoOutApply(GoOutExamineForm goOutExamineForm) {
		if(!goOutDao.updateGoOutStream(goOutExamineForm))
			throw new RuntimeException("更新外出流程信息失败");
		if(!goOutDao.rejectGoOutApply(goOutExamineForm))
			throw new RuntimeException("更新外出申请信息失败");
	}

	/**
	 * 备案人通过外出申请并备案
	 * @param goOutExamineForm
	 */
	public void recordGoOutApply(GoOutExamineForm goOutExamineForm) {
		if(!goOutDao.recordGoOutStream(goOutExamineForm))
			throw new RuntimeException("备案外出流程信息失败");
		if(!goOutDao.recordGoOutApply(goOutExamineForm))
			throw new RuntimeException("备案外出申请信息失败");
	}
	
	/**
	 * 撤回外出申请
	 * @param goOutExamineForm
	 */
	public void withdrawGoOutApply(GoOutExamineForm goOutExamineForm) {
		if(!goOutDao.withdrawGoOutStream(goOutExamineForm))
			throw new RuntimeException("撤回外出流程失败");
		if(!goOutDao.withdrawGoOutApply(goOutExamineForm))
			throw new RuntimeException("撤回外出申请失败");
	}
	/**
	 * 确认员工已经返回
	 * @param goOutExamineForm
	 */
	public void confirmUserBack(GoOutExamineForm goOutExamineForm){
		if(!goOutDao.confirmUserBack(goOutExamineForm)){
			throw new RuntimeException("确认员工返回失败");
		}
	}

}
