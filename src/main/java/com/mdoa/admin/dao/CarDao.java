package com.mdoa.admin.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.mdoa.admin.model.Car;
import com.mdoa.admin.model.CarApply;
import com.mdoa.admin.model.CarRepair;

public interface CarDao {

	boolean addCarMessage(Car car);
	
	boolean deleteCarMessage(Car car);
	
	boolean updateCarMessage(Car car);
	
	List<Car> selectCarMessage(Car car);
	
	boolean addCarRepairbill(CarRepair carRepair);
	
	boolean deleteCarRepairbill(CarRepair carRepair);
	
	boolean updateCarRepairbill(CarRepair carRepair);
	
	List<CarRepair> selectCarRepairbill(CarRepair carRepair);
	
	boolean addCarApplyNote(CarApply carApply);
	
	boolean updateCarApplyNote(CarApply carApply);
	
	List<CarApply> selectCarApplyNote(CarApply carApply);
	
	boolean test();
}
