'use strict';

// src/services/quotes/hooks/process.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

//const defaults = {};

// TODO: attach the rest of the quote fields..created and updated are null particularly
module.exports = function(options) {

  return function(hook) {
    hook.process = true;
    const user = hook.params.user;
    const motorcycle_json = hook.data.motorcycle_json;
    const part_json = hook.data.part_json;
    const cart_json = hook.data.cart_json;

    hook.data = {
      fk_user_id: user.dataValues.id,
      motorcycle_json,
      part_json,
      cart_json,
    }
  };
};
