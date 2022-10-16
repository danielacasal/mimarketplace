class Servicio {
    constructor(id, nombre, duracion, precio){
        this.id = id,
        this.nombre = nombre,
        this.duracion = duracion,
        this.precio = precio
    }
}

let catalogo=[]
if(localStorage.getItem("catalogo")){
    catalogo = JSON.parse(localStorage.getItem("catalogo"))
}
else {
    localStorage.setItem("catalogo", JSON.stringify(catalogo))
}

let divServicios = document.getElementById("servicios")

function mostrarServicios(catalogo){
    divServicios.innerHTML=""
    catalogo.forEach((servicio)=>{
    let nuevoServicio = document.createElement("div")
    nuevoServicio.innerHTML = `<div id="${servicio.id}" class="card" style="width: 18rem;">
                                        <div class="card-body">
                                            <h4 class="card-title">${servicio.nombre}</h4>
                                            <p> Precio por sesion $${servicio.precio}</p>
                                            <p> Duracion en minutos: ${servicio.duracion}</p>
                                            <button class="btn btn-outline-danger">Borrar</button>                                   
                                        </div>
                                    </div>`
            divServicios.append(nuevoServicio)
    })
}

function guardarServicio(catalogo){
    let nombreInput = document.getElementById ("nombreInput")
    let duracionInput = document.getElementById ("duracionInput")
    let precioInput = document.getElementById ("precioInput")
    let servicioCreado = new Servicio (catalogo.length+1, nombreInput.value, parseInt(duracionInput.value), parseInt(precioInput.value))
    catalogo.push(servicioCreado)
    localStorage.setItem("catalogo", JSON.stringify(catalogo))
    nombreInput.value=""
    duracionInput.value=""
    precioInput.value=""
    mostrarServicios(catalogo)
}

let btnGuardar = document.getElementById("guardarServicioBtn")
btnGuardar.addEventListener("click", ()=>{
    guardarServicio(catalogo)
    Swal.fire(`Servicio agregado`)
    Swal.fire({
        title:"Producto agregado",
        icon: "success",
        showConfirmButton: false,
        timer: 1500})
})


let btnVerServicios = document.getElementById("verServicios")
btnVerServicios.addEventListener("click", ()=>{
    let divLoader = document.getElementById("loader")
    divLoader.innerHTML = `<strong style= "padding-left:6rem">cargando su oferta de servicios...</strong>`
    setTimeout(()=>{
        mostrarServicios(catalogo)
    },3000)
})

