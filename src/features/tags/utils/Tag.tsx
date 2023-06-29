import { Box, Button, Text, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface TagProps {
  children?: ReactNode;
  tag: { tagName: string };
  onAddTag?: () => void;
  onDeleteTag?: () => void;
  showCloseIcon?: boolean;
}

const Tag: React.FC<TagProps> = ({
  children,
  tag,
  onAddTag,
  onDeleteTag,
  showCloseIcon,
}) => {
  return (
    <Button
      onClick={onAddTag}
      height={{ base: '30px', md: '34px' }}
      p='0 .5rem'
      border='1px solid'
      borderColor={useColorModeValue('gray.100', 'gray.700')}
      _hover={{
        borderColor: useColorModeValue('gray.300', 'gray.600'),
        color: useColorModeValue('light.tagColorHover', 'dark.tagColorHover'),
        bg: useColorModeValue('gray.100', 'gray.700'),
      }}
      borderRadius='5px'
      bg='transparent'
      color={useColorModeValue('light.linkColor', 'dark.linkColor')}
      cursor='pointer'
      _active={{ bg: 'transparent' }}
    >
      <Text
        fontSize={{ base: '13px', md: '15px' }}
        fontWeight='400'
        ms='5px'
        textTransform='capitalize'
      >
        {tag?.tagName}
      </Text>

      {/* get close icon as children */}
      {showCloseIcon && (
        <Box
          ps='.5rem'
          h='100%'
          display='flex'
          alignItems='center'
          cursor='pointer'
          _hover={{ svg: { color: 'red' } }}
          onClick={onDeleteTag}
        >
          {children}
        </Box>
      )}
    </Button>
  );
};

export default Tag;
