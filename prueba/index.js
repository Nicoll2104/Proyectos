function validar() {
    if (document.getElementById("mascota").value.trim() === "") {
        document.getElementById("msj").style.display = "block";
        document.getElementById("msj").textContent = "Por favor, digite el nombre de la mascota";
        setTimeout(() => {
            document.getElementById("msj").style.display = "none";
        }, 1000);
        return false;
    } else if (document.getElementById
        ("propietario").value.trim() === "") {
        document.getElementById("msj").style.display = "block";
        document.getElementById("msj").textContent = "Por favor, digite su nombre";
        setTimeout(() => {
            document.getElementById("msj").style.display = "none";
        }, 1000);
        return false;
    } else if (document.getElementById("telefono").value.trim() === "") {
        document.getElementById("msj").style.display = "block";
        document.getElementById("msj").textContent = "Por favor, digite un teléfono";
        setTimeout(() => {
            document.getElementById("msj").style.display = "none";
        }, 1000);
        return false;
    } else if (document.getElementById("telefono").value.length !== 10) {
        document.getElementById("msj").style.display = "block";
        document.getElementById("msj").textContent = "Por favor, digite un número de teléfono con 10 dígitos";
        setTimeout(() => {
            document.getElementById("msj").style.display = "none";
        }, 1000);
        return false;
    } else if (document.getElementById("tipo").selectedIndex === 0) {
        document.getElementById("msj").style.display = "block";
        document.getElementById("msj").textContent = "Por favor, seleccione el tipo de mascota";
        setTimeout(() => {
            document.getElementById("msj").style.display = "none";
        }, 1000);
        return false;
    } else if (document.getElementById("fecha").value.trim() === "") {
        document.getElementById("msj").style.display = "block";
        document.getElementById("msj").textContent = "Por favor, seleccione una fecha para reservar";
        setTimeout(() => {
            document.getElementById("msj").style.display = "none";
        }, 1000);
        return false;
    } else if (document.getElementById("hora").value.trim() === "") {
        document.getElementById("msj").style.display = "block";
        document.getElementById("msj").textContent = "Por favor, elija una hora disponible";
        setTimeout(() => {
            document.getElementById("msj").style.display = "none";
        }, 1000);
        return false;
    }else if (document.getElementById("message-text").value.trim() === ""){
        document.getElementById("msj").style.display = "block";
        document.getElementById("msj").textContent = "Por favor, digite los sintomas";
        setTimeout(() => {
            document.getElementById("msj").style.display = "none";
        }, 1000);
        return false;
    } else {
        let seleccionFecha = new Date(document.getElementById("fecha").value);
        let fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0);
        let seleccionHora = parseInt(document.getElementById("hora").value);
        if (seleccionFecha < fechaActual || (seleccionFecha.getTime() === fechaActual.getTime() && seleccionHora < 8)) {
            document.getElementById("msj").style.display = "block";
            document.getElementById("msj").textContent = "Debe seleccionar una fecha correcta";
            setTimeout(() => {
                document.getElementById("msj").style.display = "none";
            }, 1000);
            return false;
        } else if (seleccionHora < 8 || seleccionHora > 20) {
            document.getElementById("msj").style.display = "block";
            document.getElementById("msj").textContent = "La hora debe estar entre las 8 AM y las 8 PM.";
            setTimeout(() => {
                document.getElementById("msj").style.display = "none";
            }, 1000);
            return false;
        } else {
            document.getElementById("msj2").style.display = "block";
            document.getElementById("msj2").textContent = "Registro exitoso";
            setTimeout(() => {
                document.getElementById("msj2").style.display = "none";
            }, 2000);
            return true;
        }
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    pintar(data)
    cambiar()
})

