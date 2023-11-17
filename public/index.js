//Funcinalidad Para que el botón cree una nueva Rut de vuelo
const inputRouteId = document.querySelector('#RouteId')

const inputAeroOrigen = document.querySelector('#AeroOrigen')

const inputAeroDestino = document.querySelector('#AeroDestino')

const inputContOrigen = document.querySelector('#ContOrigen')

const inputContDestino = document.querySelector('#ContDestino')

const inputPaisOrigen = document.querySelector('#PaisOrigen')

const inputPaisDestino = document.querySelector('#PaisDestino')

const inputCiuOrigen = document.querySelector('#CiuOrigen')

const inputCiuDestino = document.querySelector('#CiuDestino')


const button = document.querySelector('button')

button.addEventListener('click', (e) => {

    const RouteId = inputRouteId.value
    const AeroOrigen = inputAeroOrigen.value
    const AeroDestino = inputAeroDestino.value
    const ContOrigen = inputContOrigen.value
    const ContDestino = inputContDestino.value
    const PaisOrigen = inputPaisOrigen.value
    const PaisDestino = inputPaisDestino.value
    const CiuOrigen = inputCiuOrigen.value
    const CiuDestino = inputCiuDestino.value

    fetch('/api/v1/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            RouteId,
            AeroOrigen,
            AeroDestino,
            ContOrigen,
            ContDestino,
            PaisOrigen,
            PaisDestino,
            CiuOrigen,
            CiuDestino,
        }),
    })

    // Limpiar campos después de enviar los datos
    inputRouteId.value = '';
    inputAeroOrigen.value = '';
    inputAeroDestino.value = '';
    inputContOrigen.value = '';
    inputContDestino.value = '';
    inputPaisOrigen.value = '';
    inputPaisDestino.value = '';
    inputCiuOrigen.value = '';
    inputCiuDestino.value = '';

})

//Para buscar una Ruta de Vuelo:
const buttonSearch = document.querySelector('#buscar button');

const inputRouteIdBuscar = document.querySelector('#RouteIdBuscar');

const searchResultsDiv = document.querySelector('#buscar h2');

buttonSearch.addEventListener('click', (e) => {
    const routeId = inputRouteIdBuscar.value;

    fetch(`/api/v1/products/${routeId}`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {

            if (data) {

                //OPCION 2
                const routeDetails = `
                <strong>ID de la ruta:</strong> ${data.RouteId}<br>
                <strong>Aeropuerto Origen:</strong> ${data.AeroOrigen}<br>
                <strong>Aeropuerto Destino:</strong> ${data.AeroDestino}<br>
                <strong>Continente Origen:</strong> ${data.ContOrigen}<br>
                <strong>Continente Destino:</strong> ${data.ContDestino}<br>
                <strong>País Origen:</strong> ${data.PaisOrigen}<br>
                <strong>País Destino:</strong> ${data.PaisDestino}<br>
                <strong>Ciudad Origen:</strong> ${data.CiuOrigen}<br>
                <strong>Ciudad Destino:</strong> ${data.CiuDestino}<br>
            `;
                searchResultsDiv.innerHTML = `<h3>Detalles de la ruta:</h3>${routeDetails}`;
            } else {
                searchResultsDiv.textContent = 'La ruta no fue encontrada';
            }
        })
        .catch(error => {
            console.error('Error al buscar la ruta:', error);
        });

    // Limpiar campo de búsqueda después de buscar
    inputRouteIdBuscar.value = '';
});

