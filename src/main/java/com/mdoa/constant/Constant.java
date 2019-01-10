package com.mdoa.constant;

import java.io.InputStream;
import java.util.Properties;

/**
 * 系统常量信息表
 */
public class Constant {
	
	static{  
        Properties prop = new Properties();      
        InputStream in;
		try {
			in =  FileConstant.class.getClassLoader().getResourceAsStream("config.properties");
            prop.load(in);  
            ADMIN_PASSWORD = prop.getProperty("AdminPassword").trim();  
            ADMIN_ACCOUNT = prop.getProperty("AdminAccount").trim();  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
    }  
	public static final String WEBSOCKET = "admin/config/WEBSOCKET.txt";	//WEBSOCKET配置路径
	/**
	 * 超级管理员账户密码
	 */
	public static String ADMIN_PASSWORD;
	/**
	 * 超级管理员账户帐户名
	 */
	public static String ADMIN_ACCOUNT;
	
	/**
	 * 服务器异常码
	 */
	public static String SERVER_ERROR_CODE = "500";
	
	/**
	 * 数据异常码
	 */
	public static String DATA_ERROR_CODE = "400";
	
	/**
	 * 成功码
	 */
	public static String SUCCESS_CODE = "200";
	
	/**
	 * 外出信息的url
	 */
	public static String GO_OUT = "personnel/attendanceManage/goout";

	public static String GO_OUT_EXAMINE = "personnel/attendanceManage/gooutExamine";
	
	public static String GO_OUT_RECORD = "personnel/attendanceManage/gooutRecord";
	
	/**
	 * 请假信息的url
	 */
	public static String LEAVE = "personnel/attendanceManage/leave";
	
	public static String LEAVE_EXAMINE = "personnel/attendanceManage/leaveExamine";
	
	public static String LEAVE_RECORD= "personnel/attendanceManage/leaveRecord";
	
	/**
	 * 培训信息的url
	 */
	public static String TRAIN = "personnel/trainManage/train";
	
	public static String TRAIN_FLOW = "personnel/trainManage/trainflow";
	
	public static String TRAIN_RECORD = "personnel/trainManage/trainRecord";
	
	/**
	 * 福利申请的url
	 */
	public static String WELFARE_EXAMINE = "personnel/socialSecurity/welfareExamine";
	
	public static String WELFARE_RECORD = "personnel/socialSecurity/welfarerecord";
	
	
}	
