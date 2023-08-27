const jwt = require('jsonwebtoken')

// VALIDAR TOKEN JWT
const validarAutorizacion = (req, res, next) =>{  
  const encabezadoAut = req.headers['authorization']

  const token = encabezadoAut && encabezadoAut.split(' ')[1]
  
  if(token == null) return res.status(201).json({ autorizado: false })

  jwt.verify(token, process.env.JWT_KEY, (err, usuario)=>{
      if(err) return res.status(201).json({ autorizado: false, motivo: err.message })

      // USUARIO QUE SOLICITA LA FUNCIONALIDAD A LA API
      res.usuarioSolicitante = usuario
      next()
  })
}

// FUNCIÓN PARA VALIDAR EL NIVEL DE ACCESO DE UN USUARIO SOLICITANTE
const validarNivel = (nivelRequerido) => {
    return (req, res, next) => {
        const resultado = {
            autorizado: false, 
            motivo: 'Nivel de acceso insuficiente', 
            nivelRequerido: nivelRequerido, 
            nivel: res.usuarioSolicitante.tipo
        }
        if(res.usuarioSolicitante && res.usuarioSolicitante.tipo <= nivelRequerido) {    
            next()
        } else {
            return res.status(200).json(resultado)           
        }
    } 
}

// FUNCIÓN PARA VALIDAR QUE EL USUARIO SOLICITANTE ADMINISTRE EL CENTRO
// DONDE SE REGISTRÓ EL RECURSO
const validarCentro = async (req, res, next) => {
    const resultado = {
        autorizado: false, 
        motivo: 'El usuario solicitante no administra el centro donde se registró el recurso',         
    }
    
    if(res.usuarioSolicitante.tipo >= 3){
        if(req.body.encargadosCentro && req.body.encargadosCentro.includes(res.usuarioSolicitante.nombre)){            
            next()
        } else {            
            return res.status(200).json({ resultado })
        }
    } else {
        next()
    }    
}

module.exports = { validarAutorizacion, validarNivel, validarCentro }