package com.mdoa.repertory.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.mdoa.base.model.PageModel;
import com.mdoa.repertory.dao.ResultJianCeDao;
import com.mdoa.repertory.model.ResultJianCe;

@Service
@Transactional
public class ResultJianCeService {
	@Autowired
	private ResultJianCeDao resultJianCeDao;
	
	public PageModel<ResultJianCe> selectResultJianCe(ResultJianCe resultJianCe){
		PageHelper.startPage(resultJianCe.getPage(), resultJianCe.getRows());
		List<ResultJianCe> list = resultJianCeDao.selectResultJianCe(resultJianCe);
		PageModel<ResultJianCe> pageModel = new PageModel<>((Page<ResultJianCe>) list);
		return pageModel;
		
	}
}
