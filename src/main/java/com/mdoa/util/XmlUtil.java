package com.mdoa.util;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileWriter;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;

import com.mdoa.constant.FileConstant;

public class XmlUtil {
	/**
	 * 将一个processXml转换为bpmnXml，并将生成的xml保存到一个指定的目录中
	 * @throws Exception 
	 */
	public static String transformAndSave(String processXml,String id, String name) throws Exception{
		Document bpmnDocument = getTransformDocument(processXml, id, name);
		
		//将处理后的文档用流输出到文件
		OutputFormat format = OutputFormat.createPrettyPrint();
		format.setEncoding("utf-8");
		if(!new File(FileConstant.FILE_PATH + FileConstant.BPMN20_XML).isDirectory())
			new File(FileConstant.FILE_PATH + FileConstant.BPMN20_XML).mkdirs();
		String url = FileConstant.FILE_PATH + FileConstant.BPMN20_XML + "/" + id + ".bpmn20.xml";
		XMLWriter writer = new XMLWriter(new FileWriter(new File(url)), format);
		writer.write(bpmnDocument);
		if(writer != null){
			writer.close();
		}
		return bpmnDocument.asXML();
	}
	
	/**
	 * 将一个processXml转换为bpmnXml，并将生成的xml保存到一个指定的目录中
	 * @throws Exception 
	 */
	public static String transform(String processXml,String id, String name) throws Exception{
		Document bpmnDocument = getTransformDocument(processXml, id, name);
		return bpmnDocument.asXML();
	}
	
	private static Document getTransformDocument(String processXml,String id, String name) throws Exception{
		System.out.println(processXml);
		//读入xml文档
		Document document = new SAXReader()
				.read(new ByteArrayInputStream(processXml.toString().getBytes()));
		//创建一个标准格式的bpmn的xml文档
		InputStream fis = FileConstant.class.getClassLoader().getResourceAsStream("bpmn/bpmnFramework.bpmn20.xml");
		Document bpmnDocument = new SAXReader()
				.read(new BufferedInputStream(fis));
		
		//获取bpmn与process的根节点
		Element processRoot = document.getRootElement();
		Element bpmnRoot = bpmnDocument.getRootElement();

		//设置流程名称和流程Id
		Element bpmnProcess = bpmnRoot.element("process");
		bpmnProcess.addAttribute("id", id);
		bpmnProcess.addAttribute("name", name);
		
		//处理开始结束节点
		transformStartEndEvent(processRoot, bpmnProcess);
		//处理用户任务节点
		transformUserTask(processRoot, bpmnProcess);
		//处理流程流转节点
		transformFlow(processRoot, bpmnProcess);
		//将处理后的文档用流输出到文件
		return bpmnDocument;
	}
	
	/**
	 * 处理开始结束节点
	 */
	private static void transformStartEndEvent(Element processRoot, Element bpmnProcess){
		//处理流程的开始和结束节点
		Element processStartEvent = processRoot.element("StartEvent");
		List<Element> processEndEvents = processRoot.elements("EndEvent");
		//开始节点
		Element bpmnStartEvent = bpmnProcess.addElement("startEvent");
		bpmnStartEvent.addAttribute("id", processStartEvent.attributeValue("id"));
		bpmnStartEvent.addAttribute("name", processStartEvent.elementText("label"));
		//结束节点
		for(Element processEndEvent : processEndEvents){
			Element bpmnEndEvent = bpmnProcess.addElement("endEvent");
			bpmnEndEvent.addAttribute("id",processEndEvent.attributeValue("id"));
			bpmnEndEvent.addAttribute("name", processEndEvent.elementText("label"));
		}
	}
	
	/**
	 * 处理用户任务节点
	 */
	private static void transformUserTask(Element processRoot, Element bpmnProcess){
		//处理用户任务节点
		List<Element> taskEvents = processRoot.elements("Task");
		for(Element taskEvent : taskEvents){
			Element userTask = bpmnProcess.addElement("userTask");
			userTask.addAttribute("id", taskEvent.attributeValue("id"));
			userTask.addAttribute("name", taskEvent.elementText("label"));
		}
	}
	
	/**
	 * 处理连接流程
	 */
	private static void transformFlow(Element processRoot, Element bpmnProcess){
		//处理连接流程
		//获取所有的点以方便使用
		Map<String, String> portsMap = new HashMap<String, String>();
		List<Element> processEles = processRoot.elements();
		for(Element ele : processEles){
			if(ele.element("ports") == null)
				continue ; 
			List<Element> ports = ele.element("ports").elements("Port");
			for(Element port : ports){
				portsMap.put(port.attributeValue("id"), ele.attributeValue("id"));
				System.out.println(port.attributeValue("id")+"="+ele.attributeValue("id"));
			}
		}
		List<Element> processFlows = processRoot.elements("SequenceFlow");
		for(Element processFlow:processFlows){
			String startPort = processFlow.attributeValue("startPort");
			String endPort = processFlow.attributeValue("endPort");
			Element sequenceFlow = bpmnProcess.addElement("sequenceFlow");
			sequenceFlow.addAttribute("sourceRef", portsMap.get(startPort));
			sequenceFlow.addAttribute("targetRef", portsMap.get(endPort));
		}
	}
}
