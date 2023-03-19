let table = new DataTable('.myTable')

let formSedesCampus = document.querySelector('#formSedesCampus')
let formCampers = document.querySelector('#formCampers')
let formTeams = document.querySelector('#formTeams')
let formTrainer = document.querySelector('#formTrainer')
let sedeCamper = document.querySelector('[name=sedeCamper]')
let formRoadMap = document.querySelector('#formRoadMap');


let campus = {
}
//Este segmento de codigo me permite crear nuevas sedes
formSedesCampus.addEventListener('submit', (e) => {
 e.preventDefault()
 let data = Object.fromEntries(new FormData(e.target))
 campus[`${data.nombreSede}`] = { Camper: [], Trainers: [], Teams: [], Nivel:['Basico', 'Intermedio', 'Avanzado'], Transporte:['Moto', 'Bus', 'Carro'], Road:[] }
 listaSelect("[name='sedeTeams']")
 listaSelect("[name='sedeCamper']")
 listaSelect("[name='sedeRoadMap']")
 listaSelect("[name='sedeTrainer']")
 cargaDatosSedes();
 //Esta funcion me permite traerme datos como medio de transporte o nivles de la sede
 cargarData(data.nombreSede,"[name='transporteCamper']",'Transporte');
 cargarData(data.nombreSede,"[name='nivelActual']",'Nivel');
 formSedesCampus.reset()
})

//Este segmento de codigo me permite crear campers
formCampers.addEventListener('submit', (e) => {
 e.preventDefault()
 let data = Object.fromEntries(new FormData(e.target))
 let sede = data.sedeCamper;
 campus[`${sede}`]['Camper'].unshift(data);
 formCampers.reset();
 cargaDatosCampers(sede);
})

//Este segmento de codigo me permite crear Road Map
formRoadMap.addEventListener('submit', (e) => {
    e.preventDefault()
    let data = Object.fromEntries(new FormData(e.target))
    let sede = data.sedeRoadMap;
    campus[sede]['Road'].unshift(data);
    formCampers.reset();
    cargaDatosRoadMap(sede);
   })
   

//Este segmento de codigo me permite crear teams
formTeams.addEventListener('submit', (e) => {
 e.preventDefault()
 let data = Object.fromEntries(new FormData(e.target))
 let sede = data.sedeTeams
 delete data.sedeTeams
 campus[`${sede}`]['Teams'].unshift(data)
 listarTeamsSedes('[name=sedeCamper]','[name=teamsCamper]');
 listarTeamsSedes('[name=sedeTrainer]','[name=teamsTrainer]');
 formTeams.reset()
 cargaDatosTeams(sede)
})

//Este segmento de codigo me permite crear Trainers
formTrainer.addEventListener('submit', (e) => {
    e.preventDefault()
    let data = Object.fromEntries(new FormData(e.target))
    let sede = data.sedeTrainer
    campus[`${sede}`]['Trainers'].unshift(data)
    formTrainer.reset()
    cargaDatosTrainer(sede)
   })

//Este segmento de codigo me permite presentar en select, datos
let listaSelect = (ubicacion) => {
 let opciones = document.querySelector(ubicacion)
 opciones.innerHTML = null
 for (let [val, id] of Object.entries(campus)) {
    opciones.insertAdjacentHTML(
    //opciones.innerHTML+=(
   'beforeend',
   `
            <option value="${val}">${val}</option>
        `
  )
 }
}

