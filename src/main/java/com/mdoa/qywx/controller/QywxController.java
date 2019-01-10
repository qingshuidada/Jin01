package com.mdoa.qywx.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.enterprise.inject.New;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.mdoa.base.model.JsonReturnObject;
import com.mdoa.constant.FileConstant;
import com.mdoa.filter.LoginErpFilter;
import com.mdoa.qywx.bo.ClickEventMessage;
import com.mdoa.qywx.bo.Menu;
import com.mdoa.qywx.bo.MenuButton;
import com.mdoa.qywx.bo.QywxForm;
import com.mdoa.qywx.bo.SendText;
import com.mdoa.qywx.bo.SendTextMessage;
import com.mdoa.qywx.service.QywxService;
import com.mdoa.qywx.util.AesException;
import com.mdoa.qywx.util.HttpXmlClient;
import com.mdoa.qywx.util.WXBizMsgCrypt;
import com.mdoa.system.bo.UrgeProcessForm;
import com.mdoa.util.QywxAppUtil;
import com.mdoa.util.StringUtil;
import com.mdoa.weixin.util.MessageUtil;

import com.zhou.myProcess.instance.*;
import com.zhou.myProcess.util.SendMessage;

@Controller
@RequestMapping("/qywx")
public class QywxController implements SendMessage {

	@Autowired
	private QywxService qywxService;

	private String sCorpID = FileConstant.S_CORP_ID;

	private String wxClockAgentId = FileConstant.WX_CLOCK_AGENT_ID;
	private String wxClockSecrect = FileConstant.WX_CLOCK_SECRECT;
	private String wxClockToken = FileConstant.WX_CLOCK_TOKEN;
	private String wxClockEncodingKey = FileConstant.WX_CLOCK_ENCODING_KEY;
	private String wxClockAccessToken;

	/**
	 * 跳转到绑定OA账号页面
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/bindOaAccount.qywx")
	public String bindOaAccount(HttpServletRequest request, HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String code = request.getParameter("code");
		if (StringUtil.isEmpty(wxClockAccessToken)) {
			wxClockAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxClockSecrect);
		}
		String url = "https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?" + "access_token=" + wxClockAccessToken
				+ "&code=" + code;
		String userInfo = HttpXmlClient.get(url);
		if ("42001".equals(QywxAppUtil.getResultErrcode(userInfo))) {
			wxClockAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxClockSecrect);
			url = "https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?" + "access_token=" + wxClockAccessToken
					+ "&code=" + code;
			userInfo = HttpXmlClient.get(url);
		}
		;
		String returnUrl = QywxAppUtil.getReturnUrlWithUserInfo("bindOaAccountPager.qywx", userInfo);
		return returnUrl;
	}

	/**
	 * 绑定OA账号页面
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/bindOaAccountPager.qywx")
	public void bindingOaAccount(HttpServletRequest request, HttpServletResponse response, String userInfo)
			throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		JSONObject jsonObject = new JSONObject(userInfo);
		String userId = jsonObject.optString("UserId");
		response.sendRedirect("../html/qywx/bindOaAccount.html?userId=" + userId);
	}

	/**
	 * 绑定OA账号
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/bindingOaAccount.qywx")
	public String bindingOaAccount(HttpServletRequest request, QywxForm qywxForm) throws Exception {
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			qywxService.bindOaAccount(qywxForm);
			jro.setSuccess(true);
		} catch (RuntimeException e) {
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		} catch (Exception e) {
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		String jsonString = gson.toJson(jro);
		return jsonString;
	}

	/**
	 * 登陆请求
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws UnsupportedEncodingException
	 * @throws Exception
	 */
	@RequestMapping("/loginOaAccount.qywx")
	public String loginOaAccount(HttpServletRequest request, HttpServletResponse response)
			throws UnsupportedEncodingException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String code = request.getParameter("code");

