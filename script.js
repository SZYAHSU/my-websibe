document.addEventListener("DOMContentLoaded", () => {
    // 燈 1 控制
    const light1Switch = document.getElementById('light1-switch');
    const light1Brightness = document.getElementById('light1-brightness');
    const light1Percentage = document.getElementById('light1-percentage');

    light1Switch.addEventListener('change', () => {
        if (light1Switch.checked) {
            light1Brightness.disabled = false;
            light1Percentage.textContent = `${light1Brightness.value}%`;
        } else {
            light1Brightness.disabled = false;
            light1Brightness.value = 0;
            light1Percentage.textContent = '0%';
        }
    });

    light1Brightness.addEventListener('input', () => {
        if (light1Brightness.value > 0) {
            light1Switch.checked = true;
        } else {
            light1Switch.checked = false;
        }
        light1Percentage.textContent = `${light1Brightness.value}%`;
    });

    // 燈 2 控制
    const light2Switch = document.getElementById('light2-switch');
    const light2Brightness = document.getElementById('light2-brightness');
    const light2Percentage = document.getElementById('light2-percentage');

    light2Switch.addEventListener('change', () => {
        if (light2Switch.checked) {
            light2Brightness.disabled = false;
            light2Percentage.textContent = `${light2Brightness.value}%`;
        } else {
            light2Brightness.disabled = false;
            light2Brightness.value = 0;
            light2Percentage.textContent = '0%';
        }
    });

    light2Brightness.addEventListener('input', () => {
        if (light2Brightness.value > 0) {
            light2Switch.checked = true;
        } else {
            light2Switch.checked = false;
        }
        light2Percentage.textContent = `${light2Brightness.value}%`;
    });

    // 模擬更新數據
    const temperatureElement = document.getElementById('temperature');
    const humidityElement = document.getElementById('humidity');
    const energySavedElement = document.getElementById('energy-saved');

    setInterval(() => {
        const temperature = (Math.random() * 5 + 20).toFixed(1);
        const humidity = (Math.random() * 20 + 40).toFixed(1);
        const energySaved = (Math.random() * 5 + 5).toFixed(1);

        temperatureElement.textContent = `${temperature}°C`;
        humidityElement.textContent = `${humidity}%`;
        energySavedElement.textContent = `${energySaved} kWh`;
    }, 5000);

    // 設置太陽能板發電狀況的圖表
    const ctx = document.getElementById('solar-chart').getContext('2d');
    const solarChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['6:00', '9:00', '12:00', '15:00', '18:00', '21:00'],
            datasets: [{
                label: '太陽能發電 (kWh)',
                data: [0, 5, 10, 15, 10, 5],
                borderColor: 'rgb(255, 204, 0)',
                backgroundColor: 'rgba(255, 204, 0, 0.2)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: '時間'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: '發電量 (kWh)'
                    }
                }
            }
        }
    });
});

// Get current sensor readings when the page loads  
window.addEventListener('load', getReadings);

// Create Temperature Gauge
var gaugeTemp = new LinearGauge({
  renderTo: 'gauge-temperature',
  width: 120,
  height: 400,
  units: "Temperature C",
  minValue: 0,
  startAngle: 90,
  ticksAngle: 180,
  maxValue: 40,
  colorValueBoxRect: "#049faa",
  colorValueBoxRectEnd: "#049faa",
  colorValueBoxBackground: "#f1fbfc",
  valueDec: 2,
  valueInt: 2,
  majorTicks: [
      "0",
      "5",
      "10",
      "15",
      "20",
      "25",
      "30",
      "35",
      "40"
  ],
  minorTicks: 4,
  strokeTicks: true,
  highlights: [
      {
          "from": 30,
          "to": 40,
          "color": "rgba(200, 50, 50, .75)"
      }
  ],
  colorPlate: "#ffffff",
  colorBarProgress: "#CC2936",
  colorBarProgressEnd: "#049faa",
  borderShadowWidth: 0,
  borders: false,
  needleType: "arrow",
  needleWidth: 2,
  needleCircleSize: 7,
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: 1500,
  animationRule: "linear",
  barWidth: 10,
}).draw();
  
// Create Humidity Gauge
var gaugeHum = new RadialGauge({
  renderTo: 'gauge-humidity',
  width: 300,
  height: 300,
  units: "Humidity (%)",
  minValue: 0,
  maxValue: 100,
  colorValueBoxRect: "#049faa",
  colorValueBoxRectEnd: "#049faa",
  colorValueBoxBackground: "#f1fbfc",
  valueInt: 2,
  majorTicks: [
      "0",
      "20",
      "40",
      "60",
      "80",
      "100"

  ],
  minorTicks: 4,
  strokeTicks: true,
  highlights: [
      {
          "from": 80,
          "to": 100,
          "color": "#03C0C1"
      }
  ],
  colorPlate: "#fff",
  borderShadowWidth: 0,
  borders: false,
  needleType: "line",
  colorNeedle: "#007F80",
  colorNeedleEnd: "#007F80",
  needleWidth: 2,
  needleCircleSize: 3,
  colorNeedleCircleOuter: "#007F80",
  needleCircleOuter: true,
  needleCircleInner: false,
  animationDuration: 1500,
  animationRule: "linear"
}).draw();

// Function to get current readings on the webpage when it loads for the first time
function getReadings(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      console.log(myObj);
      var temp = myObj.temperature;
      var hum = myObj.humidity;
      gaugeTemp.value = temp;
      gaugeHum.value = hum;
    }
  }; 
  xhr.open("GET", "/readings", true);
  xhr.send();
}

if (!!window.EventSource) {
  var source = new EventSource('/events');
  
  source.addEventListener('open', function(e) {
    console.log("Events Connected");
  }, false);

  source.addEventListener('error', function(e) {
    if (e.target.readyState != EventSource.OPEN) {
      console.log("Events Disconnected");
    }
  }, false);
  
  source.addEventListener('message', function(e) {
    console.log("message", e.data);
  }, false);
  
  source.addEventListener('new_readings', function(e) {
    console.log("new_readings", e.data);
    var myObj = JSON.parse(e.data);
    console.log(myObj);
    gaugeTemp.value = myObj.temperature;
    gaugeHum.value = myObj.humidity;
  }, false);
}