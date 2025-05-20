let precioUnitario = 0;
let carrito = [];

function mostrarTodosLosProductos(event) {
  const productos = document.querySelectorAll('.product');
  productos.forEach(producto => producto.style.display = 'block');
  if(event) actualizarBotonActivo(event.target);
}

function filtrarProductos(categoria, event) {
  const productos = document.querySelectorAll('.product');
  productos.forEach(producto => {
    // Mostrar solo los que tengan la clase de la categoría
    if (producto.classList.contains(categoria)) {
      producto.style.display = 'block';
    } else {
      producto.style.display = 'none';
    }
  });
  if(event) actualizarBotonActivo(event.target);
}

function actualizarBotonActivo(botonSeleccionado) {
  const botones = document.querySelectorAll('.filter-bar button');
  botones.forEach(boton => boton.classList.remove('active'));
  botonSeleccionado.classList.add('active');
}

function pagarConEpayco() {
  var handler = ePayco.checkout.configure({
    key: "PUBLIC_KEY_AQUI", // Reemplaza con tu clave pública
    test: true
  });

  handler.open({
    name: "Mi Tienda",
    description: "Producto 1",
    invoice: "ORD123456",
    currency: "COP",
    amount: "50000",
    tax_base: "0",
    tax: "0",
    country: "CO",
    lang: "es",
    external: true,
    response: "https://tusitio.com/respuesta",
    method: "PSE"
  });
}

const productos = [
  {
    id: 1,
    nombre: "Camara De Burbujas",
    descripcion: "Un teléfono inteligente con gran cámara.",
    precio: 70000,
    categoria: "tecnologia",
    imagen: "imagenes/CamaraDeBurbujas.jpeg"
  },
  {
    id: 2,
    nombre: "Tableta Dibujo Magic Pad Dinosaurios",
    descripcion: "Un teléfono inteligente con gran cámara.",
    precio: 25000,
    categoria: "tecnologia",
    imagen: "imagenes/Tableta Dibujo Magic Pad Dinosaurios.jpg"
  },
  {
    id: 3,
    nombre: "Parlante De Ducha",
    descripcion: "Un teléfono inteligente con gran cámara.",
    precio: 45000,
    categoria: "tecnologia",
    imagen: "imagenes/Parlante De Ducha.jpeg"
  },
  {
    id: 4,
    nombre: "Astronauta Proyector De Galaxias Led",
    descripcion: "Un teléfono inteligente con gran cámara.",
    precio: 80000,
    categoria: "tecnologia",
    imagen: "imagenes/Astronauta Proyector De Galaxias Led.png"
  },
  {
    id: 5,
    nombre: "Alexa Echo 3",
    descripcion: "Un teléfono inteligente con gran cámara.",
    precio: 180000,
    categoria: "tecnologia",
    imagen: "imagenes/Alexa.jpg"
  },
  {
    id: 6,
    nombre: "bombillo Inteligente",
    descripcion: "Un teléfono inteligente con gran cámara.",
    precio: 50000,
    categoria: "tecnologia",
    imagen: "imagenes/bombilloInteligente.jpg"
  },
  {
    id: 7,
    nombre: "Depilador Facial Bozo Bigote",
    descripcion: "Crema hidratante para el rostro.",
    precio: 60000,
    categoria: "belleza",
    imagen: "imagenes/Depilador Facial Bozo Bigote.jpg"
  },
  {
    id: 8,
    nombre: "Cepillo Secador Keratina",
    descripcion: "Crema hidratante para el rostro.",
    precio: 49900,
    categoria: "belleza",
    imagen: "imagenes/Cepillo Secador Keratina.jpeg"
  },
  {
    id: 9,
    nombre: "Bbl Gummies Con Fenogreco Con Invima",
    descripcion: "Crema hidratante para el rostro.",
    precio: 89000,
    categoria: "belleza",
    imagen: "imagenes/Bbl Gummies Con Fenogreco Con Invima.png"
  },
  {
    id: 10,
    nombre: "Lavadora Automatica De Brochas De Maquil",
    descripcion: "Crema hidratante para el rostro.",
    precio: 35000,
    categoria: "belleza",
    imagen: "imagenes/Lavadora Automatica De Brochas De Maquil.jpg"
  },
  {
    id: 11,
    nombre: "Tarro Organizador Para Granos De Cocina",
    descripcion: "Ideal para batidos y jugos.",
    precio: 50000,
    categoria: "hogar",
    imagen: "imagenes/Tarro Organizador Para Granos De Cocina.jpeg"
  },
  {
    id: 12,
    nombre: "Fuente Dispensadora De Agua Para Mascota",
    descripcion: "Ideal para batidos y jugos.",
    precio: 80000,
    categoria: "hogar",
    imagen: "imagenes/Fuente Dispensadora De Agua Para Mascota.jpg"
  }
];

