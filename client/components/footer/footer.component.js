import angular from 'angular';

export class FooterComponent {

	constructor(UI) {
		'ngInject';
		this.UI = UI;
	}

}

export default angular.module('directives.footer', [])
  .component('footer', {
    template: require('./footer.html'),
    controller: FooterComponent
  })
  .name;
