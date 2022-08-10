const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')

const cantidad = document.getElementById('cantidad')

const precioTotal = document.getElementById('precioTotal')

const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {

    carrito.length = 0
    actualizarCarrito()

    Toastify({
        text: "Carrito vacío",
        duration: 3000,
        gravity: 'bottom',
        position: 'center',
        className: "toastify2",
        style: {
            background: 'black',
            color: '#d4bf97',
        }
    }).showToast();
})

//INYECTO EL HTML

const lista = document.querySelector('#contenedor-productos')

fetch('productos.json')
    .then( (resp) => resp.json() )
    .then( (data) => {


        data.forEach((producto) => {
            const div = document.createElement('div')
            div.classList.add('producto')
            div.innerHTML = `
                        <img class="item-image" src=${producto.img} alt="productos">
                        <h5 class="card-title item-title">${producto.nombre}</h5>
                        <h5 class="item-price">$${producto.precio}.-</h5>
                            <div class="card text-center">
                                <button id="agregar${producto.id}" class="btn-comprar text-center">Agregar al carrito <i class="fa-solid fa-cart-plus"></i></button>
                            </div>
            `
        
            contenedorProductos.appendChild(div)
            const boton = document.getElementById(`agregar${producto.id}`)

            boton.addEventListener('click', () => {

                    const existe = carrito.some (prod => prod.id === producto.id)
                
                    if (existe){
                        const prod = carrito.map (prod => {
                            if (prod.id === producto.id){
                                prod.cantidad++ //SINTÁXIS SUGAR ++
                            }
                        })
                    } else {
                        const item = data.find((prod) => prod.id === producto.id)
                        carrito.push(item)
                    }
                
                    actualizarCarrito()

                    Toastify({
                        text: "Producto agregado al carrito",
                        duration: 3000,
                        gravity: 'bottom',
                        position: 'center',
                        className: "toastify2",
                        style: {
                            background: 'black',
                            color: '#d4bf97',
                        }

                }).showToast(); 
            })
        })
    })

const actualizarCarrito = () => {

    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <img style= "max-width: 300px" src=${prod.img} alt="productos">
        <p>${prod.nombre}</p>
        <p>Precio: $${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button style="background-color: #000000; color:#d4bf97" onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fa-solid fa-trash-can"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    contadorCarrito.innerText = carrito.length

    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)

}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item)

    carrito.splice(indice, 1)
    actualizarCarrito()
    console.log(carrito)

    Toastify({
        text: "Producto eliminado del carrito",
        duration: 3000,
        gravity: 'bottom',
        position: 'center',
        className: "toastify2",
        style: {
            background: 'black',
            color: '#d4bf97',
        }
    }).showToast();
}

