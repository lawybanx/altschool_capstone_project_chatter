import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Heading,
  VStack,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { PrimaryBtn } from '../../../shared/utils/Buttons';
import AlertError from '../utils/AlertError';

interface LoginFormProps {
  handleSignIn: (email: string, password: string) => void;
  signingIn: boolean;
  error: string | null;
  setError: (error: string | null) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  handleSignIn,
  signingIn,
  error,
  setError,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { email, password } = formData;

  const validateForm = (): boolean => {
    const errors: { email?: string; password?: string } = {};

    // Perform form validation
    if (!email.trim()) {
      errors.email = 'Email is required';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    handleSignIn(email, password);
  };

  return (
    <>
      {error && <AlertError error={error} setError={setError} />}
      <Stack
        spacing={10}
        maxW={'md'}
        p={10}
        my={12}
        align={'center'}
        justify={'center'}
        direction={'column'}
      >
        <Heading fontSize={'2xl'}>Welcome back</Heading>
        <VStack spacing={10} align='stretch'>
          <form onSubmit={handleSubmit}>
            <Stack>
              <FormControl isInvalid={!!errors.email} isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  w={{ base: '100%', md: 'md' }}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password} isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <PrimaryBtn
                  type='submit'
                  isLoading={signingIn}
                  isLoadingText='Submitting'
                  size='lg'
                  w={'full'}
                  bg={'light.primary'}
                >
                  Log in
                </PrimaryBtn>
              </Stack>
            </Stack>
          </form>
        </VStack>
      </Stack>
    </>
  );
};

export default LoginForm;
