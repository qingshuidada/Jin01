package com.mdoa.weixin.util;



import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import javax.servlet.http.HttpServletRequest;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import com.mdoa.constant.FileConstant;

import net.sf.json.JSONObject;

public class HttpUtil {

	public static JSONObject doGetStr(String url){
		DefaultHttpClient  httpClient = new DefaultHttpClient();
		HttpGet httpGet = new HttpGet(url);
		JSONObject jsonObject = null ;
		try {
			HttpResponse response = httpClient.execute(httpGet);
			HttpEntity entity = response.getEntity();
			if (entity != null) {
				String result = EntityUtils.toString(entity,"UTF-8");
				jsonObject = JSONObject.fromObject(result);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} 
		return jsonObject;
	}
	
	public static JSONObject doPostStr(String url,String outStr){
		DefaultHttpClient  httpClient = new DefaultHttpClient();
		HttpPost httpPost = new HttpPost(url);
		JSONObject jsonObject = null ;
		try {
			httpPost.setEntity(new StringEntity(outStr,"UTF-8"));
			HttpResponse response = httpClient.execute(httpPost);
			String result = EntityUtils.toString(response.getEntity(),"UTF-8");
			jsonObject = JSONObject.fromObject(result);
		} catch (Exception e) {
			e.printStackTrace();
		} 
		return jsonObject;
	}
	public static String getAccessToken(HttpServletRequest request){
		
		//得到code
	    String CODE = request.getParameter("code");
	    System.out.println("code="+CODE);
	    String APPID = FileConstant.WEIXIN_APPID;
	    String SECRET = FileConstant.WEIXIN_SECRET;
	    String URL = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code".replace("APPID", APPID).replace("SECRET", SECRET).replace("CODE", CODE);
		return URL;
		
	}
	public static String getWeiXinUser(JSONObject jsonObject){
	    
	    String openid = jsonObject.get("openid").toString();
	    String access_token = jsonObject.get("access_token").toString();
	    String get_userinfo = "https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN".replace("ACCESS_TOKEN", access_token).replace("OPENID", openid);
	    https://api.weixin.qq.com/sns/userinfo?access_token=dtjJWICZpbmJRZzqpz3Zl_iFLBLtSxGD2WPlimjIJd2006Bg1J2HpeNPByzh8dAo58TW9JMqIsB2Lc2TrHpJjFePH5X5xUSbgh0D0dNCWJc&openid=oOzjow11yKtGkdSvp5p2nIn2EIzA&lang=zh_CN 

	    return get_userinfo;
	    
	}
	 public static String doHttpsGetJson(String Url)
	    {
	        String message = "";
	        try
	        {
	            System.out.println("doHttpsGetJson");//TODO:dd
	            URL urlGet = new URL(Url);
	            HttpURLConnection http = (HttpURLConnection) urlGet.openConnection(); 
	            http.setRequestMethod("GET");      //必须是get方式请求    24           
	            http.setRequestProperty("Content-Type","application/x-www-form-urlencoded");  
	            http.setDoOutput(true);  
	            http.setDoInput(true);
	            System.setProperty("sun.net.client.defaultConnectTimeout", "30000");//连接超时30秒28     
	            System.setProperty("sun.net.client.defaultReadTimeout", "30000"); //读取超时30秒29 30       
	            http.connect();
	            InputStream is =http.getInputStream();
	            int size =is.available();
	            byte[] jsonBytes =new byte[size];
	            is.read(jsonBytes);
	            message=new String(jsonBytes,"UTF-8");
	        } 
	        catch (MalformedURLException e)
	        {
	              e.printStackTrace();
	          }
	        catch (IOException e)
	          {
	              e.printStackTrace();
	          } 
	        return message;
	    }
}
