package com.mdoa.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.app.bo.SixthPageForm;
import com.mdoa.app.service.SixthPageService;
import com.mdoa.constant.Constant;

@RestController
@RequestMapping("sixthPage")
public class SixthPageController {

	@Autowired
	private SixthPageService sixthPageService;
	
	/**
	 * 查询社会责任下的所有信息
	 * @param appSort
	 * @return
	 */
	@RequestMapping("selectSocialResponsibility.do")
	public String selectSocialResponsibility(){
		Gson gson = new Gson();
		try{
			SixthPageForm sixthPageForm = sixthPageService.selectSocialResponsibility();
			return gson.toJson(sixthPageForm);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
}
