import React from 'react';
import './ads.css';

const Ads = () => {
  return (
    <div>
       <h2 className='fea-tag-h2'>Earn More from Your Instruments</h2>

    <div className="content">
     
      <div className="layout">
        <div className="ad1">
          <h3 vspace="0">Have music accessories to rent?</h3>
          <p>Join our platform and earn by renting out your unused<br />
          instruments and gear</p>
          <button className="rent-button">List music gears</button>
        </div>

        <div className="ad2">
          <h3 vspace="0">Maximize exposure for your items? </h3>
          <p>Boost your listings and reach more musicians by renting out your
          instruments and gear with us</p>
          <button className="boost-button">Boost your ads</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Ads;