function cambiar(){
    const radios = document.getElementsByClassName("radio")
    const radioarr = Array.from(radios)
    
    radioarr.forEach((e)=>{
        e.addEventListener('change',()=>{
estado=e.id
document.getElementById('tarjeta').innerHTML = ""
if(estado=="abi") pintar(data)
if(estado=="ter") pintar(terminada)
if(estado=="anu") pintar(anulada)
        })
    })
}

let bd = ""
let id = 0
let id2
let estado = "abi"
let data=[]
let terminada=[]
let anulada=[]



function crear(){
    bd="agregar"
    limpiar()
}

function guardar() {
    if (!validar()) {
        return;
    }
    if (bd == "agregar") {
        let mascota = document.getElementById('mascota').value;
        let propietario = document.getElementById('propietario').value;
        let telefono = document.getElementById('telefono').value;
        let tipo = document.getElementById('tipo').value;
        let imagen = document.querySelector('#tipo option:checked').getAttribute('data-imagen');
        let fecha = document.getElementById('fecha').value;
        let hora = document.getElementById('hora').value;
        let sintomas = document.getElementById('message-text').value;
        id += 1
        if(estado=="abi"){
            data.push({ id, mascota, propietario, telefono, tipo, imagen, fecha, hora, sintomas });
        }else if(estado=="ter"){
            terminada.push({ id, mascota, propietario, telefono, tipo, imagen, fecha, hora, sintomas });
        }else if(estado=="anu"){
            anulada.push({ id, mascota, propietario, telefono, tipo, imagen, fecha, hora, sintomas });
        }
        document.getElementById('tarjeta').innerHTML = ""
        pintar(data)
        limpiar()
    }else{
        data.forEach((e, i) => {
            if (e.id === id2) {
              e.mascota = document.getElementById('mascota').value;
              e.propietario = document.getElementById('propietario').value;
              e.telefono = document.getElementById('telefono').value;
              e.tipo = document.getElementById('tipo').value;
              e.fecha = document.getElementById('fecha').value;
              e.hora = document.getElementById('hora').value;
              e.sintomas = document.getElementById('message-text').value;
            }
            document.getElementById('tarjeta').innerHTML = ""
            pintar(data)
            cerrar()
          });
    }
}

function pintar(datos) {
    datos.forEach((e, i) => {
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.style.width = '18rem';

        let cardImg = document.createElement('img');
        cardImg.classList.add('card-img-top');
        cardImg.src = e.imagen;
        cardImg.alt = 'Imagen de ' + e.tipo;
    
        let cardBodyDiv = document.createElement('div');
        cardBodyDiv.classList.add('card-body');
    
        let cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = e.mascota;
    
        let cardText = document.createElement('p');
        cardText.classList.add('card-text');
        let horafor = convertirhorafor(e.hora);
        cardText.innerHTML = 'Propietario: <strong>' + e.propietario + '</strong><br>Teléfono: <strong>' + e.telefono + '</strong><br>Tipo: <strong>' + e.tipo + '</strong><br>Fechas: <strong>' + e.fecha + '</strong><br>Hora: <strong>' + horafor + '</strong><br>Síntomas: <strong>' + e.sintomas + '</strong>';
        
        let div = document.createElement("div")
        div.setAttribute("class", "botones")

        let editButton = document.createElement('button');
        editButton.classList.add('btn', 'btn-primary');
        editButton.textContent = '✏️';
        editButton.style.backgroundColor = "white";
        
        let selectButton = document.createElement('select');
        selectButton.classList.add('form-select');
        selectButton.addEventListener('change', function(event) {
        let selectedOption = event.target.value;
        console.log('Opción seleccionada:', selectedOption);
        });

   
            let option1 = document.createElement('option');
            option1.value = 'abierta';
            option1.textContent = 'Abierta';
    
            let option2 = document.createElement('option');
            option2.value = 'terminado';
            option2.textContent = 'Terminado';
    
            let option3 = document.createElement('option');
            option3.value = 'anulada';
            option3.textContent = 'Anulada';
        
        

        selectButton.addEventListener("change", ()=>{
            borrar(e, i, selectButton)
        })

        if(datos==data){
            selectButton.appendChild(option1);
            selectButton.appendChild(option2);
            selectButton.appendChild(option3);
        }else if(datos==terminada){
            selectButton.appendChild(option2);
            selectButton.appendChild(option1);
            selectButton.appendChild(option3);
        }else if(datos==anulada){
            selectButton.appendChild(option3);
            selectButton.appendChild(option1);
            selectButton.appendChild(option2);
        }


        editButton.addEventListener('click', function() {
            editar(e);
        });
    
        div.appendChild(editButton)
        div.appendChild(selectButton)
        cardDiv.appendChild(cardImg);
        cardBodyDiv.appendChild(cardTitle);
        cardBodyDiv.appendChild(cardText);
        cardBodyDiv.appendChild(div)
        cardDiv.appendChild(cardBodyDiv);
        document.getElementById('tarjeta').appendChild(cardDiv);
    })

}

