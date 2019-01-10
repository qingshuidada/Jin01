package com.mdoa.app.controller;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.google.gson.Gson;
import com.mdoa.app.model.AppImage;
import com.mdoa.app.model.AppSort;
import com.mdoa.app.service.AppSortService;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.util.FileUtil;

@RestController
@RequestMapping("/sort")
public class AppSortController {

	@Autowired
	private AppSortService sortService;
	
	@RequestMapping("/selectAllSort.do")
	public String selectAllSort(AppSort appSort){
		Gson gson = new Gson();
		try{
			PageModel<AppSort> pageModel = sortService.selectAllSort(appSort);
			return gson.toJson(pageModel);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	@RequestMapping("/updateSort.do")
	public String editSortById(AppSort appSort){
		try {
			sortService.editSortById(appSort);
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			return Constant.SERVER_ERROR_CODE;
		}
		
		
	}
	@RequestMapping("/selectSortsBySortIdJ.do")
	public String selectSortsBySortIdJ(AppSort appSort){
		Gson gson = new Gson();
		try{
			PageModel<AppSort> pageModel = sortService.selectSortsBySortIdJ(appSort);
			return gson.toJson(pageModel);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 上传图片
	 * @param file
	 * @param request
	 * @return
	 */
	@RequestMapping("uploadImage.do")
	public String uploadImage(AppImage appImage,MultipartFile file,HttpServletRequest request){
		try {
			//判断文件是否为空
			if(!file.isEmpty()){
				String url = null;
				
				if(appImage.getSortId().equals("12") ||appImage.getSortId().equals("9")){
					url = "/img/app/compony/culture/";
				}
				if(appImage.getSortId().equals("11")){
					url = "/img/app/compony/style/";
				}
				FileUtil.uploadFile(file, request.getServletContext().getRealPath(url)+file.getOriginalFilename());
				appImage.setImageUrl(url+file.getOriginalFilename());
				sortService.addAppImage(appImage);
			}
			return Constant.SUCCESS_CODE;
		} catch (IllegalStateException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 根据不同的sortId 获取不同的图片
	 * @param appSort
	 * @return
	 */
	@RequestMapping("/selectAppImage.do")
	public String selectAppImage(AppImage appImage){
		Gson gson = new Gson();
		try{
			PageModel<AppImage> pageModel = sortService.selectAppImage(appImage);
			return gson.toJson(pageModel);
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
		
	}
	
	/**
	 * 删除图片
	 * @param appImage
	 * @return
	 */
	@RequestMapping("deleteImage.do")
	public String deleteImage(AppImage appImage){
		try{
			sortService.deleteImage(appImage);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
}
