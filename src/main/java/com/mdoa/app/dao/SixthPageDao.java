package com.mdoa.app.dao;

import java.util.List;

import com.mdoa.app.bo.EmployeeCare;
import com.mdoa.app.bo.Environment;

public interface SixthPageDao {

	List<EmployeeCare> selectEmployeeCareBySortId(String sortId);
	
	List<Environment> selectEnvironmentBySortId(String sortId);
}
