package com.mdoa.dingding.uitl;

import java.util.List;

import com.dingtalk.api.DefaultDingTalkClient;
import com.dingtalk.api.DingTalkClient;
import com.dingtalk.api.request.OapiAttendanceGetleaveapprovedurationRequest;
import com.dingtalk.api.request.OapiDepartmentListRequest;
import com.dingtalk.api.request.OapiGettokenRequest;
import com.dingtalk.api.request.OapiUserListRequest;
import com.dingtalk.api.response.OapiAttendanceGetleaveapprovedurationResponse;
import com.dingtalk.api.response.OapiDepartmentListResponse;
import com.dingtalk.api.response.OapiDepartmentListResponse.Department;
import com.google.gson.Gson;
import com.mdoa.dingding.model.DDDepartment;
import com.dingtalk.api.response.OapiGettokenResponse;
import com.dingtalk.api.response.OapiUserListResponse;
import com.taobao.api.ApiException;
import com.taobao.api.internal.util.StringUtils;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class DDUtils {

	private static String CorpId = "dingfa5cb5cbd4b77feb35c2f4657eb6378f";

    private static String CorpSecret = "7ZDtNoamMt0k23iEE9p2iCpHyGTl4P2k7zjvfVt-ulWAJ0i7W0iU3yeIIz9zpPuZ";
    
    private static String AccessTokenUrl = "https://oapi.dingtalk.com/gettoken"; //get方式

    private static String GetDepartmentUrl = "https://oapi.dingtalk.com/department/list";//get方式

    private static String GetDepartmentUser = "https://oapi.dingtalk.com/user/list";//get方式
    
    public static String getAssessToken(String url){
    	DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/gettoken");
		OapiGettokenRequest request = new OapiGettokenRequest();
		request.setCorpid(CorpId);
		request.setCorpsecret(CorpSecret);
		request.setHttpMethod("GET");
		try {
			OapiGettokenResponse response = client.execute(request);
			System.out.println(response.getAccessToken());
			return response.getAccessToken();
		} catch (ApiException e) {
			e.printStackTrace();
			return "异常错误";
		}
		
    }
    
    public static List<Department> getAllDepartment(){
    	
    	DingTalkClient client = new DefaultDingTalkClient(GetDepartmentUrl);
    	OapiDepartmentListRequest request = new OapiDepartmentListRequest();
    	request.setId("1");
    	request.setHttpMethod("GET");
    	String accessToken = getAssessToken(AccessTokenUrl);
    	try {
			OapiDepartmentListResponse response = client.execute(request, accessToken);
			return response.getDepartment();
		} catch (ApiException e) {
			e.printStackTrace();
			return null;
		}
    }
    
    public static String getDepartmentUser(String url,Long departmentId){
    	DingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/user/list");
    	OapiUserListRequest request = new OapiUserListRequest();
    	request.setDepartmentId(departmentId);
    	request.setHttpMethod("GET");
    	String accessToken = getAssessToken(AccessTokenUrl);
    	try {
			OapiUserListResponse response = client.execute(request, accessToken);
			return response.getBody();
		} catch (ApiException e) {
			e.printStackTrace();
			return "异常错误";
		}
    }
    
    public static String getLeaveApproveDuration(String userId){//0744432135780303
    	DefaultDingTalkClient client = new DefaultDingTalkClient("https://oapi.dingtalk.com/topapi/attendance/getleaveapproveduration");
    	OapiAttendanceGetleaveapprovedurationRequest request = new OapiAttendanceGetleaveapprovedurationRequest();
    	request.setFromDate(StringUtils.parseDateTime("2018-07-16 00:00:00"));
    	request.setToDate(StringUtils.parseDateTime("2018-07-17 00:00:00"));
    	request.setUserid(userId);
    	String accessToken = getAssessToken(AccessTokenUrl);
    	try {
			OapiAttendanceGetleaveapprovedurationResponse response = client.execute(request,accessToken);
			return response.getBody();
		} catch (ApiException e) {
			e.printStackTrace();
			return "异常错误";
		}
    }
    
	public static void main(String[] args) {
		List<Department> list = getAllDepartment();
		
	}
}
