
const mongoose = require('mongoose');

let machineSchema = new mongoose.Schema({

    nombre: {
        type: String
    },

    descripcion: {
        type: String
    },

    codeqr: {
        type: String
    }

});

module.exports = mongoose.model('Machine', machineSchema);