package com.mdoa.repertory.model.highcharts;

import java.util.List;

public class LineDataModel {
	
	private String name;
	private List<Double> data;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<Double> getData() {
		return data;
	}
	public void setData(List<Double> data) {
		this.data = data;
	}
}
