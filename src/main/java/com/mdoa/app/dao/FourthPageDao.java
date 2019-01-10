package com.mdoa.app.dao;

import java.util.List;

import com.mdoa.app.model.AppNewProduct;

public interface FourthPageDao {

	List<AppNewProduct> selectNewProductBySortId(String sortId);
	
	AppNewProduct selectNewProductById(String productId);
	
	boolean addNewProduct(AppNewProduct appNewProduct);
	
	boolean deleteProductById(AppNewProduct appNewProduct);
	
	//List<AppNewProduct> selectNewProductBySortIdJZH(String productId);
}
