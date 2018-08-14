import React, { Component } from 'react';
import request from 'superagent'; //npm install --save superagent
import './App.css'

class App extends Component {
  constructor(){
    super();

    this.state = {
      cities: [
        {id: 1,
        name: 'France',
        cords: {lat: 46.227638, lon: 2.213749}},
        {id: 2,
        name: 'Canada',
        cords: {lat: 56.130366, lon: -106.346771}}
        ],
      show: false,

      nameCity:'',
      date:'',
      summary:'',
      humidity:'',
      pressure:'',
      temperature:'',
      wind:'',
    }
  }
  addNew = () => {
    this.setState({
      show: true
    })
  }

  //FOR THIS API ENABLE CORS
  getFranceWeather = (e) =>{
    e.preventDefault();
    
    const apiURL = 'https://api.darksky.net/forecast/2f951a609b541b2049d0bf23f70143d3/46.227638,2.213749'
    
    request
    .get(apiURL)
    .then(response => console.log(response));    
  }
  getCanadaWeather = (e) =>{
    e.preventDefault();
    
    const apiURL = 'https://api.darksky.net/forecast/2f951a609b541b2049d0bf23f70143d3/56.130366,-106.346771'
    
    request
    .get(apiURL)
    .then(response => console.log(response));   
  }

  //GET TEXT VALUE & COORDINATES
  inputValue = (e) =>{
    if(e.key === 'Enter'){

      //CITY NAME
      this.setState({
        nameCity: e.target.value
      })

    var cityInput = e.target.value;
    var API_GOOGLE = 'https://maps.googleapis.com/maps/api/geocode/json?address='+cityInput;
    
    //GET COORDINATES
    request
    .get(API_GOOGLE)
    .then(function(response){
      var lat = response.body.results[0].geometry.location.lat
      var lng = response.body.results[0].geometry.location.lng
      return [lat, lng]})
    .then(this.getClima)
    }
  }
  //FIND THE WEATHER BASSED ON COORDINATES
  getClima = (coordenadas) =>{
    const baseDark = 'https://api.darksky.net/forecast/2f951a609b541b2049d0bf23f70143d3/'

    var date = new Date().toLocaleDateString();
    var clima =''
    var humedad =''
    var presion = ''
    var temperatura = ''
    var aire = ''

    request
    .get(baseDark+coordenadas[0]+','+coordenadas[1])
    .then(function(response){
      clima = response.body.daily.summary;
      humedad = response.body.currently.humidity;
      presion = response.body.currently.pressure;
      temperatura = response.body.currently.temperature;
      aire = response.body.currently.windGust;


      return [date, clima, humedad, presion, temperatura, aire]
    })
      
      //SET THE TEXT OF SUMMARY
    .then(this.setMessage)
  }
  //FUNCTION USED SET THE TEXT OF SUMMARY
  setMessage = (valores) =>{
    this.setState({
      date:valores[0],
      summary:valores[1],
      humidity:valores[2],
      pressure:valores[3],
      temperature:valores[4],
      wind:valores[5],
    })
  }

  render(){

    
    return (
      <div className="App">
        <header className='app__header'>
          <button onClick={this.addNew}  className='app__add'>
            <i class="fa fa-plus-circle">New city</i>
          </button>
        </header>
      <div className='grid'>
        <aside className='app__aside'>
          <h1 className='app__title'>All countries</h1>
          <a onClick={this.getFranceWeather}  href='#' className='app__country'>France</a>
          <a onClick={this.getCanadaWeather}  href='#' className='app__country'>Canada</a>
          {this.state.show && <input autoFocus ref={this.patito}  onKeyUp={this.inputValue} type='text' placeholder='Location' className='app__input' />}
        </aside>
        <section className='app__view'>
        <h3>{this.state.nameCity}</h3>    
        <h4>{this.state.date}</h4>
        <h5>{this.state.summary}</h5>    
        <hr></hr>
        <p>Humidity: {this.state.humidity}</p>
        <p>Pressure: {this.state.pressure}</p>
        <p>Temperature: {this.state.temperature}</p>
        <p>Wind: {this.state.wind}</p>
        </section>
      </div>
      </div>
    );
  }
}

export default App;
