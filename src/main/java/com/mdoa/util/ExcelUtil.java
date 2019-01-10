package com.mdoa.util;

import java.beans.PropertyDescriptor;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FilterOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.resource.cci.Record;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import com.fr.third.v2.org.apache.poi.hssf.usermodel.HSSFDataFormatter;
import com.mdoa.erp.bo.EcoWorkshopTabData;
import com.mdoa.erp.bo.EconomicTabData;
import com.mdoa.erp.bo.WorkshopTabData;
import com.mdoa.repertory.model.RepertoryGoodsType;
import com.mdoa.repertory.model.crosstab.CrosstabModel;
import com.mdoa.repertory.model.crosstab.DepartmentModel;
import com.mdoa.repertory.model.crosstab.DepartmentUseModel;
import com.mdoa.repertory.model.crosstab.TypeUseDataModel;
import com.mdoa.salary.bo.SalaryInfoForm;

/**
 * 处理Excel导入导出的工具类
 * 
 * @author Administrator
 *
 */
public class ExcelUtil {

	/**
	 * 导出数据到Excel
	 * 
	 * @param fileUrl
	 *            文件路径
	 * @param modelList
	 *            数据集合
	 */
	@SuppressWarnings("resource")
	public static void writeListToExcel(String fileUrl, List<?> modelList, List<ExcelModel> modelDetails)
			throws Exception {
		// 工作薄
		Workbook workbook = null;
		if (fileUrl.endsWith("xls")) {
			workbook = new XSSFWorkbook();
		} else if (fileUrl.endsWith("xlsx")) {
			workbook = new HSSFWorkbook();
		} else {
			throw new RuntimeException("非法文件名,仅支持.xls与.xlsx文件");
		}
		if (modelList == null || modelList.size() == 0)
			throw new RuntimeException("数据集合为空或大小为0");
		if (modelDetails.isEmpty())
			throw new RuntimeException("Excel详细设置为空");
		File file = new File(fileUrl);
		File fileFolder = new File(fileUrl.substring(0, fileUrl.lastIndexOf("/") + 1));
		if (!fileFolder.exists()) {
			fileFolder.mkdirs();
		}
		// 创建工作表
		Sheet sheet = workbook.createSheet();
		// 创建工作表样式
		CellStyle cellStyle = workbook.createCellStyle();
		// 设置对齐方式居中
		cellStyle.setAlignment(CellStyle.ALIGN_CENTER);
		// 行数计数器
		int rowIndex = 0;
		// 创建第一行
		Row headRow = sheet.createRow(rowIndex++);
		// 列号计数器
		int columnIndex = 0;
		// 获取详细设置集合大小
		int detailsSize = modelDetails.size();
		// 生成表头(第一行)的所有列 并将属性名添加进集合中
		for (int i = 0; i < detailsSize; i++) {
			// 获取单列详细设置对象
			ExcelModel excelModel = modelDetails.get(i);
			// 获取列宽
			Integer columnWidth = excelModel.getColumnWidth();
			// 设置列宽
			if (columnWidth != null) {
				sheet.setColumnWidth(columnIndex, columnWidth * 256);
			} else {
				sheet.setColumnWidth(columnIndex, 20 * 256);// 默认值
			}
			// 创建列
			Cell cell = headRow.createCell(columnIndex++);
			// 获取表头
			String tableHeader = excelModel.getTableHeader();
			// 设置表头
			cell.setCellValue(tableHeader);
			// 设置表头列风格
			cell.setCellStyle(cellStyle);
		}
		// 获取数据模板
		Class<?> classModel = modelList.get(0).getClass();
		// 获取数据集合大小
		int modelsSize = modelList.size();
		// 遍历数据集合 插入余下的所有行
		for (int i = 0; i < modelsSize; i++) {
			// 获取单个数据
			Object object = modelList.get(i);
			// 生成单行
			Row row = sheet.createRow(rowIndex++);
			// 遍历属性名 反射获取数据的对应属性值并填入对应列
			for (int j = 0; j < detailsSize; j++) {
				// 获取单列详细设置对象
				ExcelModel excelModel = modelDetails.get(j);
				// 获取单列属性名
				String propertyName = excelModel.getPropertyName();
				// 获取单列属性值类型
				String propertyType = excelModel.getPropertyType();
				// 获取单列数据格式
				String dateFormat = excelModel.getDateFormat();
				// 获取存储器
				PropertyDescriptor propertyDescriptor = new PropertyDescriptor(propertyName, classModel);// 获取存储器时可能抛出异常
				// 获取属性的get方法
				Method getPropertyMethod = propertyDescriptor.getReadMethod();
				// 属性值
				Object propertyValue = null;
				if (getPropertyMethod != null) {
					propertyValue = getPropertyMethod.invoke(object);// object没有该属性的get方法时可能抛出异常
				} else {
					throw new RuntimeException("存储器内无该属性的get方法");
				}
				// 生成单列
				Cell cell = row.createCell(j);
				// 根据属性类型不同调用不同参数的设置列值的方法
				switch (propertyType) {
				case "String":
					cell.setCellValue((String) propertyValue);
					break;
				case "Integer":
					cell.setCellValue((Integer) propertyValue);
					break;
				case "Double":
					if (propertyValue != null) {
						cell.setCellValue((Double) propertyValue);
					}
					break;
				/*
				 * case "Date": if(!StringUtil.isEmpty(dateFormat)){ //设置日期格式
				 * String dateStr = DateUtil.dateToStr((Date)propertyValue,
				 * dateFormat); cell.setCellValue(dateStr); }else{
				 * cell.setCellValue(DateUtil.dateToStr((Date)propertyValue)); }
				 * break;
				 */
				default:
					cell.setCellValue((String) propertyValue);
					break;
				}
				cell.setCellStyle(cellStyle);
			}
		}
		// 写入数据到Excel文件 文件输出流
		FileOutputStream fileOutputStream = new FileOutputStream(file);// 可能抛出找不到文件的异常
		// 输出缓冲流
		BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(fileOutputStream);
		// 写入数据
		workbook.write(bufferedOutputStream);// 可能抛出IO异常
		if (fileOutputStream != null) {
			fileOutputStream.close();// 可能抛出异常
		}
		workbook.close();// 可能抛出异常
	}

