package com.mdoa.system.controller;
/**
 * 系统信息
 */
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.mdoa.base.controller.BaseController;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.Constant;
import com.mdoa.system.model.UserSystemMessage;
import com.mdoa.system.service.MessageService;
@RestController
@RequestMapping("/system")
public class MessageController extends BaseController{
	@Autowired
	private MessageService messageService;
	
	/**
	 * 发送结束流程的消息
	 */
	/*@RequestMapping("/sendEndMessage.do")
	public void sendEndMessage(ProcessModel process){
		messageService.sendEndMessage(process);
	}*/
	/**
	 * 发送下一个审批人的消息
	 */
	/*@RequestMapping("/sendEndMessage.do")
	public void sendNextMessage(ProcessModel process, TaskModel taskModel){
		messageService.sendNextMessage(process, taskModel);
	}*/
	/**
	 * 查询系统信息
	 * @param message
	 * @param request
	 * @return
	 */
	@RequestMapping("/selectMessageByUser.do")
	public String selectMessageByUser(UserSystemMessage message,HttpServletRequest request){
		try{
			PageModel<UserSystemMessage> pageModel = messageService.selectMessageByUser(message, request);
			Gson gson = new Gson();
			return gson.toJson(pageModel);
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	/**
	 * 更改信息为已读
	 * @param message
	 * @return
	 */
	@RequestMapping("/updateMessageRead.do")
	public String updateMessageRead(UserSystemMessage message){
		try{
			messageService.updateMessageRead(message);
			return Constant.SUCCESS_CODE;
		}catch(RuntimeException e){
			e.printStackTrace();
			return Constant.DATA_ERROR_CODE;
		}catch(Exception e){
			e.printStackTrace();
			return Constant.SERVER_ERROR_CODE;
		}
	}
	
	
}
