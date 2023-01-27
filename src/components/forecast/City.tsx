import React, { useState } from 'react';
import { Button, Weather } from '../';

interface ICity {
  name: string;
}

const City = ({ name }: ICity) => {
  const [range, setRange] = useState<number>(1);

  return (
    <section className='container container-city'>
      <div className='container__header'>
        <h1>{name}</h1>
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
  );
};

export default City;
