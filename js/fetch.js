function clickEnProducto(id) {
    alert ('click en ' + id);
}

fetch ('./productos.json')
    .then (resinicial => resinicial.json())
    .then ((res) => {
        const miArray = res;

    let htmlAux = '';
    for (let i = 0; i < miArray.length; i++) {
        htmlAux =
            htmlAux +
            `<div onclick="clickEnProducto(${miArray[i].id})">
                <h3>${miArray[i].name}</h3>
                <p>${miArray[i].price}</p>
            </div>`;
    }
    document.getElementById('listadoDeProductos').innerHTML = htmlAux;
    console.log(htmlAux);
    })
    .catch((e) => {
        console.log(e);
    });