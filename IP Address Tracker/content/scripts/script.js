const token = config.APIKEY;

const form = document.getElementById('form');
const input = document.getElementById('input');
const card = document.querySelector('.card');

// Load Map

const getPositions = (ip) => {
    var container = L.DomUtil.get('map');
    if (container != null) {
        container._leaflet_id = null;
    }
    const map = L.map('map').setView([ip.location.lat, ip.location.lng], 13);
    const titleUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, by Rajat Sardesai';

    const tiles = L.tileLayer(titleUrl, { attribution });
    tiles.addTo(map);

    const icon = L.icon({
        iconUrl: 'content/images/icon-location.svg',
    });

    const marker = L.marker([ip.location.lat, ip.location.lng], { icon });
    marker.addTo(map);
}

// Get input

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const search = input.value;

    if (search) {
        getIpInfo(search);
        input.value = '';
    }
});

const getIpInfo = async (ip) => {
    try {
        const res = await fetch(token + "&domain=" + ip);
        const data = await res.json();
        createIpCard(data);
    } catch (err) {
        if (err) {
            alert('No IP Address or Domain Found');
        }
    }
};

// Getting IP info on initial load

getIpInfo('');

// Create IP Info Card

const createIpCard = (ipInfo) => {
    const cardHTML = `<div class="ip-info">
        <small>IP Address</small>
        <p>${ipInfo.ip}</p></div>
    <div class="ip-info">
        <small>Location</small>
        <p>${ipInfo.location.region}, ${ipInfo.location.country} ${ipInfo.location.postalCode}</p>
    </div>
    <div class="ip-info">
        <small>Timezone</small>
        <p>UTC${ipInfo.location.timezone}</p>
    </div>
    <div class="ip-info">
        <small>ISP</small>
        <p>${ipInfo.isp}</p>
    </div>`;
    card.innerHTML = cardHTML;
    getPositions(ipInfo);
};