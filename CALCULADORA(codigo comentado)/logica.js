//objeto calculadora
var Calculadora = function() {
//atributos del objeto calculadora
  var self = this;
  this._resultado_acumulado = 0;
  this._saveMemory = [];
//metodos del objeto calculadora 
  this._operaciones = {
    sumar: function(valor) {
      self._resultado_acumulado += valor;
      self._resultado();
    },
    restar: function(valor) {
      self._resultado_acumulado -= (valor);
      self._resultado();
    },
    multiplicar: function(valor) {
      self._resultado_acumulado *= valor;
      self._resultado();
    },
    dividir: function(valor) {
      if (valor === 0) {
        document.getElementById("operacion").value = "";
        throw('Error al intentar divir por cero');
      }
      self._resultado_acumulado = self._resultado_acumulado/valor;
      self._resultado();
    },
    dividir2: function(valor){
      if (valor[1] == 0) {
        document.getElementById("operacion").value = "";
        throw('Error al intentar divir por cero');
      }
      else{
        self._resultado_acumulado += valor[0]/valor[1];
        self._resultado();
      }
    }
  };
};
//prototype es una propiedad que contiene un objeto en el que se definen los miembros que se desea que se hereden.
// actúa como un objeto plantilla que hereda métodos y propiedades.
//info --> https://developer.mozilla.org/es/docs/Learn/JavaScript/Objects/Object_prototypes
Calculadora.prototype.calcular = function () {
};
//metodo usar llama al metodo _operaciones dentro de calculadora, pasando como parametro un indice y devuelve un estado nuevo de la instancia de clase.
Calculadora.prototype.usar = function (operacion) {
  this.calcular = this._operaciones[operacion];
  return this;
};
//limpia el resultado acumulado y borra los caracteres escritos en el html.
  Calculadora.prototype.limpiar = function () {
  this._resultado_acumulado = 0;
  // se ubica los elementos con sus respectivos id en el HTML y se les asigna "" (vacio).
  document.getElementById("resultado").value="";
  document.getElementById("operacion").value="";
  this._resultado();
};
//asigna el valor alojado en la propiedad _resultado acumulado al elemento (etiqueta) con id "resultado" en HTML.
Calculadora.prototype._resultado = function () {
  document.getElementById("resultado").value = this._resultado_acumulado;

};
//si el atributo _memoria esta vacio se asigna el valor acumulado, sino asigna el valor contenido en memoria al acumulado y se vacia la memoria. 
Calculadora.prototype.memorizar = function() {
  if (this._memoria === undefined) {
    this._memoria = this._resultado_acumulado;
  } else {
    this._resultado_acumulado = this._memoria;
    this._memoria = undefined;
  };
};

//-----------------------------------------------------------------
//global
  var miCalculadora = new Calculadora();        //instaciacion de un nuevo objeto tipo calculadora.
  var memoria = [];                             //instaciacion de un objeto tipo array.
//---------------------------------------------------------------
  //mi codigo

//funcion flecha. info --> https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/Arrow_functions
  accionSumar=()=>{
    operacion = document.getElementById("operacion").value;//toma los valores del HTML atravez de sus respectivos Id.
    result = document.getElementById("resultado").value;
    if(operacion.indexOf("+")==0){                  //si el signo "+" se encuentra al inicio del string toma los valores que le siguen y se los pasa al metodo usar.calcular
      miCalculadora.usar('sumar').calcular(parseInt(operacion.substring(1,operacion.length)));
      document.getElementById("operacion").value = "";//limpia el contenido del elemento "operacion".
      accionGuardar(result+operacion+"="+eval(result+operacion));//llama a la funcion que guarda dentro del array "memoria" la operacion realizada.
    }
    else if (operacion.lastIndexOf("+")>0){         //ubica si el string de operacion contiene mas de un operador "+"
      lista = operacion.split("+");                 //parte el string en subcadenas que contengan unicamente los nros ingresados y los guarda en una "lista" (array)
      suma = parseInt(lista[0])+parseInt(lista[1]); //suma los valores individuales de la "lista" y los acumula en una unica variable.
      accionGuardar(operacion+"="+suma);
      accionLimpiar();                              //limpia el contenido de resultado

      miCalculadora.usar('sumar').calcular(suma);  //pasa el valor de la suma a la propiedad _resultado_acumulado
      document.getElementById("operacion").value = "";
    }
    else if (operacion.lastIndexOf("-")>0){accionRestar();}       //ubica si el string de operacion contiene algun o mas de un operador "-"
    else if (operacion.lastIndexOf("*")>0){accionMultiplicar();}  //ubica si el string de operacion contiene algun o mas de un operador "*"
    else if (operacion.lastIndexOf("/")>0){accionDividir();}      //ubica si el string de operacion contiene algun o mas de un operador "/"
    else{
      document.getElementById("operacion").value += "+";
    }
  }
//-----------------------------------------------------------------