//Para Editar Una Ruta de Vuelo
function modificarRutaVuelo() {
    const inputRouteIdModificar = document.querySelector('#RouteIdModificar');
    const routeIdModificar = inputRouteIdModificar.value;

    const inputAeroOrigenModificar = document.querySelector('#AeroOrigenModificar');
    const aeroOrigenModificar = inputAeroOrigenModificar.value;

    const inputAeroDestinoModificar = document.querySelector('#AeroDestinoModificar');
    const aeroDestinoModificar = inputAeroDestinoModificar.value;

    const inputContOrigenModificar = document.querySelector('#ContOrigenModificar');
    const contOrigenModificar = inputContOrigenModificar.value;

    const inputContDestinoModificar = document.querySelector('#ContDestinoModificar');
    const contDestinoModificar = inputContDestinoModificar.value;

    const inputPaisOrigenModificar = document.querySelector('#PaisOrigenModificar');
    const paisOrigenModificar = inputPaisOrigenModificar.value;

    const inputPaisDestinoModificar = document.querySelector('#PaisDestinoModificar');
    const paisDestinoModificar = inputPaisDestinoModificar.value;

    const inputCiuOrigenModificar = document.querySelector('#CiuOrigenModificar');
    const ciuOrigenModificar = inputCiuOrigenModificar.value;

    const inputCiuDestinoModificar = document.querySelector('#CiuDestinoModificar');
    const ciuDestinoModificar = inputCiuDestinoModificar.value;

    fetch(`/api/v1/products/${routeIdModificar}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            AeroOrigen: aeroOrigenModificar,
            AeroDestino: aeroDestinoModificar,
            ContOrigen: contOrigenModificar,
            ContDestino: contDestinoModificar,
            PaisOrigen: paisOrigenModificar,
            PaisDestino: paisDestinoModificar,
            CiuOrigen: ciuOrigenModificar,
            CiuDestino: ciuDestinoModificar
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Ruta modificada:', data);
            // Puedes actualizar la interfaz aquí si es necesario
        })
        .catch(error => {
            console.error('Error al modificar la ruta:', error);
            // Manejo de errores
        });

    // Limpiar campos después de enviar los datos
    inputRouteIdModificar.value = '';
    inputAeroOrigenModificar.value = '';
    inputAeroDestinoModificar.value = '';
    inputContOrigenModificar.value = '';
    inputContDestinoModificar.value = '';
    inputPaisOrigenModificar.value = '';
    inputPaisDestinoModificar.value = '';
    inputCiuOrigenModificar.value = '';
    inputCiuDestinoModificar.value = '';
}

//Eliminar una ruta de Vuelo:
function eliminarRutaVuelo() {
    const inputRouteIdEliminar = document.querySelector('#RouteIdEliminar');
    const routeIdEliminar = inputRouteIdEliminar.value;

    fetch(`/api/v1/products/${routeIdEliminar}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.status === 200) {
                console.log('Ruta eliminada exitosamente');
                // Puedes realizar alguna acción adicional si se elimina exitosamente
            } else if (response.status === 404) {
                console.log('La ruta no fue encontrada');
            } else {
                console.error('Error al intentar eliminar la ruta');
            }
        })
        .catch(error => {
            console.error('Error al eliminar la ruta:', error);
        });

    // Limpiar campo después de eliminar
    inputRouteIdEliminar.value = '';
}

