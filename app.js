const express = require('express')
require('dotenv').config()

const app = express()

app.get('/', (req, res) => {
    console.log('Petición recibida')

    res.send('<h1>Hola Mundo con NODEMON!</h1>')
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
