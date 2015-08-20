/**
 * A wrapper around a Google map.
 * Use setLocation() to center the map
 * Use setSelection() to highlight a marker
 */
Ext.define('Places.view.map.Map', {
    extend: 'Ext.Component',     
    controller: 'main',        
    
    xtype: 'map',

    // note going to use geocode for the moment so Comment out (Geocoding - for searching addresses, and moving the map)
    //requires: ['Places.utils.Geocode'], //put GeoCode in app/utils folder, or comment line out

    renderConfig: {
        store: null,
        selection: null,
        location: null,
        zoom: 12        
    },
    publishes: ['selection'],

    statics: {
        geocodeAddress: function (address, callback, scope) {
            Shared.Geocode.geocodeAddress(address, callback, scope);
        }
    },


    padding: 8,

    html: 'Please enter search criteria.',

    applyStore: function (store) {
        if (Ext.isString(store)) {
            store = Ext.getStore(store);
        }
        return store;
    },
    updateStore: function (store) {
        if (store) {
            var me = this;
            this.getStore().on('datachanged', function (store) {
                me.setMarkers(store);
            }, me);
            this.getStore().on('load', function (store) {
                me.setMarkers(store);
            }, me);
            if (store.isLoaded) {
                me.setMarkers(store);
            }
        }
    },

    updateLocation: function (location) {
        if (!location) {
            return;
        }
        // If we're visible, render the map right away. Else
        // wait until someone clicks on the tab.
        if (this.isVisible()) {
            this.renderMap();
        } else {
            this.on('show', this.renderMap, this, {
                single: true
            });
        }
    },

    updateSelection: function (instance) {
        var markers = this.getMarkers();
        for (var i = 0; i < markers.length; i++) {
            var marker = markers[i];
            if (marker.instance === instance) {
                //marker.setIcon('resources/images/yellow-dot.png'); //TODO to get this to work you will need marker images
            } else {
                //marker.setIcon('resources/images/red-dot.png');
            }
        }
    },

    // @private
    renderMap: function () {
        // Assert : centerMap() has been run, and therefore,
        // this.latitude and this.longitude are set.
        var me = this;
        var p = this.getLocation();
        me.map = me.map || new google.maps.Map(me.getEl().dom, {
                zoom: me.getZoom(),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
        this.map.panTo({
            lat: p.latitude,
            lng: p.longitude
        });
        this.renderMarkers();
    },
    // @private
    getMarkers: function () {
        return (this.markers || []);
    },
    // @private
    setMarkers: function (instances) {
        // Hide the previously saved markers
        var markers = this.getMarkers();
        Ext.Array.forEach(markers, function (marker) {
            marker.setMap(null);
        });

        this.markers = [];

        // For each instance, push a new marker onto the array
        var me = this;
        instances.each(function (instance) {
            var ll = new google.maps.LatLng(instance.data.latitude, instance.data.longitude);
            var marker = new google.maps.Marker({
                position: ll,
                title: instance.data.name,
                instance: instance
            });
            me.markers.push(marker);
         // Set the Listener => 
         //   google.maps.event.addListener(marker, "click", function () {
         //       me.fireEvent('select', me, instance);
         //       me.setSelection(instance);
         //   });
            google.maps.event.addListener(marker, "click", function() {     // code a Pop-Up Window 
                me.fireEvent('select', me.map, instance, marker);
                me.setSelection(instance);
                });
            });
        // If we're visible, render the markers right away. Else
        // wait until someone clicks on the tab.
        if (this.isVisible()) {
            this.renderMarkers();
        } else {
            this.on('show', this.renderMarkers, this, {
                single: true
            });
        }

    },
    // @private
    renderMarkers: function () {
        // This method must always be run after setMarkers()
        // Assert: this.map is set.
        var me = this;
        Ext.Array.forEach(this.getMarkers(), function (marker) {
            marker.setMap(me.map);
        });
    }
    //showMarkerWindow: function(map, instance, marker){
    //    this.infoWindow.setContent("<b>" + instance.getData().StationDesc + "</b>");  //this can be any model field you like.
    //    this.infoWindow.open(map, marker);
    //}
});