//Para crear una tabla con las RDV
fetch('/api/v1/products')
    .then(response => response.json())
    .then(data => {
        const tabla = document.querySelector('#datosTabla tbody');
        tabla.innerHTML = '';

        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.RouteId}</td>
                <td>${item.AeroOrigen}</td>
                <td>${item.AeroDestino}</td>
                <td>${item.ContOrigen}</td>
                <td>${item.ContDestino}</td>
                <td>${item.PaisOrigen}</td>
                <td>${item.PaisDestino}</td>
                <td>${item.CiuOrigen}</td>
                <td>${item.CiuDestino}</td>
            `;
            tabla.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error al obtener datos:', error);
    });

//--------------------------------------------------------------------------------------------------------------
//PARA AEROLINEA:
//Para crear
button.addEventListener('click', (e) => {
    const AeolineaID = document.querySelector('#AeolineaID').value;
    const nombreAerolinea = document.querySelector('#nombreAerolinea').value;

    fetch('/api/v1/aerolineas', { // Cambio en la ruta para guardar en la colección de aerolíneas
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            AeolineaID,
            nombreAerolinea,
        }),
    })
        .then(response => response.json())
        .then(data => {
            // Manejar la respuesta si es necesario
        })
        .catch(error => {
            console.error('Error al crear aerolínea:', error);
        });

    // Limpiar campos después de enviar los datos
    document.querySelector('#AeolineaID').value = '';
    document.querySelector('#nombreAerolinea').value = '';
});


//Para Buscar:
const buttonBuscarAerolinea = document.querySelector('#buscar button');

buttonBuscarAerolinea.addEventListener('click', (e) => {
    const AerolineaIDBuscar = document.querySelector('#AerolineaIDBuscar').value;

    fetch(`/api/v1/aerolineas/${AerolineaIDBuscar}`, { // Ruta para buscar una aerolínea por ID
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
            const detallesAerolineaDiv = document.querySelector('#detallesAerolinea');

            if (data) {
                const detallesAerolinea = `
                <strong>ID de la Aerolínea:</strong> ${data.AeolineaID}<br>
                <strong>Nombre de la Aerolínea:</strong> ${data.nombreAerolinea}<br>
                <!-- Agrega aquí más campos si los tienes -->
            `;
                detallesAerolineaDiv.innerHTML = `<h3>Detalles de la Aerolínea:</h3>${detallesAerolinea}`;
            } else {
                detallesAerolineaDiv.textContent = 'La aerolínea no fue encontrada';
            }
        })
        .catch(error => {
            console.error('Error al buscar la aerolínea:', error);
        });

    // Limpiar campo de búsqueda después de buscar
    document.querySelector('#AerolineaIDBuscar').value = '';
});

//PARA EDITAR:
const buttonEditarAerolinea = document.querySelector('#Editar button');

buttonEditarAerolinea.addEventListener('click', (e) => {
    const AeolineaIDModificar = document.querySelector('#AeolineaIDModificar').value;
    const nombreAerolineaModificar = document.querySelector('#nombreAerolineaModificar').value;

    fetch(`/api/v1/aerolineas/${AeolineaIDModificar}`, { // Ruta para editar aerolínea por ID
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            AeolineaID: AeolineaIDModificar,
            nombreAerolinea: nombreAerolineaModificar,
            // Agrega aquí más campos si los tienes
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert('Aerolínea editada exitosamente');
                // Realizar acciones adicionales si es necesario
            } else {
                alert('El ID de la aerolínea no existe');
            }
        })
        .catch(error => {
            console.error('Error al editar la aerolínea:', error);
        });

    // Limpiar campos después de editar
    document.querySelector('#AeolineaIDModificar').value = '';
    document.querySelector('#nombreAerolineaModificar').value = '';
});


//Para mostrar la información por la tabla
function cargarDatosAerolineas() {
    fetch('/api/v1/aerolineas')
        .then(response => response.json())
        .then(data => {
            const tabla = document.querySelector('#datosTablaAerolineas tbody');
            tabla.innerHTML = '';

            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.AeolineaID}</td>
                    <td>${item.nombreAerolinea}</td>
                    <!-- Agrega aquí más campos si los tienes -->
                `;
                tabla.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al obtener datos de aerolíneas:', error);
        });
}

// Llamar a la función para cargar los datos al cargar la página
window.onload = cargarDatosAerolineas;

