package com.mdoa.erp.bo;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.util.List;

import com.mdoa.base.model.BaseModel;

public class ErpSelectForm extends BaseModel{

	//白胚入库明细
	private String riqi;//入库日期（格式是：yyyy/mm/dd)
	private String startriqi;
	private String endriqi;
	private String dingzi;//订字（印染厂业务员常用的一个订单标识。它是具体名称)
	private String peiliao;//品名规格（具体名称）
	private String Pitem;//加工类别（客户的布来加工的类别：加工、返修、改色等）
	private BigDecimal pishu;//加工的匹数
	private BigDecimal mishu;//加工的米数（数量长度）
	private BigDecimal peizhong;//加工的重量（单位是:kg)
	private String mkzh;//克重量
	private String cnote;//入库备注
	private String ywman;//业务员（姓名）
	private String kehu;//客户名称（存放的名称不是编号）
	
	//白胚库存
	private BigDecimal kashu;//可以开流程卡的数量
	private String zhrktime;//据今天最近的一次入库日期
	
	//订单查询
	private String cfukuan;//成品门幅
	private String sehao;//花色号
	private String yanse;//颜色名称
	private String khdanhao;//客户订单号
	private String ovriqi;//交货期
	private String danhao;//每个订单流水号(不需要显示在前端页面)
	private Integer idxno;//单据序号(不需要显示在前端页面)
	private BigDecimal gangshu;
	
	//生产进度
	private String kahao;//卡编号
	private String iftg;//头缸
	private String status;//生产状态
	private String quick;//加急
	private String kpishu;//开卡匹数
	private String kmishu;//开卡米数
	private String pctime;//排产时间
	private String fbtime;//配布时间
	private String oktime;//染色时间
	private String dxtime;//登记时间
	private String bcptime;//半成品入库
	private String cpitime;//成品入库时间
	private String cpotime;//成品出库时间
	private String dstime;//下道工序
	private String pztime;
	private String pmkzh;
	//成品入库明细
	private String okpsw;//进出状态
	private String ckplace;//仓位
	
	private String dataSourceKey;
	private String startTime;
	private String endTime;
	
	private String ddriqi;
	private String startddriqi;
	private String endddriqi;
	private String kkriqi;
	private String startkkriqi;
	private String endkkriqi;
	private List<String> subNameList;
	private String ywmanFlag;
	private String kehuFlag;
	
	private String jihao;
	private String chehao;
	private String xjtime;
	private String cname;
	private String idxid;
	
	private String salesmanId;
	private String zhkaiktime;//最近开卡日期
	