		System.out.println("code:" + code);
		if (StringUtil.isEmpty(wxClockAccessToken)) {
			wxClockAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxClockSecrect);
		}
		String url = "https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?" + "access_token=" + wxClockAccessToken
				+ "&code=" + code;
		String userInfo = HttpXmlClient.get(url);
		if ("42001".equals(QywxAppUtil.getResultErrcode(userInfo))) {
			wxClockAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxClockSecrect);
			url = "https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?" + "access_token=" + wxClockAccessToken
					+ "&code=" + code;
			userInfo = HttpXmlClient.get(url);
		}
		;
		JSONObject jsonObject = new JSONObject(userInfo);
		String userId = jsonObject.optString("UserId");
		String returnUrl = "";
		if (qywxService.checkBind(userId)) {
			returnUrl = QywxAppUtil.getReturnUrlWithUserId("loginOa.qywx", userId);
		} else {
			returnUrl = QywxAppUtil.getReturnUrlWithUserInfo("plzBindOaPager.qywx", userInfo);
		}
		return returnUrl;
	}

	/**
	 * 跳转登陆页面 并自动登陆
	 * 
	 * @param request
	 * @param response
	 * @param userId
	 * @throws Exception
	 */
	@RequestMapping("/loginOa.qywx")
	public void loginOa(HttpServletRequest request, HttpServletResponse response, String userId) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		System.out.println(userId);
		response.sendRedirect("../html/qywx/loginOaAccount.html?userId=" + userId);
	}

	/**
	 * 通过qywxUserId获取账号密码
	 * 
	 * @param request
	 * @param qywxUserId
	 * @return
	 */
	@RequestMapping("/getAccount.qywx")
	@ResponseBody
	public String getAccount(HttpServletRequest request, String qywxUserId) {
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			QywxForm qywxForm = qywxService.getAccount(request, qywxUserId);
			jro.setSuccess(true);
			jro.setReturnObj(qywxForm);
		} catch (Exception e) {
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		return gson.toJson(jro);
	}

	/**
	 * 在未绑定账号时，点击登录，跳转至绑定账号界面
	 * 
	 * @param request
	 * @param response
	 * @param userInfo
	 * @throws Exception
	 */
	@RequestMapping("/plzBindOaPager.qywx")
	public void plzBindOaPager(HttpServletRequest request, HttpServletResponse response, String userInfo)
			throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		JSONObject jsonObject = new JSONObject(userInfo);
		String userId = "";
		userId = jsonObject.optString("UserId");
		response.sendRedirect("../html/qywx/plzBindOaAccount.html?userId=" + userId);
	}
    
    /**
     * 创建微信考勤菜单
     */
    @RequestMapping("/createClockMenu.qywx")
    public void createClockMenu() {
	Menu menu = new Menu();
	List<MenuButton> buttons = new ArrayList<>();
	// 创建一级菜单
	MenuButton accountManager = new MenuButton();
	accountManager.setName("账号管理");

	// 创建二级子菜单
	MenuButton oaAccountBinder = new MenuButton();
	oaAccountBinder.setType("view");
	oaAccountBinder.setName("OA账号绑定");
	String url = "https://open.weixin.qq.com/connect/oauth2/authorize?" + "appid=" + sCorpID + "&redirect_uri="
		+ "http://" + FileConstant.QYWX_URL + "/mdoa/qywx/bindOaAccount.qywx" + "&response_type=code"
		+ "&scope=" + "snsapi_privateinfo" + "&agentid=" + wxClockAgentId + "&state=cento1994#wechat_redirect";
	oaAccountBinder.setUrl(url);
	MenuButton oaAccountUnBinder = new MenuButton();
	oaAccountUnBinder.setType("click");
	oaAccountUnBinder.setName("解除绑定");
	oaAccountUnBinder.setKey("unBindOaAccount");

	// 将二级菜单设置进一级菜单的子菜单
	List<MenuButton> accountManagerSubs = new ArrayList<>();
	accountManagerSubs.add(oaAccountBinder);
	accountManagerSubs.add(oaAccountUnBinder);
	accountManager.setSub_button(accountManagerSubs);

	// 创建一级菜单
	MenuButton oaAccountLogin = new MenuButton();
	oaAccountLogin.setType("view");
	oaAccountLogin.setName("OA系统登录");
	url = "https://open.weixin.qq.com/connect/oauth2/authorize?" + "appid=" + sCorpID + "&redirect_uri=" + "http://"
		+ FileConstant.QYWX_URL + "/mdoa/qywx/loginOaAccount.qywx" + "&response_type=code" + "&scope="
		+ "snsapi_privateinfo" + "&agentid=" + wxClockAgentId + "&state=cento1994#wechat_redirect";
	oaAccountLogin.setUrl(url);

	buttons.add(accountManager);
	buttons.add(oaAccountLogin);

	// 将一级菜单设置进菜单中并转成jsonString
	menu.setButton(buttons);
	Gson gson = new Gson();
	String button = gson.toJson(menu);
	System.out.println(button);

	if (StringUtil.isEmpty(wxClockAccessToken)) {
	    wxClockAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxClockSecrect);
	}
	JSONObject jsonObject = HttpXmlClient
		.httpPostWithJsonStr("https://qyapi.weixin.qq.com/cgi-bin/menu/create?access_token="
			+ wxClockAccessToken + "&agentid=" + wxClockAgentId, button);
	if ("42001".equals(QywxAppUtil.getResultErrcode(jsonObject))) {
	    wxClockAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxClockSecrect);
	    jsonObject = HttpXmlClient
		    .httpPostWithJsonStr("https://qyapi.weixin.qq.com/cgi-bin/menu/create?access_token="
			    + wxClockAccessToken + "&agentid=" + wxClockAgentId, button);
	}
	;
	System.out.println(jsonObject.toString());
    }

	/**
	 * 删除菜单
	 */
	@RequestMapping("/deleteClockMenu.qywx")
	public void deleteMenu() {
		if (StringUtil.isEmpty(wxClockAccessToken)) {
			wxClockAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxClockSecrect);
		}
		String result = HttpXmlClient.get("https://qyapi.weixin.qq.com/cgi-bin/menu/delete?" + "access_token="
				+ wxClockAccessToken + "&agentid=" + wxClockAgentId);
		if ("42001".equals(QywxAppUtil.getResultErrcode(result))) {
			wxClockAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxClockSecrect);
			result = HttpXmlClient.get("https://qyapi.weixin.qq.com/cgi-bin/menu/delete?" + "access_token="
					+ wxClockAccessToken + "&agentid=" + wxClockAgentId);
		}
		;
		System.out.println("result:" + result);
	}

	/**
	 * 获取菜单
	 */
	@RequestMapping("/getClockMenu.qywx")
	public void getMenu() {
		if (StringUtil.isEmpty(wxClockAccessToken)) {
			wxClockAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxClockSecrect);
		}
		String result = HttpXmlClient.get("https://qyapi.weixin.qq.com/cgi-bin/menu/get?" + "access_token="
				+ wxClockAccessToken + "&agentid=" + wxClockAgentId);
		System.out.println("result:" + result);
	}

	/**
	 * 验证连接
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping("/wxClockCheck.qywx")
	public void wxClockCheck(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String signature = request.getParameter("msg_signature");
		String timeStamp = request.getParameter("timestamp");
		String nonce = request.getParameter("nonce");
		String echoStr = request.getParameter("echostr");
		System.out.println(
				"signature:" + signature + "\ntimestamp:" + timeStamp + "\nnonce:" + nonce + "\nechostr:" + echoStr);
		// 验证服务器的有效性
		String sEchoStr;// 需要返回的明文
		PrintWriter out = response.getWriter();
		try {
			WXBizMsgCrypt wxcpt = new WXBizMsgCrypt(wxClockToken, wxClockEncodingKey, sCorpID);
			sEchoStr = wxcpt.VerifyURL(signature, timeStamp, nonce, echoStr);
			System.out.println("verifyurl echostr:" + sEchoStr);
			// 验证URL成功，将sEchoStr返回
			out.println(sEchoStr);
		} catch (AesException e) {
			e.printStackTrace();
		} catch (NullPointerException e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				out.close();
			}
			out = null;
		}
	}

	/**
	 * 消息转发
	 */
	@RequestMapping("/sendTextMessage.qywx")
	public void sendTextMessage(HttpServletRequest request, HttpServletResponse response,
			SendTextMessage sendTextMessage) throws Exception {
		System.out.println("--------------:" + sendTextMessage);
	}

	/**
	 * 点击事件监听
	 * 
	 * @throws Exception
	 */
	@RequestMapping("/clickListener.qywx")
	public void messageCenter(HttpServletRequest request, HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");

		// 获取密文并解密
		WXBizMsgCrypt wxcpt = new WXBizMsgCrypt(wxClockToken, wxClockEncodingKey, sCorpID);
		Map<String, String> map = MessageUtil.xmlToMap(request);
		String encrypt = map.get("Encrypt");
		String decrpy = wxcpt.decrypt(encrypt);
		System.out.println("明文:" + decrpy);
		map = MessageUtil.xmlToMap(decrpy);

		// 事件推送消息
		if ("event".equals(map.get("MsgType"))) {
			// 点击事件推送
			if ("click".equals(map.get("Event"))) {
				// 获取点击事件推送消息类对象
				ClickEventMessage clickEventMessage = qywxService.getMessageFromMap(map);
				// 微信回复消息的输出流
				PrintWriter out = null;
				try {
					out = response.getWriter();
					if ("unBindOaAccount".equals(map.get("EventKey"))) {
						// 解除绑定点击事件推送
						String decrpt = qywxService.unBindOaAccount(clickEventMessage);
						String encrpt = wxcpt.EncryptMsg(decrpt, QywxAppUtil.getTimeStamp(), QywxAppUtil.getNonceStr());
						out.println(encrpt);
					}
				} catch (IOException e) {
					e.printStackTrace();
				} finally {
					if (out != null) {
						out.close();
					}
				}
			}
		}

	}

	/**
	 * 流程完成后发送消息给发起人
	 */
	@Override
	public void sendEndMessage(ProcessModel process, List<TaskModel> copyToTasks) {
		/*List<QywxForm> qywxForms = qywxService.getQywxUserId(process.getUserId());
		if (qywxForms != null && qywxForms.size() > 0) {
			// 创建消息
			SendTextMessage sendTextMessage = new SendTextMessage();
			QywxForm qywxForm = qywxForms.get(0);
			JSONObject jsonObject = new JSONObject(process.getJsonData());
			String typeId = "";
			try {
				typeId = jsonObject.optString("typeId");
			} catch (Exception e) {
			}
			SendText sendText = QywxAppUtil.getSendMessageContent(qywxForm, process, typeId);
			sendTextMessage.setTouser(qywxForm.getQywxUserId());
			sendTextMessage.setMsgtype("text");
			sendTextMessage.setAgentid(wxClockAgentId);
			sendTextMessage.setText(sendText);

			try {
				Gson gson = new Gson();
				if (StringUtil.isEmpty(wxClockAccessToken)) {
					wxClockAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxClockSecrect);
				}
				JSONObject result = HttpXmlClient.httpPostWithJsonStr(
						"https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=" + wxClockAccessToken,
						gson.toJson(sendTextMessage));
				if ("42001".equals(QywxAppUtil.getResultErrcode(result))) {
					wxClockAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxClockSecrect);
					result = HttpXmlClient.httpPostWithJsonStr(
							"https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=" + wxClockAccessToken,
							gson.toJson(sendTextMessage));
				}
				;
				System.out.println("发送消息给发送人" + result.toString());
				// 发送消息给抄送人 查询抄送人
				if ("2".equals(process.getExecuteStatus()) && copyToTasks != null) {// 流程通过时查询抄送人信息
					for (TaskModel copyToTask : copyToTasks) {
						List<QywxForm> executors = qywxService.getQywxUserId(copyToTask.getExecutorId());
						if (executors != null && executors.size() > 0) {
							sendText.setContent(
									"收到：" + process.getUserName() + "的" + process.getProcessTypeName() + "的抄送");
							sendTextMessage.setTouser(executors.get(0).getQywxUserId());
							sendTextMessage.setMsgtype("text");
							sendTextMessage.setAgentid(wxClockAgentId);
							sendTextMessage.setText(sendText);
							result = HttpXmlClient.httpPostWithJsonStr(
									"https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token="
											+ wxClockAccessToken,
									gson.toJson(sendTextMessage));
							if ("42001".equals(QywxAppUtil.getResultErrcode(result))) {
								wxClockAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxClockSecrect);
								result = HttpXmlClient.httpPostWithJsonStr(
										"https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token="
												+ wxClockAccessToken,
										gson.toJson(sendTextMessage));
							}
							;
							System.out.println("发送消息给抄送人" + result.toString());
						}
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
				System.out.println("发送消息失败");
			}

		}*/
	}

	/**
	 * 发送消息给下一个审核人
	 */
	@Override
	public void sendNextMessage(ProcessModel process, TaskModel taskModel) {
		/*List<QywxForm> users = qywxService.getQywxUserId(process.getUserId());
		TaskModel taskModel2 = null;
		if (StringUtil.isEmpty(taskModel.getExecutorId())) {
			taskModel2 = qywxService.getFirstTask(taskModel.getTaskId());
		} else {
			taskModel2 = taskModel;
		}
		List<QywxForm> executors = qywxService.getQywxUserId(taskModel2.getExecutorId());

		if (users != null && users.size() > 0) {
			// 创建消息
			SendTextMessage sendTextMessage = new SendTextMessage();
			QywxForm user = users.get(0);
			QywxForm executor = executors.get(0);

			JSONObject jsonObject = new JSONObject(process.getJsonData());
			String typeId = "";
			try {
				typeId = jsonObject.getString("typeId");
			} catch (Exception e) {
			}
			SendText sendText = QywxAppUtil.getSendMessageContent(user, executor, taskModel2, typeId);
			sendTextMessage.setTouser(executor.getQywxUserId());
			sendTextMessage.setMsgtype("text");
			sendTextMessage.setAgentid(wxClockAgentId);
			sendTextMessage.setText(sendText);
			JSONObject result;
			try {
				Gson gson = new Gson();
				if (StringUtil.isEmpty(wxClockAccessToken)) {
					wxClockAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxClockSecrect);
				}
				result = HttpXmlClient.httpPostWithJsonStr(
						"https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=" + wxClockAccessToken,
						gson.toJson(sendTextMessage));
				if ("42001".equals(QywxAppUtil.getResultErrcode(result))) {
					wxClockAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxClockSecrect);
					result = HttpXmlClient.httpPostWithJsonStr(
							"https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=" + wxClockAccessToken,
							gson.toJson(sendTextMessage));
				}
				;
				System.out.println("发送给下一位审核人:" + result.toString());
			} catch (Exception e) {
				e.printStackTrace();
				System.out.println("发送消息失败");
			}
		}*/
	}

	/**
	 * 通过微信企业号发送消息给某位企业用户
	 * 
	 * @param request
	 * @param response
	 * @param urgeProcessForm
	 */
	@RequestMapping("/sendTextMessageToUser.qywx")
	public void sendTextMessageToUser(HttpServletRequest request, HttpServletResponse response,
			UrgeProcessForm urgeProcessForm) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		System.out.println("-----------------------------------------" + urgeProcessForm.getMessage());
		List<QywxForm> qywxForms = qywxService.getQywxUserId(urgeProcessForm.getUserId());
		if (qywxForms != null && qywxForms.size() > 0) {
			SendTextMessage sendTextMessage = new SendTextMessage();
			QywxForm qywxForm = qywxForms.get(0);
			sendTextMessage.setTouser(qywxForm.getQywxUserId());
			sendTextMessage.setMsgtype("text");
			sendTextMessage.setAgentid(wxClockAgentId);
			SendText sendText = new SendText();
			sendText.setContent(urgeProcessForm.getMessage());
			sendTextMessage.setText(sendText);
			try {
				Gson gson = new Gson();
				if (StringUtil.isEmpty(wxClockAccessToken)) {
					wxClockAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxClockSecrect);
				}
				JSONObject result = HttpXmlClient.httpPostWithJsonStr(
						"https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=" + wxClockAccessToken,
						gson.toJson(sendTextMessage));
				if ("42001".equals(QywxAppUtil.getResultErrcode(result))) {
					wxClockAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxClockSecrect);
					result = HttpXmlClient.httpPostWithJsonStr(
							"https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=" + wxClockAccessToken,
							gson.toJson(sendTextMessage));
				}
				;
				System.out.println("发送催办消息给审核人:" + result.toString());
			} catch (Exception e) {
				e.printStackTrace();
				System.out.println("发送消息失败");
			}
		}
	}

	/* 企业微信报表 */

	private String wxReportAgentId = FileConstant.WX_REPORT_AGENT_ID;
	private String wxReportSecrect = FileConstant.WX_REPORT_SECRECT;
	private String wxReportToken = FileConstant.WX_REPORT_TOKEN;
	private String wxReportEncodingKey = FileConstant.WX_REPORT_ENCODING_KEY;

	private String wxReportAccessToken;

	/**
	 * 验证连接
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping("/wxReportCheck.qywx")
	public void wxReportCheck(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String signature = request.getParameter("msg_signature");
		String timeStamp = request.getParameter("timestamp");
		String nonce = request.getParameter("nonce");
		String echoStr = request.getParameter("echostr");
		System.out.println(
				"signature:" + signature + "\ntimestamp:" + timeStamp + "\nnonce:" + nonce + "\nechostr:" + echoStr);
		// 验证服务器的有效性
		String sEchoStr;// 需要返回的明文
		PrintWriter out = response.getWriter();
		try {
			WXBizMsgCrypt wxcpt = new WXBizMsgCrypt(wxReportToken, wxReportEncodingKey, sCorpID);
			sEchoStr = wxcpt.VerifyURL(signature, timeStamp, nonce, echoStr);
			System.out.println("verifyurl echostr:" + sEchoStr);
			// 验证URL成功，将sEchoStr返回
			out.println(sEchoStr);
		} catch (AesException e) {
			e.printStackTrace();
		} catch (NullPointerException e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				out.close();
			}
			out = null;
		}
	}

	/**
	 * 创建菜单
	 */
	@RequestMapping("/createReportMenu.qywx")
	public void createReportMenu() {
		Menu menu = new Menu();
		List<MenuButton> buttons = new ArrayList<>();

		// 创建一级菜单
		MenuButton reportQuery = new MenuButton();
		reportQuery.setType("view");
		reportQuery.setName("报表查询");
		String url = "https://open.weixin.qq.com/connect/oauth2/authorize?" + "appid=" + sCorpID + "&redirect_uri="
				+ "http://" + FileConstant.QYWX_URL + "/mdoa/qywx/loginReport.qywx" + "&response_type=code" + "&scope="
				+ "snsapi_privateinfo" + "&agentid=" + wxReportAgentId + "&state=cento1994#wechat_redirect";
		reportQuery.setUrl(url);

		buttons.add(reportQuery);
		// 将一级菜单设置进菜单中并转成jsonString
		menu.setButton(buttons);
		Gson gson = new Gson();
		String button = gson.toJson(menu);
		System.out.println(button);

		if (StringUtil.isEmpty(wxReportAccessToken)) {
			wxReportAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxReportSecrect);
		}
		JSONObject jsonObject = HttpXmlClient
				.httpPostWithJsonStr("https://qyapi.weixin.qq.com/cgi-bin/menu/create?access_token="
						+ wxReportAccessToken + "&agentid=" + wxReportAgentId, button);
		if ("42001".equals(QywxAppUtil.getResultErrcode(jsonObject))) {
			wxReportAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxReportSecrect);
			jsonObject = HttpXmlClient
					.httpPostWithJsonStr("https://qyapi.weixin.qq.com/cgi-bin/menu/create?access_token="
							+ wxReportAccessToken + "&agentid=" + wxReportAgentId, button);
		}
		;
		System.out.println(jsonObject.toString());
	}

	/**
	 * 跳转到报表查询登陆页面
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/loginReport.qywx")
	public void loginReport(HttpServletRequest request, HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String code = request.getParameter("code");

		System.out.println("code:" + code);
		if (StringUtil.isEmpty(wxReportAccessToken)) {
			wxReportAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxReportSecrect);
		}
		String url = "https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?" + "access_token=" + wxReportAccessToken
				+ "&code=" + code;
		String userInfo = HttpXmlClient.get(url);
		if ("42001".equals(QywxAppUtil.getResultErrcode(userInfo))) {
			wxReportAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxReportSecrect);
			url = "https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?" + "access_token=" + wxReportAccessToken
					+ "&code=" + code;
			userInfo = HttpXmlClient.get(url);
		}
		;
		JSONObject jsonObject = new JSONObject(userInfo);
		String userId = jsonObject.optString("UserId");
		if (qywxService.checkReportAuthority(userId)) {
			response.sendRedirect("../html/qywx/qywxReport.html");
		} 
	}

	/* 企业微erp查询 */

	private String wxErpAgentId = FileConstant.WX_ERP_AGENT_ID;
	private String wxErpSecrect = FileConstant.WX_ERP_SECRECT;
	private String wxErpToken = FileConstant.WX_ERP_TOKEN;
	private String wxErpEncodingKey = FileConstant.WX_ERP_ENCODING_KEY;

	private String wxErpAccessToken;

	/**
	 * 验证连接
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping("/wxErpCheck.qywx")
	public void wxErpCheck(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String signature = request.getParameter("msg_signature");
		String timeStamp = request.getParameter("timestamp");
		String nonce = request.getParameter("nonce");
		String echoStr = request.getParameter("echostr");
		System.out.println(
				"signature:" + signature + "\ntimestamp:" + timeStamp + "\nnonce:" + nonce + "\nechostr:" + echoStr);
		// 验证服务器的有效性
		String sEchoStr;// 需要返回的明文
		PrintWriter out = response.getWriter();
		try {
			WXBizMsgCrypt wxcpt = new WXBizMsgCrypt(wxErpToken, wxErpEncodingKey, sCorpID);
			sEchoStr = wxcpt.VerifyURL(signature, timeStamp, nonce, echoStr);
			System.out.println("verifyurl echostr:" + sEchoStr);
			// 验证URL成功，将sEchoStr返回
			out.println(sEchoStr);
		} catch (AesException e) {
			e.printStackTrace();
		} catch (NullPointerException e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				out.close();
			}
			out = null;
		}
	}

	/**
	 * 创建菜单
	 */
	@RequestMapping("/createErpMenu.qywx")
	public void createErpMenu() {
		Menu menu = new Menu();
		List<MenuButton> buttons = new ArrayList<>();

		// 创建一级菜单
		MenuButton erpQuery = new MenuButton();
		erpQuery.setType("view");
		erpQuery.setName("ERP查询");
		String url = "https://open.weixin.qq.com/connect/oauth2/authorize?" + "appid=" + sCorpID + "&redirect_uri="
				+ "http://" + FileConstant.QYWX_URL + "/mdoa/qywx/loginErpAccount.qywx" + "&response_type=code"
				+ "&scope=" + "snsapi_privateinfo" + "&agentid=" + wxErpAgentId + "&state=cento1994#wechat_redirect";
		erpQuery.setUrl(url);

		buttons.add(erpQuery);
		// 将一级菜单设置进菜单中并转成jsonString
		menu.setButton(buttons);
		Gson gson = new Gson();
		String button = gson.toJson(menu);
		System.out.println(button);

		if (StringUtil.isEmpty(wxErpAccessToken)) {
			wxErpAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxErpSecrect);
		}
		JSONObject jsonObject = HttpXmlClient
				.httpPostWithJsonStr("https://qyapi.weixin.qq.com/cgi-bin/menu/create?access_token=" + wxErpAccessToken
						+ "&agentid=" + wxErpAgentId, button);
		if ("42001".equals(QywxAppUtil.getResultErrcode(jsonObject))) {
			wxErpAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxErpSecrect);
			jsonObject = HttpXmlClient
					.httpPostWithJsonStr("https://qyapi.weixin.qq.com/cgi-bin/menu/create?access_token="
							+ wxErpAccessToken + "&agentid=" + wxErpAgentId, button);
		}
		;
		System.out.println(jsonObject.toString());
	}

	@RequestMapping("/loginErpAccount.qywx")
	public String LoginErp(HttpServletRequest request, HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		String code = request.getParameter("code");

		System.out.println("code:" + code);
		if (StringUtil.isEmpty(wxErpAccessToken)) {
			wxErpAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxErpSecrect);
		}
		String url = "https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?" + "access_token=" + wxErpAccessToken
				+ "&code=" + code;
		String userInfo = HttpXmlClient.get(url);
		if ("42001".equals(QywxAppUtil.getResultErrcode(userInfo))) {
			wxErpAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxErpSecrect);
			url = "https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?" + "access_token=" + wxErpAccessToken
					+ "&code=" + code;
			userInfo = HttpXmlClient.get(url);
		}
		;
		JSONObject jsonObject = new JSONObject(userInfo);
		String userId = jsonObject.optString("UserId");
		String returnUrl = "";
		if (qywxService.checkBind(userId)) {
			returnUrl = QywxAppUtil.getReturnUrlWithUserId("loginErp.qywx", userId);
		} else {
			returnUrl = QywxAppUtil.getReturnUrlWithUserInfo("plzBindErpPager.qywx", userInfo);
		}
		return returnUrl;
	}

	/**
	 * 在未绑定账号时，点击登录，跳转至提示绑定页面
	 * 
	 * @param request
	 * @param response
	 * @param userInfo
	 * @throws Exception
	 */
	@RequestMapping("/plzBindErpPager.qywx")
	public void plzBindErpPager(HttpServletRequest request, HttpServletResponse response, String userInfo)
			throws Exception {
		response.sendRedirect("../html/qywx/plzBindErpAccount.html?");
	}

	/**
	 * 跳转登陆页面 并自动登陆
	 * 
	 * @param request
	 * @param response
	 * @param userId
	 * @throws Exception
	 */
	@RequestMapping("/loginErp.qywx")
	public void loginErp(HttpServletRequest request, HttpServletResponse response, String userId) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		System.out.println(userId);
		response.sendRedirect("../html/qywx/loginErpAccount.html?userId=" + userId);
	}

	/**
	 * 点击事件监听
	 * 
	 * @throws Exception
	 */
	@RequestMapping("/erpClickListener.qywx")
	public void erpMessageCenter(HttpServletRequest request, HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");

		// 获取密文并解密
		WXBizMsgCrypt wxcpt = new WXBizMsgCrypt(wxErpToken, wxErpEncodingKey, sCorpID);
		Map<String, String> map = MessageUtil.xmlToMap(request);
		String encrypt = map.get("Encrypt");
		String decrpy = wxcpt.decrypt(encrypt);
		System.out.println("明文:" + decrpy);
		map = MessageUtil.xmlToMap(decrpy);

		// 事件推送消息
		if ("event".equals(map.get("MsgType"))) {
			// 点击事件推送
			if ("click".equals(map.get("Event"))) {
				// 获取点击事件推送消息类对象
				ClickEventMessage clickEventMessage = qywxService.getMessageFromMap(map);
				// 微信回复消息的输出流
				PrintWriter out = null;
				try {
					out = response.getWriter();
					// if("unBindAccount".equals(map.get("EventKey"))){
					// //解除绑定点击事件推送
					// String decrpt =
					// qywxService.unBindAccount(clickEventMessage);
					// String encrpt = wxcpt.EncryptMsg(decrpt,
					// QywxAppUtil.getTimeStamp(), QywxAppUtil.getNonceStr());
					// out.println(encrpt);
					// }
				} catch (IOException e) {
					e.printStackTrace();
				} finally {
					if (out != null) {
						out.close();
					}
				}
			}
		}
	}

	/**
	 * 测试验证连接
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping("/wxTestCheck.qywx")
	public void wxTestCheck(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String signature = request.getParameter("msg_signature");
		String timeStamp = request.getParameter("timestamp");
		String nonce = request.getParameter("nonce");
		String echoStr = request.getParameter("echostr");
		System.out.println(
				"signature:" + signature + "\ntimestamp:" + timeStamp + "\nnonce:" + nonce + "\nechostr:" + echoStr);
		// 验证服务器的有效性
		String sEchoStr;// 需要返回的明文
		PrintWriter out = response.getWriter();
		try {
			WXBizMsgCrypt wxcpt = new WXBizMsgCrypt("ufIGtM4vljj", "eoyvqpZMGXHwBXKyM9LVZHIpjLnWDDCkJnpRozw7HUZ", sCorpID);
			sEchoStr = wxcpt.VerifyURL(signature, timeStamp, nonce, echoStr);
			System.out.println("verifyurl echostr:" + sEchoStr);
			// 验证URL成功，将sEchoStr返回
			out.println(sEchoStr);
		} catch (AesException e) {
			e.printStackTrace();
		} catch (NullPointerException e) {
			e.printStackTrace();
		} finally {
			if (out != null) {
				out.close();
			}
			out = null;
		}
	}
}
