package com.mdoa.app.bo;

import java.util.List;

import com.mdoa.app.model.AppJobs;
import com.mdoa.app.model.AppNews;

public class FifithPageForm extends BaseForm{

	private List<AppJobs> jobs;
	private List<AppNews> news;
	public List<AppJobs> getJobs() {
		return jobs;
	}
	public void setJobs(List<AppJobs> jobs) {
		this.jobs = jobs;
	}
	public List<AppNews> getNews() {
		return news;
	}
	public void setNews(List<AppNews> news) {
		this.news = news;
	}
	
	
}
