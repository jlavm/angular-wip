(function(){
	var app = angular.module('resumenClienteModule', []);
	
	app.directive('indicadoresFija', function(){
		return{
			restrict: 'A',
			templateUrl: '/David/views/indicadores-fija.html'			
		};
	});	
})();