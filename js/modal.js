const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]

//LIBRERÍA
const btn = document.querySelector('#myBtn')
btn.addEventListener('click', () => {

    Toastify({
        text: "Gracias por tu compra!",
        offset: {
            x: 0,
            y: 350
        },
        duration: 3000,
        gravity: 'bottom',
        position: 'center',
        className: "toastify",
        style: {
            background: 'black',
            color: '#d4bf97',
        }
    }).showToast();
})

botonAbrir.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', ()=>{
    contenedorModal.classList.toggle('modal-active')
})
contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')
})
modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation()
})
