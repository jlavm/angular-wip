function crearTablaDetalleOrdenacion(id, data, columnas, columnaOrdenInicial, cadenaDom, ctrlEventoFiltro, ctrlEventoDetalle, responsive) {
	var table = $('#'+id).DataTable( {
                  "dom": cadenaDom,
				          "responsive": responsive,
                  "bPaginate": false,
                  "bInfo": false,
                  "bJQueryUI": true,
                  "language" : { "search" : "Buscar:", "zeroRecords" : "No existen registros coincidentes"},
                  "autoWidth": false,
                  //"ajax": data,
                  "data": data,
                  "columns": columnas,
                  "order": [[columnaOrdenInicial, 'asc']]
              } );

			     if(ctrlEventoFiltro) {
	 			   //Evento de filtrado en la tablas
	              $('#'+id).on( 'search.dt', function (event) { 
	                var filasFiltradas = $("#"+id).dataTable()._('tr', {"filter": "applied"});

	                if (filasFiltradas.length == 0) {
	                  $("#"+id+"_wrapper div.scroll-div-tabla").css( "overflow-x", "hidden" );
	                }
	                else {
	                  $("#"+id+"_wrapper div.scroll-div-tabla").css( "overflow-x", "scroll" );
	                }
	              } );
	          }
               
            if (ctrlEventoDetalle) {
                //Evento para abrir el detalle
                $('#'+id+' tbody').on('click', 'img.details-control', function () {
                    var tr = $(this).parent().closest('tr');
                    var row = table.row( tr );
             
                    if ( row.child.isShown() ) {
                        //fila abierta, se cierra
                        row.child.hide();
                    }
                    else {
                        //se abre la fila
                        row.child( format(row.data(), id) ).show();
                    }
                } );
            }

	return table;
}

function crearTablaDetalleOrdenacionParqueInstalado(id, data, columnas, columnaOrdenInicial, cadenaDom, cadenaTotal,ctrlEventoFiltro, ctrlEventoDetalle, responsive) {
  var table = $('#'+id).DataTable( {
                  "dom": cadenaDom,
                  "responsive": responsive,
                  "bPaginate": false,
                  "bInfo": false,
                  "bJQueryUI": true,
                  "language" : { "search" : "Buscar:", "zeroRecords" : "No existen registros coincidentes"},
                  "autoWidth": false,
                  //"ajax": data,
                  "data": data,
                  "columns": columnas,
                  "order": [[columnaOrdenInicial, 'asc']],
                   "total": cadenaTotal
              } );

           if(ctrlEventoFiltro) {
           //Evento de filtrado en la tablas
                $('#'+id).on( 'search.dt', function (event) { 
                  var filasFiltradas = $("#"+id).dataTable()._('tr', {"filter": "applied"});

                  if (filasFiltradas.length == 0) {
                    $("#"+id+"_wrapper div.scroll-div-tabla").css( "overflow-x", "hidden" );
                  }
                  else {
                    $("#"+id+"_wrapper div.scroll-div-tabla").css( "overflow-x", "scroll" );
                  }
                } );
            }
               
            if (ctrlEventoDetalle) {
                //Evento para abrir el detalle
                $('#'+id+' tbody').on('click', 'img.details-control', function () {
                    var tr = $(this).parent().closest('tr');
                    var row = table.row( tr );
             
                    if ( row.child.isShown() ) {
                        //fila abierta, se cierra
                        row.child.hide();
                    }
                    else {
                        //se abre la fila
                        row.child( format(row.data(), id) ).show();
                    }
                } );
            }

  return table;
}



