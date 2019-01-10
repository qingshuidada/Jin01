package com.mdoa.work.controller;



import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.message.StringFormattedMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.JsonReturnObject;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.constant.FileConstant;
import com.mdoa.security.annotation.HasPermissions;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.FileUtil;
import com.mdoa.work.model.WorkOfficeCertificate;
import com.mdoa.work.service.CertificateService;

@RestController
@RequestMapping("/certificate")
public class CertificateController extends BaseController{

	@Autowired
	private CertificateService certificateService;
	
	/**
	 * 显示PDF文件
	 * @param path
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping("showPhoto.do")
	    public String getpic(String path, HttpServletRequest request, HttpServletResponse response) throws IOException {
	        File file = new File(path);
	        if (!file.exists()) {
	            request.setAttribute("error", "附件已删除或不存在");
	            //      return "/error";
	        }
	        InputStream in = null;
	        OutputStream os = null;
	        try {
	            response.setContentType("application/pdf"); // 设置返回内容格式
	            in = new FileInputStream(file);   //用该文件创建一个输入流
	            os = response.getOutputStream();  //创建输出流
	            byte[] b = new byte[1024];
	            while (in.read(b) != -1) {
	                os.write(b);
	            }
	            in.close();
	            os.flush();
	            os.close();
	        } catch (Exception e) {
	            try {
	                if (null != in) {
	                    in.close();
	                }
	            } catch (IOException e1) {
	                e1.printStackTrace();
	            }
	            try {
	                if (null != os) {
	                    os.close();
	                }
	            } catch (IOException e2) {
	                e2.printStackTrace();
	            }

	        }
	        return null;
	    }
	/**
	 * 显示照片文件
	 * @param path
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping("showPhoto1.do")
	    public String getpic1(String path, HttpServletRequest request, HttpServletResponse response) throws IOException {
	        File file = new File(path);
	        if (!file.exists()) {
	            request.setAttribute("error", "附件已删除或不存在");
	            //      return "/error";
	        }
	        InputStream in = null;
	        OutputStream os = null;
	        try {
	            response.setContentType("image/jpeg"); // 设置返回内容格式
	            in = new FileInputStream(file);   //用该文件创建一个输入流
	            os = response.getOutputStream();  //创建输出流
	            byte[] b = new byte[1024];
	            while (in.read(b) != -1) {
	                os.write(b);
	            }
	            in.close();
	            os.flush();
	            os.close();
	        } catch (Exception e) {
	            try {
	                if (null != in) {
	                    in.close();
	                }
	            } catch (IOException e1) {
	                e1.printStackTrace();
	            }
	            try {
	                if (null != os) {
	                    os.close();
	                }
	            } catch (IOException e2) {
	                e2.printStackTrace();
	            }

	        }
	        return null;
	    }
	
	/**
	 * 上传附件
	 * @return
	 */
	@RequestMapping("uploadAttachmentFile.do")
	public Map<String, String> uploadImage(MultipartFile file,HttpServletRequest request,WorkOfficeCertificate workOfficeCertificate){
		Gson gson = new Gson();
		HashMap<String, String> map = new HashMap<>();
		try {
			//判断文件是否为空
			if(!file.isEmpty()){
				UserInfo user = getUser(request);
				String url = FileConstant.FILE_PATH + FileConstant.ENTERPRISE_PACK +"/"+ file.getOriginalFilename();
				String attachmentFileUrl = FileUtil.uploadFile(file, url);
				map.put("attachmentFileUrl", attachmentFileUrl);
				map.put("attachmentFileName",file.getOriginalFilename());
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
	@RequestMapping("downLoadAttachmentFile.do")
	public void  downLoadImage(HttpServletRequest request, HttpServletResponse response,WorkOfficeCertificate certificate){
			try {
				System.out.println("url="+certificate.getAttachmentFileUrl());
				FileUtil.download(request, response, certificate.getAttachmentFileUrl(), certificate.getAttachmentFileName());
			} catch (Exception e) {
				e.printStackTrace();
			}
	}
	/**
	 * 添加证书
	 */
	@RequestMapping("/addCertificate.do")
	@HasPermissions(permissions = { "admin:workOfficeDoc:cattiManage:cattiManage:add" })
	public String addCertificate(WorkOfficeCertificate workOfficeCertificate,HttpServletRequest request){
		Gson gson = new Gson();
		UserInfo userInfo = getUser(request);
		try {
			workOfficeCertificate.setCreateUserId(userInfo.getUserId());
			workOfficeCertificate.setCreateUserName(userInfo.getUserName());
			certificateService.addCertificate(workOfficeCertificate);
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
	 * 查看证书
	 */
	@RequestMapping("/queryCertificate.do")
	public String queryCertificate(WorkOfficeCertificate workOfficeCertificate,HttpServletRequest request){
			//JsonReturnObject jro = new JsonReturnObject();
			Gson gson = new Gson();
			UserInfo userInfo = getUser(request);
			try {
				PageModel<WorkOfficeCertificate> list = certificateService.queryCertificate(workOfficeCertificate);
				String jsonString = gson.toJson(list);
				return jsonString;
			} catch (RuntimeException e) {
				e.printStackTrace();
				return Constant.DATA_ERROR_CODE;
			} catch (Exception e) {
				e.printStackTrace();
				return Constant.SERVER_ERROR_CODE;
			}
			
	}
	/**
	 * 修改证书
	 */
	@RequestMapping("/updateCertificate.do")
	@HasPermissions(permissions = { "admin:workOfficeDoc:cattiManage:cattiManage:update" })
	public String updateCertificate(WorkOfficeCertificate workOfficeCertificate,HttpServletRequest request){
		UserInfo userInfo = getUser(request);
		try {
			workOfficeCertificate.setUpdateUserId(userInfo.getUserId());
			workOfficeCertificate.setUpdateUserName(userInfo.getUserName());
			certificateService.updateCertificate(workOfficeCertificate);
			
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
	 * 删除证书
	 */
	@RequestMapping("/deleteCertificate.do")
	@HasPermissions(permissions = { "admin:workOfficeDoc:cattiManage:cattiManage:delete" })
	public String deleteCertificate(WorkOfficeCertificate workOfficeCertificate,HttpServletRequest request){
		UserInfo userInfo = getUser(request);
		try {
			workOfficeCertificate.setUpdateUserId(userInfo.getUserId());
			workOfficeCertificate.setUpdateUserName(userInfo.getUserName());
			certificateService.deleteCertificate(workOfficeCertificate);
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
