import React from 'react'
import Footer from '../components/Footer';
import '../css/global.css'
import '../css/home.css'

import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <main>
        <header>
            <div className="container">
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
                                <a href="#roadmap" className='d-flex gap-2 align-items-center learn'>
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
        </header>
        <section id="roadmap" className="roadmap">
            <div className="roadmap-container container">
                <h1 className="title">Roadmap</h1>
                <div className="content">
                    <div className="cards">
                        <div className=" cards-container container">
                            <h3 className="subtitle">Q4 2022</h3>
                            <ul>
                                <li>
                                    <p>• Implementation of Evmos Name Service (Evmos Domains).</p>
                                </li>
                                <li>
                                    <p>• Custom image upload for expenses creations.</p>
                                </li>
                                <li>
                                    <p>• Ability to cancel an expense with automatic refund to the parties that had paid.</p>
                                </li>
                                <li>
                                    <p>• Share link button to send expense efficiently to the debtors.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="cards">
                        <div className="cards-container container">
                            <h3 className="subtitle">Q1 2023</h3>
                            <ul>
                                <li>
                                    <p>• Notification implementation.</p>
                                </li>
                                <li>
                                    <p>• Anti spam system. Only your contacts can add you to an expense.</p>
                                </li>
                                <li>
                                    <p>• Automatic swap from desired coin to expense's coin when paying.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="cards">
                        <div className="cards-container container">
                            <h3 className="subtitle">Q2 2023</h3>
                            <ul>
                                <li>
                                    <p>• Multiple blockchains compatibility.</p>
                                </li>
                                <li>
                                    <p>• Automatic creation of recurring payments.</p>
                                </li>
                                <li>
                                    <p>• Dynamic expense form.</p>
                                </li>
                                <li>
                                    <p>• And more constant updates.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </main>
  )
}