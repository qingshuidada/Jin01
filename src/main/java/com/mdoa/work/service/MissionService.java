package com.mdoa.work.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.google.gson.Gson;
import com.mdoa.base.model.PageModel;
import com.mdoa.constant.FileConstant;
import com.mdoa.qywx.bo.QywxForm;
import com.mdoa.qywx.bo.SendText;
import com.mdoa.qywx.bo.SendTextMessage;
import com.mdoa.qywx.dao.QywxDao;
import com.mdoa.qywx.util.HttpXmlClient;
import com.mdoa.system.model.UserSystemMessage;
import com.mdoa.system.service.MessageService;
import com.mdoa.user.dao.UserDao;
import com.mdoa.user.dao.UserInfoDao;
import com.mdoa.util.QywxAppUtil;
import com.mdoa.util.StringUtil;
import com.mdoa.work.dao.MissionDao;
import com.mdoa.work.model.Mission;
import com.mdoa.work.model.MissionHead;
import com.mdoa.work.model.MissionUser;

@Service
@Transactional
public class MissionService {

	@Autowired
	private MissionDao missionDao;
	@Autowired
	private MessageService messageService;
	@Autowired
	private UserInfoDao userInfoDao;
	@Autowired
	private QywxDao qywxDao;
	
	private String sCorpID = FileConstant.S_CORP_ID;
	private String wxClockAgentId = FileConstant.WX_CLOCK_AGENT_ID;
	private String wxClockSecrect = FileConstant.WX_CLOCK_SECRECT;
	private String wxClockToken = FileConstant.WX_CLOCK_TOKEN;
	private String wxClockEncodingKey = FileConstant.WX_CLOCK_ENCODING_KEY;
	private String wxClockAccessToken;
	
	/**
	 * 修改任务的状态
	 * @param mission
	 */
	public void updateMissionState(Mission mission) {	
		if (mission.getMissionState() == null) {
			if(mission.getRealityValue().equals("100")){//执行人提交任务
				Date date =  new Date();
				SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd"); 
				mission.setRealityEndTimeStr(df.format(date));
				mission.setMissionState("2");
				if (!missionDao.updateMissionHead(mission)) 
					throw new RuntimeException("修改任务失败");
				UserSystemMessage message = getMassage(mission);
				messageService.sendSystemMessage(message,"");
			}else {
				if (!missionDao.updateMissionHead(mission)) 
					throw new RuntimeException("修改任务失败");
			}
		}else if (mission.getMissionState().equals("3")) {//驳回
			mission.setRealityValue("0");//把执行人的任务进度改为0
			if (!missionDao.updateMissionHead(mission)) 
				throw new RuntimeException("修改任务失败");
			sendQywxMessage(mission.getHeadUserId(), mission.getLaunchUserId(), "3");
			UserSystemMessage message = getMassage(mission);
			messageService.sendSystemMessage(message,"");
		}else if (mission.getMissionState().equals("4")) {//通过
			if (!missionDao.updateMissionHead(mission)) 
				throw new RuntimeException("修改任务失败");
			sendQywxMessage(mission.getHeadUserId(), mission.getLaunchUserId(), "4");
			UserSystemMessage message = getMassage(mission);
			messageService.sendSystemMessage(message,"");
		}
	}
	
	/**
	 * 
	 * @param mission
	 */
	public void insertMission(Mission mission) {
		String missionId = missionDao.getuuid();
		mission.setMissionId(missionId);
		if (!missionDao.insertMission(mission)) 
			throw new RuntimeException("添加任务失败");
		String[] userIds = mission.getUserIds().split(",");
		MissionUser missionUser = new MissionUser();
		for (int i = 0; i < userIds.length; i++) {
			missionUser.setMissionId(missionId);
			missionUser.setUserId(userIds[i]);
			sendQywxMessage(mission.getLaunchUserId(), userIds[i], "1");
			UserSystemMessage message = getMassage("1", mission);
			message.setUserId(mission.getHeadUserId());
			messageService.sendSystemMessage(message,"");
			if (!missionDao.insertMissionUser(missionUser)){
				throw new RuntimeException("添加任务查看人失败");
			}
		}
		String[] headUserIds = mission.getHeadUserIds().split(",");
		MissionHead missionHead = new MissionHead();
		for(int i = 0;i < headUserIds.length; i++){
			missionHead.setMissionId(missionId);
			missionHead.setHeadUserId(headUserIds[i]);
			missionHead.setHeadUserName(userInfoDao.selectUserName(headUserIds[i]));
			sendQywxMessage(mission.getLaunchUserId(), headUserIds[i], "2");
			UserSystemMessage message = getMassage("2", mission);
			message.setUserId(headUserIds[i]);
			messageService.sendSystemMessage(message,"");
			if (!missionDao.insertMissionHead(missionHead)) {
				throw new RuntimeException("添加执行人失败");
			}
		}
	}
	
