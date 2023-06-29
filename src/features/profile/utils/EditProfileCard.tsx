import { Box, Text, useColorModeValue, BoxProps } from '@chakra-ui/react';

interface EditProfileCardProps extends BoxProps {
  children: React.ReactNode;
}

export const EditProfileCard: React.FC<EditProfileCardProps> = ({
  children,
  ...props
}) => {
  return (
    <Box
      bg={useColorModeValue('light.cardBg', 'dark.cardBg')}
      borderRadius='5px'
      className='shadow'
      p='1rem 1rem 1.5rem'
      mb='1.5rem'
      {...props}
    >
      {children}
    </Box>
  );
};

export const titleStyles = {
  fontSize: '2xl',
  fontWeight: '700',
  mb: 3,
};

interface LabelProps extends BoxProps {
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ children, ...props }) => (
  <Text as='label' display='block' {...props}>
    {children}
  </Text>
);

interface SmallLabelProps {
  children: React.ReactNode;
}

export const SmallLabel: React.FC<SmallLabelProps> = ({ children }) => {
  return (
    <Text
      mb='3'
      fontSize='15px'
      color={useColorModeValue('light.colorTertiary', 'dark.colorTertiary')}
    >
      {children}
    </Text>
  );
};
