package com.mdoa.work.dao;

import java.util.List;

import com.mdoa.work.model.WorkOfficeCertificate;

public interface CertificateDao {
	
	/**
	 * 添加证书
	 * @param workOfficeCertificate
	 * @return
	 */
	boolean addCertificate(WorkOfficeCertificate workOfficeCertificate);
	/**
	 * 查看证书
	 * @param workOfficeCertificate
	 * @return
	 */
	List<WorkOfficeCertificate> queryCertificate(WorkOfficeCertificate workOfficeCertificate);
	/**
	 * 修改证书
	 * @param workOfficeCertificate
	 * @return
	 */
	boolean updateCertificate(WorkOfficeCertificate workOfficeCertificate);
	/**
	 * 删除证书
	 * @param workOfficeCertificate
	 * @return
	 */
	boolean deleteCertificate(WorkOfficeCertificate workOfficeCertificate);

}
