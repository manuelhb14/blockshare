import React from 'react'
import '../css/global.css'
import '../css/home.css'

import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <div className='container d-flex' style={{border: '2px solid red'}}>
        <div>
            <img src='img/bg-img.png' className='bg-img'></img>
        </div>
        <div>
            <p className='texts-t1'>Manage and keep track of your group expenses</p>
            <div>
                <NavLink to='/dashboard'>
                    Launch app
                </NavLink>
                <a>Learn more</a>
            </div>
            <div>
                <p>Powered by</p>
                <p>Evmos</p>
            </div>
        </div>
            
      
    </div>
  )
}