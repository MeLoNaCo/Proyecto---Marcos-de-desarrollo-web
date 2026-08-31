const claveUsuarios = "hg_users";
const claveCategorias = "hg_categories";
const claveProductos = "hg_products";
const clavePedidos = "hg_orders";
const claveSesion = "hg_session";

const productosIniciales = [
  {
    id: 1,
    nombre: "Laptop Gamer RTX",
    descripcion: "Intel Core i7, 16 GB de RAM y SSD de 1 TB.",
    precio: 1199.99,
    categoria: "Laptops",
    stock: 8,
    imagen: "../img/GG.PNG",
  },
  {
    id: 2,
    nombre: "Laptop Creator Pro",
    descripcion: "Pantalla Full HD, 16 GB de RAM y SSD de 512 GB.",
    precio: 999.99,
    categoria: "Laptops",
    stock: 6,
    imagen: "../img/Herogameslogo.png",
  },
  {
    id: 3,
    nombre: "Laptop Ultra 14",
    descripcion: "Equipo ligero con procesador de alto rendimiento.",
    precio: 849.99,
    categoria: "Laptops",
    stock: 10,
    imagen: "../img/GG.PNG",
  },
  {
    id: 4,
    nombre: "Mouse Gamer RGB",
    descripcion: "Sensor óptico de 12 000 DPI y seis botones.",
    precio: 39.99,
    categoria: "Periféricos",
    stock: 25,
    imagen: "../img/GG.PNG",
  },
  {
    id: 5,
    nombre: "Teclado Mecánico",
    descripcion: "Teclado RGB con switches mecánicos y pad numérico.",
    precio: 79.99,
    categoria: "Periféricos",
    stock: 18,
    imagen: "../img/EsportsBanner.jpg",
  },
  {
    id: 6,
    nombre: "Audífonos 7.1",
    descripcion: "Audio envolvente, micrófono y conexión USB.",
    precio: 59.99,
    categoria: "Periféricos",
    stock: 14,
    imagen: "../img/GG.PNG",
  },
  {
    id: 7,
    nombre: "Monitor Gamer 144 Hz",
    descripcion: "Panel IPS Full HD con respuesta de 1 ms.",
    precio: 249.99,
    categoria: "Monitores",
    stock: 12,
    imagen: "../img/descuentosbanner.jpg",
  },
  {
    id: 8,
    nombre: "Monitor UltraWide",
    descripcion: "Pantalla de 34 pulgadas para trabajo y gaming.",
    precio: 449.99,
    categoria: "Monitores",
    stock: 5,
    imagen: "../img/AlianzaComerial.jpg",
  },
  {
    id: 9,
    nombre: "Monitor 4K Profesional",
    descripcion: "Resolución 4K, HDR y colores precisos.",
    precio: 529.99,
    categoria: "Monitores",
    stock: 7,
    imagen: "../img/descuentosbanner.jpg",
  },
  {
    id: 10,
    nombre: "Tarjeta Gráfica RTX",
    descripcion: "Gráficos de última generación para gaming.",
    precio: 699.99,
    categoria: "Componentes",
    stock: 4,
    imagen: "../img/GG.PNG",
  },
  {
    id: 11,
    nombre: "Memoria RAM 32 GB",
    descripcion: "Kit DDR5 de alto rendimiento.",
    precio: 129.99,
    categoria: "Componentes",
    stock: 20,
    imagen: "../img/EsportsBanner.jpg",
  },
  {
    id: 12,
    nombre: "SSD NVMe 1 TB",
    descripcion: "Almacenamiento rápido para juegos y aplicaciones.",
    precio: 89.99,
    categoria: "Componentes",
    stock: 22,
    imagen: "../img/GG.PNG",
  },
];

