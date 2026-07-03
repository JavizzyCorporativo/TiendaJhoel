const NUMERO_WHATSAPP = "591XXXXXXXX"; // cambia por tu número

function agregarCarrito(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let producto = carrito.find(p => p.nombre === nombre);

    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: Number(precio),
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito");
}

function verCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let contenedor = document.getElementById("lista-carrito");
    let total = 0;

    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>El carrito está vacío</p>";
        return;
    }

    carrito.forEach((p, index) => {
        let subtotal = p.precio * p.cantidad;
        total += subtotal;

        contenedor.innerHTML += `
            <div class="item-carrito">
                <p><strong>${p.nombre}</strong></p>
                <p>Precio: Bs ${p.precio}</p>
                <p>Cantidad: ${p.cantidad}</p>
                <p>Subtotal: Bs ${subtotal}</p>
                <button onclick="eliminarProducto(${index})">Eliminar</button>
                <hr>
            </div>
        `;
    });

    contenedor.innerHTML += `<h3>Total: Bs ${total}</h3>`;
}

function eliminarProducto(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    verCarrito();
}

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    verCarrito();
}

function enviarWhatsApp() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    let mensaje = "Hola, quiero hacer este pedido:%0A%0A";
    let total = 0;

    carrito.forEach(p => {
        let subtotal = p.precio * p.cantidad;
        total += subtotal;

        mensaje += `Producto: ${p.nombre}%0A`;
        mensaje += `Cantidad: ${p.cantidad}%0A`;
        mensaje += `Precio: Bs ${p.precio}%0A`;
        mensaje += `Subtotal: Bs ${subtotal}%0A%0A`;
    });

    mensaje += `TOTAL: Bs ${total}`;

    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${mensaje}`, "_blank");
}