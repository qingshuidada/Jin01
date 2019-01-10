package com.mdoa.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.admin.model.Car;
import com.mdoa.admin.model.CarApply;
import com.mdoa.admin.model.CarRepair;
import com.mdoa.admin.service.CarService;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;

@RestController
@RequestMapping("/admin")
public class CarController {
	@Autowired
	private CarService carService;
	
	/**
	 * 增加车辆信息
	 * @param car
	 * @return
	 */
	@RequestMapping("/addCarMessage.do")
	public String addCarMessage(Car car){
		System.out.println(car.getBuyDate());
		try{
			carService.addCarMessage(car);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 删除车辆信息
	 * @param car
	 * @return
	 */
	@RequestMapping("/deleteCarMessage.do")
	public String deleteCarMessage(Car car){
		try {
			carService.deleteCarMessage(car);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 修改车辆信息
	 * @param car
	 * @return
	 */
	@RequestMapping("/updateCarMessage.do")
	public String updateCarMessage(Car car){
		try {
			carService.updateCarMessage(car);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 查询车辆信息 
	 * @param car
	 * @return
	 */
	@RequestMapping("/selectCarMessage.do")
	public String selectCarMessage(Car car){
		try {
			PageModel<Car> pageModel = carService.selectCarMessage(car);
			Gson gson = new Gson();
			return gson.toJson(pageModel);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
	/**
	 * 添加车辆维修单
	 * @param carRepair
	 * @return
	 */
	@RequestMapping("/addCarRepairbill.do")
	public String addCarRepairbill(CarRepair carRepair){
		try {
			carService.addCarRepairbill(carRepair);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 删除维修单
	 * @param carRepair
	 * @return
	 */
	@RequestMapping("/deleteCarRepairbill.do")
	public String deleteCarRepairbill(CarRepair carRepair){
		try {
			carService.deleteCarRepairbill(carRepair);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 修改维修单
	 * @param carRepair
	 * @return
	 */
	@RequestMapping("/updateCarRepairbill.do")
	public String updateCarRepairbill(CarRepair carRepair){
		try {
			carService.updateCarRepairbill(carRepair);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 查询车辆维修单 
	 * @param carRepair
	 * @return
	 */
	@RequestMapping("/selectCarRepairbill.do")
	public String selectCarRepairbill(CarRepair carRepair){
		try {
			PageModel<CarRepair> pageModel = carService.selectCarRepairbill(carRepair);
			Gson gson = new Gson();
			return gson.toJson(pageModel);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
	
	/**
	 * 添加车辆申请单
	 * @param carApply
	 * @return
	 */
	@RequestMapping("/addCarApplyNote.do")
	public String addCarApplyNote(CarApply carApply){
		try {
			carService.addCarApplyNote(carApply);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 可以删除 alive_flag = 0
	 * 更改此申请的状态   approval_status 0 审批中 1 审批通过 2 审批不通过
	 * @param carApply
	 * @return
	 */
	@RequestMapping("/updateCarApplyNote.do")
	public String updateCarApplyNote(CarApply carApply){
		try {
			carService.updateCarApplyNote(carApply);
			return Constant.SUCCESS_CODE;
		}catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	/**
	 * 查询车辆申请单
	 * @param carApply
	 * @return
	 */
	@RequestMapping("/selectCarApplyNote.do")
	public String selectCarApplyNote(CarApply carApply){
		try {
			PageModel<CarApply> pageModel = carService.selectCarApplyNote(carApply);
			Gson gson = new Gson();
			return gson.toJson(pageModel);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}	
	}
	
	
}
