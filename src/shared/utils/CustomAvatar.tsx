import React, { MouseEventHandler } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import defaultProfile from '../../assets/images/default_profile.webp';

type CustomAvatarProps = {
  profile: string | null;
  size: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const CustomAvatar = ({ profile, size, onClick }: CustomAvatarProps) => {
  return (
    <Box
      boxSize={`${size}px`}
      backgroundImage={`url(${profile || defaultProfile})`}
      rounded='full'
      backgroundPosition='center'
      backgroundSize='cover'
      backgroundRepeat='no-repeat'
      cursor='pointer'
      transition='.3s'
      border='1.5px solid'
      borderColor={useColorModeValue('#E2E8F0', '#2a2a2a')}
      _hover={{
        boxShadow: useColorModeValue('0 0 0 1px #E2E8F0', '0 0 0 1px #2a2a2a'),
      }}
      onClick={onClick}
    />
  );
};

export default CustomAvatar;
