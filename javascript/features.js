class Feature {
    constructor(id,titulo, costo){
        this.id = id,
        this.titulo = titulo,
        this.costo = costo
    }
}

let membresia = []
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

let featuresEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []

if(localStorage.getItem("membresia")){
    membresia = JSON.parse(localStorage.getItem("membresia"))
}
else{
    console.log("Agregando features a membresia por primera vez")

cargarFeatures()
}

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

btnAgregar.addEventListener("click", ()=>{

    agregarAlCarrito(feature)
    })
})

let botonAgregar = document.getElementsByClassName("btnAgregar")
for (let agregado of botonAgregar){
    agregado.addEventListener("click",()=>{
    })
}

let botonCarrito = document.getElementById("botonCarrito")
let modalBody = document.getElementById("modal-body")
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
let parrafoCompra = document.getElementById('precioTotal')



function agregarAlCarrito(feature){
    let featureAgregado = featuresEnCarrito.find((ingresado)=>(ingresado.id == feature.id))
    if(featureAgregado == undefined){
        featuresEnCarrito.push(feature)
        localStorage.setItem("carrito", JSON.stringify(featuresEnCarrito))
        Toastify({
            text:"Feature ha sido agregado",
            gravity:'bottom',
            duration: 3000,
            style: {
                background: "cadetblue"
            }
            }).showToast()
    }else{
        Toastify({
            text:`El feature ${feature.titulo} ya fue agregado`,
            gravity:'bottom',
            duration: 3000,
            style: {
                background: "gray"
            }
        }).showToast()
    }
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
                    <button class= "btn btn-danger" id="botonEliminar${featureCarrito.id}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg></button>
            </div>    
        </div>`
    })
    
    array.forEach((featureCarrito, indice)=>{document.getElementById(`botonEliminar${featureCarrito.id}`).addEventListener("click", ()=>{
        array.splice(indice, 1)
        localStorage.setItem("carrito", JSON.stringify(array))
        cargarFeaturesEnCarrito(array)
    })

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
        title: 'Est?? seguro de realizar la compra',
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


