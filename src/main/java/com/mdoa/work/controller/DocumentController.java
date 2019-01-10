package com.mdoa.work.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fr.third.com.lowagie.text.pdf.BaseFont;
import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.constant.Constant;
import com.mdoa.constant.DocumentModelConstant;
import com.mdoa.constant.FileConstant;
import com.mdoa.security.annotation.HasPermissions;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.FileUtil;
import com.mdoa.util.WordUtil;
import com.mdoa.work.bo.WorkOfficeDocForm;
import com.mdoa.work.model.DTreeModel;
import com.mdoa.work.model.DocumentDoc;
import com.mdoa.work.service.DocumentService;

@RestController
@RequestMapping("/document")
public class DocumentController extends BaseController{

	@Autowired
	private DocumentService documentService;
	//根目录
	private static final String ROOT = "0";
	
	
	/**
	 * 显示PDF文件
	 * @param path
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping("showWord.do")
	    public String getpic(String path, HttpServletRequest request, HttpServletResponse response) throws IOException {
	    
	    String fontPath = FileConstant.FILE_PATH+"/Fonts/simhei.ttf";
	    String target = path.replace("docx", "pdf");
	    WordUtil.wordConverterToPdf(path, target, fontPath, BaseFont.IDENTITY_H);
	    
	    File file = new File(target);
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
	 * 实现文件树结构
	 * @return
	 */
	@RequestMapping("/deptTree.do")
	public String deptTree(){
		if (DocumentModelConstant.treeList == null) {
			List<DTreeModel> list = new ArrayList<>();
			DTreeModel dTreeModel = new DTreeModel();
			dTreeModel.setThisId(ROOT);
			dTreeModel.setId(ROOT);
			dTreeModel.setIconCls("icon-directory");
			dTreeModel.setAttributes("0");
			dTreeModel.setText("总目录");
			list.add(dTreeModel);
			list.get(0).setChildren(documentService.deptTree(ROOT));
			DocumentModelConstant.treeList = list;
		}
		Gson gson = new Gson();
		String jsonString = gson.toJson(DocumentModelConstant.treeList);
		return jsonString;
	}
	/**
	 * 添加目录或者文件
	 */
	@RequestMapping("/addDocument.do")
	@HasPermissions(permissions = { "admin:workOfficeDoc:documentManage:documentManage:addtree" })
	public String addDocument(WorkOfficeDocForm workOfficeDocForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			workOfficeDocForm.setCreateUserId(userInfo.getUserId());
			workOfficeDocForm.setCreateUserName(userInfo.getUserName());
			documentService.addDocument(workOfficeDocForm);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 删除文件或目录
	 */
	@RequestMapping("/removeDocument.do")
	@HasPermissions(permissions = { "admin:workOfficeDoc:documentManage:documentManage:deletetree" })
	public String removeDocument(WorkOfficeDocForm workOfficeDocForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			workOfficeDocForm.setUpdateUserId(userInfo.getUserId());
			workOfficeDocForm.setUpdateUserName(userInfo.getUserName());
			documentService.removeDocument(workOfficeDocForm);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return e.getMessage();
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 修改文件名或者目录名
	 */
	@RequestMapping("/updateDocument.do")
	@HasPermissions(permissions = { "admin:workOfficeDoc:documentManage:documentManage:updatetree" })
	public String updateDocument(WorkOfficeDocForm workOfficeDocForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			workOfficeDocForm.setUpdateUserId(userInfo.getUserId());
			workOfficeDocForm.setUpdateUserName(userInfo.getUserName());
			documentService.updateDocument(workOfficeDocForm);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 拖动
	 */
	@RequestMapping("/dragDocument.do")
	public String dragDocument(WorkOfficeDocForm workOfficeDocForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			workOfficeDocForm.setUpdateUserId(userInfo.getUserId());
			workOfficeDocForm.setUpdateUserName(userInfo.getUserName());
			documentService.dragDocument(workOfficeDocForm);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 查询一个目录下的所有的公文列表
	 */
	@RequestMapping("queryDoc.do")
	public String queryDoc(DocumentDoc documentDoc){
		try{
			Gson gson = new Gson();
			return gson.toJson(documentService.queryDoc(documentDoc));
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 伸展和合拢
	 */
	@RequestMapping("/updateTreeState.do")
	public String updateTreeState(WorkOfficeDocForm workOfficeDocForm,HttpServletRequest request){
		try {
			UserInfo userInfo = getUser(request);
			documentService.updateTreeState(workOfficeDocForm,DocumentModelConstant.treeList);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 附件下载
	 * @param file
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("downloadFile.do")
	@HasPermissions(permissions = { "admin:workOfficeDoc:documentManage:documentManage:load" })
	public void downloadFile(HttpServletRequest request, HttpServletResponse response,String fileUrl, String fileName){
		try {
			FileUtil.download(request, response, fileUrl, fileName);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@RequestMapping("deleteDoc.do")
	@HasPermissions(permissions = { "admin:workOfficeDoc:documentManage:documentManage:delete" })
	public String deleteDoc(String docId){
		try {
			documentService.deleteDoc(docId);
			return Constant.SUCCESS_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
}
