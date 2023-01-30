import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';

let _ = require('lodash');

// Default options
const defaultOptions = [
  {
    value: 'helsinki',
    label: (
      <Link
        href={{
          pathname: '/weather/helsinki/',
          query: { country: 'Finland', lat: '60.17', lon: '24.95' },
        }}
      >
        Helsinki, FI
      </Link>
    ),
  },
  {
    value: 'tampere',
    label: (
      <Link
        href={{
          pathname: '/weather/tampere/',
          query: { country: 'Finland', lat: '61.5', lon: '23.8' },
        }}
      >
        Tampere, FI
      </Link>
    ),
  },
  {
    value: 'turku',
    label: (
      <Link
        href={{
          pathname: '/weather/turku/',
          query: { country: 'Finland', lat: '60.45', lon: '22.28' },
        }}
      >
        Turku, FI
      </Link>
    ),
  },
];

interface SearchProps {
  label: string;
}

const SearchInput = ({ label }: SearchProps) => {
  const [results, setResults] = useState<any>();

  const fetchResults = (q: string) => {
    axios
      .get(`https://geocoding-api.open-meteo.com/v1/search?name=${q}`)
      .then((data) => {
        parseResults(data.data.results);
      });
  };

  // Geolocation is included in the query so weather page can fetch the correct data from serverSideProps
  const parseResults = (data: any) => {
    let arr: { value: any; label: JSX.Element }[] = [];

    if (data) {
      data.map(
        (result: {
          name: string;
          latitude: number;
          longitude: number;
          country: string;
          country_code: string;
          admin1: string;
        }) => {
          let obj = {
            value: _.lowerCase(result.name),
            label: (
              <Link
                href={{
                  pathname: `/weather/${_.lowerCase(result.name)}`,
                  query: {
                    country: result.country,
                    lat: result.latitude.toString(),
                    lon: result.longitude.toString(),
                  },
                }}
              >
                {result.name}, {result.admin1} ({result.country_code})
              </Link>
            ),
          };
          arr.push(obj);
        }
      );
      setResults(arr);
    }
  };

  // Run query only after user has typed two or more characters
  const handleChange = (e: string) => {
    if (e.length >= 2) {
      fetchResults(e);
    }
  };

  // Detect enter key and redirect user to correct url
  const handleKeyDown = (e: any) => {
    let current = e.currentTarget;
    let focused = current.querySelector('.form__option--is-focused');

    if (focused) {
      let link = focused.querySelector('a');

      if (e.key === 'Enter') {
        window.location.href = link.href;
      }
    }
  };

  const filterCities = (inputValue: string) => {
    if (results && results.length > 0) {
      return results.filter((i: any) =>
        i.value.toLowerCase().includes(inputValue.toLowerCase())
      );
    } else {
      return null;
    }
  };

  const loadOptions = (
    inputValue: string,
    callback: (options: any) => void
  ) => {
    setTimeout(() => {
      callback(filterCities(inputValue));
    }, 250);
  };

  return (
    <label className='form__label'>
      {_.capitalize(label)}

      <AsyncSelect
        placeholder='Search'
        onInputChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e)}
        instanceId={'cityselect'}
        className='form__input form__input-search'
        name='search_city'
        classNamePrefix='form'
        defaultOptions={defaultOptions}
        loadOptions={loadOptions}
      />
    </label>
  );
};

export default SearchInput;
