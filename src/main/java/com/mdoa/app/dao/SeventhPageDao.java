package com.mdoa.app.dao;

import java.util.List;

import com.mdoa.app.model.AppCompony;
import com.mdoa.app.model.AppContact;
import com.mdoa.app.model.AppOnlineMessage;

public interface SeventhPageDao {

	AppCompony selectComponyMessage();
	
	List<AppContact> selectContacts();
	
	boolean addOnlineMessage(AppOnlineMessage message);
	
	boolean updateContact(AppContact appContact);
	
}
