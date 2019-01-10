package com.mdoa.phone.controller;

import java.net.URLEncoder;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.model.JsonReturnObject;
import com.mdoa.qywx.bo.QywxForm;
import com.mdoa.qywx.bo.SendText;
import com.mdoa.qywx.bo.SendTextMessage;
import com.mdoa.qywx.service.QywxService;
import com.mdoa.qywx.util.HttpXmlClient;
import com.mdoa.system.bo.UrgeProcessForm;
import com.mdoa.system.service.MessageService;
import com.mdoa.util.QywxAppUtil;
import com.mdoa.util.StringUtil;

/**
 * 催办消息
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/phUrgeMessage")
public class PhUrgeMessageController {

	@Autowired
	private MessageService messageService;
	
	@Autowired
	private QywxService qywxService;
	
	String wxClockAgentId = "1000004";
	String wxClockAccessToken;
	String sToken = "centojs";
	String sCorpID = "wx6e789c8f1675ef78";
	String wxClockSecrect = "siWf-scUx0b35nMPQWBHW_vlx3Zvwht95VyVhqJoXN4";
	
	
	@RequestMapping("/urgeProcess.ph")
	public String urgeProcess(HttpServletRequest request,HttpServletResponse response,UrgeProcessForm urgeProcessForm){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			messageService.insertUrgeProcessMessage(urgeProcessForm);
			sendTextMessageToUser(urgeProcessForm);
			jro.setSuccess(true);
		} catch (Exception e) {
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}
	
	/**
	 * 通过微信企业号发送消息给某位企业用户
	 * @param request
	 * @param response
	 * @param urgeProcessForm
	 */
	public void sendTextMessageToUser(UrgeProcessForm urgeProcessForm) throws Exception{
		List<QywxForm> qywxForms = qywxService.getQywxUserId(urgeProcessForm.getUserId());
		if(qywxForms != null && qywxForms.size() > 0){
			SendTextMessage sendTextMessage = new SendTextMessage();
			QywxForm qywxForm = qywxForms.get(0);
			sendTextMessage.setTouser(qywxForm.getQywxUserId());
			sendTextMessage.setMsgtype("text");
			sendTextMessage.setAgentid(wxClockAgentId);
			SendText sendText = new SendText();
			sendText.setContent(urgeProcessForm.getMessage());
			sendTextMessage.setText(sendText);
			Gson gson = new Gson();
			if(StringUtil.isEmpty(wxClockAccessToken)){	
				wxClockAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxClockSecrect);
			}
			JSONObject result = HttpXmlClient.httpPostWithJsonStr("https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token="
						+ wxClockAccessToken , gson.toJson(sendTextMessage));
			System.out.println("发送催办消息给审核人:" + result.toString());
		}
	}
}
