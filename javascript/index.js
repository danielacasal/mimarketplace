let btnDarkMode = document.getElementById("botonDarkMode")
let btnLightMode = document.getElementById("botonLightMode")
let btnResetMode = document.getElementById("botonResetMode")

let modo
if(localStorage.getItem("darkMode")){
    modo = localStorage.getItem("darkMode")
}else if(localStorage.getItem("lightMode")){
    modo = localStorage.getItem("lightMode")
}else if(localStorage.getItem("whiteMode")){
    modo = localStorage.getItem("whiteMode")
}

if(modo == "true"){
    document.body.style.backgroundColor = "#84bcbf"
    document.body.style.color = "antiquewhite"
}else if (modo =="false"){
    document.body.style.backgroundColor = "coral"
    document.body.style.color = "black"
}else {
    document.body.style.backgroundColor = "#white"
    document.body.style.color = "black"
}

btnDarkMode.addEventListener ("click", ()=>{
    document.body.style.backgroundColor = "#84bcbf"
    document.body.style.color = "antiquewhite"
    localStorage.setItem("darkMode", true)
    localStorage.setItem("lightMode", false)
    localStorage.setItem("whiteMode", false)
})

btnLightMode.addEventListener ("click", ()=>{
    document.body.style.backgroundColor = "coral"
    document.body.style.color = "black"
    localStorage.setItem("lightMode", true)
    localStorage.setItem("darkMode", false)
    localStorage.setItem("whiteMode", false)
})

btnResetMode.addEventListener("click", ()=>{
    document.body.style.backgroundColor = "white"
    document.body.style.color = "black"
    localStorage.removeItem("darkMode")
    localStorage.removeItem("lightMode")
    localStorage.removeItem("whiteMode")
})

const DateTime = luxon.DateTime
const fechaHoy = DateTime.now()
let divFechaHoy = document.getElementById("fechaHoy")
let fecha = fechaHoy.setLocale('es').toLocaleString(DateTime.DATE_HUGE)
divFechaHoy.innerHTML = `${fecha}`