	/**
	 * 导出 经济指标-车间 交叉表到Excel
	 * 
	 * @param fileUrl
	 *            文件路径
	 * @param ecoWorkshopTabData
	 *            交叉表相关数据
	 */
	public static void writeCrossTabToExcel(String fileUrl, EcoWorkshopTabData ecoWorkshopTabData) throws Exception {
		// 工作薄
		Workbook workbook = null;
		if (fileUrl.endsWith("xls")) {
			workbook = new XSSFWorkbook();
		} else if (fileUrl.endsWith("xlsx")) {
			workbook = new HSSFWorkbook();
		} else {
			throw new RuntimeException("非法文件名,仅支持.xls与.xlsx文件");
		}
		File file = new File(fileUrl);
		File fileFolder = new File(fileUrl.substring(0, fileUrl.lastIndexOf("/") + 1));
		if (!fileFolder.exists()) {
			fileFolder.mkdirs();
		}
		// 创建工作表
		Sheet sheet = workbook.createSheet();
		// 创建工作表样式
		CellStyle cellStyle = workbook.createCellStyle();
		// 设置对齐方式居中
		cellStyle.setAlignment(CellStyle.ALIGN_CENTER_SELECTION);
		cellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
		cellStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		cellStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		cellStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);

		// 车间名集合 横向表头
		List<WorkshopTabData> workshopTabDatas = ecoWorkshopTabData.getWorkshopTabDatas();
		// 经济指标名集合 纵向表头
		List<EconomicTabData> economicTabDatas = ecoWorkshopTabData.getEconomicTabDatas();
		// 数值HashMap
		HashMap<String, Double> numberDatas = ecoWorkshopTabData.getNumberDatas();
		if (numberDatas == null) {
			numberDatas = new HashMap<>();
		}
		if (workshopTabDatas == null || economicTabDatas == null) {
			if (workbook != null) {
				((FilterOutputStream) workbook).close();
			}
			throw new RuntimeException("表头数据为空，导出excel失败");
		}

		// 行号计数器
		int rowIndex = 0;
		// 总行数
		int rowSize = 2 + 2 + 2 + 1;// 标题两行 + 表头两行 + 合计两行 + 备注一行
		// 总列数
		int columnSize = workshopTabDatas.size() * 4 + 4 + 2;// 每个表头跨四列 + 全公司四列
		// + “各项经济指标”两列
		List<EconomicTabData> rateEcnomics = new ArrayList<>();// 有数率非产值指标
		List<EconomicTabData> noRateEcnomics = new ArrayList<>();// 无数率非产值指标
		List<EconomicTabData> outputEcnomics = new ArrayList<>();// 产值指标
		// 计算总行数 并将经济指标分类
		for (int i = 0; i < economicTabDatas.size(); i++) {
			EconomicTabData economicTabData = economicTabDatas.get(i);
			if ("1".equals(economicTabData.getCountRate())) {
				rowSize += 2;
				rateEcnomics.add(economicTabData);
			} else {
				rowSize++;
				if ("0".equals(economicTabData.getOutputValue())) {
					noRateEcnomics.add(economicTabData);
				} else {
					outputEcnomics.add(economicTabData);
				}
			}
		}

