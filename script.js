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
//----------------------------------------------------------------------------------------------------------------------------------
//map.html
// Inicializa o mapa e define a visão para as coordenadas de Portugal
const map = L.map('map').setView([39.3999, -8.2245], 6.5); // Latitude e Longitude de Portugal, nível de zoom 6.5

// Adiciona as camadas do mapa  
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18 // Nível máximo de zoom permitido
}).addTo(map);

// Lista de viagens e seus dados (coordenadas, memória, e URL)
const trips = [
    {
        name: "Costa Vicentina '23",
        description: "PDA!!",
        color: 'blue', // Cor da polyline para esta viagem
        url: "mes6.html", // URL associada a esta viagem
        cities: [
            { name: "Sines", coords: [37.9563, -8.8708], memory: "Sines, cidade histórica e berço de Vasco da Gama 🏰" },
            { name: "Praia da Ilha do Pessegueiro", coords: [37.8772, -8.7967], memory: "História e beleza natural em uma só praia 🌴" },
            { name: "Praia da Samoqueira", coords: [37.8728, -8.7931], memory: "Paraíso escondido com águas calmas 🌊" },
            { name: "Porto Covo", coords: [37.8545, -8.7924], memory: "Vila charmosa com águas cristalinas 🏖️" },
            { name: "Vale Figueiros", coords: [37.9011, -8.8133], memory: "Tranquilidade no meio da natureza 🏞️" },
            { name: "Farol de São Clemente", coords: [37.7285, -8.7883], memory: "Farol icônico com vistas de tirar o fôlego 🌟" },
            { name: "Praia das Furnas (Odemira)", coords: [37.7167, -8.7767], memory: "Ótima para famílias e banhos relaxantes 🏝️" },
            { name: "Praia Farol (Milfontes)", coords: [37.7225, -8.7800], memory: "Conexão entre natureza e história 🗺️" },
            { name: "Almograve", coords: [37.6767, -8.7967], memory: "Dunas e paisagens fascinantes 🌾" },
            { name: "Praia do Cavaleiro", coords: [37.5895, -8.7957], memory: "Paisagens impressionantes e trilhos incríveis 🏞️" },
            { name: "Poça do Buraco", coords: [37.5738, -8.8128], memory: "Exploração e beleza natural únicas 🪨" },
            { name: "Zambujeira do Mar", coords: [37.5231, -8.7866], memory: "Um dos melhores pores do sol da região 🌅" },
            { name: "Praia dos Alteirinhos", coords: [37.5225, -8.7822], memory: "Famosa pela cascata e tranquilidade 🌊" },
            { name: "Praia do Carvalhal", coords: [37.5221, -8.7900], memory: "Encantos naturais e trilhos relaxantes 🏖️" },
            { name: "Praia dos Machados", coords: [37.4870, -8.7950], memory: "Beleza natural para os amantes da tranquilidade 🏝️" },
            { name: "Praia da Amoreira", coords: [37.3692, -8.8121], memory: "Mistura perfeita de rio e mar 🌊" },
            { name: "Vale dos Homens", coords: [37.3452, -8.8136], memory: "Perfeito para relaxar longe da multidão 🌅" },
            { name: "Praia da Carreagem", coords: [37.3458, -8.8379], memory: "Rochas e paisagens impressionantes 🌿" }
        ],
        
        route: [
            [37.9563, -8.8708],
            [37.9011, -8.8133],
            [37.8772, -8.7967],
            [37.8728, -8.7931],
            [37.8545, -8.7924],
            [37.7285, -8.7883],
            [37.7225, -8.7800],
            [37.7167, -8.7767],
            [37.6767, -8.7967],
            [37.5895, -8.7957],
            [37.5738, -8.8128],
            [37.5231, -8.7866],
            [37.5225, -8.7822],
            [37.5221, -8.7900],
            [37.4870, -8.7950],
            [37.3692, -8.8121],
            [37.3458, -8.8379],
            [37.3452, -8.8136]
        ]
    },
    {
        name: "Porto 24' ",
        description: "Não sei o que escrever!",
        color: 'green', // Cor da polyline para esta viagem
        url: "mes7.html", // URL associada a esta viagem
        cities: [
            { name: "Aveiro", coords: [40.6405, -8.6538], memory: "Aveiro, conhecida como a 'Veneza de Portugal', com seus canais e barcos coloridos." },
            { name: "Porto", coords: [41.1579, -8.6291], memory: "Porto, cidade do vinho do Porto e famosa pela sua arquitetura histórica e o Rio Douro." },
            { name: "Matosinhos", coords: [41.1784, -8.6847], memory: "Matosinhos, famosa pelas suas praias e excelente gastronomia, especialmente os pratos de peixe e marisco." },
            { name: "Zoo da Maia", coords: [41.2336, -8.6017], memory: "O Zoo da Maia, um dos maiores zoológicos de Portugal, é perfeito para quem gosta de aprender sobre a vida selvagem e a preservação das espécies." }
        ],
        route: [
            [40.6405, -8.6538],
            [41.1579, -8.6291],
            [41.1784, -8.6847],
            [41.2336, -8.6017]
        ]
    },
    {
        name: "Serra da Estrela 23 verão",
        description: "Descrição da viagem 3",
        color: 'red', // Cor da polyline para esta viagem
        url: "viagem3.html", // URL associada a esta viagem
        cities: [
            { name: "Cidade 3", coords: [38.5, -7.5], memory: "Memória da cidade 3" },
            { name: "Cidade 4", coords: [38.6, -7.6], memory: "Memória da cidade 4" }
        ],
        route: [
            [38.5, -7.5],
            [38.6, -7.6]
        ]
    },
    // Adicionar mais viagens aqui conforme necessário
];

