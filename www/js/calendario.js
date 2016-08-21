$( document ).on( "pageshow", "#calendario", function() {
	var value = window.localStorage.getItem("session");
    moment.locale('es-mx');
    var micalendario = $('#widgetcalendario').clndr({
        daysOfTheWeek: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        clickEvents: {
            click: function (target) {
                window.localStorage.setItem("fechacalendario", target.date._i );
                $.mobile.changePage("eventos.html", {
                    transition: "flip",
                    changeHash: true
                });
            },
            onMonthChange: function (month) {
                /* obtener eventos actuales */
                var mes = this.month.format('MM');
                var anio = this.month.format('YYYY');
                var url = urlws+'/?m=obtener_eventos_mes&a='+anio+'&mes='+mes+'&id='+value;
                
                $.ajax({
                    url : url,
                    success : function(data){
                        var dias = JSON.parse( data );
                        var events = [];
                        $.each(dias, function() {
                            fecha = anio+'-'+mes+'-'+this.dia;
                            titulo = this.tipo;
                            events.push({date : fecha, title: titulo});
                        });
                        micalendario.addEvents(events);
                    }
                });
                /* obtener eventos actuales */
            },
        },
        ready: function () {
            /* obtener eventos actuales */
            var mes = this.month.format('MM');
            var anio = this.month.format('YYYY');
            var url = urlws+'/?m=obtener_eventos_mes&a='+anio+'&mes='+mes+'&id='+value;
            
            $.ajax({
                url : url,
                success : function(data){
                    var dias = JSON.parse( data );
                    var events = [];
                    $.each(dias, function() {
                        fecha = anio+'-'+mes+'-'+this.dia;
                        titulo = this.tipo;
                        events.push({date : fecha, title: titulo});
                    });
                    micalendario.addEvents(events);
                }
            });
            /* obtener eventos actuales */
        },
    });
    

});