package com.mdoa.processManage.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.constant.Constant;
import com.mdoa.constant.FileConstant;
import com.mdoa.processManage.service.ProcessService;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.FileUtil;
import com.mdoa.work.model.WorkOfficeCertificate;

@RequestMapping("process")
@RestController
public class ProcessController extends BaseController{
	
	@Autowired
	private ProcessService processService;
	
	@RequestMapping("getUserList.do")
	public String queryUserList(UserInfo userInfo){
		try{
			Gson gson = new Gson();
			return gson.toJson(processService.queryUserList(userInfo));
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@RequestMapping("addAllUser.do")
	public String addAllUser(UserInfo userInfo){
		try{
			return processService.addAllUser(userInfo);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@RequestMapping("addUser.do")
	public String addUser(String userId, String groupId){
		try{
			return processService.addUser(userId, groupId);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@RequestMapping("deleteUser.do")
	public String deleteUser(String userId, String groupId){
		try{
			processService.deleteUser(userId, groupId);
			return Constant.SUCCESS_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	@RequestMapping("getSelectedUserList.do")
	public String getSelectedUserList(UserInfo userInfo){
		try{
			Gson gson = new Gson();
			return gson.toJson(processService.getSelectedUserList(userInfo));
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 获取数据字典相关信息
	 */
	@RequestMapping("getDirc.do")
	public String getDirc(String selectKey){
		try{
			Gson gson = new Gson();
			return gson.toJson(processService.getDirc(selectKey));
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 上传附件
	 * @return
	 */
	@RequestMapping("upLoadFile.do")
	public Map<String, String> upLoadFile(MultipartFile file,HttpServletRequest request,WorkOfficeCertificate workOfficeCertificate){
		Gson gson = new Gson();
		HashMap<String, String> map = new HashMap<>();
		try {
			//判断文件是否为空
			if(!file.isEmpty()){
				UserInfo user = getUser(request);
				String url = FileConstant.FILE_PATH + FileConstant.PROCESS_PACK +"/"+ file.getOriginalFilename();
				String fileUrl = FileUtil.uploadFile(file, url);
				map.put("fileUrl", fileUrl);
				map.put("fileName",file.getOriginalFilename());
				return map;
			}else{
				return map;
			}
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}
	/**
	 * 附件下载
	 * @param file
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("downloadFile.do")
	public void downloadFile(HttpServletRequest request, HttpServletResponse response,String fileUrl, String fileName){
		try {
			FileUtil.download(request, response, fileUrl, fileName);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
