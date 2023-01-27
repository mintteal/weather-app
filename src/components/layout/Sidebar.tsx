import React from 'react';
import { Search, Button } from '..';
import { Logo, PrevIcon } from '@/utils/icons';

interface ISidebar {
  home?: boolean;
}

const Sidebar = ({ home }: ISidebar) => {
  return (
    <aside className='sidebar'>
      <Logo className='icon icon-site' />

      <Search label='Search city' />

      {!home && (
        <Button
          variant='outlined'
          icon={<PrevIcon className='icon icon-md' />}
          text='Back'
        />
      )}
    </aside>
  );
};

export default Sidebar;
