import React, { Component } from 'react';
import './App.css'

class App extends Component {
  constructor(){
    super();

    this.state = {
      show: false
    }
  }

  addNew = () =>{
    console.log('Funciona el boton Add')
    this.setState({
      show: true
    })
  }

  textFind = () =>{
    console.log('Estas escribiendo')
  }

  render() {
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
          <a href='#' className='app__country'>France</a>

          {this.state.show && <input autoFocus onKeyUp={this.textFind} type='text' placeholder='Location' className='app__input' />}
        </aside>
        <section className='app__view'>Text</section>
      </div>
      </div>
    );
  }
}

export default App;
