'use strict';

import 'ngstorage';
import 'angular-translate';

var dict = {};

dict['ui.defaultuser'] = {
	en: 'Customer',
	hk: '小明'
};
dict['ui.home'] = {
	en: 'Home',
	hk: '首頁'
};
dict['ui.platform'] = {
	en: 'Platform',
	hk: '平台'
};

dict['ui.physicalweb'] = {
	en: 'Physical Web',
	hk: '實體商網'
};

dict['ui.online'] = {
	en: 'Online',
	hk: '在綫'
};

dict['ui.welcometo'] = {
	en: 'Welcome to ',
	hk: '歡迎光臨 '
};



dict['ui.fastlogin'] = {
	en: 'Fast Login',
	hk: '快速登入'
};

dict['ui.login'] = {
	en: 'Login',
	hk: '登入'
};

dict['ui.signup'] = {
	en: 'Sign Up',
	hk: '登記'
};

dict['ui.search'] = {
	en: 'Search',
	hk: '搜尋'
};

dict['ui.platformdesc'] = {
	en: 'Creating Physical Traffic for SMB Community in HK.',
	hk: '為香港中小企吸引人流的互助商網平台。'
};

dict['ui.menu'] = {
	en: 'Menu',
	hk: '功能表'
};

dict['ui.webtitle'] = {
	en: 'OK-Wealthy Physical Web',
	hk: 'OK-Wealthy 實體商網'
};

dict['ui.signintostartsession'] = {
	en: 'Sign in to start your session.',
	hk: '登入以開始使用本系統。'
};

dict['ui.or'] = {
	en: 'OR',
	hk: '或者'
};

dict['ui.usefb'] = {
	en: 'Sign in using Facebook',
	hk: '用 Facebook 登入'
};

dict['ui.usegplus'] = {
	en: 'Sign in using Google+',
	hk: '用 Google+ 登入'
};

dict['ui.registernewuser'] = {
	en: 'Register a new membership.',
	hk: '登記一個新用戶'
};

dict['ui.ialreadyhaveamembership'] = {
	en: 'I already have a membership',
	hk: '我已經有一個賬戶。'
};

dict['ui.iagreeto'] = {
	en: 'I agree to the ',
	hk: '我同意'
};

dict['ui.terms'] = {
	en: 'Terms',
	hk: '用戶條款'
};

dict['ui.fullname'] = {
	en: 'Full name',
	hk: '全名'
};

dict['ui.email'] = {
	en: 'Email',
	hk: '電郵'
};

dict['ui.password'] = {
	en: 'Password',
	hk: '密碼'
};

dict['ui.retypepassword'] = {
	en: 'Retype password',
	hk: '確認密碼'
};

dict['ui.business'] = {
	en: 'Business',
	hk: '生意'
};

dict['ui.setupyourbusiness'] = {
	en: 'Setup your business.',
	hk: '準備你生意的資料。'
};

dict['ui.boss'] = {
	en: 'Boss',
	hk: '老闆'
};

dict['ui.createbusiness'] = {
	en: 'Create Business',
	hk: '建立生意資料'
};

dict['ui.businessdetail'] = {
	en: 'Business Detail',
	hk: '生意資料'
};

dict['ui.name'] = {
	en: 'Name',
	hk: '名稱'
};

dict['ui.info'] = {
	en: 'Info',
	hk: '資料'
};

dict['ui.active'] = {
	en: 'Active',
	hk: '啟用'
};

dict['ui.create'] = {
	en: 'Create',
	hk: '建立'
};

dict['ui.cancel'] = {
	en: 'Cancel',
	hk: '取消'
};

dict['ui.update'] = {
	en: 'Update',
	hk: '更新'
};

dict['ui.updateinfo'] = {
	en: 'Update Info',
	hk: '更新資料'
};

dict['ui.edit'] = {
	en: 'Edit',
	hk: '修改'
};

dict['ui.trash'] = {
	en: 'Trash',
	hk: '註銷'
};

dict['ui.trashed'] = {
	en: 'Trashed',
	hk: '已註銷'
};

dict['ui.restore'] = {
	en: 'Restore',
	hk: '還原'
};

dict['ui.manager'] = {
	en: 'Manager',
	hk: '經理'
};

dict['ui.staff'] = {
	en: 'Staff',
	hk: '員工'
};

dict['ui.managestaff'] = {
	en: 'Create and Manage Staff',
	hk: '建立及管理員工帳號'
};

dict['ui.manageuser'] = {
	en: 'Manage User',
	hk: '管理賬戶'
};

dict['ui.user'] = {
	en: 'User',
	hk: '用戶'
};

dict['ui.delete'] = {
	en: 'Delete',
	hk: '刪除'
};

dict['ui.role'] = {
	en: 'Role',
	hk: '角色'
};

dict['ui.notice'] = {
	en: 'Notice',
	hk: '提示'
};

dict['ui.setuprequired'] = {
	en: 'Business Info Setup required.',
	hk: '還未安裝生意資料。'
};


dict['ui.gotobusinesssetup'] = {
	en: 'Please go setup business info.',
	hk: '請建立生意資料。'
};

dict['ui.managing'] = {
	en: 'Management',
	hk: '管理'
};

dict['ui.sysadmin'] = {
	en: 'System Admin',
	hk: '系統管理員'
};

dict['ui.admin'] = {
	en: 'Admin',
	hk: '管理員'
};

dict['ui.category'] = {
	en: 'Category',
	hk: '類別'
};

dict['ui.product'] = {
	en: 'Product',
	hk: '商品'
};

dict['ui.manageproductcategory'] = {
	en: 'Manage Product Category',
	hk: '管理商品類別'
};

dict['ui.'] = {
	en: '',
	hk: ''
};

dict['ui.'] = {
	en: '',
	hk: ''
};

dict['ui.'] = {
	en: '',
	hk: ''
};

dict['ui.'] = {
	en: '',
	hk: ''
};





var props = {
	en: {},
	hk: {}
};

export default angular.module('owApp.translate', ['ngStorage', 'pascalprecht.translate'])
.config(['$translateProvider', function ($translateProvider) {
	

	angular.forEach(props, function(pItem, pKey){

		angular.forEach(dict, function(item, key){
			props[pKey][key] = item[pKey];
		});

		$translateProvider.translations(pKey, props[pKey]);

	});
	
	$translateProvider.preferredLanguage('hk');
	$translateProvider.useSanitizeValueStrategy('escape');
}])
.filter('to', function(Trans, $translate){
	'ngInject';
	return function(obj){
		return obj[$translate.use()];
	};
})
.service('Trans', function($localStorage, $translate){
	'ngInject';

	this.storage = $localStorage;
	this.storage.lang = this.storage.lang || 'hk';
	this.lang = this.storage.lang;

	$translate.use(this.lang);

	this.toggle = function(){

		if ($translate.use() === 'hk'){
			$translate.use('en');
			this.lang = 'en';
			this.storage.lang = 'en';
		}else{
			$translate.use('hk');
			this.lang = 'hk';
			this.storage.lang = 'hk';
		}

	}.bind(this);


})
.name;
