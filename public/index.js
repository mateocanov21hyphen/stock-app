const inputRouteId  = document.querySelector('#RouteId')

const inputAeroOrigen  = document.querySelector('#AeroOrigen')

const inputAeroDestino  = document.querySelector('#AeroDestino')

const inputContOrigen  = document.querySelector('#ContOrigen')

const inputContDestino  = document.querySelector('#ContDestino')

const inputPaisOrigen  = document.querySelector('#PaisOrigen')

const inputPaisDestino  = document.querySelector('#PaisDestino')

const inputCiuOrigen  = document.querySelector('#CiuOrigen')

const inputCiuDestino  = document.querySelector('#CiuDestino')


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
        body: JSON.stringify( {
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
