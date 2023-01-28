import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Layout, Weather } from '@/components';

import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import update from 'immutability-helper';
let _ = require('lodash');

interface ICity {
  name: string;
  data: any;
}

const options = [
  {
    value: 'helsinki',
    lat: 60.17,
    lon: 24.95,
  },
  {
    value: 'tampere',
    lat: 61.5,
    lon: 23.8,
  },
  {
    value: 'turku',
    lat: 60.45,
    lon: 22.28,
  },
];

interface Weather {
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

interface Data {
  [i: number]: {
    [i: number]: string | number;
  };
}

const City = ({ name, data }: ICity) => {
  const router = useRouter();

  const parseData = () => {
    let arr: any = [];

    if (data) {
      // Save needed data in helper variable
      let daily: Data[] = data.daily;

      let obj: Weather = {
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

      /* 
        API returns data for seven days, so iterate through object entries
        for seven times and set connected values to an object. 
        Push every object into an array.
        */

      for (let i = 0; i < 7; i++) {
        for (const [key, value] of Object.entries(daily)) {
          _.set(obj, [key], [value][0][i]);
        }

        arr.push(obj);
      }
    }
    return arr;
  };

  const week = useMemo(() => parseData(), []);

  const returnWeather = useCallback((day: Weather, i: number) => {
    return <Weather key={i} />;
  }, []);

  if (router.isFallback) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className='container container-city'>
        <div className='container__header'>
          <h1>{_.capitalize(name)}</h1>
          <div className='container__row'>
            <Button text='Today' />
            <Button text='Three days' />
            <Button text='Seven days' />
          </div>
        </div>

        <div className='container__content'>
          {week.map((day: Weather, i: number) => returnWeather(day, i))}
          <Weather />
          <Weather />
        </div>
      </section>
    </Layout>
  );
};

export default City;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { name: '*' } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const name = (await params?.name) as string;
  const city = await options.find((option) => option.value === name);

  const settings =
    '&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,showers_sum,snowfall_sum&timezone=auto';

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${city?.lat}&longitude=${city?.lon}${settings}`
  );
  const data = await res.json();

  return { props: { name, data } };
};
