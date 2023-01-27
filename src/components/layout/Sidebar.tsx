import React from 'react';
import { Search, Button } from '..';
import { Logo, PrevIcon } from '@/utils/icons';

const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <Logo className='icon icon-site' />

      <Search label='Search city' />

      <Button
        variant='outlined'
        icon={<PrevIcon className='icon icon-md' />}
        text='Back'
      />
    </aside>
  );
};

export default Sidebar;
