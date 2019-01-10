package com.mdoa.repertory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fr.stable.collections.utils.Predicate;
import com.google.gson.Gson;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.repertory.model.ResultJianCe;
import com.mdoa.repertory.service.ResultJianCeService;

@RestController
@RequestMapping("/resultJianCe")
public class ResultJianCeController {
	
	@Autowired
	private ResultJianCeService resultJianCeService;
	@RequestMapping("selectResultJianCe.do")
	public String selectResultJianCe(ResultJianCe resultJianCe){
		try {
			PageModel<ResultJianCe> pageModel = resultJianCeService.selectResultJianCe(resultJianCe);
			Gson gson = new Gson();
			return gson.toJson(pageModel);
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
}
