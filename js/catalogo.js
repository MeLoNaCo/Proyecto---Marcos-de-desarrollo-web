document.addEventListener("DOMContentLoaded", () => {
  const campoBusqueda = document.getElementById("inputBuscar");
  const tarjetas = document.querySelectorAll(".item-tarjeta");
  let productoSeleccionado = null;
  const productos = obtenerProductos();
  const actualizarBusqueda = () => {
    const texto = campoBusqueda.value.toLowerCase().trim();
    tarjetas.forEach((tarjeta) =>
      tarjeta.classList.toggle(
        "d-none",
        !tarjeta
          .querySelector(".titulo-prod")
          .textContent.toLowerCase()
          .includes(texto),
      ),
    );
  };
  campoBusqueda?.addEventListener("input", actualizarBusqueda);
  document
    .querySelectorAll(".item-tarjeta button[data-bs-target]")
    .forEach((boton, indice) =>
      boton.addEventListener("click", () => {
        const titulo = boton
          .closest(".item-tarjeta")
          .querySelector(".titulo-prod").textContent;
        productoSeleccionado =
          productos.find((producto) => producto.nombre === titulo) ||
          productos[indice];
      }),
    );
  const botonAgregar = document.querySelector("#modalDetalle a.btn-success");
  botonAgregar?.addEventListener("click", (evento) => {
    evento.preventDefault();
    if (productoSeleccionado && agregarAlCarrito(productoSeleccionado.id)) {
      botonAgregar.textContent = "Agregado al carrito";
      botonAgregar.href = "carrito.html";
    }
  });
  actualizarBusqueda();
});
