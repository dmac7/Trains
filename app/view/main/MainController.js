/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Trains.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    //requires: [
    //    'Ext.window.MessageBox'
    //],
    
    alias: 'controller.main',
  
  	infoWindow: null,

	init: function() {
         this.listen({
             component: {
                 'app-main': {
                    storecreated: this.logger
                 }
             }
         });

         this.infoWindow = new google.maps.InfoWindow();
    },

    showMarkerWindow: function(map, instance, marker){
        this.infoWindow.setContent("<b>" + instance.getData().StationDesc + "</b>");  //this can be any model field you like.
        this.infoWindow.open(map, marker);
    }
    
});
