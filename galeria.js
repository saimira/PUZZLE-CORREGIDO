function getImageName(index) {
    return index === 0 ? 'mke' : `mke${index}`;
}
const galleryContainer = document.getElementById('gallery');
const moreLink = document.getElementById('moreLink');
let currentImageIndex = 0;
const imagesPerPage = 10;

function showMoreImages() {
    const startIndex = currentImageIndex;
    const endIndex = currentImageIndex + imagesPerPage;
    for (let i = startIndex; i < endIndex; i++) {
        if (i >= 50) break; 
        const imageName = getImageName(i);
        const imageItem = document.createElement('div');
        imageItem.className = 'image-item';
        const image = document.createElement('img');
        image.src = `imagenes-galeria/${imageName}.jpg`;
        image.alt = imageName;
        imageItem.appendChild(image);
        const puzzleLink = document.createElement('a');
        puzzleLink.href = `puzzle.html?image=imagenes-galeria/${imageName}.jpg`;
        puzzleLink.textContent = 'Resolver rompecabezas';
        imageItem.appendChild(puzzleLink);
        galleryContainer.appendChild(imageItem);
    }
    currentImageIndex += imagesPerPage;

    if (currentImageIndex >= 50) {
        moreLink.style.display = 'none';
    }
}

showMoreImages();

// Añadir el preventDefault aquí
moreLink.addEventListener('click', function(event) {
    event.preventDefault();  
    showMoreImages();
});

const galleryImages = document.querySelectorAll('.image-item img');
galleryImages.forEach(image => {
    image.addEventListener('click', () => {
        const imageName = image.getAttribute('alt');
        window.location.href = `puzzle.html?image=imagenes-galeria/${imageName}.jpg`;
    });
});
