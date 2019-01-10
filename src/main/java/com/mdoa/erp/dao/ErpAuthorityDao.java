package com.mdoa.erp.dao;

import java.util.List;

import com.mdoa.erp.bo.ErpAuthorityForm;

public interface ErpAuthorityDao {
    
    /**
     * 删除erp查询权限
     * @param erpAuthorityForm
     * @return
     */
    boolean deleteAuthority(ErpAuthorityForm erpAuthorityForm);
    
    /**
     * 添加erp查询权限
     * @param erpAuthorityForm
     * @return
     */
    boolean insertAuthority(ErpAuthorityForm erpAuthorityForm);
    
    /**
     * 查询erp查询权限人员
     * @param erpAuthorityForm
     * @return
     */
    List<ErpAuthorityForm> queryAuthorityPerson(ErpAuthorityForm erpAuthorityForm);

    /**
     * 查询erp查询权限
     * @param erpAuthorityForm
     * @return
     */
    List<ErpAuthorityForm> queryAuthorityByUser(ErpAuthorityForm erpAuthorityForm);

}
