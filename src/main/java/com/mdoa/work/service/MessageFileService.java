package com.mdoa.work.service;


import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.base.model.PageModel;
import com.mdoa.base.service.BaseService;
import com.mdoa.constant.FileConstant;
import com.mdoa.util.FileUtil;
import com.mdoa.util.StringUtil;
import com.mdoa.work.bo.WorkOfficeMessageFileForm;
import com.mdoa.work.dao.MessageFileDao;

@Service
public class MessageFileService extends BaseService{

	@Autowired
	private MessageFileDao messageFileDao;

	
	/**
	 * 添加文件或者文件夹
	 * @param workOfficeMessageFileForm
	 */
	public void addFileFolder(WorkOfficeMessageFileForm workOfficeMessageFileForm) {
		String uuid = getuuid();
		workOfficeMessageFileForm.setFileFolderId(uuid);
		if (StringUtil.isEmpty(workOfficeMessageFileForm.getPreviousFileFolderId())) {
			workOfficeMessageFileForm.setPreviousFileFolderId("0000");
			workOfficeMessageFileForm.setUrl("0000_"+uuid);
		}else{
			workOfficeMessageFileForm.setUrl(workOfficeMessageFileForm.getUrl()+"_"+uuid);
		}
		if (!messageFileDao.addFileFolder(workOfficeMessageFileForm)) 
			throw new RuntimeException("添加文件或者文件夹失败");
	}

	/**
	 * 查询文件或者文件夹
	 * @param workOfficeMessageFileForm
	 * @return
	 */
	public PageModel<WorkOfficeMessageFileForm> queryFileFolder(WorkOfficeMessageFileForm workOfficeMessageFileForm) {
		if (StringUtil.isEmpty(workOfficeMessageFileForm.getFileFolderId())){
			workOfficeMessageFileForm.setPreviousFileFolderId("0000");
		}else{
			workOfficeMessageFileForm.setPreviousFileFolderId(workOfficeMessageFileForm.getFileFolderId());
		}
		PageHelper.startPage(workOfficeMessageFileForm.getPage(),workOfficeMessageFileForm.getRows());
		List<WorkOfficeMessageFileForm> list = messageFileDao.queryFileFolder(workOfficeMessageFileForm);
		PageModel<WorkOfficeMessageFileForm> pageModel = new PageModel<>((Page<WorkOfficeMessageFileForm>)list);
		
		return pageModel;
	}
	private boolean flag;
	private File file;
	/**
	 * 删除文件或者文件夹
	 * @param workOfficeMessageFileForm
	 * @throws Exception 
	 * @throws IOException 
	 */
	public void deleteFileFolder(WorkOfficeMessageFileForm workOfficeMessageFileForm) throws IOException, Exception {
		if (!StringUtil.isEmpty(workOfficeMessageFileForm.getUrl())) 
			workOfficeMessageFileForm.setUrl(workOfficeMessageFileForm.getUrl()+"%");
		if (!messageFileDao.deleteFileFolder(workOfficeMessageFileForm)) 
			throw new RuntimeException("删除文件或者文件夹失败");
		System.out.println(getFileFolderName(workOfficeMessageFileForm)+"/"+workOfficeMessageFileForm.getFileFolderName());
		if (deleteFolder(getFileFolderName(workOfficeMessageFileForm)+"/"+workOfficeMessageFileForm.getFileFolderName())) {
			System.out.println("删除成功");
		}else{
			System.out.println("删除失败");
		}
		/*List<WorkOfficeMessageFileForm> list = messageFileDao.queryFileFolder(workOfficeMessageFileForm);
		for (WorkOfficeMessageFileForm workOfficeMessageFileForm2 : list) {
			if (workOfficeMessageFileForm2.getFileUrl() != null) {
				File file = new File(workOfficeMessageFileForm2.getFileUrl());
				file.delete();//删除文件
			}
		}*/
	}
	/**
	 * 修改文件或者文件夹
	 * @param workOfficeMessageFileForm
	 */
	public void updateFileFolder(WorkOfficeMessageFileForm workOfficeMessageFileForm) {
		if (!messageFileDao.updateFileFolder(workOfficeMessageFileForm)) 
			throw new RuntimeException("修改文件或者文件夹失败");
		
	}

