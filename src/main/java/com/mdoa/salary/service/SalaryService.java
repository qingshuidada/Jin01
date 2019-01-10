package com.mdoa.salary.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.FileConstant;
import com.mdoa.personnel.model.Dimission;
import com.mdoa.salary.bo.SalaryForm;
import com.mdoa.salary.bo.SalaryInfoForm;
import com.mdoa.salary.dao.SalaryDao;
import com.mdoa.util.ExcelModel;
import com.mdoa.util.ExcelUtil;
import com.mdoa.util.JSONUtil;
import com.mdoa.util.StringUtil;

@Service
@Transactional
public class SalaryService {
	
	@Autowired
	private SalaryDao salaryDao;

	/**
	 * 登录 验证口令
	 * @param salaryForm
	 * @param request
	 */
	public void check(SalaryForm salaryForm, HttpServletRequest request) {
		String password = salaryForm.getPassword();
		if(StringUtil.isEmpty(password))
			throw new RuntimeException("口令为空！");
		if(!FileConstant.SALARY_PASSWORD.equals(password))
			throw new RuntimeException("口令错误！");
		HttpSession session = request.getSession();
		session.setAttribute("salaryPassword", password);
	}

	/**
	 * 登出 清除session
	 * @param request
	 */
	public void exit(HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.removeAttribute("salaryPassword");
	}

	/**
	 * 批量插入工资信息
	 * @param list
	 */
	public void insertSalaryInfoByBatch(List<SalaryInfoForm> list) {
		Integer result = salaryDao.insertSalaryInfoByBatch(list);
		if(result != list.size())
			throw new RuntimeException("批量插入工资信息出错！");
	}
	
	/**
	 * 查询工资信息
	 * @param salaryInfoForm
	 * @return
	 */
	public PageModel<SalaryInfoForm> findSalaryInfoByCondition(SalaryInfoForm salaryInfoForm){
		PageHelper.startPage(salaryInfoForm.getPage(), salaryInfoForm.getRows());
		Page<SalaryInfoForm> page = (Page<SalaryInfoForm>)salaryDao.findSalaryInfoByCondition(salaryInfoForm);
		PageModel<SalaryInfoForm> pageModel = new PageModel<>(page);
		return pageModel;
	}

	/**
	 * 查询工资日期
	 * @return
	 */
	public List<SalaryInfoForm> findMonthDate() {
		List<SalaryInfoForm> list = salaryDao.findMonthDate();
		return list;
	}
	
	/**
	 * 修改工资信息
	 * @param salaryInfoForm
	 */
	public void updateSalaryInfo(SalaryInfoForm salaryInfoForm) {
		if(!salaryDao.updateSalaryInfo(salaryInfoForm))
			throw new RuntimeException("修改工资信息失败！");
	}

	/**
	 * 查询出错工资信息
	 * @param salaryInfoForm
	 * @return
	 */
	public PageModel<SalaryInfoForm> findSalaryInfoForError(SalaryInfoForm salaryInfoForm) {
		PageHelper.startPage(salaryInfoForm.getPage(), salaryInfoForm.getRows());
		List<SalaryInfoForm> list = salaryDao.findSalaryInfoForError(salaryInfoForm);
		Page<SalaryInfoForm> page = (Page<SalaryInfoForm>)list;
		System.out.println("page:"+page);
		//Page<SalaryInfoForm> page = (Page<SalaryInfoForm>)salaryDao.findSalaryInfoForError(salaryInfoForm);
		PageModel<SalaryInfoForm> pageModel = new PageModel<>(page);
		System.out.println("pageModel:"+pageModel);
		return pageModel;
	}
	
	/**
	 * 
	 * @param salaryInfoForm
	 * @param jsonString
	 * @param filePath
	 * @throws Exception
	 */
	public void writeSalaryToExcel(SalaryInfoForm salaryInfoForm, String jsonString, String filePath) throws Exception {
		List<ExcelModel> modelDetails = JSONUtil.jsonToExcelModelList(jsonString);
		List<SalaryInfoForm> list = salaryDao.findSalaryInfoByCondition(salaryInfoForm);
		ExcelUtil.writeListToExcel(filePath, list, modelDetails);
	}
	
	/**
	 * 删除未确认信息
	 */
	public void deleteNotSureData() {
		salaryDao.deleteNotSureData();
	}
	
	/**
	 * 确认信息
	 */
	public void ensureSalaryInfo() {
		salaryDao.ensureSalaryInfo();
	}
	
	/**
	 * 查询工资统计信息
	 * @param salaryInfoForm
	 * @return
	 */
	public PageModel<SalaryInfoForm> findSalaryInfoByTotal(SalaryInfoForm salaryInfoForm) {
		PageHelper.startPage(salaryInfoForm.getPage(), salaryInfoForm.getRows());
		List<SalaryInfoForm> list = salaryDao.findSalaryInfoByTotal(salaryInfoForm);
		Page<SalaryInfoForm> page = (Page<SalaryInfoForm>)list;
		System.out.println("page:"+page);
		//Page<SalaryInfoForm> page = (Page<SalaryInfoForm>)salaryDao.findSalaryInfoForError(salaryInfoForm);
		PageModel<SalaryInfoForm> pageModel = new PageModel<>(page);
		System.out.println("pageModel:"+pageModel);
		return pageModel;
	}

	
}
