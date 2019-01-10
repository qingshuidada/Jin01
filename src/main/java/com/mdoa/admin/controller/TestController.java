package com.mdoa.admin.controller;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mdoa.admin.service.TestService;

@RestController
public class TestController {
	
	@Resource
	private TestService testService;
	
	@RequestMapping("test.do")
	public void test(){
		testService.test();
	}
}