	public String getFileFolderName(WorkOfficeMessageFileForm workOfficeMessageFileForm) throws Exception, IOException {
		String string = "";
		String url = FileConstant.FILE_PATH + FileConstant.ENTERPRISE_PACK +"/"+ workOfficeMessageFileForm.getDepartmentName();
		String[] fileFolderIds = workOfficeMessageFileForm.getUrl().split("_");
		workOfficeMessageFileForm.setFileFolderIds(fileFolderIds);
		List<WorkOfficeMessageFileForm> list = messageFileDao.queryFileUrlName(workOfficeMessageFileForm);
		for (int i = 1; i < fileFolderIds.length; i++) {
			for (int j = 0; j < list.size(); j++) {
				if (list.get(j).getFileFolderId().equals(fileFolderIds[i])) {
					string += "/"+list.get(j).getFileFolderName();
				}
			}
		}
		
		return url +string;
	}
	
	/** 
	 *  根据路径删除指定的目录或文件，无论存在与否 
	 *@param sPath  要删除的目录或文件 
	 *@return 删除成功返回 true，否则返回 false。 
	 */  
	public boolean deleteFolder(String sPath) {  
	     flag = false;  
	    File file = new File(sPath);  
	    // 判断目录或文件是否存在  
	    if (!file.exists()) {  // 不存在返回 false  
	        return flag;  
	    } else {  
	        // 判断是否为文件  
	        if (file.isFile()) {  // 为文件时调用删除文件方法  
	            return deleteFile(sPath);  
	        } else {  // 为目录时调用删除目录方法  
	            return deleteDirectory(sPath);  
	        }  
	    }  
	}  
	/** 
	 * 删除单个文件 
	 * @param   sPath    被删除文件的文件名 
	 * @return 单个文件删除成功返回true，否则返回false 
	 */  
	public boolean deleteFile(String sPath) {  
	    flag = false;  
	    file = new File(sPath);  
	    // 路径为文件且不为空则进行删除  
	    if (file.isFile() && file.exists()) {  
	        file.delete();  
	        flag = true;  
	    }  
	    return flag;  
	}  
	/** 
	 * 删除目录（文件夹）以及目录下的文件 
	 * @param   sPath 被删除目录的文件路径 
	 * @return  目录删除成功返回true，否则返回false 
	 */  
	public boolean deleteDirectory(String sPath) {  
	    //如果sPath不以文件分隔符结尾，自动添加文件分隔符  
	    if (!sPath.endsWith(File.separator)) {  
	        sPath = sPath + File.separator;  
	    }  
	    File dirFile = new File(sPath);  
	    //如果dir对应的文件不存在，或者不是一个目录，则退出  
	    if (!dirFile.exists() || !dirFile.isDirectory()) {  
	        return false;  
	    }  
	    flag = true;  
	    //删除文件夹下的所有文件(包括子目录)  
	    File[] files = dirFile.listFiles();  
	    for (int i = 0; i < files.length; i++) {  
	        //删除子文件  
	        if (files[i].isFile()) {  
	            flag = deleteFile(files[i].getAbsolutePath());  
	            if (!flag) break;  
	        } //删除子目录  
	        else {  
	            flag = deleteDirectory(files[i].getAbsolutePath());  
	            if (!flag) break;  
	        }  
	    }  
	    if (!flag) return false;  
	    //删除当前目录  
	    if (dirFile.delete()) {  
	        return true;  
	    } else {  
	        return false;  
	    }  
	}

	public void test() {
		deleteFolder("C:/file/Enterprise/Pack/新建文本文档 (2).txt");
	} 
	
	
}
