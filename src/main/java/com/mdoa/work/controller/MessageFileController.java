package com.mdoa.work.controller;


import java.io.File;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.security.annotation.HasPermissions;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.FileUtil;
import com.mdoa.work.bo.WorkOfficeMessageFileForm;
import com.mdoa.work.service.MessageFileService;

@RestController
@RequestMapping("/messageFile")
public class MessageFileController extends BaseController{

	@Autowired
	private MessageFileService messageFileService;
	
	/**
	 * 附件下载
	 * @param file
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/downLoadMessageFile.do")
	public void  downLoadImage(HttpServletRequest request, HttpServletResponse response,WorkOfficeMessageFileForm workOfficeMessageFileForm){
			try {
				//String laString = workOfficeMessageFileForm.getFileUrl().substring(workOfficeMessageFileForm.getFileUrl().lastIndexOf("."));
				System.out.println(messageFileService.getFileFolderName(workOfficeMessageFileForm));
				FileUtil.download(request, response, messageFileService.getFileFolderName(workOfficeMessageFileForm), workOfficeMessageFileForm.getFileFolderName());
			} catch (Exception e) {
				e.printStackTrace();
			}
	}
	/**
	 * 添加文件夹
	 */
	@RequestMapping("/addFolder.do")
	@HasPermissions(permissions = { "admin:workOfficeDoc:messageFileManage:messageFile:addFolder" })
	public String addFolder(WorkOfficeMessageFileForm workOfficeMessageFileForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			workOfficeMessageFileForm.setCreateUserId(userInfo.getUserId());
			workOfficeMessageFileForm.setCreateUserName(userInfo.getUserName());
			String fileUrl = messageFileService.getFileFolderName(workOfficeMessageFileForm)+"/"+workOfficeMessageFileForm.getFileFolderName();
			System.out.println(fileUrl);
			File file = new File(fileUrl);
			if (file.mkdirs()) {
				System.out.println("文件夹创建成功");
			}
			workOfficeMessageFileForm.setFileUrl(fileUrl);
			messageFileService.addFileFolder(workOfficeMessageFileForm);
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 添加文件
	 */
	@RequestMapping("/addFile.do")
	@HasPermissions(permissions = { "admin:workOfficeDoc:messageFileManage:messageFile:addFolder" })
	public String addFile(MultipartFile file,WorkOfficeMessageFileForm workOfficeMessageFileForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			workOfficeMessageFileForm.setCreateUserId(userInfo.getUserId());
			workOfficeMessageFileForm.setCreateUserName(userInfo.getUserName());
			if(!file.isEmpty()){
				UserInfo user = getUser(request);
				String url = messageFileService.getFileFolderName(workOfficeMessageFileForm)+"/"+file.getOriginalFilename();
				String fileUrl = FileUtil.uploadFile(file, url);
				workOfficeMessageFileForm.setFileUrl(fileUrl);
				workOfficeMessageFileForm.setFileFolderName(file.getOriginalFilename());
				messageFileService.addFileFolder(workOfficeMessageFileForm);
				return Constant.SUCCESS_CODE;
			}else{
				throw new RuntimeException("文件夹为空");
			}
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 查询文件或者文件夹
	 */
	@RequestMapping("/queryFileFolder.do")
	public String queryFileFolder(WorkOfficeMessageFileForm workOfficeMessageFileForm,HttpServletRequest request){
		try {
			Gson gson = new Gson();
			PageModel<WorkOfficeMessageFileForm> pageModel = messageFileService.queryFileFolder(workOfficeMessageFileForm);
			
			return gson.toJson(pageModel);
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 删除文件或者文件夹
	 */
	@RequestMapping("/deleteFileFolder.do")
	@HasPermissions(permissions = { "admin:workOfficeDoc:messageFileManage:messageFile:delete" })
	public String deleteFileFolder(WorkOfficeMessageFileForm workOfficeMessageFileForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			workOfficeMessageFileForm.setUpdateUserId(userInfo.getUserId());
			workOfficeMessageFileForm.setUpdateUserName(userInfo.getUserName());
			messageFileService.deleteFileFolder(workOfficeMessageFileForm);
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 修改文件或者文件夹
	 */
	@RequestMapping("/updateFileFolder.do")
	@HasPermissions(permissions = { "admin:workOfficeDoc:messageFileManage:messageFile:update" })
	public String updateFileFolder(WorkOfficeMessageFileForm workOfficeMessageFileForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			workOfficeMessageFileForm.setUpdateUserId(userInfo.getUserId());
			workOfficeMessageFileForm.setUpdateUserName(userInfo.getUserName());
			String oldFileUrl = messageFileService.getFileFolderName(workOfficeMessageFileForm);
			String laString = "";
			String preString = oldFileUrl.substring(0, oldFileUrl.lastIndexOf("/"));
			System.out.println("preString="+preString);
			if (workOfficeMessageFileForm.getTypeFlag() != null && workOfficeMessageFileForm.getTypeFlag().equals("0")) {
				laString += oldFileUrl.substring(oldFileUrl.lastIndexOf("."));
			}
			String newFileUrl = preString+"/"+workOfficeMessageFileForm.getNewFileFolderName();
			System.out.println("old="+oldFileUrl);
			System.out.println("new="+newFileUrl);
			File oldFile = new File(oldFileUrl);
			File newFile = new File(newFileUrl);
			workOfficeMessageFileForm.setFileUrl(newFileUrl);
			workOfficeMessageFileForm.setFileFolderName(workOfficeMessageFileForm.getNewFileFolderName());
			messageFileService.updateFileFolder(workOfficeMessageFileForm);
			oldFile.renameTo(newFile);
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
}

