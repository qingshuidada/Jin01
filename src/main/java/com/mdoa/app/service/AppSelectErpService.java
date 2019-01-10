package com.mdoa.app.service;

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
import com.mdoa.base.model.PageModel;
import com.mdoa.erp.bo.ErpRegisterForm;
import com.mdoa.erp.bo.ErpSelectForm;
import com.mdoa.erp.bo.ErpTotalPages;
import com.mdoa.erp.dao.ErpLoginDao;
import com.mdoa.erp.dao.ErpRegisterDao;
import com.mdoa.erp.dao.ErpSelectDao;
import com.mdoa.erp.service.ErpSelectService;
import com.mdoa.util.StringUtil;

@Service
public class AppSelectErpService {

	@Autowired
	private ErpLoginDao erpLoginDao;
	
	@Autowired
	private ErpSelectService erpSelectService;
	
	@Autowired
	private ErpRegisterDao erpRegisterDao;
	
	 /**
     * erp APP 白胚入库明细
     * @param erpSelectForm
     * @return
     */
	public PageModel<ErpSelectForm> queryVbprkmxApp(ErpSelectForm erpSelectForm) {
		if (erpSelectForm.getKehuFlag() == null && !StringUtil.isEmpty(erpSelectForm.getKehu())) 
			erpSelectForm.setKehu(erpSelectForm.getKehu()+"%");
		if (erpSelectForm.getYwmanFlag() == null && !StringUtil.isEmpty(erpSelectForm.getYwman())) 
			erpSelectForm.setYwman(erpSelectForm.getYwman()+"%");
		if (!StringUtil.isEmpty(erpSelectForm.getDingzi())) 
			erpSelectForm.setDingzi("%"+erpSelectForm.getDingzi()+"%");
		if (!StringUtil.isEmpty(erpSelectForm.getPeiliao())) 
			erpSelectForm.setPeiliao("%"+erpSelectForm.getPeiliao()+"%");
		
		ErpSelectDao erpSelectDao = erpSelectService.getErpSelectDao(erpSelectForm);
		ErpTotalPages erpTotalPages = erpSelectDao.queryVbprkmxTotal(erpSelectForm);
		erpSelectForm.setTotal(erpTotalPages.getTotal());
		erpSelectForm.setInnerLines(erpSelectForm.getRows() * erpSelectForm.getPage());
		if(erpSelectForm.getPage() == erpTotalPages.getPages()){
			erpSelectForm.setOutterLines(erpSelectForm.getTotal() % erpSelectForm.getRows());
		}else {
			erpSelectForm.setOutterLines(erpSelectForm.getRows());
		}
		
		List<ErpSelectForm> list = erpSelectDao.queryVbprkmx(erpSelectForm);
		PageModel<ErpSelectForm> pageModel = new PageModel<>(list, erpTotalPages.getTotal());
		pageModel.setPage(erpSelectForm.getPage());
		return pageModel;
	}
	
	/**
	 * 白配库存
	 * @param erpSelectForm
	 * @return
	 */
	public PageModel<ErpSelectForm> queryVbpkc(ErpSelectForm erpSelectForm) {
		if (erpSelectForm.getKehuFlag() == null && !StringUtil.isEmpty(erpSelectForm.getKehu())) 
			erpSelectForm.setKehu(erpSelectForm.getKehu()+"%");
		if (erpSelectForm.getYwmanFlag() == null && !StringUtil.isEmpty(erpSelectForm.getYwman())) 
			erpSelectForm.setYwman(erpSelectForm.getYwman()+"%");
		if (!StringUtil.isEmpty(erpSelectForm.getDingzi())) 
			erpSelectForm.setDingzi("%"+erpSelectForm.getDingzi()+"%");
		if (!StringUtil.isEmpty(erpSelectForm.getPeiliao())) 
			erpSelectForm.setPeiliao("%"+erpSelectForm.getPeiliao()+"%");
		ErpSelectDao erpSelectDao = erpSelectService.getErpSelectDao(erpSelectForm);
		
		ErpTotalPages erpTotalPages = erpSelectDao.queryVbpkcTotal(erpSelectForm);
		erpSelectForm.setTotal(erpTotalPages.getTotal());
		erpSelectForm.setInnerLines(erpSelectForm.getRows() * erpSelectForm.getPage());
		if(erpSelectForm.getPage() == erpTotalPages.getPages()){
			erpSelectForm.setOutterLines(erpSelectForm.getTotal() % erpSelectForm.getRows());
		}else {
			erpSelectForm.setOutterLines(erpSelectForm.getRows());
		}
		
		List<ErpSelectForm> list = erpSelectDao.queryVbpkc(erpSelectForm);
		PageModel<ErpSelectForm> pageModel = new PageModel<>(list , erpTotalPages.getTotal());
		pageModel.setPage(erpSelectForm.getPage());
		return pageModel;
	}
	
