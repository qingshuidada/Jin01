package com.mdoa.weixin.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLEncoder;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.mdoa.base.model.JsonReturnObject;
import com.mdoa.constant.FileConstant;
import com.mdoa.erp.bo.ErpRegisterForm;
import com.mdoa.erp.service.ErpLoginService;
import com.mdoa.util.CheckoutUtil;
import com.mdoa.util.StringUtil;
import com.mdoa.weixin.bo.WeixinForm;
import com.mdoa.weixin.model.TextMessage;
import com.mdoa.weixin.service.WeixinService;
import com.mdoa.weixin.util.HttpUtil;
import com.mdoa.weixin.util.MessageUtil;

import me.chanjar.weixin.common.bean.WxMenu;
import me.chanjar.weixin.common.bean.WxMenu.WxMenuButton;
import me.chanjar.weixin.common.exception.WxErrorException;
import me.chanjar.weixin.common.util.crypto.SHA1;
import me.chanjar.weixin.mp.api.WxMpInMemoryConfigStorage;
import me.chanjar.weixin.mp.api.WxMpService;
import me.chanjar.weixin.mp.api.WxMpServiceImpl;
import net.sf.json.JSONObject;




@Controller
@RequestMapping("weixin")
public class WeixinController {

	@Autowired
	private WeixinService weixinService;
	@Autowired
	private ErpLoginService erpLoginService;
	//微信工具类
    private WxMpService wxService=new WxMpServiceImpl();
    
