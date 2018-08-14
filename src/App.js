import React, { Component } from 'react';
import request from 'superagent'; //npm install --save superagent
import SingleDay from './Components/singleDay/SingleDay'
import './App.css'

class App extends Component {
  constructor(){
    super();

    this.state = {
      cities: ['USA', 'Mexico', 'Colombia'],
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

    var date = new Date().toLocaleDateString();
    var clima =''
    var humedad =''
    var presion = ''
    var temperatura = ''
    var aire = ''

    request
    .get(baseDark+coordenadas[0]+','+coordenadas[1])
    .then(function(response){
      clima = response.body.currently.summary;
      humedad = response.body.currently.humidity;
      presion = response.body.currently.pressure;
      temperatura = response.body.currently.temperature;
      aire = response.body.currently.windGust;

      console.log()
      return [date, clima, humedad, presion, temperatura, aire]
    })
      
      //SET THE TEXT OF SUMMARY
    .then(this.setMessage)
  }
  //FUNCTION USED TO SET THE TEXT OF ALL VALUES
  setMessage = (valores) =>{
    this.setState({
      date:valores[0],
      summary:valores[1],
      humidity:'Humidity: ' + valores[2],
      pressure:'Pressure: ' + valores[3],
      temperature:'Temperature: ' + valores[4],
      wind:'Wind: ' + valores[5],
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

            {
              this.state.cities.map(city => {
                return <a onClick={this.getNameCity} className="app__country">{city}</a>
              })
            }

            {this.state.show && <input autoFocus onKeyUp={this.inputValue.bind(this)} type='text' placeholder='Location' className='app__input' />}
          </aside>
          
          <section className='app__view'>
            <h3>{this.state.nameCity}</h3>    
            <h4>{this.state.date}</h4>
            <h5>{this.state.summary}</h5>    
            <hr></hr>
            <p>{this.state.humidity}</p>
            <p>{this.state.pressure}</p>
            <p>{this.state.temperature}</p>
            <p>{this.state.wind}</p>
            <SingleDay />
          </section>
        </div>

      </div>
    );
  }
}

export default App;
