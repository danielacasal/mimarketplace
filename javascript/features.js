class Feature {
    constructor(id,titulo, costo){
        this.id = id,
        this.titulo = titulo,
        this.costo = costo
    }
}

const membresia = []
const cargarFeatures = async()=>{
    const response = await fetch("../features.json")
    const info = await response.json()
    console.log(info)
    for (let feature of info){
        let featureNuevo = new Feature (feature.id, feature.titulo, feature.costo)
        membresia.push(featureNuevo)
    }
    localStorage.setItem("membresia", JSON.stringify(membresia))
}

cargarFeatures()
console.log(membresia)

let divFeatures = document.getElementById("features")

divFeatures.innerHTML=""
membresia.forEach ((feature)=>{
let nuevoFeature = document.createElement("div")
nuevoFeature.innerHTML =   `<div id="${feature.id}" class="card" style="width: 18rem">
                                <div class="card-body">
                                    <p class="card-title">${feature.titulo}</p>
                                    <p> Precio por mes $${feature.costo}</p>
                                    <button id="btnAgregar${feature.id}" class="btn btn-outline-success btnAgregar">Agregar</button>                                   
                                </div>
                            </div>`
divFeatures.append(nuevoFeature)

let btnAgregar = document.getElementById(`btnAgregar${feature.id}`)
console.log(btnAgregar)
btnAgregar.addEventListener("click", ()=>{
    console.log(feature)
    agregarAlCarrito(feature)
    })
})

let botonAgregar = document.getElementsByClassName("btnAgregar")
for (let agregado of botonAgregar){
    agregado.addEventListener("click",()=>{
        Toastify({
            text:"Feature ha sido agregado",
            gravity:'top',
            duration: 3000,
            style: {
                background: "coral"
            }
        }).showToast()
    })
}

let botonCarrito = document.getElementById("botonCarrito")
let modalBody = document.getElementById("modal-body")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
let parrafoCompra = document.getElementById('precioTotal')
let featuresEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []

function agregarAlCarrito(feature){
    featuresEnCarrito.push(feature)
    console.log(featuresEnCarrito)
    localStorage.setItem("carrito", JSON.stringify(featuresEnCarrito))
}

botonCarrito.addEventListener("click", ()=>{
    cargarFeaturesEnCarrito(featuresEnCarrito)
})

function cargarFeaturesEnCarrito(array){
    modalBody.innerHTML = ""
    array.forEach((featureCarrito)=>{
        modalBody.innerHTML +=`
        <div class="card border-primary mb-3" id ="productoCarrito${featureCarrito.id}" style="max-width: 540px;">
            <div class="card-body">
                    <h4 class="card-title">${featureCarrito.titulo}</h4>
                    <p class="card-text">$${featureCarrito.costo}</p> 
                    <button class= "btn btn-danger" id="botonEliminar"><i class="fas fa-trash-alt"></i></button>
            </div>    
        </div>`
    })
    featuresTotal(array)
}

function featuresTotal(array){
    let suma = 0
    suma = array.reduce((suma, featureCarrito)=>{
        return suma + featureCarrito.costo
    },0)
    suma == 0 ? parrafoCompra.innerHTML = "No se han agregado features": parrafoCompra.innerHTML = `Total mensual es $${suma}<br><strong style = "color: green"> Descuento es $2 </strong> <br> Su nuevo total mensual es $${(suma-2)}`
    }

botonFinalizarCompra.addEventListener("click", ()=>{finalizarCompra()})
function finalizarCompra(){
    Swal.fire({
        title: 'Está seguro de realizar la compra',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Si, comprar',
        cancelButtonText: 'No, volver',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
    }).then((result)=>{
        if(result.isConfirmed){
            Swal.fire({
                title: 'Bien hecho!',
                icon: 'success',
                confirmButtonColor: 'green',
                text: `Compra realizada`,
            })
            featuresEnCarrito = []
            localStorage.removeItem("carrito")
        }else{
            Swal.fire({
                title: 'Compra no realizada',
                icon: 'info',
                text: `Features seleecionados siguen en el carrito`,
                confirmButtonColor: 'green',
                timer:3500
            })
        }
    })
}
