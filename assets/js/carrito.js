let productosGlobales = [];

document.addEventListener("DOMContentLoaded", () => {
    cargarProductosCarrito();
    actualizarContadorCarrito();
});

async function cargarProductosCarrito() {
    try {
        const respuesta = await fetch("assets/data/productos.json");
        productosGlobales = await respuesta.json();
    } catch (error) {
        console.error("No se pudo cargar productos.json", error);
    }
}

function agregarCarritoDesdeJson(idProducto) {
    const producto = productosGlobales.find(p => Number(p.id_producto) === Number(idProducto));

    if (!producto) {
        alert("Producto no encontrado. Espera un segundo y vuelve a intentar.");
        return;
    }

    const input = document.getElementById(`cantidad-${idProducto}`);
    let cantidad = input ? parseInt(input.value) : 1;

    if (isNaN(cantidad) || cantidad < 1) cantidad = 1;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const existe = carrito.find(p => Number(p.id_producto) === Number(idProducto));

    if (existe) {
        existe.cantidad += cantidad;
    } else {
        carrito.push({
            id_producto: producto.id_producto,
            codigo: producto.codigo,
            nombre: producto.nombre,
            categoria: producto.categoria,
            precio: parseFloat(producto.precio_venta),
            imagen: producto.imagen,
            cantidad: cantidad
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();

    alert("Producto agregado al carrito");
}

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = carrito.reduce((suma, p) => suma + Number(p.cantidad), 0);

    const contador = document.getElementById("contador-carrito");

    if (contador) {
        contador.textContent = total;
    }
}