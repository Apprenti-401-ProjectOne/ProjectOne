'use strict';

const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  type: {type: String, required:true, enum:['admin', 'editor', 'user']},
  capabilities: {type: Array, required:true},
});

// router.post('/roles', (req, res, next) => {
//   let saved = [];
//   Object.keys(capabilities).map(role => {
//     let newRecord = new Role({type: role, capabilities: capabilities[role]});
//     saved.push(newRecord.save());
//   });
//   Promise.all(saved);
//   res.send('Roles Created');
// });


module.exports = mongoose.model('roles', roleSchema)