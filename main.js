let myFormularioCampus = document.querySelector('#myFormularioCampus')
let myFormularioPersonas = document.querySelector('#myFormularioPersonas')
let myFormularioTeams = document.querySelector('#myFormularioTeams')
let dat1 = document.getElementById('#teams')

let campus = {}

myFormularioCampus.addEventListener('submit', (e) => {
 e.preventDefault()
 let data = Object.fromEntries(new FormData(e.target))
 campus[`${data.nombreSede}`] = { Camper: [], Trainers: [], Teams: [] }
 listaSedes("[name='sedeTeams']")
 listaSedes("[name='sede']")
 myFormularioCampus.reset()
})

myFormularioPersonas.addEventListener('submit', (e) => {
 e.preventDefault()
 let data = Object.fromEntries(new FormData(e.target))
 let sede = data.sede
 delete data.sede
 campus[`${sede}`]['Camper'].unshift(data)
 listaSedes("[name='teams']")
})

myFormularioTeams.addEventListener('submit', (e) => {
 e.preventDefault()
 let data = Object.fromEntries(new FormData(e.target))

 let sede = data.sedeTeams
 delete data.sedeTeams

 campus[`${sede}`]['Teams'].unshift(data)

 listaSedes("[name='teams']")
 myFormularioTeams.reset()
})

let listaSedes = (ubicacion) => {
 let opciones = document.querySelector(ubicacion)
 opciones.innerHTML = null

 for (let [val, id] of Object.entries(campus)) {
  opciones.insertAdjacentHTML(
   'beforeend',
   `
            <option value="${val}">${val}</option>
        `
  )
 }
}

let listaTeams = (ubicacion) => {
 let opciones = document.querySelector(ubicacion)

 opciones.innerHTML = null

 for (let [val, id] of Object.entries(campus)) {
  opciones.insertAdjacentHTML(
   'beforeend',
   `
                  <option value="${val}">${val}</option>
              `
  )
 }
}
