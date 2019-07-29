const API_KEY = '5bf89fc7b6f298df5e945fbd263db3ba';
const ROOT_URL = ``;

// Tutaj dodaj zmienne z elementami DOM
const searchInput = document.getElementById("js_search-input");
const buttonSearch = document.getElementById("js_search-btn");
const errorMsg = document.getElementById("js_error-msg");
const instruction = document.getElementById("js_instruction");
const resultsWrapper = document.getElementById("js_results");
const currentTemp = document.getElementById("js_current-temp");
const currentWeatherIcon = document.getElementById("js_current-weather-icon");
const loader = document.getElementById("js_loader");

function getWeather(city) {
    const url = `http://api.openweathermap.org/data/2.5/forecast?&q=${city},pl&appid=${API_KEY}&units=metric`;

    instruction.classList.remove("show");
    errorMsg.classList.remove("show");
    loader.classList.add("show");
    // const result = axios.get(url)
  

    axios.get(url)
    .then(resultat => {
        handleResponse(resultat.data.list)
    }).catch(e => {
        handleError()
        console.error(e);
        
    });
    // utwórz url
    // schowaj instrukcję
    // schowaj informację o błędach
    // pokaż loader

    // utwórz zapytanie o dane, obsłuż odpowiedź (then) oraz błąd (catch)
}

function handleError() {
    errorMsg.classList.add('show');
    loader.classList.remove("show");
   
    // schowaj loader
    // pokaż error
}

function handleResponse(list) {
    resultsWrapper.classList.add('show');
    showCurrentWeather(list);
    loader.classList.remove("show");
    showForecast(list);
    
    
    // pokaż aktualną pogodę
    // pokaż prognozę pogody
}


function showCurrentWeather(list) {
    const current=list[0];
    const temp = current.main.temp;
    const icon = current.weather[0].icon;
    // currentTemp.textContent = temp;
    currentTemp.textContent = `${Math.round(temp)}\xB0C`

    currentWeatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    
    console.log(icon);
    console.log(temp);
    // pobierz kod ikony i ustaw ją jako src obrazka
    // pobierz temperaturę i ustaw ją jako tekst w Aktualnej pogodzie
}

function showForecast(list) {
    console.log(list);
    const labels = [];
    const temps = [];

    for (let i=0; i<list.length;i++){
        const label = list[i].dt_txt;
        const temperature = list[i].main.temp;
        labels.push(label);
        temps.push(temperature);
    }
        
    

    console.log(temps)
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperatura',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: temps
            }]
        },
    
        // Configuration options go here
        options: {}
    });
    // utwórzy wykres z danymi i umieść go w canvas
}

function handleSearch() {
   
    const text = searchInput.value;

    if (text) {
        getWeather(text);
    }
    // console.log(text);
    getWeather(text);
    // pobierz nazwę miasta z pola input
    // wywołaj funkcję getWeather z nazwą miasta
}

function addListenerToSearchButton() {
    buttonSearch.addEventListener('click', handleSearch);
    // pobierz element button z formularza
    // dodaj do elementu button funkcję handleSearch na evencie 'click'
}

function hideInstruction() {
    // schowaj instrukcję
}

function showErrorMessage() {
    // pokaż error
}

function hideErrorMessage() {
    // ukryj error
}

function hideLoader() {
    // ukryj loader
}

function showLoader() {
    // pokaż loader
}

function showResultsWrapper() {
    // pokaż wrapper z wynikami
}

function hideResultsWrapper() {
    // schowaj wrapper z wynikami
}



addListenerToSearchButton() 

