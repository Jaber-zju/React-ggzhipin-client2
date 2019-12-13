import React,{Component} from 'react'
import './logo.css'
import logo from './logo.png'

export default class Logo extends Component {

  render(){
    return (
        <div className='logo'>
          <img src={logo} alt="logo"/>
        </div>
    )


  }
}

