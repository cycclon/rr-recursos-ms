require('dotenv').config()
const express = require('express')
const app = express()
const InsumosRoute = require("./routes/insumos")
const EquiposRoute = require("./routes/equipos")
const RecursosRoute = require('./routes/recursos')

const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;

db.on('error', (error)=> console.log(error));
db.once('open',()=>console.log('Conectado a base de datos de Recursos'));

app.use(express.json());
app.use(cors());

app.use('/insumos', InsumosRoute)
app.use('/equipos', EquiposRoute)
app.use('/recursos', RecursosRoute)

app.listen(3003, ()=> console.log(
    'RR: microservicio de Recursos iniciado correctamente en puerto 3003.'))