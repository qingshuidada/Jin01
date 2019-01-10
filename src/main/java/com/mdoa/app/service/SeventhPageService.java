package com.mdoa.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fr.function.IF;
import com.mdoa.app.bo.SeventhPageForm;
import com.mdoa.app.dao.AppSortDao;
import com.mdoa.app.dao.SeventhPageDao;
import com.mdoa.app.model.AppContact;
import com.mdoa.app.model.AppOnlineMessage;

@Service
public class SeventhPageService {

	@Autowired
	private SeventhPageDao seventhPageDao;
	
	@Autowired
	private AppSortDao sortDao;
	
	public SeventhPageForm selectAllMessage(){
		SeventhPageForm seventhPageForm = new SeventhPageForm();
		seventhPageForm.setAppSort(sortDao.selectSortBySortId("7"));
		seventhPageForm.setAppCompony(seventhPageDao.selectComponyMessage());
		seventhPageForm.setAppContacts(seventhPageDao.selectContacts());
		return seventhPageForm;
	}
	
	public void addOnlineMessage(AppOnlineMessage message){
		if(!seventhPageDao.addOnlineMessage(message)){
			throw new RuntimeException("插入在线留言失败");
		}
	}
	
	public List<AppContact> selectAppContact(){
		return seventhPageDao.selectContacts();
	}
	
	public void updateContact(AppContact appContact){
		if(!seventhPageDao.updateContact(appContact)){
			throw new RuntimeException("修改失败");
		}
	}
}
