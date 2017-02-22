const Fuse = require('fuse.js');
const response = {
    "data": {
        "manufacturer": "Kawasaki",
        "manufacturer_id": "KAW",
        "models": [
            {
                "model_id": 15300002,
                "model": "AR",
                "href": "/motorcycles/v1/vehicles?model_id=15300002&country-code=us"
            },
            {
                "model_id": 15300003,
                "model": "Bayou",
                "href": "/motorcycles/v1/vehicles?model_id=15300003&country-code=us"
            },
            {
                "model_id": 15300006,
                "model": "Concours",
                "href": "/motorcycles/v1/vehicles?model_id=15300006&country-code=us"
            },
            {
                "model_id": 15300007,
                "model": "Concours 14",
                "href": "/motorcycles/v1/vehicles?model_id=15300007&country-code=us"
            },
            {
                "model_id": 15300008,
                "model": "EJ 650",
                "href": "/motorcycles/v1/vehicles?model_id=15300008&country-code=us"
            },
            {
                "model_id": 15300009,
                "model": "EL",
                "href": "/motorcycles/v1/vehicles?model_id=15300009&country-code=us"
            },
            {
                "model_id": 15300012,
                "model": "ER 5",
                "href": "/motorcycles/v1/vehicles?model_id=15300012&country-code=us"
            },
            {
                "model_id": 15300016,
                "model": "GPZ",
                "href": "/motorcycles/v1/vehicles?model_id=15300016&country-code=us"
            },
            {
                "model_id": 15300069,
                "model": "KAF Mule",
                "href": "/motorcycles/v1/vehicles?model_id=15300069&country-code=us"
            },
            {
                "model_id": 15300019,
                "model": "KDX",
                "href": "/motorcycles/v1/vehicles?model_id=15300019&country-code=us"
            },
            {
                "model_id": 15300020,
                "model": "KE",
                "href": "/motorcycles/v1/vehicles?model_id=15300020&country-code=us"
            },
            {
                "model_id": 15300022,
                "model": "KFX",
                "href": "/motorcycles/v1/vehicles?model_id=15300022&country-code=us"
            },
            {
                "model_id": 15300024,
                "model": "KL",
                "href": "/motorcycles/v1/vehicles?model_id=15300024&country-code=us"
            },
            {
                "model_id": 15300025,
                "model": "KLE",
                "href": "/motorcycles/v1/vehicles?model_id=15300025&country-code=us"
            },
            {
                "model_id": 15300027,
                "model": "KLR",
                "href": "/motorcycles/v1/vehicles?model_id=15300027&country-code=us"
            },
            {
                "model_id": 15300029,
                "model": "KLX",
                "href": "/motorcycles/v1/vehicles?model_id=15300029&country-code=us"
            },
            {
                "model_id": 15300073,
                "model": "KLZ",
                "href": "/motorcycles/v1/vehicles?model_id=15300073&country-code=us"
            },
            {
                "model_id": 15300070,
                "model": "KRF Teryx",
                "href": "/motorcycles/v1/vehicles?model_id=15300070&country-code=us"
            },
            {
                "model_id": 15300074,
                "model": "KRT Teryx4",
                "href": "/motorcycles/v1/vehicles?model_id=15300074&country-code=us"
            },
            {
                "model_id": 15300034,
                "model": "KVF",
                "href": "/motorcycles/v1/vehicles?model_id=15300034&country-code=us"
            },
            {
                "model_id": 15300035,
                "model": "KX",
                "href": "/motorcycles/v1/vehicles?model_id=15300035&country-code=us"
            },
            {
                "model_id": 15300037,
                "model": "Lakota",
                "href": "/motorcycles/v1/vehicles?model_id=15300037&country-code=us"
            },
            {
                "model_id": 15300038,
                "model": "LTD",
                "href": "/motorcycles/v1/vehicles?model_id=15300038&country-code=us"
            },
            {
                "model_id": 15300039,
                "model": "Mojave",
                "href": "/motorcycles/v1/vehicles?model_id=15300039&country-code=us"
            },
            {
                "model_id": 15300040,
                "model": "Mojave/E",
                "href": "/motorcycles/v1/vehicles?model_id=15300040&country-code=us"
            },
            {
                "model_id": 15300041,
                "model": "Ninja",
                "href": "/motorcycles/v1/vehicles?model_id=15300041&country-code=us"
            },
            {
                "model_id": 15300042,
                "model": "Prairie",
                "href": "/motorcycles/v1/vehicles?model_id=15300042&country-code=us"
            },
            {
                "model_id": 15300043,
                "model": "Tengai",
                "href": "/motorcycles/v1/vehicles?model_id=15300043&country-code=us"
            },
            {
                "model_id": 15300045,
                "model": "Voyager",
                "href": "/motorcycles/v1/vehicles?model_id=15300045&country-code=us"
            },
            {
                "model_id": 15300046,
                "model": "Voyager XII",
                "href": "/motorcycles/v1/vehicles?model_id=15300046&country-code=us"
            },
            {
                "model_id": 15300047,
                "model": "Vulcan",
                "href": "/motorcycles/v1/vehicles?model_id=15300047&country-code=us"
            },
            {
                "model_id": 15300048,
                "model": "Vulcan Classic",
                "href": "/motorcycles/v1/vehicles?model_id=15300048&country-code=us"
            },
            {
                "model_id": 15300049,
                "model": "Vulcan Drifter",
                "href": "/motorcycles/v1/vehicles?model_id=15300049&country-code=us"
            },
            {
                "model_id": 15300050,
                "model": "Vulcan L",
                "href": "/motorcycles/v1/vehicles?model_id=15300050&country-code=us"
            },
            {
                "model_id": 15300051,
                "model": "Vulcan Mean Streak",
                "href": "/motorcycles/v1/vehicles?model_id=15300051&country-code=us"
            },
            {
                "model_id": 15300052,
                "model": "Vulcan Nomad",
                "href": "/motorcycles/v1/vehicles?model_id=15300052&country-code=us"
            },
            {
                "model_id": 15300053,
                "model": "Vulcan SE",
                "href": "/motorcycles/v1/vehicles?model_id=15300053&country-code=us"
            },
            {
                "model_id": 15300055,
                "model": "Zephyr",
                "href": "/motorcycles/v1/vehicles?model_id=15300055&country-code=us"
            },
            {
                "model_id": 15300057,
                "model": "ZL",
                "href": "/motorcycles/v1/vehicles?model_id=15300057&country-code=us"
            },
            {
                "model_id": 15300061,
                "model": "ZR-7",
                "href": "/motorcycles/v1/vehicles?model_id=15300061&country-code=us"
            },
            {
                "model_id": 15300062,
                "model": "ZR-7S",
                "href": "/motorcycles/v1/vehicles?model_id=15300062&country-code=us"
            },
            {
                "model_id": 15300063,
                "model": "ZRX",
                "href": "/motorcycles/v1/vehicles?model_id=15300063&country-code=us"
            },
            {
                "model_id": 15300064,
                "model": "Z-Series",
                "href": "/motorcycles/v1/vehicles?model_id=15300064&country-code=us"
            },
            {
                "model_id": 15300067,
                "model": "ZZ-R",
                "href": "/motorcycles/v1/vehicles?model_id=15300067&country-code=us"
            }
        ]
    },
    "metadata": {
        "total": 1,
        "page": 1,
        "pages": 1,
        "limit": 20,
        "links": {
            "self": {
                "href": "/motorcycles/v1/manufacturers/KAW?country-code=us&page=1&limit=20"
            }
        }
    }
};
function searchForModel(parsedJSON, modelSearchTerm) {
    let modelArr = parsedJSON.data.models;
    let options = {
        include: ["score"],
        keys: ['model']
    };
    let FuseModels = new Fuse(modelArr, options);
    let results = FuseModels.search(modelSearchTerm);
    console.log(results);
    return results[0].item.model_id;
}
searchForModel(response, 2015, 'KLR650');
//# sourceMappingURL=search-model.js.map