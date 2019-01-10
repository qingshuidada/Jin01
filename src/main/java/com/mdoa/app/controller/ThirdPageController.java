package com.mdoa.app.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.mdoa.app.bo.ThirdPageForm;
import com.mdoa.app.bo.ThirdPageTwoForm;
import com.mdoa.app.model.AppProduct;
import com.mdoa.app.model.AppProductType;
import com.mdoa.app.model.AppSort;
import com.mdoa.app.service.ThirdPageService;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.util.FileUtil;

@RestController
@RequestMapping("/thirdPage")
public class ThirdPageController {

	@Autowired
	private ThirdPageService thirdPageService;
	
	/**
	 * 查询所有的车间
	 * @param appSort
	 * @return
	 */
	@RequestMapping("/selectAllWorkshop.do")
	public String selectAllWorkshop() {
		Gson gson = new Gson();
		try{
			ThirdPageForm thirdPageForm = thirdPageService.selectAllWorkshop();
			return gson.toJson(thirdPageForm);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
	
	/**
	 * 查询一个车间所有的产品类型和产品
	 * @param appSort 车间id
	 * @return
	 */
	@RequestMapping("/selectAllProduct.do")
	public String selectAllProduct(String sortId) {
		Gson gson = new Gson();
		try{
			ThirdPageTwoForm pageTwoForm = thirdPageService.selectAllProduct(sortId);
			return gson.toJson(pageTwoForm);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
	
	
	/**
	 * 根据产品类型的id查询产品
	 * @param typeId
	 * @return
	 */
	@RequestMapping("/selectProducts.do")
	public String selectProducts(String productTypeId) {
		Gson gson = new Gson();
		try{
			List<AppProduct> products = thirdPageService.selectProductByTypeId(productTypeId);
			return gson.toJson(products);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
	
	/**
	 * 根据产品的id查询产品的详细信息
	 * @param productId
	 * @return
	 */
	@RequestMapping("/selectProductById.do")
	public String selectProductById(String productId) {
		Gson gson = new Gson();
		try{
			AppProduct product = thirdPageService.selectProductById(productId);
			return gson.toJson(product);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
	
	//***************************pc端接口*******************************//
	/**
	 * 根据sortId查询车间的所有产品
	 * @param appProduct
	 * @return
	 */
	@RequestMapping("/selectProdutBySortId.do")
	public String selectProdutBySortId(AppProduct appProduct){
		Gson gson = new Gson();
		try{
			PageModel<AppProduct> pageModel = thirdPageService.selectProdutBySortId(appProduct);
			return gson.toJson(pageModel);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
	/**
	 * 根据sortId查询车间的所有产品类型
	 * @param appProduct
	 * @return
	 */
	@RequestMapping("/selectProductTypeBySortId.do")
	public String selectProductTypeBySortId(AppProductType appProductType){
		Gson gson = new Gson();
		try{
			PageModel<AppProductType> pageModel = thirdPageService.selectProductTypeBySortId(appProductType);
			return gson.toJson(pageModel);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
	/**
	 * 添加产品并上传图片
	 * @param appProduct
	 * @param file
	 * @param request
	 * @return
	 */
	@RequestMapping("/addProduct.do")
	public String addProduct(AppProduct appProduct,MultipartFile file,HttpServletRequest request){
		try{
			if(!file.isEmpty()){
				String url = request.getServletContext().getRealPath("/img/app/product/")+file.getOriginalFilename();
				FileUtil.uploadFile(file, url);
				String imageUrl = "/img/app/product/"+file.getOriginalFilename();
				appProduct.setProductImageUrl(imageUrl);
				thirdPageService.addProduct(appProduct);
			}
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 删除产品
	 * @param appProduct
	 * @return
	 */
	@RequestMapping("/deleteProductById.do")
	public String deleteProductById(AppProduct appProduct){
		try {
			thirdPageService.deleteProductById(appProduct);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
}
