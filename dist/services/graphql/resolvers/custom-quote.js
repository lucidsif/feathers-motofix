"use strict";
const id = (customQuote) => customQuote.id;
const motorcycle = (customQuote) => customQuote.motorcycle;
const location = (customQuote) => customQuote.location;
const services = (customQuote) => customQuote.services;
const notes = (customQuote) => customQuote.notes;
const email = (customQuote) => customQuote.email;
const completed = (customQuote) => customQuote.completed;
const created_at = (customQuote) => customQuote.created_at;
const updated_at = (customQuote) => customQuote.updated_at;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    CustomQuote: {
        id,
        motorcycle,
        location,
        services,
        notes,
        email,
        completed,
        created_at,
        updated_at
    }
};
//# sourceMappingURL=custom-quote.js.map