import React from 'react';

import { formatDate, formatDay, formatTime } from '@/utils/helpers';
import {
  PartlyCloudy,
  Snowflake,
  Sunrise,
  Sunset,
  Temperature,
} from '@/utils/icons';

interface IWeather {
  time: string;
  weathercode: number;
  temperature_2m_max: number;
  temperature_2m_min: number;
  sunrise: string;
  sunset: string;
  rain_sum: number;
  showers_sum: number;
  snowfall_sum: number;
}

interface ICard extends IWeather {
  variant: string;
}

const Weather = ({
  time,
  weathercode,
  temperature_2m_max,
  temperature_2m_min,
  sunrise,
  sunset,
  rain_sum,
  showers_sum,
  snowfall_sum,
  variant,
}: ICard) => {
  return (
    <div className={`weather weather-${variant}`}>
      <div className='weather__dates'>
        <p>{formatDate(time)}</p>
        <p>{formatDay(time)}</p>
      </div>

      <div className='weather__info'>
        <PartlyCloudy className='icon icon-compact' />
        <p>Parly cloudy</p>
      </div>

      <div className='weather__details'>
        <div className='weather__item'>
          <Temperature className='icon' />
          <p>
            {temperature_2m_min} - {temperature_2m_max} &#176;C
          </p>
        </div>
        <div className='weather__item'>
          <Snowflake className='icon' />
          <p>{snowfall_sum} cm</p>
        </div>

        {variant === 'wide' && (
          <>
            <div className='weather__item'>
              <Sunrise className='icon' />
              <p>{formatTime(sunrise)}</p>
            </div>
            <div className='weather__item'>
              <Sunset className='icon' />
              <p>{formatTime(sunset)}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
