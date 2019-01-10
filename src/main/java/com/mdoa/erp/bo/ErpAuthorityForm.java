package com.mdoa.erp.bo;

import java.util.ArrayList;
import java.util.List;

import com.mdoa.base.model.BaseModel;

public class ErpAuthorityForm extends BaseModel{
    
    private String authorityId;
    private String dataSourceKey;
    private String dataSourceName;
    private List<String> dataSourceKeys;
    private List<String> dataSourceNames;
    
    public String getAuthorityId() {
        return authorityId;
    }
    public void setAuthorityId(String authorityId) {
        this.authorityId = authorityId;
    }
    public String getDataSourceKey() {
        return dataSourceKey;
    }
    public void setDataSourceKey(String dataSourceKey) {
        this.dataSourceKey = dataSourceKey;
    }
    public String getDataSourceName() {
        return dataSourceName;
    }
    public void setDataSourceName(String dataSourceName) {
        this.dataSourceName = dataSourceName;
    }
    
    public List<String> getDataSourceKeys() {
	return dataSourceKeys;
    }
    public void setDataSourceKeys(String dataSourceKeyStr) {
	dataSourceKeys = new ArrayList<>();
	String[] keys = dataSourceKeyStr.split(",");
	if(keys != null){
	    for(int i = 0; i < keys.length; i++){
		dataSourceKeys.add(keys[i]);
	    }
	}
    }
    
    public List<String> getDataSourceNames() {
	return dataSourceNames;
    }
    public void setDataSourceNames(String dataSourceNameStr) {
	dataSourceNames = new ArrayList<>();
	String[] names = dataSourceNameStr.split(",");
	if(names != null){
	    for(int i = 0; i < names.length; i++){
		dataSourceNames.add(names[i]);
	    }
	}
    }
    
    
}
