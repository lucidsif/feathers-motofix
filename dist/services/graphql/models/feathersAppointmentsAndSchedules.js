"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
                if (distanceMatrixResult.rows[0].elements[0].distance.value <= mechanic.travel_radius * 1609.34) {
                    console.log(`${mechanic.first_name} is willing to drive ${mechanic.travel_radius} miles and is ${distanceMatrixResult.rows[0].elements[0].distance.value / 1609.34} away from the rider`);
                    nearMechanics.push(mechanic);
                }
                else {
                    console.log(`${mechanic.first_name} did not meet predicate. willing to drive ${mechanic.travel_radius} miles and is ${distanceMatrixResult.rows[0].elements[0].distance.value / 1609.34} away from the rider`);
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
            let mergedSchedules = [].concat.apply([], schedules);
            let mergedAppointments = [].concat.apply([], appointments);
            const payload = {
                schedules: mergedSchedules,
                appointments: mergedAppointments
            };
            return payload;
        })
            .catch((err) => {
            console.log(err);
        });
    }
    createAppointment(token, motorcycle_address, contact_number, note, estimated_start_time, estimated_end_time, status, fk_quote_id, fk_mechanic_id) {
        const options = {
            method: 'POST',
            uri: `http://${host}/appointments`,
            headers: {
                authorization: token,
            },
            body: {
                motorcycle_address,
                contact_number,
                note,
                estimated_start_time,
                estimated_end_time,
                status,
                fk_quote_id,
                fk_mechanic_id
            },
            json: true
        };
        const slackOptions = {
            method: 'POST',
            uri: 'https://hooks.slack.com/services/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',
            body: {
                "text": `Mechanic: ${fk_mechanic_id} \nEstimated start time:${estimated_start_time} \nMotorcycle Address: ${motorcycle_address}. \nNotes: ${note} \nCustomer contact number: ${contact_number}`
            },
            json: true
        };
        rp(slackOptions)
            .then((result) => {
            console.log(result);
        });
        return rp(options)
            .then((response) => {
            return response;
        })
            .catch((e) => {
            console.log(e);
            return e;
        });
    }
    getUserAppointments(fk_user_id) {
        const options = {
            method: 'GET',
            uri: `http://${host}/appointments?fk_user_id=${fk_user_id}`,
            json: true
        };
        return rp(options)
            .then((response) => {
            return response;
        })
            .catch((e) => {
            console.log(e);
        });
    }
}
exports.default = Appointment;
//# sourceMappingURL=feathersAppointmentsAndSchedules.js.map