	/**
	 * 订单查询
	 * @param erpSelectForm
	 * @return
	 */
	public PageModel<ErpSelectForm> queryVsaleordermx(ErpSelectForm erpSelectForm) {
		if (erpSelectForm.getKehuFlag() == null && !StringUtil.isEmpty(erpSelectForm.getKehu())) 
			erpSelectForm.setKehu(erpSelectForm.getKehu()+"%");
		if (erpSelectForm.getYwmanFlag() == null && !StringUtil.isEmpty(erpSelectForm.getYwman())) 
			erpSelectForm.setYwman(erpSelectForm.getYwman()+"%");
		if (!StringUtil.isEmpty(erpSelectForm.getDingzi())) 
			erpSelectForm.setDingzi("%"+erpSelectForm.getDingzi()+"%");
		if (!StringUtil.isEmpty(erpSelectForm.getPeiliao())) 
			erpSelectForm.setPeiliao("%"+erpSelectForm.getPeiliao()+"%");
		if (!StringUtil.isEmpty(erpSelectForm.getStartriqi())) 
			erpSelectForm.setStartddriqi(erpSelectForm.getStartriqi());
		if (!StringUtil.isEmpty(erpSelectForm.getEndriqi())) 
			erpSelectForm.setEndddriqi(erpSelectForm.getEndriqi());
		ErpSelectDao erpSelectDao = erpSelectService.getErpSelectDao(erpSelectForm);
		
		ErpTotalPages erpTotalPages = erpSelectDao.queryVsaleordermxTotal(erpSelectForm);
		erpSelectForm.setTotal(erpTotalPages.getTotal());
		erpSelectForm.setInnerLines(erpSelectForm.getRows() * erpSelectForm.getPage());
		if(erpSelectForm.getPage() == erpTotalPages.getPages()){
			erpSelectForm.setOutterLines(erpSelectForm.getTotal() % erpSelectForm.getRows());
		}else {
			erpSelectForm.setOutterLines(erpSelectForm.getRows());
		}
		
		List<ErpSelectForm> list = erpSelectDao.queryVsaleordermx(erpSelectForm);
		PageModel<ErpSelectForm> pageModel = new PageModel<>(list , erpTotalPages.getTotal());
		pageModel.setPage(erpSelectForm.getPage());
		return pageModel;
	}
	
