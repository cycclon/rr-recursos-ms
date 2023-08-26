const mongoose = require('mongoose')

const esquemaEquipo = mongoose.Schema({
    modelo: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 128
    },
    fechaCompra: {
        type: Date,
        required: true
    },
    vidaUtil: {
        type: Number,
        required: true
    }
  }, { versionKey: false })
  
  module.exports = mongoose.model('Equipo', esquemaEquipo)