package com.mdoa.personnel.bo;

import com.mdoa.base.model.BaseModel;

public class LeaveExamineForm extends BaseModel{
	private String leaveStreamId;
	private String leaveApplyId;
	private String examineIdea;
	private String nextExamineUserName;
	private String nextExamineUserId;
	private String examineStatus;
	private String recordNote;//备案信息
	private String leaveType;
	
	public String getLeaveStreamId() {
		return leaveStreamId;
	}
	public void setLeaveStreamId(String leaveStreamId) {
		this.leaveStreamId = leaveStreamId;
	}
	public String getLeaveApplyId() {
		return leaveApplyId;
	}
	public void setLeaveApplyId(String leaveApplyId) {
		this.leaveApplyId = leaveApplyId;
	}
	public String getExamineIdea() {
		return examineIdea;
	}
	public void setExamineIdea(String examineIdea) {
		this.examineIdea = examineIdea;
	}
	public String getNextExamineUserName() {
		return nextExamineUserName;
	}
	public void setNextExamineUserName(String nextExamineUserName) {
		this.nextExamineUserName = nextExamineUserName;
	}
	public String getNextExamineUserId() {
		return nextExamineUserId;
	}
	public void setNextExamineUserId(String nextExamineUserId) {
		this.nextExamineUserId = nextExamineUserId;
	}
	public String getExamineStatus() {
		return examineStatus;
	}
	public void setExamineStatus(String examineStatus) {
		this.examineStatus = examineStatus;
	}
	
	/**
	 * 将本类型变量转为LeaveApplyForm的方法
	 * @return
	 */
	public LeaveApplyForm toApplyForm(){
		LeaveApplyForm leaveApplyForm = new LeaveApplyForm();
		leaveApplyForm.setExamineUserId(this.nextExamineUserId);
		leaveApplyForm.setExamineUserName(this.nextExamineUserName);
		leaveApplyForm.setLeaveApplyId(this.leaveApplyId);
		return leaveApplyForm;
	}
	public String getRecordNote() {
		return recordNote;
	}
	public void setRecordNote(String recordNote) {
		this.recordNote = recordNote;
	}
	public String getLeaveType() {
		return leaveType;
	}
	public void setLeaveType(String leaveType) {
		this.leaveType = leaveType;
	}
}