	private String isLastPage;
	private Integer innerLines;//内层条数
	private Integer outterLines;//外层条数
	
	
	public String getZhkaiktime() {
		return zhkaiktime;
	}
	public void setZhkaiktime(String zhkaiktime) {
		this.zhkaiktime = zhkaiktime;
	}
	public BigDecimal getGangshu() {
		return gangshu;
	}
	public void setGangshu(BigDecimal gangshu) {
		this.gangshu = gangshu;
	}
	public String getStartriqi() {
		return startriqi;
	}
	public void setStartriqi(String startriqi) {
		this.startriqi = startriqi;
		this.startriqi = startriqi.replaceAll("-", "/");
	}
	public String getEndriqi() {
		return endriqi;
	}
	public void setEndriqi(String endriqi) {
		this.endriqi = endriqi;
		this.endriqi = endriqi.replaceAll("-", "/");
	}
	public String getStartddriqi() {
		return startddriqi;
	}
	public void setStartddriqi(String startddriqi) {
		this.startddriqi = startddriqi;
		this.startddriqi = startddriqi.replaceAll("-", "/");
	}
	public String getEndddriqi() {
		return endddriqi;
	}
	public void setEndddriqi(String endddriqi) {
		this.endddriqi = endddriqi;
		this.endddriqi = endddriqi.replaceAll("-", "/");
	}
	public String getStartkkriqi() {
		return startkkriqi;
	}
	public void setStartkkriqi(String startkkriqi) {
		this.startkkriqi = startkkriqi;
		this.startkkriqi = startkkriqi.replaceAll("-", "/");
	}
	public String getEndkkriqi() {
		return endkkriqi;
	}
	public void setEndkkriqi(String endkkriqi) {
		this.endkkriqi = endkkriqi;
		this.endkkriqi = endkkriqi.replaceAll("-", "/");
	}
	public String getSalesmanId() {
		return salesmanId;
	}
	public void setSalesmanId(String salesmanId) {
		this.salesmanId = salesmanId;
	}
	public String getJihao() {
		return jihao;
	}
	public void setJihao(String jihao) {
		this.jihao = jihao;
	}
	public String getChehao() {
		return chehao;
	}
	public void setChehao(String chehao) {
		this.chehao = chehao;
	}
	public String getXjtime() {
		return xjtime;
	}
	public void setXjtime(String xjtime) {
		this.xjtime = xjtime;
	}
	public String getCname() {
		return cname;
	}
	public void setCname(String cname) {
		this.cname = cname;
	}
	public String getIdxid() {
		return idxid;
	}
	public void setIdxid(String idxid) {
		this.idxid = idxid;
	}
	public String getYwmanFlag() {
		return ywmanFlag;
	}
	public void setYwmanFlag(String ywmanFlag) {
		this.ywmanFlag = ywmanFlag;
	}
	public String getKehuFlag() {
		return kehuFlag;
	}
	public void setKehuFlag(String kehuFlag) {
		this.kehuFlag = kehuFlag;
	}
	public List<String> getSubNameList() {
		return subNameList;
	}
	public void setSubNameList(List<String> subNameList) {
		this.subNameList = subNameList;
	}
	public String getDdriqi() {
		return ddriqi;
	}
	public void setDdriqi(String ddriqi) {
		this.ddriqi = ddriqi;
		this.ddriqi = ddriqi.replaceAll("-", "/");
	}
	public String getKkriqi() {
		return kkriqi;
	}
	public void setKkriqi(String kkriqi) {
		this.kkriqi = kkriqi;
		this.kkriqi = kkriqi.replaceAll("-", "/");
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
		this.startTime = startTime.replaceAll("-", "/");
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
		this.endTime = endTime.replaceAll("-", "/");
	}
	public String getPmkzh() {
		return pmkzh;
	}
	public void setPmkzh(String pmkzh) {
		this.pmkzh = pmkzh;
	}
	public String getPztime() {
		return pztime;
	}
	public void setPztime(String pztime) {
		this.pztime = pztime;
	}
	public String getMkzh() {
		return mkzh;
	}
	public void setMkzh(String mkzh) {
		this.mkzh = mkzh;
	}
	public String getZhrktime() {
		return zhrktime;
	}
	public void setZhrktime(String zhrktime) {
		this.zhrktime = zhrktime;
	}
	
