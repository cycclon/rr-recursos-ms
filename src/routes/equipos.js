const express = require("express")
const Equipo = require("../models/equipo")
const router = express.Router()
const { validarAutorizacion, validarNivel } = require('../utilities/utilidades')

//REGISTRAR NUEVO EQUIPO
router.post('/registrar-equipo', validarAutorizacion, validarNivel(3), async (req, res)=>{    
    let partesFecha = req.body.fechaCompra.split('/')
    const equipo = new Equipo({
        nombre: req.body.nombre,
        marca: req.body.marca,
        modelo: req.body.modelo,
        fechaCompra: new Date(+partesFecha[2], partesFecha[1]-1, +partesFecha[0]),        
        vidaUtil: req.body.vidaUtil,
        centro: req.body.centro,
        estado: req.body.estado,
        leadTime: req.body.leadTime
    })
    try {
        await equipo.save()
        return res.status(200).json({ mensaje: "Equipo registrado", equipo: equipo })
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
})

router.post('/editar-modelo/:idequipo', validarAutorizacion, 
validarNivel(3), obtenerEquipoID, async (req, res, next)=>{
    res.equipo.modelo = req.body.modelo
    await modificarEquipo(res.equipo, res)
    return res.status(200).json({ 
        mensaje: `Se modificó el modelo del equipo correctamente.` })
})

router.post('/editar-fecha-compra/:idequipo', validarAutorizacion, 
validarNivel(3), obtenerEquipoID, async (req, res, next)=>{
    const partesFecha = req.body.fechaCompra.split('/')
    res.equipo.fechaCompra = new Date(+partesFecha[2], partesFecha[1]-1, +partesFecha[0])
    await modificarEquipo(res.equipo, res)
    return res.status(200).json({ 
        mensaje: `Se modificó la fecha de compra del equipo correctamente.` })
})

router.post('/editar-vida-util/:idequipo', validarAutorizacion, 
validarNivel(3), obtenerEquipoID, async (req, res, next)=>{    
    res.equipo.vidaUtil = req.body.vidaUtil
    await modificarEquipo(res.equipo, res)
    return res.status(200).json({ 
        mensaje: `Se modificó la vida útil del equipo correctamente.` })
})

async function obtenerEquipoID(req, res, next) {
    let equipo
    try {
        equipo = await Equipo.findOne({ _id: req.params.idequipo })

        if(equipo == null) {
        return res.status(200).json({ mensaje: "No se pudo encontrar el equipo" })
        }
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }

    res.equipo = equipo
    next()
}

async function modificarEquipo(equipoModificado, res) {
    try {
        await equipoModificado.save()
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}

module.exports = router