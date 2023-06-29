import React from 'react';
import { Flex, VStack } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu';
import SidebarCard from '../components/SidebarCard';

const HomeLayout = () => {
  return (
    <SidebarMenu>
      <VStack as='main'>
        <Flex maxW='1280px' w='100%' m='auto'>
          <Outlet />

          {/* <SidebarCard /> */}
        </Flex>
      </VStack>
    </SidebarMenu>
  );
};

export default HomeLayout;
