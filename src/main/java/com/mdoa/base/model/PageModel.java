package com.mdoa.base.model;

import java.util.List;


import com.github.pagehelper.Page;

public class PageModel<T> {
	/**
	 * 总行数
	 */
	private long total;
	
	/**
	 * 分页中的rows行信息
	 */
	private List<T> rows;
	
	private Integer page;
	/**
	 * 汇总数据对象
	 */
	private T sum;
	
	public PageModel(){
		
	}
	
	public PageModel(Page<T> page){
		this.total = page.getTotal();
		this.rows = page.getResult();
	}

	public PageModel(List<T> list, Integer total){
		this.rows = list;
		this.total = total;
	}
	
	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public List<T> getRows() {
		return rows;
	}

	public void setRows(List<T> rows) {
		this.rows = rows;
	}

	public T getSum() {
		return sum;
	}

	public void setSum(T sum) {
		this.sum = sum;
	}
	
}
