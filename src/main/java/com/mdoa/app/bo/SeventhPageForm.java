package com.mdoa.app.bo;

import java.util.List;

import com.mdoa.app.model.AppCompony;
import com.mdoa.app.model.AppContact;

public class SeventhPageForm extends BaseForm{

	private AppCompony appCompony;
	private List<AppContact> appContacts;
	public AppCompony getAppCompony() {
		return appCompony;
	}
	public void setAppCompony(AppCompony appCompony) {
		this.appCompony = appCompony;
	}
	public List<AppContact> getAppContacts() {
		return appContacts;
	}
	public void setAppContacts(List<AppContact> appContacts) {
		this.appContacts = appContacts;
	}
	
	
}