		Row titleRow = sheet.createRow(rowIndex++);
		Row exRow = sheet.createRow(rowIndex++);
		titleRow.setRowStyle(cellStyle);
		exRow.setRowStyle(cellStyle);
		CellRangeAddress titleCellRange = new CellRangeAddress(0, 1, 0, columnSize - 1);
		sheet.addMergedRegion(titleCellRange);
		Cell titleCell = titleRow.createCell(0);
		titleCell.setCellValue("杭州航民达美染整有限公司 " + ecoWorkshopTabData.getReportFormsDate() + " 各项情况日报表");
		Font font = workbook.createFont();
		font.setFontHeightInPoints((short) 15);
		font.setBoldweight(Font.BOLDWEIGHT_BOLD);
		CellStyle titleStyle = workbook.createCellStyle();
		titleStyle.setAlignment(CellStyle.ALIGN_CENTER_SELECTION);
		titleStyle.setBorderTop(CellStyle.BORDER_NONE);
		titleStyle.setBorderBottom(CellStyle.BORDER_NONE);
		titleStyle.setBorderLeft(CellStyle.BORDER_NONE);
		titleStyle.setBorderRight(CellStyle.BORDER_NONE);
		titleStyle.setFont(font);
		titleCell.setCellStyle(titleStyle);

