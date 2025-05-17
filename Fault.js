const mongoose = require('mongoose');

const faultSchema = new mongoose.Schema({
  dateOfFault: String,
  equipmentName: String,
  natureOfFault: String,
  status: String,
  escalatedToOEM: String,
  remarks: String
});

module.exports = mongoose.model('Fault', faultSchema);


