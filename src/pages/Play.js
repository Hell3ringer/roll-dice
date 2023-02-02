import React, { Component } from 'react'
import '../css/Play.css'
export default class Play extends Component {
    constructor(props){
        super(props);
        
    }


    handleSubmit(){
        this.props.parentCallback(false);
        
    }
  render() {
    return (
      <div className='play'>
        <h1>
            Lets Play!
        </h1>
        <button onClick={() => this.handleSubmit()}>Play</button>
      </div>
    )
  }
}
