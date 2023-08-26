const mongoose = require('mongoose')

const esquemaRecurso = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 128
  },
  marca: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 128
  },
  centro: {
    type: String,
    required: false,
    minLength: 2,
    maxLength: 64
  },
  estado: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 16
  },
  leadTime: {
    type: Number,
    required: false
  }
}, { 
    versionKey: false, 
    discriminatorKey: "recurso", 
    collection: "recurso" 
  })

module.exports = mongoose.model('Recurso', esquemaRecurso)