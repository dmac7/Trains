/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Trains.view.main.Main', {   
    extend: 'Ext.container.Viewport',
    alias: 'widget.main', 

    requires: [     
        'Trains.view.main.MainModel',
        'Trains.view.main.MainController',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.column.Column',
        'Places.view.map.Map'         // requried for google maps
    ],

    viewModel: {
        type: 'main'
    },

    layout: 'border',

    items: [
        {
            xtype: 'panel',
            region: 'north',
            height: 80,
            title: 'Train Stations'
        },
        {
            xtype: 'tabpanel',
            region: 'center',
            title: 'Stations',
            activeTab: 0,
            items: [
                {
                    xtype: 'panel',
                    title: 'Station',
                    activeTab: 0,   
                    items: [
                        {
                            xtype: 'gridpanel', 
                            title: 'Station List',
                            bind: {
                                store: '{stations}'
                            },
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'StationDesc',
                                    text: 'Station Desc',
                                    flex: 1,            /* Auto size column so table fills the Grid */
                                    autoSizeColumn : true
                                },
                                {                               
                                    xtype: 'gridcolumn',
                                    dataIndex: 'StationLatitude',
                                    text: 'Latitude'
                                },
                                {                               
                                    xtype: 'gridcolumn',
                                    dataIndex: 'StationLongitude',
                                    text: 'Longitude'
                                },
                                {                               
                                    xtype: 'gridcolumn',
                                    dataIndex: 'StationCode',
                                    text: 'Code'
                                },
                                {                               
                                    xtype: 'gridcolumn',
                                    dataIndex: 'StationId',
                                    text: 'ID'
                                }
                            ]
                        }
                    ],
                    /* => auto size columns to the max data value (not working) */
                    viewConfig : {
                    listeners : {
                    refresh : function (dataview) {
                    Ext.each(dataview.panel.columns, function (column) {
                    if (column.autoSizeColumn === true)
                         column.autoSize();
                    })
                    }
                    }
                    }  
                },
                //{
                //   xtype: 'panel',
                //    title: 'Map',
                //    itemId: 'map',
                //    mapOptions: {
                //        mapTypeId: google.maps.MapTypeId.ROADMAP,
                //        zoom: 16
                //        },
                //},
                {
                        title: 'Google Map',
                        xtype: 'map',   // required 
                        zoom: 7,    // optional 
                        location: {                 // a default centre point required by google  
                            latitude: 54.365741,    // MULLADERMOT  
                            longitude: -6.947984
                             },
                        bind: {
                            store: '{stations}'
                            },
                        listeners: {            // if you want to do something when a marker is clicked 
                            //s//activate: 'onMymapActivate'
                          //  select: function(map,instance){
                          //  console.log("Do something", instance);
                          //  console.log(instance.getData().city);
                            select: 'showMarkerWindow'
                            }
                },
                {
                    xtype: 'panel',
                    title: 'Movex',
                    items: [
                        {
                            xtype: 'gridpanel',
                            title: 'Movex Customers',
                            bind: {
                                    store: '{customers}'    
                            },
                            columns: [
                                {
                                    xtype: 'numbercolumn',
                                    dataIndex: 'customerno',
                                    text: 'Customer Number',
                                    format: '00'    
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'customername',
                                    text: 'Customer Name'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'okcua1',
                                    text: 'Customer Address'
                                }
                            ],
                            listeners: {
                                select: 'onGridpanelSelect'
                            }
                        }
                    ]
                }
            ]
        }
     ]
    // onMyMapActivate: function(component, eOpts) {
        // check current sel on grid...
        //    cellclick: this.onCellClick,
        //   select: this.onSelect,
        //   viewready: this.onViewReady,
        //   scope: this // Important. Ensure "this" is correct during handler execution

        // if (userGrid.getSelectionModel().hasSelection()) {
        //    var row = userGrid.getSelectionModel().getSelection()[0];
        //    console.log(row.get('dni'))
        //

        //Ext.Msg.alert("Now...", "Now Activate the Map Panel with the selected Train Station " + tabpanel.panel.gridpanel.stations.StationDesc);
        //var str1 = Ext.getStore('MiceDetail');
        //str1.load({
        //    params : {
        //        catname: bar.storeItem.data.name
        //    }
        //});
        //alert ("Hello World!");
  //  }         
});