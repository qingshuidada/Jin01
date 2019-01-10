package com.mdoa.constant;

import java.io.InputStream;
import java.util.Properties;

public class FileConstant {
	
	static{  
        Properties prop =  new  Properties();      
        InputStream in;
		try {
			in =  FileConstant.class.getClassLoader().getResourceAsStream("config.properties");
            prop.load(in);  
            FILE_PATH = prop.getProperty("FilePath").trim();  
            ENTERPRISE_PACK = prop.getProperty("EnterprisePack").trim();
            PERSONNEL_PACK = prop.getProperty("PersonnelPack").trim(); 
            PROCESS_PACK = prop.getProperty("processPack").trim(); 
            USER_IDCARD = prop.getProperty("UserIdcard").trim(); 
            SHORT_TIME_EXCEL = prop.getProperty("ShortTimeExcel").trim();
            BPMN20_XML = prop.getProperty("BPMN20.XML").trim();
            WEIXIN_URL = prop.getProperty("WeixinUrl").trim();
            WEIXIN_TOKEN = prop.getProperty("WeixinToken").trim();
            WEIXIN_APPID = prop.getProperty("WeixinAppid").trim();
            WEIXIN_SECRET = prop.getProperty("WeixinSecret").trim();
            QYWX_URL = prop.getProperty("QywxUrl").trim();
            BOSS_PASSWORD = prop.getProperty("BossPassword").trim();
            SALARY_PASSWORD = prop.getProperty("SalaryPassword").trim();
            
            S_CORP_ID = prop.getProperty("sCorpId").trim();
            
            WX_CLOCK_AGENT_ID = prop.getProperty("wxClockAgentId").trim();
            WX_CLOCK_SECRECT = prop.getProperty("wxClockSecrect").trim();
            WX_CLOCK_TOKEN = prop.getProperty("wxClockToken").trim();
            WX_CLOCK_ENCODING_KEY = prop.getProperty("wxClockEncodingKey").trim();
            
            WX_REPORT_AGENT_ID = prop.getProperty("wxReportAgentId").trim();
            WX_REPORT_SECRECT = prop.getProperty("wxReportSecrect").trim();
            WX_REPORT_TOKEN = prop.getProperty("wxReportToken").trim();
            WX_REPORT_ENCODING_KEY = prop.getProperty("wxReportEncodingKey").trim();
            
            WX_ERP_AGENT_ID = prop.getProperty("wxErpAgentId").trim();
            WX_ERP_SECRECT = prop.getProperty("wxErpSecrect").trim();
            WX_ERP_TOKEN = prop.getProperty("wxErpToken").trim();
            WX_ERP_ENCODING_KEY = prop.getProperty("wxErpEncodingKey").trim();
        } catch (Exception e) {
            e.printStackTrace(); 
        }  
          
    }  
	
	/**
	 * 工资管理系统口令
	 */
	public static String SALARY_PASSWORD;
	
	/**
	 * 全部文件的基础存储路径
	 */
	public static String FILE_PATH;
	/**
	 * 协同办公 存储文件夹名
	 */
	public static String ENTERPRISE_PACK;
	/**
	 * 微信地址URL
	 */
	public static String WEIXIN_URL;
	public static String WEIXIN_TOKEN;
	public static String WEIXIN_APPID;
	public static String WEIXIN_SECRET;
	
	/**
	 * 企业微信URL
	 */
	public static String QYWX_URL;
	
	/**
	 * 企业微信号id
	 */
	public static String S_CORP_ID;
	
	/**
	 * 企业微信号微信考勤应用token
	 */
	public static String WX_CLOCK_TOKEN;
	
	/**
	 * 企业微信号微信考勤应用encoding key
	 */
	public static String WX_CLOCK_ENCODING_KEY;
	
	/**
	 * 企业微信号微信考勤应用agent id
	 */
	public static String WX_CLOCK_AGENT_ID;
	
	/**
	 * 企业微信号微信考勤应用secrect
	 */
	public static String WX_CLOCK_SECRECT;
	/**
	 * 企业微信号生产报表应用token
	 */
	public static String WX_REPORT_TOKEN;
	
	/**
	 * 企业微信号生产报表应用encoding key
	 */
	public static String WX_REPORT_ENCODING_KEY;
	
	/**
	 * 企业微信号生产报表应用agent id
	 */
	public static String WX_REPORT_AGENT_ID;
	
	/**
	 * 企业微信号生产报表应用secrect
	 */
	public static String WX_REPORT_SECRECT;
	
	/**
	 * 企业微信号erp查询应用token
	 */
	public static String WX_ERP_TOKEN;
	
	/**
	 * 企业微信号erp查询应用encoding key
	 */
	public static String WX_ERP_ENCODING_KEY;
	
	/**
	 * 企业微信号erp查询应用agent id
	 */
	public static String WX_ERP_AGENT_ID;
	
	/**
	 * 企业微信号erp查询应用secrect
	 */
	public static String WX_ERP_SECRECT;
	
	/**
	 * 生产报表查询密码
	 */
	public static String BOSS_PASSWORD;
	
	/**
	 * 
	 * 流程附件 存储文件夹名
	 */
	public static String PROCESS_PACK;
	/**
	 * 人事合同 扫描件 存储文件夹名
	 */
	public static String PERSONNEL_PACK;
	/**
	 * 身份证 正反面图片 存储文件夹名
	 */
	public static String USER_IDCARD;
	/**
	 * 临时导出的excale文件的文件夹
	 */
	public static String SHORT_TIME_EXCEL;
	/**
	 * 生成的bpmn20.xml保存地址
	 */
	public static String BPMN20_XML;
}