// Função para abrir o modal com a descrição dinâmica
function openModal(trip) {
    // Atualiza o conteúdo do modal dinamicamente com base na viagem clicada
    document.getElementById('modal-title').innerText = `Quer ver a ${trip.name}?`;
    document.getElementById('modal-description').innerText = trip.description;

    // Atualiza o título da página dinamicamente com o nome da viagem
    document.title = `${trip.name} - Detalhes da Viagem`; // Atualiza o <title> da página

    // Mostra o modal
    document.getElementById('modal').style.display = 'flex';

    // Quando o botão "Sim" for clicado, redireciona para a URL da viagem
    document.getElementById('yes-btn').onclick = function () {
        window.location.href = trip.url; // Usa a URL definida na viagem
    };

    // Quando o botão "Não" for clicado, fecha o modal
    document.getElementById('no-btn').onclick = function () {
        document.getElementById('modal').style.display = 'none'; // Fecha o modal
    };
}

// Adiciona marcadores ao mapa para todas as cidades de todas as viagens
trips.forEach(trip => {
    // Adiciona os marcadores para as cidades da viagem
    trip.cities.forEach(city => {
        const marker = L.marker(city.coords).addTo(map);
        marker.bindPopup(`<b>${city.name}</b><br>${city.memory}`);

        // Quando o marcador da cidade é clicado, exibe o popup
        marker.on('click', function () {
            marker.openPopup();
        });
    });

    // Desenha a polyline para representar a rota da viagem com a cor definida na viagem
    const route = L.polyline(trip.route, {
        color: trip.color,  // Usa a cor personalizada para cada viagem
        weight: 4,  // Espessura da linha
        opacity: 0.7  // Transparência da linha
    }).addTo(map);

    // Quando a rota é clicada, abre o modal com a descrição da viagem
    route.on('click', function () {
        openModal(trip); // Passa a viagem para o modal
    });
});

// Fechar o modal quando o "X" for clicado
document.getElementById('modal-close').onclick = function () {
    document.getElementById('modal').style.display = 'none'; // Fecha o modal
};
