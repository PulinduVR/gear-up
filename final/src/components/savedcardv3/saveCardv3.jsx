import React from 'react';
import './SavedCardv3.css';
import { FaHeart } from 'react-icons/fa';  // Import the heart icon

import pianoimge from '../../assets/proimage/piono.jpg';
import amped from '../../assets/proimage/amped.jpg';
import orgon from '../../assets/proimage/orgon.jpg';

const SavedCardv3 = () => {
  return (
    <div className="full-container">
         <h2 className='fea-tag-h2'>Featured</h2>
        <div className="card-container">
       
            {/* First Card */}
            <div className="full card3">
                <div className="layout3">
                    <div className="container3">
                        <div className="image">
                            <img src={pianoimge} alt="" className='guitarimg'/>
                        </div>

                        <div className="title">
                            {/* Add the heart icon here */}
                            <div className="heart-icon">
                                <FaHeart />
                            </div>
                            <p>Chauvet DJ Hurricane 1600 Fog Machine with Wired Timer & Remote Control</p>
                        </div>

                        <div className="prices">
                            <div className="price1">
                                <p>daily</p>
                                <h3>Rs. 5,000</h3>
                            </div>
                            <div className="price2">
                                <p>weekly</p>
                                <h3>Rs. 16,000</h3>
                            </div>
                            <div className="price3">
                                <p>Monthly</p>
                                <h3>Rs. 50,000</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Second Card */}
            <div className="full card3">
                <div className="layout3">
                    <div className="container3">
                        <div className="image">
                            <img src={amped} alt="" className='pianoimg'/>
                        </div>

                        <div className="title">
                            {/* Add the heart icon here */}
                            <div className="heart-icon">
                                <FaHeart />
                            </div>
                            <p>KRK Rokit 8 G4 Powered Professional Bi-Amped Studio Monitor</p>
                        </div>

                        <div className="prices">
                            <div className="price1">
                                <p>daily</p>
                                <h3>Rs. 5,000</h3>
                            </div>
                            <div className="price2">
                                <p>weekly</p>
                                <h3>Rs. 16,000</h3>
                            </div>
                            <div className="price3">
                                <p>Monthly</p>
                                <h3>Rs. 50,000</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Third Card */}
            <div className="full card3">
                <div className="layout3">
                    <div className="container3">
                        <div className="image">
                            <img src={orgon} alt="" className='drumsimg'/>
                        </div>

                        <div className="title">
                            {/* Add the heart icon here */}
                            <div className="heart-icon">
                                <FaHeart />
                            </div>
                            <p>Yamaha P-125 88-Key Graded Hammer Standard (GHS)</p>
                        </div>

                        <div className="prices">
                            <div className="price1">
                                <p>daily</p>
                                <h3>Rs. 5,000</h3>
                            </div>
                            <div className="price2">
                                <p>weekly</p>
                                <h3>Rs. 16,000</h3>
                            </div>
                            <div className="price3">
                                <p>Monthly</p>
                                <h3>Rs. 50,000</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SavedCardv3;
