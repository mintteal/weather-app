import React from 'react';
import {
  PartlyCloudy,
  Snowflake,
  Sunrise,
  Sunset,
  Temperature,
} from '@/utils/icons';


const Weather = () => {
  return (
    <div className='weather weather-wide'>
      <div className='weather__dates'>
        <p>27.1.</p>
        <p>Fri</p>
      </div>

      <div className='weather__info'>
        <PartlyCloudy className='icon icon-compact' />
        <p>Parly cloudy</p>
      </div>

      <div className='weather__details'>
        <div className='weather__item'>
          <Temperature className='icon' />
          <p>-1 - 2 &#176;C</p>
        </div>
        <div className='weather__item'>
          <Snowflake className='icon' />
          <p>0 cm</p>
        </div>
        <div className='weather__item'>
          <Sunrise className='icon' />
          <p>08:58</p>
        </div>
        <div className='weather__item'>
          <Sunset className='icon' />
          <p>16:12</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;
