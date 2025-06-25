// Inicializa o mapa no centro de Cotia
const map = L.map('map').setView([-23.6030, -46.9187], 15);

// Adiciona o mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Marcadores personalizados
const userIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

const collectorIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/484/484167.png',
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [1, -34]
});

// Adiciona marcadores com popups
const markers = [
    {
        position: [-23.6030, -46.9187],
        icon: userIcon,
        popup: '<b>Rua Fatec de Souza, 54</b><br>Cotia SP - CEP 06798-888'
    },
    {
        position: [-23.6050, -46.9200],
        icon: collectorIcon,
        popup: '<b>Rua Fatec de Itapevi, 52</b><br>Cotia SP - CEP 06798-889'
    }
];

// Adiciona marcadores ao mapa
markers.forEach(markerData => {
    L.marker(markerData.position, {icon: markerData.icon})
        .addTo(map)
        .bindPopup(markerData.popup);
});

// Controle de tela cheia melhorado
document.getElementById('fullscreen-btn').addEventListener('click', function() {
    const mapContainer = document.getElementById('map');
    
    if (!document.fullscreenElement) {
        if (mapContainer.requestFullscreen) {
            mapContainer.requestFullscreen();
        } else if (mapContainer.webkitRequestFullscreen) {
            mapContainer.webkitRequestFullscreen();
        } else if (mapContainer.msRequestFullscreen) {
            mapContainer.msRequestFullscreen();
        }
        
        // Ajusta o zoom quando entrar em tela cheia
        setTimeout(() => map.invalidateSize(), 300);
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
});

// Controles adicionais
const zoomControl = L.control.zoom({
    position: 'topright'
}).addTo(map);

// Camada de tráfego (opcional)
L.tileLayer('https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=YOUR_API_KEY', {
    attribution: '&copy; <a href="https://www.thunderforest.com/">Thunderforest</a>',
    maxZoom: 22
}).addTo(map);

// Adiciona busca de localização
const geocoder = L.Control.geocoder({
    defaultMarkGeocode: false,
    position: 'topleft'
}).addTo(map);

geocoder.on('markgeocode', function(e) {
    map.setView(e.geocode.center, 15);
    L.marker(e.geocode.center).addTo(map)
        .bindPopup(e.geocode.name)
        .openPopup();
});

// Atualiza o tamanho do mapa quando a janela for redimensionada
window.addEventListener('resize', function() {
    map.invalidateSize();
});