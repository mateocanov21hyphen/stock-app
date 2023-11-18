const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config()

const app = express()

mongoose.connect(`mongodb+srv://mateocanovanegas2005:${process.env.MONGO_DB_PASS}@development.fcynfbf.mongodb.net/rutas_de_vuelo?retryWrites=true&w=majority`)
    .then((result) => {
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`)
        })
        console.log('Conexión con la DB exitosaa')
    })

    .catch((err) => console.log(err))

const productSchema = mongoose.Schema({

    RouteId: { type: String, required: true },
    AeroOrigen: String,
    AeroDestino: String,
    ContOrigen: String,
    ContDestino: String,
    PaisOrigen: String,
    PaisDestino: String,
    CiuOrigen: String,
    CiuDestino: String
},
    { timestamps: true }
)

const Product = mongoose.model('Product', productSchema, 'Products')

app.use(express.json())

//Agregar Datos sobre la ruta de vuelo
app.post('/api/v1/products', (req, res) => {

    const newProduct = new Product(req.body)

    newProduct
        .save()
        .then((result) => {
            res.status(201).json({ ok: true })
        }).catch((err) => console.log(err))

})

//Buscar Ruta de Vuelo
app.get('/api/v1/products/:routeId', async (req, res) => {
    const routeId = req.params.routeId;

    try {
        const foundRoute = await Product.findOne({ RouteId: routeId }).exec();

        if (foundRoute) {
            res.status(200).json(foundRoute);
        } else {
            res.status(404).json({ message: 'Ruta no encontrada' });
        }
    } catch (error) {
        console.error('Error al buscar la ruta:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Editar ruta de vuelo
app.put('/api/v1/products/:routeId', async (req, res) => {
    const routeId = req.params.routeId;

    try {
        const foundRoute = await Product.findOne({ RouteId: routeId }).exec();

        if (foundRoute) {
            const updatedRoute = await Product.findOneAndUpdate(
                { RouteId: routeId },
                { $set: req.body },
                { new: true }
            ).exec();

            res.status(200).json(updatedRoute);
        } else {
            res.status(404).json({ message: 'Ruta no encontrada' });
        }
    } catch (error) {
        console.error('Error al modificar la ruta:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Eliminar Ruta de Vuelo
app.delete('/api/v1/products/:routeId', async (req, res) => {
    const routeId = req.params.routeId;

    try {
        const deletedRoute = await Product.findOneAndDelete({ RouteId: routeId }).exec();

        if (deletedRoute) {
            res.status(200).json({ message: 'Ruta eliminada exitosamente' });
        } else {
            res.status(404).json({ message: 'Ruta no encontrada' });
        }
    } catch (error) {
        console.error('Error al eliminar la ruta:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Tabla de Ruta de Vuelo:
app.get('/api/v1/products', async (req, res) => {
    try {
        const allRoutes = await Product.find({}).exec();
        res.status(200).json(allRoutes);
    } catch (error) {
        console.error('Error al obtener las rutas:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//--------------------------------------------------------------------------------------------------------------------
// PARA AEROLINEA:
const AerolineaSchema = mongoose.Schema({
    AeolineaID: { type: String, required: true },
    nombreAerolinea: String,
}, { timestamps: true });

const Aerolinea = mongoose.model('Aerolinea', AerolineaSchema, 'Aerolineas');

// Para crear
app.post('/api/v1/aerolineas', (req, res) => {
    const newAerolinea = new Aerolinea(req.body);

    newAerolinea.save()
        .then((result) => {
            res.status(201).json({ ok: true });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Error interno del servidor' });
        });
});

//Para Buscar:
// Ruta para obtener detalles de una Aerolínea por su ID
app.get('/api/v1/aerolineas/:aerolineaID', async (req, res) => {
    const aerolineaID = req.params.aerolineaID;

    try {
        const foundAerolinea = await Aerolinea.findOne({ AeolineaID: aerolineaID }).exec();

        if (foundAerolinea) {
            res.status(200).json(foundAerolinea);
        } else {
            res.status(404).json({ message: 'Aerolínea no encontrada' });
        }
    } catch (error) {
        console.error('Error al buscar la aerolínea:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Para Editar
app.put('/api/v1/aerolineas/:aerolineaID', async (req, res) => {
    const aerolineaID = req.params.aerolineaID;
    const newData = req.body;

    try {
        const foundAerolinea = await Aerolinea.findOne({ AeolineaID: aerolineaID }).exec();

        if (foundAerolinea) {
            await Aerolinea.updateOne({ AeolineaID: aerolineaID }, newData).exec();
            res.status(200).json({ ok: true });
        } else {
            res.status(404).json({ ok: false });
        }
    } catch (error) {
        console.error('Error al editar la aerolínea:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Datos y tabla
app.get('/api/v1/aerolineas', async (req, res) => {
    try {
        const aerolineas = await Aerolinea.find({});
        res.json(aerolineas);
    } catch (error) {
        console.error('Error al obtener datos de aerolíneas:', error);
        res.status(500).send('Error interno del servidor');
    }
});

//Eliminar
// Ruta para eliminar una aerolínea por su ID
app.delete('/api/v1/aerolineas/:aerolineaID', async (req, res) => {
    const aerolineaID = req.params.aerolineaID;

    try {
        const deletedAerolinea = await Aerolinea.findOneAndDelete({ AeolineaID: aerolineaID }).exec();

        if (deletedAerolinea) {
            res.status(200).send('Aerolínea eliminada exitosamente');
        } else {
            res.status(404).send('La aerolínea no fue encontrada');
        }
    } catch (error) {
        console.error('Error al intentar eliminar la aerolínea:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 4000

//--------------------------------------------------------------------------------------------------------------------
// PARA VUELOS:
const VueloSchema = mongoose.Schema({
    IDVuelo: { type: String, required: true },
    IDRutaVuelo: { type: String, required: true },
    IDAerolinea: { type: String, required: true },
    FechaSalida: String,
    HoraSalida: String,
    Fechallegada: String,
    Horallegada: String,
    Estado: String,
}, { timestamps: true });

const Vuelo = mongoose.model('Vuelo', VueloSchema, 'Vuelos');

// Agregar Ruta para Crear Nuevo Vuelo
app.post('/api/v1/vuelos', async (req, res) => {
    const { IDVuelo, IDRutaVuelo, IDAerolinea, FechaSalida, HoraSalida, Fechallegada, Horallegada, Estado } = req.body;

    try {
        // Verificar existencia de la ruta de vuelo
        const foundRoute = await Product.findOne({ RouteId: IDRutaVuelo }).exec();

        // Verificar existencia de la aerolínea
        const foundAerolinea = await Aerolinea.findOne({ AeolineaID: IDAerolinea }).exec();

        if (!foundRoute || !foundAerolinea) {
            return res.status(400).json({ error: 'La ruta de vuelo o la aerolínea no existen en la base de datos' });
        }

        const nuevoVuelo = new Vuelo({
            IDVuelo,
            IDRutaVuelo,
            IDAerolinea,
            FechaSalida,
            HoraSalida,
            Fechallegada,
            Horallegada,
            Estado,
        });

        const result = await nuevoVuelo.save();
        res.status(201).json({ ok: true });
    } catch (error) {
        console.error('Error al crear el vuelo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Para Buscar
// Ruta para obtener detalles de un Vuelo por su ID
app.get('/api/v1/vuelos/:vueloID', async (req, res) => {
    const vueloID = req.params.vueloID;

    try {
        const foundVuelo = await Vuelo.findOne({ IDVuelo: vueloID }).exec();

        if (foundVuelo) {
            res.status(200).json(foundVuelo);
        } else {
            res.status(404).json({ message: 'Vuelo no encontrado' });
        }
    } catch (error) {
        console.error('Error al buscar el vuelo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Para Eliminar
app.delete('/api/v1/vuelos/:vueloID', async (req, res) => {
    const vueloID = req.params.vueloID;

    try {
        const deletedVuelo = await Vuelo.findOneAndDelete({ IDVuelo: vueloID }).exec();

        if (deletedVuelo) {
            res.status(200).json({ message: 'Vuelo eliminado exitosamente' });
        } else {
            res.status(404).json({ message: 'Vuelo no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar el vuelo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//TABLA
app.get('/api/v1/vuelos', async (req, res) => {
    try {
        const vuelos = await Vuelo.find().exec();
        res.status(200).json(vuelos);
    } catch (error) {
        console.error('Error al obtener los vuelos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//------------------------------------------------------------------------------------------------------------------
//Para Aeropuertos
// Ruta para obtener todos los datos de aeropuertos
//Tabla
app.get('/api/v1/aeropuertos', async (req, res) => {
    try {
        const aeropuertos = await Aeropuerto.find({}).exec();
        res.status(200).json(aeropuertos);
    } catch (error) {
        console.error('Error al obtener datos de aeropuertos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


//Para crear aeropuertos
const AeropuertoSchema = mongoose.Schema({
    AeroID:{ type: String, required: true},
    nombreAero: String,
}, { timestamps: true});

const Aeropuerto = mongoose.model('Aeropuerto', AeropuertoSchema, 'Aeropuertos');

//Crear:
app.post('/api/v1/aeropuertos', (req, res) => {
    const newAeropuerto = new Aeropuerto(req.body);

    newAeropuerto.save()
    .then((result) => {
        res.status(201).json({ok:true});
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json({error: 'Error interno del servidor'});
    });
});

//PAra buscar:
app.get('/api/v1/aeropuertos/:AeroID', async (req, res) => {
    const { AeroID } = req.params;

    try {
        const aeropuerto = await Aeropuerto.findOne({ AeroID }).exec();

        if (aeropuerto) {
            res.status(200).json(aeropuerto);
        } else {
            res.status(404).json({ message: 'Aeropuerto no encontrado' });
        }
    } catch (error) {
        console.error('Error al buscar aeropuerto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Para modificar:
app.put('/api/v1/aeropuertos/:AeroID', async (req, res) => {
    const { AeroID } = req.params;
    const { nombreAero } = req.body;

    try {
        const aeropuertoActualizado = await Aeropuerto.findOneAndUpdate(
            { AeroID },
            { nombreAero },
            { new: true }
        ).exec();

        if (aeropuertoActualizado) {
            res.status(200).json(aeropuertoActualizado);
        } else {
            res.status(404).json({ message: 'Aeropuerto no encontrado' });
        }
    } catch (error) {
        console.error('Error al editar el aeropuerto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


//Para Eliminar:
app.delete('/api/v1/aeropuertos/:AeroID', async (req, res) => {
    const { AeroID } = req.params;

    try {
        const aeropuertoEliminado = await Aeropuerto.findOneAndDelete({ AeroID }).exec();

        if (aeropuertoEliminado) {
            res.status(200).json({ message: 'Aeropuerto eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Aeropuerto no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar el aeropuerto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


//PARA CONTROL DE VUELOS:
const controlVuelosSchema = new mongoose.Schema({
    IDVuelo: String,
    ListaDespegue: String,
    ListaAterrizaje: String,
    FechaDespegue: String,
    FechaAterrizaje: String,
    Estado: String,
  });
  
  const ControlVuelo = mongoose.model('ControlVuelo', controlVuelosSchema, 'ControlVuelos');
  
  //PAra tabla
  app.get('/api/v1/controldevuelos', async (req, res) => {
    try {
      const controlesVuelo = await ControlVuelo.find({}).exec();
      res.status(200).json(controlesVuelo);
    } catch (error) {
      console.error('Error al obtener controles de vuelo:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });