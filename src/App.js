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
      summary:''
    }
  }
  addNew = () =>{
    this.setState({
      show: true
    })
  }

  //For this API enable CORS
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
    const baseDark = 'https://api.darksky.net/forecast/2f951a609b541b2049d0bf23f70143d3/'
    
    request
    .get(apiURL)
    .then(response => console.log(response));   
  }

  getClima = (coordenadas) =>{
    const baseDark = 'https://api.darksky.net/forecast/2f951a609b541b2049d0bf23f70143d3/'
    var clima =''
    request
    .get(baseDark+coordenadas[0]+','+coordenadas[1])
    .then(function(response){
      clima = response.body.daily.summary;
      return clima
    })
    .then(this.setMessage)


  }

  setMessage = (clima) =>{
    this.setState({
      summary: clima
    })
  }
  inputValue = (e) =>{
    e.preventDefault();
    var cityInput = e.currentTarget.value;
    var API_GOOGLE = 'https://maps.googleapis.com/maps/api/geocode/json?address='+cityInput;
    
    request
    .get(API_GOOGLE)
    .then(function(response){
      var lat = response.body.results[0].geometry.location.lat
      var lng = response.body.results[0].geometry.location.lng
  
      console.log(lat);
      console.log(lng);
      return [lat, lng]
    })
    .then(this.getClima)
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
          {this.state.show && <input autoFocus onKeyUp={this.inputValue} type='text' placeholder='Location' className='app__input' />}
        </aside>
        <section className='app__view'>{this.state.summary}</section>
      </div>
      </div>
    );
  }
}

export default App;
