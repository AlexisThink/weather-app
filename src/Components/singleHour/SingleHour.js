import React from 'react'
import './singleHour.css'

class SingleHour extends React.Component{
    render() {
      return (
        <div className ="hour">
         <h6>Time</h6>
         <p>{this.props.hour}</p>
         <h6>Temperature</h6>
         <p>{this.props.temperature}</p>
         <h6>Summary</h6>
         <p>{this.props.summary}</p>
         <h6>Wind Speed</h6>
         <p>{this.props.windSpeed}</p>
         <h6>Pressure</h6>
         <p>{this.props.presure}</p>
        </div>
      )
    }
}
export default SingleHour