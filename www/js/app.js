(function () {
    'use strict';
    var module = angular.module('app', ['onsen']);

    var config = {

        items : [
            {
                "id" : "bandage 2.5cm",
                "name" : "Bandage (2.5cm)"
            },
            {
                "id" : "bandage 5cm",
                "name" : "Bandage (5cm)"
            },
            {
                "id" : "bandage 7.5cm",
                "name" : "Bandage (7.5cm)"
            },
            {
                "id" : "bandage 10cm",
                "name" : "Bandage (10cm)"
            },
            {
                "id" : "triangle bandage",
                "name" : "Triangle Bandage"
            },
            {
                "id" : "ice pack",
                "name" : "Ice Pack"
            },
            {
                "id" : "op airway large",
                "name" : "Oralpharangeal Airway (Large)"
            },
            {
                "id" : "salbutamaul",
                "name" : "Salbutamaul"
            }
        ],

        locationTypes: [
            {
                "id": "kit",
                "name": "First Aid Kit",
                "expectedItems": {
                    "bandage 2.5cm": 3,
                    "bandage 5cm": 3,
                    "bandage 7.5cm": 2,
                    "bandage 10cm": 2,
                    "triangle bandage": 3,
                    "ice pack": 2
                }
            },
            {
                "id": "o2kit",
                "name": "Oxygen Kit",
                "expectedItems": {
                    "op airway large": 1,
                    "salbutamaul": 1
                }
            }
        ],

        locations: [

            {
                "id" : "kit1",
                "name" : "Kit 1",
                "type" : "kit"
            },
            {
                "id" : "kit2",
                "name" : "Kit 2",
                "type" : "kit"
            },
            {
                "id" : "o2kit1",
                "name" : "o2 Kit 1",
                "type" : "o2kit"
            }

        ]

    };

    module.controller('AppController', function ($scope, $data) {
        $scope.doSomething = function () {
            setTimeout(function () {
                alert('tapped');
            }, 100);
        };
    });

    module.controller('DetailController', function ($scope, $data) {
        $scope.location = $data.selectedLocation;
        $scope.locationType = getLocationType( $scope.location.type );
        $scope.expectedItems = [];
        for ( var itemId in $scope.locationType.expectedItems ) {
            if ( $scope.locationType.expectedItems.hasOwnProperty( itemId ) ) {
                var count = $scope.locationType.expectedItems[itemId];
                var item = getItem(itemId);
                $scope.expectedItems.push({
                    "name" : item.name,
                    "expectedCount" : count,
                    "checked" : false,
                    "foundCount" : 0
                });
            }
        }

        $scope.selectItem = function(index) {
            var item = $scope.expectedItems[ index ];
            item.checked = !item.checked;
            if (item.checked) {
                ons.createAlertDialog('confirm-item-stock.html').then(function(alertDialog){
                    alertDialog.show();
                });
            } else {
                item.foundCount = 0;
            }
        }
    });

    module.controller('MasterController', function ($scope, $data) {
        $scope.locations = $data.locations;

        $scope.showDetail = function (index) {
            var selectedLocation = $data.locations[index];
            $data.selectedLocation = selectedLocation;
            $scope.navi.pushPage('detail.html', {title: selectedLocation.title});
        };
    });

    var getLocation = function( id ) {
        return config.locations.filter( function( item ) {
            return item.id == id;
        }).pop();
    };

    var getLocationType = function( id ) {
        return config.locationTypes.filter( function( item ) {
            return item.id == id;
        }).pop();
    };

    var getItem = function( id ) {
        return config.items.filter( function( item ) {
            return item.id == id;
        }).pop();
    };

    module.factory('$data', function () {
        var data = {};

        data.locations = [];

        for ( var i = 0; i < config.locations.length; i ++ ) {
            var loc = config.locations[ i ];
            data.locations.push({
                "id": loc.id,
                "name": loc.name,
                "type": loc.type
            });
        }

        return data;
    });
})();

