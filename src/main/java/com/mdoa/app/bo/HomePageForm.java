package com.mdoa.app.bo;

import java.util.List;

import com.mdoa.app.model.AppFirm;
import com.mdoa.app.model.AppNewProduct;
import com.mdoa.app.model.AppProduct;
import com.mdoa.app.model.AppSort;

public class HomePageForm extends BaseForm{
	
	private List<AppSort> sorts;//车间
	private List<AppProduct> products;//我们的产品
	private AppFirm appFirm;//公司信息
	
	public List<AppSort> getSorts() {
		return sorts;
	}
	public void setSorts(List<AppSort> sorts) {
		this.sorts = sorts;
	}
	public List<AppProduct> getProducts() {
		return products;
	}
	public void setProducts(List<AppProduct> products) {
		this.products = products;
	}
	public AppFirm getAppFirm() {
		return appFirm;
	}
	public void setAppFirm(AppFirm appFirm) {
		this.appFirm = appFirm;
	}
	
	
	
}
