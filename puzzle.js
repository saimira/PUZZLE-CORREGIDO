const names = {
    'mke.jpg': 'Paisaje',
    'mke1.jpg': 'Paisaje',
    'mke2.jpg': 'Paisaje',
    'mke3.jpg': 'Paisaje',
    'mke4.jpg': 'Paisaje',
    'mke5.jpg': 'Paisaje',
    'mke6.jpg': 'Paisaje',
    'mke7.jpg': 'Paisaje',
    'mke8.jpg': 'Paisaje',
    'mke9.jpg': 'Paisaje',
    'mke10.jpg': 'Paisaje',
    'mke11.jpg': 'Paisaje',
    'mke12.jpg': 'Paisaje',
    'mke13.jpg': 'Paisaje',
    'mke14.jpg': 'Paisaje',
    'mke15.jpg': 'Paisaje',
    'mke16.jpg': 'Paisaje',
    'mke17.jpg': 'Paisaje',
    'mke18.jpg': 'Paisaje',
    'mke19.jpg': 'Paisaje',
    'mke20.jpg': 'Paisaje',
    'mke21.jpg': 'Paisaje',
    'mke22.jpg': 'Paisaje',
    'mke23.jpg': 'Paisaje',
    'mke24.jpg': 'Paisaje',
    'mke25.jpg': 'Paisaje',
    'mke26.jpg': 'Paisaje',
    'mke27.jpg': 'Paisaje',
    'mke28.jpg': 'Paisaje',
    'mke29.jpg': 'Paisaje',
    'mke30.jpg': 'Paisaje',
    'mke31.jpg': 'Paisaje',
    'mke32.jpg': 'Paisaje',
    'mke33.jpg': 'Paisaje',
    'mke34.jpg': 'Paisaje',
    'mke35.jpg': 'Paisaje',
    'mke36.jpg': 'Paisaje',
    'mke37.jpg': 'Paisaje',
    'mke38.jpg': 'Paisaje',
    'mke39.jpg': 'Paisaje',
    'mke40.jpg': 'Paisaje',
    'mke41.jpg': 'Paisaje',
    'mke42.jpg': 'Paisaje',
    'mke43.jpg': 'Paisaje',
    'mke44.jpg': 'Paisaje',
    'mke45.jpg': 'Paisaje',
    'mke46.jpg': 'Paisaje',
    'mke47.jpg': 'Paisaje',
    'mke48.jpg': 'Paisaje',
    'mke49.jpg': 'Paisaje',
    'mke50.jpg': 'Paisaje',
};

function getUrlParameter(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const selectedImage = getUrlParameter("image");
const puzzleImage = document.getElementById("puzzle-image");
const imageNameElement = document.getElementById("image-name");

puzzleImage.src = selectedImage;
const fileName = selectedImage.split("/").pop();
const displayName = names[fileName] || fileName.split(".")[0];
imageNameElement.textContent = displayName;

const iniciarBtn = document.getElementById("iniciar-btn");
iniciarBtn.addEventListener("click", () => {
    const difficultyInput = document.getElementById("difficulty");
    const difficulty = difficultyInput.value;
    window.location.href = `puzzle-action.html?difficulty=${difficulty}&image=${selectedImage}`;
});

const difficultyInfo = document.getElementById("difficulty-info");
const difficultyInput = document.getElementById("difficulty");
difficultyInput.addEventListener("input", () => {
    const value = difficultyInput.value;
    const piezas = Math.pow(value, 2);
    difficultyInfo.textContent = `${piezas} piezas`;
});