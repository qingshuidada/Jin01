package com.mdoa.erp.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
       
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.google.gson.Gson;
import com.mdoa.base.model.PageModel;
import com.mdoa.base.service.BaseService;
import com.mdoa.erp.bo.ErpRegisterForm;
import com.mdoa.erp.dao.ErpRegisterDao;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.Md5Util;
import com.mdoa.util.StringUtil;
import com.mdoa.weixin.bo.WeixinForm;
import com.mdoa.weixin.dao.WeixinDao;

@Service
@Transactional
public class ErpRegisterService extends BaseService{

	@Autowired
	private ErpRegisterDao erpRegisterDao;
	@Autowired
	private WeixinDao weixinDao;
	
	//遍历当前节点下的所有节点  
    public List<ErpRegisterForm> listNodes(Element node){  
    	List<ErpRegisterForm> erpList = new ArrayList<>();
        //System.out.println("当前节点的名称：" + node.getName());  
        //首先获取当前节点的所有属性节点  
        List<Attribute> list = node.attributes();  
        //遍历属性节点  
       /* for(Attribute attribute : list){  
            System.out.println(attribute.getName() +":" + attribute.getValue());  
        }*/  
        //同时迭代当前节点下面的所有子节点  
        //使用递归  
        Iterator<Element> iterator = node.elementIterator(); 
        while(iterator.hasNext()){
        	ErpRegisterForm erpRegisterForm = new ErpRegisterForm();
            Element e = iterator.next();  
            List<Attribute> eList = e.attributes();
            for(Attribute attribute : eList){
            	if (attribute.getName().equals("dataSourceKey")) 
            		erpRegisterForm.setDataSourceKey(attribute.getValue());
            	if (attribute.getName().equals("dataSourceName")) 
            		erpRegisterForm.setDataSourceName(attribute.getValue());
            } 
            erpList.add(erpRegisterForm);
        }
        return erpList;
    }
    /**
     * 查询数据库名字
     * @param erpRegisterForm
     * @return 
     * @throws DocumentException 
     */
    @Transactional
	public List<ErpRegisterForm> queryDataResourceName(ErpRegisterForm erpRegisterForm) throws DocumentException {
		SAXReader reader = new SAXReader();
		//Document document = reader.read(new File("ErpDateSourceList.xml"));
		Document document = reader.read(this.getClass().getClassLoader().getResourceAsStream("/erp/ErpDateSourceList.xml"));
		Element node = document.getRootElement(); 
        List<ErpRegisterForm> list = listNodes(node);
        return list;
	}
	/**
	 * 添加父业务员
	 * @param erpRegisterForm
	 */
	@Transactional
	public String addParentSalesman(ErpRegisterForm erpRegisterForm) {
		
		List<ErpRegisterForm> list = erpRegisterDao.queryParentSalesman(erpRegisterForm);
		if (list.size() > 0)
			return "该业务员已存在";
		if (!erpRegisterDao.addParentSalesman(erpRegisterForm)) 
			throw new RuntimeException("添加父业务员失败");
		return "添加成功";
	}
	/**
	 * 添加子业务员
	 * @param erpRegisterForm
	 */
	@Transactional
	public void addSubSalesman(ErpRegisterForm erpRegisterForm) {
		if (!erpRegisterDao.addSubSalesman(erpRegisterForm))
			throw new RuntimeException("添加子业务员");
			
	}
	/**
	 * 查询父业务员
	 * @param erpRegisterForm
	 * @return
	 */
	@Transactional
	public PageModel<ErpRegisterForm> queryParentSalesman(ErpRegisterForm erpRegisterForm) {
		if (!StringUtil.isEmpty(erpRegisterForm.getSalesmanName())) 			
			erpRegisterForm.setSalesmanName("%"+erpRegisterForm.getSalesmanName()+"%");
		PageHelper.startPage(erpRegisterForm.getPage(),erpRegisterForm.getRows());
		List<ErpRegisterForm> list = erpRegisterDao.queryParentSalesman(erpRegisterForm);
		Page<ErpRegisterForm> page=(Page<ErpRegisterForm>)list;
		PageModel<ErpRegisterForm> pageModel = new PageModel<>(page);
		return pageModel;
	}
	/**
	 * 查询子业务员
	 * @param erpRegisterForm
	 * @return
	 */
	@Transactional
	public PageModel<ErpRegisterForm> querySubSalesman(ErpRegisterForm erpRegisterForm) {
		if (!StringUtil.isEmpty(erpRegisterForm.getSalesmanNameSub())) 			
			erpRegisterForm.setSalesmanNameSub("%"+erpRegisterForm.getSalesmanNameSub()+"%");
		PageHelper.startPage(erpRegisterForm.getPage(), erpRegisterForm.getRows());
		List<ErpRegisterForm> list = erpRegisterDao.querySubSalesman(erpRegisterForm);
		PageModel<ErpRegisterForm> pageModel = new PageModel<>((Page<ErpRegisterForm>)list);
		return pageModel;
	}
	/**
	 * 删除父业务员
	 * @param erpRegisterForm
	 */
	@Transactional
	public void deleteParentSalesman(ErpRegisterForm erpRegisterForm) {
		if (!erpRegisterDao.deleteParentSalesman(erpRegisterForm)) 
			throw new RuntimeException("删除父业务员失败");
		List<ErpRegisterForm> list = erpRegisterDao.querySubSalesman(erpRegisterForm);
		if (list.size() > 0) 
			if (!erpRegisterDao.deleteSubSalesman(erpRegisterForm)) 
				throw new RuntimeException("删除子业务员失败");
		List<ErpRegisterForm> list2 = erpRegisterDao.queryCorrelation(erpRegisterForm);
		if (list2.size() > 0) 
			if (!erpRegisterDao.deleteCorrelation(erpRegisterForm)) 
				throw new RuntimeException("删除关系表失败");
	}
	/**
	 * 删除子业务员
	 * @param erpRegisterForm
	 */
	@Transactional
	public void deleteSubSalesman(ErpRegisterForm erpRegisterForm) {
		if (!erpRegisterDao.deleteSubSalesman(erpRegisterForm)) 
			throw new RuntimeException("删除子业务员失败");
	}
	/**
	 * 添加父客户
	 * @param erpRegisterForm
	 */
	@Transactional
	public void addParentCustomer(ErpRegisterForm erpRegisterForm) {
		erpRegisterForm.setCustomerId(getuuid());
		erpRegisterForm.setPassword(Md5Util.getMd5Str(erpRegisterForm.getPassword()));
		ErpRegisterForm erpRegisterForm1 = new ErpRegisterForm();
		erpRegisterForm1.setPhoneNumber(erpRegisterForm.getPhoneNumber());
		List<ErpRegisterForm> list = erpRegisterDao.queryParentCustomer(erpRegisterForm1);
		if (list.size()>0) 
			throw new RuntimeException("该电话号已存在");
		if (!erpRegisterDao.addParentCustomer(erpRegisterForm)) 
			throw new RuntimeException("添加父客户失败");
		if (!erpRegisterDao.addCusSaleCorrelation(erpRegisterForm))  
			throw new RuntimeException("添加客户和业务员关系失败");
	}
	/**
	 * 添加子客户
	 * @param erpRegisterForm
	 */
	public void addSubCustomer(ErpRegisterForm erpRegisterForm) {
		if (!erpRegisterDao.addSubCustomer(erpRegisterForm)) 
			throw new RuntimeException("添加子客户失败");
	}
	/**
	 * 查询父客户
	 * @param erpRegisterForm
	 * @return
	 */
	public PageModel<ErpRegisterForm> queryParentCustomer(ErpRegisterForm erpRegisterForm) {
		Gson gson = new Gson();
		if (!StringUtil.isEmpty(erpRegisterForm.getCustomerName())) 
			erpRegisterForm.setCustomerName("%"+erpRegisterForm.getCustomerName()+"%");
		if (!StringUtil.isEmpty(erpRegisterForm.getSalesmanName())) 			
			erpRegisterForm.setSalesmanName("%"+erpRegisterForm.getSalesmanName()+"%");
		PageHelper.startPage(erpRegisterForm.getPage(),erpRegisterForm.getRows());
		List<ErpRegisterForm> list = erpRegisterDao.queryParentCustomer(erpRegisterForm);
		List<ErpRegisterForm> nList = groupByCustomerId(list);
		PageModel<ErpRegisterForm> pageModel = new PageModel<>((Page<ErpRegisterForm>)list);
		return pageModel;
	}
	private List<ErpRegisterForm> groupByCustomerId(List<ErpRegisterForm> list) {
		for (int i = 0; i < list.size(); i++) {
			if (list.get(i).getCount() > 1) {
				ErpRegisterForm erpRegisterForm = new ErpRegisterForm();
				erpRegisterForm.setCustomerId(list.get(i).getCustomerId());
				List<ErpRegisterForm> newList = erpRegisterDao.queryParentCustomerO(erpRegisterForm);
				list.get(i).setSalesmanName("");
				list.get(i).setSalesmanId("");
				for (int j = 0; j < newList.size(); j++) {
					if (j==0) {
						list.get(i).setSalesmanName(list.get(i).getSalesmanName()+newList.get(j).getSalesmanName());
						list.get(i).setSalesmanId(list.get(i).getSalesmanId()+newList.get(j).getSalesmanId());
					}else{
						list.get(i).setSalesmanName(list.get(i).getSalesmanName()+","+newList.get(j).getSalesmanName());
						list.get(i).setSalesmanId(list.get(i).getSalesmanId()+","+newList.get(j).getSalesmanId());
					}
				}
				continue;
			}
		}
		
		return list;
	}
	/**
	 * 查询子客户
	 * @param erpRegisterForm
	 * @return
	 */
	public PageModel<ErpRegisterForm> querySubCustomer(ErpRegisterForm erpRegisterForm) {
		if (!StringUtil.isEmpty(erpRegisterForm.getCustomerName())) 
			erpRegisterForm.setCustomerName("%"+erpRegisterForm.getCustomerName()+"%");
		if (!StringUtil.isEmpty(erpRegisterForm.getCustomerNameSub())) 
			erpRegisterForm.setCustomerNameSub("%"+erpRegisterForm.getCustomerNameSub()+"%");
		PageHelper.startPage(erpRegisterForm.getPage(),erpRegisterForm.getRows());
		List<ErpRegisterForm> list = erpRegisterDao.querySubCustomer(erpRegisterForm);
		PageModel<ErpRegisterForm> pageModel = new PageModel<>((Page<ErpRegisterForm>)list);
		return pageModel;
	}
	/**
	 * 修改客户
	 * @param erpRegisterForm
	 */
	@Transactional
	public void updateParentCustomer(ErpRegisterForm erpRegisterForm) {
		System.out.println("salesmanId="+erpRegisterForm.getSalesmanId()+",phoneNumber="+erpRegisterForm.getPhoneNumber());
		ErpRegisterForm erpRegisterForm2 = new ErpRegisterForm();
		erpRegisterForm2.setCustomerId(erpRegisterForm.getCustomerId());
		List<ErpRegisterForm> list = erpRegisterDao.queryCorrelation(erpRegisterForm2);
		if (list.size()>0) 
			if (!erpRegisterDao.updateCusSaleCorrelation(erpRegisterForm)) 
				throw new RuntimeException("删除原来的业务员失败");
		for (int i = 0; i < erpRegisterForm.getSalesmanIds().length; i++) {
			System.out.println("哈哈="+erpRegisterForm.getSalesmanIds()[i]);
		}
		if (!erpRegisterDao.addCusSaleCorrelation(erpRegisterForm)) 
			throw new RuntimeException("添加新的业务员失败");
		if (!erpRegisterDao.updateParentCustomer(erpRegisterForm)) 
			throw new RuntimeException("修改客户信息失败");
	}
	/**
	 * 删除父客户
	 * @param erpRegisterForm
	 */
	@Transactional
	public void deleteParentCustomer(ErpRegisterForm erpRegisterForm) {
		
		if (!erpRegisterDao.deleteParentCustomer(erpRegisterForm)) 
			throw new RuntimeException("删除父客户失败");
		List<ErpRegisterForm> list = erpRegisterDao.querySubCustomer(erpRegisterForm);
		if (list.size() > 0) 
			if (!erpRegisterDao.deleteSubCustomer(erpRegisterForm)) 
				throw new RuntimeException("删除子客户失败");
		List<ErpRegisterForm> list2 = erpRegisterDao.queryCorrelation(erpRegisterForm);
		if (list2.size() > 0) 
			if (!erpRegisterDao.deleteCorrelation(erpRegisterForm)) 
				throw new RuntimeException("删除关系表失败");
				
	}
	/**
	 * 删除子客户
	 * @param erpRegisterForm
	 */
	@Transactional
	public void deleteSubCustomer(ErpRegisterForm erpRegisterForm) {
		if (!erpRegisterDao.deleteSubCustomer(erpRegisterForm)) 
			throw new RuntimeException("删除子客户失败");
	}
	/**
	 * 修改密码
	 * @param erpRegisterForm
	 */
	public void updateParentCustomerPassword(ErpRegisterForm erpRegisterForm) {
		erpRegisterForm.setOldPassword(Md5Util.getMd5Str(erpRegisterForm.getOldPassword()));
		erpRegisterForm.setNewPassword(Md5Util.getMd5Str(erpRegisterForm.getNewPassword()));
		System.out.println("z="+erpRegisterForm.getPhoneNumber()+"m="+erpRegisterForm.getOldPassword()+",n="+erpRegisterForm.getNewPassword());
		if (!erpRegisterDao.updateParentPassword(erpRegisterForm)) 
			throw new RuntimeException("修改客户密码失败");
	}
	
