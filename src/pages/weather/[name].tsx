import React, { useCallback, useMemo, useState } from 'react';
import { Button, Layout, Weather } from '@/components';
import { parseData } from '@/utils/helpers';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { IWeather } from '@/types/interfaces';
let _ = require('lodash');



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

interface ICity {
  name: string;
  data: any;
}

const City = ({ name, data }: ICity) => {
  const router = useRouter();
  const [range, setRange] = useState<number>(3);
  const [format, setFormat] = useState<string>('compact');
  const week = useMemo(() => parseData(data), [data]);


  const returnWeather = useCallback(
    (day: IWeather, i: number) => {
      return <Weather key={i} variant={format} {...day} />;
    },
    [format]
  );

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
            <Button
              text='Today'
              onClick={() => {
                setRange(1);
                setFormat('wide');
              }}
            />
            <Button
              text='Three days'
              onClick={() => {
                setRange(3);
                setFormat('compact');
              }}
            />
            <Button
              text='Seven days'
              onClick={() => {
                setRange(7);
                setFormat('compact');
              }}
            />
          </div>
        </div>

        <div className='container__content'>
          {week
            .slice(0, range)
            .map((day: IWeather, i: number) => returnWeather(day, i))}
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
