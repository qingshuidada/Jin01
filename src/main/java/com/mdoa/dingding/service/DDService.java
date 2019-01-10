package com.mdoa.dingding.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dingtalk.api.response.OapiDepartmentListResponse.Department;
import com.mdoa.dingding.dao.DDDao;
import com.mdoa.dingding.model.DDDepartment;
import com.mdoa.dingding.uitl.DDUtils;
import com.mdoa.framework.model.DepartmentTree;

@Service
public class DDService {

	@Autowired
	private DDDao ddDao;
	
	public void inserDepartmentBatch(){
		List<Department> departments = DDUtils.getAllDepartment();
		List<DDDepartment> list = new ArrayList<>();
		for (int i = 0;i < departments.size();i++) {
			DDDepartment ddDepartment = new DDDepartment();
			ddDepartment.setId(departments.get(i).getId());
			ddDepartment.setName(departments.get(i).getName());
			ddDepartment.setParentid(departments.get(i).getParentid());
			list.add(ddDepartment);
		}
		ddDao.inserDepartmentBatch(list);
	}
	
	public List<DepartmentTree> injectFrameworkDepartment(DepartmentTree superDepartment){
		//根据父级部门Id查询该部门下的下一级子部门
		List<DepartmentTree> departments = ddDao.getDepartmentByParentId(superDepartment);
		//递归调用，查询每一层的子部门的下一层级子部门，并设置进部门中
		for(DepartmentTree department : departments){
			department.setChildren(this.injectFrameworkDepartment(department));
		}
		//返回所有的部门信息
		return departments;
	}
}
