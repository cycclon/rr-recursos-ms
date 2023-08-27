const mongoose = require('mongoose')
const Recurso = require('./recurso')

const Equipo = mongoose.Schema({
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
  
  module.exports = Recurso.discriminator("Equipo", Equipo)