package com.mdoa.dingding.model;
/**
 * 钉钉部门
 * @author Administrator
 *
 */
public class DDDepartment {

	private Long id;
	private String name;
	private Long parentid;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public Long getParentid() {
		return parentid;
	}
	public void setParentid(Long parentid) {
		this.parentid = parentid;
	}
	@Override
	public String toString() {
		return "DDDepartment [id=" + id + ", name=" + name + ", parentid=" + parentid + "]";
	}
	
	
}
