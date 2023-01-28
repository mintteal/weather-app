import React, { useState } from 'react';
import { Button, Layout, Weather } from '@/components';

import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

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

const City = ({ name, data }: ICity) => {
  const router = useRouter();

  const [range, setRange] = useState<number>(1);
  console.log('city:', data);

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
    '&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,rain_sum,showers_sum,snowfall_sum&timezone=auto';

  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${city?.lat}&longitude=${city?.lon}${settings}`
  );
  const data = await res.json();

  return { props: { name, data } };
};
