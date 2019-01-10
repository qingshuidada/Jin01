package com.mdoa.work.dao;

import java.util.List;

import com.mdoa.framework.bo.DepartmentForm;
import com.mdoa.work.bo.WorkOfficeMessageFileForm;

public interface MessageFileDao {

	/**
	 * 添加文件或者文件夹
	 * @param workOfficeMessageFileForm
	 * @return
	 */
	boolean addFileFolder(WorkOfficeMessageFileForm workOfficeMessageFileForm);
	/**
	 * 查询文件夹或者文件
	 * @param workOfficeMessageFileForm
	 * @return
	 */
	List<WorkOfficeMessageFileForm> queryFileFolder(WorkOfficeMessageFileForm workOfficeMessageFileForm);
	/**
	 * 删除文件或者文件夹
	 * @param workOfficeMessageFileForm
	 * @return
	 */
	boolean deleteFileFolder(WorkOfficeMessageFileForm workOfficeMessageFileForm);
	/**
	 * 修改文件或者文件夹
	 * @param workOfficeMessageFileForm
	 * @return
	 */
	boolean updateFileFolder(WorkOfficeMessageFileForm workOfficeMessageFileForm);
	List<WorkOfficeMessageFileForm> queryFileUrlName(WorkOfficeMessageFileForm workOfficeMessageFileForm);
	


	
	
	
}