	public void updateMission(Mission mission) {
		if (!missionDao.updateMission(mission)) 
			throw new RuntimeException("修改任务失败");
	}
	public void updateMissionHead(Mission mission) {
		if (!missionDao.updateMissionHead(mission)) 
			throw new RuntimeException("修改任务失败");
	}
	public void deleteMission(Mission mission) {
		if (!missionDao.deleteMission(mission)) 
			throw new RuntimeException("删除任务失败");
	}
	public PageModel<Mission> selectMission(Mission mission){
		if (!StringUtil.isEmpty(mission.getMissionName())) {
			mission.setMissionName(mission.getMissionName()+"%");
		}
		if (!StringUtil.isEmpty(mission.getLaunchUserName())) {
			mission.setLaunchUserName(mission.getLaunchUserName()+"%");
		}
		PageHelper.startPage(mission.getPage(), mission.getRows());
		List<Mission> list = missionDao.selectMission(mission);
		PageModel<Mission> pageModel = new PageModel<>((Page<Mission>)list);
		return pageModel;
	}
	
	public PageModel<Mission> selectUserToviewMission(Mission mission){
		if (!StringUtil.isEmpty(mission.getLaunchUserName())) {
			mission.setLaunchUserName(mission.getLaunchUserName()+"%");
		}
		if (!StringUtil.isEmpty(mission.getMissionName())) {
			mission.setMissionName(mission.getMissionName()+"%");
		}
		PageHelper.startPage(mission.getPage(), mission.getRows());
		List<Mission> list = missionDao.selectUserToviewMission(mission);
		PageModel<Mission> pageModel = new PageModel<>((Page<Mission>)list);
		return pageModel;
	}
	
	public PageModel<Mission> selectMissionUserName(Mission mission){
		PageHelper.startPage(mission.getPage(), mission.getRows());
		List<Mission> list = missionDao.selectMissionUserName(mission);
		PageModel<Mission> pageModel = new PageModel<>((Page<Mission>)list);
		return pageModel;
	}
	public PageModel<Mission> selectMissionHeadUser(Mission mission){
		if (!StringUtil.isEmpty(mission.getMissionName())) {
			mission.setMissionName(mission.getMissionName()+"%");
		}
		PageHelper.startPage(mission.getPage(), mission.getRows());
		List<Mission> list = missionDao.selectMissionHeadUser(mission);
		PageModel<Mission> pageModel = new PageModel<>((Page<Mission>)list);
		return pageModel;
	}
	public PageModel<Mission> selectMissionByUser(Mission mission){
		PageHelper.startPage(mission.getPage(), mission.getRows());
		List<Mission> list = missionDao.selectMissionByUser(mission);
		PageModel<Mission> pageModel = new PageModel<>((Page<Mission>)list);
		return pageModel;
	}
	public PageModel<Mission> selectUserChargeMission(Mission mission){
		if (!StringUtil.isEmpty(mission.getMissionName())) {
			mission.setMissionName(mission.getMissionName()+"%");
		}
		PageHelper.startPage(mission.getPage(), mission.getRows());
		List<Mission> list = missionDao.selectUserChargeMission(mission);
		PageModel<Mission> pageModel = new PageModel<>((Page<Mission>)list);
		return pageModel;
	}
	
