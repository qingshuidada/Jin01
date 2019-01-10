package com.mdoa.base.model;

import java.util.List;

import com.mdoa.framework.model.DepartmentTree;
import com.mdoa.util.StringUtil;

public class TreeModel<T extends TreeModel> extends BaseModel{
	/**
	 * 节点Id,用于进行标识
	 */
	protected String id;
	
	/**
	 * 该节点的数据库实际Id
	 */
	protected String thisId;
	
	/**
	 * 节点名称
	 */
	protected String text;
	
	/**
	 * 节点状态，打开或者关闭
	 */
	protected String state = "close";

	/**
	 * 是否被选中
	 */
	protected String checked;

	/**
	 * 一些额外的属性
	 */
	protected String attributes;

	/**
	 * 子节点列表
	 */
	protected List<T> children;
	
	/**
	 * 节点所属的类样式，默认为无样式，如果setList时存在子节点，启用样式“icon-blank icon-dept”
	 */
	protected String iconCls;
	
	public TreeModel(){
		
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

	public List<T> getChildren() {
		return children;
	}

	public void setChildren(List<T> children) {
		this.children = children;
	}

	public String getIconCls() {
		return iconCls;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}

	public String getThisId() {
		return thisId;
	}

	public void setThisId(String thisId) {
		this.thisId = thisId;
	}
	
	/**
	 * 通过Url获取树节点
	 * @param url
	 * @return
	 */
	private T getTargetByUrl(String url, List<T> targets){
		T child = null;
		for(T target:targets){
			if (StringUtil.isInclude(url, target.getId())) {
				if(url.equals(target.getId())){
					return target;
				}else{
					child =  (T) getTargetByUrl(url, target.getChildren());
				}
				break ;
			}
		}
		return child;
	}
	
	/**
	 * 通过Url获取当前节点的一个子节点
	 * @param url
	 * @return
	 */
	public T getTargetByUrl(String url){
		return getTargetByUrl(url, this.children);
	}
	
	/**
	 * 通过节点的目标，获取该节点的所有子节点
	 */
	private List<T> getAllChildren(TreeModel target){
		List<T> childs = target.getChildren();
		for(T child: childs){
			childs.addAll(getAllChildren(child));
		}
		return childs;
	}
	
	/**
	 * 通过节点的目标，获取该节点的所有子节点
	 */
	public List<T> getAllChildren(){
		return getAllChildren(this);
	}
}
