package com.mdoa.security.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
/**
 * 
 * @author Administrator
 * 该注解用于进行对权限的控制，
 * 必须在用户持有某些权限中的一个时，才则予以放行
 * 相关代码需查看SecurityFilter
 */
@Target(value=ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface HasPermissions {
	/**
	 * 可以访问所进行注解的权限的数组对象，
	 * 当具有该数组对象中的任意一个权限时，可以进行访问
	 */
	String[] permissions();
}
