import React from 'react';

interface IWeatherItem {
  title: string;
  icon: React.SVGProps<SVGElement>;
  text: string;
}

const WeatherItem = ({ title, icon, text }: IWeatherItem) => {
  return (
    <div title={title} className='weather__item'>
      <>
        {icon}
        <p className='subtle sm'>{text}</p>
      </>
    </div>
  );
};

export default WeatherItem;
