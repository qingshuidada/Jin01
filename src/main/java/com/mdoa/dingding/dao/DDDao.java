package com.mdoa.dingding.dao;

import java.util.List;

import com.mdoa.dingding.model.DDDepartment;
import com.mdoa.framework.model.DepartmentTree;

public interface DDDao {

	Integer inserDepartmentBatch(List<DDDepartment> ddDepartments);
	
	List<DepartmentTree> getDepartmentByParentId(DepartmentTree departmentTree);
}
