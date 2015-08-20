Ext.define('Trains.model.Station', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Date',
        'Ext.data.field.Boolean',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.reader.Xml',
        'Ext.data.field.String'
    ],

    fields: [
        {
            type: 'string',
            name: 'StationDesc'
        },
        {
            type: 'float',
            name: 'StationLatitude'
        },
        { // convert the latitude field to the name required in Map.js 
            name: 'latitude', //what the map needs (Maps.js)    
            type: 'float',
            depends: 'StationLatitude', //the name your data feed returned (store name) 
            convert: function(value, rec) {
                return rec.get("StationLatitude");
            }
        },
        {
            type: 'float',
            name: 'StationLongitude'
        },
        {  // convert the longitude field to the name required in Map.js 
            name: 'longitude',
            type: 'float',
            depends: 'StationLongitude',
            convert: function(value, rec) {
                return rec.get("StationLongitude");
            }
        },
        {
            type: 'string',     
            name: 'StationCode'
        },
        {
            type: 'int',
            name: 'StationId'
        }
    ],
    proxy: {
        type: 'ajax',
        url: 'http://ladysign-apps.com/apis/irishrail/getStations.php',
        reader: {
            type: 'json',
            rootProperty: 'objStation'
        }
    }
});


 