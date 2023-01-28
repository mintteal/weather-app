import React from 'react';
import Select from 'react-select';

let _ = require('lodash');

interface ISearch {
  label: string;
}

const options = [
  {
    value: 'helsinki',
    label: 'Helsinki',
    lat: 60.17,
    lon: 24.95,
  },
  {
    value: 'tampere',
    label: 'Tampere',
    lat: 61.5,
    lon: 23.8,
  },
  {
    value: 'turku',
    label: 'Turku',
    lat: 60.45,
    lon: 22.28,
  },
];

const SearchInput = ({ label }: ISearch) => {
  return (
    <label className='form__label'>
      {_.capitalize(label)}
      <Select
        className='form__input form__input-search'
        classNamePrefix='form'
        options={options}
      />
    </label>
  );
};

export default SearchInput;
