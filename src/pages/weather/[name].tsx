import React, { useState } from 'react';
import { Button, Layout, Weather } from '@/components';

import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

let _ = require('lodash');

interface ICity {
  name: string;
}

const City = ({ name }: ICity) => {
  const router = useRouter();
  const { cityName } = router.query;

  const [range, setRange] = useState<number>(1);

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
  return { props: { name } };
};
