// fin-juego.js
document.addEventListener("DOMContentLoaded", () => {
    // Obtener el tiempo transcurrido desde localStorage
    const elapsedTime = localStorage.getItem('elapsedTime');

    // Calcular minutos y segundos
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    // Formatear el tiempo en formato MM:SS
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // Mostrar el tiempo en el elemento con el ID "timeDisplay"
    document.getElementById("timeDisplay").textContent = `Tiempo transcurrido: ${formattedTime}`;
});

