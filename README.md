# Proyecto: Sistema De Ventas De Artículos Electrónicos Hero Games

Repositorio para los avances del curso de **Marco de Desarrollo Web**

## Integrantes

- Cabanillas Romero, Erick (U22233099)
- Garay Llaja, Leonardo Luis (U23324618)
- Magariño Raymondi, Kevin Sebastián (U21315770)
- Ortiz Gonzales, Derek Valentin (U22209547)
- Vivanco Mercado, Jose Maria Joel (U23257537)

## Descripción

**Hero Games** será un sistema web para la venta de artículos electrónicos. Permitirá a los clientes consultar productos, gestionar un carrito y realizar compras; además, contará con un panel administrativo para controlar productos, ventas, usuarios y stock.

## Objetivo

Desarrollar una plataforma web responsive que centralice la venta de artículos electrónicos y facilite la administración del catálogo y las operaciones de la tienda.

## Tecnologías

- HTML5
- CSS3
- Bootstrap
- Java
- Spring Boot
- Thymeleaf

## Estado actual

El proyecto se encuentra en el **Avance 1: Diseño e interfaces frontend**. Actualmente se están implementando las vistas y recursos del frontend con HTML5, CSS3 y Bootstrap, dejando las plantillas preparadas para su futura integración con Thymeleaf y Spring Boot.

## Ejecución de las interfaces

Para visualizar las interfaces actuales, abrir el archivo `index.html` en un navegador web.


## Avance 1: Diseño e interfaces frontend
En este primer avance se incluye el diseño y la implementación de las interfaces frontend:
* Documentación inicial del proyecto (Puntos 5.1 al 5.6).
* Interfaces estáticas desarrolladas en **HTML5, CSS3 y Bootstrap**.
* Vistas implementadas: Login, Registro, Página Principal (Home), Contacto y Publicidad.

## Arquitectura

El proyecto se desarrollará como un **monorepo**. El frontend estará integrado dentro de la aplicación **Spring Boot**, con la siguiente distribución:

- **Backend:** Java y Spring Boot.
- **Frontend:** HTML5, CSS3 y Bootstrap.
- **Vistas:** Thymeleaf, dentro de la aplicación Spring Boot.
- **Recursos estáticos:** hojas de estilos, JavaScript e imágenes gestionados por Spring Boot.

## Estructura de carpetas

La estructura objetivo del monorepo será la siguiente:

```text
Proyecto---Marcos-de-desarrollo-web/
├── src/
│   └── main/
│       ├── java/                         # Siguientes avances: backend Spring Boot
│       │   └── com/herogames/
│       │       ├── HeroGamesApplication.java
│       │       ├── controlador/
│       │       ├── servicios/
│       │       ├── repositorio/
│       │       ├── entidad/
│       │       └── dto/
│       └── resources/                    # Avance 1: vistas y recursos del frontend
│           ├── templates/
│           │   ├── index.html             # Landing principal
│           │   ├── login.html             # Inicio de sesión
│           │   ├── registro.html          # Registro de usuarios
│           │   ├── catalogo.html          # Listado, búsqueda y filtros de productos
│           │   ├── producto-detalle.html  # Información de un producto
│           │   ├── carrito.html           # Productos seleccionados para comprar
│           │   ├── checkout.html          # Confirmación y datos del pedido
│           │   ├── pago-resultado.html    # Resultado del proceso de pago
│           │   ├── fragments/             # Componentes Thymeleaf reutilizables
│           │   │   ├── header.html        # Metadatos y recursos comunes
│           │   │   ├── navbar.html        # Barra de navegación
│           │   │   └── footer.html        # Pie de página
│           │   ├── admin/
│           │   │   ├── dashboard.html     # Resumen del panel administrativo
│           │   │   ├── productos.html     # CRUD de productos
│           │   │   ├── ventas.html        # Consulta de ventas totales
│           │   │   ├── usuarios.html      # Consulta de usuarios activos
│           │   │   └── reporte-stock.html  # Reporte y control de stock
│           │   └── error/
│           │       ├── 404.html            # Página para recursos no encontrados
│           │       └── 500.html            # Página para errores internos del servidor
│           ├── static/
│           │   ├── css/                   # Hojas de estilos propias
│           │   ├── js/                    # JavaScript del frontend
│           │   └── img/                   # Imágenes y recursos visuales
│           └── application.properties
├── pom.xml                               # Siguientes avances: configuración Spring Boot
└── README.md
```

### Distribución por avances

- **Avance 1:** diseño e implementación de las interfaces frontend en HTML5, CSS3 y Bootstrap, organizadas en `resources`.
- **Siguientes avances:** integración funcional con Spring Boot y Thymeleaf, controladores, servicios, repositorios, entidades y funcionalidades del sistema.

## Próximos avances

- Integración del frontend con la estructura de Spring Boot.
- Integración de vistas con Thymeleaf.
- Implementación del catálogo y la gestión de productos.
- Implementación del carrito, checkout y flujo de pago.
- Desarrollo del panel administrativo.
- Conexión con la persistencia de datos.

## Requisitos funcionales

| ID | Requisito | Descripción |
|---|---|---|
| RF-01 | Registro de usuarios | El sistema permitirá crear una cuenta de usuario. |
| RF-02 | Inicio de sesión | El sistema permitirá iniciar sesión con las credenciales registradas. |
| RF-03 | Cierre de sesión | El usuario podrá cerrar su sesión de forma segura. |
| RF-04 | Visualización del catálogo | El cliente podrá consultar los productos disponibles. |
| RF-05 | Búsqueda de productos | El cliente podrá buscar productos por su nombre o información relacionada. |
| RF-06 | Filtrado de productos | El cliente podrá filtrar productos según sus categorías. |
| RF-07 | Detalle de producto | El sistema mostrará la información detallada de cada producto. |
| RF-08 | Categoría del producto | Cada producto pertenecerá exclusivamente a una categoría. |
| RF-09 | Recomendación de productos | El sistema recomendará productos relacionados con la categoría consultada. |
| RF-10 | Agregar al carrito | El cliente podrá agregar productos al carrito de compra. |
| RF-11 | Quitar del carrito | El cliente podrá quitar productos del carrito. |
| RF-12 | Actualizar cantidades | El cliente podrá modificar las cantidades de los productos del carrito. |
| RF-13 | Resumen de compra | El sistema mostrará el resumen de productos, cantidades y total. |
| RF-14 | Proceso de pago | El sistema dirigirá al cliente al proceso de pago. |
| RF-15 | Confirmación del pedido | El sistema mostrará el resultado del pago y la confirmación del pedido. |
| RF-16 | Dashboard administrativo | El administrador podrá consultar un resumen de la operación de la tienda. |
| RF-17 | CRUD de productos | El administrador podrá crear, consultar, actualizar y eliminar productos. |
| RF-18 | Consulta de ventas | El administrador podrá consultar las ventas totales. |
| RF-19 | Consulta de usuarios | El administrador podrá consultar los usuarios activos. |
| RF-20 | Reporte de stock | El administrador podrá consultar y controlar el stock de productos. |


## Notas

- Un producto puede tener exclusivamente una categoría.
- Incluir 20 funcionalidades.
- El sistema debe ser responsive.
