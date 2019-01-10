package com.mdoa.admin.service;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.admin.bo.FixedAssetsForm;
import com.mdoa.admin.dao.FixedAssetsDao;
import com.mdoa.admin.model.DepreRecord;
import com.mdoa.admin.model.DepreType;
import com.mdoa.admin.model.FixedAssets;
import com.mdoa.base.model.PageModel;
import com.mdoa.base.service.BaseService;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.DateUtil;
import com.mdoa.util.StringUtil;
import com.mysql.jdbc.StringUtils;

@Service
@Transactional
public class FixedAssetsService extends BaseService{

	@Autowired
	private FixedAssetsDao fixedAssetsDao;
/*****************************************折旧类型***********************************************/
	public void insertDepreType(DepreType depreType){
		if(!fixedAssetsDao.insertDepreType(depreType)){
			throw new RuntimeException("插入折旧类型失败");
		}
	}
	
	public void deleteDepreType(DepreType depreType){
		if (!fixedAssetsDao.deleteDepreType(depreType)) {
			throw new RuntimeException("删除折旧类型失败");
		}
	}
	
	public void updateDepreType(DepreType depreType){
		if (!fixedAssetsDao.updateDepreType(depreType)) {
			throw new RuntimeException("修改折旧类型");
		}
	}
	
	public PageModel<DepreType> selectDepreType(DepreType depreType){
		if (!StringUtil.isEmpty(depreType.getDepreTypeName())) {
			depreType.setDepreTypeName("%"+depreType.getDepreTypeName()+"%");
		}
		PageHelper.startPage(depreType.getPage(),depreType.getRows());
		List<DepreType> list = fixedAssetsDao.selectDepreType(depreType);
		PageModel<DepreType> pageModel = new PageModel((Page)list);
		return pageModel;
	}
/*****************************************固定资产********************************************/
	public void insertFixedAssets(FixedAssets fixedAssets){
		
		fixedAssets.setAssetsTypeId(StringUtil.getIdFromUrl(fixedAssets.getAssetsTypeUrl()));
		if (!fixedAssetsDao.insertFixedAssets(fixedAssets)) {
			throw new RuntimeException("增加固定资产失败");
		}
	}
	public void deleteFixedAssets(FixedAssets fixedAssets){
		if (!fixedAssetsDao.deleteFixedAssets(fixedAssets)) {
			throw new RuntimeException("删除固定资产失败");
		}
	}
	public void updateFixedAssets(FixedAssets fixedAssets){
		if (!fixedAssetsDao.updateFixedAssets(fixedAssets)) {
			throw new RuntimeException("修改固定资产失败");
		}
	}
	
	public PageModel<FixedAssets> selectFixedAssets(FixedAssets fixedAssets){
		if (!StringUtil.isEmpty(fixedAssets.getAssetsName())) {
			fixedAssets.setAssetsName("%"+fixedAssets.getAssetsName()+"%");
		}
		if (!StringUtil.isEmpty(fixedAssets.getAssetsTypeUrl())) {
			fixedAssets.setAssetsTypeUrl(fixedAssets.getAssetsTypeUrl()+"%");
		}
		if (!StringUtil.isEmpty(fixedAssets.getBeDep())) {
			fixedAssets.setBeDep("%"+fixedAssets.getBeDep()+"%");
		}
		PageHelper.startPage(fixedAssets.getPage(),fixedAssets.getRows());
		List<FixedAssets> list = fixedAssetsDao.selectFixedAssets(fixedAssets);
		PageModel<FixedAssets> pageModel = new PageModel((Page)list);
		return pageModel;
	}
/*********************************************折旧记录******************************************/
	public void insertDepreRecord(DepreRecord depreRecord){
		if (!fixedAssetsDao.insertDepreRecord(depreRecord)) {
			throw new RuntimeException("插入折旧记录失败");
		}
	}
	
