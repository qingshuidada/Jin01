package com.mdoa.weixin.util;


import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.mdoa.util.StringUtil;
import com.mdoa.weixin.model.TextMessage;
import com.thoughtworks.xstream.XStream;


public class MessageUtil {
	
	public static final String MESSAGE_TEXT = "text";
	public static final String MESSAGE_IMAGE = "image";
	public static final String MESSAGE_VOICE = "voice";
	public static final String MESSAGE_VEDIO = "video";
	public static final String MESSAGE_LINK = "link";
	public static final String MESSAGE_LOCATIUON = "location";
	public static final String MESSAGE_EVENT = "event";
	public static final String MESSAGE_SUBSCRIBE = "subscribe";
	public static final String MESSAGE_UNSUBSCRIBE = "unsubscribe";
	public static final String MESSAGE_CLICK = "CLICK";
	public static final String MESSAGE_VIEW = "VIEW";
	
	/**
	 * 集合
	 * @param request
	 * @return +
	 * @throws IOException
	 * @throws DocumentException
	 */
	public static Map<String, String> xmlToMap(HttpServletRequest request) throws IOException, DocumentException{
		
		Map<String, String> map = new HashMap<>();
		SAXReader reader = new SAXReader();
		
		InputStream inputStream = request.getInputStream();
		Document document = reader.read(inputStream);
		Element root = document.getRootElement();
		List<Element> list = root.elements();
		
		for (Element element : list) {
			map.put(element.getName(), element.getText());
		}
		return map;
	}
	/**
	 * 将文本消息对象转换为XML
	 * @param textMessage
	 * @return
	 */
	public static String textMessageToXml(TextMessage textMessage){
		XStream xStream = new XStream();
		xStream.alias("xml", textMessage.getClass());
		return xStream.toXML(textMessage);
		
	}
	
	/**
	 * 将xmlText字符串转成map
	 * @param xmlText
	 * @return
	 */
	public static Map<String, String> xmlToMap (String xmlText) throws IOException, DocumentException{
		Map<String, String> map = new HashMap<>();
		SAXReader reader = new SAXReader();
		
		InputStream inputStream =  new ByteArrayInputStream(xmlText.getBytes());
		Document document = reader.read(inputStream);
		Element root = document.getRootElement();
		List<Element> list = root.elements();
		
		for (Element element : list) {
			map.put(element.getName(), element.getText());
		}
		
		return map;
	}
}
