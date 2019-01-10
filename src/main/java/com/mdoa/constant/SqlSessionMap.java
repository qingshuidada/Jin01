package com.mdoa.constant;

import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

@Resource
public class SqlSessionMap {
	private Map<String, SqlSessionFactory> sqlSessionFactoryMap;

	public Map<String, SqlSessionFactory> getSqlSessionFactoryMap() {
		return sqlSessionFactoryMap;
	}

	public void setSqlSessionFactoryMap(Map<String, SqlSessionFactory> sqlSessionFactoryMap) {
		this.sqlSessionFactoryMap = sqlSessionFactoryMap;
	}

	public SqlSession getSqlSession(String key){
		return sqlSessionFactoryMap.get(key).openSession();
	}
	
}