function format (d, id) {
      if (id == 'tablaPedidoFija') {
            return '<table style="padding-left:5%; width: 90%;">'+
                '<tr>'+
                  '<td colspan="11">'+
                    '<div class="row row-header formulario detalle" style="text-align: left;">'+
                                '<div class="row separacion-filas">'+
                                   '<div class="col-lg-1 col-md-1 col-sm-1">'+
                                      '<label>Sistema</label>'+
                                   '</div>'+
                                   '<div class="col-lg-1 col-md-1 col-sm-1">'+
                                      '<input disabled="true" type="text" class="form-control input-sm" value="'+d.sistema+'" aria-label="..." />'+
                                   '</div>'+

                                   '<div class="col-lg-2 col-md-2 col-sm-2">'+
                                      '<label>F. Baremo</label>'+
                                   '</div>'+
                                   '<div class="col-lg-2 col-md-2 col-sm-2">'+
                                      '<input disabled="true" type="text" class="form-control input-sm" value="'+d.febaremo+'" aria-label="..." />'+
                                   '</div>'+

                                   '<div class="col-lg-1 col-md-1 col-sm-1">'+
                                      '<label>Provincia</label>'+
                                   '</div>'+
                                   '<div class="col-lg-5 col-md-5 col-sm-5">'+
                                      '<input disabled="true" type="text" class="form-control input-sm" value="'+d.provincia+'" aria-label="..." />'+
                                   '</div>'+
                                '</div>'+

                                '<div class="row separacion-filas">'+
                                   '<div class="col-lg-1 col-md-1 col-sm-1">'+
                                      '<label>S. Tramitador</label>'+
                                   '</div>'+
                                   '<div class="col-lg-1 col-md-1 col-sm-1">'+
                                      '<input disabled="true" type="text" class="form-control input-sm" value="'+d.sistematramit+'" aria-label="..." />'+
                                   '</div>'+

                                   '<div class="col-lg-2 col-md-2 col-sm-2">'+
                                      '<label>F. Compromiso</label>'+
                                   '</div>'+
                                   '<div class="col-lg-2 col-md-2 col-sm-2">'+
                                      '<input disabled="true" type="text" class="form-control input-sm" value="'+d.fecompromiso+'" aria-label="..." />'+
                                   '</div>'+

                                   '<div class="col-lg-1 col-md-1 col-sm-1">'+
                                      '<label>Domicilio</label>'+
                                   '</div>'+
                                   '<div class="col-lg-5 col-md-5 col-sm-5">'+
                                      '<input disabled="true" type="text" class="form-control input-sm" value="'+d.domicilio+'" aria-label="..." />'+
                                   '</div>'+
                                '</div>'+

                                '<div class="row separacion-filas">'+
                                  '<div class="col-lg-1 col-md-1 col-sm-1">'+
                                      '<label>S. Origen</label>'+
                                   '</div>'+
                                   '<div class="col-lg-1 col-md-1 col-sm-1">'+
                                      '<input disabled="true" type="text" class="form-control input-sm" value="'+d.sistemaorigen+'" aria-label="..." />'+
                                   '</div>'+

                                   '<div class="col-lg-2 col-md-2 col-sm-2">'+
                                      '<label>F. Cumplimentación</label>'+
                                   '</div>'+
                                   '<div class="col-lg-2 col-md-2 col-sm-2">'+
                                      '<input disabled="true" type="text" class="form-control input-sm" value="'+d.fecumplimentacion+'" aria-label="..." />'+
                                   '</div>'+

                                   '<div class="col-lg-1 col-md-1 col-sm-1">'+
                                      '<label>Detalle</label>'+
                                   '</div>'+
                                   '<div class="col-lg-5 col-md-5 col-sm-5">'+
                                      '<input disabled="true" type="text" class="form-control input-sm" value="'+d.detalle+'" aria-label="..." />'+
                                   '</div>'+
                                '</div>'+
                             '</div>'+
                  '</td>'+
                '</tr>'+
            '</table>';
      }
      else if (id == 'tablaPedidoFusion') {
              return '<table style="padding-left:5%; width: 90%;">'+
                '<tr>'+
                '<td colspan="9">'+
                   '<div class="row row-header formulario detalle" style="text-align: left;">'+
                                '<div class="row separacion-filas">'+
                                   '<div class="col-lg-2 col-md-2 col-sm-2">'+
                                      '<label>Código Error</label>'+
                                   '</div>'+
                                   '<div class="col-lg-2 col-md-2 col-sm-2">'+
                                      '<input disabled="true" type="text" class="form-control input-sm" value="'+d.coderror+'" aria-label="..." />'+
                                   '</div>'+

                                   '<div class="col-lg-2 col-md-2 col-sm-2">'+
                                      '<label>Descripción Error</label>'+
                                   '</div>'+
                                   '<div class="col-lg-6 col-md-6 col-sm-6">'+
                                      '<input disabled="true" type="text" class="form-control input-sm" value="'+d.descerror+'" aria-label="..." />'+
                                   '</div>'+
                                '</div>'+

                                '<div class="row separacion-filas">'+
                                   '<div class="col-lg-2 col-md-2 col-sm-2">'+
                                      '<label>F. Inicio Ejecución</label>'+
                                   '</div>'+
                                   '<div class="col-lg-2 col-md-2 col-sm-2">'+
                                      '<input disabled="true" type="text" class="form-control input-sm" value="'+d.feiniejec+'" aria-label="..." />'+
                                   '</div>'+
                                   '<div class="col-lg-2 col-md-2 col-sm-2">'+
                                      '<label>Desc. Operación</label>'+
                                   '</div>'+
                                   '<div class="col-lg-6 col-md-6 col-sm-6">'+
                                      '<input disabled="true" type="text" class="form-control input-sm" value="'+d.descoperacion+'" aria-label="..." />'+
                                   '</div>'+
                                '</div>'+

                                '<div class="row separacion-filas">'+
                                   '<div class="col-lg-2 col-md-2 col-sm-2">'+
                                      '<label>F. Fin Ejecución</label>'+
                                   '</div>'+
                                   '<div class="col-lg-2 col-md-2 col-sm-2">'+
                                      '<input disabled="true" type="text" class="form-control input-sm" value="'+d.fefinejec+'" aria-label="..." />'+
                                   '</div>'+
                                   '<div class="col-lg-2 col-md-2 col-sm-2">'+
                                      '<label>Desc. Serv. Comercial</label>'+
                                   '</div>'+
                                   '<div class="col-lg-6 col-md-6 col-sm-6">'+
                                      '<input disabled="true" type="text" class="form-control input-sm" value="'+d.descservcomercial+'" aria-label="..." />'+
                                   '</div>'+    
                                '</div>'+                             
                             '</div>'+
                  '</td>'+
                '</tr>'+
            '</table>';
      } else if (id == 'tablaNOL') {
            return '<div class="row">'+
						'<div class="col-xs-12">'+
						'<div class="row row-header formulario detalle" style="text-align: left;">'+
							'<div class="form-group">'+
									   '<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">'+
										  '<label>Plan Facturación</label>'+
										  '<input disabled="true" type="text" class="form-control input-sm"  value="'+d.planFacturacion+'" aria-label="..." />'+
									   '</div>'+
							'</div>'+
							'<div class="form-group">'+
									   '<div class="col-lg-4 col-md-3 col-sm-6 col-xs-12">'+
										  '<label>Plan Tarificación</label>'+
										  '<input disabled="true" type="text" class="form-control input-sm"  value="'+d.planTarificacion+'" aria-label="..." />'+
									   '</div>'+
							'</div>'+
							'<div class="form-group">'+
									   '<div class="col-lg-4 col-md-3 col-sm-6 col-xs-12">'+
										  '<label>Plan Descuento</label>'+
										  '<input disabled="true" type="text" class="form-control input-sm"  value="'+d.planDescuento+'" aria-label="..." />'+
									   '</div>'+
							'</div>'+
							'<div class="form-group">'+
									   '<div class="col-lg-2 col-md-3 col-sm-3 col-xs-6">'+
										  '<label>Servicio</label>'+
										  '<input disabled="true" type="text" class="form-control input-sm" value="'+d.servicio+'" aria-label="..." />'+
									   '</div>'+
							'</div>'+
							'<div class="form-group">'+
									   '<div class="col-lg-2 col-md-3 col-sm-3 col-xs-6">'+
										  '<label>Cuenta Cliente</label>'+
										  '<input disabled="true" type="text" class="form-control input-sm" value="'+d.cuentaCliente+'" aria-label="..." />'+
									   '</div>'+
							'</div>'+
							'<div class="form-group">'+
									   '<div class="col-lg-8 col-md-6 col-sm-12 col-xs-12">'+
										  '<label>Motivo Baja</label>'+
										  '<input disabled="true" type="text" class="form-control input-sm"  value="'+d.motivoBaja+'" aria-label="..." />'+
									   '</div>'+
							'</div>'+
						 '</div>'+
						'</div>'+
						'<div class="col-xs-12" style="padding: 0 35px 0 35px;">'+
							 '<div class="tabla-ctc table-responsive" style="text-align: right;">'+
							
							   '<table class="tabla-ctc table table-hover content">'+
								  '<thead>'+
									' <tr>'+
										'<th>Actuación</th>'+
										'<th>Tipo Actuación</th>'+
										'<th>Cod.Servicio</th>'+
										'<th>Nombre Servicio</th>'+
										'<th>Fecha Modificación</th>'+
										'<th>Usu Modif.</th>'+
									' </tr>'+
								 ' </thead>'+
								  '<tbody>'+
									' <tr class="fila-tabla-ctc">'+
										'<td>' + d.actuacion + '</td>'+
										'<td>' + d.tipoActuacion + '</td>'+
										'<td>' + d.codigoServicio + '</td>'+
										'<td>' + d.nombreServicio + '</td>'+
										'<td>' + d.fechaModificacion + '</td>'+
										'<td>' + d.usuarioModificacion + '</td>'+
									 '</tr>'+
								  '</tbody>'+
							   '</table>'+
						
							'</div>'+
						'</div>';
      } else if (id == 'tablaContactos') {
			return '<table style="padding-left:5%; width: 90%;">'+
                '<tr>'+
                  '<td colspan="11">'+
                    '<div class="row row-header formulario detalle" style="text-align: left;">'+
						'<div class="row separacion-filas">'+
						   '<div class="col-lg-1 col-md-1 col-sm-1">'+
							  '<label>Asunto 1</label>'+
						   '</div>'+
						   '<div class="col-lg-11 col-md-11 col-sm-11">'+
							  '<input disabled="true" type="text" class="form-control input-sm" value="'+d.asunto1+'" aria-label="..." />'+
						   '</div>'+
						'</div>'+
						'<div class="row separacion-filas">'+
						   '<div class="col-lg-1 col-md-1 col-sm-1">'+
							  '<label>Asunto 2</label>'+
						   '</div>'+
						   '<div class="col-lg-11 col-md-11 col-sm-11">'+
							  '<input disabled="true" type="text" class="form-control input-sm" value="'+d.asunto2+'" aria-label="..." />'+
						   '</div>'+
						'</div>'+
                    '</div>'+
                  '</td>'+
                '</tr>'+
            '</table>';
	  }
  }