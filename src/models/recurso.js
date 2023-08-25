const mongoose = require('mongoose')

const esquemaRecurso = mongoose.Schema({
  nombre: {

  },
  marca: {

  },
  modelo: {

  },
  fechaCompra: {
    
  }

}, { versionKey: false })

module.exports = mongoose.model('Recurso', esquemaRecurso)