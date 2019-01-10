package com.mdoa.app.model;


import java.util.Date;

import com.mdoa.util.DateUtil;
/**
 * 招聘人才model
 * @author Administrator
 *
 */
public class AppJobs {

	private String jobsId;
	private String jobsPost;
	private String jobsDepartment;
	private String jobsAge;
	private String workPlace;
	private String salaryPackage;
	private Date releaseTime;
	private String releaseTimeStr;
	private String workYear;
	private String education;
	private String jobsNumber;
	private String jobsRequest;
	private String postRequest;
	private String sortId;
	
	public String getJobsId() {
		return jobsId;
	}
	public void setJobsId(String jobsId) {
		this.jobsId = jobsId;
	}
	public String getJobsPost() {
		return jobsPost;
	}
	public void setJobsPost(String jobsPost) {
		this.jobsPost = jobsPost;
	}
	public String getJobsDepartment() {
		return jobsDepartment;
	}
	public void setJobsDepartment(String jobsDepartment) {
		this.jobsDepartment = jobsDepartment;
	}
	public String getJobsAge() {
		return jobsAge;
	}
	public void setJobsAge(String jobsAge) {
		this.jobsAge = jobsAge;
	}
	public String getWorkPlace() {
		return workPlace;
	}
	public void setWorkPlace(String workPlace) {
		this.workPlace = workPlace;
	}
	public String getSalaryPackage() {
		return salaryPackage;
	}
	public void setSalaryPackage(String salaryPackage) {
		this.salaryPackage = salaryPackage;
	}
	public Date getReleaseTime() {
		return releaseTime;
	}
	public void setReleaseTime(Date releaseTime) {
		this.releaseTime = releaseTime;
		this.releaseTimeStr = DateUtil.dateToStr(releaseTime,"yyyy-MM-dd");
	}
	public String getReleaseTimeStr() {
		return releaseTimeStr;
	}
	public void setReleaseTimeStr(String releaseTimeStr) {
		this.releaseTimeStr = releaseTimeStr;
		this.releaseTime = DateUtil.strToDate(releaseTimeStr,"yyyy-MM-dd");
	}
	public String getWorkYear() {
		return workYear;
	}
	public void setWorkYear(String workYear) {
		this.workYear = workYear;
	}
	public String getEducation() {
		return education;
	}
	public void setEducation(String education) {
		this.education = education;
	}
	public String getJobsNumber() {
		return jobsNumber;
	}
	public void setJobsNumber(String jobsNumber) {
		this.jobsNumber = jobsNumber;
	}
	public String getJobsRequest() {
		return jobsRequest;
	}
	public void setJobsRequest(String jobsRequest) {
		this.jobsRequest = jobsRequest;
	}
	public String getPostRequest() {
		return postRequest;
	}
	public void setPostRequest(String postRequest) {
		this.postRequest = postRequest;
	}
	public String getSortId() {
		return sortId;
	}
	public void setSortId(String sortId) {
		this.sortId = sortId;
	}

	
	
}
