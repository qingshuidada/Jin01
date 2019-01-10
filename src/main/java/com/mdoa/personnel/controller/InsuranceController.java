package com.mdoa.personnel.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.w3c.dom.ls.LSInput;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.constant.FileConstant;
import com.mdoa.personnel.bo.InsuranceForm;
import com.mdoa.personnel.bo.InsuranceTypeForm;
import com.mdoa.personnel.model.InsuranceType;
import com.mdoa.personnel.model.PersonPack;
import com.mdoa.personnel.service.InsuranceService;
import com.mdoa.user.model.UserInfo;
import com.mdoa.util.FileUtil;
import com.mdoa.util.JSONUtil;

@RestController
@RequestMapping("/insurance")
public class InsuranceController extends BaseController {

    @Autowired
    private InsuranceService insuranceService;

   /**
    * 导出社保信息到Excel
    * @param insuranceForm
    * @param jsonString
    * @param request
    * @param response
    * @return
    */
    @RequestMapping("exporttoExcel.do")
	public String exporttoExcel(InsuranceForm insuranceForm,String jsonString,HttpServletRequest request,HttpServletResponse response){
	    try {
			String filePath = FileConstant.FILE_PATH + FileConstant.SHORT_TIME_EXCEL + "/" +new Date().getTime() + ".xls";
			insuranceService.exporttoExcel(insuranceForm, jsonString, filePath);
			FileUtil.download(request, response, filePath, new Date().getTime()+".xls");
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
    
    /**
	 * 批量添加社保操作
	 * @param json
	 * @return
	 */
	@ResponseBody
	@RequestMapping("batchUpdateUserInfo.do")
    public String batchUpdateUserInfo(String json,HttpServletRequest request){
    	
		try {
			JSONObject jsonObject = new JSONObject(json);
			InsuranceForm insuranceForm = new  InsuranceForm();
			String string = jsonObject.get("socialIdList").toString();
			String[] idList = string.split(",");
			for (int i = 0; i < idList.length; i++) {
				insuranceForm.setInsuranceId(idList[i]);
				insuranceForm.setInsuranceSuperType(jsonObject.getString("superType"));
				insuranceService.updateInsurance(insuranceForm);
			}
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
    }
	
    /**
	 * 批量添加社保操作
	 * @param json
	 * @return
	 */
	@ResponseBody
	@RequestMapping("batchAddUserInfo.do")
    public String batchAddUserInfo(String json,HttpServletRequest request){
    	
		try {
			JSONObject jsonObject = new JSONObject(json);
			InsuranceForm insuranceForm = new  InsuranceForm();
			String string = jsonObject.get("list").toString();
			List<InsuranceForm> list = JSONUtil.<InsuranceForm>jsonToList(string, InsuranceForm[].class);
			for(int i = 0;i<list.size();i++){
				insuranceForm = list.get(i);
				insuranceForm.setInsuranceSuperType(jsonObject.getString("superType"));
				insuranceService.insertInsurance(insuranceForm);
			}
			return Constant.SUCCESS_CODE;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch (Exception e) {
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
    }
    
    /**
     * 查询无社保人员
     * 
     * @param insuranceForm
     * @return
     */
    @RequestMapping("/findAMRRUserInfo.do")
    public String findAMRRUserInfo(InsuranceForm insuranceForm) {
	try {
	    PageModel<InsuranceForm> list = insuranceService.findAMRRUserInfo(insuranceForm);
	    Gson gson = new Gson();
	    return gson.toJson(list);
	} catch (Exception e) {
	    e.printStackTrace();
	    return Constant.SERVER_ERROR_CODE;
	}
    }
    
    /**
     * 条件查询社保信息的方法 待测
     * 
     * @param insuranceForm
     * @return
     */
    @RequestMapping("/findInsuranceByCondition.do")
    public String findInsuranceByCondition(InsuranceForm insuranceForm) {
	try {
	    PageModel<InsuranceForm> list = insuranceService.findInsuranceByCondition(insuranceForm);
	    Gson gson = new Gson();
	    return gson.toJson(list);
	} catch (Exception e) {
	    e.printStackTrace();
	    return Constant.SERVER_ERROR_CODE;
	}
    }

    /**
     * 通过社保类型id查询员工社保信息的方法
     * 
     * @param
     * @return
     */
    @RequestMapping("/findInsuranceByTypeId.do")
    public String findInsuranceByTypeId(InsuranceForm insuranceForm) {
	try {
	    PageModel<InsuranceForm> list = insuranceService.findInsuranceByTypeId(insuranceForm);
	    Gson gson = new Gson();
	    return gson.toJson(list);
	} catch (Exception e) {
	    e.printStackTrace();
	    return Constant.SERVER_ERROR_CODE;
	}
    }

    /**
     * 通过员工id查询社保信息的方法
     * 
     * @param
     * @return
     */
    @RequestMapping("/findInsuranceByUserId.do")
    public String findInsuranceByUserId(InsuranceForm insuranceForm) {
	try {
	    PageModel<InsuranceForm> list = insuranceService.findInsuranceByUserId(insuranceForm);
	    Gson gson = new Gson();
	    return gson.toJson(list);
	} catch (Exception e) {
	    e.printStackTrace();
	    return Constant.SERVER_ERROR_CODE;
	}
    }

    /**
     * 通过社保大类型来查询社保类型信息的方法
     * 
     * @param insuranceTypeForm
     * @return
     */
    @RequestMapping("/findTypeBySuperType.do")
    public String findTypeBySuperType(InsuranceTypeForm insuranceTypeForm) {
	try {
	    PageModel<InsuranceTypeForm> list = insuranceService.findTypeBySuperType(insuranceTypeForm);
	    Gson gson = new Gson();
	    return gson.toJson(list);
	} catch (Exception e) {
	    e.printStackTrace();
	    return Constant.SERVER_ERROR_CODE;
	}
    }

    /**
     * 条件查询社保类型
     * 
     * @param insuranceTypeForm
     * @return
     */
    @RequestMapping("/findTypeByCondition.do")
    public String findTypeByCondition(InsuranceTypeForm insuranceTypeForm) {
	try {
	    PageModel<InsuranceType> list = insuranceService.findTypeByCondition(insuranceTypeForm);
	    Gson gson = new Gson();
	    return gson.toJson(list);
	} catch (Exception e) {
	    e.printStackTrace();
	    return Constant.SERVER_ERROR_CODE;
	}
    }

    /**
     * 插入社保信息的方法
     * 
     * @param
     * 
     */
    @RequestMapping("/insertInsurance.do")
    public String insertInsurance(InsuranceForm insuranceForm, HttpServletRequest request) {
	try {
	    UserInfo userInfo = getUser(request);
	    insuranceForm.setCreateUserId(userInfo.getUserId());
	    insuranceService.insertInsurance(insuranceForm);
	    return Constant.SUCCESS_CODE;
	} catch (RuntimeException e) {
	    e.printStackTrace();
	    return Constant.DATA_ERROR_CODE;
	} catch (Exception e) {
	    e.printStackTrace();
	    return Constant.SERVER_ERROR_CODE;
	}
    }

    /**
     * 插入社保类型的方法
     * 
     * @param insuranceTypeForm
     * @return
     */
    @RequestMapping("/insertInsuranceType.do")
    public String insertInsuranceType(InsuranceTypeForm insuranceTypeForm, HttpServletRequest request) {
	try {
	    UserInfo userInfo = getUser(request);
	    insuranceTypeForm.setCreateUserId(userInfo.getUserId());
	    insuranceService.insertInsuranceType(insuranceTypeForm);
	    return Constant.SUCCESS_CODE;
	} catch (RuntimeException e) {
	    e.printStackTrace();
	    return Constant.DATA_ERROR_CODE;
	} catch (Exception e) {
	    e.printStackTrace();
	    return Constant.SERVER_ERROR_CODE;
	}
    }

    /**
     * 删除社保信息
     * 
     * @param insuranceTypeForm
     * @param request
     * @return
     */
    @RequestMapping("/deleteInsurance.do")
    public String deleteInsurance(InsuranceForm insuranceForm, HttpServletRequest request) {
	try {
	    insuranceService.deleteInsurance(insuranceForm);
	    return Constant.SUCCESS_CODE;
	} catch (RuntimeException e) {
	    e.printStackTrace();
	    return Constant.DATA_ERROR_CODE;
	} catch (Exception e) {
	    e.printStackTrace();
	    return Constant.SERVER_ERROR_CODE;
	}
    }

    /**
     * 修改社保信息
     * 
     * @param insuranceTypeForm
     * @param request
     * @return
     */
    @RequestMapping("/updateInsurance.do")
    public String updateInsurance(InsuranceForm insuranceForm, HttpServletRequest request) {
	try {
	    insuranceService.updateInsurance(insuranceForm);
	    return Constant.SUCCESS_CODE;
	} catch (RuntimeException e) {
	    e.printStackTrace();
	    return Constant.DATA_ERROR_CODE;
	} catch (Exception e) {
	    e.printStackTrace();
	    return Constant.SERVER_ERROR_CODE;
	}
    }
}
