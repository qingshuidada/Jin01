package com.mdoa.work.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.base.model.PageModel;
import com.mdoa.util.StringUtil;
import com.mdoa.work.dao.CertificateDao;
import com.mdoa.work.model.WorkOfficeCertificate;

@Service
public class CertificateService {

	@Autowired
	private CertificateDao certificateDao;

	/**
	 * 添加证书
	 * @param workOfficeCertificate
	 */
	public void addCertificate(WorkOfficeCertificate workOfficeCertificate) {
		if (!certificateDao.addCertificate(workOfficeCertificate)) 
			throw new RuntimeException("添加证书失败");
			
	}
	/**
	 * 查询证书
	 * @param workOfficeCertificate
	 * @return
	 */
	public PageModel<WorkOfficeCertificate> queryCertificate(WorkOfficeCertificate workOfficeCertificate) {
		if (!StringUtil.isEmpty(workOfficeCertificate.getCertificateName())) 
			workOfficeCertificate.setCertificateName(workOfficeCertificate.getCertificateName()+"%");
		PageHelper.startPage(workOfficeCertificate.getPage(), workOfficeCertificate.getRows());
		List<WorkOfficeCertificate> list = certificateDao.queryCertificate(workOfficeCertificate);
		PageModel<WorkOfficeCertificate> pageModel = new PageModel<>((Page<WorkOfficeCertificate>)list);
		return pageModel;
	}
	/**
	 * 修改证书
	 * @param workOfficeCertificate
	 */
	public void updateCertificate(WorkOfficeCertificate workOfficeCertificate) {
		if (!certificateDao.updateCertificate(workOfficeCertificate)) 
			throw new RuntimeException("修改证书失败");
			
	}
	/**
	 * 删除证书
	 * @param workOfficeCertificate
	 */
	public void deleteCertificate(WorkOfficeCertificate workOfficeCertificate) {
		if (!certificateDao.deleteCertificate(workOfficeCertificate)) 
			throw new RuntimeException("删除证书失败");
	}
	
	
}
