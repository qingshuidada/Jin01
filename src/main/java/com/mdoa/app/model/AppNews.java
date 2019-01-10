package com.mdoa.app.model;

import java.util.Date;

import com.mdoa.util.DateUtil;

/**
 * 公司新闻model
 * @author Administrator
 *
 */
public class AppNews {

	private String newsId;
	private String newsName;
	private Date newsTime;
	private String newsTimeStr;
	private String newsDescribe;
	private String newsImageUrl;
	private String sortId;
	public String getNewsId() {
		return newsId;
	}
	public void setNewsId(String newsId) {
		this.newsId = newsId;
	}
	public String getNewsName() {
		return newsName;
	}
	public void setNewsName(String newsName) {
		this.newsName = newsName;
	}
	public Date getNewsTime() {
		return newsTime;
	}
	public void setNewsTime(Date newsTime) {
		this.newsTime = newsTime;
		this.newsTimeStr = DateUtil.dateToStr(newsTime,"yyyy-MM-dd");
	}
	public String getNewsTimeStr() {
		return newsTimeStr;
	}
	public void setNewsTimeStr(String newsTimeStr) {
		this.newsTimeStr = newsTimeStr;
		this.newsTime = DateUtil.strToDate(newsTimeStr,"yyyy-MM-dd");
	}
	public String getNewsDescribe() {
		return newsDescribe;
	}
	public void setNewsDescribe(String newsDescribe) {
		this.newsDescribe = newsDescribe;
	}
	public String getNewsImageUrl() {
		return newsImageUrl;
	}
	public void setNewsImageUrl(String newsImageUrl) {
		this.newsImageUrl = newsImageUrl;
	}
	public String getSortId() {
		return sortId;
	}
	public void setSortId(String sortId) {
		this.sortId = sortId;
	}
	
	
	
}
