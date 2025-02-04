import React from 'react';
import './cardv3.css';

import pianoimg from '../../assets/proimage/piono.jpg'
import guitarimg from '../../assets/proimage/guitar.jpg'
import drumsimg from '../../assets/proimage/drmus.jpg'


const Cardv3 = () => {
  return (
    <div className="full-container">
         <h2 className='fea-tag-h2'>Featured</h2>
        <div className="card-container">
       
  
            {/* Third Card */}
            <div className="full card3">
                <div className="layout3">
                    <div className="container3">
                        <div className="image">
                            <img src={guitarimg} alt="" className='guitarimg'/>
                        </div>

                        <div className="title">
                            <p>JET JS-600 TRS Electric Guitar 
                            </p>
                        </div>

                        <div className="prices">
                            <div className="price1">
                            <p>daily</p>
                                <h3>Rs. 1,500</h3>
                            </div>
                            <div className="price2">
                                <p>weekly</p>
                                <h3>Rs. 6,000</h3>
                            </div>
                            <div className="price3">
                                <p>Monthly</p>
                                <h3>Rs. 20,000</h3>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
            <div className="full card3">
                <div className="layout3">
                    <div className="container3">
                        <div className="image">
                            <img src={pianoimg} alt="" className='pianoimg'/>
                        </div>

                        <div className="title">
                            <p>Steinway & Sons Model D Concert Grand Piano
                            </p>
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
                        
                        </div>
                    </div>
                </div>
            </div>
            <div className="full card3">
                <div className="layout3">
                    <div className="container3">
                        <div className="image">
                            <img src={drumsimg} alt="" className='drumsimg'/>
                        </div>

                        <div className="title">
                            <p>Yamaha PHX Series Drum Set 
                            </p>
                        </div>

                        <div className="prices">
                            <div className="price1">
                            <p>daily</p>
                                <h3>Rs. 2,500</h3>
                            </div>
                            <div className="price2">
                                <p>weekly</p>
                                <h3>Rs. 10,000</h3>
                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h2 className='fea-tag-h2'>Equipments</h2>
    </div>
    
  );
};

export default Cardv3;
