$(document).ready(function() {
    $('[data-toggle="offcanvas"]').click(function() {
        $('.row-offcanvas').toggleClass('active')
    });

    aplicarTooltips();

});

function aplicarTooltips() {
    $('[rel="tooltip"]').tooltip({
        'delay': { show: 750 }
    });
}

var posx;
var posy;

function getMouse(e) {
    posx = 0;
    posy = 0;
    if (!e) var e = window.event;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    } else if (e.clientX || e.clientY) {
        posx = e.clientX;
        posy = e.clientY;
    }
}

/* Muestra deplegable de acciones de los botones */
function showDiv(id) {
    var obj = $('#' + id);
    obj.css("left", posx + 25 + 'px');
    obj.css("top", posy + 'px');
    obj.css("display", "block");
    /*var divPosition = $('#' + id).offset();
    $('html, body').animate({
        scrollTop: divPosition.top
    }, "slow");*/

}

$( "html" ).mousemove(function( event ) {
  getMouse(event);
});

$('html').on('click', function(e) {
    if (!$(e.target).is('.action-but')) {
        //console.log("hide");
        $('#actionsMenuPopUp').css('display', 'none');
    } else {
        //console.log("show");
        insertarEnlacesDesplegable(e);
        showDiv('actionsMenuPopUp');
    }

});

function insertarEnlacesDesplegable(e) {
    if ($(e.target).is('.desplegableLstPedFija')) {
        $('#actionsMenuPopUp').html('<ul class="dropdown-menu desplegableHorizontal bordeDesplegableHorizontal" role="menu">'+
            '<li><a href="#">Devoluciones</a></li>'+
            '<li><a href="#">Consulta ITSM</a></li>'+
            '<li><a href="#">Consultar Incidencia</a></li>'+
            '<li><a href="#">Estado Contrato</a></li>'+
            '<li><a href="#">Seguimiento</a></li>'+
          '</ul>'+
          '<ul class="dropdown-menu desplegableHorizontal bordeDesplegableHorizontal" role="menu">'+
            '<li><a href="#">Reclamar</a></li>'+
            '<li><a href="#">Contactos</a></li>'+
            '<li><a href="#">Detalle Provísión</a></li>'+
            '<li><a href="#">Alta Aviso SIA</a></li>'+
            '<li><a href="#">Histórico Estados</a></li>'+
          '</ul>'+
          '<ul class="dropdown-menu desplegableHorizontal" role="menu">'+
            '<li><a href="#">Anular</a></li>'+
            '<li><a href="#">Motivo Anulación</a></li>'+
            '<li><a href="#">Boletines G1</a></li>'+
            '<li><a href="#">Fecha Instalación</a></li>'+
            '<li><a href="#">Notas VisorD</a></li>'+
          '</ul>');
    }
    else if ($(e.target).is('.desplAccionesGeneralesPedFija')) {
        $('#actionsMenuPopUp').html('<ul class="dropdown-menu desplegableHorizontal" role="menu">'+
            '<li><a href="#">Reclamar SUR</a></li>'+
            '<li><a href="#">Acceso SIA</a></li>'+
            '<li><a href="#">Incidencias</a></li>'+
          '</ul>');
    }
    else if ($(e.target).is('.desplAccAveriasFija')) {
        $('#actionsMenuPopUp').html('<ul class="dropdown-menu desplegableHorizontal" role="menu">'+
            '<li><a href="#">Detalle</a></li>'+
            '<li><a href="#">Reclamar</a></li>'+
            '<li><a href="#">Seguimiento</a></li>'+
          '</ul>');
    } 
    else if ($(e.target).is('.desplAccAveriasMovil')) {
        $('#actionsMenuPopUp').html('<ul class="dropdown-menu desplegableHorizontal" role="menu">'+
            '<li><a href="#">Reclamar</a></li>'+
          '</ul>');
    }
    else if ($(e.target).is('.desplAccReclFija')) {
        $('#actionsMenuPopUp').html('<ul class="dropdown-menu desplegableHorizontal" role="menu">'+
            '<li><a href="#">Detalle</a></li>'+
            '<li><a href="#">Contactos</a></li>'+
            '<li><a href="#">Seguimiento</a></li>'+
          '</ul>');
    } 
    else if ($(e.target).is('.desplAccGenReclFija')) {
        $('#actionsMenuPopUp').html('<ul class="dropdown-menu desplegableHorizontal" role="menu">'+
            '<li><a href="#">Sur GEA</a></li>'+
            '<li><a href="#">Reclamacion SUR</a></li>'+
            '<li><a href="#">Abrir GEAS</a></li>'+
            '<li><a href="#">Reclamar Atención</a></li>'+
          '</ul>');
    } 
    else if ($(e.target).is('.desplAccReclMovil')) {
        $('#actionsMenuPopUp').html('<ul class="dropdown-menu desplegableHorizontal" role="menu">'+
            '<li><a href="#">Contactos</a></li>'+
          '</ul>');
    }
    else if ($(e.target).is('.desplAccGenReclMovil')) {
        $('#actionsMenuPopUp').html('<ul class="dropdown-menu desplegableHorizontal" role="menu">'+
            '<li><a href="#">Reclamar</a></li>'+
            '<li><a href="#">Reclamar Atención</a></li>'+
          '</ul>');
    }
    else if ($(e.target).is('.desplAccTareas')) {
        $('#actionsMenuPopUp').html('<ul class="dropdown-menu desplegableHorizontal" role="menu">'+
            '<li><a href="#">Detalle</a></li>'+
          '</ul>');
    }
    else if ($(e.target).is('.desplAccGenTareas')) {
        $('#actionsMenuPopUp').html('<ul class="dropdown-menu desplegableHorizontal" role="menu">'+
            '<li><a href="#">Nueva Tarea</a></li>'+
          '</ul>');
    }
}

