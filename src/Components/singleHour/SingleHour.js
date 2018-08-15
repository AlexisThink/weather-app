import React from 'react'
import 'singleHour.css'

class SingleHour extends React.Component{
    render() {
      return (
        <div className ="hour">
         <p>{this.props.hour}</p>
         <p>{this.props.temperature}</p>
         <p>{this.props.summary}</p>
         <p>{this.props.windSpeed}</p>
         <p>{this.props.presure}</p>
        </div>
      )
    }
}

export default SingleHour