//repite el proceso aplicado en "accionSumar" pero inicndo con la busqueda del signo "-"
  accionRestar=()=>{
    operacion = document.getElementById("operacion").value;
    result = document.getElementById("resultado").value;

    if(operacion.indexOf("-")==0){
      miCalculadora.usar('restar').calcular(parseInt(operacion.substring(1,operacion.length)));
      document.getElementById("operacion").value = "";
      accionGuardar(result+operacion+"="+eval(result+operacion));
    }
    else if (operacion.lastIndexOf("-")>0){
      lista = operacion.split("-");
      resta = parseInt(lista[0])-parseInt(lista[1]);
      accionGuardar(operacion+"="+resta);
      accionLimpiar();
      miCalculadora.usar('sumar').calcular(parseInt(resta));
      document.getElementById("operacion").value = "";
    }
    else if(operacion.indexOf("+")>=0){accionSumar();}
    else if (operacion.lastIndexOf("*")>0){accionMultiplicar();}
    else if (operacion.lastIndexOf("/")>0){accionDividir();}
    else{
      document.getElementById("operacion").value += "-";
    }
  }
  //-----------------------------------------------------------------

//repite el proceso aplicado en "accionSumar" pero inicndo con la busqueda del signo "*"
  accionMultiplicar = () =>{
    operacion = document.getElementById("operacion").value;
    result = document.getElementById("resultado").value;

    if(operacion.indexOf("*")==0){
      miCalculadora.usar('multiplicar').calcular(parseInt(operacion.substring(1,operacion.length)));
      document.getElementById("operacion").value = "";
      accionGuardar(result+operacion+"="+eval(result+operacion));
    }
    else if(operacion.lastIndexOf("*")>=1){
      lista = operacion.split("*");
      multiplicacion = parseInt(lista[0])*parseInt(lista[1]);
      accionGuardar(operacion+"="+multiplicacion);
      accionLimpiar();
      miCalculadora.usar("multiplicar").calcular(multiplicacion);
      document.getElementById("operacion").value = "";
    }
    else if(operacion.indexOf("+")>=0){accionSumar();}
    else if(operacion.indexOf("-")>=0){accionRestar();}
    else{
      document.getElementById("operacion").value += "*";
    }
  }
//-----------------------------------------------------------------

//repite el proceso aplicado en "accionSumar" pero inicndo con la busqueda del signo "/"
  accionDividir = () =>{
    operacion = document.getElementById("operacion").value;
    result = document.getElementById("resultado").value;

    if(operacion.indexOf("/")==0){
      miCalculadora.usar('dividir').calcular(parseInt(operacion.substring(1,operacion.length)));
      document.getElementById("operacion").value = "";
      accionGuardar(result+operacion+"="+eval(result+operacion));
    }
    else if(operacion.lastIndexOf("/")>=1){
      lista = operacion.split("/");
      division = parseInt(lista[0])/parseInt(lista[1]);
      accionGuardar(operacion+"="+division);
      accionLimpiar();
      miCalculadora.usar("dividir2").calcular(lista);
      document.getElementById("operacion").value = "";
    }
    else if(operacion.indexOf("+")>=0){accionSumar();}
    else if(operacion.indexOf("-")>=0){accionRestar();}
    else if(operacion.indexOf("*")>=0){accionMultiplicar();}
    else{
      document.getElementById("operacion").value += "/";
    }
  }
//-----------------------------------------------------------------
//busca el primer signo operador que exista dentro del string y llama a la funcion correspondiente
  accionIgual = () =>{
    var operacion = document.getElementById("operacion").value;
    if(operacion.indexOf("/")>=0){accionDividir();}
    else if(operacion.indexOf("+")>=0){accionSumar();accionMostrar();}
    else if(operacion.indexOf("-")>=0){accionRestar();accionMostrar();}
    else if(operacion.indexOf("*")>=0){accionMultiplicar();accionMostrar();}
    //accionMostrar();
  }
//-----------------------------------------------------------------
//inserta al final del array "memoria" el valor recibido.
  accionGuardar = (valor) =>{
    memoria.push(valor);
  }
//------------------------------------------------------------------
//muestra el contenido del array "memoria" creando un nuevo elemento en el HTML asignandole un estilo
  accionMostrar = () =>{
    operacion = document.getElementById("operacion").value;
    resultado = document.getElementById("resultado").value;

    contenido = document.createElement("h4"); //crea una nueva etiqueta h4 y se la asigna a la variable contenido
    contenido.style.textAlign = "center";     //alinea el contenido de la etiqueta al centro
    contenido.style.color = "black";          //color del texto
    contenido.innerText= memoria[memoria.length-1]; //asigna el contenido del array al nuevo elemento
    var bloque = document.getElementById("container-history"); //selecciona el elemento al cual se le va a enviar el contenido
    bloque.appendChild(contenido); //agrega el contenido al elemento seleccionado
  }

  accionLimpiar=()=>{miCalculadora.limpiar();}