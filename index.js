/*const { db } = require("./cnn");
db.any('select * from pizza').then(res=>{console.table(res)})*/
const cors = require('cors')
const express = require('express')
const app = express()
    //para reconocer html
const bodeParser = require('body-parser')

//midlewears
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({ origin: true, credentials: true }));

//routes
app.use(require('./routes/index'))

//execution server web
app.listen(4000)
console.log("Server running in http://localhost:4000")
app.get('/', (req, res) => { res.send('Bienvenidos al servicio Rest-Api-cuentaXpagar') })