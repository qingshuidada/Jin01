package com.mdoa.admin.model;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.mdoa.base.model.BaseModel;
import com.mdoa.util.DateUtil;

/**
 * 固定资产
 * @author Administrator
 *
 */
public class FixedAssets extends BaseModel{

	private String assetsId;
	private String assetsNo;
	private String assetsName;
	private String model;
	private String assetsTypeUrl;
	private String assetsTypeId;
	private String manuFacturer;
	private String beDep;
	private String custodian;
	private String notes;
	private BigDecimal remainValRate;
	private String depreTypeId;
	private String depreTypeName;
	private BigDecimal intendTerm;
	private BigDecimal intendWorkGross;
	private String workGrossUnit;
	private BigDecimal assetValue;
	private BigDecimal assetCurValue;
	private BigDecimal depreRate;
	private BigDecimal defPerWorkGross;
	private String aliveFlag;	
	private Date manuDate;
	private String manuDateStr;
	
	private Date buyDate;
	private String buyDateStr;
	
	private Date startDepre;
	private String startDepreStr;
	
	private String createUserId;
	private String createUserName;//创建人
	private Date createTime;//创建时间
	private String updateUserId;
	private String updateUserName;//修改人
	private Date updateTime;//修改时间
	
	private Date cruCalDate;
	private String cruCalDateStr;
	private String calMethod;
	private Integer deprePeriod;//折旧周期
	private BigDecimal workCapacity;
	
	
	public BigDecimal getWorkCapacity() {
		return workCapacity;
	}
	public void setWorkCapacity(BigDecimal workCapacity) {
		this.workCapacity = workCapacity;
	}
	public Integer getDeprePeriod() {
		return deprePeriod;
	}
	public void setDeprePeriod(Integer deprePeriod) {
		this.deprePeriod = deprePeriod;
	}
	public String getAssetsTypeUrl() {
		return assetsTypeUrl;
	}
	public void setAssetsTypeUrl(String assetsTypeUrl) {
		this.assetsTypeUrl = assetsTypeUrl;
	}
	public String getAssetsId() {
		return assetsId;
	}
	public void setAssetsId(String assetsId) {
		this.assetsId = assetsId;
	}
	public String getAssetsNo() {
		return assetsNo;
	}
	public void setAssetsNo(String assetsNo) {
		this.assetsNo = assetsNo;
	}
	public String getAssetsName() {
		return assetsName;
	}
	public void setAssetsName(String assetsName) {
		this.assetsName = assetsName;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getAssetsTypeId() {
		return assetsTypeId;
	}
	public void setAssetsTypeId(String assetsTypeId) {
		this.assetsTypeId = assetsTypeId;
	}
	public String getManuFacturer() {
		return manuFacturer;
	}
	public void setManuFacturer(String manuFacturer) {
		this.manuFacturer = manuFacturer;
	}
	public String getBeDep() {
		return beDep;
	}
	public void setBeDep(String beDep) {
		this.beDep = beDep;
	}
	public String getCustodian() {
		return custodian;
	}
	public void setCustodian(String custodian) {
		this.custodian = custodian;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public BigDecimal getRemainValRate() {
		return remainValRate;
	}
	public void setRemainValRate(BigDecimal remainValRate) {
		this.remainValRate = remainValRate;
	}
	public String getDepreTypeId() {
		return depreTypeId;
	}
	public void setDepreTypeId(String depreTypeId) {
		this.depreTypeId = depreTypeId;
	}
	public BigDecimal getIntendTerm() {
		return intendTerm;
	}
	public void setIntendTerm(BigDecimal intendTerm) {
		this.intendTerm = intendTerm;
	}
	public BigDecimal getIntendWorkGross() {
		return intendWorkGross;
	}
	public void setIntendWorkGross(BigDecimal intendWorkGross) {
		this.intendWorkGross = intendWorkGross;
	}
	public String getWorkGrossUnit() {
		return workGrossUnit;
	}
	public void setWorkGrossUnit(String workGrossUnit) {
		this.workGrossUnit = workGrossUnit;
	}
	public BigDecimal getAssetValue() {
		return assetValue;
	}
	public void setAssetValue(BigDecimal assetValue) {
		this.assetValue = assetValue;
	}
	public BigDecimal getAssetCurValue() {
		return assetCurValue;
	}
	public void setAssetCurValue(BigDecimal assetCurValue) {
		this.assetCurValue = assetCurValue;
	}
	public BigDecimal getDepreRate() {
		return depreRate;
	}
	public void setDepreRate(BigDecimal depreRate) {
		this.depreRate = depreRate;
	}
	public BigDecimal getDefPerWorkGross() {
		return defPerWorkGross;
	}
	public void setDefPerWorkGross(BigDecimal defPerWorkGross) {
		this.defPerWorkGross = defPerWorkGross;
	}
	
	public String getAliveFlag() {
		return aliveFlag;
	}
	public void setAliveFlag(String aliveFlag) {
		this.aliveFlag = aliveFlag;
	}
	
	public String getCreateUserId() {
		return createUserId;
	}
	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}
	public String getCreateUserName() {
		return createUserName;
	}
	public void setCreateUserName(String createUserName) {
		this.createUserName = createUserName;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public String getUpdateUserId() {
		return updateUserId;
	}
	public void setUpdateUserId(String updateUserId) {
		this.updateUserId = updateUserId;
	}
	public String getUpdateUserName() {
		return updateUserName;
	}
	public void setUpdateUserName(String updateUserName) {
		this.updateUserName = updateUserName;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	
	public String getDepreTypeName() {
		return depreTypeName;
	}
	public void setDepreTypeName(String depreTypeName) {
		this.depreTypeName = depreTypeName;
	}
/*********************************************************************************/
	public Date getManuDate() {
		return manuDate;
	}
	public void setManuDate(Date manuDate) {
		this.manuDate = manuDate;
		this.manuDateStr = DateUtil.dateToStr(manuDate);
	}
	public String getManuDateStr() {
		return manuDateStr;
	}
	public void setManuDateStr(String manuDateStr) {
		this.manuDateStr = manuDateStr;
	}
	public Date getBuyDate() {
		return buyDate;
	}
	public void setBuyDate(Date buyDate) {
		this.buyDate = buyDate;
		this.buyDateStr = DateUtil.dateToStr(buyDate);
	}
	public String getBuyDateStr() {
		return buyDateStr;
	}
	public void setBuyDateStr(String buyDateStr) {
		this.buyDateStr = buyDateStr;
	}
	public Date getStartDepre() {
		return startDepre;
	}
	public void setStartDepre(Date startDepre) {
		this.startDepre = startDepre;
		this.startDepreStr = DateUtil.dateToStr(startDepre);
	}
	public String getStartDepreStr() {
		return startDepreStr;
	}
	public void setStartDepreStr(String startDepreStr) {
		this.startDepreStr = startDepreStr;
	}
	public Date getCruCalDate() {
		return cruCalDate;
	}
	public void setCruCalDate(Date cruCalDate) {
		this.cruCalDate = cruCalDate;
	}
	public String getCruCalDateStr() {
		return cruCalDateStr;
	}
	public void setCruCalDateStr(String cruCalDateStr) {
		this.cruCalDateStr = cruCalDateStr;
	}
	public String getCalMethod() {
		return calMethod;
	}
	public void setCalMethod(String calMethod) {
		this.calMethod = calMethod;
	}
	
}
