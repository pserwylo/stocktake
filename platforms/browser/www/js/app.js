(function () {
    'use strict';
    window.ST = window.ST || {};
    var module = angular.module('app', ['onsen']);

    var parseConfig = function( config ) {

        var items = ST.config.items.map( function( item ) {
            return new ST.Item( item.id, item.name );
        });

        var locationTypes = ST.config.locationTypes.map( function( locationType ) {
            return new ST.LocationType(
                locationType.id,
                locationType.name,
                locationType.expectedItems,
                items
            );
        });

        return ST.config.locations.map( function( location ) {
            var type = locationTypes.filter( function( t ) {
                return t.id == location.type;
            }).pop();

            return new ST.Location( location.id, location.name, type );
        });
    };

    ST.inventory = parseConfig( ST.config );

    module.controller('AppController', function ($scope, $data) {
        $scope.doSomething = function () {
            setTimeout(function () {
                alert('tapped');
            }, 100);
        };
    });

    module.controller('DetailController', function ($scope, $data) {
        $scope.location = $data.selectedLocation;
        $scope.expectedItems = [];

        $scope.getClass = function( expectedCount, foundCount ) {
            if ( expectedCount == foundCount ) {
                return "correct";
            } else if ( foundCount < 0 ) {
                return "";
            } else if ( foundCount < expectedCount ) {
                return "low";
            } else {
                return "high";
            }
        };

        for ( var i = 0; i < $scope.location.items().length; i ++ ) {
            var item = $scope.location.items()[ i ];
            var count = $scope.location.expectedCount( item );
            $scope.expectedItems.push({
                "name" : item.name,
                "expectedCount" : count,
                "checked" : false,
                "foundCount" : -1
            });
        }

        $scope.onDone = function() {

            var completedCount = 0;
            for ( var i = 0; i < $scope.expectedItems.length; i ++ ) {
                if ( $scope.expectedItems[ i ].checked ) {
                    completedCount ++;
                }
            }

            if ( completedCount != $scope.expectedItems.length ) {
                var s = $scope.expectedItems.length == 1 ? '' : 's';
                var message = completedCount == 0 ? "but you haven't checked off any yet" : "but you've only checked off " + completedCount;
                ons.notification.confirm({
                    title : "Audit not complete",
                    messageHTML : "<p>There are " + $scope.expectedItems.length + " item" + s + ", " + message + ".</p><p>Continue anyway?</p>",
                    buttonLabels : [ "Cancel", "Completed" ],
                    primaryButtonIndex : 0,
                    cancelable: true,
                    callback : function( index ) {
                        if ( index >= 0 ) {

                        }
                    }
                });
            }
        };

        $scope.selectItem = function(index) {

            var item = $scope.expectedItems[ index ];

            if (item.checked) {

                // Deselect item...
                item.checked = false;
                item.foundCount = -1;

            } else {

                ons.createAlertDialog('confirm-item-stock.html', { parentScope : $scope }).then(function(alertDialog){

                    $scope.closeDialog = function() {
                        alertDialog.hide();
                    };

                    $scope.onCount = function( count ) {
                        item.checked = true;
                        item.foundCount = count;
                        $scope.closeDialog();
                    };

                    $scope.showOther = function() {
                        $scope.item.foundCount = 0;
                        $scope.isShowingSpinner = true;
                    };

                    $scope.item = item;
                    $scope.isShowingSpinner = false;
                    $scope.otherValue = "";
                    $scope.options = { values : [ 0 ], labels : [ "None :(" ] };

                    var tooBigToCount = item.expectedCount > 15;

                    if ( item.expectedCount > 2 && !tooBigToCount ) {
                        $scope.options.values.push( item.expectedCount - 2 );
                        $scope.options.labels.push( item.expectedCount - 2 );
                    }

                    if ( item.expectedCount > 1 && !tooBigToCount ) {
                        $scope.options.values.push( item.expectedCount - 1 );
                        $scope.options.labels.push( item.expectedCount - 1 );
                    }

                    $scope.options.values.push( item.expectedCount );
                    $scope.options.labels.push( item.expectedCount );

                    if ( !tooBigToCount ) {
                        $scope.options.values.push(item.expectedCount + 1);
                        $scope.options.labels.push(item.expectedCount + 1);
                    }

                    alertDialog.show();
                });
            }
        }
    });

    module.controller('MasterController', function ($scope, $data) {
        $scope.inventory = $data.inventory;

        $scope.showDetail = function (index) {
            var selectedLocation = $data.inventory[ index ];
            $data.selectedLocation = selectedLocation;
            $scope.navi.pushPage('detail.html', {title: selectedLocation.title});
        };
    });

    module.factory('$data', function () {
        return { inventory : ST.inventory };
    });
})();

