"use strict";
const rp = require("request-promise");
const host = process.env.WEB_ADDRESS_EXT || 'localhost:3010';
const googleBaseURL = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
class Appointment {
    constructor(app) {
        this.app = app;
    }
    getAppointments(zipOrCoordinates) {
        const mechanics = {
            method: 'GET',
            uri: `http://${host}/mechanics?available=true`,
            json: true
        };
        var nearMechanics = [];
        var appointments = [];
        var schedules = [];
        return rp(mechanics)
            .then((mechanicsArr) => {
            return mechanicsArr;
        })
            .reduce((arr, mechanic) => {
            const url = `origins=${mechanic.zipcode}&destinations=${zipOrCoordinates}&mode=driving&sensor=false&units=imperial`;
            const mechanicMatrixUrl = `${googleBaseURL}${url}`;
            const mechanicReq = {
                method: 'GET',
                uri: mechanicMatrixUrl,
                json: true
            };
            return rp(mechanicReq)
                .then((distanceMatrixResult) => {
                console.log('ran distance matrix for mechanic: ' + mechanic.first_name);
                if (distanceMatrixResult.rows[0].elements[0].distance.value <= mechanic.travel_radius * 5280) {
                    console.log(`${mechanic.first_name} is willing to drive ${mechanic.travel_radius} miles and is ${distanceMatrixResult.rows[0].elements[0].distance.value / 5280} away from the rider`);
                    nearMechanics.push(mechanic);
                }
                else {
                    console.log(`${mechanic.first_name} did not meet predicate. willing to drive ${mechanic.travel_radius} miles and is ${distanceMatrixResult.rows[0].elements[0].distance.value / 5280} away from the rider`);
                }
            });
        }, Promise.resolve())
            .then(() => {
            return nearMechanics;
        })
            .reduce((arr, nearMechanic) => {
            const mechanicScheduleUrl = `http://${host}/mechanicschedules?fk_mechanic_id=${nearMechanic.id}`;
            const mechanicScheduleReq = {
                method: 'GET',
                uri: mechanicScheduleUrl,
                json: true
            };
            const mechanicAppointmentUrl = `http://${host}/appointments?fk_mechanic_id=${nearMechanic.id}`;
            const mechanicAppointmentReq = {
                method: 'GET',
                uri: mechanicAppointmentUrl,
                json: true
            };
            return rp(mechanicScheduleReq)
                .then((scheduleResults) => {
                schedules.push(scheduleResults);
            })
                .then(() => {
                return rp(mechanicAppointmentReq)
                    .then((appointmentResults) => {
                    appointments.push(appointmentResults);
                });
            });
        }, Promise.resolve())
            .then(() => {
            console.log(schedules[0]);
            console.log(appointments[0]);
            const payload = {
                schedules: schedules[0],
                appointments: appointments[0]
            };
            console.log(payload);
            return payload;
        })
            .catch((err) => {
            console.log(err);
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Appointment;
//# sourceMappingURL=feathersAppointment.js.map