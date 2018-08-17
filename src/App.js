//DEPENDENCIES
import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';

//COMPONENTS

import About from './Components/About/About'
import Home from './Components/Home/Home'
import Terms from './Components/Terms/Terms'
import CityClima from './Components/CityClima'

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

  getNameCity = (e) =>{
    var nombreDeCiudad = (e.target.innerText)
  }
  render(){
    return (
      <div className="App">
        <header className='app__header'>
          <button onClick={this.addNew}  className='app__add'>
            <i className="fa fa-plus-circle">New city</i>
          </button>

          <Link to="/"> Home </Link>
          <Link to="/about"> About </Link>
          <Link to="/terms"> Terms </Link>

        </header>
        <div className='grid'>
          <aside className='app__aside'>
            <h1 className='app__title'>All countries</h1>
            {
              this.state.cities.map(city => {
                return <Link to={"/location/" + city.toLowerCase()}  onClick={this.getNameCity} className="app__country">{city}</Link>
              })
            }

            {this.state.show && <input autoFocus onKeyUp={this.inputValue.bind(this)} type='text' placeholder='Location' className='app__input' />}
          </aside>

          <section className='app__view container-view'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/terms' component={Terms} />
              <Route path='/location/:locationName' component={CityClima} />
            </Switch>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
