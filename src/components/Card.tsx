import React from 'react';
import { Box, Text } from '@chakra-ui/core';

interface Props {
  title: 'Infected' | 'Recovered' | 'Deaths';
  value: number;
  date: string;
}

const Card: React.FC<Props> = ({ title, value, date }) => {
  let borderColor: string, textDetail: string;
  if (title === 'Infected') {
    borderColor = 'rgba(0,0,255,.5)';
    textDetail = 'Number of infected cases from COVID-19.';
  } else if (title === 'Recovered') {
    borderColor = 'rgba(0,255,0,.5)';
    textDetail = 'Number of recoveries from COVID-19.';
  } else {
    borderColor = 'rgba(255,0,0,.5)';
    textDetail = 'Number of deaths caused by COVID-19.';
  }

  return (
    <Box
      p='5'
      w='100%'
      border='1px solid rgb(226, 232, 240)'
      rounded='md'
      boxShadow='0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
      borderBottom={`10px solid ${borderColor}`}
    >
      <Text lineHeight='tight' color='gray.600' isTruncated>
        {title}
      </Text>
      <Text lineHeight='1.6' isTruncated as='h2' fontWeight='semibold'>
        {value}
      </Text>
      <Text lineHeight='tight' color='gray.600' fontSize='md' isTruncated>
        {new Date(date).toDateString()}
      </Text>
      <Text lineHeight='tight' fontSize='sm' color='gray.600'>
        {textDetail}
      </Text>
    </Box>
  );
};

export default Card;
