package com.mdoa.util;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.UUID;

import com.mdoa.constant.FileConstant;
import com.zhou.myProcess.instance.ProcessModel;
import com.zhou.myProcess.instance.TaskModel;
import com.mdoa.qywx.bo.QywxForm;
import com.mdoa.qywx.bo.SendText;
import com.mdoa.qywx.bo.SendTextMessage;
import com.mdoa.qywx.util.HttpXmlClient;

import net.sf.json.JSONObject;

public class QywxAppUtil {
	
	public static String getReturnUrlWithUserInfo(String interfaceName , String userInfo){
		return "/qywx/" + interfaceName + "?userInfo=" + userInfo;
	}
	
	public static String getReturnUrlWithUserId(String interfaceName , String userId){
		return "/qywx/" + interfaceName + "?userId=" + userId;
	}
	
	/**
	 * 获取access_token
	 * @param corpId 企业号id
	 * @param corpSecrect 应用秘钥
	 * @return
	 */
	public static String getAccessToken(String corpId , String corpSecrect){
        String xml = HttpXmlClient.get("https://qyapi.weixin.qq.com/cgi-bin/gettoken?"
				+ "corpid=" + corpId
				+ "&corpsecret=" + corpSecrect);
        JSONObject jsonMap  = JSONObject.fromObject(xml);
        Map<String, String> map = new HashMap<String, String>();
        Iterator<String> it = jsonMap.keys();  
        while(it.hasNext()) {  
            String key = (String) it.next();  
            String value = jsonMap.get(key).toString();
            map.put(key, value);  
        }
        String accessToken = map.get("access_token");
        System.out.println("access_token=" + accessToken);
        return accessToken;
	}
	
	/**
	 * 获取ticket
	 * @param accessToken
	 * @return
	 */
	public static String getTicket(String accessToken){
		Map<String, String> params = new HashMap<String, String>();
        params.put("access_token",accessToken);
        String xml = HttpXmlClient.post("https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket",params); 
        JSONObject jsonMap  = JSONObject.fromObject(xml);
        Map<String, String> map = new HashMap<String, String>();
        Iterator<String> it = jsonMap.keys();  
        while(it.hasNext()) {  
            String key = (String) it.next();  
            String value = jsonMap.get(key).toString();
            map.put(key, value);  
        }
        String jsapiTicket = map.get("ticket");
        System.out.println("jsapi_ticket=" + jsapiTicket);
        return jsapiTicket;
	}
	
	public String getSignature(String jsapiTicket){
		String noncestr = getNonceStr();
        String timestamp = getTimeStamp();
        String url="http://mp.weixin.qq.com";
        String str = "jsapi_ticket=" + jsapiTicket +
                "&noncestr=" + noncestr +
                "&timestamp=" + timestamp +
                "&url=" + url;
        //SHA1加密
        String signature = StringUtil.SHA1(str);
        return signature;
	}
	
	public static String getTimeStamp(){
		return Long.toString(System.currentTimeMillis() / 1000);
	}
	
	public static String getNonceStr(){
		return UUID.randomUUID().toString();
	}
	
	public void sendTextMessage(SendTextMessage sendTextMessage){
		String url = "http://" + FileConstant.QYWX_URL + "/mdoa/qywx/sendTextMessage.qywx?" + sendTextMessage.getRequestBody();
		System.out.println(url);
		HttpXmlClient.get(url);
	}
	
	/**
	 * 得到发送消息的content
	 * @param qywxForm
	 * @param process
	 * @return
	 */
	public static SendText getSendMessageContent(QywxForm qywxForm, ProcessModel process,String typeId){
		SendText sendText = new SendText();
		String content = "";
		String userName =  qywxForm.getUserName();
		String sex = "";
		String type = "";
		String result = "";
		if("1".equals(qywxForm.getSex())){
			sex = "先生";
		}else {
			sex = "女士";
		}
		type = StringUtil.getProcessType(typeId);
		if("2".equals(process.getExecuteStatus())){
			result = "已被审核通过，请留意！";
		}else if("3".equals(process.getExecuteStatus())){
			result = "已被驳回，请留意！";
		}
		content = userName + sex + "，您的" + type + result;
		
		sendText.setContent(content);
		return sendText;
	}
	
	/**
	 * 得到移交给下一个审核人或抄送人的content
	 * @param user
	 * @param executor
	 * @param taskModel
	 * @param typeId
	 * @return
	 */
	public static SendText getSendMessageContent(QywxForm user, QywxForm executor, TaskModel taskModel, String typeId) {
		SendText sendText = new SendText();
		String content = "";
		String userName =  user.getUserName();
		String userSex = "";
		String executorName = executor.getUserName();
		String executorSex = "";
		String processType = "";
		String taskType = "";
		if("1".equals(user.getSex())){
			userSex = "先生";
		}else {
			userSex = "女士";
		}
		if("1".equals(executor.getSex())){
			executorSex = "先生";
		}else {
			executorSex = "女士";
		}
		processType = StringUtil.getProcessType(typeId);
		if("1".equals(taskModel.getTaskType())){
			taskType = "需要您审核,请留意！";
		}else {
			taskType = "已被审核通过，抄送您过目！";
		}
		content = executorName + executorSex + "，您有一条" + userName + userSex + "发起的" + processType + taskType;
		sendText.setContent(content);
		return sendText;
	}

	public static String getResultErrcode(String result) {
		org.json.JSONObject jsonObject = new org.json.JSONObject(result);
		String errcode = "";
		errcode = jsonObject.optString("errcode");
		return errcode;
	}
	
	public static String getResultErrcode(org.json.JSONObject jsonObject) {
		String errcode = "";
		errcode = jsonObject.optString("errcode");
		return errcode;
	}
	/**
	 * 得到任务发起人发给执行人的信息
	 * @param name
	 * @param flag
	 * @return SendText
	 */
	public static SendText getSendMessageContent(String name,String flag){
		SendText sendText = new SendText();
		if(flag.equals("1")){
			String content = "您有一条" + name + "发起的任务可以查看！";
			sendText.setContent(content);
		}else if (flag.equals("2")) {
			String content = "您有一条" + name + "发起的任务需要你执行！";
			sendText.setContent(content);
		}
		return sendText;	
	}
	
	/**
	 * 得到任务发起人发给执行人的信息
	 * @param name
	 * @param flag
	 * @return SendText
	 */
	public static SendText getSendMessageContent(String flag){
		SendText sendText = new SendText();
		if(flag.equals("100")){
			String content = "您有一条任务,负责人已确认完成,需要您审批,请到任务管理中查看!";
			sendText.setContent(content);
		}else if (flag.equals("3")) {
			String content = "您有一条任务,发起人已审批驳回,请到任务管理中查看!";
			sendText.setContent(content);
		}else if (flag.equals("4")) {
			String content = "您有一条任务,发起人已审批通过,请到任务管理中查看!";
			sendText.setContent(content);
		}
		return sendText;	
	}
	
	
}
