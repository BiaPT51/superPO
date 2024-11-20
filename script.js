// script.js
//index.html - right number
function checkSecretNumber() {
    var enteredNumber = document.getElementById('secretWord').value;

    // Substituir por 106
    if (enteredNumber === '106') {
        // Substituir 'secondpage.html' 
        window.location.replace('secondpage.html');
    } else {
        alert('Nops:( Tenta novamente.');
    }
}

//function otherSecretNumber()
function otherSecretNumber() {
    var otherEnteredNumber = document.getElementById('secretNumber').value;

    if(otherEnteredNumber === '') {
        window.location.replace('');
    } else{
        alert('tenta outra vez');
    }
}

//second page - grid left photo touchable text right
function openModal(imageSrc, captionText) {
    var modal = document.getElementById('myModal');
    var modalImage = document.getElementById('modalImage');
    var caption = document.getElementById('caption');

    modal.style.display = 'block';
    modalImage.src = imageSrc;
    caption.innerHTML = captionText;
}

function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

// Close the modal if the user clicks outside of it
window.onclick = function(event) {
    var modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

//photos clickable and expand and have a title and a discription
document.addEventListener("DOMContentLoaded", async function() {
    // Chama a função para carregar as fotos do servidor
    await loadPhotos();
});

async function loadPhotos() {
    const gallery = document.getElementById("photoGallery");

    // Adiciona um evento de clique a cada imagem na galeria
    gallery.querySelectorAll('img').forEach((img, index) => {
        img.addEventListener("click", () => openImage(img, index + 1));
    });
}

function openImage(clickedImage) {
    // Create modal for full-screen image view
    const modal = document.createElement("div");
    modal.classList.add("modal");

    const content = document.createElement("div");
    content.classList.add("modal-content");

    const fullImage = document.createElement("img");
    fullImage.src = clickedImage.src;  // Use the clicked image's source
    fullImage.alt = clickedImage.alt;  // Retain alt text for accessibility, but do not display it

    // Add elements to the modal
    content.appendChild(fullImage);
    modal.appendChild(content);

    // Add the modal to the body
    document.body.appendChild(modal);

    // Close the modal when clicking outside the image
    modal.addEventListener("click", () => {
        modal.remove();
    });
}

// Hover to change image
var originalImageSrcs = {};  // Object to store the original paths of images
const baseUrl = "https://d1gx0r8q6ylncm.cloudfront.net/"; // Base URL for S3 bucket

function setupImageHover(elementId, newImageRelativePath) {
    const imageElement = document.getElementById(elementId);
    if (!imageElement) {
        console.error(`Element with ID ${elementId} not found.`);
        return;
    }

    // Store the original image source on the first hover
    if (!originalImageSrcs[elementId]) {
        originalImageSrcs[elementId] = imageElement.src;
    }

    // Event Listener for mouseover (hover)
    imageElement.addEventListener('mouseover', function () {
        // Set the new image path using the S3 base URL combined with the provided relative path
        imageElement.src = `${baseUrl}${newImageRelativePath}`;
    });

    // Event Listener for mouseout (restore original image)
    imageElement.addEventListener('mouseout', function () {
        // Restore the original image when the mouse leaves the image area
        imageElement.src = originalImageSrcs[elementId];
    });
}

// Example usage for multiple images
setupImageHover('hoverImage1', 'costa1_1a.png');
setupImageHover('hoverImage2', 'lousa1_1.png');
setupImageHover('hoverImage3', 'marvao1_1.png');
setupImageHover('hoverImage4', 'serrai1_1.png');
setupImageHover('hoverImage5', 'serrav1_1.png');
setupImageHover('hoverImage6', 'costa1_1a.png');
setupImageHover('hoverImage7', 'porto1_1.png');
setupImageHover('hoverImage8', 'ourosm1_1.png');

//gerar a galeria ssem ter de pôr todas as coisinhas

function generateGallery(galleryId, count, folderName) {
    const gallery = document.getElementById(galleryId);
    const baseUrl = "https://d1gx0r8q6ylncm.cloudfront.net/"; // Base URL for the S3 bucket
    
    if (!gallery) {
        console.error(`Gallery container with ID '${galleryId}' not found`);
        return;
    }

    for (let i = 1; i <= count; i++) {
        const img = document.createElement('img');

        // Construct the full S3 URLs for JPG and JPEG formats
        const jpgPath = `${baseUrl}${folderName}+(${i}).jpg`;
        const jpegPath = `${baseUrl}${folderName}+(${i}).jpeg`;

        const tempImg = new Image();

        // Set an event listener to set the correct image path once it successfully loads
        tempImg.onload = function() {
            img.src = this.src;  // Use whichever image loads successfully (JPG or JPEG)
        };

        // Set the onerror handler to attempt to load the JPEG version if the JPG fails
        tempImg.onerror = function() {
            if (this.src === jpgPath) {
                // Attempt to load the JPEG version only if JPG fails
                tempImg.src = jpegPath;
            } else {
                console.error(`Both JPG and JPEG versions failed to load for ${folderName} (${i})`);
            }
        };

        // Initially try to load the JPG image
        tempImg.src = jpgPath;

        img.alt = `${folderName} (${i})`;  // Set alt text for each image

        // Add click event to open modal with full image view
        img.addEventListener("click", () => openImage(img));

        gallery.appendChild(img);
    }
}

//map.html
// Initialize the map and set the view to Portugal's coordinates
const map = L.map('map').setView([39.3999, -8.2245], 7); // Latitude and Longitude for Portugal, zoom level 7

// Add OpenStreetMap tiles (ensure HTTPS is used)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18 // Maximum zoom level allowed
}).addTo(map);

