import React from 'react'
import './singleDay.css'

class SingleDay extends React.Component{
    render() {
      return (
        <div className="single">
            <div className="single__icon" >
                <img herf={this.props.icon} alt="Today Weather"  />
            </div>
            <h6 className="single__temperature">{this.props.temperature}</h6>
            <p>Temperture</p>
            <h6 className="single__presure">{this.props.presure}</h6>
            <p>Presure</p>
            <h6 className="single__wind">{this.props.wind}</h6>
            <p>Wind</p>
        </div>
      )
    }
}

export default SingleDay;