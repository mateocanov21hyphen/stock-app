const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()

const app = express()

mongoose.connect(`mongodb+srv://mateocanovanegas2005:${process.env.MONGO_DB_PASS}@development.fcynfbf.mongodb.net/rutas_de_vuelo?retryWrites=true&w=majority`)
.then( (result) => {
    app.listen(PORT, () => { 
        console.log(`Servidor escuchando en el puerto ${PORT}`)
    })
    console.log('Conexión con la DB exitosa')
})

.catch((err) => console.log(err))

const productSchema = mongoose.Schema({

    RouteId: {type: String, required: true},
    AeroOrigen: String,
    AeroDestino: String, 
    ContOrigen: String,
    ContDestino: String,
    PaisOrigen: String,
    PaisDestino: String,
    CiuOrigen: String,
    CiuDestino: String
},
{ timestamps: true}
)

const Product = mongoose.model('Product', productSchema, 'Products')

app.use(express.json())

app.post('/api/v1/products', (req, res) => {
    
    const newProduct = new Product(req.body)

    newProduct
        .save()
        .then( (result) => {
        res.status(201).json({ok:true})
    }).catch((err) => console.log(err))

})

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 4000


