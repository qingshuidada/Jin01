package com.mdoa.app.service;

import java.util.ArrayList;
import java.util.List;
import org.dom4j.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mdoa.erp.bo.ErpRegisterForm;
import com.mdoa.erp.dao.ErpLoginDao;
import com.mdoa.erp.service.ErpSelectService;
import com.mdoa.security.session.PhSession;
import com.mdoa.util.Md5Util;

@Service
public class AppLoginErpService {

	@Autowired
	private ErpLoginDao erpLoginDao;
	
	@Autowired
	private ErpSelectService erpSelectService;
	
	/**
	 * 手机端客户登录
	 * @param erpRegisterForm
	 * @param session
	 * @return
	 */
	public ErpRegisterForm customerLogin(ErpRegisterForm erpRegisterForm, PhSession session){
		List<ErpRegisterForm> list = erpLoginDao.customerLogin(erpRegisterForm);
		if (list != null && list.size()<1)
			throw new RuntimeException("此帐号不存在!");
		if (!list.get(0).getPassword().equals(Md5Util.getMd5Str(erpRegisterForm.getPassword()))) 
			throw new RuntimeException("密码错误,请重新输入密码!");
		erpRegisterForm.setCustomerId(list.get(0).getCustomerId());
		List<ErpRegisterForm> subList = erpLoginDao.querySubCustomer(erpRegisterForm);
		setDataSourceToSession(subList,session);
		ErpRegisterForm registerForm = list.get(0);
		setParentNameToSession(list.get(0).getSalesmanName(),session);
		registerForm.setKehuFlag("1");
		return registerForm;
	}
		
	/**
	 * 手机端业务员登录
	 * @param erpRegisterForm
	 * @param session
	 * @return
	 */
	public ErpRegisterForm salesmanLogin(ErpRegisterForm erpRegisterForm, PhSession session) {
		List<ErpRegisterForm> list = erpLoginDao.salesmanLogin(erpRegisterForm);
		if (list.size() < 1)
			throw new RuntimeException("此帐号不存在!");
		System.out.println(list.get(0).getPassword()+","+erpRegisterForm.getPassword());
		if (!list.get(0).getPassword().equals(Md5Util.getMd5Str(erpRegisterForm.getPassword()))) 
			throw new RuntimeException("密码错误,请重新输入密码!");
		erpRegisterForm.setSalesmanId(list.get(0).getSalesmanId());
		List<ErpRegisterForm> subList = erpLoginDao.querySubSalesman(erpRegisterForm);
		setDataSourceToSession(subList,session);
		ErpRegisterForm registerForm = list.get(0);
		setParentNameToSession(list.get(0).getSalesmanName(),session);
		registerForm.setYwmanFlag("1");
		return registerForm;
	}
	
	private void setParentNameToSession(String name, PhSession session) {
		ErpRegisterForm erpRegisterForm = new ErpRegisterForm();
		try {
			List<ErpRegisterForm> list = erpSelectService.queryDataResourceName(erpRegisterForm);
			for (ErpRegisterForm erpRegisterForm2 : list) {
				List<String> nList=(List<String>) session.getAttribute(erpRegisterForm2.getDataSourceKey());
				if(nList == null)
					nList = new ArrayList<>();
				nList.add(name);
				session.setAttribut(erpRegisterForm2.getDataSourceKey(), nList);
			}
		} catch (DocumentException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 把每个数据库的名字放到session中
	 * @param subList
	 * @param request 
	 */
	private void setDataSourceToSession(List<ErpRegisterForm> subList, PhSession session) {
		List<String> list = null;
		for (int i = 0; i < subList.size(); i++) {
			if (i == 0) {
				list = new ArrayList<>();
				session.setAttribut(subList.get(i).getDataSourceKey(), list);
				if (subList.get(i).getCustomerNameSub() != null){ 
					list.add(subList.get(i).getCustomerNameSub());
				}else{
					list.add(subList.get(i).getSalesmanNameSub());
				}
				continue;
			}
			if (subList.get(i).getDataSourceKey().equals(subList.get(i-1).getDataSourceKey())) {
				if (subList.get(i).getCustomerNameSub() != null){ 
					list.add(subList.get(i).getCustomerNameSub());
				}else{
					list.add(subList.get(i).getSalesmanNameSub());
				}
			}else{
				list = new ArrayList<>();
				session.setAttribut(subList.get(i).getDataSourceKey(), list);
				if (subList.get(i).getCustomerNameSub() != null){ 
					list.add(subList.get(i).getCustomerNameSub());
				}else{
					list.add(subList.get(i).getSalesmanNameSub());
				}
			}
		}
	}
	
	private List<String> getSubNameFromSlect(ErpRegisterForm erpRegisterForm){
		List<ErpRegisterForm> list2 = erpLoginDao.querySubSalesman(erpRegisterForm);
		List<String> list = new ArrayList<>();
		for (int i = 0; i < list2.size(); i++) {
			list.add(list2.get(i).getSalesmanNameSub());
		}
		System.out.println(list);
		return list;
		
	}
}