	public PageModel<Mission> selectMissionByMissionId(Mission mission){
		PageHelper.startPage(mission.getPage(), mission.getRows());
		List<Mission> list = missionDao.selectMissionByMissionId(mission);
		PageModel<Mission> pageModel = new PageModel<>((Page<Mission>)list);
		return pageModel;
	}

	
	public static UserSystemMessage getMassage(String flag,Mission mission){
		UserSystemMessage message = new UserSystemMessage();
		if(flag.equals("1")){
			String mss = "您有一条"+mission.getLaunchUserName()+"发起的任务需要完成,请到任务管理中查看";
			String url = "../../html/workOfficeDoc/missionManage/myChargeMission.html";
			message.setMessage(mss);
			message.setUrl(url);
			message.setSendUserId(mission.getLaunchUserId());
			message.setSendUserName(mission.getLaunchUserName());
		}else if (flag.equals("2")) {
			String mss = "您有一条"+mission.getLaunchUserName()+"发起的任务需要完成,请到任务管理中查看";
			String url = "../../html/workOfficeDoc/missionManage/myChargeMission.html";
			message.setMessage(mss);
			message.setUrl(url);
			message.setSendUserId(mission.getLaunchUserId());
			message.setSendUserName(mission.getLaunchUserName());
		}
		return message;
	}
	/**
	 * 修改任务状态 根据不同的状态，发送不同的消息
	 * @param missionstate
	 * @return
	 */
	public static UserSystemMessage getMassage(Mission mission){
		UserSystemMessage message = new UserSystemMessage();
		if(mission.getRealityValue().equals("100")){
			String mss = "您有一条任务,负责人已确认完成,需要您审批,请到任务管理中查看";
			String url = "../../html/workOfficeDoc/missionManage/myChargeMission.html";
			message.setMessage(mss);
			message.setUrl(url);
			message.setSendUserId(mission.getHeadId());
			message.setSendUserName(mission.getHeadUserName());
			message.setUserId(mission.getLaunchUserId());
		}else if (mission.getMissionState().equals("3")) {
			String mss = "您有一条任务,发起人已审批驳回,请到任务管理中查看";
			String url = "../../html/workOfficeDoc/missionManage/myChargeMission.html";
			message.setMessage(mss);
			message.setUrl(url);
			message.setSendUserId(mission.getLaunchUserId());
			message.setSendUserName(mission.getLaunchUserName());
			message.setUserId(mission.getHeadUserId());
		}else if (mission.getMissionState().equals("4")) {
			String mss = "您有一条任务,发起人已审批通过,请到任务管理中查看";
			String url = "../../html/workOfficeDoc/missionManage/myChargeMission.html";
			message.setMessage(mss);
			message.setUrl(url);
			message.setSendUserId(mission.getLaunchUserId());
			message.setSendUserName(mission.getLaunchUserName());
			message.setUserId(mission.getHeadUserId());
		}	
		return message;
	}
	
	/**
	 * 发送消息给企业微信的用户
	 * @param sendUserId 发送人
	 * @param userId 接受人
	 * @param flag 区分发送的消息
	 */
	public void sendQywxMessage(String sendUserId,String userId,String flag){
		List<QywxForm> sendUsers = qywxDao.getQywxUserId(sendUserId);
		List<QywxForm> users = qywxDao.getQywxUserId(userId);
		if(sendUsers != null && sendUsers.size() > 0){
			SendTextMessage sendTextMessage = new SendTextMessage();
			QywxForm sendUser = sendUsers.get(0);
			QywxForm user = users.get(0);
			SendText sendText = QywxAppUtil.getSendMessageContent(sendUser.getUserName(), flag);
			sendTextMessage.setTouser(user.getQywxUserId());
			sendTextMessage.setMsgtype("text");
			sendTextMessage.setAgentid(wxClockAgentId);
			sendTextMessage.setText(sendText);
			JSONObject result;
			try {
				Gson gson = new Gson();
				if (StringUtil.isEmpty(wxClockAccessToken)) {
					wxClockAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxClockSecrect);
				}
				result = HttpXmlClient.httpPostWithJsonStr(
						"https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=" + wxClockAccessToken,
						gson.toJson(sendTextMessage));
				if ("42001".equals(QywxAppUtil.getResultErrcode(result))) {
					wxClockAccessToken = QywxAppUtil.getAccessToken(sCorpID, wxClockSecrect);
					result = HttpXmlClient.httpPostWithJsonStr(
							"https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=" + wxClockAccessToken,
							gson.toJson(sendTextMessage));
				}
			} catch (Exception e) {
				e.printStackTrace();
				System.out.println("发送消息失败");
			}
		}
	}
	
}
