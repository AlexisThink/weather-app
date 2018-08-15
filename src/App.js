import React, { Component } from 'react';
import SingleDay from './Components/singleDay/SingleDay'
import request from 'superagent'; //npm install --save superagent
import './Components/singleDay/singleDay.css'
import './App.css'

class App extends Component {
  constructor(){
    super();

    this.state = {
      cities: ['USA', 'Mexico', 'Colombia'],
      show: false,

      myArray:[],
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
      ['../src/images/clear-day.svg',
      './images/clear-night.svg',
      'https://image.flaticon.com/icons/svg/427/427112.svg',
      './images/snow.svg',
      './images/sleet.svg',
      './images/wind.svg',
      './images/fog.svg',
      './images/cloudy.svg',
      './images/partly-cloudy-day.svg',
      './images/partly-cloudy-night.svg',
      './images/hail.svg',
      './images/thunderstorm.svg',
      './images/tornado.svg']

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
      var dias = response.body.daily.data;
      var extractoDias = [];

      dias.map(dia =>{

        var icon = dia.icon;
        var temperature = dia.temperatureLow;
        var presure = dia.pressure;
        var wind = dia.windSpeed

        var currentObject = {icon: icon, temperature: temperature, presure: presure, wind: wind}
        extractoDias.push(currentObject);
      })
      return extractoDias
    })
    .then(this.settingValues)
  }
  settingValues = (array) =>{
    
      this.setState({
        myArray: array
      })
   console.log(this.state.myArray) 
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
            {
              this.state.myArray.map(dia =>{

                var iconSet = ''
                if(dia.icon === this.state.tiempoTextos[0]){
                  iconSet = this.state.tiempoIcons[0]}
                if(dia.icon === this.state.tiempoTextos[1]){
                  iconSet = this.state.tiempoIcons[1]}
                if(dia.icon === this.state.tiempoTextos[2]){
                  iconSet = this.state.tiempoTextos[2]}
                if(dia.icon === this.state.tiempoTextos[3]){
                  iconSet = this.state.tiempoIcons[3]}
                if(dia.icon === this.state.tiempoTextos[4]){
                  iconSet = this.state.tiempoIcons[4]}
                if(dia.icon === this.state.tiempoTextos[5]){
                  iconSet = this.state.tiempoIcons[5]}
                if(dia.icon === this.state.tiempoTextos[6]){
                  iconSet = this.state.tiempoIcons[6]}
                if(dia.icon === this.state.tiempoTextos[7]){
                  iconSet = this.state.tiempoIcons[7]}
                if(dia.icon === this.state.tiempoTextos[8]){
                  iconSet = this.state.tiempoIcons[8]}
                if(dia.icon === this.state.tiempoTextos[9]){
                  iconSet = this.state.tiempoIcons[9]}
                if(dia.icon === this.state.tiempoTextos[10]){
                  iconSet = this.state.tiempoIcons[10]}
                if(dia.icon === this.state.tiempoTextos[11]){
                  iconSet = this.state.tiempoIcons[11]}
                if(dia.icon === this.state.tiempoTextos[12]){
                  iconSet = this.state.tiempoIcons[12]}
           
                  console.log(iconSet)

                return <SingleDay icon={iconSet} temperature={dia.temperature} presure={dia.presure} wind={dia.wind} />
              })
            }
          </section>
        </div>
      </div>
    );
  }
}

export default App;
