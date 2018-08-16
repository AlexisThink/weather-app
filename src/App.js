//DEPENDENCIES
import React, { Component } from 'react';
import request from 'superagent'; //npm install --save superagent

//COMPONENTS
import SingleDay from './Components/singleDay/SingleDay';
import SingleHour from './Components/singleHour/SingleHour';
import About from './Components/About/About'
import Home from './Components/Home/Home'
import Terms from './Components/Terms/Terms'

//CSS
import './App.css'
import './extras.css'

//RESOURCES
import clearDay from './images/clear-day.svg'
import clearNight from './images/clear-night.svg'
import rain from './images/rain.svg';
import snow from './images/snow.svg';
import sleet from './images/sleet.svg'
import wind from './images/wind.svg';
import fog from './images/fog.svg';
import cloudy from './images/cloudy.svg'
import partlyCloudy from './images/partly-cloudy-day.svg'
import partlyCloudyNight from './images/partly-cloudy-night.svg';
import hail from './images/hail.svg';
import thunderstorm from './images/thunderstorm.svg';
import tornado from './images/tornado.svg';

class App extends Component {
  constructor(){
    super();

    this.state = {
      cities: ['USA', 'Mexico', 'Colombia'],
      show: false,

      myArray:[],
      myArrayHours:[],

      tiempoTextos:
      ['clear-day',
        'clear-night',
        'rain',
        'snow',
        'sleet',
        'wind',
        'fog',
        'cloudy',
        'partly-cloudy-day',
        'partly-cloudy-night',
        'hail',
        'thunderstorm',
        'tornado'],
      tiempoIcons:
      [clearDay,
      clearNight,
      rain,
      snow,
      sleet,
      wind,
      fog,
      cloudy,
      partlyCloudy,
      partlyCloudyNight,
      hail,
      thunderstorm,
      tornado]
    }
  }

  //BUTTON TO ADD NEW CITY
  addNew = () => {
    this.setState({
      show: true
    })
  }
  //GET TEXT VALUE
   inputValue = (e) =>{
    if(e.keyCode === 13){
      //GET VALUE IN ENTER
      this.state.cities.push(e.target.value)
      //HIDE INPUT
      this.setState({
        show: false,
      })
    }
  }
  //GET COORDINATES
  getNameCity = (e) => {
    var nameCity = e.target.innerText;
    var API_GOOGLE = 'https://maps.googleapis.com/maps/api/geocode/json?address='+nameCity;

    //SET NAME CITY SELECTED
    this.setState({
      nameCity: nameCity
    })

    //GET COORDINATES
    request
    .get(API_GOOGLE)
    .then(function(response){
      var lat = response.body.results[0].geometry.location.lat
      var lng = response.body.results[0].geometry.location.lng
      return [lat, lng]})
    .then(this.getClima)
  }

 
  //FIND THE WEATHER BASSED ON COORDINATES
  getClima = (coordenadas) =>{
    const baseDark = 'https://api.darksky.net/forecast/2f951a609b541b2049d0bf23f70143d3/'

    request
    .get(baseDark+coordenadas[0]+','+coordenadas[1])
    .then(function(response){
      //WEATHER DAYS
      var dias = response.body.daily.data;
      var extractoDias = [];
      //ARRAY OF DAYS
      dias.map(dia =>{

        var icon = dia.icon;
        var temperature = dia.temperatureLow;
        var presure = dia.pressure;
        var wind = dia.windSpeed;

        var currentObject = {icon: icon, temperature: temperature, presure: presure, wind: wind}
        extractoDias.push(currentObject);
      })

      //WEATHER HOUR
      var horas = response.body.hourly.data;
      var contador = 0;
      var extractoHoras = [];
      //ARRAY OF HOURS

      console.log(horas)


      horas.map(hora =>{
        if(contador <= 7){
          contador += 1;

          var hour = hora.time;
          var temperature = hora.temperature;
          var summary = hora.summary;
          var windSpeed = hora.windSpeed;
          var presure = hora.pressure;
  
          var currentHoras = {hour: hour, temperature: temperature, summary: summary, wind: windSpeed, presure: presure}
          extractoHoras.push(currentHoras);
        }
      })

      return [extractoDias, extractoHoras]
    })
    .then(this.settingValues)
  }
  settingValues = (arrays) =>{
      this.setState({
        myArray: arrays[0],
        myArrayHours: arrays[1]
      })
  }

  //SETTING ICON TO RENDER IN THE SINGLE DAY CARD
  settingIcon = (diaIcon) =>{
    var iconSet = ''

    if(diaIcon === this.state.tiempoTextos[0]){
      iconSet = this.state.tiempoIcons[0]}
    if(diaIcon === this.state.tiempoTextos[1]){
      iconSet = this.state.tiempoIcons[1]}
    if(diaIcon === this.state.tiempoTextos[2]){
      iconSet = this.state.tiempoIcons[2]}
    if(diaIcon === this.state.tiempoTextos[3]){
      iconSet = this.state.tiempoIcons[3]}
    if(diaIcon === this.state.tiempoTextos[4]){
      iconSet = this.state.tiempoIcons[4]}
    if(diaIcon === this.state.tiempoTextos[5]){
      iconSet = this.state.tiempoIcons[5]}
    if(diaIcon === this.state.tiempoTextos[6]){
      iconSet = this.state.tiempoIcons[6]}
    if(diaIcon === this.state.tiempoTextos[7]){
      iconSet = this.state.tiempoIcons[7]}
    if(diaIcon === this.state.tiempoTextos[8]){
      iconSet = this.state.tiempoIcons[8]}
    if(diaIcon === this.state.tiempoTextos[9]){
      iconSet = this.state.tiempoIcons[9]}
    if(diaIcon === this.state.tiempoTextos[10]){
      iconSet = this.state.tiempoIcons[10]}
    if(diaIcon === this.state.tiempoTextos[11]){
      iconSet = this.state.tiempoIcons[11]}
    if(diaIcon === this.state.tiempoTextos[12]){
      iconSet = this.state.tiempoIcons[12]}

      return iconSet
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
            {
              this.state.cities.map(city => {
                return <a onClick={this.getNameCity} className="app__country">{city}</a>
              })
            }

            {this.state.show && <input autoFocus onKeyUp={this.inputValue.bind(this)} type='text' placeholder='Location' className='app__input' />}
          </aside>
          <section className='app__view container-view'>
            <h4>Weather for the next 7 days (Including Today)</h4>
            <div className="container-dias">
              {
                this.state.myArray.map(dia =>{
                  return <SingleDay icon={this.settingIcon(dia.icon)} temperature={dia.temperature} presure={dia.presure} windSpeed={dia.wind} />
                })
              }
            </div>
            <h4>Weather per hour for Today</h4>
            <div className="container-horas">
              {
                this.state.myArrayHours.map(hora =>{
                    return <SingleHour hour={new Date(hora.hour).toLocaleDateString()} temperature={hora.temperature} summary={hora.summary} windSpeed={hora.wind} presure={hora.presure} />
                })
              } 
            </div>
          
            <Home />
            <About />
            <Terms />  

          </section>
        </div>
      </div>
    );
  }
}

export default App;
