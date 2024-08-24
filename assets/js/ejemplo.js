let clicks = 0;

const timeoutHandler = setInterval(() => alert('Dale, apretá algo'), 3000)

function incrmentarVariable() {
  clicks++;
}

function decrmentarVariable() {
  clicks--;
}

function mostrarClicksActuales() {
  document.getElementById('mensaje').innerText = `Contador: ${clicks}`;
}


function incrementar_click() {
  clearInterval(timeoutHandler);
  incrmentarVariable()
  mostrarClicksActuales()
}

function decrementar_click() {
  clearInterval(timeoutHandler);
  decrmentarVariable()
  mostrarClicksActuales()
}
