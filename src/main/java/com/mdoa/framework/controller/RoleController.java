package com.mdoa.framework.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.framework.bo.RoleForm;
import com.mdoa.framework.model.Power;
import com.mdoa.framework.model.Role;
import com.mdoa.framework.service.RoleService;
import com.mdoa.user.model.UserInfo;

@RestController
@RequestMapping("role")
public class RoleController extends BaseController{
	
	@Resource
	private RoleService roleSerive;
	
	/**
	 * 获取角色列表
	 * @param form 筛选条件，包含角色名，角色创建时间，所拥有权限名
	 * @return 角色列表
	 */
	@RequestMapping("getRolePowerList.do")
	public String getRolePowerList(RoleForm form){
		try{
			PageModel<Role> roles = roleSerive.getRolePowerList(form);
			Gson gson = new Gson();
			return gson.toJson(roles);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 获取角色列表
	 * @param form 筛选条件，包含角色名，角色创建时间，所拥有权限名
	 * @return 角色列表
	 */
	@RequestMapping("getRoleList.do")
	public String getRoleList(RoleForm form){
		try{
			PageModel<Role> roles = roleSerive.getRoleList(form);
			Gson gson = new Gson();
			return gson.toJson(roles);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 添加用户角色
	 * @param role 角色信息
	 * @param powers 权限Id，以下划线“_”进行分割
	 * @return 成功标志位
	 */
	@RequestMapping("addRole.do")
	public String addRole(Role role, HttpServletRequest request){
		try{
			//设置创建人信息
			UserInfo user = getUser(request);
			role.setCreateUserId(user.getUserId());
			role.setCreateUserName(user.getUserName());
			//调用service
			roleSerive.addRole(role);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 对用户角色的权限进行更新，这种更新实质上为删除原本的所有权限，之后再添加新的权限
	 * @param form 权限Id列表， 角色Id
	 * @return 是否成功标识
	 */
	@RequestMapping("updatePower.do")
	public String updatePower(RoleForm form, HttpServletRequest request){
		try{
			UserInfo user = super.getUser(request);
			form.setUserId(user.getUserId());
			form.setUserName(user.getUserName());
			roleSerive.updatePower(form);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 批量删除或者删除单独的 用户角色
	 * @param form roleIds 以逗号分隔的 Id 列表
	 * @return 删除是否成功标识
	 */
	@RequestMapping("deleteRole.do")
	public String deleteRole(RoleForm form, HttpServletRequest request){
		try{
			UserInfo user = super.getUser(request);
			form.setUserId(user.getUserId());
			form.setUserName(user.getUserName());
			roleSerive.deleteRole(form);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 修改角色的角色名，和备注信息
	 * @param role roleName，roleId，remark 
	 * @return 是否修改成功
	 */
	@RequestMapping("updateRole.do")
	public String updateRole(Role role, HttpServletRequest request){
		try{
			UserInfo user = super.getUser(request);
			role.setUpdateUserId(user.getUserId());
			role.setUpdateUserName(user.getUserName());
			roleSerive.updateRole(role);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 根据用户Id来查询用户的权限信息
	 */
	@RequestMapping("queryUserRoleByUserId.do")
	public String queryUserRoleByUserId(String userId){
		try{
			List<Role> roles = roleSerive.queryUserRoleByUserId(userId);
			Gson gson = new Gson();
			return gson.toJson(roles);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 根据角色Id查询角色所持有的权限
	 */
	@RequestMapping("queryRolePower.do")
	public String queryRolePower(String roleId){
		try{
			List<Power> roles = roleSerive.queryRolePower(roleId);
			Gson gson = new Gson();
			return gson.toJson(roles);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
}
