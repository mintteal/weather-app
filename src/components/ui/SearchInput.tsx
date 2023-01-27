import React from 'react';
import Select from 'react-select';

let _ = require('lodash');

interface ISearch {
  label: string;
}

const options = [
  {
    value: 'Helsinki',
    label: 'Helsinki',
    lat: 60.17,
    lon: 24.95,
  },
  {
    value: 'Tampere',
    label: 'Tampere',
    lat: 61.5,
    lon: 23.8,
  },
  {
    value: 'Turku',
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
        isMulti
        className='form__input form__input-search'
        classNamePrefix='form'
        options={options}
      />
    </label>
  );
};

export default SearchInput;