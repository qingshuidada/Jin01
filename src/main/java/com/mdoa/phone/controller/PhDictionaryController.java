package com.mdoa.phone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.model.JsonReturnObject;
import com.mdoa.base.model.PageModel;
import com.mdoa.dictionary.model.Dictionary;
import com.mdoa.dictionary.service.DictionaryService;

@RestController
@RequestMapping("/phDictionary")
public class PhDictionaryController {

	@Autowired
	private DictionaryService dictionaryService;
	
	
	/**
	 * 查询信息(option)
	 */
	@RequestMapping("/queryDictionary.ph")
	public String queryDictionary(Dictionary dictionary){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			PageModel<Dictionary> list = dictionaryService.queryDictionary(dictionary);
			jro.setReturnObj(list);
			jro.setSuccess(true);
		} catch (Exception e) {
			e.printStackTrace();
			jro.setSuccess(false);
			jro.setMessage(e.getMessage());
		}
		return gson.toJson(jro);
	}
}
