import React from 'react';
import { WeatherItem } from '../index';
import { formatDate, formatDay, formatTime } from '@/utils/helpers';
import {
  Droplet,
  Snowflake,
  Sunrise,
  Sunset,
  Temperature,
} from '@/utils/icons';
import { IWeather } from '@/types/interfaces';

const codes = require('@/utils/weathercodes');

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
  snowfall_sum,
  variant,
}: ICard) => {
  return (
    <div className={`weather weather-${variant}`}>
      <div className='weather__dates'>
        <p className='md'>{formatDate(time)}</p>
        <p className='sm subtle'>{formatDay(time)}</p>
      </div>

      <div className='weather__info'>
        <div className={`weather__icon weather__icon-${weathercode}`}></div>
        <p title='Max temperature' className='xxl'>
          {temperature_2m_max} &#176;C
        </p>
        <span className='sm subtle'>{codes.WEATHER[weathercode]}</span>
      </div>

      <div className='weather__details'>
        <WeatherItem
          title='Min temperature'
          icon={<Temperature />}
          text={`${temperature_2m_min} °C`}
        />

        <WeatherItem
          title='Precipitation'
          icon={temperature_2m_min > 0 ? <Droplet /> : <Snowflake />}
          text={
            temperature_2m_min > 0 ? `${rain_sum} mm` : `${snowfall_sum} cm`
          }
        />

        {variant === 'wide' && (
          <>
            <WeatherItem
              title='Sunrise'
              icon={<Sunrise />}
              text={formatTime(sunrise)}
            />

            <WeatherItem
              title='Sunset'
              icon={<Sunset />}
              text={formatTime(sunset)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