	/**
	 * 生产进度
	 * @param erpSelectForm
	 * @return
	 */
	public PageModel<ErpSelectForm> queryVkasheng(ErpSelectForm erpSelectForm) {
		if (erpSelectForm.getKehuFlag() == null && !StringUtil.isEmpty(erpSelectForm.getKehu())) 
			erpSelectForm.setKehu(erpSelectForm.getKehu()+"%");
		if (erpSelectForm.getYwmanFlag() == null && !StringUtil.isEmpty(erpSelectForm.getYwman())) 
			erpSelectForm.setYwman(erpSelectForm.getYwman()+"%");
		if (!StringUtil.isEmpty(erpSelectForm.getDingzi())) 
			erpSelectForm.setDingzi("%"+erpSelectForm.getDingzi()+"%");
		if (!StringUtil.isEmpty(erpSelectForm.getPeiliao())) 
			erpSelectForm.setPeiliao("%"+erpSelectForm.getPeiliao()+"%");
		if (!StringUtil.isEmpty(erpSelectForm.getStartriqi())) 
			erpSelectForm.setStartkkriqi(erpSelectForm.getStartriqi());
		if (!StringUtil.isEmpty(erpSelectForm.getEndriqi())) 
			erpSelectForm.setEndkkriqi(erpSelectForm.getEndriqi());
		ErpSelectDao erpSelectDao = erpSelectService.getErpSelectDao(erpSelectForm);
		
		ErpTotalPages erpTotalPages = erpSelectDao.queryVkashengTotal(erpSelectForm);
		erpSelectForm.setTotal(erpTotalPages.getTotal());
		erpSelectForm.setInnerLines(erpSelectForm.getRows() * erpSelectForm.getPage());
		if(erpSelectForm.getPage() == erpTotalPages.getPages()){
			erpSelectForm.setOutterLines(erpSelectForm.getTotal() % erpSelectForm.getRows());
		}else {
			erpSelectForm.setOutterLines(erpSelectForm.getRows());
		}
		
		List<ErpSelectForm> list = erpSelectDao.queryVkasheng(erpSelectForm);
		PageModel<ErpSelectForm> pageModel = new PageModel<>(list,erpTotalPages.getTotal());
		pageModel.setPage(erpSelectForm.getPage());
		return pageModel;
	}
	
	/**
	 * 成品入库明细
	 * @param erpSelectForm
	 * @return
	 */
	public PageModel<ErpSelectForm> queryVspinput(ErpSelectForm erpSelectForm) {
		if (erpSelectForm.getKehuFlag() == null && !StringUtil.isEmpty(erpSelectForm.getKehu())) 
			erpSelectForm.setKehu(erpSelectForm.getKehu()+"%");
		if (erpSelectForm.getYwmanFlag() == null && !StringUtil.isEmpty(erpSelectForm.getYwman())) 
			erpSelectForm.setYwman(erpSelectForm.getYwman()+"%");
		if (!StringUtil.isEmpty(erpSelectForm.getDingzi())) 
			erpSelectForm.setDingzi("%"+erpSelectForm.getDingzi()+"%");
		if (!StringUtil.isEmpty(erpSelectForm.getPeiliao())) 
			erpSelectForm.setPeiliao("%"+erpSelectForm.getPeiliao()+"%");
		ErpSelectDao erpSelectDao = erpSelectService.getErpSelectDao(erpSelectForm);
		
		ErpTotalPages erpTotalPages = erpSelectDao.queryVspinputTotal(erpSelectForm);
		erpSelectForm.setTotal(erpTotalPages.getTotal());
		erpSelectForm.setInnerLines(erpSelectForm.getRows() * erpSelectForm.getPage());
		if(erpSelectForm.getPage() == erpTotalPages.getPages()){
			erpSelectForm.setOutterLines(erpSelectForm.getTotal() % erpSelectForm.getRows());
		}else {
			erpSelectForm.setOutterLines(erpSelectForm.getRows());
		}
		
		List<ErpSelectForm> list = erpSelectDao.queryVspinput(erpSelectForm);
		PageModel<ErpSelectForm> pageModel = new PageModel<>(list,erpTotalPages.getTotal());
		pageModel.setPage(erpSelectForm.getPage());
		return pageModel;
	}
	
