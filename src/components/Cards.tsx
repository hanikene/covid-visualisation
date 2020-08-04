import React from 'react';
import { Grid } from '@chakra-ui/core';
import { Card } from './';

interface Props {
  data: {
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
  };
}

const Cards: React.FC<Props> = ({ data }) => {
  return (
    <div className='Cards'>
      <Grid
        gap={3}
        templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
        justifyItems='center'
      >
        <Card
          title='Infected'
          value={data.confirmed.value}
          date={data.lastUpdate}
        />
        <Card
          title='Recovered'
          value={data.recovered.value}
          date={data.lastUpdate}
        />
        <Card title='Deaths' value={data.deaths.value} date={data.lastUpdate} />
      </Grid>
    </div>
  );
};

export default Cards;
