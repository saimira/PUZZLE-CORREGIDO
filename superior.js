document.addEventListener('DOMContentLoaded', function() {
  const originalContainer = document.getElementById('contenedor-superior-general');
  const clonedContainer = originalContainer.cloneNode(true);
  clonedContainer.classList.add('cloned-element');
  clonedContainer.style.display = 'none'; // Agregamos esta línea para ocultar el elemento clonado inicialmente
  document.body.appendChild(clonedContainer);

  let isClonedElementVisible = false;
  const scrollThreshold = 100; // Cantidad de desplazamiento necesaria para mostrar el elemento clonado

  function updateClonedElementVisibility() {
    if (!isClonedElementVisible && window.scrollY >= scrollThreshold) {
      clonedContainer.style.display = 'grid';
      clonedContainer.style.position = 'fixed';
      clonedContainer.style.top = '0';
      clonedContainer.style.left = '0';
      clonedContainer.style.right = '0';
      isClonedElementVisible = true;
    } else if (isClonedElementVisible && window.scrollY < scrollThreshold) {
      clonedContainer.style.display = 'none';
      isClonedElementVisible = false;
    }
  }

  function updateClonedElementSize() {
    const containerWidth = originalContainer.offsetWidth; // Obtener el ancho actual del contenedor original
    clonedContainer.style.width = containerWidth + 'px'; // Aplicar el mismo ancho al elemento clonado
  }

  window.addEventListener('scroll', updateClonedElementVisibility);
  window.addEventListener('resize', updateClonedElementSize);

  // Llamamos a las funciones para asegurarnos de que el elemento clonado esté oculto inicialmente y con el tamaño correcto.
  updateClonedElementVisibility();
  updateClonedElementSize();
});
