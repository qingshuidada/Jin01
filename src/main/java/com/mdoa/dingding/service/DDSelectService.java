package com.mdoa.dingding.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mdoa.constant.SqlSessionMap;
import com.mdoa.dingding.dao.DDSelectDao;
import com.mdoa.dingding.model.DDSelectForm;
import com.mdoa.user.model.UserInfo;
@Service
public class DDSelectService {

	@Autowired
	private SqlSessionMap sessionMap;
	
	public DDSelectDao getDDSelectDao(String dataSourceName) {
		SqlSession sqlSession = sessionMap.getSqlSession(dataSourceName);
		DDSelectDao ddSelectDao = sqlSession.getMapper(DDSelectDao.class);
		return ddSelectDao;
	}
	
	
	public UserInfo TestConnect() {
		DDSelectDao ddSelectDao = getDDSelectDao("kaoQinDataSource");
		UserInfo info = ddSelectDao.selectUserInfo("8000024");
		return info;
	}
	
	/**
	 * 查询数据库名字
	 * @param selectForm
	 * @return
	 * @throws DocumentException
	 */
	public List<DDSelectForm> queryDataResourceName(DDSelectForm selectForm) throws DocumentException{
		SAXReader reader = new SAXReader();
		Document document = reader.read(this.getClass().getClassLoader().getResourceAsStream("/dingding/ErpDateSourceList.xml"));
		Element node = document.getRootElement(); 
		List<DDSelectForm> list = listNodes(node);
		return list;
	}
	public List<DDSelectForm> listNodes(Element node) {
		List<DDSelectForm> ddList = new ArrayList<>();
		List<Attribute> list = node.attributes();
		Iterator<Element> iterator = node.elementIterator();
		while(iterator.hasNext()){
			DDSelectForm ddSelectForm = new DDSelectForm();
            Element e = iterator.next();  
            List<Attribute> eList = e.attributes();
            for(Attribute attribute : eList){
            	if (attribute.getName().equals("dataSourceKey")) 
            		ddSelectForm.setDataSourceKey(attribute.getValue());
            	if (attribute.getName().equals("dataSourceName")) 
            		ddSelectForm.setDataSourceName(attribute.getValue());
            } 
            ddList.add(ddSelectForm);
        }
        return ddList;
	}
		
}
