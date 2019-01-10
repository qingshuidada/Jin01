package com.mdoa.work.dao;

import java.util.List;

import com.mdoa.work.model.Mission;
import com.mdoa.work.model.MissionHead;
import com.mdoa.work.model.MissionUser;

public interface MissionDao {

	String getuuid();
	boolean insertMission(Mission mission);
	
	boolean insertMissionHead(MissionHead missionHead);
	
	boolean insertMissionUser(MissionUser missionUser);
	
	boolean updateMission(Mission mission);
	
	boolean updateMissionHead(Mission mission);
	
	boolean deleteMission(Mission mission);
	
	List<Mission> selectMission(Mission mission);
	
	List<Mission> selectUserToviewMission(Mission mission);
	
	List<Mission> selectMissionUserName(Mission mission);
	
	List<Mission> selectMissionHeadUser(Mission mission);
	
	List<Mission> selectMissionByUser(Mission mission);
	
	List<Mission> selectUserChargeMission(Mission mission);
	
	List<Mission> selectMissionByMissionId(Mission mission);
}
