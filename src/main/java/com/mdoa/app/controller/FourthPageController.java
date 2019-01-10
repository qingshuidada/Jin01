package com.mdoa.app.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.mdoa.app.bo.FourthPageForm;
import com.mdoa.app.model.AppNewProduct;
import com.mdoa.app.model.AppProduct;
import com.mdoa.app.service.FourthPageService;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.util.FileUtil;

@RestController
@RequestMapping("/fourthPage")
public class FourthPageController {
	
	@Autowired
	private FourthPageService pageService;
	
	/**
	 * 查询所有的新品
	 * @param newProduct
	 * @return
	 */
	@RequestMapping("/selectNewProductBySortId.do")
	public String selectNewProductBySortId(){
		Gson gson = new Gson();
		try{
			FourthPageForm fourthPageForm = pageService.selectNewProductBySortId();
			return gson.toJson(fourthPageForm);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
	
	/**
	 * 根据新品id查询详细的信息
	 * @param newProduct
	 * @return
	 */
	@RequestMapping("selectNewProductById.do")
	public String selectNewProductById(AppNewProduct appnewProduct){
		Gson gson = new Gson();
		try{
			AppNewProduct appNewProduct = pageService.selectNewProductById(appnewProduct);
			return gson.toJson(appNewProduct);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
	/**
	 * 查询所有的新品
	 * @param appNewProduct
	 * @return
	 */
	@RequestMapping("/selectNewProduct.do")
	public String selectNewProduct(AppNewProduct appNewProduct){
		Gson gson = new Gson();
		try{
			PageModel<AppNewProduct> pageModel = pageService.selectNewProduct(appNewProduct);
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
	@RequestMapping("/addNewProduct.do")
	public String addNewProduct(AppNewProduct appNewProduct,MultipartFile file,HttpServletRequest request){
		try{
			if(!file.isEmpty()){
				String url = request.getServletContext().getRealPath("/img/app/newProduct/")+file.getOriginalFilename();
				FileUtil.uploadFile(file, url);
				String imageUrl = "/img/app/newProduct/"+file.getOriginalFilename();
				appNewProduct.setProductImageUrl(imageUrl);
				pageService.addNewProduct(appNewProduct);
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
	@RequestMapping("/deleteNewProductById.do")
	public String deleteNewProductById(AppNewProduct appNewProduct){
		try {
			pageService.deleteNewProductById(appNewProduct);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
}
