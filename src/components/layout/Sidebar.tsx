import React from 'react';
import { Search, Button } from '..';
import { Logo, PrevIcon } from '@/utils/icons';
import Link from 'next/link';

interface ISidebar {
  home?: boolean;
}

const Sidebar = ({ home }: ISidebar) => {
  return (
    <aside className='sidebar'>
      <div className='sidebar__content'>
        <Logo className='icon icon-site' />

        <div className='sidebar__description'>
          <p className='sidebar__title xl'>
            The <span className='accent'>Weather</span> Service
          </p>
          <p>View weather forecasts for the city of your choice. </p>
          <p>
            You can select cities all around the world and view their weather
            forecasts for up to 7 days.
          </p>
        </div>

        <Search label='Type something to search' />
      </div>

      <div className='sidebar__footer'>
        {!home && (
          <Link className='btn btn-outlined' href='/'>
            <PrevIcon className='icon icon-md' /> Back
          </Link>
        )}

        <div className='sidebar__item'>
          <p className='sm bold subtle'>
            Geolocating and Weather Forecast APIs &#169;{' '}
            <a href='https://open-meteo.com/'>Open-Meteo.com</a>
          </p>
        </div>

        <div className='sidebar__item'>
          <p className='sm subtle'>
            <span className='bold subtle'>Images</span> &#169;{' '}
            <a href='https://unsplash.com/photos/Y5SvRxiNYGI'>
              Nicolas Messifet
            </a>
            , <a href='https://unsplash.com/photos/OjRlFFuynik'>Jamo Images</a>{' '}
            and{' '}
            <a href='https://unsplash.com/photos/QW4LPPPSuWE'>Sini Tiainen</a>{' '}
            (Unsplash)
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
