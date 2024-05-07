let ip;
const API_KEY = "at_qKoeHTBclt1dC76iUip3HTuizhw7G";
let map;


fetch('https://geo.ipify.org/api/v2/country,city?apiKey=' + API_KEY)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        let city = data.location.city;
        let country = data.location.country;
        let lat = data.location.lat;
        let lon = data.location.lng;
        let timezone = "UTC " + data.location.timezone;
        let region = data.location.region;
        let isp = data.isp;
        console.log(data);
        document.querySelector(".ip-address-value").textContent = data.ip;
        document.querySelector(".location-value").textContent = city + ", " + region + ", " + country;
        document.querySelector(".timezone-value").textContent = timezone;
        document.querySelector(".isp-value").textContent = isp;
        map = L.map('map').setView([lat, lon], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([lat, lon]).addTo(map)
            .bindPopup(data.ip)
            .openPopup();
    })
    .catch(error => {

        console.error('There was a problem with the fetch operation:', error);
    });


document.getElementsByClassName("enter")[0].addEventListener('click', () => {

    ip = document.querySelector("input").value;
    console.log(ip);
    fetch('https://geo.ipify.org/api/v2/country,city?apiKey=' + API_KEY + '&ipAddress=' + ip)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let city = data.location.city;
            let country = data.location.country;
            let lat = data.location.lat;
            let lon = data.location.lng;
            let timezone = "UTC " + data.location.timezone;
            let region = data.location.region;
            let isp = data.isp;
            console.log(data);
            document.querySelector(".ip-address-value").textContent = ip;
            document.querySelector(".location-value").textContent = city + ", " + region + ", " + country;
            document.querySelector(".timezone-value").textContent = timezone;
            document.querySelector(".isp-value").textContent = isp;
            // map = L.map('map').setView([lat, lon], 13);

            // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // }).addTo(map);
            map.setView([lat, lon], 13);
            L.marker([lat, lon]).addTo(map)
                .bindPopup(ip)
                .openPopup();
        })
        .catch(error => {

            console.error('There was a problem with the fetch operation:', error);
        });
});
