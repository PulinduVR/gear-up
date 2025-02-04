import React from 'react';
import './catcard.css';

import music_ins from '../../assets/music instruments.png';
import audio from '../../assets/audio equipments.png';
import sound from '../../assets/PA & live sound.png';
import light from '../../assets/lighting & stage eq.png';
import studio from '../../assets/studio eq.png';

import guitar from '../../assets/guitar & bass.png';
import percussion from '../../assets/percussion accessories.png';
import dj from '../../assets/dj & performance.png';
import cables from '../../assets/cables.png';
import sheet from '../../assets/sheet music.png';

import event from '../../assets/event & venue.png';
import cases from '../../assets/cases & transport.png';
import other from '../../assets/battery & other.png';

const Catcard = () => {
    return (
        <div className="fullsection">
            <div className="grid-container">
                {/* Row 1 */}
                <div className="set1">
                    <div><img src={music_ins} alt="Music Instruments" className="music_card" /></div>
                    <div><img src={audio} alt="Audio Equipment" className="audio_card" /></div>
                    <div><img src={sound} alt="PA & Live Sound" className="pa_card" /></div>
                    <div><img src={light} alt="Lighting" className="light_card" /></div>
                    <div><img src={studio} alt="Studio Equipment" className="studio_card" /></div>
                </div>

                {/* Row 2 */}
                <div className="set2">
                    <div><img src={guitar} alt="Guitar & Bass" className="guitar_card" /></div>
                    <div><img src={percussion} alt="Percussion Accessories" className="percussion_card" /></div>
                    <div><img src={dj} alt="DJ & Performance" className="dj_card" /></div>
                    <div><img src={cables} alt="Cables" className="cables_card" /></div>
                    <div><img src={sheet} alt="Sheet Music" className="sheet_card" /></div>
                </div>

                {/* Row 3 */}
                <div className="set3">
                    <div><img src={event} alt="Event Equipment" className="event_card" /></div>
                    <div><img src={cases} alt="Cases" className="cases_card" /></div>
                    <div><img src={other} alt="Other Items" className="other_card" /></div>
                </div>
            </div>
        </div>
    );
};

export default Catcard;
