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
      <Logo className='icon icon-site' />

      <div className='sidebar__description'>
        <p className='-xl'>Forecasts</p>
        <p>View weather forecasts for the city of your choice. </p>
        <p>
          You can select several cities, view their weather forecasts for 1 to 7
          days and remove cities from the view.
        </p>
      </div>

      <Search label='Search city' />

      {!home && (
        <Link className='btn btn-outlined' href='/'>
          <PrevIcon className='icon icon-md' /> Back
        </Link>
      )}
    </aside>
  );
};

export default Sidebar;