function leerDatos(clave, valorInicial) {
  const valor = localStorage.getItem(clave);
  if (!valor) {
    localStorage.setItem(clave, JSON.stringify(valorInicial));
    return valorInicial;
  }
  try {
    return JSON.parse(valor);
  } catch {
    return valorInicial;
  }
}
function guardarDatos(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}
function inicializarDatos() {
  leerDatos(claveUsuarios, [
    {
      correo: "richardAdmin@gmail.com",
      contrasena: "richard@123",
      nombre: "Richard",
      rol: "admin",
      activo: true,
    },
    {
      correo: "joel@gmail.com",
      contrasena: "joel@123",
      nombre: "Joel",
      rol: "cliente",
      activo: true,
    },
  ]);
  leerDatos(claveCategorias, [
    "Laptops",
    "Periféricos",
    "Monitores",
    "Componentes",
  ]);
  leerDatos(claveProductos, productosIniciales);
  leerDatos(clavePedidos, []);
}
function obtenerProductos() {
  return leerDatos(claveProductos, productosIniciales);
}
function obtenerCategorias() {
  return leerDatos(claveCategorias, []);
}
function obtenerSesion() {
  return JSON.parse(localStorage.getItem(claveSesion) || "null");
}
function establecerSesion(usuario) {
  guardarDatos(claveSesion, usuario);
}
function cerrarSesion() {
  localStorage.removeItem(claveSesion);
}
function claveCarrito() {
  const sesion = obtenerSesion();
  return `hg_cart_${sesion ? sesion.correo : "guest"}`;
}
function obtenerCarrito() {
  const carrito = leerDatos(claveCarrito(), []);
  const idsDisponibles = new Set(
    obtenerProductos().map((producto) => producto.id),
  );
  const carritoValido = carrito.filter(
    (item) => idsDisponibles.has(Number(item.id)) && Number(item.cantidad) > 0,
  );
  if (carritoValido.length !== carrito.length)
    guardarDatos(claveCarrito(), carritoValido);
  return carritoValido;
}
function guardarCarrito(carrito) {
  guardarDatos(claveCarrito(), carrito);
}
function formatoMoneda(valor) {
  return `S/ ${Number(valor).toFixed(2)}`;
}
function mostrarAviso(texto, tipo = "info") {
  const aviso = document.getElementById("avisoAplicacion");
  if (!aviso) return;
  aviso.className = `alert alert-${tipo} mt-3`;
  aviso.textContent = texto;
  aviso.classList.remove("d-none");
}

function rutaInicioSesion() {
  return window.location.pathname.includes("/html/")
    ? "login.html"
    : "html/login.html";
}

function rutaImagen(ruta) {
  return window.location.pathname.includes("/html/")
    ? ruta
    : ruta.replace(/^\.\.\//, "");
}

function agregarAlCarrito(id, cantidad = 1) {
  if (!obtenerSesion()) {
    window.location.href = rutaInicioSesion();
    return false;
  }
  const producto = obtenerProductos().find((item) => item.id === Number(id));
  if (!producto || producto.stock < 1) return false;
  const carrito = obtenerCarrito();
  const existente = carrito.find((item) => item.id === producto.id);
  if (existente)
    existente.cantidad = Math.min(
      existente.cantidad + cantidad,
      producto.stock,
    );
  else
    carrito.push({
      id: producto.id,
      cantidad: Math.min(cantidad, producto.stock),
    });
  guardarCarrito(carrito);
  return true;
}
function quitarDelCarrito(id) {
  guardarCarrito(obtenerCarrito().filter((item) => item.id !== Number(id)));
}
function actualizarCantidad(id, cantidad) {
  const producto = obtenerProductos().find((item) => item.id === Number(id));
  const carrito = obtenerCarrito();
  const item = carrito.find((elemento) => elemento.id === Number(id));
  if (!item || !producto) return;
  item.cantidad = Math.max(0, Math.min(Number(cantidad), producto.stock));
  guardarCarrito(
    item.cantidad
      ? carrito
      : carrito.filter((elemento) => elemento.id !== Number(id)),
  );
}

function inicializarLogin() {
  const formulario = document.getElementById("formularioLogin");
  const correo = document.getElementById("correo");
  const contrasena = document.getElementById("contrasena");
  if (!formulario) return;
  document.querySelectorAll("[data-demo]").forEach((boton) =>
    boton.addEventListener("click", () => {
      const demo =
        boton.dataset.demo === "admin"
          ? ["richardAdmin@gmail.com", "richard@123"]
          : ["joel@gmail.com", "joel@123"];
      correo.value = demo[0];
      contrasena.value = demo[1];
    }),
  );
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    if (items.some((item) => item.cantidad > item.stock)) {
      mostrarAviso(
        "Uno de los productos ya no tiene stock suficiente.",
        "danger",
      );
      return;
    }
    const usuario = leerDatos(claveUsuarios, []).find(
      (item) =>
        item.correo === correo.value.trim() &&
        item.contrasena === contrasena.value,
    );
    if (!usuario)
      return mostrarAviso("Correo o contraseña incorrectos.", "danger");
    establecerSesion({
      correo: usuario.correo,
      nombre: usuario.nombre,
      rol: usuario.rol,
    });
    window.location.href =
      usuario.rol === "admin" ? "admin/dashboard.html" : "catalogo.html";
  });
}