	public String getDataSourceKey() {
		return dataSourceKey;
	}
	public void setDataSourceKey(String dataSourceKey) {
		this.dataSourceKey = dataSourceKey;
	}
	public String getRiqi() {
		return riqi;
	}
	public void setRiqi(String riqi) {
		this.riqi = riqi;
		this.riqi = riqi.replaceAll("-", "/");
		
	}
	public String getDingzi()  {
		return dingzi;
	}
	public void setDingzi(String dingzi) {
		try {
			this.dingzi = URLDecoder.decode(dingzi,"utf-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public String getPeiliao() {
		return peiliao;
	}
	public void setPeiliao(String peiliao) {
		this.peiliao = peiliao;
	}
	public String getPitem() {
		return Pitem;
	}
	public void setPitem(String pitem) {
		Pitem = pitem;
	}
	public BigDecimal getPishu() {
		return pishu;
	}
	public void setPishu(BigDecimal pishu) {
		this.pishu = pishu;
	}
	public BigDecimal getMishu() {
		return mishu;
	}
	public void setMishu(BigDecimal mishu) {
		this.mishu = mishu;
	}
	public BigDecimal getPeizhong() {
		return peizhong;
	}
	public void setPeizhong(BigDecimal peizhong) {
		this.peizhong = peizhong;
	}
	public String getCnote() {
		return cnote;
	}
	public void setCnote(String cnote) {
		this.cnote = cnote;
	}
	public String getYwman() {
		return ywman;
	}
	public void setYwman(String ywman) {
		this.ywman = ywman;
	}
	public String getKehu() {
		return kehu;
	}
	public void setKehu(String kehu) {
		this.kehu = kehu;
	}
	public BigDecimal getKashu() {
		return kashu;
	}
	public void setKashu(BigDecimal kashu) {
		this.kashu = kashu;
	}
	public String getCfukuan() {
		return cfukuan;
	}
	public void setCfukuan(String cfukuan) {
		this.cfukuan = cfukuan;
	}
	public String getSehao() {
		return sehao;
	}
	public void setSehao(String sehao) {
		this.sehao = sehao;
	}
	public String getYanse() {
		return yanse;
	}
	public void setYanse(String yanse) {
		this.yanse = yanse;
	}
	public String getKhdanhao() {
		return khdanhao;
	}
	public void setKhdanhao(String khdanhao) {
		this.khdanhao = khdanhao;
	}
	public String getOvriqi() {
		return ovriqi;
	}
	public void setOvriqi(String ovriqi) {
		this.ovriqi = ovriqi;
		this.ovriqi = ovriqi.replaceAll("-", "/");
	}
	public String getDanhao() {
		return danhao;
	}
	public void setDanhao(String danhao) {
		this.danhao = danhao;
	}
	public Integer getIdxno() {
		return idxno;
	}
	public void setIdxno(Integer idxno) {
		this.idxno = idxno;
	}
	public String getKahao() {
		return kahao;
	}
	public void setKahao(String kahao) {
		this.kahao = kahao;
	}
	public String getIftg() {
		return iftg;
	}
	public void setIftg(String iftg) {
		this.iftg = iftg;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getQuick() {
		return quick;
	}
	public void setQuick(String quick) {
		this.quick = quick;
	}
	public String getKpishu() {
		return kpishu;
	}
	public void setKpishu(String kpishu) {
		this.kpishu = kpishu;
	}
	public String getKmishu() {
		return kmishu;
	}
	public void setKmishu(String kmishu) {
		this.kmishu = kmishu;
	}
	public String getPctime() {
		return pctime;
	}
	public void setPctime(String pctime) {
		this.pctime = pctime;
		this.pctime = pctime.replaceAll("-", "/");
	}
	public String getFbtime() {
		return fbtime;
	}
	public void setFbtime(String fbtime) {
		this.fbtime = fbtime;
		this.fbtime = fbtime.replaceAll("-", "/");
	}
	public String getOktime() {
		return oktime;
	}
	public void setOktime(String oktime) {
		this.oktime = oktime;
		this.oktime = oktime.replaceAll("-", "/");
	}
	public String getDxtime() {
		return dxtime;
	}
	public void setDxtime(String dxtime) {
		this.dxtime = dxtime;
		this.dxtime = dxtime.replaceAll("-", "/");
	}
	public String getBcptime() {
		return bcptime;
	}
	public void setBcptime(String bcptime) {
		this.bcptime = bcptime;
		this.bcptime = bcptime.replaceAll("-", "/");
	}
	public String getCpitime() {
		return cpitime;
	}
	public void setCpitime(String cpitime) {
		this.cpitime = cpitime;
		this.cpitime = cpitime.replaceAll("-", "/");
	}
	public String getCpotime() {
		return cpotime;
	}
	public void setCpotime(String cpotime) {
		this.cpotime = cpotime;
		this.cpotime = cpotime.replaceAll("-", "/");
	}
	public String getDstime() {
		return dstime;
	}
	public void setDstime(String dstime) {
		this.dstime = dstime;
		this.dstime = dstime.replaceAll("-", "/");
	}
	public String getOkpsw() {
		return okpsw;
	}
	public void setOkpsw(String okpsw) {
		this.okpsw = okpsw;
	}
	public String getCkplace() {
		return ckplace;
	}
	public void setCkplace(String ckplace) {
		this.ckplace = ckplace;
	}
	public String getIsLastPage() {
		return isLastPage;
	}
	public void setIsLastPage(String isLastPage) {
		this.isLastPage = isLastPage;
	}
	public Integer getInnerLines() {
		return innerLines;
	}
	public void setInnerLines(Integer innerLines) {
		this.innerLines = innerLines;
	}
	public Integer getOutterLines() {
		return outterLines;
	}
	public void setOutterLines(Integer outterLines) {
		this.outterLines = outterLines;
	}
	
	
	
}
