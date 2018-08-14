import React from 'react'
import './singleDay.css'

class SingleDay extends React.Component{
    render() {
      return (
        <div className="single">
            <div className="single__icon" >
                <img herf={this.props.icon}/>
            </div>
            <h6 className="single__day">{this.props.day}</h6>
            <h6 className="single__temperature">{this.props.temperature}</h6>
            <h6 className="single__presure">{this.props.presure}</h6>
            <h6 className="single__wind">{this.props.wind}</h6>
        </div>
      )
    }
}

export default SingleDay;