		// 横向表头两行
		Row headRow = sheet.createRow(rowIndex++);
		Row secondRow = sheet.createRow(rowIndex++);
		headRow.setRowStyle(cellStyle);
		secondRow.setRowStyle(cellStyle);
		for (int i = 0; i < columnSize; i++) {
			Cell headCell = headRow.createCell(i);
			Cell secondCell = secondRow.createCell(i);
			int headCount = (i - 2) / 4;
			CellRangeAddress headCellRange = null;
			CellRangeAddress secondCellRange = null;
			WorkshopTabData workshopTabData = null;
			if (headCount < workshopTabDatas.size()) {
				workshopTabData = workshopTabDatas.get(headCount);
			}
			String reportFormsDate = ecoWorkshopTabData.getReportFormsDate();
			int days = 1;
			if (reportFormsDate != null) {
				String date = reportFormsDate.split("-")[2];
				days = Integer.parseInt(date);
			}
			Row recordRow = null;
			Cell recordCell = null;
			CellRangeAddress recordCellRange = null;
			if (i % 2 == 0) {
				if (i == 0) {
					// 0行0,1列的处理
					headCell.setCellValue("各项经济指标");
					headCellRange = new CellRangeAddress(2, 3, 0, 1);
					// 备注行处理
					recordRow = sheet.createRow(rowSize - 1);
					recordRow.setRowStyle(cellStyle);
					recordCellRange = new CellRangeAddress(rowSize - 1, rowSize - 1, 0, 1);
					recordCell = recordRow.createCell(0);
					recordCell.setCellValue("备注");
					recordCell.setCellStyle(cellStyle);
				} else {
					// 第0行的各列处理(except 0 1)
					if ((i - 2) % 4 == 0) {
						if (headCount < workshopTabDatas.size()) {
							headCell.setCellValue(workshopTabData.getWorkshopName());
						} else {
							headCell.setCellValue("全公司");
						}
						headCellRange = new CellRangeAddress(2, 2, i, i + 3);
					}
					// 第1行、备注行的各列处理(except 0 1)
					recordRow = sheet.getRow(rowSize - 1);
					recordCell = recordRow.createCell(i);
					if ((i - 2) / 2 % 2 == 0) {
						secondCell.setCellValue("日量");
						recordCell.setCellValue("");
						recordCell.setCellStyle(cellStyle);
					} else {
						secondCell.setCellValue("月累计");
						String key = "";
						if (headCount < workshopTabDatas.size()) {
							key = workshopTabData.getWorkshopId() + "_output_month";
						} else {
							key = "output_month_total";
						}
						Double value = numberDatas.get(key);
						if (value != null) {
							Double recordValue = value / days / 10000;
							recordCell.setCellValue(recordValue);
						}
						DataFormat dataFormat = workbook.createDataFormat();
						CellStyle recordStyle = workbook.createCellStyle();
						recordStyle.setDataFormat(dataFormat.getFormat("#0.00万"));
						recordStyle.setAlignment(CellStyle.ALIGN_CENTER_SELECTION);
						recordStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
						recordStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
						recordStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
						recordStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
						recordCell.setCellStyle(recordStyle);
					}
					secondCellRange = new CellRangeAddress(3, 3, i, i + 1);
					recordCellRange = new CellRangeAddress(rowSize - 1, rowSize - 1, i, i + 1);
				}

				// 非产量无数率经济指标行的各列处理
				for (int j = 0; j < noRateEcnomics.size(); j++) {
					Row row = null;
					if (sheet.getRow(rowIndex + j) == null) {
						row = sheet.createRow(rowIndex + j);
					} else {
						row = sheet.getRow(rowIndex + j);
					}
					row.setRowStyle(cellStyle);
					CellRangeAddress cellRangeAddress = new CellRangeAddress(rowIndex + j, rowIndex + j, i, i + 1);
					sheet.addMergedRegion(cellRangeAddress);// 合并单元格
					EconomicTabData economicTabData = noRateEcnomics.get(j);
					Cell cell = row.createCell(i);
					cell.setCellStyle(cellStyle);
					if (i == 0) {
						cell.setCellValue(economicTabData.getEconomicName());
					} else {
						String key = "";
						if ((i - 2) / 2 % 2 == 0) {
							if (headCount < workshopTabDatas.size()) {
								// 单车间单指标日量
								key = workshopTabData.getWorkshopId() + "_" + economicTabData.getEconomicId() + "_day";
							} else {
								// 全公司单指标日量合计
								key = economicTabData.getEconomicId() + "_day_total";
							}
						} else {
							if (headCount < workshopTabDatas.size()) {
								// 单车间单指标月累计
								key = workshopTabData.getWorkshopId() + "_" + economicTabData.getEconomicId()
										+ "_month";
							} else {
								// 单车间单指标月累计合计
								key = economicTabData.getEconomicId() + "_month_total";
							}
						}
						Double value = numberDatas.get(key);
						value = StringUtil.subZeroAndDot(value);
						if (value != null) {
							cell.setCellValue(value);
						}
					}
				}
				int noRateSize = noRateEcnomics.size();
				// 产值行的各列处理
				for (int k = 0; k < outputEcnomics.size(); k++) {
					Row row = null;
					if (sheet.getRow(rowIndex + noRateSize + k) == null) {
						row = sheet.createRow(rowIndex + noRateSize + k);
					} else {
						row = sheet.getRow(rowIndex + noRateSize + k);
					}
					row.setRowStyle(cellStyle);
					CellRangeAddress cellRangeAddress = new CellRangeAddress(rowIndex + noRateSize + k,
							rowIndex + noRateSize + k, i, i + 1);
					sheet.addMergedRegion(cellRangeAddress);// 合并单元格
					EconomicTabData economicTabData = outputEcnomics.get(k);
					Cell cell = row.createCell(i);
					cell.setCellStyle(cellStyle);
					if (i == 0) {
						cell.setCellValue(economicTabData.getEconomicName());
					} else {
						String key = "";
						if ((i - 2) / 2 % 2 == 0) {
							if (headCount < workshopTabDatas.size()) {
								// 单车间单指标日量
								key = workshopTabData.getWorkshopId() + "_" + economicTabData.getEconomicId()
										+ "_output_day";
							} else {
								// 全公司单指标日量合计
								key = economicTabData.getEconomicId() + "_day_total";
							}
						} else {
							if (headCount < workshopTabDatas.size()) {
								// 单车间单指标月累计
								key = workshopTabData.getWorkshopId() + "_" + economicTabData.getEconomicId()
										+ "_output_month";
							} else {
								// 单车间单指标月累计合计
								key = economicTabData.getEconomicId() + "_month_total";
							}
						}
						Double value = numberDatas.get(key);
						value = StringUtil.subZeroAndDot(value);
						if (value != null) {
							cell.setCellValue(value);
						}
					}
				}
				int outputSize = outputEcnomics.size();
				int startSize = rowIndex + noRateSize + outputSize;
				int amountRowNumber = 0;
				int rateRowNumber = 0;
				// 有数率非产量行的各列处理
				Row amountRow = null;// 数行
				Row rateRow = null;// 率行
				for (int l = 0; l < rateEcnomics.size(); l++) {
					amountRowNumber = startSize + l * 2;
					rateRowNumber = startSize + l * 2 + 1;
					if (sheet.getRow(amountRowNumber) == null) {
						amountRow = sheet.createRow(amountRowNumber);
					} else {
						amountRow = sheet.getRow(amountRowNumber);
					}
					if (sheet.getRow(rateRowNumber) == null) {
						rateRow = sheet.createRow(rateRowNumber);
					} else {
						rateRow = sheet.getRow(rateRowNumber);
					}
					EconomicTabData economicTabData = rateEcnomics.get(l);
					amountRow.setRowStyle(cellStyle);
					rateRow.setRowStyle(cellStyle);
					if (i == 0) {
						CellRangeAddress cellRangeAddress = new CellRangeAddress(amountRowNumber, rateRowNumber, 0, 0);
						sheet.addMergedRegion(cellRangeAddress);
						Cell cell = amountRow.createCell(0);
						cell.setCellStyle(cellStyle);
						cell.setCellValue(economicTabData.getEconomicName());
						Cell amountCell = amountRow.createCell(1);
						Cell rateCell = rateRow.createCell(1);
						amountCell.setCellStyle(cellStyle);
						rateCell.setCellStyle(cellStyle);
						amountCell.setCellValue("数");
						rateCell.setCellValue("率");
					} else {
						CellRangeAddress amountCellRange = new CellRangeAddress(amountRowNumber, amountRowNumber, i,
								i + 1);
						CellRangeAddress rateCellRange = new CellRangeAddress(rateRowNumber, rateRowNumber, i, i + 1);
						sheet.addMergedRegion(amountCellRange);
						sheet.addMergedRegion(rateCellRange);
						Cell amountCell = amountRow.createCell(i);
						Cell rateCell = rateRow.createCell(i);
						amountCell.setCellStyle(cellStyle);
						rateCell.setCellStyle(cellStyle);
						String key = "";
						String outputKey = "";
						if ((i - 2) / 2 % 2 == 0) {
							if (headCount < workshopTabDatas.size()) {
								// 单车间单指标日量
								key = workshopTabData.getWorkshopId() + "_" + economicTabData.getEconomicId() + "_day";
								outputKey = workshopTabData.getWorkshopId() + "_output_day";
							} else {
								// 全公司单指标日量合计
								key = economicTabData.getEconomicId() + "_day_total";
								outputKey = "output_day_total";
							}
						} else {
							if (headCount < workshopTabDatas.size()) {
								// 单车间单指标月累计
								key = workshopTabData.getWorkshopId() + "_" + economicTabData.getEconomicId()
										+ "_month";
								outputKey = workshopTabData.getWorkshopId() + "_output_month";
							} else {
								// 全公司单指标月累计合计
								key = economicTabData.getEconomicId() + "_month_total";
								outputKey = "output_month_total";
							}
						}
						Double value = numberDatas.get(key);
						Double outputValue = numberDatas.get(outputKey);
						Double rateValue = null;
						if (outputValue != null && value != null) {
							if (outputValue == 0 || value == 0) {
								rateValue = 0.00;
							} else {
								rateValue = value / outputValue;
							}
							value = StringUtil.subZeroAndDot(value);
						}
						if (value != null) {
							amountCell.setCellValue(value);
						}
						DataFormat dataFormat = workbook.createDataFormat();
						CellStyle style = workbook.createCellStyle();
						style.setDataFormat(dataFormat.getFormat("#0.00%"));
						style.setAlignment(CellStyle.ALIGN_CENTER_SELECTION);
						style.setBorderTop(HSSFCellStyle.BORDER_THIN);
						style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
						style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
						style.setBorderRight(HSSFCellStyle.BORDER_THIN);
						rateCell.setCellStyle(style);
						if (rateValue != null) {
							rateCell.setCellValue(rateValue);
						}
					}
				}
				// 合计行 各列处理
				amountRowNumber = startSize + rateEcnomics.size() * 2;
				rateRowNumber = startSize + rateEcnomics.size() * 2 + 1;
				if (sheet.getRow(amountRowNumber) == null) {
					amountRow = sheet.createRow(amountRowNumber);
				} else {
					amountRow = sheet.getRow(amountRowNumber);
				}
				if (sheet.getRow(rateRowNumber) == null) {
					rateRow = sheet.createRow(rateRowNumber);
				} else {
					rateRow = sheet.getRow(rateRowNumber);
				}
				amountRow.setRowStyle(cellStyle);
				rateRow.setRowStyle(cellStyle);
				if (i == 0) {
					CellRangeAddress cellRangeAddress = new CellRangeAddress(amountRowNumber, rateRowNumber, 0, 0);
					sheet.addMergedRegion(cellRangeAddress);
					Cell cell = amountRow.createCell(0);
					cell.setCellStyle(cellStyle);
					cell.setCellValue("合计");
					Cell amountCell = amountRow.createCell(1);
					Cell rateCell = rateRow.createCell(1);
					amountCell.setCellStyle(cellStyle);
					rateCell.setCellStyle(cellStyle);
					amountCell.setCellValue("数");
					rateCell.setCellValue("率");
				} else {
					CellRangeAddress amountCellRange = new CellRangeAddress(amountRowNumber, amountRowNumber, i, i + 1);
					CellRangeAddress rateCellRange = new CellRangeAddress(rateRowNumber, rateRowNumber, i, i + 1);
					sheet.addMergedRegion(amountCellRange);
					sheet.addMergedRegion(rateCellRange);
					Cell amountCell = amountRow.createCell(i);
					Cell rateCell = rateRow.createCell(i);
					amountCell.setCellStyle(cellStyle);
					rateCell.setCellStyle(cellStyle);
					String key = "";
					String outputKey = "";
					if ((i - 2) / 2 % 2 == 0) {
						if (headCount < workshopTabDatas.size()) {
							// 单车间所有指标日量合计
							key = workshopTabData.getWorkshopId() + "_day_total";
							outputKey = workshopTabData.getWorkshopId() + "_output_day";
						} else {
							// 全公司所有指标日量合计
							key = "all_day_total";
							outputKey = "output_day_total";
						}
					} else {
						if (headCount < workshopTabDatas.size()) {
							// 单车间所有指标月累计合计
							key = workshopTabData.getWorkshopId() + "_month_total";
							outputKey = workshopTabData.getWorkshopId() + "_output_month";
						} else {
							// 全公司所有指标月累计合计
							key = "all_month_total";
							outputKey = "output_month_total";
						}
					}
					Double value = numberDatas.get(key);
					Double outputValue = numberDatas.get(outputKey);
					Double rateValue = null;
					if (outputValue != null && value != null) {
						if (outputValue == 0 || value == 0) {
							rateValue = 0.00;
						} else if (outputValue != null && value != null) {
							rateValue = value / outputValue;
						}
					}
					if (value != null) {
						amountCell.setCellValue(StringUtil.subZeroAndDot(value));
					}
					DataFormat dataFormat = workbook.createDataFormat();
					CellStyle style = workbook.createCellStyle();
					style.setDataFormat(dataFormat.getFormat("#0.00%"));
					style.setAlignment(CellStyle.ALIGN_CENTER_SELECTION);
					style.setBorderTop(HSSFCellStyle.BORDER_THIN);
					style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
					style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
					style.setBorderRight(HSSFCellStyle.BORDER_THIN);
					rateCell.setCellStyle(style);
					if (rateValue != null) {
						rateCell.setCellValue(rateValue);
					}
				}
			}

			if (headCellRange != null) {
				sheet.addMergedRegion(headCellRange);
			}
			if (secondCellRange != null) {
				sheet.addMergedRegion(secondCellRange);
			}
			if (recordCellRange != null) {
				sheet.addMergedRegion(recordCellRange);
			}
			headCell.setCellStyle(cellStyle);
			secondCell.setCellStyle(cellStyle);
			sheet.setColumnWidth(i, 6 * 256);
		}

