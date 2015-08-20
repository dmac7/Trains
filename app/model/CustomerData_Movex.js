Ext.define('Trains.model.CustomerData_Movex', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.field.Date',
        'Ext.data.field.Boolean',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',     
        'Ext.data.field.String'
    ],

    fields: [
        {
            type: 'int',
            name: 'customerno'
        },
        {
            type: 'string',
            name: 'customername'
        },
        {
            type: 'string',
            name: 'okcua1'
        }   
    ],
    proxy: {
        type: 'ajax',
     //   url: 'jsp/MovexDataExtract.jsp',
        reader: {
            type: 'json'    
//            rootProperty: 'objStation'
        }
    }
});