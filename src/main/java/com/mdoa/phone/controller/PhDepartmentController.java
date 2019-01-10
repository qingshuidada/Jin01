package com.mdoa.phone.controller;

import java.util.LinkedList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.model.JsonReturnObject;
import com.mdoa.constant.Constant;
import com.mdoa.constant.SingleObject;
import com.mdoa.framework.model.DepartmentTree;
import com.mdoa.framework.service.DepartmentService;

@RestController
@RequestMapping("/phDepartment")
public class PhDepartmentController {
	
	@Autowired
	private DepartmentService departmentService;
	
	/**
	 * 获取公司的部门结构信息，如果单例化的部门结构信息是空的，则调用service层中的方法，为单例化的对象注入结构
	 * @return 部门信息json
	 */
	@RequestMapping("/getFramework.ph")
	public String getFramework(){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try{
			if(SingleObject.frameworkDepartments == null){
				synchronized(this){
					if(SingleObject.frameworkDepartments != null){
						jro.setSuccess(true);
						jro.setReturnObj(SingleObject.frameworkDepartments);
						return gson.toJson(jro);
					}
					DepartmentTree superDepartment = new DepartmentTree();
					superDepartment.setText("杭州航民达美染整有限公司");
					superDepartment.setId("0000");
					superDepartment.setThisId("0000");
					SingleObject.frameworkDepartments = new LinkedList<DepartmentTree>();
					SingleObject.frameworkDepartments.add(superDepartment); 
					superDepartment.setChildren(departmentService.injectFrameworkDepartment(superDepartment));
				}
			}
			jro.setSuccess(true);
			jro.setReturnObj(SingleObject.frameworkDepartments);
		}catch(Exception e){
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
}
