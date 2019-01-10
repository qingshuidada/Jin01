package com.mdoa.app.dao;

import java.util.List;

import com.mdoa.app.model.AppProduct;
import com.mdoa.app.model.AppProductType;

public interface ThirdPageDao {

	
	List<AppProductType> selectProductTypeBySortId(String sortId);
	
	List<AppProduct> selectProductByTypeId(String typeId);
	
	AppProduct selectProductById(String productId);
	
	List<AppProduct> selectProdutBySortId(String sortId);
	
	List<AppProduct> selectProducts();
	
	boolean addProduct(AppProduct appProduct);
	
	boolean deleteProductById(AppProduct appProduct);
}
