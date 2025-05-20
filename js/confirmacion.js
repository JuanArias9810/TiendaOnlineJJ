document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById('lista-pedido');
  const totalSpan = document.getElementById('total-pedido');
  const ciudadSelect = document.getElementById('ciudad');
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  const ciudades = [
    "Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena",
    "Bucaramanga", "Cúcuta", "Pereira", "Manizales", "Ibagué",
    "Santa Marta", "Villavicencio", "Neiva", "Pasto", "Montería",
    "Armenia", "Tunja", "Sincelejo", "Popayán", "Valledupar"
  ];

  ciudades.forEach(ciudad => {
    const option = document.createElement('option');
    option.value = ciudad;
    option.textContent = ciudad;
    ciudadSelect.appendChild(option);
  });

  let total = 0;
  carrito.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nombre} x ${item.cantidad} - $${(item.precio * item.cantidad).toLocaleString()}`;
    lista.appendChild(li);
    total += item.precio * item.cantidad;
  });

  totalSpan.textContent = total.toLocaleString();

  document.getElementById('form-confirmacion').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("¡Pedido confirmado! Gracias por tu compra.");
    localStorage.removeItem('carrito');
    window.location.href = 'index.html';
  });
});
function confirmarPedido() {
  const nombre = document.getElementById("nombre");
  const direccion = document.getElementById("direccion");
  const ciudad = document.getElementById("ciudad");
  const medioPago = document.getElementById("medioPago");
  const botonConfirmar = document.querySelector('button[type="submit"]');
  const formulario = document.getElementById("form-confirmacion");
  const mensajeGracias = document.getElementById("mensaje-gracias");

  if (!nombre.value || !direccion.value || !ciudad.value || !medioPago.value) {
    alert("Por favor completa todos los campos.");
    return;
  }

  alert(`¡Pedido confirmado!\n\nNúmero de pedido: ${numeroPedido}\nNombre: ${nombre.value}\nDirección: ${direccion.value}\nCiudad: ${ciudad.value}\nMedio de pago: ${medioPago.value}\nTotal: $${total.toLocaleString()}`);

  // Deshabilitar campos y botón para evitar más cambios o envíos
  nombre.disabled = true;
  direccion.disabled = true;
  ciudad.disabled = true;
  medioPago.disabled = true;
  botonConfirmar.disabled = true;

  // Ocultar formulario y mostrar mensaje de gracias
  formulario.style.display = "none";
  mensajeGracias.style.display = "block";
}