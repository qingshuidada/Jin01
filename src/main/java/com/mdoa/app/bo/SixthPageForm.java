package com.mdoa.app.bo;

import java.util.List;

public class SixthPageForm extends BaseForm{

	private List<EmployeeCare> employeeCares;
	private List<Environment> environments;
	public List<EmployeeCare> getEmployeeCares() {
		return employeeCares;
	}
	public void setEmployeeCares(List<EmployeeCare> employeeCares) {
		this.employeeCares = employeeCares;
	}
	public List<Environment> getEnvironments() {
		return environments;
	}
	public void setEnvironments(List<Environment> environments) {
		this.environments = environments;
	}
	
	
}
