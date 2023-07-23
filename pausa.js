document.addEventListener("DOMContentLoaded", () => {
    const pauseButton = document.getElementById("pauseButton");
    const pauseMessageContainer = document.getElementById("pauseMessageContainer");
    let isPaused = false;

    pauseButton.addEventListener("click", () => {
        isPaused = !isPaused;
        if (isPaused) {
            // Mostrar el mensaje de pausa
            const pauseMessage = document.createElement("div");
            pauseMessage.classList.add("pause-message");
            pauseMessage.textContent = "Juego en pausa. Presione 'Reanudar' para continuar.";
            pauseMessageContainer.appendChild(pauseMessage);
            pauseButton.textContent = "Reanudar";
        } else {
            // Ocultar el mensaje de pausa y restablecer el botón "Pausa"
            const pauseMessage = document.querySelector(".pause-message");
            if (pauseMessage) {
                pauseMessage.remove();
            }
            pauseButton.textContent = "Pausa";
        }
    });
});
