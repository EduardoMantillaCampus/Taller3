let table = new DataTable('.myTable')

let formSedesCampus = document.querySelector('#formSedesCampus')
let formCampers = document.querySelector('#formCampers')
let formTeams = document.querySelector('#formTeams')
let teamsCamper = document.getElementById('teamsSeleccionado')

let campus = {}

let cargaDatosTeams = (sede) => {
 let opciones = document.querySelector('#bodyTeams')
 opciones.innerHTML = null
 console.log(Object.entries(campus[`${sede}`]['Teams'][0]))
 for (let [val, id] of Object.entries(campus)) {
  opciones.insertAdjacentHTML(
   'beforeend',
   `
        <tr>
            <td>${[val]}</td>
        </tr>
           `
  )
 }
}
let cargaDatosSedes = () => {
 let opciones = document.querySelector('#bodySedes')
 opciones.innerHTML = null
 for (let [val, id] of Object.entries(campus)) {
  opciones.insertAdjacentHTML(
   'beforeend',
   `
        <tr>
            <td>${val}</td>
        </tr>
           `
  )
 }
}

formSedesCampus.addEventListener('submit', (e) => {
 e.preventDefault()
 let data = Object.fromEntries(new FormData(e.target))
 campus[`${data.nombreSede}`] = { Camper: [], Trainers: [], Teams: [] }
 listaSedes("[name='sedeTeams']")
 listaSedes("[name='sede']")
 cargaDatosSedes()
 formSedesCampus.reset()
})

formCampers.addEventListener('submit', (e) => {
 e.preventDefault()
 let data = Object.fromEntries(new FormData(e.target))
 let sede = data.sede
 delete data.sede
 console.log(data)
 campus[`${sede}`]['Camper'].unshift(data)
 listaSedes("[name='teams']")
 formCampers.reset()
})

formTeams.addEventListener('submit', (e) => {
 e.preventDefault()
 let data = Object.fromEntries(new FormData(e.target))
 let sede = data.sedeTeams
 delete data.sedeTeams

 campus[`${sede}`]['Teams'].unshift(data)
 listaTeams("[name='teams']", sede)
 cargaDatosTeams(sede)
 formTeams.reset()
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

let listaTeams = (ubicacion, sede) => {
 let opciones = document.querySelector(ubicacion)
 opciones.innerHTML = null
 //console.log(Object.entries(campus[`${sede}`]['Teams']).length );
 //let cant =Object.entries(campus[`${sede}`]['Teams']).length;

 for (let i = 0; i < Object.entries(campus[`${sede}`]['Teams']).length; i++) {
  let team = campus[`${sede}`]['Teams'][i]['nombre']
  opciones.insertAdjacentHTML(
   'beforeend',
   `
                        <option value="${team}">${team}</option>
                    `
  )
 }
}
