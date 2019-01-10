package com.mdoa.dingding.controller;
import java.util.LinkedList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.constant.Constant;
import com.mdoa.constant.SingleObject;
import com.mdoa.dingding.service.DDSelectService;
import com.mdoa.dingding.service.DDService;
import com.mdoa.framework.model.DepartmentTree;
import com.mdoa.user.model.UserInfo;

@RestController
@RequestMapping("dingding")
public class DDController {
	
	@Autowired
	private DDService ddService;
	
	@Autowired
	private DDSelectService ddSelectService;
	
	@RequestMapping("test.do")
	public String test() {
		UserInfo userInfo = ddSelectService.TestConnect();
		System.out.println(userInfo.getUserName());
		return userInfo.getUserName();
	}
	
	/**
	 * 钉钉部门树
	 * @return
	 */
	@RequestMapping("getDDDepartment.do")
	public String getFramework(){
		try{
			Gson gson = new Gson();
			if(SingleObject.ddDepartmentTrees == null){
				synchronized(this){
					if(SingleObject.ddDepartmentTrees != null){
						String json = gson.toJson(SingleObject.frameworkDepartments);
						return json;
					}
					DepartmentTree superDepartment = new DepartmentTree();
					superDepartment.setText("杭州航民达美染整有限公司");
					superDepartment.setId("1");
					superDepartment.setThisId("1");
					SingleObject.ddDepartmentTrees = new LinkedList<DepartmentTree>();
					SingleObject.ddDepartmentTrees.add(superDepartment); 
					superDepartment.setChildren(ddService.injectFrameworkDepartment(superDepartment));
				}
			}
			String json = gson.toJson(SingleObject.ddDepartmentTrees);
			return json;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 从钉钉后台得到所有的部门，并存到数据库中
	 * @return
	 */
	@RequestMapping("insertDDDepartment.do")
	public String insertDDDepartment(){
		ddService.inserDepartmentBatch();
		return "插入成功";
	}
}
