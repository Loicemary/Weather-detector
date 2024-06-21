const container = document.querySelector('.container');
const searchButton = document.querySelector('[data-element="search-button"]');
const weatherBox = document.querySelector('[data-element="weather-box"]');
const weatherDetails = document.querySelector('[data-element="weather-details"]');
const error404 = document.querySelector('.not-found');

searchButton.addEventListener('click', ()=>{

    const APIkey = '653949b39aae3ad70fee7f2b0d66da91';
    const city = document.querySelector('[data-element="search-input"]').value;

    if (city === '')
    return;

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
.then (response => response.json()).then
    (json =>{
         
        if(json.code === '404'){
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            searchButton.style.display = 'block';
            return;
        }

        error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('[data-element="image"]');
            const temperature = document.querySelector('[data-element="temperature"]');
            const description = weatherBox.querySelector('[data-element="description"]');
            const humidity = document.querySelector('[data-element="humidity"]');
            const wind= document.querySelector('[data-element="wind"]');

            switch(json.weather[0].main){
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                    case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                    case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                    case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                    case 'Haze':
                    image.src = 'images/haze.png';
                    break;

                    default:
                        image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>℃</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

            weatherBox.style.display = 'block';
            weatherDetails.style.display = 'block';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
    });
});