function ajustarAccesoCarrito() {
  if (obtenerSesion()) return;
  document
    .querySelectorAll('a[href$="carrito.html"], a[href$="/carrito.html"]')
    .forEach((enlace) => {
      enlace.remove();
    });
}

function renderizarOfertasInicio() {
  const contenedor = document.querySelector(".contenedor-scroll");
  if (!contenedor) return;
  contenedor.innerHTML = obtenerProductos()
    .slice(0, 6)
    .map(
      (
        producto,
      ) => `<article class="card bg-dark text-light border-secondary flex-shrink-0" style="width: 16rem">
        <img src="${rutaImagen(producto.imagen)}" class="card-img-top object-fit-cover" style="height: 150px" alt="${producto.nombre}" />
        <div class="card-body d-flex flex-column"><span class="badge bg-secondary align-self-start mb-2">${producto.categoria}</span><h3 class="h6 card-title text-info">${producto.nombre}</h3><span class="fw-bold text-success mt-auto">${formatoMoneda(producto.precio)}</span><div class="d-flex gap-2 mt-2"><a href="html/producto-detalle.html?id=${producto.id}" class="btn btn-sm btn-outline-info">Ver detalle</a><button class="btn btn-sm btn-primary" data-agregar="${producto.id}">Agregar</button></div></div>
      </article>`,
    )
    .join("");
  prepararBotonesCarrito();
}

