//Constructores
function Seguro(marca,year,tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}
//Realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function(){

    let cantidad = 0;
    const base = 2000;

    switch(this.marca){
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        
    }

    //Leer el año
    const dif = new Date().getFullYear() - this.year;

    cantidad -= ( dif * 3 * cantidad)/100;

    if(this.tipo ==='basico'){
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }
    return cantidad;
    // console.log(cantidad);

}

function userInterface(){

}
//Llena los Años en el select.
userInterface.prototype.llenarOpciones = () =>{
    const max = new Date().getFullYear(),
        min = max - 21;

    const selectYear = document.querySelector('#year');

    for(let i = max;i > min;i--){   
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}
//Muestra alertas en pantalla
userInterface.prototype.mostrarMensaje = function(mensaje,tipo) {
    const div = document.createElement('DIV');
    if(tipo === 'error'){
        div.classList.add('error');
    }else{
        div.classList.add('correcto');
    }
    div.classList.add('mensaje','mt-10');
    div.textContent = mensaje;

    //Insertar en HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div,document.querySelector('#resultado'));

    setTimeout(()=>{
        div.remove();
    },3000);
}

userInterface.prototype.mostrarResultado = (total,seguro) =>{

    const{marca,year,tipo} = seguro;

    let textoMarca;
    switch(marca){
        case '1':
            textoMarca = 'Americano';
            break;
        case '2':
            textoMarca = 'Asiatico';
            break;
        case '3':
            textoMarca = 'Europeo';
            break;
    }
    //Crear el resultado
    const div = document.createElement('DIV');
    div.classList.add('mt-10');
    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Marca: <span class="font-normal">${textoMarca}</span></p>
        <p class="font-bold">Año: <span class="font-normal">${year}</span></p>
        <p class="font-bold">Tipo: <span class="font-normal capitalize">${tipo}</span></p>
        <p class="font-bold">Total: <span class="font-normal">$${total}</span></p>
    `;
    const resultadoDiv = document.querySelector('#resultado');
    

    //Mostrar Spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display ='block';

    setTimeout(()=>{
        spinner.style.display = 'none';//Se borra el spinner pero se muestra el result
        resultadoDiv.appendChild(div);
    },3000);
}

//Instanciar UI
const ui = new userInterface();
// console.log(ui);

document.addEventListener("DOMContentLoaded",() =>{
    ui.llenarOpciones();//Llena el select al cargar el documento.
})
//------------------------------------------------------------------------------

eventListeners();
function eventListeners(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit',cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();
    

    //Leer la marca Seleccionada
    const marca = document.querySelector('#marca').value;//El value de seleccionar
    //No tiene numero x eso lo da como nulo
    
    //Leer el año seleccionado.
    const año = document.querySelector('#year').value;
    //Leer el tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    //Validacion de todos los campos.
    if(marca === '' || año === '' || tipo === ''){
        ui.mostrarMensaje('Todos los campos son obligatorios','error');
        return;
    }
    ui.mostrarMensaje('Cotizando...','exito');

    //Ocultar las cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if(resultados != null){
        resultados.remove();
    }
    
    //Instanciar el seguro.
    const seguro = new Seguro(marca,año,tipo);
    const total = seguro.cotizarSeguro();
    //Utilizar el prototype que cotiza.
    ui.mostrarResultado(total,seguro);//Recibe 2 Objetos
}