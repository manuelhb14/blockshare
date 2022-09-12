import React from 'react'
import '../css/global.css'
import '../css/home.css'

import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <div className='container main'>
        <div className="row">
            <div className="left d-none d-sm-none  d-md-block col-md-6">
                <img src='img/bg-img.png' className='bg-img'></img>
            </div>
            <div className="right col-sm-12 col-md-6 d-flex align-items-center" >
                <div className='text-right'>
                    <p className='texts-t1 title-text mb-4'>Manage and keep track of your group expenses</p>
                    <div className='d-inline-flex align-items-center gap-4 mb-4'>
                        <NavLink to='/dashboard' className='buttons'>
                            Launch app
                        </NavLink>
                        <a className='d-flex gap-2 align-items-center learn'>
                            <p className='mb-0'>Learn more</p>
                            <img src='img/icon/arrow.svg' className='arrow'>
                            </img>
                        </a>  
                    </div>
                    <div className='d-flex align-items-center gap-3'>
                        <p className='powered mb-0'>Powered by</p>
                        <img src='img/logo/evmos-logo.svg' className='evmos-logo'></img>
                    </div>
                </div>
            </div>
        </div>    
    </div>
  )
}