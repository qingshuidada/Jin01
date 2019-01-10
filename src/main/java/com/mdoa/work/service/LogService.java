package com.mdoa.work.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.base.model.PageModel;
import com.mdoa.util.StringUtil;
import com.mdoa.work.bo.LogForm;
import com.mdoa.work.dao.LogDao;

@Service
public class LogService {

	@Autowired
	private LogDao logDao;
	
	/**
	 * 添加日志
	 * @param logForm
	 */
	public String addLog(LogForm logForm) {
		if (!logDao.addLog(logForm)) 
			throw new RuntimeException("添加日志失败");
		return "添加日志成功";
		
	}
	/**
	 * 查询个人日志
	 * @param logForm
	 * @return
	 */
	public PageModel<LogForm> queryYourselfLog(LogForm logForm) {
		PageHelper.startPage(logForm.getPage(),logForm.getRows());
		List<LogForm> list = logDao.queryYourselfLog(logForm);
		PageModel<LogForm> pageModel = new PageModel<>((Page<LogForm>)list);
		
		return pageModel;
	}
	/**
	 * 修改日志
	 * @param logForm
	 */
	public String updateYourselfLog(LogForm logForm) {
		if (!logDao.updateYourselfLog(logForm))
			throw new RuntimeException("修改日志失败");
		return "修改日志成功";
	}
	/**
	 * 查询下级日志
	 * @param logForm
	 * @return
	 */
	public PageModel<LogForm> querySubLog(LogForm logForm) {
		if (!StringUtil.isEmpty(logForm.getUserName())) 
			logForm.setUserName(logForm.getUserName()+"%");
		PageHelper.startPage(logForm.getPage(),logForm.getRows());
		List<LogForm> list = logDao.querySubLog(logForm);
		PageModel<LogForm> pageModel = new PageModel<>((Page<LogForm>)list);
		return pageModel;
	}
	/**
	 *
	 * 查询自己和下级的日志
	 * @param logForm
	 * @return
	 */
	public PageModel<LogForm> queryOneselfAndSubLog(LogForm logForm) {
		if (!StringUtil.isEmpty(logForm.getUserName())) 
			logForm.setUserName(logForm.getUserName()+"%");
		PageHelper.startPage(logForm.getPage(),logForm.getRows());
		List<LogForm> list = logDao.queryOneselfAndSubLog(logForm);
		PageModel<LogForm> pageModel = new PageModel<>((Page<LogForm>)list);
		return pageModel;
	}
	
}
