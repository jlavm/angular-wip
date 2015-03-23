
(function(){

	var datos={
		Actividad:'Abanicos',
		SectorActividad:'omercio al Por Menor',
		SubsectorActividad:'Textil, Piel y Calzado',
		ClienteTarifario:'ESTANDAR',
		ClaseAbono:'NO PARTICULAR',
		DatosGuía:'/',
		Central:'2810031',
		Publicidad:'',
		IndicadorAverías:'NO'
	};

	angular.module('fija', []).controller('FijaCtrl',function(){
	
	this.datosFija = datos;
	
	});

	
})();