// List of locations and associated memories for the Costa Vicentina route
const locations = [
    { name: "Cabo de São Vicente", coords: [37.0206, -8.9876], memory: "The stunning cliffs of Cabo de São Vicente 🏞️", url: "costa-vicentina.html" },
    { name: "Carrapateira", coords: [37.1391, -8.8724], memory: "The beautiful beaches and surfing at Carrapateira 🌊🏄‍♂️", url: "carrapateira.html" },
    { name: "Zambujeira do Mar", coords: [37.5378, -8.8014], memory: "Sunset at Zambujeira do Mar, unforgettable moments 🌅", url: "zambujeira.html" },
    { name: "Aljezur", coords: [37.3135, -8.8063], memory: "Charming town of Aljezur, full of history 🏰", url: "aljezur.html" },
    { name: "Odeceixe", coords: [37.3674, -8.7875], memory: "Odeceixe River meeting the Atlantic Ocean 🌊", url: "odeceixe.html" }
];

// Function to add markers with popups to the map and redirect to specific pages
locations.forEach(location => {
    L.marker(location.coords) // Use the coordinates provided for each location
        .addTo(map) // Add the marker to the map
        .bindPopup(`<b>${location.name}</b><br>${location.memory}`) // Add a popup with the memory
        .on('click', function () {
            window.location.href = location.url; // Redirect to the URL of the trip or location
        });
});

// Coordinates for the Costa Vicentina path (approximate locations of major points)
const costaVicentinaCoordinates = [
    [37.0206, -8.9876], // Cabo de São Vicente
    [37.1391, -8.8724], // Carrapateira
    [37.5378, -8.8014], // Zambujeira do Mar
    [37.3135, -8.8063], // Aljezur
    [37.3674, -8.7875]  // Odeceixe
];

// Draw a polyline to represent the Costa Vicentina route
L.polyline(costaVicentinaCoordinates, {
    color: 'blue',  // Set the color of the path
    weight: 4,  // Thickness of the path
    opacity: 0.7  // Transparency of the path
}).addTo(map)
  .on('click', function () {
    window.location.href = 'mes1.html'; // Redirect to Costa Vicentina page when polyline is clicked
  });




