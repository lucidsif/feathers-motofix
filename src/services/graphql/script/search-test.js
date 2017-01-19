/**
 * Created by Sif on 1/19/17.
 */
const Fuse = require('fuse.js');

var books = [{
  'ISBN': 'A',
  'title': "Old Man's War",
  'author': 'John Scalzi'
}, {
  'ISBN': 'B',
  'title': 'The Lock Artist',
  'author': 'Steve Hamilton'
}]

var response = {
  "data": {
    "repair_times_id": "26625",
    "repair_times": [{
      "group_sequence": 1,
      "group_description": "Engine",
      "sub_groups": [{
        "sub_group_sequence": 1,
        "sub_group_description": "Engine assembly",
        "components": [{
          "component_sequence": 9,
          "repair_id": "A1.020",
          "id": 23884,
          "component_description": "Engine only",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 8.2,
          "time_mins": 491
        }, {
          "component_sequence": 11,
          "repair_id": "A1.040",
          "id": 23886,
          "component_description": "Short exchange engine",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 13,
          "time_mins": 780
        }]
      }, {
        "sub_group_sequence": 2,
        "sub_group_description": "Cylinder head",
        "components": [{
          "component_sequence": 18,
          "repair_id": "A2.010",
          "id": 23893,
          "component_description": "Compression test",
          "action": "Check",
          "action_description": "Check",
          "time_hrs": 0.35,
          "time_mins": 21
        }, {
          "component_sequence": 23,
          "repair_id": "A2.033",
          "id": 23898,
          "component_description": "Camshaft\/valve cover & gasket - left",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.25,
          "time_mins": 15
        }, {
          "component_sequence": 24,
          "repair_id": "A2.034",
          "id": 23899,
          "component_description": "Camshaft\/valve cover & gasket - right",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.25,
          "time_mins": 15
        }, {
          "component_sequence": 25,
          "repair_id": "A2.035",
          "id": 23900,
          "component_description": "Camshaft\/valve covers & gaskets - both",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.45,
          "time_mins": 27
        }, {
          "component_sequence": 27,
          "repair_id": "A2.040",
          "id": 23902,
          "component_description": "Valve clearances",
          "action": "C & A",
          "action_description": "Check and Adjust",
          "time_hrs": 0.95,
          "time_mins": 57
        }, {
          "component_sequence": 35,
          "repair_id": "A2.053",
          "id": 23910,
          "component_description": "Cylinder head & gasket - left",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 2.35,
          "time_mins": 141
        }, {
          "component_sequence": 36,
          "repair_id": "A2.054",
          "id": 23911,
          "component_description": "Cylinder head & gasket - right",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 2.35,
          "time_mins": 141
        }, {
          "component_sequence": 37,
          "repair_id": "A2.055",
          "id": 23912,
          "component_description": "Cylinder heads & gaskets - both",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 3.75,
          "time_mins": 225
        }, {
          "component_sequence": 42,
          "repair_id": "A2.063",
          "id": 23917,
          "component_description": "Cylinder head - left",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 2.35,
          "time_mins": 141
        }, {
          "component_sequence": 43,
          "repair_id": "A2.064",
          "id": 23918,
          "component_description": "Cylinder head - right",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 2.35,
          "time_mins": 141
        }, {
          "component_sequence": 44,
          "repair_id": "A2.065",
          "id": 23919,
          "component_description": "Cylinder heads - both",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 3.75,
          "time_mins": 225
        }, {
          "component_sequence": 49,
          "repair_id": "A2.073",
          "id": 23924,
          "component_description": "Cylinder head complete - left",
          "action": "S & R",
          "action_description": "Strip and Rebuild",
          "time_hrs": 3,
          "time_mins": 180
        }, {
          "component_sequence": 50,
          "repair_id": "A2.074",
          "id": 23925,
          "component_description": "Cylinder head complete - right",
          "action": "S & R",
          "action_description": "Strip and Rebuild",
          "time_hrs": 2.95,
          "time_mins": 177
        }, {
          "component_sequence": 51,
          "repair_id": "A2.075",
          "id": 23926,
          "component_description": "Cylinder heads complete - both",
          "action": "S & R",
          "action_description": "Strip and Rebuild",
          "time_hrs": 4.5,
          "time_mins": 270
        }, {
          "component_sequence": 91,
          "repair_id": "A2.160",
          "id": 23966,
          "component_description": "Valve spring - one",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 2.6,
          "time_mins": 156
        }, {
          "component_sequence": 92,
          "repair_id": "A2.170",
          "id": 23967,
          "component_description": "Valve springs - all",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 4.25,
          "time_mins": 255
        }, {
          "component_sequence": 100,
          "repair_id": "A2.223",
          "id": 23975,
          "component_description": "Rocker arm (one) - left",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.95,
          "time_mins": 57
        }, {
          "component_sequence": 101,
          "repair_id": "A2.224",
          "id": 23976,
          "component_description": "Rocker arm (one) - right",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.95,
          "time_mins": 57
        }, {
          "component_sequence": 102,
          "repair_id": "A2.230",
          "id": 23977,
          "component_description": "Rocker arms (all)",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.85,
          "time_mins": 111
        }, {
          "component_sequence": 107,
          "repair_id": "A2.240",
          "id": 23982,
          "component_description": "Rocker arms - both",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1,
          "time_mins": 60
        }, {
          "component_sequence": 108,
          "repair_id": "A2.250",
          "id": 23983,
          "component_description": "Rocker shaft assembly (one)",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.95,
          "time_mins": 57
        }, {
          "component_sequence": 111,
          "repair_id": "A2.253",
          "id": 23986,
          "component_description": "Rocker shaft assembly (one) - left",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.95,
          "time_mins": 57
        }, {
          "component_sequence": 112,
          "repair_id": "A2.254",
          "id": 23987,
          "component_description": "Rocker shaft assembly (one) - right",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.95,
          "time_mins": 57
        }, {
          "component_sequence": 113,
          "repair_id": "A2.260",
          "id": 23988,
          "component_description": "Rocker shaft assemblies - both",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1,
          "time_mins": 60
        }, {
          "component_sequence": 114,
          "repair_id": "A2.270",
          "id": 23989,
          "component_description": "Rocker shaft assemblies (all)",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.85,
          "time_mins": 111
        }]
      }, {
        "sub_group_sequence": 3,
        "sub_group_description": "Camshaft & drive gear",
        "components": [{
          "component_sequence": 130,
          "repair_id": "A3.023",
          "id": 24005,
          "component_description": "Camshaft(s) - left",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.95,
          "time_mins": 117
        }, {
          "component_sequence": 131,
          "repair_id": "A3.024",
          "id": 24006,
          "component_description": "Camshaft(s) - right",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.75,
          "time_mins": 105
        }, {
          "component_sequence": 132,
          "repair_id": "A3.025",
          "id": 24007,
          "component_description": "Camshafts - both\/all",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 3.2,
          "time_mins": 192
        }, {
          "component_sequence": 134,
          "repair_id": "A3.040",
          "id": 24009,
          "component_description": "Camshaft followers\/hydraulic tappets - all",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 2.85,
          "time_mins": 171
        }, {
          "component_sequence": 136,
          "repair_id": "A3.060",
          "id": 24011,
          "component_description": "Pushrods - all",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 2.85,
          "time_mins": 171
        }, {
          "component_sequence": 144,
          "repair_id": "A3.095",
          "id": 24019,
          "component_description": "Camshaft belt\/chain - left",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 14.45,
          "time_mins": 867
        }, {
          "component_sequence": 145,
          "repair_id": "A3.096",
          "id": 24020,
          "component_description": "Camshaft belt\/chain - right",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 14.45,
          "time_mins": 867
        }, {
          "component_sequence": 149,
          "repair_id": "A3.103",
          "id": 24024,
          "component_description": "Camshaft belt\/chain tensioner - left",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.6,
          "time_mins": 36
        }, {
          "component_sequence": 150,
          "repair_id": "A3.104",
          "id": 24025,
          "component_description": "Camshaft belt\/chain tensioner - right",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.2,
          "time_mins": 12
        }, {
          "component_sequence": 172,
          "repair_id": "A3.153",
          "id": 24047,
          "component_description": "Camshaft driven sprockets\/gears - left",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.75,
          "time_mins": 45
        }, {
          "component_sequence": 173,
          "repair_id": "A3.154",
          "id": 24048,
          "component_description": "Camshaft driven sprockets\/gears - right",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.6,
          "time_mins": 36
        }]
      }, {
        "sub_group_sequence": 4,
        "sub_group_description": "Cylinders, crankshaft & pistons",
        "components": [{
          "component_sequence": 178,
          "repair_id": "A4.013",
          "id": 24053,
          "component_description": "Cylinder\/barrel - left",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 2.85,
          "time_mins": 171
        }, {
          "component_sequence": 179,
          "repair_id": "A4.014",
          "id": 24054,
          "component_description": "Cylinder\/barrel - right",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 2.75,
          "time_mins": 165
        }, {
          "component_sequence": 180,
          "repair_id": "A4.015",
          "id": 24055,
          "component_description": "Cylinders\/barrels - both",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 4.5,
          "time_mins": 270
        }, {
          "component_sequence": 196,
          "repair_id": "A4.040",
          "id": 24071,
          "component_description": "Crankshaft\/main bearings",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 14.7,
          "time_mins": 882
        }, {
          "component_sequence": 205,
          "repair_id": "A4.111",
          "id": 24080,
          "component_description": "Connecting rods - all",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 5.35,
          "time_mins": 321
        }, {
          "component_sequence": 208,
          "repair_id": "A4.114",
          "id": 24083,
          "component_description": "Connecting rod - left",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 5,
          "time_mins": 300
        }, {
          "component_sequence": 209,
          "repair_id": "A4.115",
          "id": 24084,
          "component_description": "Connecting rod - right",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 5,
          "time_mins": 300
        }, {
          "component_sequence": 214,
          "repair_id": "A4.133",
          "id": 24089,
          "component_description": "Piston - left",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 3.1,
          "time_mins": 186
        }, {
          "component_sequence": 215,
          "repair_id": "A4.134",
          "id": 24090,
          "component_description": "Piston - right",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 3,
          "time_mins": 180
        }, {
          "component_sequence": 216,
          "repair_id": "A4.135",
          "id": 24091,
          "component_description": "Pistons - both",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 4.95,
          "time_mins": 297
        }, {
          "component_sequence": 223,
          "repair_id": "A4.153",
          "id": 24098,
          "component_description": "Piston rings - left",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 3.2,
          "time_mins": 192
        }, {
          "component_sequence": 224,
          "repair_id": "A4.154",
          "id": 24099,
          "component_description": "Piston rings - right",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 3.1,
          "time_mins": 186
        }, {
          "component_sequence": 225,
          "repair_id": "A4.155",
          "id": 24100,
          "component_description": "Piston rings - both",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 5.2,
          "time_mins": 312
        }]
      }, {
        "sub_group_sequence": 5,
        "sub_group_description": "Crankcase and cover",
        "components": [{
          "component_sequence": 230,
          "repair_id": "A5.010",
          "id": 24105,
          "component_description": "Crankcase assembly",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 15.1,
          "time_mins": 906
        }]
      }, {
        "sub_group_sequence": 6,
        "sub_group_description": "Lubrication",
        "components": [{
          "component_sequence": 272,
          "repair_id": "A6.110",
          "id": 24147,
          "component_description": "Oil pump",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 3.7,
          "time_mins": 222
        }, {
          "component_sequence": 277,
          "repair_id": "A6.160",
          "id": 24152,
          "component_description": "Oil pump delivery pipe - front",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 3.1,
          "time_mins": 186
        }, {
          "component_sequence": 279,
          "repair_id": "A6.180",
          "id": 24154,
          "component_description": "Oil cooler",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.25,
          "time_mins": 75
        }, {
          "component_sequence": 280,
          "repair_id": "A6.190",
          "id": 24155,
          "component_description": "Oil cooler hoses",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.6,
          "time_mins": 96
        }]
      }]
    }, {
      "group_sequence": 2,
      "group_description": "Engine management - ignition",
      "sub_groups": [{
        "sub_group_sequence": 1,
        "sub_group_description": "Ignition system",
        "components": [{
          "component_sequence": 291,
          "repair_id": "B1.040",
          "id": 24166,
          "component_description": "Ignition timing - static",
          "action": "C & A",
          "action_description": "Check and Adjust",
          "time_hrs": 0.7,
          "time_mins": 42
        }, {
          "component_sequence": 296,
          "repair_id": "B1.090",
          "id": 24171,
          "component_description": "Spark plug(s)",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.2,
          "time_mins": 12
        }, {
          "component_sequence": 297,
          "repair_id": "B1.100",
          "id": 24172,
          "component_description": "HT leads - all",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.6,
          "time_mins": 36
        }, {
          "component_sequence": 298,
          "repair_id": "B1.110",
          "id": 24173,
          "component_description": "Ignition coil - one",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.6,
          "time_mins": 36
        }, {
          "component_sequence": 307,
          "repair_id": "B1.200",
          "id": 24182,
          "component_description": "Ignitor unit\/CDI unit",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.95,
          "time_mins": 57
        }]
      }]
    }, {
      "group_sequence": 3,
      "group_description": "Engine management - fuel",
      "sub_groups": [{
        "sub_group_sequence": 1,
        "sub_group_description": "Air filter, manifolds & valves\/EVAP",
        "components": [{
          "component_sequence": 317,
          "repair_id": "C1.010",
          "id": 24192,
          "component_description": "Air filter assembly",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 2.35,
          "time_mins": 141
        }, {
          "component_sequence": 320,
          "repair_id": "C1.040",
          "id": 24195,
          "component_description": "Air filter element",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.25,
          "time_mins": 15
        }, {
          "component_sequence": 329,
          "repair_id": "C1.130",
          "id": 24204,
          "component_description": "Carbon canister",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.2,
          "time_mins": 12
        }]
      }, {
        "sub_group_sequence": 2,
        "sub_group_description": "Throttle controls",
        "components": [{
          "component_sequence": 338,
          "repair_id": "C2.030",
          "id": 24213,
          "component_description": "Throttle cable - one",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.35,
          "time_mins": 81
        }, {
          "component_sequence": 339,
          "repair_id": "C2.040",
          "id": 24214,
          "component_description": "Throttle cables - all",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.35,
          "time_mins": 81
        }, {
          "component_sequence": 340,
          "repair_id": "C2.050",
          "id": 24215,
          "component_description": "Throttle cable joint",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.35,
          "time_mins": 81
        }, {
          "component_sequence": 342,
          "repair_id": "C2.070",
          "id": 24217,
          "component_description": "Idle speed & CO%",
          "action": "C & A",
          "action_description": "Check and Adjust",
          "time_hrs": 0.6,
          "time_mins": 36
        }]
      }, {
        "sub_group_sequence": 3,
        "sub_group_description": "Petrol injection system",
        "components": [{
          "component_sequence": 368,
          "repair_id": "C4.010",
          "id": 24243,
          "component_description": "Injection control module",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.6,
          "time_mins": 36
        }, {
          "component_sequence": 372,
          "repair_id": "C4.050",
          "id": 24247,
          "component_description": "Injector - one",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.25,
          "time_mins": 15
        }, {
          "component_sequence": 374,
          "repair_id": "C4.070",
          "id": 24249,
          "component_description": "Injectors - all",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.45,
          "time_mins": 27
        }, {
          "component_sequence": 381,
          "repair_id": "C4.140",
          "id": 24256,
          "component_description": "Intake air temperature (IAT) sensor",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.25,
          "time_mins": 15
        }, {
          "component_sequence": 388,
          "repair_id": "C4.210",
          "id": 24263,
          "component_description": "Throttle position (TP) sensor",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.35,
          "time_mins": 21
        }, {
          "component_sequence": 392,
          "repair_id": "C4.250",
          "id": 24267,
          "component_description": "Idle air control (IAC) valve",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.2,
          "time_mins": 12
        }, {
          "component_sequence": 397,
          "repair_id": "C4.300",
          "id": 24272,
          "component_description": "Fuel pressure regulator",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 2.25,
          "time_mins": 135
        }, {
          "component_sequence": 399,
          "repair_id": "C4.320",
          "id": 24274,
          "component_description": "Fuel distributor",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 2.2,
          "time_mins": 132
        }]
      }, {
        "sub_group_sequence": 4,
        "sub_group_description": "Fuel supply",
        "components": [{
          "component_sequence": 401,
          "repair_id": "C5.010",
          "id": 24276,
          "component_description": "Fuel tank",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.5,
          "time_mins": 30
        }, {
          "component_sequence": 409,
          "repair_id": "C5.060",
          "id": 24284,
          "component_description": "Tank cap lock barrel",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.35,
          "time_mins": 21
        }, {
          "component_sequence": 412,
          "repair_id": "C5.090",
          "id": 24287,
          "component_description": "Fuel pump",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.2,
          "time_mins": 72
        }, {
          "component_sequence": 413,
          "repair_id": "C5.100",
          "id": 24288,
          "component_description": "Fuel filter",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.1,
          "time_mins": 66
        }]
      }]
    }, {
      "group_sequence": 4,
      "group_description": "Exhaust system",
      "sub_groups": [{
        "sub_group_sequence": 1,
        "sub_group_description": "Manifold, pipes & silencers",
        "components": [{
          "component_sequence": 459,
          "repair_id": "E1.025",
          "id": 24334,
          "component_description": "Exhaust pipes - both",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.75,
          "time_mins": 45
        }, {
          "component_sequence": 461,
          "repair_id": "E1.030",
          "id": 24336,
          "component_description": "Exhaust pipe and silencer",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.35,
          "time_mins": 81
        }, {
          "component_sequence": 462,
          "repair_id": "E1.040",
          "id": 24337,
          "component_description": "Exhaust silencer",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.1,
          "time_mins": 66
        }]
      }, {
        "sub_group_sequence": 2,
        "sub_group_description": "Catalytic converter",
        "components": [{
          "component_sequence": 482,
          "repair_id": "E2.010",
          "id": 24357,
          "component_description": "Catalytic converter",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.1,
          "time_mins": 66
        }, {
          "component_sequence": 486,
          "repair_id": "E2.030",
          "id": 24361,
          "component_description": "Lambda sensor",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.1,
          "time_mins": 66
        }]
      }]
    }, {
      "group_sequence": 5,
      "group_description": "Clutch & controls",
      "sub_groups": [{
        "sub_group_description": "Clutch & controls",
        "components": [{
          "component_sequence": 491,
          "repair_id": "F1.010",
          "id": 24366,
          "component_description": "Clutch lever",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.2,
          "time_mins": 12
        }, {
          "component_sequence": 495,
          "repair_id": "F1.050",
          "id": 24370,
          "component_description": "Hydraulic system",
          "action": "Bleed",
          "action_description": "Bleed",
          "time_hrs": 0.5,
          "time_mins": 30
        }, {
          "component_sequence": 499,
          "repair_id": "F1.090",
          "id": 24374,
          "component_description": "Clutch assembly\/primary driven gear",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 5.1,
          "time_mins": 306
        }, {
          "component_sequence": 500,
          "repair_id": "F1.100",
          "id": 24375,
          "component_description": "Clutch plate",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 5.1,
          "time_mins": 306
        }, {
          "component_sequence": 506,
          "repair_id": "F1.160",
          "id": 24381,
          "component_description": "Clutch housing",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 5.35,
          "time_mins": 321
        }, {
          "component_sequence": 510,
          "repair_id": "F1.200",
          "id": 24385,
          "component_description": "Push rod\/ball - 1 piece",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.2,
          "time_mins": 72
        }, {
          "component_sequence": 513,
          "repair_id": "F1.230",
          "id": 24388,
          "component_description": "Slave cylinder",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.85,
          "time_mins": 111
        }],
        "sub_group_sequence": 1
      }]
    }, {
      "group_sequence": 6,
      "group_description": "Transmission",
      "sub_groups": [{
        "sub_group_description": "Transmission",
        "components": [{
          "component_sequence": 517,
          "repair_id": "G1.010",
          "id": 24392,
          "component_description": "Gearbox",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 6.75,
          "time_mins": 405
        }, {
          "component_sequence": 518,
          "repair_id": "G1.020",
          "id": 24393,
          "component_description": "Gearbox",
          "action": "S & R",
          "action_description": "Strip and Rebuild",
          "time_hrs": 9.85,
          "time_mins": 591
        }, {
          "component_sequence": 519,
          "repair_id": "G1.030",
          "id": 24394,
          "component_description": "Gear set - complete",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 9.35,
          "time_mins": 561
        }, {
          "component_sequence": 520,
          "repair_id": "G1.040",
          "id": 24395,
          "component_description": "Gear linkage\/shaft",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 7.7,
          "time_mins": 462
        }, {
          "component_sequence": 521,
          "repair_id": "G1.050",
          "id": 24396,
          "component_description": "Gear pedal\/arm",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.2,
          "time_mins": 12
        }, {
          "component_sequence": 524,
          "repair_id": "G1.080",
          "id": 24399,
          "component_description": "Gear change oil seal",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 2.45,
          "time_mins": 147
        }, {
          "component_sequence": 527,
          "repair_id": "G1.110",
          "id": 24402,
          "component_description": "Output shaft oil seal",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 2.45,
          "time_mins": 147
        }],
        "sub_group_sequence": 1
      }]
    }, {
      "group_sequence": 7,
      "group_description": "Mudguards, frame & handlebars",
      "sub_groups": [{
        "sub_group_sequence": 1,
        "sub_group_description": "Frame & handlebars",
        "components": [{
          "component_sequence": 538,
          "repair_id": "H1.030",
          "id": 24413,
          "component_description": "Handlebar end grip - one",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.2,
          "time_mins": 12
        }, {
          "component_sequence": 545,
          "repair_id": "H1.080",
          "id": 24420,
          "component_description": "Mirror - one",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.2,
          "time_mins": 12
        }, {
          "component_sequence": 546,
          "repair_id": "H1.090",
          "id": 24421,
          "component_description": "Mirrors - both",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.25,
          "time_mins": 15
        }, {
          "component_sequence": 547,
          "repair_id": "H1.100",
          "id": 24422,
          "component_description": "Frame - complete",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 7.7,
          "time_mins": 462
        }, {
          "component_sequence": 548,
          "repair_id": "H1.110",
          "id": 24423,
          "component_description": "Front frame - complete",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 4.95,
          "time_mins": 297
        }, {
          "component_sequence": 549,
          "repair_id": "H1.120",
          "id": 24424,
          "component_description": "Rear frame - complete",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 3.35,
          "time_mins": 201
        }, {
          "component_sequence": 550,
          "repair_id": "H1.130",
          "id": 24425,
          "component_description": "Rear swing arm",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 2.35,
          "time_mins": 141
        }, {
          "component_sequence": 551,
          "repair_id": "H1.140",
          "id": 24426,
          "component_description": "Rear swing arm bearing\/bush",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 2.6,
          "time_mins": 156
        }]
      }, {
        "sub_group_sequence": 2,
        "sub_group_description": "Seats & footrests",
        "components": [{
          "component_sequence": 564,
          "repair_id": "H2.020",
          "id": 24439,
          "component_description": "Seat - front",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.2,
          "time_mins": 12
        }, {
          "component_sequence": 565,
          "repair_id": "H2.030",
          "id": 24440,
          "component_description": "Seat - rear",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.2,
          "time_mins": 12
        }, {
          "component_sequence": 566,
          "repair_id": "H2.040",
          "id": 24441,
          "component_description": "Seat - complete",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.2,
          "time_mins": 12
        }, {
          "component_sequence": 572,
          "repair_id": "H2.100",
          "id": 24447,
          "component_description": "Grab bar",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.25,
          "time_mins": 15
        }, {
          "component_sequence": 575,
          "repair_id": "H2.130",
          "id": 24450,
          "component_description": "Footrest - front",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.1,
          "time_mins": 6
        }, {
          "component_sequence": 576,
          "repair_id": "H2.140",
          "id": 24451,
          "component_description": "Footrest - rear",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.1,
          "time_mins": 6
        }, {
          "component_sequence": 577,
          "repair_id": "H2.150",
          "id": 24452,
          "component_description": "Footrest rubber rest\/spring - front",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.2,
          "time_mins": 12
        }]
      }, {
        "sub_group_sequence": 3,
        "sub_group_description": "Panels & stands",
        "components": [{
          "component_sequence": 582,
          "repair_id": "H3.020",
          "id": 24457,
          "component_description": "Side stand",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.25,
          "time_mins": 15
        }, {
          "component_sequence": 584,
          "repair_id": "H3.040",
          "id": 24459,
          "component_description": "Main stand",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.45,
          "time_mins": 27
        }, {
          "component_sequence": 585,
          "repair_id": "H3.050",
          "id": 24460,
          "component_description": "Splash guard",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.35,
          "time_mins": 21
        }]
      }]
    }, {
      "group_sequence": 8,
      "group_description": "Cowling, stowage box, bag\/fairing",
      "sub_groups": [{
        "sub_group_sequence": 1,
        "sub_group_description": "Windscreen & fairings",
        "components": [{
          "component_sequence": 617,
          "repair_id": "J1.140",
          "id": 24492,
          "component_description": "Windscreen",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.25,
          "time_mins": 15
        }, {
          "component_sequence": 619,
          "repair_id": "J1.160",
          "id": 24494,
          "component_description": "Floor board\/footplate - one",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.6,
          "time_mins": 36
        }, {
          "component_sequence": 620,
          "repair_id": "J1.161",
          "id": 24495,
          "component_description": "Floor boards\/footplates - both",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.95,
          "time_mins": 57
        }]
      }]
    }, {
      "group_sequence": 9,
      "group_description": "Wheel & tyre",
      "sub_groups": [{
        "sub_group_description": "Wheel & tyre",
        "components": [{
          "component_sequence": 630,
          "repair_id": "K1.010",
          "id": 24505,
          "component_description": "Front wheel",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.45,
          "time_mins": 27
        }, {
          "component_sequence": 631,
          "repair_id": "K1.011",
          "id": 24506,
          "component_description": "Front wheel - renew",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.95,
          "time_mins": 57
        }, {
          "component_sequence": 632,
          "repair_id": "K1.020",
          "id": 24507,
          "component_description": "Rear wheel",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.35,
          "time_mins": 21
        }, {
          "component_sequence": 633,
          "repair_id": "K1.021",
          "id": 24508,
          "component_description": "Rear wheel - renew",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.75,
          "time_mins": 45
        }, {
          "component_sequence": 634,
          "repair_id": "K1.030",
          "id": 24509,
          "component_description": "Front tyre\/tube",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.75,
          "time_mins": 45
        }, {
          "component_sequence": 635,
          "repair_id": "K1.040",
          "id": 24510,
          "component_description": "Rear tyre\/tube",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.7,
          "time_mins": 42
        }, {
          "component_sequence": 639,
          "repair_id": "K1.080",
          "id": 24514,
          "component_description": "Wheel bearing set - front",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1,
          "time_mins": 60
        }, {
          "component_sequence": 644,
          "repair_id": "K1.130",
          "id": 24519,
          "component_description": "Wheel bearing set - rear",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.6,
          "time_mins": 96
        }, {
          "component_sequence": 647,
          "repair_id": "K1.160",
          "id": 24522,
          "component_description": "Front spindle",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.45,
          "time_mins": 27
        }],
        "sub_group_sequence": 1
      }]
    }, {
      "group_sequence": 10,
      "group_description": "Suspension",
      "sub_groups": [{
        "sub_group_sequence": 1,
        "sub_group_description": "Front suspension",
        "components": [{
          "component_sequence": 659,
          "repair_id": "L1.040",
          "id": 24534,
          "component_description": "Front shock absorber - one",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.6,
          "time_mins": 36
        }, {
          "component_sequence": 668,
          "repair_id": "L1.100",
          "id": 24543,
          "component_description": "Longitudinal arm",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 2.6,
          "time_mins": 156
        }, {
          "component_sequence": 669,
          "repair_id": "L1.110",
          "id": 24544,
          "component_description": "Fork oil seal - one",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.45,
          "time_mins": 87
        }, {
          "component_sequence": 670,
          "repair_id": "L1.120",
          "id": 24545,
          "component_description": "Fork oil seals - both",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.95,
          "time_mins": 117
        }, {
          "component_sequence": 673,
          "repair_id": "L1.150",
          "id": 24548,
          "component_description": "Fork outer tube - one",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.75,
          "time_mins": 45
        }, {
          "component_sequence": 674,
          "repair_id": "L1.160",
          "id": 24549,
          "component_description": "Fork outer tubes - both",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.85,
          "time_mins": 51
        }, {
          "component_sequence": 675,
          "repair_id": "L1.170",
          "id": 24550,
          "component_description": "Fork inner tube\/bushes - one",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.5,
          "time_mins": 90
        }, {
          "component_sequence": 676,
          "repair_id": "L1.180",
          "id": 24551,
          "component_description": "Fork inner tubes\/bushes - both",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 2.25,
          "time_mins": 135
        }]
      }, {
        "sub_group_sequence": 2,
        "sub_group_description": "Rear suspension",
        "components": [{
          "component_sequence": 699,
          "repair_id": "L2.260",
          "id": 24574,
          "component_description": "Monoshock assembly",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.6,
          "time_mins": 36
        }]
      }]
    }, {
      "group_sequence": 11,
      "group_description": "Steering",
      "sub_groups": [{
        "sub_group_description": "Steering",
        "components": [{
          "component_sequence": 708,
          "repair_id": "M1.010",
          "id": 24583,
          "component_description": "Steering lock",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.6,
          "time_mins": 96
        }, {
          "component_sequence": 712,
          "repair_id": "M1.050",
          "id": 24587,
          "component_description": "Steering ball joint",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 2.25,
          "time_mins": 135
        }],
        "sub_group_sequence": 1
      }]
    }, {
      "group_sequence": 12,
      "group_description": "Drive systems",
      "sub_groups": [{
        "sub_group_sequence": 1,
        "sub_group_description": "Shaft drive",
        "components": [{
          "component_sequence": 738,
          "repair_id": "N2.010",
          "id": 24613,
          "component_description": "Drive shaft",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 2.35,
          "time_mins": 141
        }, {
          "component_sequence": 739,
          "repair_id": "N2.020",
          "id": 24614,
          "component_description": "Drive shaft rubber boot",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.25,
          "time_mins": 75
        }, {
          "component_sequence": 750,
          "repair_id": "N2.130",
          "id": 24625,
          "component_description": "Drive pinion gear bearing",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 3.2,
          "time_mins": 192
        }]
      }]
    }, {
      "group_sequence": 13,
      "group_description": "Brakes",
      "sub_groups": [{
        "sub_group_sequence": 1,
        "sub_group_description": "Braking system hydraulics",
        "components": [{
          "component_sequence": 816,
          "repair_id": "P1.010",
          "id": 24691,
          "component_description": "Hydraulic system - front",
          "action": "Bleed",
          "action_description": "Bleed",
          "time_hrs": 0.75,
          "time_mins": 45
        }, {
          "component_sequence": 817,
          "repair_id": "P1.011",
          "id": 24692,
          "component_description": "Hydraulic system - rear",
          "action": "Bleed",
          "action_description": "Bleed",
          "time_hrs": 0.45,
          "time_mins": 27
        }, {
          "component_sequence": 818,
          "repair_id": "P1.012",
          "id": 24693,
          "component_description": "Hydraulic system - complete",
          "action": "Bleed",
          "action_description": "Bleed",
          "time_hrs": 1,
          "time_mins": 60
        }, {
          "component_sequence": 820,
          "repair_id": "P1.021",
          "id": 24695,
          "component_description": "Fluid reservoir - rear",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.35,
          "time_mins": 21
        }, {
          "component_sequence": 823,
          "repair_id": "P1.050",
          "id": 24698,
          "component_description": "Master cylinder - rear",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.1,
          "time_mins": 66
        }, {
          "component_sequence": 825,
          "repair_id": "P1.070",
          "id": 24700,
          "component_description": "Front brake hose - one",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.25,
          "time_mins": 75
        }, {
          "component_sequence": 827,
          "repair_id": "P1.090",
          "id": 24702,
          "component_description": "Rear brake hose - one",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1,
          "time_mins": 60
        }]
      }, {
        "sub_group_sequence": 2,
        "sub_group_description": "Foot brakes\/lever brakes",
        "components": [{
          "component_sequence": 838,
          "repair_id": "P2.010",
          "id": 24713,
          "component_description": "Front brake lever",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.2,
          "time_mins": 12
        }, {
          "component_sequence": 843,
          "repair_id": "P2.060",
          "id": 24718,
          "component_description": "Rear brake pedal",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.25,
          "time_mins": 15
        }, {
          "component_sequence": 849,
          "repair_id": "P2.120",
          "id": 24724,
          "component_description": "Front brake calipers - both",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.1,
          "time_mins": 66
        }, {
          "component_sequence": 851,
          "repair_id": "P2.140",
          "id": 24726,
          "component_description": "Rear brake caliper",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.95,
          "time_mins": 57
        }, {
          "component_sequence": 855,
          "repair_id": "P2.160",
          "id": 24730,
          "component_description": "Front brake pads",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.45,
          "time_mins": 27
        }, {
          "component_sequence": 856,
          "repair_id": "P2.170",
          "id": 24731,
          "component_description": "Rear brake pads",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.45,
          "time_mins": 27
        }, {
          "component_sequence": 859,
          "repair_id": "P2.200",
          "id": 24734,
          "component_description": "Front brake disc - one",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.75,
          "time_mins": 45
        }, {
          "component_sequence": 861,
          "repair_id": "P2.220",
          "id": 24736,
          "component_description": "Rear brake disc - one",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.85,
          "time_mins": 51
        }]
      }, {
        "sub_group_sequence": 3,
        "sub_group_description": "ABS",
        "components": [{
          "component_sequence": 871,
          "repair_id": "P3.020",
          "id": 24746,
          "component_description": "Modulator",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 2.2,
          "time_mins": 132
        }, {
          "component_sequence": 874,
          "repair_id": "P3.050",
          "id": 24749,
          "component_description": "Wheel rotor - front",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.2,
          "time_mins": 72
        }, {
          "component_sequence": 875,
          "repair_id": "P3.051",
          "id": 24750,
          "component_description": "Wheel rotor - rear",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.95,
          "time_mins": 57
        }, {
          "component_sequence": 876,
          "repair_id": "P3.060",
          "id": 24751,
          "component_description": "Wheel speed sensor - front",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.7,
          "time_mins": 42
        }, {
          "component_sequence": 877,
          "repair_id": "P3.061",
          "id": 24752,
          "component_description": "Wheel speed sensor - rear",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.45,
          "time_mins": 27
        }]
      }]
    }, {
      "group_sequence": 14,
      "group_description": "General electrics",
      "sub_groups": [{
        "sub_group_sequence": 1,
        "sub_group_description": "Battery & cables",
        "components": [{
          "component_sequence": 888,
          "repair_id": "R1.010",
          "id": 24763,
          "component_description": "Battery",
          "action": "Check",
          "action_description": "Check",
          "time_hrs": 0.5,
          "time_mins": 30
        }, {
          "component_sequence": 889,
          "repair_id": "R1.020",
          "id": 24764,
          "component_description": "Battery",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.45,
          "time_mins": 27
        }, {
          "component_sequence": 895,
          "repair_id": "R1.080",
          "id": 24770,
          "component_description": "Wiring harness - complete",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 5.1,
          "time_mins": 306
        }]
      }, {
        "sub_group_sequence": 2,
        "sub_group_description": "Charging system",
        "components": [{
          "component_sequence": 898,
          "repair_id": "R2.020",
          "id": 24773,
          "component_description": "Generator",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 2.45,
          "time_mins": 147
        }, {
          "component_sequence": 901,
          "repair_id": "R2.050",
          "id": 24776,
          "component_description": "Generator brushes",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 2.5,
          "time_mins": 150
        }, {
          "component_sequence": 903,
          "repair_id": "R2.070",
          "id": 24778,
          "component_description": "Voltage regulator",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.85,
          "time_mins": 111
        }]
      }, {
        "sub_group_sequence": 3,
        "sub_group_description": "Starting system",
        "components": [{
          "component_sequence": 906,
          "repair_id": "R3.010",
          "id": 24781,
          "component_description": "Starter motor",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.5,
          "time_mins": 30
        }, {
          "component_sequence": 907,
          "repair_id": "R3.020",
          "id": 24782,
          "component_description": "Starter motor",
          "action": "S & R",
          "action_description": "Strip and Rebuild",
          "time_hrs": 0.7,
          "time_mins": 42
        }]
      }, {
        "sub_group_sequence": 4,
        "sub_group_description": "Bulbs",
        "components": [{
          "component_sequence": 915,
          "repair_id": "R4.020",
          "id": 24790,
          "component_description": "Headlamp bulb",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.25,
          "time_mins": 15
        }, {
          "component_sequence": 916,
          "repair_id": "R4.030",
          "id": 24791,
          "component_description": "Rear combination bulb - any",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.2,
          "time_mins": 12
        }, {
          "component_sequence": 917,
          "repair_id": "R4.040",
          "id": 24792,
          "component_description": "Direction indicator bulb - one",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.2,
          "time_mins": 12
        }, {
          "component_sequence": 918,
          "repair_id": "R4.050",
          "id": 24793,
          "component_description": "Instrument panel warning lamp - any",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.45,
          "time_mins": 27
        }, {
          "component_sequence": 919,
          "repair_id": "R4.060",
          "id": 24794,
          "component_description": "Instrument panel illumination - any",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.45,
          "time_mins": 27
        }]
      }, {
        "sub_group_sequence": 5,
        "sub_group_description": "Front lamps",
        "components": [{
          "component_sequence": 921,
          "repair_id": "R5.010",
          "id": 24796,
          "component_description": "Headlamp alignment",
          "action": "C & A",
          "action_description": "Check and Adjust",
          "time_hrs": 0.2,
          "time_mins": 12
        }, {
          "component_sequence": 922,
          "repair_id": "R5.020",
          "id": 24797,
          "component_description": "Headlamp - one",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.75,
          "time_mins": 45
        }, {
          "component_sequence": 928,
          "repair_id": "R5.080",
          "id": 24803,
          "component_description": "Direction indicator - one - front",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.35,
          "time_mins": 21
        }, {
          "component_sequence": 929,
          "repair_id": "R5.090",
          "id": 24804,
          "component_description": "Direction indicators - both - front",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.5,
          "time_mins": 30
        }, {
          "component_sequence": 930,
          "repair_id": "R5.100",
          "id": 24805,
          "component_description": "Direction indicator - one - rear",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.2,
          "time_mins": 12
        }, {
          "component_sequence": 931,
          "repair_id": "R5.110",
          "id": 24806,
          "component_description": "Direction indicators - both - rear",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.25,
          "time_mins": 15
        }]
      }, {
        "sub_group_sequence": 6,
        "sub_group_description": "Rear lamps",
        "components": [{
          "component_sequence": 934,
          "repair_id": "R6.010",
          "id": 24809,
          "component_description": "Rear combination lamp assembly",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.25,
          "time_mins": 15
        }, {
          "component_sequence": 935,
          "repair_id": "R6.020",
          "id": 24810,
          "component_description": "Rear combination lamp lens",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.2,
          "time_mins": 12
        }]
      }, {
        "sub_group_sequence": 7,
        "sub_group_description": "Switches",
        "components": [{
          "component_sequence": 941,
          "repair_id": "R7.020",
          "id": 24816,
          "component_description": "Ignition switch",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.5,
          "time_mins": 30
        }, {
          "component_sequence": 942,
          "repair_id": "R7.030",
          "id": 24817,
          "component_description": "Combination switch - left",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.5,
          "time_mins": 30
        }, {
          "component_sequence": 943,
          "repair_id": "R7.040",
          "id": 24818,
          "component_description": "Combination switch - right",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.5,
          "time_mins": 30
        }, {
          "component_sequence": 948,
          "repair_id": "R7.090",
          "id": 24823,
          "component_description": "Side stand switch",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.35,
          "time_mins": 21
        }, {
          "component_sequence": 952,
          "repair_id": "R7.130",
          "id": 24827,
          "component_description": "Stop lamps switch - front",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.5,
          "time_mins": 30
        }, {
          "component_sequence": 953,
          "repair_id": "R7.140",
          "id": 24828,
          "component_description": "Stop lamps switch - rear",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.6,
          "time_mins": 36
        }]
      }, {
        "sub_group_sequence": 8,
        "sub_group_description": "Instruments",
        "components": [{
          "component_sequence": 958,
          "repair_id": "R8.020",
          "id": 24833,
          "component_description": "Instrument panel",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1,
          "time_mins": 60
        }, {
          "component_sequence": 961,
          "repair_id": "R8.050",
          "id": 24836,
          "component_description": "Speedometer",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.75,
          "time_mins": 45
        }, {
          "component_sequence": 963,
          "repair_id": "R8.070",
          "id": 24838,
          "component_description": "Tachometer",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.85,
          "time_mins": 51
        }, {
          "component_sequence": 965,
          "repair_id": "R8.090",
          "id": 24840,
          "component_description": "Fuel gauge",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.2,
          "time_mins": 72
        }]
      }, {
        "sub_group_sequence": 9,
        "sub_group_description": "Transducers, sensors & transmitters",
        "components": [{
          "component_sequence": 971,
          "repair_id": "R9.010",
          "id": 24846,
          "component_description": "Horn",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.25,
          "time_mins": 15
        }, {
          "component_sequence": 973,
          "repair_id": "R9.030",
          "id": 24848,
          "component_description": "Oil temperature transmitter",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.6,
          "time_mins": 36
        }, {
          "component_sequence": 974,
          "repair_id": "R9.040",
          "id": 24849,
          "component_description": "Oil pressure transmitter",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.25,
          "time_mins": 15
        }]
      }, {
        "sub_group_sequence": 10,
        "sub_group_description": "Fuse boxes & relays",
        "components": [{
          "component_sequence": 983,
          "repair_id": "R10.040",
          "id": 24858,
          "component_description": "Relay\/fuse box (combined)",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 1.25,
          "time_mins": 75
        }, {
          "component_sequence": 987,
          "repair_id": "R10.080",
          "id": 24862,
          "component_description": "Indicator relay\/flasher unit",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.2,
          "time_mins": 12
        }, {
          "component_sequence": 990,
          "repair_id": "R10.110",
          "id": 24865,
          "component_description": "Starter circuit cut-off relay",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.2,
          "time_mins": 12
        }, {
          "component_sequence": 992,
          "repair_id": "R10.130",
          "id": 24867,
          "component_description": "Horn relay",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.2,
          "time_mins": 12
        }, {
          "component_sequence": 993,
          "repair_id": "R10.140",
          "id": 24868,
          "component_description": "ABS relay",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.6,
          "time_mins": 36
        }, {
          "component_sequence": 995,
          "repair_id": "R10.160",
          "id": 24870,
          "component_description": "Fuel pump relay",
          "action": "R & I",
          "action_description": "Remove and Install",
          "time_hrs": 0.2,
          "time_mins": 12
        }]
      }]
    }]
  },
  "metadata": {
    "total": 1,
    "page": 1,
    "pages": 1,
    "limit": 20,
    "links": {
      "self": {
        "href": "\/motorcycles\/v1\/vehicles\/BMM00173\/repair-times\/26625?parts=no&country-code=gb&page=1&limit=20"
      }
    }
  }
}

var options = {
  keys: ['component_description', 'action_description'],
  id: 'ISBN'
}

var parsedResponse = JSON.parse(response);
var laborTimesArr = parsedResponse.data.repair_times[2].sub_groups[0].components

var fuseLaborTimes = new Fuse(laborTimesArr, options)

console.log(fuse.search('old'))

//
