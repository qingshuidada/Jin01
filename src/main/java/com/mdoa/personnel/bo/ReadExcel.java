package com.mdoa.personnel.bo;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;
import com.mdoa.personnel.model.PunishRecord;
import com.mdoa.util.DateUtil;



public class ReadExcel {

	//总行数  
    private int totalRows = 0;    
    //总条数  
    private int totalCells = 0;   
    //错误信息接收器  
    private String errorMsg;
	
    public ReadExcel() {
    	
	}
	public int getTotalRows() {
		return totalRows;
	}
	public void setTotalRows(int totalRows) {
		this.totalRows = totalRows;
	}
	public int getTotalCells() {
		return totalCells;
	}
	public void setTotalCells(int totalCells) {
		this.totalCells = totalCells;
	}
	public String getErrorMsg() {
		return errorMsg;
	}
	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}
	
	
	
	public List<PunishRecord> getExcelInfo(MultipartFile file) {
		
		String filename = file.getOriginalFilename();
		try {
			if(!validateExcel(filename)){
				return null;
			}
			boolean isExcel2003 = true;
			if(isExcel2007(filename)){
				isExcel2003 = false;
			}
			List<PunishRecord> punishRecordList = createExcel(file.getInputStream(), isExcel2003);
			return punishRecordList;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}	
	} 
    
	/** 
	 * 根据excel里面的内容读取客户信息 
	 * @param is 输入流 
	 * @param isExcel2003 excel是2003还是2007版本 
	 * @return 
	 * @throws IOException 
	 */
	private List<PunishRecord> createExcel(InputStream inputStream, boolean isExcel2003) {
		try{  
            Workbook wb = null;  
            if (isExcel2003) {// 当excel是2003时,创建excel2003  
                wb = new HSSFWorkbook(inputStream);  
            } else {// 当excel是2007时,创建excel2007  
                wb = new XSSFWorkbook(inputStream);  
            }  
           List<PunishRecord> list = readExcelValue(wb);// 读取Excel里面客户的信息  
           return list;
		} catch (IOException e) {  
            e.printStackTrace(); 
            return null; 
        }  
        
	}
	
	/** 
	 * 读取Excel里面客户的信息 
	 * @param wb 
	 * @return 
	 */
	private List<PunishRecord> readExcelValue(Workbook wb) {
		// 得到第一个shell  
        Sheet sheet = wb.getSheetAt(0);  
        // 得到Excel的行数  
        this.totalRows = sheet.getPhysicalNumberOfRows();  
        // 得到Excel的列数(前提是有行数)  
        if (totalRows > 1 && sheet.getRow(0) != null) {  
            this.totalCells = sheet.getRow(0).getPhysicalNumberOfCells();  
        } 
        List<PunishRecord> punishRecordList = new ArrayList<PunishRecord>();
     // 循环Excel行数  
        for (int r = 1; r < totalRows; r++) {  
            Row row = sheet.getRow(r);  
            if (row == null){  
                continue;  
            }  
            PunishRecord punishRecord = new PunishRecord();
            // 循环Excel的列  
            for (int c = 0; c < this.totalCells; c++) {  
                Cell cell = row.getCell(c);
                if (null != cell) {
                	if (c == 0) {
                		//得到罚款日期
                    	String str = DateUtil.dateToStr(cell.getDateCellValue());
                    	punishRecord.setDateStr(str);
                		/*System.out.println(cell.getStringCellValue());
                		System.out.println(cell.getDateCellValue());
                		System.out.println(cell.getCellType());*/
                    }else if (c == 1) {
                    	if(cell.getStringCellValue().equals("外来人员")){
                    		punishRecord.setType("2");
                    	}else{
                    		punishRecord.setType("1");
                    	}
                    	punishRecord.setDepartmentName(cell.getStringCellValue());
					}else if(c == 2){
						 if(cell.getCellType() == HSSFCell.CELL_TYPE_NUMERIC){  
	                         String invoiceNumber = String.valueOf(cell.getNumericCellValue());  
	                         punishRecord.setInvoiceNumber(invoiceNumber.substring(0, invoiceNumber.length()-2>0?invoiceNumber.length()-2:1));//性别  
	                     }else{  
	                    	 punishRecord.setUserName(cell.getStringCellValue());//性别  
	                     }
					}else if(c == 3){
                            punishRecord.setText(cell.getStringCellValue());//得到罚款理由
					}else if(c == 4){
                            punishRecord.setExecutorName(cell.getStringCellValue());//得到执行人
					}else if(c == 5){
						punishRecord.setAmount((int) cell.getNumericCellValue());//得到罚款金额
					}
                }
            }  
            // 添加到list  
            punishRecordList.add(punishRecord);  
        
        }
        return punishRecordList;
	}
	/** 
     * 验证EXCEL文件 
     *  
     * @param filePath 
     * @return 
     */  
    public boolean validateExcel(String filePath) {  
        if (filePath == null || !(isExcel2003(filePath) || isExcel2007(filePath))) {  
            errorMsg = "文件名不是excel格式";  
            return false;  
        }  
        return true;  
    } 
 // @描述：是否是2003的excel，返回true是2003   
    public static boolean isExcel2003(String filePath)  {    
         return filePath.matches("^.+\\.(?i)(xls)$");    
     }    
     
    //@描述：是否是2007的excel，返回true是2007   
    public static boolean isExcel2007(String filePath)  {    
         return filePath.matches("^.+\\.(?i)(xlsx)$");    
     }
	
	
	
	
	
	
	
	
	
	
}
