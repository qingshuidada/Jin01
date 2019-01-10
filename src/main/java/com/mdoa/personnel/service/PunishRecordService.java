package com.mdoa.personnel.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.base.model.PageModel;
import com.mdoa.personnel.bo.ReadExcel;
import com.mdoa.personnel.dao.PunishRecordDao;
import com.mdoa.personnel.model.PunishRecord;
import com.mdoa.util.ExcelModel;
import com.mdoa.util.ExcelUtil;
import com.mdoa.util.JSONUtil;
import com.mdoa.util.StringUtil;

@Service
@Transactional
public class PunishRecordService {

    @Autowired
    private PunishRecordDao punishRecordDao;

    public void addPunishRecord(PunishRecord punishRecord) {
	if (!StringUtil.isEmpty(punishRecord.getUserId())) {
	    punishRecord.setType("1");
	} else {
	    punishRecord.setType("2");
	}
	if (!punishRecordDao.addPunishRecord(punishRecord)) {
	    throw new RuntimeException("添加惩罚记录失败");
	}
    }

    public PageModel<PunishRecord> selectPunishRecord(PunishRecord punishRecord) {
	if (!StringUtil.isEmpty(punishRecord.getUserName())) {
	    punishRecord.setUserName("'" + punishRecord.getUserName() + "%'");
	}
	if (!StringUtil.isEmpty(punishRecord.getDepartmentName())) {
	    punishRecord.setDepartmentName("'" + punishRecord.getDepartmentName() + "%'");
	}
	if (!StringUtil.isEmpty(punishRecord.getInvoiceNumber())) {
	    punishRecord.setInvoiceNumber("'" + punishRecord.getInvoiceNumber() + "%'");
	}
	PageHelper.startPage(punishRecord.getPage(), punishRecord.getRows());
	List<PunishRecord> list = punishRecordDao.selectPunishRecord(punishRecord);
	PageModel<PunishRecord> pageModel = new PageModel<>((Page<PunishRecord>) list);
	return pageModel;
    }

    public void updatePunishRecord(PunishRecord punishRecord) {
	if (!punishRecordDao.updatePunishRecord(punishRecord)) {
	    throw new RuntimeException("修改惩罚记录失败");
	}
    }
    
    /**
     * 导出奖惩记录到excel
     * @param punishRecord
     * @param jsonString
     * @param filePath
     */
    public void writeRewardPenaltiesToExcel(PunishRecord punishRecord, String jsonString, String filePath) throws Exception{
	List<ExcelModel> modelDetails = JSONUtil.jsonToExcelModelList(jsonString);
	List<PunishRecord> list = punishRecordDao.selectPunishRecordForExcel(punishRecord);
	ExcelUtil.writeListToExcel(filePath, list, modelDetails);
    }
    
    /**
     * 读取excel中的数据,生成list 
     * @param file
     */
    public void readExcelFile(MultipartFile file){
    	//创建处理EXCEL的类  
        ReadExcel readExcel=new ReadExcel();  
        //解析excel，获取上传的事件单  
        List<PunishRecord> list = readExcel.getExcelInfo(file);
        for (PunishRecord punishRecord : list) {
			if(!punishRecordDao.addPunishRecord(punishRecord)){
				throw new RuntimeException("保存失败");
			}
		}
        if(list != null && list.isEmpty()){
        	throw new RuntimeException("上传失败");
        }
    }
    
    
    
}
