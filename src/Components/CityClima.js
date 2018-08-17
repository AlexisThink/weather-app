import React from 'react';
import request from 'superagent';

import SingleDay from './singleDay/SingleDay';
import SingleHour from './singleHour/SingleHour';


import '../extras.css'

import clearDay from '../images/clear-day.svg'
import clearNight from '../images/clear-night.svg'
import rain from '../images/rain.svg';
import snow from '../images/snow.svg';
import sleet from '../images/sleet.svg'
import wind from '../images/wind.svg';
import fog from '../images/fog.svg';
import cloudy from '../images/cloudy.svg'
import partlyCloudy from '../images/partly-cloudy-day.svg'
import partlyCloudyNight from '../images/partly-cloudy-night.svg';
import hail from '../images/hail.svg';
import thunderstorm from '../images/thunderstorm.svg';
import tornado from '../images/tornado.svg';

class CityClima extends React.Component{

  constructor(){
    super();

    this.state = {
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

  getNameCity = (e) => {
    var nameCity = e.target.innerText
    var API_GOOGLE = 'https://maps.googleapis.com/maps/api/geocode/json?address='+nameCity;

    console.log(API_GOOGLE)

    //GET COORDINATES
    request
    .get(API_GOOGLE)
    .then(function(response){
      var lat = response.body.results[0].geometry.location.lat
      var lng = response.body.results[0].geometry.location.lng
      return [lat, lng]})
    .then(this.getClima)
  }

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
    render() {
      return (
        <div>
        <h3 onClick={this.getNameCity}>{this.props.match.params.locationName}</h3>

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
        </div>
      )
    }
}

export default CityClima