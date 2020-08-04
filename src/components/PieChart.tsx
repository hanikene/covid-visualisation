import React, { useState, useEffect } from 'react';
import { default as ChartApex } from 'react-apexcharts';
import { Box, Button, Text } from '@chakra-ui/core';
import { fetchTopCountries } from '../api';

interface Data {
  [index: string]: any;
  confirmed: {
    map: (country: any) => any;
  };
  global: {
    confirmed: number;
  };
}

const PieChart: React.FC = () => {
  const [data, setData] = useState<Data>();
  const [nameStat, setNameStat] = useState<
    'confirmed' | 'recovered' | 'deaths'
  >('confirmed');

  useEffect(() => {
    fetchTopCountries().then((fetchedData) => {
      setData(fetchedData);
    });
  }, []);

  let display = <div></div>;
  let colors: string[];

  if (nameStat === 'deaths') {
    colors = [
      '#A90000',
      '#D33820',
      '#FD5E3F',
      '#FF835F',
      '#FFA780',
      '#f7bea5',
      '#f2d8cd',
      '#f4ebe6',
    ];
  } else if (nameStat === 'recovered') {
    colors = [
      '#00A900',
      '#38D320',
      '#5EFD3F',
      '#83FF5F',
      '#A7FF80',
      '#bef7a5',
      '#d8f2cd',
      '#ebf4e6',
    ];
  } else {
    colors = [
      '#0000A9',
      '#2038D3',
      '#3F5EFD',
      '#5F83FF',
      '#80A7FF',
      '#a5bef7',
      '#cdd8f2',
      '#e6ebf4',
    ];
  }

  if (data) {
    const options = {
      chart: {
        width: 380,
        type: 'pie',
      },
      colors: colors,
      labels: data[nameStat].map((country: any) => country.name),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };

    const series = data[nameStat].map((country: any) => country[nameStat]);

    display = (
      <Box mt='100px'>
        <Text as='h3'>Top 8 countries with higher {nameStat} cases</Text>
        <Box h='350px'>
          <ChartApex
            options={options}
            series={series}
            type='pie'
            width={500}
            height={320}
          />
        </Box>
        <Button
          variantColor='blue'
          m='3'
          cursor='pointer'
          onClick={(e) => {
            setNameStat('confirmed');
          }}
        >
          Confirmed
        </Button>
        <Button
          variantColor='green'
          m='3'
          cursor='pointer'
          onClick={(e) => {
            setNameStat('recovered');
          }}
        >
          Recovered
        </Button>
        <Button
          variantColor='red'
          m='3'
          cursor='pointer'
          onClick={(e) => {
            setNameStat('deaths');
          }}
        >
          Deaths
        </Button>
      </Box>
    );
  }

  return display;
};

export default PieChart;