function cargarProductos() {
  const contenedor = document.querySelector('.product-container');
  contenedor.innerHTML = ''; // Limpia antes de cargar

  productos.forEach(producto => {
    const div = document.createElement('div');
    div.className = `product ${producto.categoria}`; // Clase con categoría para filtrar
    // No uses id para categorías porque debe ser único

    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" />
      <h3>${producto.nombre}</h3>
      <p>${producto.descripcion}</p>
      <p><strong>$${producto.precio.toLocaleString()}</strong></p>
      <button onclick="mostrarDetalle(${producto.id})">Ver más</button>
    `;
    contenedor.appendChild(div);
  });
}

// Llama cargarProductos cuando cargue la página
window.onload = function() {
  cargarProductos();
  mostrarTodosLosProductos(); // para activar botón Inicio al cargar
};

// Aquí puedes agregar la función mostrarDetalle(id) si la tienes para mostrar detalle del producto
function mostrarDetalle(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  document.getElementById('detalle-nombre').textContent = producto.nombre;
  document.getElementById('detalle-descripcion').textContent = producto.descripcion;
  document.getElementById('detalle-precio-total').textContent = producto.precio.toLocaleString();
  document.getElementById('cantidad').value = 1;
  document.getElementById('product-detail').style.display = 'block';

  // Guarda el producto actual en una variable global si quieres usarla en agregarAlCarrito()
  window.productoDetalleActual = producto;
}

function cerrarDetalle() {
  document.getElementById('product-detail').style.display = 'none';
}

function actualizarPrecio() {
  const cantidad = parseInt(document.getElementById('cantidad').value);
  const precio = window.productoDetalleActual ? window.productoDetalleActual.precio : 0;
  document.getElementById('detalle-precio-total').textContent = (precio * cantidad).toLocaleString();
}

function agregarAlCarrito() {
  const cantidad = parseInt(document.getElementById('cantidad').value);
  const idProducto = parseInt(document.getElementById('detalle-nombre').getAttribute('data-id'));

  const producto = productos.find(p => p.id === idProducto);

  if (!producto) {
    alert("Producto no encontrado.");
    return;
  }

  const existente = carrito.find(item => item.id === producto.id);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({
      ...producto,
      cantidad: cantidad
    });
  }

  cerrarDetalle();
  actualizarBotonCarrito();
}
function actualizarBotonCarrito() {
  const btn = document.getElementById('btn-carrito');
  if (carrito.length > 0) {
    btn.style.display = 'block';
  } else {
    btn.style.display = 'none';
  }
}
function mostrarDetalle(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  document.getElementById('detalle-nombre').innerText = producto.nombre;
  document.getElementById('detalle-nombre').setAttribute('data-id', producto.id);
  document.getElementById('detalle-descripcion').innerText = producto.descripcion;

  const cantidad = parseInt(document.getElementById('cantidad').value);
  document.getElementById('detalle-precio-total').innerText = (producto.precio * cantidad).toLocaleString();

  precioUnitario = producto.precio;

  document.getElementById('product-detail').style.display = 'block';
}
function cerrarDetalle() {
  document.getElementById('product-detail').style.display = 'none';
}
function actualizarPrecio() {
  const cantidad = parseInt(document.getElementById('cantidad').value);
  const total = precioUnitario * cantidad;
  document.getElementById('detalle-precio-total').innerText = total.toLocaleString();
}
function mostrarCarrito() {
  const contenedor = document.getElementById('carrito-lista');
  contenedor.innerHTML = '';

  if (carrito.length === 0) {
    contenedor.innerHTML = '<p>Tu carrito está vacío.</p>';
  } else {
    carrito.forEach((item, index) => {
      const div = document.createElement('div');
      div.classList.add('item-carrito');
      div.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <p><strong>${item.nombre}</strong> x ${item.cantidad}</p>
            <p>Precio unitario: $${item.precio.toLocaleString()}</p>
            <p>Total: $${(item.precio * item.cantidad).toLocaleString()}</p>
          </div>
          <button onclick="eliminarDelCarrito(${index})" style="font-size: 20px; background: none; border: none; cursor: pointer;">❌</button>
        </div>
        <hr/>
      `;
      contenedor.appendChild(div);
    });
  }

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  document.getElementById('total-carrito').innerText = total.toLocaleString();

  document.getElementById('carrito-detalle').style.display = 'block';
}

function cerrarCarrito() {
  document.getElementById('carrito-detalle').style.display = 'none';
}
function realizarPago() {
  // Guardar carrito en localStorage para usarlo en la página de confirmación
  localStorage.setItem("carrito", JSON.stringify(carrito));
  // Redirigir a confirmación
  window.location.href = "confirmacion.html";
}
function eliminarDelCarrito(index) {
  carrito.splice(index, 1); // Elimina el producto del carrito
  mostrarCarrito();         // Vuelve a mostrar el carrito actualizado
}
function eliminarDelCarrito(index) {
  const producto = carrito[index];
  const confirmar = confirm(`¿Estás seguro de que deseas eliminar "${producto.nombre}" del carrito?`);
  
  if (confirmar) {
    carrito.splice(index, 1); // Elimina el producto
    mostrarCarrito();         // Actualiza la vista del carrito
  }
}
