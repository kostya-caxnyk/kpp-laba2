const apiKey = 'e5b57f8f95db429a50c7d6be2da6fe47';
const weatherUrl = 'https://api.openweathermap.org/';
const weatherIconUrl = 'http://openweathermap.org/img/wn/';

function initMap()
{
    const myLatlng = {lat: 49.2306482953111, lng: 28.41531254863};

    const map = new google.maps.Map(document.getElementById("map"), {
        center: myLatlng,
        zoom: 15
    });

    let infoWindow;

    map.addListener("click", (e) =>
    {
        infoWindow?.close();
        infoWindow = new google.maps.InfoWindow({
            position: e.latLng
        });

        fetch(`${weatherUrl}data/2.5/weather?lat=${e.latLng.lat()}&lon=${e.latLng.lng()}&appid=${apiKey}`)
            .then(res => res.json())
            .then(({weather, name}) =>
                {
                    infoWindow.setContent(
                        `<div class="flex-column">
                            <h1>City name: ${name}</h1>
                            <h2>Weather: ${weather[0].main}</h2>
                            <h3>Description: ${weather[0].description}</h3>
                            <img alt='' src="${`${weatherIconUrl}${weather[0].icon}.png`}"/>
                        </div>`
                    );
                    infoWindow.open(map);
                }
            );
    });
}