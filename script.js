// const url = `https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=aff122096f837ba4294cbc4b786664cc`
let box = document.createElement('div');

function submitcity() {
    let serachcity = document.querySelector("#city").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${serachcity}&appid=aff122096f837ba4294cbc4b786664cc`
    fetch(url).then(function(res) {
        return res.json();
    }).then(function(res) {
        // console.log(res)
        showdetails(res)
    }).catch(function(err) {
        let container = document.querySelector("#show-here");
        // container.innerText = 'Please Enter correct city';
        let img = document.createElement('img');
        img.src = 'https://media.istockphoto.com/vectors/wrong-location-pointer-vector-id936761952';
        img.style.width = '100%';
        img.style.height = '80vh';
        container.append(img)

    })
}

function getDataLocation(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5881c4a70f1f474bc5289105d70aa1b5`;
    var container = document.querySelector("#user-location");
    var icon = document.createElement("i");
    icon.setAttribute("class", 'fa-solid fa-location-crosshairs');

    fetch(url)
        .then(function(res) {
            return res.json();
        })
        .then(function(res) {
            showdetails(res);
            // console.log(res)
            container.innerHTML = `Current Location ${res.name}`;
        })
        .catch(function(err) {
            console.log(err);
        });

}

function showdetails(res) {



    var container = document.querySelector("#show-here");
    var map = document.querySelector("#gmap_canvas");
    container.innerHTML = null;
    let humwind = document.createElement("div");
    humwind.setAttribute("class", 'humandwind')
    let cityName = document.createElement("h1");
    cityName.innerHTML = `${res.name}`;
    let temp = document.createElement("p");
    temp.innerHTML = `Temp: ${res.main.temp}`;
    let temp_max = document.createElement("p");
    temp_max.innerHTML = `TempMax: ${res.main.temp_max}`;
    let temp_min = document.createElement("p");
    temp_min.innerHTML = `TempMin: ${res.main.temp_min}`;
    let humidity = document.createElement("p");
    humidity.innerHTML = `Humidity: ${res.main.humidity}%`;
    let Wind = document.createElement("p");
    Wind.innerHTML = `Wind: ${Math.ceil(res.wind.speed)} mph`;
    humwind.append(humidity, Wind)
    let lat = res.coord.lat;
    let lon = res.coord.lon;
    fiveday(lat, lon)
    let fahrenheit = `${Math.floor((res.main.temp_max - 273.15) * 9 / 5 + 35)}`;
    let cloud = document.createElement('i');
    cloud.style.fontSize = '52px';

    cloud.style.animation = 'none';



    // <i class="fa-solid fa-sun"></i>
    // <i class="fa-solid fa-cloud"></i>
    // <i class="fa-solid fa-sun-bright"></i>
    var fahrclick = document.createElement('p');
    fahrclick.setAttribute('id', "clickonFah");
    fahrclick.innerText = '°F';
    fahrclick.style.cursor = 'pointer';

    let cilclick = document.createElement('p');
    cilclick.style.cursor = 'pointer';
    cilclick.innerText = '°C';

    let sapare = document.createElement('div');
    sapare.setAttribute('class', "draw-line")
    let celsius = `${Math.floor((res.main.temp_max - 273.15))}`;
    if (fahrenheit < 32) {
        cloud.setAttribute('class', 'fa-solid fa-cloud');
        cloud.innerHTML = 'Cloud'
    } else {
        cloud.setAttribute('class', 'fa-solid fa-sun');
        cloud.innerHTML = 'Sun'

    }
    let tempall = document.createElement('div');
    tempall.setAttribute('class', "giving-flex-per")
    var temp_show_current = document.createElement('h2');
    var fahCelsi = document.createElement('div');
    fahCelsi.setAttribute('class', "giving-flex");
    fahCelsi.append(fahrclick, sapare, cilclick);
    temp_show_current.append(fahrenheit);
    tempall.append(temp_show_current, fahCelsi)
    temp_show_current.append(cloud);
    container.append(cityName, humwind, tempall);
    fahrclick.addEventListener('click', function() {
        shwotheclickfah(fahrenheit, temp_show_current);
    });

    cilclick.addEventListener('click', function() {
        showcilClick(celsius, temp_show_current);
    });

    var body = document.querySelector('body');
    document.body.style.backgroundImage = "none";

    if (res.name === 'Mumbai') {
        body.style.backgroundImage = "url('https://www.youngisthan.in/wp-content/uploads/cmsimported/img-54a295118e336-posts-10205.jpg')";
    }
    body.style.backgroundRepeat = "no-repeat";



    function
    showcilClick(valu, show) {
        show.innerHTML = '';
        show.append(valu);
    }

    function shwotheclickfah(valu, show) {
        show.innerHTML = '';
        show.append(valu);
    }
    map.src = `https://maps.google.com/maps?q=${res.name}&t=k&z=13&ie=UTF8&iwloc=&output=embed`;

}


function getWeather() {
    navigator.geolocation.getCurrentPosition(success);

    function success(position) {
        let crd = position.coords;

        // console.log("Your current position is:");
        // console.log(`Latitude : ${crd.latitude}`);
        // console.log(`Longitude: ${crd.longitude}`);
        // console.log(`More or less ${crd.accuracy} meters.`);

        getDataLocation(crd.latitude, crd.longitude);
        // fiveday(crd.latitude, crd.longitude);
        // fiveday(crd.latitude, crd.longitude)


    }
}
window.addEventListener('load', accesslocation);


function accesslocation() {
    getWeather()
}

function clicktogstp() {
    getWeather()
}

function fiveday(lat, lon) {
    // let res = `https://openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&${lon}&appid=aff122096f837ba4294cbc4b786664cc`
    let res = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=aff122096f837ba4294cbc4b786664cc`;

    fetch(res).then(function(res) {
        return res.json();
    }).then(function(res) {

        dailyrepost(res)
    }).catch(function(err) {
        console.log(err)
    })
}

// date covnet


function dailyrepost(info) {
    console.log(info)

    var sevenday = info.daily;
    box.innerHTML = null;


    sevenday.map(function(el) {

        let newbox = document.createElement('div');
        let currentDate = el.dt;
        let date = new Date(currentDate * 1000);
        let heditem = document.createElement('h1');
        let temnum = document.createElement('p');
        let daytemp = el.temp.day;
        heditem.innerText = date;
        console.log(el.wind_speed)
        let celi = document.createElement('p');

        let weekp = document.createElement('h1');

        let currentdate = date.toString();
        let week = currentdate.substring(0, 3);
        weekp.innerText = week;

        let fahrenheit = `${Math.floor((daytemp - 273.15) * 9 / 5 + 35)}`;
        let celsius = `${Math.floor((daytemp - 273.15))}`;
        let weatherimg = document.createElement('img');
        let imgdiv = document.createElement('div');
        console.log(celsius)
        if (celsius < 30) {
            weatherimg.src = 'https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png'
        } else {
            weatherimg.src = 'https://ssl.gstatic.com/onebox/weather/48/sunny.png'
        }
        imgdiv.append(weatherimg);
        temnum.innerHTML = `${fahrenheit} °F`;
        celi.innerHTML = `${celsius} °C`;
        newbox.append(week, imgdiv, temnum, celi)
        box.append(newbox)
        document.querySelector('.five-day-forcast-report').append(box);

    });




}