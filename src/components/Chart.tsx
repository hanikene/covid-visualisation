import React, { useState, useEffect } from 'react';
import { default as ChartApex } from 'react-apexcharts';
import { Box } from '@chakra-ui/core';
import { fetchDailyData } from '../api';

interface Props {
  data: Data | null;
  country: string;
}

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
}

interface DailyData {
  map: (item: any) => any[];
  [index: number]: {
    confirmed: number;
    deaths: number;
    date: string;
  };
}

const Chart: React.FC<Props> = ({ data, country }) => {
  const [dailyData, setDailyData] = useState<DailyData>([]);

  useEffect(() => {
    fetchDailyData()
      .then((data) => {
        setDailyData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let display: JSX.Element = <Box w='85vw'></Box>;

  if (data) {
    display = (
      <Box w='80vw'>
        <ChartApex
          series={[
            {
              name: 'confirmed',
              data: [data.confirmed.value],
            },
            {
              name: 'recovered',
              data: [data.recovered.value],
            },
            {
              name: 'deaths',
              data: [data.deaths.value],
            },
          ]}
          options={{
            chart: { type: 'bar' },
            colors: ['#3333ff', '#33ff33', '#ff3333'],
            plotOptions: {
              bar: {
                columnWidth: '45%',
                distributed: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              show: false,
            },
            xaxis: {
              type: 'categories',
              categories: [`number of cases in ${country}`],
              labels: {
                style: {
                  fontSize: '14px',
                },
              },
            },
          }}
          type='bar'
          height='450'
          width='100%'
        />
      </Box>
    );
  } else if (dailyData) {
    const confirmedSerie: number[] = dailyData.map(
      ({ confirmed }: any) => confirmed
    );
    const deathsSerie: number[] = dailyData.map(({ deaths }: any) => deaths);
    const dateArray: string[] = dailyData.map(({ date }: any) => date);

    display = (
      <Box w='80vw'>
        <ChartApex
          options={{
            chart: {
              background: '#f4f4f4',
            },
            colors: ['#3333ff', '#ff0000'],
            xaxis: {
              type: 'datetime',
              categories: dateArray,
            },
          }}
          series={[
            {
              name: 'Total confirmed cases',
              data: confirmedSerie,
            },
            {
              name: 'Total deaths',
              data: deathsSerie,
            },
          ]}
          type='line'
          height='450'
          width='100%'
        />
      </Box>
    );
  }

  return display;
};

export default Chart;
