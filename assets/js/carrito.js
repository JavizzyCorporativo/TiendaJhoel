let productosGlobales = [];

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const respuesta = await fetch("assets/data/productos.json");
        productosGlobales = await respuesta.json();
        actualizarContadorCarrito();
    } catch (error) {
        console.error("Error cargando productos para carrito:", error);
    }
});

function agregarCarritoDesdeJson(idProducto) {
    const producto = productosGlobales.find(p => Number(p.id_producto) === Number(idProducto));

    if (!producto) {
        alert("Producto no encontrado");
        return;
    }

    const inputCantidad = document.getElementById(`cantidad-${idProducto}`);
    let cantidad = parseInt(inputCantidad.value);

    if (isNaN(cantidad) || cantidad < 1) {
        cantidad = 1;
    }

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoExistente = carrito.find(p => Number(p.id_producto) === Number(idProducto));

    if (productoExistente) {
        productoExistente.cantidad += cantidad;
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
    const totalCantidad = carrito.reduce((total, p) => total + p.cantidad, 0);

    const contador = document.getElementById("contador-carrito");

    if (contador) {
        contador.textContent = totalCantidad;
    }
}