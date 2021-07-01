// OpenWeather API key - befd87c0ecdf2bcb8020b97c9012c6d5

// for Celsius -- put &units=metric after the city name

// for Fahrenheight -- put &units=imperial after city name

// import { createApi } from 'unsplash-js';

let main = document.querySelector("#main");
let city = document.querySelector(".city");
let temp = document.querySelector(".temp");
let switchTemp = document.querySelector(".switch-btn");
let weather = document.querySelector(".weather");
let imageContainer = document.querySelector(".image-container");
let citySelect = document.querySelector(".citySelect");
let searchBtn = document.querySelector("button");

let changeUrl = () => {
  window.location.href = `?city=${citySelect.value}`;
};

searchBtn.addEventListener("click", function () {
  // getWeather();
  changeUrl();
});
citySelect.addEventListener("keydown", function (e) {
  console.log(e.key);
  if (e.key === "Enter") {
    changeUrl();
    getWeather();
  }
});

async function getWeather() {
  let search = citySelect.value;

  if (search === "") {
    // search = "Paris";
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    search = urlParams.get("city");
  }

  let clientId = "eZd8mOeIHbWBLRH42sqckrv_AkPWCdEzSqtJs9tYsWQ";
  let url = `https://api.unsplash.com/search/photos/?client_id=${clientId}&query=${search}`;

  const backgroundImage = await fetch(url, {
    mode: "cors",
  });

  const imageData = await backgroundImage.json();
  const mainBackground = await fetch(imageData.results[8].urls.full, {
    mode: "cors",
  });

  main.style.backgroundImage = `url(${mainBackground.url})`;

  let degrees = "";
  let degreeMarker = "";

  if (switchTemp.classList.contains("active")) {
    degrees = "imperial";
    degreeMarker = "F";
  } else {
    degrees = "metric";
    degreeMarker = "C";
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=${degrees}&appid=befd87c0ecdf2bcb8020b97c9012c6d5
    `,
    {
      mode: "cors",
    }
  );
  const dataOne = await response.json();
  console.log(dataOne.coord);

  const weatherIcon = await fetch(
    `https://openweathermap.org/img/wn/${dataOne.weather[0].icon}@2x.png`,
    {
      mode: "cors",
    }
  );
  const forecast = await fetch(
    ` https://api.openweathermap.org/data/2.5/onecall?lat=${dataOne.coord.lat}&lon=${dataOne.coord.lon}&exclude=hourly,current,minutely,alerts&units=metric&appid=befd87c0ecdf2bcb8020b97c9012c6d5
    `,
    {
      mode: "cors",
    }
  );
  const foreData = await forecast.json();
  console.log(foreData);

  city.innerText = `${search}, ${dataOne.sys.country}`;

  let currentTemp = Math.round(dataOne.main.temp);
  temp.innerHTML = `${currentTemp}\u00B0 ${degreeMarker}`;

  weather.innerText = `${dataOne.weather[0].main}`;
  imageContainer.style.backgroundImage = `url(${weatherIcon.url})`;

  //chart days +5

  let dayPlusOne = new Date(foreData.daily[1].dt * 1000).toLocaleDateString(
    "en",
    { weekday: "long" }
  );
  let dayPlusTwo = new Date(foreData.daily[2].dt * 1000).toLocaleDateString(
    "en",
    { weekday: "long" }
  );
  let dayPlusThree = new Date(foreData.daily[3].dt * 1000).toLocaleDateString(
    "en",
    { weekday: "long" }
  );
  let dayPlusFour = new Date(foreData.daily[4].dt * 1000).toLocaleDateString(
    "en",
    { weekday: "long" }
  );
  let dayPlusFive = new Date(foreData.daily[5].dt * 1000).toLocaleDateString(
    "en",
    { weekday: "long" }
  );
  let maxDayPlusOne = foreData.daily[1].temp.max;
  let maxDayPlustwo = foreData.daily[2].temp.max;
  let maxDayPlusthree = foreData.daily[3].temp.max;
  let maxDayPlusFour = foreData.daily[4].temp.max;
  let maxDayPlusFive = foreData.daily[5].temp.max;

  //chart

  const labels = [
    dayPlusOne,
    dayPlusTwo,
    dayPlusThree,
    dayPlusFour,
    dayPlusFive,
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Five days Forecast",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [
          maxDayPlusOne,
          maxDayPlustwo,
          maxDayPlusthree,
          maxDayPlusFour,
          maxDayPlusFive,
        ],
      },
    ],
  };

  const config = {
    type: "line",
    data,
    options: {},
  };
  let myChart = new Chart(document.getElementById("myChart"), config);
  // citySelect.addEventListener("change", () => {
  //   // myChart = new Chart(document.getElementById("myChart"), config);
  //   console.log(search);
  //   window.location.href(`?city=${search}`);
  // });

  // console.log("chart 1");

  // console.log("destroy");

  // console.log("chart 2");
}
// document.getElementById("myChart").remove(); //canvas
// let div = document.querySelector("#chart"); //canvas parent element
// div.insertAdjacentHTML("afterbegin", "<canvas id='myChart'></canvas>");

// document.getElementById("myChart").remove(); //canvas
//   let div = document.querySelector("#chart"); //canvas parent element
//   document.querySelector("#chart").innerHTML =
//     '<canvas id="results-graph"><canvas>';
//   myChart = new Chart(document.getElementById("myChart"), config);

getWeather();

/////// chartjs

// let todayPlusTwo = addDays(new Date(), 2);
// let todayPlusThree = addDays(new Date(), 3);
// let todayPlusFour = addDays(new Date(), 4);
// let todayPlusFive = addDays(new Date(), 5);
// let todayPlusSix = addDays(new Date(), 6);
// const labels = [];
// const data = {
//   labels: labels,
//   datasets: [
//     {
//       label: "My First dataset",
//       backgroundColor: "rgb(255, 99, 132)",
//       borderColor: "rgb(255, 99, 132)",
//       data: [0, 10, 5, 2, 20, 30, 45],
//     },
//   ],
// };

// const config = {
//   type: "bar",
//   data,
//   options: {},
// };
// var myChart = new Chart(document.getElementById("myChart"), config);
/////////testing

// function addDays(theDate, days) {
//   return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
// }
// let todayPlusOne = addDays(new Date(), 1);
