import React, { useEffect, useState } from 'react';
import { Cards, CountryPicker, Chart, PieChart } from './components';
import { ThemeProvider, ColorModeProvider, Flex, Text } from '@chakra-ui/core';
import { fetchData } from './api';
import './App.css';

interface Data {
  confirmed: {
    detail: string;
    value: number;
  };
  deaths: {
    detail: string;
    value: number;
  };
  recovered: {
    detail: string;
    value: number;
  };
  lastUpdate: string;
  error?: string;
}

const defaultData = {
  confirmed: {
    detail: '',
    value: 0,
  },
  deaths: {
    detail: '',
    value: 0,
  },
  recovered: {
    detail: '',
    value: 0,
  },
  lastUpdate: '',
};

const App: React.FC = () => {
  const [data, setData] = useState<Data>(defaultData);
  const [country, setCountry] = useState('');

  useEffect(() => {
    fetchData(country)
      .then((fetchedData) => {
        setData(fetchedData);
      })
      .catch((err) => console.log(err));
  }, [country]);

  let content;
  if (data.error) {
    content = (
      <Flex align='center' justify='center' p='5'>
        <h1>Error: {data.error}</h1>
      </Flex>
    );
  } else if (data.confirmed.value === 0) {
    content = (
      <Flex align='center' justify='center' p='5'>
        <h1>Loading...</h1>
      </Flex>
    );
  } else {
    content = (
      <Flex align='center' justify='center' flexDirection='column' p='5'>
        <Cards data={data} />
        <CountryPicker setCountry={setCountry} />
        <Chart data={country ? data : null} country={country} />
        <PieChart />
      </Flex>
    );
  }

  return (
    <div className='App'>
      <Text as='h1' textAlign='center' mt='5' mb='5' fontFamily='inherit'>
        Covid-19 live data visualisation
      </Text>
      <ColorModeProvider>
        <ThemeProvider>{content}</ThemeProvider>
      </ColorModeProvider>
    </div>
  );
};

export default App;
