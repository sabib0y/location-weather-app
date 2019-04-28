import React, {Component} from "react";
import "./App.scss";

class App extends Component {
  state = {
    data: {},
    isLoaded: false,
    currentWeather: "",
    computedDescription: "",
  };

  getLocation() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(position => {
        const thisLat = position.coords.latitude;
        const thisLon = position.coords.longitude;
        this.getWeather(thisLat, thisLon);
      });
    else console.log("Geolocation not supported");
  }

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
        this.fixGrammar();
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  fixGrammar(){
    const weatherString = this.state.currentWeather;
    let setText ;

    if (weatherString === 'clouds'){
      setText = "it's cloudy outside"
    }else if(weatherString === 'wind'){
      setText = "it's windy outside"
    }else{
      setText = weatherString;
    }
    this.setState({computedDescription: setText});
  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoaded, data, currentWeather } = this.state;
    if (!isLoaded) {
      return (
        <div className="App">
          <header className="App-body">...loading</header>
        </div>
      );
    } else {
      return (
        <div className="App">
          <div className={`App-wrapper ${currentWeather}`}>
            <div className={"App-body"}>
              <h1>
                Current <br /> weather conditions
              </h1>
              <p>
                In {data.name},<br />
                it's currently {data.main.temp}&deg;C and{" "}
                {this.state.computedDescription}
              </p>
            </div>
            <footer>
              Weahter information courtsey of{" "}
              <a href="https://openweathermap.org" target="_blank">
                open weather map
              </a>
            </footer>
          </div>
        </div>
      );
    }
  }
}

export default App;
