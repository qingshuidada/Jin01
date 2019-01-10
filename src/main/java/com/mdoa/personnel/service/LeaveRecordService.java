package com.mdoa.personnel.service;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.base.model.PageModel;
import com.mdoa.personnel.bo.LeaveRecordForm;
import com.mdoa.personnel.dao.LeaveRecordDao;
import com.mdoa.personnel.model.LeaveRecord;
import com.mdoa.util.ExcelModel;
import com.mdoa.util.ExcelUtil;
import com.mdoa.util.JSONUtil;
import com.mdoa.util.StringUtil;


@Service
@Transactional
public class LeaveRecordService {

	@Autowired
	private LeaveRecordDao leaveRecordDao;
	
	/**
	 * 查询请假记录
	 * @param leaveRecordForm
	 * @return
	 */
	public PageModel<LeaveRecord> selectLeaveRecord(LeaveRecordForm leaveRecordForm) {
		leaveRecordForm.setUserName(StringUtil.toLikeRight(leaveRecordForm.getUserName()));
		
		PageHelper.startPage(leaveRecordForm.getPage(),leaveRecordForm.getRows());
		List<LeaveRecord> list = leaveRecordDao.selectLeaveRecord(leaveRecordForm);
		PageModel<LeaveRecord> pageInfo =new PageModel<>((Page<LeaveRecord>)list);
		return pageInfo;
	}
	
	/**
	 * 导出请假信息到excel
	 * @param leaveRecordForm
	 * @param jsonString
	 * @param filePath
	 * @throws Exception
	 */
	public void writeLeaveRecordToExcel(LeaveRecordForm leaveRecordForm, String jsonString, String filePath) throws Exception{
		List<ExcelModel> modelDetails = JSONUtil.jsonToExcelModelList(jsonString);
		leaveRecordForm.setUserName(StringUtil.toLikeRight(leaveRecordForm.getUserName()));
		List<LeaveRecord> list = leaveRecordDao.selectLeaveRecord(leaveRecordForm);
		ExcelUtil.writeListToExcel(filePath, list, modelDetails);
	}
	
	

}