    //注入token的配置参数
    /**
     * 生产环境 建议将WxMpInMemoryConfigStorage持久化
     */
    WxMpInMemoryConfigStorage wxConfigProvider=new WxMpInMemoryConfigStorage();
	/**
	 * 验证连接
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 * @throws NoSuchAlgorithmException 
	 */
	@RequestMapping("/weixinLogin.wx")
	public void weixinLogin(HttpServletRequest request,HttpServletResponse response) throws IOException, NoSuchAlgorithmException{
		
		// 验证服务器的有效性
		String signature = request.getParameter("signature");
		String timestamp = request.getParameter("timestamp");
		String nonce = request.getParameter("nonce");
		String echostr = request.getParameter("echostr");
       System.out.println("signature="+signature+",timestamp="+timestamp+",nonce="+nonce+",echostr="+echostr);
       //注入token值
        wxConfigProvider.setToken(FileConstant.WEIXIN_TOKEN);
        wxService.setWxMpConfigStorage(wxConfigProvider);
        PrintWriter out = response.getWriter();
		//if (!wxService.checkSignature(timestamp, nonce, signature)) {
		if (signature != null && CheckoutUtil.checkSignature(signature, timestamp, nonce)) {
			System.out.println("success="+echostr);
			out.println(echostr);
		}
		out.close();
		out = null;
	}
	/**
	 * 生成菜单
	 * @param request
	 * @param response
	 */
	@RequestMapping("/createMenu.wx")
	public void createMenu(HttpServletRequest request,HttpServletResponse response){
		//创建菜单
        //创建一个复合菜单
		WxMenuButton button1 = new WxMenuButton();
		button1.setName("帐号管理");
		
		WxMenuButton button1_1 = new WxMenuButton();
		button1_1.setType("view");
		button1_1.setName("客户绑定");
		//button1_1.setUrl("https://open.weixin.qq.com/connect/oauth2/authorize?appid="+FileConstant.WEIXIN_APPID+"&redirect_uri=http://"+FileConstant.WEIXIN_URL+"/mdoa/weixin/customerBind.wx&response_type=code&scope=snsapi_base&state=123#wechat_redirect");
		button1_1.setUrl("https://open.weixin.qq.com/connect/oauth2/authorize?appid="+FileConstant.WEIXIN_APPID+"&redirect_uri=http://"+FileConstant.WEIXIN_URL+"/mdoa/weixin/customerBind.wx&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect");
		
		WxMenuButton button1_2 = new WxMenuButton();
		button1_2.setType("view");
		button1_2.setName("业务员绑定");
		//button1_2.setUrl("https://open.weixin.qq.com/connect/oauth2/authorize?appid="+FileConstant.WEIXIN_APPID+"&redirect_uri=http://"+FileConstant.WEIXIN_URL+"/mdoa/weixin/salesmanBind.wx&response_type=code&scope=snsapi_base&state=123#wechat_redirect");
		button1_2.setUrl("https://open.weixin.qq.com/connect/oauth2/authorize?appid="+FileConstant.WEIXIN_APPID+"&redirect_uri=http://"+FileConstant.WEIXIN_URL+"/mdoa/weixin/salesmanBind.wx&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect");
		
		/*WxMenuButton button1_4 = new WxMenuButton();
		button1_4.setType("view");
		button1_4.setName("天才测试");
		button1_4.setUrl("https://open.weixin.qq.com/connect/oauth2/authorize?appid="+FileConstant.WEIXIN_APPID+"&redirect_uri=http://"+FileConstant.WEIXIN_URL+"/mdoa/weixin/tiancai.wx&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect");
		*/
		WxMenuButton button1_3 = new WxMenuButton();
		button1_3.setType("click");
		button1_3.setName("解除绑定");
		button1_3.setKey("unBind");
		
		List<WxMenuButton> subButtons1=new ArrayList<WxMenuButton>();
		subButtons1.add(button1_1);
		subButtons1.add(button1_2);
		subButtons1.add(button1_3);
		//subButtons1.add(button1_4);
		button1.setSubButtons(subButtons1);
		
        WxMenuButton button2=new WxMenuButton();
        button2.setType("view"); //点击事件按钮
        button2.setName("ERP登录");
        button2.setUrl("https://open.weixin.qq.com/connect/oauth2/authorize?appid="+FileConstant.WEIXIN_APPID+"&redirect_uri=http://"+FileConstant.WEIXIN_URL+"/mdoa/weixin/erpSelect.wx&response_type=code&scope=snsapi_base&state=123#wechat_redirect");
        
        List<WxMenuButton> buttons=new ArrayList<WxMenuButton>();
        buttons.add(button1);
        buttons.add(button2);
        WxMenu menu=new WxMenu();
        menu.setButtons(buttons);
        System.out.println(new Gson().toJson(menu));
        //发送请求 创建菜单
        //注入token值
        wxConfigProvider.setToken(FileConstant.WEIXIN_TOKEN);
        wxConfigProvider.setAppId(FileConstant.WEIXIN_APPID);
        wxConfigProvider.setSecret(FileConstant.WEIXIN_SECRET);
        wxService.setWxMpConfigStorage(wxConfigProvider);
        try {
        	wxService.menuCreate(menu);
        	System.out.println("添加菜单成功");
		} catch (WxErrorException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}
	/**
	 * 删除菜单
	 */
	@RequestMapping("/deleteMenu.wx")
	public String deleteMenu(HttpServletRequest request,HttpServletResponse response){
		wxConfigProvider.setToken(FileConstant.WEIXIN_TOKEN);
        wxConfigProvider.setAppId(FileConstant.WEIXIN_APPID);
        wxConfigProvider.setSecret(FileConstant.WEIXIN_SECRET);
        wxService.setWxMpConfigStorage(wxConfigProvider);
		try {
			wxService.menuDelete();
			System.out.println("删除菜单成功");
			return "删除菜单成功";
		} catch (WxErrorException e) {
			e.printStackTrace();
			return "删除菜单失败";
		} catch (Exception e) {
			e.printStackTrace();
			return "删除菜单失败";
		}
	}
	/**
	 * ERP查询
	 * @throws Exception 
	 */
	@RequestMapping("/erpSelect.wx")
	public String erpSelect(HttpServletRequest request,HttpServletResponse response) throws Exception{
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
	    //换取access_token 其中包含了openid
	    String URL = HttpUtil.getAccessToken(request);
	    //URLConnectionHelper是一个模拟发送http请求的类
	    JSONObject jsonObject = HttpUtil.doGetStr(URL);
	    String openid = jsonObject.get("openid").toString();
		System.out.println(openid);
		String isBInd = weixinService.checkBind(openid);
		if (isBInd.equals("false"))
			return StringUtil.getReturnStr(openid, "erpSelectDefeat","");
	    return StringUtil.getReturnStr(openid, "erpSelect","")+"&csFlag="+isBInd;
	}
	/**
	 * 测试
	 * @throws Exception 
	 */
	@RequestMapping("/tiancai.wx")
	public void tiancai(HttpServletRequest request,HttpServletResponse response) throws Exception{
	    request.setCharacterEncoding("UTF-8");
	    response.setCharacterEncoding("UTF-8");
	    //换取access_token 其中包含了openid
	    String URL = HttpUtil.getAccessToken(request);
	    //URLConnectionHelper是一个模拟发送http请求的类
	    JSONObject jsonObject = HttpUtil.doGetStr(URL);
	    String openid = jsonObject.get("openid").toString();
	    String userUrl = HttpUtil.getWeiXinUser(jsonObject);
	    JSONObject jsonObject1 = HttpUtil.doGetStr(userUrl);
	    String nickName = jsonObject1.opt("nickname").toString();
	    System.out.println(new Gson().toJson(jsonObject1));
	    System.out.println(userUrl);
	    System.out.println(openid);
	    
	    /*if (isBInd.equals("false"))
		return StringUtil.getReturnStr(openid, "erpSelectDefeat");
	    return StringUtil.getReturnStr(openid, "erpSelect")+"&csFlag="+isBInd;*/
	}
	/**
	 * 跳转到客户绑定页面
	 * @throws Exception
	 */
	@RequestMapping("/customerBind.wx")
	public String customerBind(HttpServletRequest request,HttpServletResponse response) throws Exception{
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		  //换取access_token 其中包含了openid
	    String URL = HttpUtil.getAccessToken(request);
	    //URLConnectionHelper是一个模拟发送http请求的类
	    JSONObject jsonObject = HttpUtil.doGetStr(URL);
	    String openid = jsonObject.opt("openid").toString();
	    String userUrl = HttpUtil.getWeiXinUser(jsonObject);
	    JSONObject jsonObject1 = HttpUtil.doGetStr(userUrl);
	    String nickName = jsonObject1.opt("nickname").toString();
	    return StringUtil.getReturnStr(openid, "customerBind",nickName);
	}
	/**
	 * 客户绑定
	 */
	@ResponseBody
	@RequestMapping("customerBindo.wx")
	public String customerBindo(WeixinForm weixinForm,HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			weixinService.customerBindo(weixinForm);
			jro.setSuccess(true);
		} catch (RuntimeException e) {
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}catch (Exception e) {
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		String jsonString = gson.toJson(jro);
		return jsonString;
	}
	/**
	 * 业务员绑定
	 */
	@ResponseBody
	@RequestMapping("salesmanBindo.wx")
	public String salesmanBindo(WeixinForm weixinForm,HttpServletRequest request){
		JsonReturnObject jro = new JsonReturnObject();
		Gson gson = new Gson();
		try {
			weixinService.salesmanBindo(weixinForm);
			jro.setSuccess(true);
		} catch (RuntimeException e) {
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}catch (Exception e) {
			e.printStackTrace();
			jro.setMessage(e.getMessage());
			jro.setSuccess(false);
		}
		String jsonString = gson.toJson(jro);
		return jsonString;
	}
	/**
	 * 跳转到业务员绑定页面
	 * @throws Exception 
	 */
	@RequestMapping("/salesmanBind.wx")
	public String salesmanBind(HttpServletRequest request,HttpServletResponse response) throws Exception{
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		//换取access_token 其中包含了openid
		String URL = HttpUtil.getAccessToken(request);
		//URLConnectionHelper是一个模拟发送http请求的类
		JSONObject jsonObject = HttpUtil.doGetStr(URL);
		String openid = jsonObject.opt("openid").toString();
		String userUrl = HttpUtil.getWeiXinUser(jsonObject);
		System.out.println("openidopenidopenidopenid="+openid);
		JSONObject jsonObject1 = HttpUtil.doGetStr(userUrl);
		String nickName = jsonObject1.opt("nickname").toString();
		System.out.println("nickanme="+nickName);
		System.out.println(StringUtil.getReturnStr(openid, "salesmanBind",nickName));
		return StringUtil.getReturnStr(openid, "salesmanBind",nickName);
	}
	/**
	 * 转发中心判断跳转的页面
	 * @param weixinForm
	 * @param request
	 * @param response
	 * @throws Exception 
	 */ 
	@RequestMapping("/sendCenter.wx")
	public void sendCenter(WeixinForm weixinForm,HttpServletRequest request,HttpServletResponse response) throws Exception{
		try {
			request.setCharacterEncoding("UTF-8");
			response.setCharacterEncoding("UTF-8");
			System.out.println("openIdCenter="+weixinForm.getOpenId());
			
			ErpRegisterForm erpRegisterForm = new ErpRegisterForm();
			System.out.println(weixinForm.getImplementName());
			if (weixinForm.getImplementName().equals("erpSelect")) {
			List<WeixinForm> list = weixinService.queryUserMessage(weixinForm);//根据openid查询帐号密码
				if (weixinForm.getCsFlag().equals("customer")) {//客户登录
					erpRegisterForm.setPhoneNumber(list.get(0).getPhoneNumber());
					erpRegisterForm.setPassword(list.get(0).getPassword());
					erpRegisterForm.setLoginFlag("1");
					List<ErpRegisterForm> cList = erpLoginService.customerLogin(erpRegisterForm, request);
					String customer=URLEncoder.encode(cList.get(0).getCustomerName(),"utf-8");
					//response.sendRedirect("../html/erp/erpWX/index.html?user="+cList.get(0).getCustomerName()+"&flag=0");
					response.sendRedirect("../html/erp/erpWX/index.html?user="+customer+"&flag=0");
				}
				if (weixinForm.getCsFlag().equals("salesman")) {//业务员登录
					erpRegisterForm.setUserAccount(list.get(0).getUserAccount());
					erpRegisterForm.setPassword(list.get(0).getPassword());
					erpRegisterForm.setLoginFlag("1");
					List<ErpRegisterForm> sList = erpLoginService.salesmanLogin(erpRegisterForm, request);
					String salesman=URLEncoder.encode(sList.get(0).getSalesmanName(),"utf-8");
					//response.sendRedirect("../html/erp/erpWX/index.html?user="+sList.get(0).getSalesmanName()+"&flag=1");
					response.sendRedirect("../html/erp/erpWX/index.html?user="+salesman+"&flag=1");
				}
			}
			if (!StringUtil.isEmpty(weixinForm.getNickName())) 
			    weixinForm.setNickName(URLEncoder.encode(weixinForm.getNickName(),"utf-8"));
			if (weixinForm.getImplementName().equals("erpSelectDefeat")) 
				response.sendRedirect("../html/erp/wchat/unBindLogin.html");
			if (weixinForm.getImplementName().equals("customerBind")) 
				response.sendRedirect("../html/erp/wchat/bindAccount.html?openId="+weixinForm.getOpenId()+"&nickName="+weixinForm.getNickName()+"&type=customer");
			if (weixinForm.getImplementName().equals("salesmanBind")) 
				response.sendRedirect("../html/erp/wchat/bindAccount.html?openId="+weixinForm.getOpenId()+"&nickName="+weixinForm.getNickName()+"&type=salesman");
			if (weixinForm.getImplementName().equals("userBind")) 
				response.sendRedirect("../html/erp/wchat/bindAccount.html?openId="+weixinForm.getOpenId()+"&type=user");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 消息中心
	 * @throws Exception 
	 */
	@RequestMapping("/messageCenter.wx")
	public void messageCenter(HttpServletRequest request,HttpServletResponse response) throws Exception{
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		
		Map<String, String> map = MessageUtil.xmlToMap(request);
		if (map.get("MsgType").equals("event")) {
			TextMessage textMessage = weixinService.onlyReplyMessage(map);
			JsonReturnObject jro = new JsonReturnObject();
			System.out.println(map.get("Event")+","+ map.get("EventKey"));
			if (map.get("Event").equals("CLICK") && map.get("EventKey").equals("unBind")){//解除绑定
				try {
					weixinService.unBind(request, response,textMessage);
					jro.setSuccess(true);
				} catch (RuntimeException e) {
					e.printStackTrace();
					jro.setSuccess(false);
					jro.setMessage(e.getMessage());
				} catch (Exception e) {
					e.printStackTrace();
					jro.setSuccess(false);
					jro.setMessage(e.getMessage());
				}
				
			}
			
		}
		
	}
	
	/**
	 * 跳转到OA用户绑定页面
	 * @throws Exception 
	 */
	@RequestMapping("/userBind.wx")
	public String userBind(HttpServletRequest request,HttpServletResponse response) throws Exception{
		request.setCharacterEncoding("UTF-8");
		response.setCharacterEncoding("UTF-8");
		//换取access_token 其中包含了openid
		String URL = HttpUtil.getAccessToken(request);
		//URLConnectionHelper是一个模拟发送http请求的类
		JSONObject jsonObject = HttpUtil.doGetStr(URL);
		String openid = jsonObject.get("openid").toString();
		return StringUtil.getReturnStr(openid, "userBind","");
	}
}
