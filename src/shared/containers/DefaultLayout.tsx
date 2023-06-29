import React from 'react';
import { VStack, Flex, Image, Box, useColorModeValue } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { useNavigate } from 'react-router';
import logo from '../../assets/images/logo.png';

const DefaultLayout = () => {
  const navigate = useNavigate();

  return (
    <VStack
      as='main'
      minH='100vh'
      bg={useColorModeValue('gray.100', 'gray.900')}
      maxW='1280px'
    >
      <Box
        w='100%'
        borderBottom='1px'
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        bg={useColorModeValue('white', 'gray.900')}
      >
        <Flex
          h='16'
          m='auto'
          alignItems='center'
          mx='3'
          justifyContent='space-between'
        >
          <Image
            src={logo}
            cursor='pointer'
            alt='logo'
            h='50px'
            onClick={() => navigate('/')}
          />

          <Header />
        </Flex>
      </Box>
      <Outlet />
    </VStack>
  );
};

export default DefaultLayout;
