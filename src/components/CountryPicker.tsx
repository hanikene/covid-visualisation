import React, { useEffect, useState } from 'react';
import { Box, FormControl, FormLabel, Select } from '@chakra-ui/core';
import { fetchCountries } from '../api';

interface Props {
  setCountry: (country: string) => void;
}

const CountryPicker: React.FC<Props> = ({ setCountry }) => {
  const [countries, setCountries] = useState<string[]>();

  useEffect(() => {
    fetchCountries()
      .then((data) => {
        setCountries(data);
      })
      .catch((err) => console.log(err));
  }, []);

  let options: JSX.Element[] = [];

  if (countries) {
    options = countries.map((country) => (
      <option key={country} value={country}>
        {country}
      </option>
    ));
  }

  return (
    <Box
      mt='100px'
      mb='5'
      p='5'
      w={{ base: '300px', md: '72vw' }}
      border='1px solid rgb(226, 232, 240)'
      rounded='md'
      boxShadow='0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
    >
      <FormControl>
        <FormLabel htmlFor='country'>Country</FormLabel>
        <Select
          bg='#eee'
          color='black'
          id='country'
          defaultValue=''
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        >
          <option value=''>Global</option>
          {options}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CountryPicker;