//Este segmento de codigo me permite cargar los datos de los campers en tabla
let cargaDatosCampers = (sede) => {
    let opciones = document.querySelector('#bodyCampers')
    opciones.innerHTML = null
    campus[`${sede}`]['Camper'].forEach((team)=>{
        opciones.insertAdjacentHTML(
            'beforeend',
            `
                 <tr class="text-center">
                      <td>${team.sedeCamper}</td>
                      <td>${team.teamsCamper}</td>
                      <td>${team.nombre}</td>
                      <td>${team.telefono}</td>
                      <td>${team.ubicacion}</td>
                      <td>${team.transporteCamper}</td>
                      <td>${team.email}</td>
                      <td>${team.horarioIngles}</td>
                      <td>${team.horarioSer}</td>
                      <td>${team.nivelActual}</td>
                  </tr>
                    `
           )
    })
}
//Este segmento de codigo me permite cargar los datos de los Trainers en tabla
let cargaDatosTrainer = (sede) => {
    let opciones = document.querySelector('#bodyTrainers')
    opciones.innerHTML = null
    campus[`${sede}`]['Trainers'].forEach((team)=>{
        opciones.insertAdjacentHTML(
            'beforeend',
            `
                 <tr class="text-center">
                      <td>${team.sedeTrainer}</td>
                      <td>${team.teamsTrainer}</td>
                      <td>${team.nombre}</td>
                      <td>${team.telefono}</td>
                      <td>${team.email}</td>
                  </tr>
                    `
           )
    })
}
//Este segmento de codigo me permite cargar los datos de los RoadMap en tabla
let cargaDatosRoadMap = (sede) => {
    let opciones = document.querySelector('#bodyRoadMap')
    opciones.innerHTML = null
    campus[`${sede}`]['Road'].forEach((team)=>{
        opciones.insertAdjacentHTML(
            'beforeend',
            `
                 <tr class="text-center">
                      <td>${team.sedeRoadMap}</td>
                      <td>${team.nombreRoadMap}</td>
                      <td>${team.numCreditosRoadMap}</td>
                      <td>${team.anioRoadMap}</td>
                      <td>${team.asignaturaRoadMap}</td>
                  </tr>
                    `
           )
    })
}
//Este segmento de codigo me permite cargar los datos de los teams en la tabla
let cargaDatosTeams = (sede) => {
    let opciones = document.querySelector('#bodyTeams')
    opciones.innerHTML = null
    campus[sede]['Teams'].forEach((team)=>{
        opciones.insertAdjacentHTML(
            'beforeend',
            `
                 <tr class="text-center">
                      <td>${team.nombre}</td>
                      <td>${team.dia}</td>
                      <td>${team.hora}</td>
                      <td>${team.salon}</td>
                      <td>${team.numSalon}</td>
                      <td>${team.pisoSalon}</td>
                      
                  </tr>
                    `
           )
    })
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


//Este codigo sirve para llenar un select de datos que se encuentren dentro de campus
let cargarData = (sede,ubicacion,consulta) =>{
    let opciones = document.querySelector(ubicacion);
    opciones.innerHTML =null;
    let dato=campus[`${sede}`][`${consulta}`];

    for (let i= 0; i< dato.length; i++) {
        opciones.insertAdjacentHTML(
            'beforeend',`
                <option value="${dato[i]}">${dato[i]}</option>
            `
        )
    }
    
}
//Listar Teams para los campers dependiendo la sede seleccionada
let listarTeams = () =>{
    let sedeCamper = document.querySelector('[name=sedeCamper]');
    let opcionTeams = document.querySelector('[name=teamsCamper]');
    opcionTeams.innerHTML=null;
    campus[sedeCamper[0].value]["Teams"].forEach((team)=>{
        opcionTeams.innerHTML +=`<option value="${team.nombre}">${team.nombre}</option>`
    });

    sedeCamper.addEventListener('change', (e)=>{
        opcionTeams.innerHTML=null;
        campus[e.target.value]["Teams"].forEach((team)=>{
            opcionTeams.innerHTML +=`<option value="${team.nombre}">${team.nombre}</option>`
        });
    })
}

//Listar Teams para los campers dependiendo la sede seleccionada
let listarTeamsSedes = (att1, att2) =>{
    let sedeCamper = document.querySelector(att1);
    let opcionTeams = document.querySelector(att2);
    opcionTeams.innerHTML=null;
    campus[sedeCamper[0].value]["Teams"].forEach((team)=>{
        opcionTeams.innerHTML +=`<option value="${team.nombre}">${team.nombre}</option>`
    });

    sedeCamper.addEventListener('change', (e)=>{
        opcionTeams.innerHTML=null;
        campus[e.target.value]["Teams"].forEach((team)=>{
            opcionTeams.innerHTML +=`<option value="${team.nombre}">${team.nombre}</option>`
        });
    })
}