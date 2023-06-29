import { VStack, HStack, Text } from '@chakra-ui/react';
import { PrimaryBtn } from '../utils/Buttons';

const ErrorMessage = () => {
  const reload = () => window.location.reload();

  return (
    <VStack justify='center' flex='1' fontSize={['16px', '17px']} py='7rem'>
      <VStack>
        <HStack m='auto'>
          <Text letterSpacing='1px'>No internet connection !</Text>
        </HStack>
        <PrimaryBtn onClick={reload}>Try again</PrimaryBtn>
      </VStack>
    </VStack>
  );
};

export default ErrorMessage;