function tarjetasDeProductos(lista) {
  return lista
    .map(
      (producto) =>
        `<article class="col"><div class="card card-producto h-100 bg-dark text-light border-secondary"><img src="${rutaImagen(producto.imagen)}" class="card-img-top card-img-producto" alt="${producto.nombre}"><div class="card-body d-flex flex-column"><span class="badge bg-secondary mb-2 align-self-start">${producto.categoria}</span><h2 class="h5 text-info">${producto.nombre}</h2><p class="card-text text-secondary">${producto.descripcion}</p><div class="mt-auto d-flex justify-content-between align-items-center"><strong class="text-success">${formatoMoneda(producto.precio)}</strong><button class="btn btn-sm btn-primary" data-agregar="${producto.id}">Agregar</button></div></div></div></article>`,
    )
    .join("");
}
function prepararBotonesCarrito() {
  document.querySelectorAll("[data-agregar]").forEach((boton) =>
    boton.addEventListener("click", () => {
      if (agregarAlCarrito(boton.dataset.agregar))
        mostrarAviso("Producto agregado al carrito.", "success");
    }),
  );
}
function productoDesdeUrl() {
  return obtenerProductos().find(
    (producto) =>
      producto.id ===
      Number(new URLSearchParams(window.location.search).get("id")),
  );
}
function renderizarDetalle() {
  const contenedor = document.getElementById("detalleProducto");
  const producto = productoDesdeUrl();
  if (!contenedor) return;
  if (!producto)
    return (contenedor.innerHTML = `<div class="alert alert-warning">Producto no encontrado.</div>`);
  const recomendados = obtenerProductos()
    .filter(
      (item) =>
        item.categoria === producto.categoria && item.id !== producto.id,
    )
    .slice(0, 3);
  contenedor.innerHTML = `<div class="row g-4 align-items-center"><div class="col-md-6"><img src="${producto.imagen}" class="img-fluid rounded" alt="${producto.nombre}"></div><div class="col-md-6"><span class="badge bg-info text-dark">${producto.categoria}</span><h1 class="text-info mt-3">${producto.nombre}</h1><p>${producto.descripcion}</p><p class="fs-2 text-success fw-bold">${formatoMoneda(producto.precio)}</p><p>Stock disponible: ${producto.stock}</p><button class="btn btn-primary" data-agregar="${producto.id}">Agregar al carrito</button></div></div><h2 class="h4 mt-5">También te puede interesar</h2><div class="row row-cols-1 row-cols-md-3 g-4">${tarjetasDeProductos(recomendados)}</div>`;
  prepararBotonesCarrito();
}
function renderizarCarrito() {
  const lista = document.getElementById("listaCarrito");
  const total = document.getElementById("totalCarrito");
  if (!lista || !total) return;
  if (!obtenerSesion()) {
    lista.innerHTML = `<div class="alert alert-warning">Inicia sesión para consultar tu carrito.</div><a class="btn btn-primary" href="${rutaInicioSesion()}">Iniciar sesión</a>`;
    total.textContent = formatoMoneda(0);
    return;
  }
  const productos = obtenerProductos();
  const carrito = obtenerCarrito();
  if (!carrito.length) {
    lista.innerHTML = `<div class="alert alert-secondary">Tu carrito está vacío.</div>`;
    total.textContent = formatoMoneda(0);
    return;
  }
  let suma = 0;
  lista.innerHTML = carrito
    .map((item) => {
      const producto = productos.find((elemento) => elemento.id === item.id);
      const subtotal = producto.precio * item.cantidad;
      suma += subtotal;
      return `<div class="card bg-dark border-secondary mb-3"><div class="card-body d-flex flex-wrap gap-3 align-items-center"><img src="${producto.imagen}" alt="${producto.nombre}" width="90" height="70" class="object-fit-cover rounded"><div class="flex-grow-1"><h2 class="h5 text-info">${producto.nombre}</h2><span>${formatoMoneda(producto.precio)} · Stock ${producto.stock}</span></div><input class="form-control" style="max-width:90px" type="number" min="1" max="${producto.stock}" value="${item.cantidad}" data-cantidad="${producto.id}"><strong>${formatoMoneda(subtotal)}</strong><button class="btn btn-outline-danger" data-quitar="${producto.id}">Quitar</button></div></div>`;
    })
    .join("");
  total.textContent = formatoMoneda(suma);
  lista.querySelectorAll("[data-cantidad]").forEach((input) =>
    input.addEventListener("change", () => {
      actualizarCantidad(input.dataset.cantidad, input.value);
      renderizarCarrito();
    }),
  );
  lista.querySelectorAll("[data-quitar]").forEach((boton) =>
    boton.addEventListener("click", () => {
      quitarDelCarrito(boton.dataset.quitar);
      renderizarCarrito();
    }),
  );
}
function obtenerResumenCarrito() {
  return obtenerCarrito().map((item) => {
    const producto = obtenerProductos().find(
      (elemento) => elemento.id === item.id,
    );
    return {
      ...producto,
      cantidad: item.cantidad,
      subtotal: producto.precio * item.cantidad,
    };
  });
}
function inicializarCheckout() {
  const formulario = document.getElementById("formularioCheckout");
  const resumen = document.getElementById("resumenCheckout");
  const items = obtenerResumenCarrito();
  if (!formulario || !resumen) return;
  if (!obtenerSesion()) {
    resumen.innerHTML = `<div class="alert alert-warning">Inicia sesión para finalizar tu compra.</div><a class="btn btn-primary" href="${rutaInicioSesion()}">Iniciar sesión</a>`;
    formulario.querySelector("button[type=submit]").disabled = true;
    return;
  }
  if (!items.length) {
    resumen.innerHTML = `<div class="alert alert-warning">Agrega productos antes de continuar.</div>`;
    formulario.querySelector("button[type=submit]").disabled = true;
    return;
  }
  resumen.innerHTML = items
    .map(
      (item) =>
        `<div class="d-flex justify-content-between"><span>${item.nombre} × ${item.cantidad}</span><strong>${formatoMoneda(item.subtotal)}</strong></div>`,
    )
    .join("");
  const total = items.reduce((suma, item) => suma + item.subtotal, 0);
  document.getElementById("totalCheckout").textContent = formatoMoneda(total);
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const pedido = {
      id: `HG-${Date.now()}`,
      fecha: new Date().toISOString(),
      cliente: document.getElementById("nombreCliente").value,
      correo: document.getElementById("correoCliente").value,
      items,
      total,
      estado: "pagado",
    };
    const pedidos = leerDatos(clavePedidos, []);
    pedidos.push(pedido);
    guardarDatos(clavePedidos, pedidos);
    const productos = obtenerProductos();
    items.forEach((item) => {
      const producto = productos.find((elemento) => elemento.id === item.id);
      producto.stock -= item.cantidad;
    });
    guardarDatos(claveProductos, productos);
    guardarCarrito([]);
    guardarDatos("hg_last_order", pedido);
    window.location.href = `pago-resultado.html?id=${pedido.id}`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarDatos();
  inicializarLogin();
  ajustarAccesoCarrito();
  renderizarOfertasInicio();
  renderizarDetalle();
  renderizarCarrito();
  inicializarCheckout();
});

