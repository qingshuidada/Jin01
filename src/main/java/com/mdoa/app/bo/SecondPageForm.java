package com.mdoa.app.bo;

import java.util.List;

import com.mdoa.app.model.AppCompony;
import com.mdoa.app.model.AppManager;

public class SecondPageForm extends BaseForm{

	private AppCompony appCompony;
	private AppManager appManager;
	private List<ComponyCulture> componyCultures;
	private ComponyFramework framework;
	private List<ComponyStyle> componyStyles;
	private ComponyHonor componyHonor;
	public AppCompony getAppCompony() {
		return appCompony;
	}
	public void setAppCompony(AppCompony appCompony) {
		this.appCompony = appCompony;
	}
	public AppManager getAppManager() {
		return appManager;
	}
	public void setAppManager(AppManager appManager) {
		this.appManager = appManager;
	}
	public List<ComponyCulture> getComponyCultures() {
		return componyCultures;
	}
	public void setComponyCultures(List<ComponyCulture> componyCultures) {
		this.componyCultures = componyCultures;
	}
	public ComponyFramework getFramework() {
		return framework;
	}
	public void setFramework(ComponyFramework framework) {
		this.framework = framework;
	}
	public List<ComponyStyle> getComponyStyles() {
		return componyStyles;
	}
	public void setComponyStyles(List<ComponyStyle> componyStyles) {
		this.componyStyles = componyStyles;
	}
	public ComponyHonor getComponyHonor() {
		return componyHonor;
	}
	public void setComponyHonor(ComponyHonor componyHonor) {
		this.componyHonor = componyHonor;
	}
	
	
	
}