	/**
	 * 修改业务员密码
	 * @param erpRegisterForm
	 */
	public void updateSalesmanPassword(ErpRegisterForm erpRegisterForm) {
		erpRegisterForm.setOldPassword(Md5Util.getMd5Str(erpRegisterForm.getOldPassword()));
		erpRegisterForm.setNewPassword(Md5Util.getMd5Str(erpRegisterForm.getNewPassword()));
		if (!erpRegisterDao.updateSalesmanPassword(erpRegisterForm)) 
			throw new RuntimeException("修改业务员密码失败");
	}
	public void unBind(WeixinForm weixinForm) {
	    List<WeixinForm> list = weixinDao.checkOpenForUserHaveOpenId(weixinForm);  //查询该用户是否已经绑定账号
		if(list != null && list.size() >0){
			if (!weixinDao.unBind(weixinForm)){
				throw new RuntimeException("未知原因，解除失败");
			}
		}else{
		    throw new RuntimeException("该用户未绑定账号，解除失败");
		}
	}
	
	public PageModel<UserInfo> selectRepotAuthorityUser(UserInfo userInfo){
		if (!StringUtil.isEmpty(userInfo.getUserName())) 
			userInfo.setUserName("%"+userInfo.getUserName()+"%");
		PageHelper.startPage(userInfo.getPage(), userInfo.getRows());
		List<UserInfo> list = erpRegisterDao.selectRepotAuthorityUser(userInfo);
		PageModel<UserInfo> pageModel = new PageModel<UserInfo>((Page<UserInfo>)list);
		return pageModel;
	}
	
	public void updateReportAuthorityFlag(UserInfo info){
		if(!erpRegisterDao.updateReportAuthorityFlag(info.getUserId())){
			throw new RuntimeException("修改失败");
		}
	}
}
