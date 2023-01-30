import { IWeather } from '@/types/interfaces';
let _ = require('lodash');

interface Data {
  [i: number]: {
    [i: number]: string | number;
  };
}

export const parseData = (data: any): IWeather[] => {
  let arr: any = [];

  if (data) {
    // Save needed data in helper variable
    let daily: Data[] = data.daily;

    /* 
      API returns data for seven days, so iterate through object entries
      for seven times and collect items into an object. 
      Push every object into an array.
    */

    for (let i = 0; i < 7; i++) {
      let obj: IWeather = {
        time: '',
        weathercode: 0,
        temperature_2m_max: 0,
        temperature_2m_min: 0,
        sunrise: '',
        sunset: '',
        rain_sum: 0,
        showers_sum: 0,
        snowfall_sum: 0,
      };

      for (const [key, value] of Object.entries(daily)) {
        _.set(obj, key, value[i]);
      }

      arr.push(obj);
    }
  }

  return arr;
};

/// Formatting

export const formatTime = (date: string): string => {
  return Intl.DateTimeFormat('fi-FI', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

export const formatDate = (date: string): string => {
  return Intl.DateTimeFormat('fi-FI', {
    day: '2-digit',
    month: '2-digit',
  }).format(new Date(date));
};

export const formatDay = (date: string): string => {
  return Intl.DateTimeFormat('fi-FI', {
    weekday: 'short',
  }).format(new Date(date));
};
