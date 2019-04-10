import React, { Component } from "react";
import logo from "./logo.svg";
import sunny from "./images/sunny.jpg";
import rainy from "./images/rainy.jpg";
import "./App.scss";

class App extends Component {
  state = {
    data: {},
    isLoaded: false,
    currentWeather: ""
  };

  getWeather(lat, lon) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b7ad7404a64ed06ca470ee07237c07e7&units=metric`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          data,
          isLoaded: true,
          currentWeather: data.weather[0].main.toLowerCase()
        });
      })
      .catch(err => {
        throw new Error(err);
      });

    // this.updateStlyes(currentWeather);
  }

  // get user location
  getLocation() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(position => {
        const thisLat = position.coords.latitude;
        const thisLon = position.coords.longitude;
        this.getWeather(thisLat, thisLon);
      });
    else console.log("Geolocation not supported");
  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoaded, data, currentWeather } = this.state;
    if (!isLoaded) {
      return (
        <div className="App">
          <header className="App-header">...loading</header>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className={`App-header ${currentWeather}`}>
            <h1>
              Current <br /> weather conditions
            </h1>
            <p>
              In {data.name}, it's {data.main.temp} degrees celcius with mainly{" "}
              {data.weather[0].main.toLowerCase()} outside.
            </p>
          </header>
        </div>
      );
    }
  }
}

export default App;
