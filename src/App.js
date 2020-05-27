import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      weatherResult: null,
      locationName: "",
      country:"",
      temperature: "",
      weatherDescription:""
      };
  }

  getCurrentWeather = async(lon,lat) => {
    let apiKey = "5345677e30571e91182d4223daa0ec3a"
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    let data = await fetch(url);
    let result = await data.json();
    console.log(result)
    console.log(result.name)
    this.setState({
      weatherResult: result,
      locationName: result.name,
      country: result.sys.country,
      temperature: result.main.temp,
      weatherDescription: result.weather[0].description
      })
  }

  getLocation = () => {
    navigator.geolocation.getCurrentPosition((post) => {
          this.getCurrentWeather(post.coords.longitude, post.coords.latitude)
    })
  }
  
  componentDidMount(){
    console.log("Get app")
    this.getLocation()
  }

  render() {
    if(this.state.weatherResult == null) {
      return (<div> Loading </div>)
    }
      
    return (
      <div className="container mx-auto my-4 py-4" style={{ margin: 0 }}>
          <div className="row justify-content-center text-center">
            <div className="weather-container">
              <h2 className="col-12 location">
                {this.state.locationName}, {this.state.country}
              </h2>
              <h1 className="col-12 temperature">
                {this.state.temperature}
              </h1>
              <h2 className="col-12 weather-description">
                {this.state.weatherDescription}
              </h2>
              <p className="col-12 author">
                Made with 
                <span role="img" aria-labelledby="heart">
                  ❤️️️️
                </span>
                by Quan
              </p>
            </div>
          </div>
        </div>
    );
  }
}