const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");
const registrosPorPagina = 10;
let paginaActual;
let totalPaginas;

formulario.addEventListener("submit", validarFormulario);

function validarFormulario(e) {
  e.preventDefault();

  const terminoBusqueda = document.querySelector("#termino").value;

  if (terminoBusqueda === "") {
    mostrarAlerta("Falta el termino de busqueda");
    return;
  }

  buscarImagenes(terminoBusqueda);
}

function mostrarAlerta(mensaje) {
  const existeAlerta = document.querySelector(".alert");

  if (!existeAlerta) {
    const alerta = document.createElement("div");
    alerta.classList.add("alert", "alert-danger");
    alerta.innerHTML = `${mensaje} alert—check!
        `;

    formulario.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function buscarImagenes(termino) {
  const key = "40114053-37be405054cb6ad23fa539460";
  const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=10&page=${paginaActual}`;

  fetch(url).then(respuesta => respuesta.json()).then(resultado => {
    totalItems = resultado.totalHits;
    totalPaginas = calcularPaginas(resultado.totalHits);
    console.log("total de paginas " + totalPaginas);
    mostrarImagenes(resultado.hits);
  });
}


function mostrarImagenes(imagenes) {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
  imagenes.forEach(imagen => {
    const { previewURL, likes, views, largeImageURL } = imagen;

    resultado.innerHTML += `
        <div class="">
            <img class="w-full" src="${previewURL}" >
            <p> Me gusta: ${likes} | Vistas: ${views}
            <br />
            <a href="${largeImageURL}" target="_blank" rel="noopener noreferrer">Ver Imagen</a>
            </p>
        </div>
        `;
  });

}

function calcularPaginas(total) {
  return parseInt(Math.ceil(total / registrosPorPagina));
}

function crearPaginador(total) {
  for (let i = 1; i <= total; i++) {
    console.log(i);
  }
}

function imprimirPaginador() {
  const paginador = crearPaginador(totalPaginas);
  console.log(paginador);
}
