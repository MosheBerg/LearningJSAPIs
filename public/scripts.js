const data = {};
const myLocation = {};
function setup() {
    // const canvas = createCanvas(160, 120);
    // pixelDensity(1);
    // background(0);
    noCanvas();
    const video = createCapture(VIDEO);
    video.size(160,120);
    document.getElementById('submit').addEventListener('click', async function(){
        video.loadPixels();
        const image64 = video.canvas.toDataURL();
        data.image64 = image64;
        submit(data);
    });  
}
showMap();
async function submit(data) {
    data.latitude = myLocation.x;
    data.longitude = myLocation.y;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    const response = await fetch('/api', options);
    const json = await response.json();
    console.log('end')
}

function success(position) {
    console.log('started');
    myLocation.x = position.coords.latitude;
    myLocation.y = position.coords.longitude;
    const map = L.map('map').setView([myLocation.x, myLocation.y], 13);
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: attribution }).addTo(map);
    L.marker([myLocation.x, myLocation.y]).addTo(map)
       .bindPopup('Your Altitude: ' + position.coords.altitude)
        .openPopup();
    ;
}

function failure() {
    console.log("failure");
}

async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    document.querySelector('#text').textContent = data;
    console.log(data);
}

function showMap(){
    if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(success, failure);
else
    console.log("doesn't exist");
}