	public void deleteDepreRecord(DepreRecord depreRecord){
		if (!fixedAssetsDao.deleteDepreRecord(depreRecord)) {
			throw new RuntimeException("删除折旧记录失败");
		}
	}
	public void updateDepreRecord(DepreRecord depreRecord){
		if (!fixedAssetsDao.updateDepreRecord(depreRecord)) {
			throw new RuntimeException("修改折旧记录失败");
		}
	}
	
	public PageModel<FixedAssetsForm> selectDepreRcord(FixedAssetsForm fixedAssetsForm){
		if (!StringUtil.isEmpty(fixedAssetsForm.getAssetsName())) {
			fixedAssetsForm.setAssetsName("%"+fixedAssetsForm.getAssetsName()+"%");
		}
		PageHelper.startPage(fixedAssetsForm.getPage(),fixedAssetsForm.getRows());
		List<FixedAssetsForm> list = fixedAssetsDao.selectDepreRcord(fixedAssetsForm);
		PageModel<FixedAssetsForm> pageModel = new PageModel((Page)list);
		return pageModel;
	}
		
/***********************************折旧计算方法********************************************************/	
	public void depreciate(FixedAssets fixedAssets1){
		List<FixedAssets> list1 = fixedAssetsDao.selectFixedAssets(fixedAssets1);
		FixedAssets fixedAssets = list1.get(0);
		BigDecimal curValue = fixedAssets.getAssetCurValue();//得到资产当前值
		BigDecimal assetValue = fixedAssets.getAssetValue();//得到资产值
		DepreType depreType = new DepreType();
		depreType.setDepreTypeId(fixedAssets.getDepreTypeId());
		List<DepreType> list = fixedAssetsDao.selectDepreType(depreType);
		DepreType type = list.get(0);
		Integer method = type.getCalMethod();//得到计算方法的值
		Integer i = 0;
		if (method == 1) {//平均年限法
			BigDecimal yearRate = fixedAssets.getDepreRate();//年折旧率
			BigDecimal monthRate = yearRate.divide(new BigDecimal(12), 2, 2); //月折旧率
			Date lastCalTime = fixedAssetsDao.selectMaxDate(fixedAssets.getAssetsId());
			
			if(lastCalTime == null){
				lastCalTime = fixedAssets.getStartDepre();
			}
			Integer deprePeriod = type.getDeprePeriod();//得到折旧周期
			BigDecimal value = assetValue.multiply(new BigDecimal(deprePeriod.toString())).multiply(monthRate);//一个周期折旧的值
			GregorianCalendar gc1 = new GregorianCalendar();
			gc1.setTime(lastCalTime);
			GregorianCalendar gcYears = new GregorianCalendar();
			gcYears.setTime(fixedAssets.getStartDepre());
			Integer years = fixedAssets.getIntendTerm().intValue();
			gcYears.add(Calendar.YEAR, years);
			while (deprePeriod >= 1) {
				gc1.add(Calendar.MONTH, deprePeriod);
				Date curDate = gc1.getTime();
				if (curDate.after(new Date()) || curDate.after(gcYears.getTime())) {
					break;
				}else {
					i++;
					DepreRecord depreR = new DepreRecord();
					depreR.setCalTime(curDate);
					curValue = curValue.subtract(value);
					if (curValue.compareTo(new BigDecimal("0.001")) == -1) {
						break;
					}
					depreR.setDepreAmount(value);
					depreR.setAssetsId(fixedAssets1.getAssetsId());
					if(!fixedAssetsDao.insertDepreRecord(depreR))
						throw new RuntimeException("插入折旧记录失败");
				}	
			}
		}else if (method == 2) {// 工作量法
			i++;
			BigDecimal total = new BigDecimal(1).subtract(fixedAssets.getRemainValRate().divide(new BigDecimal(100))).multiply(fixedAssets.getAssetValue());//残值率/资产值
			BigDecimal per = total.divide(fixedAssets.getIntendWorkGross(), 2, 2);
			curValue = curValue.subtract(per.multiply(fixedAssets1.getWorkCapacity()));
			DepreRecord depreR = new DepreRecord();
			depreR.setCalTime(DateUtil.strToDate(fixedAssets1.getCruCalDateStr()));
			depreR.setDepreAmount(per.multiply(fixedAssets1.getWorkCapacity()));
			depreR.setWorkCapacity(fixedAssets1.getWorkCapacity());
			depreR.setWorkGrossUnit(fixedAssets.getWorkGrossUnit());
			depreR.setAssetsId(fixedAssets1.getAssetsId());
			if(!fixedAssetsDao.insertDepreRecord(depreR))
				throw new RuntimeException("插入折旧记录失败");
		}else if (method == 3) {// 双倍余额递减折旧法
			Integer deprePeriod = type.getDeprePeriod();//得到折旧类型的折旧周期
			Date lastCalTime = fixedAssetsDao.selectMaxDate(fixedAssets.getAssetsId());
			if (lastCalTime == null) {
				lastCalTime = fixedAssets.getStartDepre();
			}
			Date startDepre = fixedAssets.getStartDepre();
			GregorianCalendar gc1 = new GregorianCalendar();
			GregorianCalendar gcYear = new GregorianCalendar();
			GregorianCalendar gcYears = new GregorianCalendar();
			BigDecimal yearRate = new BigDecimal(2).divide(fixedAssets.getIntendTerm(), 2, 3);
			BigDecimal monthRate = yearRate.divide(new BigDecimal(12), 2, 3);
			gcYear.setTime(startDepre);
			Integer years = fixedAssets.getIntendTerm().intValue();
			if (years > 2) {
				gcYear.add(Calendar.YEAR, years - 2);
			}
			gcYears.setTime(startDepre);
			gcYears.add(Calendar.YEAR, years);
			gc1.setTime(lastCalTime);
			Integer flag = 0;
			BigDecimal twoYearValue = new BigDecimal(0);
			while (deprePeriod > 0) {
				DepreRecord depreR = new DepreRecord();
				BigDecimal bd = new BigDecimal(0);
				Date last = gc1.getTime();
				gc1.add(Calendar.MONTH, deprePeriod);
				if (gc1.getTime().after(new Date())|| gc1.getTime().after(gcYears.getTime())) {
					break;
				}
				i++;
				if (!gc1.getTime().after(gcYear.getTime())) {
					bd = curValue.multiply(monthRate).multiply(new BigDecimal(deprePeriod.toString()));
					curValue = curValue.subtract(bd);
				}else{
					GregorianCalendar lastGc = new GregorianCalendar();
					lastGc.setTime(last);
					Integer j = 0;
					Date lastDate = lastGc.getTime();
					Date gcDate = gcYear.getTime();
					while (lastDate.before(gcDate)) {
						lastGc.add(Calendar.MONTH, 1);
						curValue = curValue.subtract(curValue.multiply(monthRate));
						bd = bd.add(curValue.multiply(monthRate));
						j++;
						
					}
					if (deprePeriod - j > 0) {
						if (flag == 0) {
							twoYearValue = curValue.subtract(curValue.multiply(fixedAssets.getRemainValRate().divide(new BigDecimal(100), 2,2))); // 扣除净残值
						}
						flag++;
						Integer w = deprePeriod - j;
						if (fixedAssets.getIntendTerm().intValue() > 1) {
							bd = bd.add(twoYearValue.divide(new BigDecimal(24), 2, 3).multiply(new BigDecimal(w.toString())));
							curValue = curValue.subtract(twoYearValue.divide(new BigDecimal(24), 2, 3).multiply(new BigDecimal(w.toString())));
						} else {
							bd = bd.add(twoYearValue.divide(new BigDecimal(12), 2, 3).multiply(new BigDecimal(w.toString())));
							curValue = curValue.subtract(twoYearValue.divide(new BigDecimal(12), 2, 3).multiply(new BigDecimal(w.toString())));
						}
					}	
				}
				Date calTime = gc1.getTime();
				depreR.setCalTime(calTime);
				depreR.setDepreAmount(bd);
				depreR.setAssetsId(fixedAssets1.getAssetsId());
				if(!fixedAssetsDao.insertDepreRecord(depreR))
					throw new RuntimeException("插入折旧记录失败");
			}
		}else if(method == 4){// 年数总和折旧法
			Integer deprePeriod = type.getDeprePeriod();//得到折旧类型的折旧周期
			Date lastCalTime = fixedAssetsDao.selectMaxDate(fixedAssets.getAssetsId());
			if (lastCalTime == null) {
				lastCalTime = fixedAssets.getStartDepre();
			}
			Date startDepre = fixedAssets.getStartDepre();
			BigDecimal intendTerm = fixedAssets.getIntendTerm();
			BigDecimal total = intendTerm.multiply(intendTerm.add(new BigDecimal(1))).divide(new BigDecimal(2));
			GregorianCalendar gc1 = new GregorianCalendar();
			GregorianCalendar gcStart = new GregorianCalendar();
			gcStart.setTime(startDepre);
			gc1.setTime(lastCalTime);
			GregorianCalendar gcYears = new GregorianCalendar();
			gcYears.setTime(fixedAssets.getStartDepre());
			Integer years = fixedAssets.getIntendTerm().intValue();
			gcYears.add(Calendar.YEAR, years);
			BigDecimal stValue = fixedAssets.getAssetValue().multiply(new BigDecimal(1).subtract(fixedAssets.getRemainValRate().divide(new BigDecimal(100),2, 2)));
			while (deprePeriod > 0) {
				Date last = gc1.getTime();
				GregorianCalendar gcLast = new GregorianCalendar();
				gcLast.setTime(last);
				gc1.add(Calendar.MONTH, deprePeriod);
				BigDecimal depValue = new BigDecimal(0);
				Integer jian = gc1.get(Calendar.YEAR)- gcLast.get(Calendar.YEAR);// 两个时间的间隔年数,从而判定用什么的折算率来折算
				if (gc1.getTime().after(new Date())|| gc1.getTime().after(gcYears.getTime())) {
					break;
				}
				i++;
				Integer be = gc1.get(Calendar.YEAR)- gcStart.get(Calendar.YEAR);
				BigDecimal rate = intendTerm.subtract(new BigDecimal(be)).divide(total, 2, 2);
				if (jian == 0) {
					depValue = stValue.multiply(rate).multiply(new BigDecimal(deprePeriod).divide(new BigDecimal(12), 2, 2));
					curValue = curValue.subtract(depValue);
				} else {
					Integer beLast = gcLast.get(Calendar.YEAR)- gcStart.get(Calendar.YEAR);// 上一年时已经使用的年数
					BigDecimal rateLast = intendTerm.subtract(new BigDecimal(beLast)).divide(total, 2, 2);// 上一年的折算率
					Integer months = 11 - gcLast.get(Calendar.MONTH);// 计算剩下的月数
					depValue = stValue.multiply(rateLast).multiply(new BigDecimal(months).divide(new BigDecimal(12), 2, 2));
					Integer monthsNextYear = gc1.get(Calendar.MONTH) + 1;// 下一年的月数
					depValue = depValue.add(stValue.multiply(rate).multiply(new BigDecimal(monthsNextYear).divide(new BigDecimal(12), 2, 2)));
					curValue = curValue.subtract(depValue);
				}
				DepreRecord depreR = new DepreRecord();
				Date cruDate = gc1.getTime();
				depreR.setCalTime(cruDate);
				depreR.setDepreAmount(depValue);
				depreR.setAssetsId(fixedAssets1.getAssetsId());
				if(!fixedAssetsDao.insertDepreRecord(depreR))
					throw new RuntimeException("插入折旧记录失败");
			}
		}
		fixedAssets.setAssetCurValue(curValue);
		//更新固定资产的资产当前量
		if(!fixedAssetsDao.updateFixedAssetsCurValue(fixedAssets)){
			throw new RuntimeException("更新固定资产失败");
		}
		if(i == 0){
			throw new RuntimeException("还没到折旧时间");
		}
		
	}	
	
}
