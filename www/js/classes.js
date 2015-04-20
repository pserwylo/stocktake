window.ST = window.ST || {};

ST.Item = function (id, name) {
    this.id = id;
    this.name = name;
};

ST.LocationType = function (id, name, expectedItems, allPossibleItems) {

    this.id = id;
    this.name = name;
    this.items = allPossibleItems.filter( function( item ) {
        return expectedItems.hasOwnProperty( item.id );
    });

    this.expectedCount = function(  item ) {
        return expectedItems[ item.id ];
    };
};

ST.Location = function (id, name, type) {

    this.id = id;
    this.name = name;

    this.items = function() {
        return type.items;
    };

    this.expectedCount = function( item ) {
        return type.expectedCount( item );
    }

};