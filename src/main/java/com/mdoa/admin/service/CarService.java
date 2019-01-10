package com.mdoa.admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.admin.dao.CarDao;
import com.mdoa.admin.model.Car;
import com.mdoa.admin.model.CarApply;
import com.mdoa.admin.model.CarRepair;
import com.mdoa.base.model.PageModel;
import com.mdoa.util.StringUtil;

@Service
public class CarService {

	@Autowired
	private CarDao carDao;

	public void addCarMessage(Car car){
		if(!carDao.addCarMessage(car)){
			throw new RuntimeException("增加车辆信息失败");
		}
	}
	
	public void deleteCarMessage(Car car){
		if(!carDao.deleteCarMessage(car)){
			throw new RuntimeException("删除车辆信息失败");
		}
	}
	
	public void updateCarMessage(Car car){
		if(!carDao.updateCarMessage(car)){
			throw new RuntimeException("修改车辆信息失败");
		}
	}
	
	public PageModel<Car> selectCarMessage(Car car){
		if(!StringUtil.isEmpty(car.getCarNo())){
			car.setCarNo(car.getCarNo()+"%");
		}
		if(!StringUtil.isEmpty(car.getCarType())){
			car.setCarType(car.getCarType()+"%");
		}
		PageHelper.startPage(car.getPage(),car.getRows());
		List<Car> list = carDao.selectCarMessage(car);
		PageModel<Car> pageModel = new PageModel((Page)list);
		return pageModel;
	}
	
	public void addCarRepairbill(CarRepair carRepair){
		if(!carDao.addCarRepairbill(carRepair)){
			throw new RuntimeException("添加车辆维修单失败");
		}
	}
	
	public void deleteCarRepairbill(CarRepair carRepair){
		if(!carDao.deleteCarRepairbill(carRepair)){
			throw new RuntimeException("删除车辆维修单失败");
		}
	}
	
	public void updateCarRepairbill(CarRepair carRepair){
		if(!carDao.updateCarRepairbill(carRepair)){
			throw new RuntimeException("修改车辆维修单失败");
		}
	}
	
	public PageModel<CarRepair> selectCarRepairbill(CarRepair carRepair){
		if(!StringUtil.isEmpty(carRepair.getCarNo())){
			carRepair.setCarNo(carRepair.getCarNo()+"%");
		}
		PageHelper.startPage(carRepair.getPage(), carRepair.getRows());
		List<CarRepair> list = carDao.selectCarRepairbill(carRepair);
		PageModel<CarRepair> pageModel = new PageModel((Page)list);
		return pageModel;
	}
	
	public void addCarApplyNote(CarApply carApply){
		if(!carDao.addCarApplyNote(carApply)){
			throw new RuntimeException("增加车辆申请单失败");
		}
	}
	
	public void updateCarApplyNote(CarApply carApply){
		if(!carDao.updateCarApplyNote(carApply)){
			throw new RuntimeException("修改车辆申请单失败");
		}
	}
	
	public PageModel<CarApply> selectCarApplyNote(CarApply carApply){
		if(!StringUtil.isEmpty(carApply.getCarNo())){
			carApply.setCarNo(carApply.getCarNo()+"%");
		}
		PageHelper.startPage(carApply.getPage(), carApply.getRows());
		List<CarApply> list = carDao.selectCarApplyNote(carApply);
		PageModel<CarApply> pageModel = new PageModel((Page)list);
		return pageModel;
	}
}
