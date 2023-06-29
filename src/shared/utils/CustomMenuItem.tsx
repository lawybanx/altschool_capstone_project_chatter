import React, { ReactNode } from 'react';
import { MenuItem, useColorModeValue } from '@chakra-ui/react';

type CustomMenuItemProps = {
  children: ReactNode;
  onClick?: () => void;
  py?: string;
};

const CustomMenuItem = ({ children, onClick, py }: CustomMenuItemProps) => {
  return (
    <MenuItem
      py={py || '.5rem'}
      pos='relative'
      borderRadius='5px'
      _hover={{
        bg: useColorModeValue('light.secondary', 'dark.secondary'),
        color: useColorModeValue('light.headingHover', 'dark.headingHover'),
      }}
      onClick={onClick}
    >
      {children}
    </MenuItem>
  );
};

export default CustomMenuItem;
