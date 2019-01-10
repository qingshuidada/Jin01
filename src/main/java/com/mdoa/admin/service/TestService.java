package com.mdoa.admin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mdoa.admin.dao.CarDao;

@Transactional
@Service
public class TestService {
	@Autowired
	private CarDao carDao;
	
	public void test(){
		carDao.test();
		int i = 0/0;
	}
}
