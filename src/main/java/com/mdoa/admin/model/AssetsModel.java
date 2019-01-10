package com.mdoa.admin.model;

import java.util.List;

public class AssetsModel {
	/**
	 * 节点Id,用于进行标识
	 */
	private String id;  
	
	private String thisId;
	/**
	 * 节点名称
	 */
    private String text;
    /**
	 * 节点状态，打开或者关闭
	 */
	private String state="open";
	/**
	 * 是否被选中
	 */
	private String checked;
	/**
	 * 一些额外的属性
	 */
	private String attributes;
	/**
	 * 节点所属的类样式，默认为无样式，如果setList时存在子节点，启用样式“icon-blank icon-dept”
	 */
    private String iconCls;
    
    private List<AssetsModel> children;//孩子节点集合
    /**
     * 连接地址
     */
    private String linkUrl;
    
    
    
	public String getThisId() {
		return thisId;
	}
	public void setThisId(String thisId) {
		this.thisId = thisId;
	}
	public String getLinkUrl() {
		return linkUrl;
	}
	public void setLinkUrl(String linkUrl) {
		this.linkUrl = linkUrl;
	}
	public void setChildren(List<AssetsModel> children) {
		this.children = children;
		/*if (children == null || children.size() == 0) {
			this.iconCls = "icon-blank icon-dept";
		}*/
	}
	public List<AssetsModel> getChildren() {
		
		return children;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getIconCls() {
		return iconCls;
	}
	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getChecked() {
		return checked;
	}
	public void setChecked(String checked) {
		this.checked = checked;
	}
	public String getAttributes() {
		return attributes;
	}
	public void setAttributes(String attributes) {
		this.attributes = attributes;
	}
	@Override
	public String toString() {
		return "TreeModel [id=" + id + ", thisId=" + thisId + ", text=" + text + ", state=" + state + ", checked="
				+ checked + ", attributes=" + attributes + ", iconCls=" + iconCls + ", children=" + children
				+ ", linkUrl=" + linkUrl + "]";
	}
	
    
    
}