function borrar(e, i, tarjeta){
    if(tarjeta.value == "abierta"){
        data.push(e)
        document.getElementById('tarjeta').innerHTML = ""
        
        if(estado=="ter"){
            terminada.splice(i, 1)
pintar(terminada)
        }else if(estado=="anu"){
            anulada.splice(i, 1)
            pintar(anulada)
        }
    }else if(tarjeta.value == "terminado"){
        terminada.push(e)
        document.getElementById('tarjeta').innerHTML = ""
        
        if(estado=="abi"){
            data.splice(i, 1)
            pintar(data)
        }else if(estado=="anu"){
            anulada.splice(i, 1)
            pintar(anulada)
        }
    }
    else if(tarjeta.value == "anulada"){
        anulada.push(e)
        document.getElementById('tarjeta').innerHTML = ""
        
        if(estado=="abi"){
            data.splice(i, 1)
            pintar(data)
        }else if(estado=="ter"){
            terminada.splice(i, 1)
            pintar(terminada)
        }
    }
}

function convertirhorafor(hora24) {
    let hora12 = "";
    let partesHora = hora24.split(":");
    let hora = parseInt(partesHora[0]);
    let min = partesHora[1];

    if (hora === 0) {
        hora12 = "12:" + min + " AM";
    } else if (hora < 12) {
        hora12 = hora + ":" + min + " AM";
    } else if (hora === 12) {
        hora12 = "12:" + min + " PM";
    } else {
        hora12 = (hora - 12) + ":" + min + " PM";
    }

    return hora12;
}

function limpiar() {
    document.getElementById('mascota').value = '';
    document.getElementById('propietario').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('tipo').value = 'Seleccione';
    document.getElementById('fecha').value = '';
    document.getElementById('hora').value = '';
    document.getElementById('message-text').value = '';
}

function editar(cita) {
    bd="editar"
    id2=cita.id
    console.log(cita)
    let mascotaInput = document.getElementById('mascota');
    let propietarioInput = document.getElementById('propietario');
    let telefonoInput = document.getElementById('telefono');
    let tipoInput = document.getElementById('tipo');
    let fechaInput = document.getElementById('fecha');
    let horaInput = document.getElementById('hora');
    let sintomasInput = document.getElementById('message-text');

    mascotaInput.value = cita.mascota;
    propietarioInput.value = cita.propietario;
    telefonoInput.value = cita.telefono;
    tipoInput.value = cita.tipo;
    fechaInput.value = cita.fecha;
    horaInput.value = cita.hora;
    sintomasInput.value = cita.sintomas;

    let modal = document.getElementById('exampleModal');
    let modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.show();

    guardar()

    modal.addEventListener('hidden.bs.modal', function() {
        limpiar();
    });
}

function cerrar() {
    let modal = document.getElementById("exampleModal");
    let bsModal = bootstrap.Modal.getInstance(modal);
    bsModal.hide();
}
