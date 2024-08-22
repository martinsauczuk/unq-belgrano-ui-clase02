let nombre = 'Martin';
let apellido = 'Sauczuk';

let nombresAlumnes = ['Ana', 'Augusto', 'Gonzalo', 'Ramiro', 'Salvador'];


let integrantesDeUnaClase = [ nombresAlumnes, 'Martin', 'Alan' ]

console.log(integrantesDeUnaClase);
// console.log('Estoy dentro del HTML programando en js');

// console.info('Estoy es un mensaje de info');

// alert('Esto es un alerta para indicar algo');
// let nombreIngresado = prompt('Como te llamas');
// alert('Hola ' + nombreIngresado);

// console.log('Hola', nombre);

// darLaBienvenida(nombre);


integrantesDeUnaClase.forEach(
    item => {
        console.log('Voy a llamar a la funcion');
        darLaBienvenida(item);
    }
)

let person = prompt("Please enter your name", "Harry Potter");

if (person != null) {
  document.getElementById("demo").innerHTML =
  "Hello " + person + "! How are you today?";
}