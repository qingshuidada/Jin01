package com.mdoa.salary.interfaces;

import java.util.Map;

/**
 * 实现该接口的类将可以支持从excel读入数据
 * @author Administrator
 *
 */
public interface ExcelReadable {
	
	/**
	 * 该方法用于根据编号 来调用不同的set方法设置属性值
	 * @param object
	 * @param index
	 */
	void setProperty(String value,int index) throws Exception;
	
	void setProperty(Integer value,int index) throws Exception;
	
	void setProperty(Double value,int index) throws Exception;
}
