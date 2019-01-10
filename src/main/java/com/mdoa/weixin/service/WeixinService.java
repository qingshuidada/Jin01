package com.mdoa.weixin.service;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mdoa.constant.WxSessionConstant;
import com.mdoa.util.Md5Util;
import com.mdoa.util.StringUtil;
import com.mdoa.weixin.bo.WeixinForm;
import com.mdoa.weixin.dao.WeixinDao;
import com.mdoa.weixin.model.TextMessage;
import com.mdoa.weixin.util.MessageUtil;


@Service
public class WeixinService {

	@Autowired
	private WeixinDao weixinDao;
	/**
	 * 客户绑定
	 * @param request
	 * @param response
	 * @param textMessage 
	 * @throws UnsupportedEncodingException 
	 * @throws Exception
	 */
	public void customerBind(HttpServletRequest request, HttpServletResponse response, TextMessage textMessage) throws UnsupportedEncodingException {
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = null;
		try {
			out = response.getWriter();
			String message = null;
			System.out.println("开发者微信号="+textMessage.getFromUserName());
			textMessage.setContent("请输入您的手机号:");
			textMessage.setMsgType("text");
			message = MessageUtil.textMessageToXml(textMessage);
			WxSessionConstant.standardSessionManager.getSession(textMessage.getToUserName()).setAttribute("customerFlag", "1");
			out.println(message);
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.close();
	}
	/**
	 * 直接回复
	 * @param map
	 * @return
	 */
	public TextMessage onlyReplyMessage(Map<String, String> map) {
		String fromUserName = null;
		String toUserName = null;
		String msgType = null;
		String content = null;
		String createTime = null;
		TextMessage textMessage = new TextMessage();
		if (!StringUtil.isEmpty(map.get("FromUserName"))) {
			fromUserName = map.get("FromUserName");
			textMessage.setToUserName(fromUserName);
		}
		if (!StringUtil.isEmpty(map.get("ToUserName"))){
			toUserName = map.get("ToUserName");
			textMessage.setFromUserName(toUserName);
		}
		if (!StringUtil.isEmpty(map.get("MsgType"))){
			msgType = map.get("MsgType");
			textMessage.setMsgType("msgType");
		}
		if (!StringUtil.isEmpty(map.get("Content"))) {
			content = map.get("Content");
			textMessage.setContent(content);
		}
		if (!StringUtil.isEmpty(map.get("CreateTime"))) {
			createTime = map.get("CreateTime");
			textMessage.setCreateTime(new Date().getTime());
		}
		
		return textMessage;
	}
	/**
	 * 判断客户当前是否能进行绑定
	 * @param openid
	 * @return
	 */
	public Boolean checkCustomerBind(String openid) {
		WeixinForm weixinForm = new WeixinForm();
		weixinForm.setOpenId(openid);
		List<WeixinForm> list = weixinDao.checkCustomerBind(weixinForm);
		if (list.size() < 1 ) 
			return false;
		return true;
	}
	/**
	 * 判断微信用户是否进行了绑定
	 * @param openid
	 * @return
	 */
	public String checkBind(String openid) {
		WeixinForm weixinForm = new WeixinForm();
		weixinForm.setOpenId(openid);
		List<WeixinForm> customerList = weixinDao.checkCustomerBind(weixinForm);
		List<WeixinForm> salesmanList = weixinDao.checkSalesmanBind(weixinForm);
		if (customerList.size() < 1 && salesmanList.size() < 1) 
			return "false";
		if (customerList.size() < 1 && salesmanList.size() > 0) 
			return "salesman";
		if (customerList.size() > 0 && salesmanList.size() < 1) 
			return "customer";
		return "false";
	}
	/**
	 * 解除绑定
	 * @param request
	 * @param response
	 * @param textMessage
	 * @throws Exception 
	 */
	public void unBind(HttpServletRequest request, HttpServletResponse response, TextMessage textMessage) throws Exception {
		WeixinForm weixinForm = new WeixinForm();
		weixinForm.setOpenId(textMessage.getToUserName());
		List<WeixinForm> list = weixinDao.checkOpenForUserHaveOpenId(weixinForm);  //查询该用户是否已经绑定账号
		if(list != null && list.size() >0){
			if (!weixinDao.unBind(weixinForm)){
				textMessage.setContent("未知原因，解除失败");
			}else{
				textMessage.setContent("解除成功");
			}
		}else{
		    textMessage.setContent("该用户未绑定账号，解除失败");
		}
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = null;
		try {
			out = response.getWriter();
			String message = null;
			System.out.println("开发者微信号="+textMessage.getFromUserName());
			
			textMessage.setMsgType("text");
			message = MessageUtil.textMessageToXml(textMessage);
			System.out.println(message);
			out.println(message);
		} catch (IOException e) {
			e.printStackTrace();
		}
		out.close();
		
	}
	/**
	 * 客户绑定
	 * @param weixinForm
	 */
	public void customerBindo(WeixinForm weixinForm) {
		weixinForm.setPassword(Md5Util.getMd5Str(weixinForm.getPassword()));
		List<WeixinForm> nList = weixinDao.checkExistCustomer(weixinForm);//验证帐号密码的正确性
		List<WeixinForm> list = weixinDao.checkCustomerBind(weixinForm);//查询是否已经绑定了
		List<WeixinForm> slist = weixinDao.checkSalesmanBind(weixinForm);//查询是否已经绑定了
		List<WeixinForm> mList = weixinDao.checkOpenForUser(weixinForm);//判断该用户是否绑定了其他微信
		if (nList!= null && nList.size() == 0) 
		    throw new RuntimeException("帐号或者密码错误");
		if (mList!= null && mList.size() > 0)
			throw new RuntimeException("该账号已被绑定，无法重复绑定");
		if (list!= null && list.size() > 0)
			throw new RuntimeException("您已绑定客户,无法重复绑定");
		if (slist!= null && slist.size() > 0)
			throw new RuntimeException("您已绑定业务员,无法重复绑定");
		if (list != null && nList != null && nList.size() > 0 && list.size() == 0) {
			if (!weixinDao.insertErpWeixin(weixinForm)) 
				throw new RuntimeException("未知错误，客户绑定失败，请联系管理员");
		}
	}
	/**
	 * 业务员绑定
	 * @param weixinForm
	 */
	public void salesmanBindo(WeixinForm weixinForm) {
		weixinForm.setPassword(Md5Util.getMd5Str(weixinForm.getPassword()));
		List<WeixinForm> nList = weixinDao.checkExistSalesman(weixinForm);//验证帐号密码的正确性
		List<WeixinForm> list = weixinDao.checkSalesmanBind(weixinForm);//查询是否已经绑定了
		List<WeixinForm> clist = weixinDao.checkCustomerBind(weixinForm);//查询是否已经绑定了
		List<WeixinForm> mList = weixinDao.checkOpenForUser(weixinForm);//判断该用户是否绑定了其他微信
		if (nList!= null && nList.size() == 0) 
		    throw new RuntimeException("帐号或者密码错误");
		if (mList!= null && mList.size() > 0)
			throw new RuntimeException("该账号已被绑定，无法重复绑定");
		if (list!= null && list.size() > 0) 
			throw new RuntimeException("您已绑定业务员,无法重复绑定");
		if (clist!= null && clist.size() > 0) 
			throw new RuntimeException("您已绑定客户,无法重复绑定");
		if (list != null && nList != null && nList.size() > 0 && list.size() == 0) {
			if (!weixinDao.insertErpWeixin(weixinForm)) 
				throw new RuntimeException("未知错误,业务员绑定失败，请联系管理员");
		}
	}
	/**
	 * 根据openid查询信息
	 * @param weixinForm
	 * @return
	 */
	public List<WeixinForm> queryUserMessage(WeixinForm weixinForm) {
		List<WeixinForm> list = weixinDao.queryUserMessage(weixinForm);
		return list;
	}

}
