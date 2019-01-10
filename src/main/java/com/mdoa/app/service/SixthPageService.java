package com.mdoa.app.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mdoa.app.bo.SixthPageForm;
import com.mdoa.app.dao.AppSortDao;
import com.mdoa.app.dao.SixthPageDao;

@Service
public class SixthPageService {

	@Autowired
	private SixthPageDao pageDao;
	
	@Autowired
	private AppSortDao sortDao;
	
	public SixthPageForm selectSocialResponsibility(){
		SixthPageForm sixthPageForm = new SixthPageForm();
		sixthPageForm.setAppSort(sortDao.selectSortBySortId("6"));
		sixthPageForm.setEmployeeCares(pageDao.selectEmployeeCareBySortId("23"));
		sixthPageForm.setEnvironments(pageDao.selectEnvironmentBySortId("24"));
		return sixthPageForm;
	}
}
