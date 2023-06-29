import React from 'react';
import { Heading, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();

  return (
    <VStack mt='5rem' spacing='1rem' w='100%' justify='center' align='center'>
      <Heading mt='0 !important' fontSize='5xl'>
        404
      </Heading>
      <Heading mt='0 !important' fontSize='2xl'>
        Page not found !
      </Heading>
      <Text
        color='light.primary'
        cursor='pointer'
        _hover={{ color: 'rgb(103 115 237 / 91%)' }}
        onClick={() => navigate('/')}
      >
        Back to home
      </Text>
    </VStack>
  );
};

export default Error;