//Para Eliminar:
function eliminarAerolinea() {
    const idAerolinea = document.getElementById('idAerolinea').value;

    fetch(`/api/v1/aerolineas/${idAerolinea}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                alert('Aerolínea eliminada exitosamente');
                // Realizar acciones adicionales si es necesario
            } else {
                alert('No se pudo eliminar la aerolínea');
            }
        })
        .catch(error => {
            console.error('Error al intentar eliminar la aerolínea:', error);
        });

    // Limpiar campo después de eliminar
    document.getElementById('idAerolinea').value = '';
}

//--------------------------------------------------------------------------------------------------------------
//PARA VUELOS:
// Creación 
// Obtener el botón y agregar evento click
const createButton = document.querySelector('#crear button');

createButton.addEventListener('click', async () => {
    const IDVuelo = document.querySelector('#IDVuelo').value;
    const IDRutaVuelo = document.querySelector('#IDRutaVuelo').value;
    const IDAerolinea = document.querySelector('#IDAerolinea').value;
    const FechaSalida = document.querySelector('#FechaSalida').value;
    const HoraSalida = document.querySelector('#HoraSalida').value;
    const Fechallegada = document.querySelector('#Fechallegada').value;
    const Horallegada = document.querySelector('#Horallegada').value;
    const Estado = document.querySelector('#Estado').value;

    try {
        // Verificar existencia de la ruta de vuelo
        const responseRuta = await fetch(`/api/v1/products/${IDRutaVuelo}`, { method: 'GET' });
        const dataRuta = await responseRuta.json();

        // Verificar existencia de la aerolínea
        const responseAerolinea = await fetch(`/api/v1/aerolineas/${IDAerolinea}`, { method: 'GET' });
        const dataAerolinea = await responseAerolinea.json();

        if (!dataRuta || !dataAerolinea) {
            alert('La ruta de vuelo o la aerolínea no existen en la base de datos');
            return; // Detener la creación si alguno de los IDs no existe
        }

        // Si ambas validaciones pasan, enviar el nuevo vuelo
        const responseNuevoVuelo = await fetch('/api/v1/vuelos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                IDVuelo,
                IDRutaVuelo,
                IDAerolinea,
                FechaSalida,
                HoraSalida,
                Fechallegada,
                Horallegada,
                Estado,
            }),
        });

        if (responseNuevoVuelo.ok) {
            alert('Nuevo vuelo creado exitosamente');
            // Limpiar campos después de crear el vuelo
            // ...
        } else {
            alert('Hubo un error al crear el vuelo');
        }
    } catch (error) {
        console.error('Error al crear el vuelo:', error);
        alert('Hubo un error al crear el vuelo');
    }
});

// Buscar un Vuelo:
// Para buscar un vuelo:
const searchButton = document.querySelector('#buscar button');
const searchInput = document.querySelector('#IdVueloBuscar');


searchButton.addEventListener('click', async () => {
    const idVuelo = searchInput.value;

    try {
        const response = await fetch(`/api/v1/vuelos/${idVuelo}`, {
            method: 'GET',
        });

        if (response.ok) {
            const data = await response.json();
            const flightDetails = `
                <strong>ID de Vuelo:</strong> ${data.IDVuelo}<br>
                <strong>ID Ruta de Vuelo:</strong> ${data.IDRutaVuelo}<br>
                <strong>ID Aerolínea:</strong> ${data.IDAerolinea}<br>
                <strong>Fecha de Salida:</strong> ${data.FechaSalida}<br>
                <strong>Hora de Salida:</strong> ${data.HoraSalida}<br>
                <strong>Fecha de Llegada:</strong> ${data.Fechallegada}<br>
                <strong>Hora de Llegada:</strong> ${data.Horallegada}<br>
                <strong>Estado:</strong> ${data.Estado}<br>
            `;
            searchResultsDiv.innerHTML = `<h3>Detalles del vuelo:</h3>${flightDetails}`;
        } else {
            searchResultsDiv.textContent = 'El vuelo no fue encontrado';
        }
    } catch (error) {
        console.error('Error al buscar el vuelo:', error);
    }

    // Limpiar campo de búsqueda después de buscar
    searchInput.value = '';
});


// Eliminar Vuelo:
const deleteButton = document.querySelector('#Eliminar button');
const deleteInput = document.querySelector('#IDVueloEliminar');

deleteButton.addEventListener('click', async () => {
    const idVuelo = deleteInput.value;

    try {
        const response = await fetch(`/api/v1/vuelos/${idVuelo}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Vuelo eliminado exitosamente');
            // Realizar cualquier otra acción necesaria después de eliminar el vuelo
        } else {
            alert('Error al eliminar el vuelo');
        }
    } catch (error) {
        console.error('Error al eliminar el vuelo:', error);
        alert('Error al eliminar el vuelo');
    }

    // Limpiar campo después de eliminar
    deleteInput.value = '';
});


//Tabla:
async function obtenerDatosVuelos() {
    try {
        const response = await fetch('/api/v1/vuelos', { method: 'GET' });
        const data = await response.json();

        const tbody = document.querySelector('#datosTablaVuelos tbody');
        tbody.innerHTML = ''; // Limpiar el contenido existente en la tabla

        data.forEach((vuelo) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${vuelo.IDVuelo}</td>
                <td>${vuelo.IDRutaVuelo}</td>
                <td>${vuelo.IDAerolinea}</td>
                <td>${vuelo.FechaSalida}</td>
                <td>${vuelo.HoraSalida}</td>
                <td>${vuelo.Fechallegada}</td>
                <td>${vuelo.Horallegada}</td>
                <td>${vuelo.Estado}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al obtener los datos de vuelos:', error);
    }
}

// Llamar a la función para obtener y mostrar los datos al cargar la página
window.addEventListener('load', obtenerDatosVuelos);


//--------------------------------------------------------------------------------------------------------------------
//Para Aeropuertos
//Para crear un nuevo aeropuerto