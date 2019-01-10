package com.mdoa.personnel.model;

import com.mdoa.base.model.BaseModel;
import com.mdoa.util.StringUtil;

public class Dimission extends BaseModel{
	private String dimissionId;
	private String dimissionTime;
	private String dimissionFlag;
	private String remark;
	private String createTime;
	private String createUserId;
	private String createUserName;
	private String aliveFlag;
	private String dimissionTimeStart;
	private String dimissionTimeEnd;
	private String departmentUrl;
	private String departmentName;
	private String postName;
	private String postId;
	private String idCard;
	private String inviteFlag;
	private String sex;
	
	
	
	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getInviteFlag() {
		return inviteFlag;
	}

	public void setInviteFlag(String inviteFlag) {
		this.inviteFlag = inviteFlag;
	}

	public Dimission(){
		
	}

	public String getDimissionId() {
		return dimissionId;
	}

	public void setDimissionId(String dimissionId) {
		this.dimissionId = dimissionId;
	}

	public String getDimissionTime() {
		return dimissionTime;
	}

	public void setDimissionTime(String dimissionTime) {
		this.dimissionTime = dimissionTime;
	}

	public String getDimissionFlag() {
		return dimissionFlag;
	}

	public void setDimissionFlag(String dimissionFlag) {
		this.dimissionFlag = dimissionFlag;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}

	public String getCreateUserName() {
		return createUserName;
	}

	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}

	public String getAliveFlag() {
		return aliveFlag;
	}

	public void setAliveFlag(String aliveFlag) {
		this.aliveFlag = aliveFlag;
	}

	public String getDimissionTimeStart() {
		return dimissionTimeStart;
	}

	public void setDimissionTimeStart(String dimissionTimeStart) {
		this.dimissionTimeStart = dimissionTimeStart;
	}

	public String getDimissionTimeEnd() {
		return dimissionTimeEnd;
	}

	public void setDimissionTimeEnd(String dimissionTimeEnd) {
		this.dimissionTimeEnd = dimissionTimeEnd;
	}

	public String getDepartmentUrl() {
		return departmentUrl;
	}

	public void setDepartmentUrl(String departmentUrl) {
		this.departmentUrl = departmentUrl;
	}

	public String getPostName() {
		return postName;
	}

	public void setPostName(String postName) {
		this.postName = postName;
	}

	public String getPostId() {
		return postId;
	}

	public void setPostId(String postId) {
		this.postId = postId;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getIdCard() {
		return idCard;
	}

	public void setIdCard(String idCard) {
		this.idCard = idCard;
	}
	
	/**
	 * 转换所有的数据对象
	 */
	public void parseData(){
		this.parseInviteFlag();
		this.parseSex();
	}

	/**
	 * 转换sex
	 * @param sex
	 * @return
	 */
	public void parseSex(){
		if(StringUtil.isEmpty(sex)){
			sex="";
		}else if(sex.equals("1")){
			sex="男";
		}else{
			sex="女";
		}
	}
	
	/**
	 * 转换inviteFlag
	 * @param inviteFlag
	 * @return
	 */
	public void parseInviteFlag(){
		if(StringUtil.isEmpty(inviteFlag))
			return ;
		if (StringUtil.isEmpty(inviteFlag)) {
			inviteFlag = "";
		} else if (inviteFlag.equals("1")) {
			inviteFlag = "在职";
		} else if (inviteFlag.equals("2")) {
			inviteFlag = "正常离职无手续";
		} else if (inviteFlag.equals("3")) {
			inviteFlag = "正常离职有手续";
		} else if (inviteFlag.equals("4")) {
			inviteFlag = "试用期";
		} else if (inviteFlag.equals("5")) {
			inviteFlag = "工伤";
		} else if (inviteFlag.equals("0")) {
			inviteFlag = "待聘用";
		}else if (inviteFlag.equals("6")) {
			inviteFlag = "非正常离职无手续";
		}else if (inviteFlag.equals("7")) {
			inviteFlag = "非正常离职有手续";
		}
		
	}
}
