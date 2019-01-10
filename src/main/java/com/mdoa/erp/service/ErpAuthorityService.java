package com.mdoa.erp.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.base.model.PageModel;
import com.mdoa.erp.bo.ErpAuthorityForm;
import com.mdoa.erp.dao.ErpAuthorityDao;

@Service
@Transactional
public class ErpAuthorityService {
    
    @Autowired
    private ErpAuthorityDao erpAuthorityDao;

    /**
     * 添加erp查询权限
     * @param erpAuthorityForm
     */
    public void insertAuthority(ErpAuthorityForm erpAuthorityForm) {
	List<String> dataSourceKeys = erpAuthorityForm.getDataSourceKeys();
	List<String> dataSourceNames = erpAuthorityForm.getDataSourceNames();
	if(dataSourceKeys == null || dataSourceNames == null || dataSourceKeys.size() != dataSourceNames.size())
	    throw new RuntimeException("数据异常，插入erp查询权限失败");
	erpAuthorityDao.deleteAuthority(erpAuthorityForm);
	for(int i = 0; i < dataSourceKeys.size(); i++){
	    erpAuthorityForm.setDataSourceKey(dataSourceKeys.get(i));
	    erpAuthorityForm.setDataSourceName(dataSourceNames.get(i));
	    if(!erpAuthorityDao.insertAuthority(erpAuthorityForm))
		throw new RuntimeException("插入erp查询权限失败");
	}
    }
    
    /**
     * 删除erp查询权限
     * @param erpAuthorityForm
     */
    public void deleteAuthority(ErpAuthorityForm erpAuthorityForm) {
	if(!erpAuthorityDao.deleteAuthority(erpAuthorityForm))
	    throw new RuntimeException("删除erp查询权限失败");
    }
    
    /**
     * 查询erp查询权限人员
     * @param erpAuthorityForm
     * @return
     */
    public PageModel<ErpAuthorityForm> queryAuthorityPerson(ErpAuthorityForm erpAuthorityForm) {
	PageHelper.startPage(erpAuthorityForm.getPage(), erpAuthorityForm.getRows());
	List<ErpAuthorityForm> list = erpAuthorityDao.queryAuthorityPerson(erpAuthorityForm);
	Page<ErpAuthorityForm> page = (Page<ErpAuthorityForm>) list;
	PageModel<ErpAuthorityForm> pageModel = new PageModel<>(page);
	return pageModel;
    }
    
    /**
     * 查询erp查询权限人员
     * @param erpAuthorityForm
     * @return
     */
    public PageModel<ErpAuthorityForm> queryAuthorityByUser(ErpAuthorityForm erpAuthorityForm) {
	PageHelper.startPage(erpAuthorityForm.getPage(), erpAuthorityForm.getRows());
	List<ErpAuthorityForm> list = erpAuthorityDao.queryAuthorityByUser(erpAuthorityForm);
	Page<ErpAuthorityForm> page = (Page<ErpAuthorityForm>) list;
	PageModel<ErpAuthorityForm> pageModel = new PageModel<>(page);
	return pageModel;
    }
    
}
