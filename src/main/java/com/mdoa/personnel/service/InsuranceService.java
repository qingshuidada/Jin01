package com.mdoa.personnel.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.base.model.PageModel;
import com.mdoa.personnel.bo.InsuranceForm;
import com.mdoa.personnel.bo.InsuranceTypeForm;
import com.mdoa.personnel.dao.InsuranceDao;
import com.mdoa.personnel.model.InsuranceType;
import com.mdoa.util.ExcelModel;
import com.mdoa.util.ExcelUtil;
import com.mdoa.util.JSONUtil;
import com.mdoa.util.StringUtil;

@Service
@Transactional
public class InsuranceService {
    @Autowired
    private InsuranceDao insuranceDao;

    
    /**
     * 查询无社保人员
     * 
     * @param insuranceForm
     * @return
     */
    public PageModel<InsuranceForm> findAMRRUserInfo(InsuranceForm insuranceForm) {
	if (!StringUtil.isEmpty(insuranceForm.getUserName())) {
	    insuranceForm.setUserName("'" + insuranceForm.getUserName() + "%'");
	}
	PageHelper.startPage(insuranceForm.getPage(), insuranceForm.getRows());
	List<InsuranceForm> list = insuranceDao.findAMRRUserInfo(insuranceForm);
	PageModel<InsuranceForm> pageInfo = new PageModel<>((Page<InsuranceForm>) list);
	return pageInfo;
    }
    
    /**
     * 通过社保类型id查询社保信息
     * 
     * @param typeId
     * @return
     */
    public PageModel<InsuranceForm> findInsuranceByTypeId(InsuranceForm insuranceForm) {
	String typeId = insuranceForm.getInsuranceTypeId();
	List<InsuranceForm> list = insuranceDao.findInsuranceByTypeId(typeId);
	// 设置分页页码和每页大小
	PageHelper.startPage(insuranceForm.getPage(), insuranceForm.getRows());
	PageModel<InsuranceForm> pageInfo = new PageModel<>((Page<InsuranceForm>) list);
	return pageInfo;
    }

    /**
     * 通过员工id查询社保信息
     * 
     * @param insuranceForm
     * @return
     */
    public PageModel<InsuranceForm> findInsuranceByUserId(InsuranceForm insuranceForm) {
	String userId = insuranceForm.getUserId();
	PageHelper.startPage(insuranceForm.getPage(), insuranceForm.getRows());
	List<InsuranceForm> list = insuranceDao.findInsuranceByUserId(userId);
	PageModel<InsuranceForm> pageInfo = new PageModel<>((Page<InsuranceForm>) list);
	return pageInfo;
    }

    /**
     * 插入社保信息
     * 
     * @param insuranceForm
     */
    public void insertInsurance(InsuranceForm insuranceForm) {
	if(insuranceDao.hasInsurance(insuranceForm) != 0)
	    throw new RuntimeException("该员工已存在社保");
	if (!insuranceDao.insertInsurance(insuranceForm))
	    throw new RuntimeException("插入社保信息失败");
    }

    /**
     * 通过社保大类型查询社保类型信息
     * 
     * @param insuranceTypeForm
     * @return
     */
    public PageModel<InsuranceTypeForm> findTypeBySuperType(InsuranceTypeForm insuranceTypeForm) {
	String superType = insuranceTypeForm.getSuperType();
	PageHelper.startPage(insuranceTypeForm.getPage(), insuranceTypeForm.getRows());
	List<InsuranceTypeForm> list = insuranceDao.findTypeBySuperType(superType);
	PageModel<InsuranceTypeForm> pageInfo = new PageModel<>((Page<InsuranceTypeForm>) list);
	return pageInfo;
    }

    /**
     * 插入社保类型信息
     * 
     * @param insuranceTypeForm
     */
    public void insertInsuranceType(InsuranceTypeForm insuranceTypeForm) {
	if (!insuranceDao.insertInsuranceType(insuranceTypeForm))
	    throw new RuntimeException("插入社保类型信息失败");

    }

    /**
     * 条件查询社保信息的方法
     * 
     * @param insuranceForm
     * @return
     */
    public PageModel<InsuranceForm> findInsuranceByCondition(InsuranceForm insuranceForm) {
	if (!StringUtil.isEmpty(insuranceForm.getUserName())) {
	    insuranceForm.setUserName("'" + insuranceForm.getUserName() + "%'");
	}
	PageHelper.startPage(insuranceForm.getPage(), insuranceForm.getRows());
	List<InsuranceForm> list = insuranceDao.findInsuranceByCondition(insuranceForm);
	PageModel<InsuranceForm> pageInfo = new PageModel<>((Page<InsuranceForm>) list);
	return pageInfo;
    }

    /**
     * 条件查询社保类型
     * 
     * @param insuranceTypeForm
     * @return
     */
    public PageModel<InsuranceType> findTypeByCondition(InsuranceTypeForm insuranceTypeForm) {
	if (!StringUtil.isEmpty(insuranceTypeForm.getTypeName())) {
	    insuranceTypeForm.setTypeName("'" + insuranceTypeForm.getTypeName() + "%'");
	}
	if (!StringUtil.isEmpty(insuranceTypeForm.getCreateUserName())) {
	    insuranceTypeForm.setCreateUserName("'" + insuranceTypeForm.getCreateUserName() + "%'");
	}
	PageHelper.startPage(insuranceTypeForm.getPage(), insuranceTypeForm.getRows());
	List<InsuranceType> list = insuranceDao.findTypeByCondition(insuranceTypeForm);
	PageModel<InsuranceType> pageInfo = new PageModel<>((Page<InsuranceType>) list);
	return pageInfo;
    }
    
    /**
     * 删除社保信息
     * @param insuranceForm
     */
    public void deleteInsurance(InsuranceForm insuranceForm) {
	if(!insuranceDao.deleteInsurance(insuranceForm))
	    throw new RuntimeException("删除社保信息失败");
    }
    
    /**
     * 修改社保信息
     * @param insuranceForm
     */
    public void updateInsurance(InsuranceForm insuranceForm) {
	if(!insuranceDao.updateInsurance(insuranceForm))
	    throw new RuntimeException("修改社保信息失败");
    }

	public void exporttoExcel(InsuranceForm insuranceForm, String jsonString, String filePath) throws Exception{
		List<ExcelModel> modelDetails = JSONUtil.jsonToExcelModelList(jsonString);
		List<InsuranceForm> list = insuranceDao.findInsuranceByCondition(insuranceForm);
		for(int i = 0 ; i<list.size();i++){
			list.get(i).parseData();
		}
		ExcelUtil.writeListToExcel(filePath, list, modelDetails);
	}
}
