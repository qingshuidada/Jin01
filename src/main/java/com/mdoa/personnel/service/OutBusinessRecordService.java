package com.mdoa.personnel.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.base.model.PageModel;
import com.mdoa.base.service.BaseService;
import com.mdoa.constant.Constant;
import com.mdoa.personnel.bo.OutBusinessRecordForm;
import com.mdoa.personnel.dao.OutBusinessRecordDao;
import com.mdoa.personnel.model.OutBusinessRecord;
import com.mdoa.util.StringUtil;

@Service
@Transactional
public class OutBusinessRecordService extends BaseService{
	
	@Autowired
	private OutBusinessRecordDao outBusinessRecordDao;
	
	/**
	 * 查询公出记录
	 * @param outBusinessRecordForm
	 * @return
	 */
	public PageModel<OutBusinessRecord> selectOutBusinessRecord(OutBusinessRecordForm outBusinessRecordForm) {
		outBusinessRecordForm.setUserName(StringUtil.toLikeRight(outBusinessRecordForm.getUserName()));
		
		PageHelper.startPage(outBusinessRecordForm.getPage(),outBusinessRecordForm.getRows());
		List<OutBusinessRecord> list = outBusinessRecordDao.selectOutBusinessRecord(outBusinessRecordForm);
		PageModel<OutBusinessRecord> pageInfo =new PageModel<>((Page<OutBusinessRecord>)list);
		return pageInfo;
	}
	/**
	 * 修改公出记录
	 * @param outBusinessRecordForm
	 * @return
	 */
	public String updateOutBusinessRecord(OutBusinessRecordForm outBusinessRecordForm) {
		
		if (!outBusinessRecordDao.updateOutBusinessRecord(outBusinessRecordForm)) 
			throw new RuntimeException("修改公出记录失败");
		return Constant.SUCCESS_CODE;
	}
	
}
