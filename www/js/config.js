(function () {
    'use strict';
    window.ST = window.ST || {};

    ST.config = {};

    ST.config.locations = [
        {
            "id": "kit1",
            "name": "Kit 1",
            "type": "kit"
        },
        {
            "id": "kit2",
            "name": "Kit 2",
            "type": "kit"
        },
        {
            "id": "o2kit1",
            "name": "o2 Kit 1",
            "type": "o2kit"
        }

    ];

    ST.config.locationTypes = [
        {
            "id": "kit",
            "name": "First Aid Kit",
            "expectedItems": {
                "bandaid plastic": 50,
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
    ];

    ST.config.items = [
        {
            "id": "bandaid plastic",
            "name": "Adhesive Strip (plastic)"
        },
        {
            "id": "bandage 2.5cm",
            "name": "Bandage (2.5cm)"
        },
        {
            "id": "bandage 5cm",
            "name": "Bandage (5cm)"
        },
        {
            "id": "bandage 7.5cm",
            "name": "Bandage (7.5cm)"
        },
        {
            "id": "bandage 10cm",
            "name": "Bandage (10cm)"
        },
        {
            "id": "triangle bandage",
            "name": "Triangle Bandage"
        },
        {
            "id": "ice pack",
            "name": "Ice Pack"
        },
        {
            "id": "op airway large",
            "name": "Oralpharangeal Airway (Large)"
        },
        {
            "id": "salbutamaul",
            "name": "Salbutamaul"
        }
    ];
})();