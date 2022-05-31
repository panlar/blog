---
title: Copiar texto en el portapapeles con JavaScript
---

# Como copiar texto en el portapeles con JavaScript

![como-copiar-texto-en-el-portapeles-con-javascript](./public/assets/img/copiar-texto-en-el-portapeles-con-javascript-thumbnail.png)

Ha sido muy popular en los ultimos años el poder copiar el texto de un articulo, el link de alguna libreria JS o CSS, un trozo de codigo. Todo esto ha sido gracias a la API de ```Clipboard``` que vino a reemplazar a [```document.execCommand()```](https://developer.mozilla.org/es/docs/Web/API/Document/execCommand).

## Acceder a clipboard

Para acceder ha esta API no debes instanciar un nuevo objeto ```Clipboard``` si no que, solo debes acceder a el objeto ```clipboard``` de ```navigator```.

```js
const clipboard = navigator.clipboard;

// O usando destructuracion

const { clipboard } = navigator;
```

Este objeto tiene 4 metodos y son ```write```, ```writeText```, ```read```, ```readText```, en este ejemplo utilizaremos el metodo ```writeText```, ya que solo crearemos un funcion para copiar texto, pero te dare unos cortos conceptos de ellos.

- ```write```: Escribe en el portapeles imagenes, texto normal o enriquecido (*HTML, texto con imagenes, etcetera*).
- ```read```: Al contrario del anterior, lee del portapapeles el ultimo elemento, ya sea imagen, o texto enriquecido.
- ```writeText```: como te lo estaras imaginando, este metodo solo escribe texto plano en el portapapeles.
- ```readWrite```: y como ya sabras, solo lee el ultimo elemento que sea igual a texto plano.

El objeto ```clipboard``` esta basado en **Promesas**, por lo que si todo sale puedes usar el metodo [```then```](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) o en caso de error el metodo [```catch```](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch), o bien puedes usar un funcion asincrona [```async...await```](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function) utilizando [```try...catch```](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/try%2E%2E%2Ecatch). **Aqui te enseñare a hacer de las dos maneras.**

## copyTextToClipboard

Ahora si empezamos con el codigo e iniciamos crear la funcion ```copyTextToClipboard``` que devolvera el valor recibido para copiar en caso de que todo vaya bien, contrario a esto nos devolvera un error.

**Utilizando ```then``` y ```catch```**

```js
// La funcion recibira tres parametros
// - value: el texto que se copiara
// - successCallback: una funcion que se ejecutara en caso de exito (opcional)
// - errorCallback: otra funcion que se ejecutara en caso de error (opcional)
// Ambas funciones recibiran como parametro el valor que estamos copiando
const copyTextToClipboard = (value, successCallback, errorCallback) => {
  // Utilizando el operador "in" verificamos que exista
  // la propiedad clipboard en el objeto navigator
  if ('clipboard' in navigator) {

    // En caso de que quieras un comportamiento por defecto
    // declararemos estas variables para lanzar una alerta
    // en cada caso, si no existe un o ambos de los ultimos
    // dos parametros.
    const successText = 'Texto copiado al portapeles',
      errorText = 'Ha ocurrido un error al copiar el texto';

    // Devolvemos la promesa que nos devolvera el valor o error
    // dependiendo de si la funcion tuvo exito o no.
    return navigator.clipboard.writeText(value)
      .then(() => {
        // Aqui verificamos si el parametro successCallback existe
        // de no ser asi lanzaremos una alerta por defecto
        successCallback ? successCallback(value) : alert(successText);

        // Como todo ha ido bien devolvemos el valor que hemos recibido
        return value;
      })
      .catch((error) => {
        // Al igual que en el then pero con errorCallback
        errorCallback ? errorCallback(value) : alert(errorText);

        // Al fallar tambien devolvemos el valor pero en el catch
        return value;
      });

  } else {
    // Lanzamos una alerta que indique al usuario que
    // su navegador no tiene soporte para la API clipboard
    alert('Este navegador no tiene soporte para el portapapeles')
  }
}
```

**Utilizando ```try...catch``` y ```async...await```**

```js
// Convertimos a la funcion en asincrona anteponiendo a los
// parentesis la palabra reservada "async"
const copyTextToClipboard = async () => { /* function body */ }

// Ahora reemplazamos el bloque if por lo siguiente
try {
  // Esperamos que la funcion writeText se termine su ejecucion
  await navigator.clipboard.writeText(value);

  successCallback ? successCallback(value) : alert(successText);
  // Aqui podemos retornar el valor ya que estamos
  // dentro de la funcion principal.
  return value;

} catch (error) {
  errorCallback ? errorCallback(value) : alert(errorText);
  // Al igual que con el return de try
  return value;
}
```

Ambos codigos tiene la misma funcionalidad, y tu puedes usar la que mejor te parezca.

### Pero, Como accedemos al valor devuelto por la funcion usando then y catch?

Si estas muy familiarizado con las promesas sabras que para acceder a un valor devuelto por una promesa se tiene que usar ```then``` y ```catch```. Y pues asi se hace aqui mismo, nosotros estamos devolviendo la promesa ```clipboard.writeText()``` que a su vez en ambos metodos devuelven el ```value``` que pasamos como parametro a la funcion ```copyTextToclipboard``` por lo que al ejecutar este metodo, podemos usar ```then``` y ```catch``` para acceder al value.

```js
// copyTextToClipboard nos devuelve la promesa clipboard.writeText()
// por lo que usaremos las funciones then y catch para acceder al valor
// que nos devuelven.
copyTextToClipboard('Texto a copiar!')
  .then((value) => console.log(value)) // Salida : Texto a copiar!
  .catch((value) => console.log(value)) // Salida : Texto a copiar!
  // En ambos casos nos daria el mismo resultado ya que en la funcion
  // en caso de exito o error devolvemos el mismo value.
```

Ahora si, hagamos un ejemplo para ver como va la funcion.

**index.html**

```html
<button>Click me and copy my text!</button>
```

**style.css**
```css
button {
  padding: 1rem 2rem;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 0;
  border: none;
  background-color: black;
  color: white;
  cursor: pointer;
}
```

**main.js** (```then``` y ```catch```)
```js
// Seleccionamos el unico boton de nuestro documento.
const $button = document.querySelector('button');

// Creamos la funcion resetButton para poner el texto por defecto
// que tiene el boton, el cual es devuelto por nuestra funcion
// copyTextToClipboard, esta funcion se ejecutara a los 2 segundos
// de haberse resolvido o rechazado la promesa clipboard.writeText().
const resetButton = (value) => setTimeout(() => $button.textContent = value, 2000);

// La funcion que se ejecutara en caso de que el texto
// haya sido copiado.
const successCopy = () => $button.textContent = 'Copied';

// La funcion que se ejecutara en caso de que el texto
// no se haya podido copiar.
const errorCopy = () =>  $button.textContent = 'An error ocurried';

// Agregamos un oyente de eventos al boton para el evento 'click'
$button.addEventListener('click', () => {
  // Llamamos a nuestra funcion y como value el textContent de
  // nuestro $button, y las funciones que declaramos anteriormente.
  copyTextToClipboard($button.textContent, successCopy, errorCopy)
  // Para el then o catch, siempre volveremos al boton a su estado
  // inicial, y recuerda que en ambos casos nuestra funcion nos devuelve
  // el valor que copiamos, asi que simplemente pasamos como parametro
  // la funcion resetButton en ambos casos.
    .then(resetButton)
    .catch(resetButton)
});
```

**main.js** (```try...catch``` y ```async...await```)
```js
// La funcion callback que recibe nuestro oyentes de eventos
// la convertimos en asincrona con async antes de los parentesis
$button.addEventListener('click', async () => {
  // Declaramos la variable value donde guardaremos el value
  // devuelto por copyTextToClipboard
  let value;
  // Creamos el bloque try...catch
  try {
    // Esperamos que la funcion se ejecute con await y nos devuelva
    // el value y lo guardamos en la variable value
    value = await copyTextToClipboard($button.textContent, successCopy, errorCopy)

    // Si todo ha ido bien ahora podemos llamar a la funcion resetButton
    // y pasar como parametro el value que hemos obtenido anteriormente.
    resetButton(value);
  } catch(error) {
    // Si algo ha fallado pasaremos al catch y tambien ejecutamos
    // la funcion resetButton.
    resetButton(value);
  }
});
```

#### Demo con then y catch

<p class="codepen" data-height="400" data-default-tab="html,result" data-slug-hash="XWZEROm" data-user="paul21dev" style="height: 399px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/paul21dev/pen/XWZEROm">
  Copiar texto en el portapapeles con JavaScript</a> by Johan Paul Barahona (<a href="https://codepen.io/paul21dev">@paul21dev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

#### Demo con try...catch y async...await

<p class="codepen" data-height="400" data-default-tab="html,result" data-slug-hash="ExQErzP" data-user="paul21dev" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/paul21dev/pen/ExQErzP">
  Copiar texto en el portapapeles con JavaScript y Async...Await</a> by Johan Paul Barahona (<a href="https://codepen.io/paul21dev">@paul21dev</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

**Muy bien!** Ahora ya sabes como copiar texto en el portapeles. Espero este post te haya ayudado mucho, y cualquier consulta o duda puedes escribirme a mi [Twitter](https://twitter.com/paul21dev) y con gusto te respondere. Tambien puedes leer alguno de los siguientes articulos.