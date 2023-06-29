import React from 'react';
import { HStack, Image, Text, BoxProps } from '@chakra-ui/react';

interface SignUpButtonProps extends BoxProps {
  bg: string;
  logo: string;
  text: string;
  hoverBg: string;
  color?: string;
  onClick: () => void;
}

const SignUpButton: React.FC<SignUpButtonProps> = ({
  bg,
  logo,
  text,
  hoverBg,
  color,
  onClick,
  ...rest
}) => {
  return (
    <HStack
      bg={bg}
      color={color || 'dark.color'}
      p='.7rem'
      borderRadius='5px'
      w='100%'
      justify='center'
      align='center'
      cursor='pointer'
      _hover={{ bg: hoverBg }}
      height='48px'
      transition='.3s'
      onClick={onClick}
      {...rest}
    >
      <Image src={logo} alt='icon' />
      <Text>{text}</Text>
    </HStack>
  );
};

export default SignUpButton;