function inicializarAdministracionProductos() {
  const tabla = document.getElementById("tablaProductos");
  const formulario = document.getElementById("formularioProducto");
  if (!tabla || !formulario) return;
  const categoria = document.getElementById("productoCategoria");
  categoria.innerHTML = obtenerCategorias()
    .map((item) => `<option value="${item}">${item}</option>`)
    .join("");
  const renderizar = () => {
    tabla.innerHTML = obtenerProductos()
      .map(
        (producto) =>
          `<tr><td>${producto.nombre}</td><td>${producto.categoria}</td><td>${formatoMoneda(producto.precio)}</td><td>${producto.stock}</td><td><button class="btn btn-sm btn-outline-info" data-editar="${producto.id}">Editar</button> <button class="btn btn-sm btn-outline-danger" data-eliminar="${producto.id}">Eliminar</button></td></tr>`,
      )
      .join("");
    tabla.querySelectorAll("[data-editar]").forEach((boton) =>
      boton.addEventListener("click", () => {
        const producto = obtenerProductos().find(
          (item) => item.id === Number(boton.dataset.editar),
        );
        document.getElementById("productoId").value = producto.id;
        document.getElementById("productoNombre").value = producto.nombre;
        document.getElementById("productoDescripcion").value =
          producto.descripcion;
        document.getElementById("productoPrecio").value = producto.precio;
        categoria.value = producto.categoria;
        document.getElementById("productoStock").value = producto.stock;
      }),
    );
    tabla.querySelectorAll("[data-eliminar]").forEach((boton) =>
      boton.addEventListener("click", () => {
        guardarDatos(
          claveProductos,
          obtenerProductos().filter(
            (item) => item.id !== Number(boton.dataset.eliminar),
          ),
        );
        renderizar();
      }),
    );
  };
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const productos = obtenerProductos();
    const id = Number(document.getElementById("productoId").value);
    const producto = {
      id: id || Math.max(0, ...productos.map((item) => item.id)) + 1,
      nombre: document.getElementById("productoNombre").value,
      descripcion: document.getElementById("productoDescripcion").value,
      precio: Number(document.getElementById("productoPrecio").value),
      categoria: categoria.value,
      stock: Number(document.getElementById("productoStock").value),
      imagen: "../../img/GG.PNG",
    };
    const posicion = productos.findIndex((item) => item.id === id);
    if (posicion >= 0)
      productos[posicion] = { ...productos[posicion], ...producto };
    else productos.push(producto);
    guardarDatos(claveProductos, productos);
    formulario.reset();
    document.getElementById("productoId").value = "";
    renderizar();
  });
  document.getElementById("cancelarEdicion")?.addEventListener("click", () => {
    formulario.reset();
    document.getElementById("productoId").value = "";
  });
  renderizar();
}

document.addEventListener(
  "DOMContentLoaded",
  inicializarAdministracionProductos,
);