	/**
	 * 成品库存
	 * @param erpSelectForm
	 * @return
	 */
	public PageModel<ErpSelectForm> queryVspkc(ErpSelectForm erpSelectForm) {
		if (erpSelectForm.getKehuFlag() == null && !StringUtil.isEmpty(erpSelectForm.getKehu())) 
			erpSelectForm.setKehu(erpSelectForm.getKehu()+"%");
		if (erpSelectForm.getYwmanFlag() == null && !StringUtil.isEmpty(erpSelectForm.getYwman())) 
			erpSelectForm.setYwman(erpSelectForm.getYwman()+"%");
		if (!StringUtil.isEmpty(erpSelectForm.getDingzi())) 
			erpSelectForm.setDingzi("%"+erpSelectForm.getDingzi()+"%");
		if (!StringUtil.isEmpty(erpSelectForm.getPeiliao())) 
			erpSelectForm.setPeiliao("%"+erpSelectForm.getPeiliao()+"%");
		ErpSelectDao erpSelectDao = erpSelectService.getErpSelectDao(erpSelectForm);
		
		ErpTotalPages erpTotalPages = erpSelectDao.queryVspkcTotal(erpSelectForm);
		erpSelectForm.setTotal(erpTotalPages.getTotal());
		erpSelectForm.setInnerLines(erpSelectForm.getRows() * erpSelectForm.getPage());
		if(erpSelectForm.getPage() == erpTotalPages.getPages()){
			erpSelectForm.setOutterLines(erpSelectForm.getTotal() % erpSelectForm.getRows());
		}else {
			erpSelectForm.setOutterLines(erpSelectForm.getRows());
		}
		
		List<ErpSelectForm> list = erpSelectDao.queryVspkc(erpSelectForm);
		PageModel<ErpSelectForm> pageModel = new PageModel<>(list,erpTotalPages.getTotal());
		pageModel.setPage(erpSelectForm.getPage());
		return pageModel;
	}
	
	/**
	 * 工序
	 * @param erpSelectForm
	 * @return
	 */
	public List<ErpSelectForm> queryVkashenggx(ErpSelectForm erpSelectForm) {
		if (erpSelectForm.getKehuFlag() == null && !StringUtil.isEmpty(erpSelectForm.getKehu())) 
			erpSelectForm.setKehu(erpSelectForm.getKehu()+"%");
		if (erpSelectForm.getYwmanFlag() == null && !StringUtil.isEmpty(erpSelectForm.getYwman())) 
			erpSelectForm.setYwman(erpSelectForm.getYwman()+"%");
		if (!StringUtil.isEmpty(erpSelectForm.getDingzi())) 
			erpSelectForm.setDingzi("%"+erpSelectForm.getDingzi()+"%");
		if (!StringUtil.isEmpty(erpSelectForm.getPeiliao())) 
			erpSelectForm.setPeiliao("%"+erpSelectForm.getPeiliao()+"%");
		ErpSelectDao erpSelectDao = erpSelectService.getErpSelectDao(erpSelectForm);
		//PageHelper.startPage(erpSelectForm.getPage(), erpSelectForm.getRows());
		List<ErpSelectForm> list = erpSelectDao.queryVkashenggx(erpSelectForm);
		//PageModel<ErpSelectForm> pageModel = new PageModel<>((Page<ErpSelectForm>)list);
		//pageModel.setPage(erpSelectForm.getPage());
		return list;
	}
	
	/**
	 * 客户查询
	 * @param erpRegisterForm
	 * @return
	 */
	public PageModel<ErpRegisterForm> queryCustomerBySalesman(ErpRegisterForm erpRegisterForm) {
		if (!StringUtil.isEmpty(erpRegisterForm.getCustomerName())) 
			erpRegisterForm.setCustomerName("%"+erpRegisterForm.getCustomerName()+"%");
			
		PageHelper.startPage(erpRegisterForm.getPage(),erpRegisterForm.getRows());
		List<ErpRegisterForm> list = erpRegisterDao.queryCustomerBySalesman(erpRegisterForm);
		PageModel<ErpRegisterForm> pageModel = new PageModel<>((Page<ErpRegisterForm>)list);
		pageModel.setPage(erpRegisterForm.getPage());
		
		return pageModel;
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
}
