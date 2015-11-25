(function(){
	var app = angular.module('hero', []);

	app.controller('TabController', function(){
		this.tab = 1;

		this.setTab = function(setTab){
			this.tab = setTab;
		};

		this.selectTab = function(selectTab){
			return this.tab === selectTab;
		}
	});
})();