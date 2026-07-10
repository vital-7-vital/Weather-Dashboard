setInterval(() => {
    var now = new Date();
    document.querySelector(".date").innerHTML = now.toDateString();
    document.querySelector(".time").innerHTML = now.toLocaleTimeString();
}, 1000);
const button=document.getElementById("clear_btn");
button.addEventListener("click",function(){
    document.querySelector(".history").replaceChildren();
    localStorage.clear();
});
document.getElementById("city_input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        var city_name = document.getElementById("city_input").value;
        get_weather(city_name);
    }
});
async function get_weather(city_name) {
    const url_1 = "http://api.openweathermap.org/geo/1.0/direct?q=" + city_name + "&limit=" + 1 + "&appid=4817fb5694995336a9c7b964e00dad57";
    const response_1 = await fetch(url_1);
    const data_address = await response_1.json();
    const lati = data_address[0].lat;
    const long = data_address[0].lon;
    const url_2 = "https://api.openweathermap.org/data/2.5/weather?lat=" + lati + "&lon=" + long + "&units=metric&appid=4817fb5694995336a9c7b964e00dad57";
    const response_2 = await fetch(url_2);
    const data_weather = await response_2.json();
    document.querySelector(".temp_info").innerHTML = data_weather.main.temp + "°C";
    document.querySelector(".hum_info").innerHTML = data_weather.main.humidity + "%";
    document.querySelector(".wind_info").innerHTML = data_weather.wind.speed + "m/s";
    document.querySelector(".dir_info").innerHTML = data_weather.wind.deg + "°";
    document.querySelector(".description").innerHTML = capitalize(data_weather.weather[0].description);
    document.querySelector(".wb_cityname").innerHTML = capitalize(city_name);
    document.querySelector(".weather_box").style.visibility = "inherit";
    const img_icon = data_weather.weather[0].icon;
    const url_3 = "https://openweathermap.org/img/wn/" + img_icon + "%402x.png";
    const img_cloud = document.querySelector(".image_cloud");
    img_cloud.src = url_3;
    var read_local = localStorage.getItem("H")
    var history = JSON.parse(read_local);
    if (history === null) {
        history = [];
    }
    city_name=capitalize(city_name);
    keep_track(city_name, history);
}
function capitalize(x) {
    return x[0].toUpperCase() + x.slice(1);
}
function keep_track(city_name, history) {
    document.querySelector(".history").replaceChildren();
    history.push(city_name);
    localStorage.setItem("H", JSON.stringify(history));
    var x = localStorage.getItem("H");
    var y = JSON.parse(x);
    for (let i = y.length - 1; i >= 0; i--) {
        var div = document.createElement("div");
        div.innerHTML = y[i];
        document.querySelector(".history").appendChild(div);
    }

}
