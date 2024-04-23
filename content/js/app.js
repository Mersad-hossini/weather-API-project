let $ = document

let city = $.querySelector(".city")
let date = $.querySelector(".date")
let temp = $.querySelector(".temp")
let weather = $.querySelector(".weather")
let hiLow = $.querySelector(".hi-low")

let serachWearther = $.querySelector(".search-box")

let url = 'https://api.openweathermap.org/data/2.5/weather?q=';
let key = '26c4d8ad14b57209671494df9bd9fcb9';

function getWeatger(e) {
    if(e.keyCode === 13) {
        fetchWeather()
    }
}

async function fetchWeather() {
    let searchValue = serachWearther.value

    try {

        let res = await fetch(`${url}${searchValue}&appid=${key}`)

        if(res.ok) {
            let data = await res.json()
            showWeather(data)
            clearInput()
        } else {
            throw Error("Please Enter a Valid City Or Country!!!")
        }
    } catch(err) {
        city.innerHTML = err
        date.innerHTML = ""
        temp.innerHTML = ""
        weather.innerHTML = ""
        hiLow.innerHTML = ""       
    }

}

function showWeather(weatherInfo) {

    city.innerHTML = `${weatherInfo.name}, ${weatherInfo.sys.country}`

    date.innerHTML = showDate()

    temp.innerHTML = `${Math.floor(weatherInfo.main.temp - 273.15)}°C`

    weather.innerHTML = weatherInfo.weather[0].main

    hiLow.innerHTML = `${Math.floor(weatherInfo.main.temp_max - 273.15)}°c / ${Math.floor(weatherInfo.main.temp_min - 273.15)}°c`
}

function clearInput() {
    serachWearther.value = ""
}

function showDate() {

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let now = new Date()

    let currentDay = days[now.getDay()]

    let currentMothDate = now.getDate()

    let currentMoth = months[now.getMonth()]

    let currentYear = now.getFullYear()

    return `${currentDay} ${currentMothDate} ${currentMoth} ${currentYear}`
}

serachWearther.addEventListener("keyup", getWeatger)