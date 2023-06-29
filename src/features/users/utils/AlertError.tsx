import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';

interface AlertErrorProps {
  error: string | null;
  setError: (error: string | null) => void;
}

const AlertError: React.FC<AlertErrorProps> = ({ error, setError }) => {
  return (
    <Alert status='error'>
      <AlertIcon />
      <AlertTitle mr={2}>Error!</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
      <CloseButton
        position='absolute'
        right='8px'
        top='8px'
        onClick={() => setError(null)}
      />
    </Alert>
  );
};

export default AlertError;
