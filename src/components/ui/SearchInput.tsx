import Link from 'next/link';
import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

let _ = require('lodash');

interface ISearch {
  label: string;
}

const options = [
  {
    value: 'helsinki',
    label: (
      <Link
        href={{
          pathname: '/weather/helsinki/',
          query: { lat: '60.17', lon: '24.95' },
        }}
      >
        Helsinki
      </Link>
    ),
  },
  {
    value: 'tampere',
    label: (
      <Link
        href={{
          pathname: '/weather/tampere/',
          query: { lat: '61.5', lon: '23.8' },
        }}
      >
        Tampere
      </Link>
    ),
  },
  {
    value: 'turku',
    label: (
      <Link
        href={{
          pathname: '/weather/turku/',
          query: { lat: '60.45', lon: '22.28' },
        }}
      >
        Turku
      </Link>
    ),
  },
];

interface SearchProps {
  label: string;
}

const SearchInput = ({ label }: SearchProps) => {
  const [query, setQuery] = useState<string>('');


   // Cities with 0 population are filtered out for clearer search results
  const fetchResults = async (q: string) => {
    

    axios
      .get(`https://geocoding-api.open-meteo.com/v1/search?name=${q}`)
      .then((res) =>
        res.data.results.filter(
          (city: { population: number }) => city.population > 0
        )
      )
      .then((data) => {
        parseResults(data);
      });
  };

  
  // Geolocation is included in the query so weather page can fetch the correct data from serverSideProps
  const parseResults = (data: any) => {
    const results = data;

    results.forEach(
      (result: { name: any; latitude: number; longitude: number }) => {
        let obj = {
          value: _.lowerCase(result.name),
          label: (
            <Link
              href={{
                pathname: `/weather/${_.lowerCase(result.name)}`,
                query: {
                  lat: result.latitude.toString(),
                  lon: result.longitude.toString(),
                },
              }}
            >
              {result.name}
            </Link>
          ),
        };

        options.push(obj);
      }
    );
  };

  const handleChange = (e: string) => {
    setQuery(e);
    if (e.length >= 3) {
      fetchResults(e);
    }
  };

  return (
    <label className='form__label'>
      {_.capitalize(label)}
      <Select
        instanceId={'cityselect'}
        onInputChange={handleChange}
        className='form__input form__input-search'
        classNamePrefix='form'
        options={_.uniqWith(options, _.isEqual)}
      />
    </label>
  );
};

export default SearchInput;
