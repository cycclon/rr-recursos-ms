const express = require("express")
const Insumo = require("../models/insumo")
const router = express.Router()

router.post('/registrar-insumo', async (req, res)=>{
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
        return res.status(200).json({ mensaje: "Insumo registrado", insumo: insumo })
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
})

module.exports = router