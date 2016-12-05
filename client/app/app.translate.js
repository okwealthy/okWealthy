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
	this.lang = this.storage.lang || 'hk';

	$translate.use(this.lang);

	this.toggle = function(){

		if ($translate.use() === 'hk'){
			$translate.use('en');
			this.lang = 'en';
		}else{
			$translate.use('hk');
			this.lang = 'hk';
		}

	}.bind(this);


})
.name;
