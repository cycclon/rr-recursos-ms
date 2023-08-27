const express = require("express")
const Recurso = require('../models/recurso')
const router = express.Router()
const { validarAutorizacion, 
        validarNivel,
        validarCentro } = require('../utilities/utilidades')

router.post('/editar-nombre/:idrecurso', validarAutorizacion, 
validarNivel(3), obtenerRecursoID, async (req, res)=>{
    res.recurso.nombre = req.body.nombre
    await modificarRecurso(res.recurso, res)
    return res.status(200).json({ 
        mensaje: `Se modificó el nombre del ${res.recurso.recurso} correctamente` })
})

router.post('/editar-marca/:idrecurso', validarAutorizacion, 
validarNivel(3), obtenerRecursoID, validarCentro, async (req, res)=>{
    res.recurso.marca = req.body.marca
    await modificarRecurso(res.recurso, res)
    return res.status(200).json({ 
        mensaje: `Se modificó la marca del ${res.recurso.recurso} correctamente` })
})

router.post('/editar-lead-time/:idrecurso', validarAutorizacion, 
validarNivel(3), obtenerRecursoID, validarCentro, async (req, res)=>{
    res.recurso.leadTime = req.body.leadTime
    await modificarRecurso(res.recurso, res)
    return res.status(200).json({ 
        mensaje: `Se modificó el lead time del ${res.recurso.recurso} correctamente` 
    })
})

router.post('/eliminar/:idrecurso', validarAutorizacion, 
                                    validarNivel(3), 
                                    obtenerRecursoID, 
                                    validarCentro, async (req, res)=>{
    try {
        await Recurso.deleteOne({ _id: res.recurso._id })
        return res.status(200).json({
            mensaje: "Recurso eliminado correctamente."
        })
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
})

async function obtenerRecursoID(req, res, next){
    let recurso
    try {
        recurso = await Recurso.findOne({ _id: req.params.idrecurso })

        if(recurso == null) {
            return res.status(200).json({ 
                mensaje: "No se pudo encontrar el recurso" })
        }
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }

    res.recurso = recurso
    next()
}

async function modificarRecurso(recursoModificado, res){
    try {
        recursoModificado.save()        
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}

module.exports = router