		// 写入数据到Excel文件 文件输出流
		FileOutputStream fileOutputStream = new FileOutputStream(file);// 可能抛出找不到文件的异常
		// 输出缓冲流
		BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(fileOutputStream);
		// 写入数据
		workbook.write(bufferedOutputStream);// 可能抛出IO异常
		if (fileOutputStream != null) {
			fileOutputStream.close();// 可能抛出异常
		}
		workbook.close();// 可能抛出异常
	}

	/**
	 * 导出数据到Excel
	 * 
	 * @param fileUrl
	 *            文件路径
	 * @param modelList
	 *            数据集合
	 */
	public static void writeCrosstabToExcel(String fileUrl, CrosstabModel crosstab) throws Exception {
		int rowCount = 0;

		Workbook workbook = new XSSFWorkbook();
		// 创建工作表
		Sheet sheet = workbook.createSheet();
		// 创建工作表样式
		CellStyle cellStyle = workbook.createCellStyle();
		// 设置对齐方式居中
		cellStyle.setAlignment(CellStyle.ALIGN_CENTER);
		cellStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN); // 下边框
		cellStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);// 左边框
		cellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);// 上边框
		cellStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);// 右边框

		// 创建第一行
		Row headRow = sheet.createRow(rowCount);
		rowCount++;
		// 创建第一行的第一个部门格子
		sheet.setColumnWidth(0, 20 * 256);
		Cell firstCell = headRow.createCell(0);
		firstCell.setCellStyle(cellStyle);
		firstCell.setCellValue("用途");
		// 填充第一行中的信息
		List<RepertoryGoodsType> goodsTypes = crosstab.getGoodsTypes();
		for (int i = 0; i <= goodsTypes.size(); i++) {
			if (i < goodsTypes.size()) {
				sheet.setColumnWidth(i + 1, 20 * 256);
				Cell cell = headRow.createCell(i + 1);
				cell.setCellStyle(cellStyle);
				cell.setCellValue(goodsTypes.get(i).getGoodsTypeName());
			} else {
				// 创建结尾的总计格子
				sheet.setColumnWidth(i + 1, 20 * 256);
				Cell lastCell = headRow.createCell(i + 1);
				lastCell.setCellStyle(cellStyle);
				lastCell.setCellValue("合计");
			}
		}
		// 组装各部门的分类统计信息
		List<DepartmentModel> deptDatas = crosstab.getDeptDatas();
		for (int i = 0; i < deptDatas.size(); i++) {
			// 组装用途信息
			List<DepartmentUseModel> deptUseModels = deptDatas.get(i).getDeptUseModels();
			if (deptUseModels != null) {
				for (int j = 0; j < deptUseModels.size(); j++) {
					Row useName = sheet.createRow(rowCount);
					rowCount++;
					Cell useNameCell = useName.createCell(0);
					useNameCell.setCellStyle(cellStyle);
					useNameCell.setCellValue(deptUseModels.get(j).getUseTypeValue());
					// 组装具体的用途种类数据
					List<TypeUseDataModel> typeUseDataModels = deptUseModels.get(j).getTypeUseDataModels();
					Double sum1 = 0d;
					for (int f = 0; f <= typeUseDataModels.size(); f++) {
						if (f < typeUseDataModels.size()) {
							Cell useDataCell = useName.createCell(f + 1);
							useDataCell.setCellStyle(cellStyle);
							useDataCell.setCellValue(typeUseDataModels.get(f).getAmount());
							if (!StringUtil.isEmpty(typeUseDataModels.get(f).getAmount()))
								sum1 += Double.parseDouble(typeUseDataModels.get(f).getAmount());
						} else {
							Cell useDataCell = useName.createCell(f + 1);
							useDataCell.setCellStyle(cellStyle);
							useDataCell.setCellValue(sum1);
						}
					}
				}
			}

			Row deptRow = sheet.createRow(rowCount);
			rowCount++;
			Cell deptCell = deptRow.createCell(0);
			deptCell.setCellStyle(cellStyle);
			deptCell.setCellValue(deptDatas.get(i).getDepartmentName());
			// 组装部门统计信息
			List<TypeUseDataModel> typeUseDatas = deptDatas.get(i).getTypeUseDatas();
			Double sum2 = 0d;
			for (int j = 0; j <= typeUseDatas.size(); j++) {
				if (j < typeUseDatas.size()) {
					Cell dataCell = deptRow.createCell(j + 1);
					dataCell.setCellStyle(cellStyle);
					dataCell.setCellValue(typeUseDatas.get(j).getAmount());
					if (!StringUtil.isEmpty(typeUseDatas.get(j).getAmount()))
						sum2 += Double.parseDouble(typeUseDatas.get(j).getAmount());
				} else {
					Cell dataCell = deptRow.createCell(j + 1);
					dataCell.setCellStyle(cellStyle);
					dataCell.setCellValue(sum2);
				}
			}
		}

		// 组装最终的所有部门的分类合计信息
		Row totalRow = sheet.createRow(rowCount);
		rowCount++;
		Cell totalNameCell = totalRow.createCell(0);
		totalNameCell.setCellStyle(cellStyle);
		totalNameCell.setCellValue("合计");
		List<TypeUseDataModel> typeAmounts = crosstab.getTypeAmounts();
		Double sum3 = 0d;
		for (int i = 0; i <= typeAmounts.size(); i++) {
			if (i < typeAmounts.size()) {
				Cell totalCell = totalRow.createCell(i + 1);
				totalCell.setCellStyle(cellStyle);
				totalCell.setCellValue(typeAmounts.get(i).getAmount());
				if (!StringUtil.isEmpty(typeAmounts.get(i).getAmount()))
					sum3 += Double.parseDouble(typeAmounts.get(i).getAmount());
			} else {
				Cell totalCell = totalRow.createCell(i + 1);
				totalCell.setCellStyle(cellStyle);
				totalCell.setCellValue(sum3);
			}
		}
		writeExcelFile(fileUrl, workbook);
	}

	/**
	 * 私有方法，将poi的excel对象输出到文件中
	 * 
	 * @param fileUrl
	 *            将要进行输出的文件路径
	 * @param workbook
	 *            poi的excel对象
	 */
	private static void writeExcelFile(String fileUrl, Workbook workbook) throws IOException {

		// 输出excel文件
		File file = new File(fileUrl);
		File fileFolder = new File(fileUrl.substring(0, fileUrl.lastIndexOf("/") + 1));
		if (!fileFolder.exists()) {
			fileFolder.mkdirs();
		}
		// 写入数据到Excel文件 文件输出流
		FileOutputStream fileOutputStream = new FileOutputStream(file);// 可能抛出找不到文件的异常
		// 输出缓冲流
		BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(fileOutputStream);
		// 写入数据
		workbook.write(bufferedOutputStream);// 可能抛出IO异常
		if (fileOutputStream != null) {
			fileOutputStream.close();// 可能抛出异常
		}
		workbook.close();// 可能抛出异常
	}


	/**
	 * 从excel读取数据
	 * 
	 * @param fileName
	 * @return
	 */
	public static List<SalaryInfoForm> readSalaryInfoFromExcel(MultipartFile excelFile,String fileName) throws Exception {
		String[] names = {"setUserAccount","setUserName","setFinalPayAmount","setClassLevel","setDailyWage"
				,"setMonthlyPay","setDays","setTotalPayAmount","setNightShift","setNightShiftAmount","setSubsidyAmount"
				,"setActualPayAmount","setAwardAmount","setOvertimePayAmount","setCommunicationAmount","setOtherAmount"
				,"setWithholdAmount","setInsuranceAmount","setDepartmentName","setPostName","setMonthDate"};
		Map<Integer, String> methodsName = new HashMap<>();
		for(int i = 0; i < names.length; i++){
			methodsName.put(i, names[i]);
		}
		//设置各属性set方法名
		SalaryInfoForm.setPropertyMethods(methodsName);
		List<SalaryInfoForm> modelList = new ArrayList();
		// 获取文件输入流
		//FileInputStream fis = new FileInputStream(fileName);
		InputStream is = excelFile.getInputStream();
		//根据文件后缀名创建表单
		Workbook workbook = null;
		if (fileName.toLowerCase().endsWith("xlsx")) {
			workbook = WorkbookFactory.create(is);
		} else if (fileName.toLowerCase().endsWith("xls")) {
			workbook = new HSSFWorkbook(is);
		}
		//获取sheet数
		int numberOfSheets = workbook.getNumberOfSheets();
		//循环遍历所有sheet
		for (int i = 0; i < numberOfSheets; i++) {
			//从工作簿中获取单个sheet
			Sheet sheet = workbook.getSheetAt(i);
			//获取sheet的行迭代器  并遍历每一行
			Iterator<Row> rowIterator = sheet.iterator();
			while (rowIterator.hasNext()) {
				//获取每一行
				Row row = rowIterator.next();
				if(row.getRowNum() == 0)
					continue;
				//每一行都有若干列 获取每一行的列迭代器 并遍历每一列
				Iterator<Cell> cellIterator = row.cellIterator();
				SalaryInfoForm salaryInfoForm = new SalaryInfoForm();
				while (cellIterator.hasNext()) {
					//获取单个单元格
					Cell cell = cellIterator.next();
					int columnIndex = cell.getColumnIndex();
					Object value = null;
					switch (cell.getCellType()) {
					case Cell.CELL_TYPE_STRING:
						value = cell.getStringCellValue();
						System.out.println("string:" + value);
						try {
							salaryInfoForm.setProperty((String)value, columnIndex);
						} catch (Exception e) {
						}
						break;
					case Cell.CELL_TYPE_FORMULA:
						//value = cell.getCellFormula();
						//System.out.println("formula:" + value);
						value = StringUtil.subZeroAndDotStr(cell.getNumericCellValue());
						try {
							salaryInfoForm.setProperty(String.valueOf(value), columnIndex);
						} catch (Exception e) {
							try {
								salaryInfoForm.setProperty(Double.parseDouble(String.valueOf(value)), columnIndex);
							} catch (Exception e2) {
								salaryInfoForm.setProperty(Integer.parseInt(String.valueOf(value)), columnIndex);
							}
						}
						System.out.println("numeric:" + value);
						System.out.println("formula numeric:" + value);
					    break;
					case Cell.CELL_TYPE_NUMERIC:
						value = StringUtil.subZeroAndDotStr(cell.getNumericCellValue());
						try {
							salaryInfoForm.setProperty(String.valueOf(value), columnIndex);
						} catch (Exception e) {
							try {
								salaryInfoForm.setProperty(Double.parseDouble(String.valueOf(value)), columnIndex);
							} catch (Exception e2) {
								salaryInfoForm.setProperty(Integer.parseInt(String.valueOf(value)), columnIndex);
							}
						}
						System.out.println("numeric:" + value);
						break;
					case Cell.CELL_TYPE_BOOLEAN:
						value = cell.getBooleanCellValue();
						System.out.println("boolean:" + value);
						break;
					default:
						break;
					}
				}
				modelList.add(salaryInfoForm);
			} 
		}
		is.close();
		return modelList;
	}

}
