const express = require("express")
const Insumo = require("../models/insumo")
const router = express.Router()
const { validarAutorizacion, validarNivel, validarCentro } = require('../utilities/utilidades')

async function editarInsumo(insumoEditado, res){
    try {
        await insumoEditado.save()
    } catch (error) {        
        return res.status(200).json({ mensaje: error.message })
    }
}

async function obtenerInsumoID(req, res, next) {
    let insumo
    try {
        insumo = await Insumo.findOne({ _id: req.params.idinsumo })        
        if(insumo == null) {
            return res.status(200).json({ 
                mensaje: "No se pudo encontrar el insumo" })
        }
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }

    res.insumo = insumo
    next()
}

router.post('/registrar-insumo', validarAutorizacion, 
validarNivel(3), validarCentro, async (req, res)=>{
    const insumo = new Insumo({
        nombre: req.body.nombre,
        marca: req.body.marca,
        centro: req.body.centro,
        estado: req.body.estado,
        leadTime: req.body.leadTime,
        stockSeguridad: req.body.stockSeguridad,
        cantidadActual: req.body.cantidadActual
    })
    try {
        await insumo.save()
        return res.status(200).json({ 
            mensaje: "Insumo registrado", insumo: insumo })
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
})

router.post('/editar-cantidad-actual/:idinsumo', validarAutorizacion, obtenerInsumoID, validarCentro,
validarNivel(3), async (req, res)=>{    
    res.insumo.cantidadActual = await req.body.cantidadActual
    await res.insumo.save()
    return res.status(200).json({
        mensaje: `Se cambió el stock actual del insumo ${res.insumo.nombre} de la marca ${res.insumo.marca}`
    })
})

router.post('/editar-stock-seg/:idinsumo', validarAutorizacion, obtenerInsumoID,
validarNivel(3), validarCentro, async (req, res)=>{    
    res.insumo.stockSeguridad = req.body.stockSeguridad
    await editarInsumo(res.insumo, res)
    return res.status(200).json({
        mensaje: `Se cambió el stock de seguridad del insumo ${res.insumo.nombre} de la marca ${res.insumo.marca}`
    })
})





module.exports = router