function desplegarLineas() {
    $('#contenedorTabla').toggleClass("table-container-ampliado");
}

$(document).ready(function() {

    $('li.menuactions a').on('click', function(event) {
        $(this).parent().toggleClass("open");
        var a_href = $(this).attr('href');
        if (a_href != '#') {
            if (!$(a_href).hasClass('accordion-open')) {
                var element = $("#ctc-menu .accordion-open");
                if (element !== undefined) {
                    element.removeClass('accordion-open');
                    element.addClass('collapsing');
                    element.removeClass('in');
                    element.removeClass('collapse')
                    var id = '#' + element.attr('id');
                    $("#ctc-menu").find("[href='" + id + "']").find("span").removeClass('caret');
                    $("#ctc-menu").find("[href='" + id + "']").find("span").addClass('right-caret');
                }
                $(a_href).addClass('accordion-open');
                $(this).find("span").removeClass('right-caret');
                $(this).find("span").addClass('caret');
                $(this).find("span").addClass('caret-top');

            } else {
                $(a_href).removeClass('accordion-open');
                $(this).find("span").removeClass('caret');
                $(this).find("span").removeClass('caret-top');
                $(this).find("span").addClass('right-caret');
            }
        }
    });

    $('body').on('click', function(e) {
        if (!$('li.menuactions').is(e.target) && $('li.menuactions').has(e.target).length === 0 && $('.open').has(e.target).length === 0) {
            $('li.menuactions').removeClass('open');
            var element = $("#ctc-menu .accordion-open");
            if (element !== undefined) {
                //console.log(element);
                element.removeClass('accordion-open');
                element.removeClass('in');
                var id = '#' + element.attr('id');
                $("#ctc-menu").find("[href='" + id + "']").find("span").removeClass('caret');
                $("#ctc-menu").find("[href='" + id + "']").find("span").removeClass('caret-top');
                $("#ctc-menu").find("[href='" + id + "']").find("span").addClass('right-caret');
            }
        }
    });
});


$(document).ready(function() {
    // Add event listener for opening and closing details
    $('#products tbody').on('click', 'td.action', function() {
        var tdId = $(this).closest('tr').find('td:first').next();
        if (tdId.hasClass("shown")) {
            tdId.removeClass('shown');
            tdId.addClass('details-control');
        } else {
            tdId.removeClass('details-control');
            tdId.addClass('shown');
        }
        //event.preventDefault();
    });




    $('#products tbody').on('click', 'td.action', function() {
        if ($(this).hasClass("parent") && !$(this).hasClass("shown")) {
            var id = $(this).attr('id');
            $('*[class*=' + id + ']').each(function() {
                var myClass = this.className;
                var split = myClass.split(" ");
                if (split[0] != id) {
                    $(this).removeClass('in');
                } else {
                    var tdId = $(this).closest('tr').find('td:first').next();
                    if (tdId.hasClass("shown")) {
                        tdId.removeClass('shown');
                        tdId.addClass('details-control');
                    } else {
                        tdId.removeClass('details-control');
                        tdId.addClass('shown');
                    }
                }
            });
        }
    });

});