const mongoose = require('mongoose')
const Recurso = require('./recurso')

const Insumo = mongoose.Schema({    
    stockSeguridad: {
        type: Number,
        required: true
    },
    cantidadActual: {
        type: Number,
        required: true
    }
}, { versionKey: false })

module.exports = Recurso.discriminator("Insumo", Insumo)