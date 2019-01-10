package com.mdoa.weixin.dao;

import java.util.List;

import com.mdoa.weixin.bo.WeixinForm;

public interface WeixinDao {
	/**
	 * 判断客户是否绑定
	 * @param weixinForm
	 * @return
	 */
	List<WeixinForm> checkCustomerBind(WeixinForm weixinForm);
	/**
	 * 判断业务员是否绑定
	 * @param weixinForm
	 * @return
	 */
	List<WeixinForm> checkSalesmanBind(WeixinForm weixinForm);
	/**
	 * 验证帐号密码的正确性
	 * @param weixinForm
	 * @return
	 */
	List<WeixinForm> checkExistCustomer(WeixinForm weixinForm);
	List<WeixinForm> checkExistSalesman(WeixinForm weixinForm);
	/**
	 * 进行客户绑定
	 * @param weixinForm
	 * @return
	 */
	boolean insertErpWeixin(WeixinForm weixinForm);
	/**
	 * 解除绑定
	 * @param weixinForm
	 * @return
	 */
	boolean unBind(WeixinForm weixinForm);
	/**
	 * 根据openid查询嘻嘻你
	 * @param weixinForm
	 * @return
	 */
	List<WeixinForm> queryUserMessage(WeixinForm weixinForm);
	/**
	 * 该客户是否绑定了其他微信
	 * @param weixinForm
	 * @return
	 */
	List<WeixinForm> checkOpenForUser(WeixinForm weixinForm);
	List<WeixinForm> checkOpenForUserHaveOpenId(WeixinForm weixinForm);

}
