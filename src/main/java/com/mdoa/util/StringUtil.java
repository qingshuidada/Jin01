package com.mdoa.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;

import com.mdoa.qywx.util.AesException;

public class StringUtil {

	public static String convertStreamToString(InputStream is) {
		/*
		 * To convert the InputStream to String we use the
		 * BufferedReader.readLine() method. We iterate until the BufferedReader
		 * return null which means there's no more data to read. Each line will
		 * appended to a StringBuilder and returned as String.
		 */
		BufferedReader reader = new BufferedReader(new InputStreamReader(is));
		StringBuilder sb = new StringBuilder();

		String line = null;
		try {
			while ((line = reader.readLine()) != null) {
				sb.append(line + "\n");
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				is.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		return sb.toString();
	}

	/**
	 * 用SHA1算法生成安全签名
	 * 
	 * @param token
	 *            票据
	 * @param timestamp
	 *            时间戳
	 * @param nonce
	 *            随机字符串
	 * @param encrypt
	 *            密文
	 * @return 安全签名
	 * @throws AesException
	 */
	public static String getSHA1(String token, String timestamp, String nonce, String encrypt) throws AesException {
		try {
			String[] array = new String[] { token, timestamp, nonce, encrypt };
			StringBuffer sb = new StringBuffer();
			// 字符串排序
			Arrays.sort(array);
			for (int i = 0; i < 4; i++) {
				sb.append(array[i]);
			}
			String str = sb.toString();
			// SHA1签名生成
			MessageDigest md = MessageDigest.getInstance("SHA-1");
			md.update(str.getBytes());
			byte[] digest = md.digest();

			StringBuffer hexstr = new StringBuffer();
			String shaHex = "";
			for (int i = 0; i < digest.length; i++) {
				shaHex = Integer.toHexString(digest[i] & 0xFF);
				if (shaHex.length() < 2) {
					hexstr.append(0);
				}
				hexstr.append(shaHex);
			}
			return hexstr.toString();
		} catch (Exception e) {
			e.printStackTrace();
			throw new AesException(AesException.ComputeSignatureError);
		}
	}

	/**
	 * @author：Cento @description： SHA、SHA1加密 @parameter： str：待加密字符串 @return：
	 *               加密串
	 **/
	public static String SHA1(String str) {
		try {
			MessageDigest digest = java.security.MessageDigest.getInstance("SHA-1"); // 如果是SHA加密只需要将"SHA-1"改成"SHA"即可
			digest.update(str.getBytes());
			byte messageDigest[] = digest.digest();
			// Create Hex String
			StringBuffer hexStr = new StringBuffer();
			// 字节数组转换为 十六进制 数
			for (int i = 0; i < messageDigest.length; i++) {
				String shaHex = Integer.toHexString(messageDigest[i] & 0xFF);
				if (shaHex.length() < 2) {
					hexStr.append(0);
				}
				hexStr.append(shaHex);
			}
			return hexStr.toString();

		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * @author：Cento @description： SHA、SHA1加密 @parameter： str：待加密字符串 @return：
	 *               加密串
	 **/
	public static String SHA(String str) {
		try {
			MessageDigest digest = java.security.MessageDigest.getInstance("SHA");
			digest.update(str.getBytes());
			byte messageDigest[] = digest.digest();
			// Create Hex String
			StringBuffer hexStr = new StringBuffer();
			// 字节数组转换为 十六进制 数
			for (int i = 0; i < messageDigest.length; i++) {
				String shaHex = Integer.toHexString(messageDigest[i] & 0xFF);
				if (shaHex.length() < 2) {
					hexStr.append(0);
				}
				hexStr.append(shaHex);
			}
			return hexStr.toString();

		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 判断一个字符串是否是空的 如果这个字符串是空的则返回一个true，否则返回一个false
	 * 
	 * @param str
	 *            所需要进行判断的字符串
	 * @return boolean
	 */
	public static boolean isEmpty(String str) {
		if (str == null || str.trim().length() == 0)
			return true;
		return false;
	}

	/**
	 * 将一个 id或者name字符串拆分成一个字符串数组 按照 “,”逗号进行分割，并且能够去掉拆分后的首尾 " 引号
	 * 
	 * @param str
	 *            需要拆分的字符串
	 * @return 拆分后的字符串数组
	 */
	public static String[] splitString(String str) {
		return splitString(str, ",");
	}

	/**
	 * 将一个 id或者name字符串拆分成一个字符串数组 按照 split 逗号进行分割，并且能够去掉拆分后的首尾 " 引号
	 * 
	 * @param str
	 *            需要拆分的字符串
	 * @return 拆分后的字符串数组
	 */
	public static String[] splitString(String str, String split) {
		if (isEmpty(str) || isEmpty(split)) {
			return null;
		} else {
			String[] strs = str.split(split);
			for (int i = 0; i < strs.length; i++) {
				strs[i] = strs[i].substring(1, strs[i].length() - 1);
			}
			return strs;
		}
	}

	/**
	 * 从Url中获取父Id的方法
	 */
	public static String getParentIdFromUrl(String url) {
		String[] str = url.split("_");
		return str[str.length - 2];
	}

	/**
	 * 从Url中获取Id的方法
	 */
	public static String getIdFromUrl(String url) {
		int lastIndexOf = url.lastIndexOf("_");
		if (lastIndexOf == -1) 
			return url;
		return url.substring(lastIndexOf + 1, url.length());
	}

	/**
	 * 判断 parent 字符串是否包含 child 字符串，并且仅右模糊
	 * 
	 * @param child
	 * @param parent
	 * @return
	 */
	public static boolean isInclude(String parent, String child) {
		if (parent.substring(0, child.length()).equals(child)) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * 转换sex
	 * 
	 * @param sex
	 * @return
	 */
	public static String parseSex(String sex) {
		if (isEmpty(sex)) {
			return "";
		} else if (sex.equals("1")) {
			return "男";
		} else {
			return "女";
		}
	}

	/**
	 * 转换学历
	 * 
	 * @param education
	 * @return
	 */
	public static String parseEducation(String education) {
		if (isEmpty(education)) {
			return "";
		} else if (education.equals("1")) {
			return "初中";
		} else if (education.equals("2")) {
			return "高中";
		} else if (education.equals("3")) {
			return "专科";
		} else if (education.equals("4")) {
			return "本科";
		} else {
			return "硕士及以上";
		}
	}

	/**
	 * 转换inviteFlag
	 * 
	 * @param inviteFlag
	 * @return
	 */
	public static String parseInviteFlag(String inviteFlag) {
		if (isEmpty(inviteFlag)) {
			return "";
		} else if (inviteFlag.equals("1")) {
			return "在职";
		} else if (inviteFlag.equals("2")) {
			return "离职无手续";
		} else if (inviteFlag.equals("3")) {
			return "离职有手续";
		} else if (inviteFlag.equals("4")) {
			return "试用期";
		} else if (inviteFlag.equals("5")) {
			return "工伤";
		} else {
			return "待聘用";
		}
	}

	/**
	 * 转换退休状态
	 * 
	 * @param retireFlag
	 * @return
	 */
	public static String parseRetireFlag(String retireFlag) {
		if (isEmpty(retireFlag)) {
			return "";
		} else if (retireFlag.equals("1")) {
			return "正常";
		} else if (retireFlag.equals("2")) {
			return "退休";
		} else {
			return "退休返聘";
		}
	}

	/**
	 * 将字符串转为Like右模糊查询时所需要的字符串
	 */
	public static String toLikeRight(String str) {
		if (str != null && str.length() != 0) {
			return "'" + str + "%'";
		} else {
			return null;
		}
	}

	/**
	 * 将字符串转换为Like全模糊时所需的字符串
	 */
	public static String toLikeAll(String str) {
		if (str != null && str.length() != 0) {
			return "'%" + str + "%'";
		} else {
			return null;
		}
	}

	/**
	 * 获取一个12位的时间+随机数的随机编码
	 * 
	 * @return
	 */
	public static String getCode() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyMMddSSSS");
		String code = sdf.format(new Date());
		String random = "" + (int) (Math.random() * 99 + 1);
		if (random.length() == 1) {
			random = "0" + random;
		}
		return code + random;
	}

	public static String getReturnStr(String openId, String implementName,String nickname) {
	    String URL = null;
	    if (StringUtil.isEmpty(nickname)) {
		 URL = "/weixin/sendCenter.wx?openId=" + openId + "&implementName=" + implementName;
	    }else{
		 URL = "/weixin/sendCenter.wx?openId=" + openId + "&implementName=" + implementName+"&nickName=" + nickname;
	    }
		return URL;
	}
	
	public static String getProcessType(String typeId){
		String processType = "";
		switch (typeId) {
		case "001":
			processType = "请假申请";
			break;
		case "002":
			processType = "公出申请";
			break;
		case "003":
			processType = "离职申请";
			break;
		case "004":
			processType = "福利发放申请";
			break;
		case "005":
			processType = "合同交单申请";
			break;
		case "006":
			processType = "公文发放申请";
			break;
		case "007":
			processType = "补卡申请";
			break;
		default:
			processType = "申请";
			break;
		}
		return processType;
	}
	
	/** 
     * 使用java正则表达式去掉多余的.与0 如包含小数则保留两位
     * @param s 
     * @return
     */  
    public static Double subZeroAndDot(Double value){
    	String str = value + "";
    	if(str == null || "null".equals(str)){
    		return null;
    	}
        if(str.indexOf(".") > 0){
            str = str.replaceAll("0+?$", "");//去掉多余的0
            if(str.equals(str.replaceAll("[.]$", ""))){
            	DecimalFormat    df   = new DecimalFormat("#.00"); 
            	str = df.format(Double.parseDouble(str));
            }else{
            	str = str.replaceAll("[.]$", "");//如最后一位是.则去掉
            }
        }  
        return Double.parseDouble(str); 
    }
    
    /** 
     * 使用java正则表达式去掉多余的.与0 如包含小数则保留两位
     * @param s 
     * @return
     */  
    public static String subZeroAndDotStr(Double value){
    	String str = value + "";
    	if(str == null || "null".equals(str)){
    		return null;
    	}
        if(str.indexOf(".") > 0){
            str = str.replaceAll("0+?$", "");//去掉多余的0
            if(str.equals(str.replaceAll("[.]$", ""))){
            	DecimalFormat    df   = new DecimalFormat("#.00"); 
            	str = df.format(Double.parseDouble(str));
            }else{
            	str = str.replaceAll("[.]$", "");//如最后一位是.则去掉
            }
        }  
        return str; 
    }
    
    
    public static Double subZeroAndDot(Double value, DecimalFormat df){
    	String str = value + "";
    	if(str == null || "null".equals(str)){
    		return null;
    	}
        if(str.indexOf(".") > 0){
            str = str.replaceAll("0+?$", "");//去掉多余的0
            if(str.equals(str.replaceAll("[.]$", ""))){
            	str = df.format(Double.parseDouble(str));
            }else{
            	str = str.replaceAll("[.]$", "");//如最后一位是.则去掉
            }
        }  
        return Double.parseDouble(str); 
    }
    
    
    
    //把中文转化为utf-8
    public static String getUTU8String(String utfString){
    	if(utfString != null && utfString != ""){
	    	try {
				return URLEncoder.encode(utfString,"utf-8");
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
    	}
		return utfString;
    }
}
