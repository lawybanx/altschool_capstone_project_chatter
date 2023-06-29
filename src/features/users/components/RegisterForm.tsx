import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Heading,
  VStack,
  HStack,
  Box,
  Text,
  Center,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { PrimaryBtn } from '../../../shared/utils/Buttons';
import AlertError from '../utils/AlertError';

interface RegisterFormProps {
  handleAuthentication: (
    email?: string,
    password?: string,
    displayName?: string | null,
    provider?: GithubAuthProvider | GoogleAuthProvider
  ) => void;
  signingIn: boolean;
  error: string | null;
  setError: (error: string | null) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  handleAuthentication,
  signingIn,
  error,
  setError,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const validateForm = () => {
    const errors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    // Perform form validation
    if (!firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      errors.email = 'Invalid email address';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setErrors(errors);

    // Return true if there are no errors
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      // Submit form or call API here
      const displayName = `${firstName} ${lastName}`;

      handleAuthentication(email, password, displayName);
    }
  };

  const isValidEmail = (email: string) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  return (
    <>
      {error && <AlertError error={error} setError={setError} />}
      <Stack spacing={10} maxW={'md'}>
        <Heading fontSize={'2xl'}>Create an account</Heading>
        <VStack align='stretch'>
          <form onSubmit={handleSubmit}>
            <Stack>
              <HStack>
                <Box>
                  <FormControl isInvalid={!!errors.firstName} isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type='text'
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isInvalid={!!errors.lastName} isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type='text'
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                    <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl isInvalid={!!errors.email} isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleInputChange}
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
              <FormControl isInvalid={!!errors.confirmPassword} isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    name='confirmPassword'
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowConfirmPassword(
                          showConfirmPassword => !showConfirmPassword
                        )
                      }
                    >
                      {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
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
                  Create account
                </PrimaryBtn>
              </Stack>
            </Stack>
          </form>
          <Center>
            <Button
              w={'full'}
              maxW={'md'}
              variant={'outline'}
              leftIcon={<FcGoogle />}
              onClick={() =>
                handleAuthentication(undefined, undefined, null, googleProvider)
              }
            >
              <Center>
                <Text>Sign in with Google</Text>
              </Center>
            </Button>
          </Center>
          {/* button for github signup */}
          <Center>
            <Button
              w={'full'}
              maxW={'md'}
              variant={'outline'}
              leftIcon={<FaGithub />}
              onClick={() =>
                handleAuthentication(undefined, undefined, null, githubProvider)
              }
            >
              <Center>
                <Text>Sign in with Github</Text>
              </Center>
            </Button>
          </Center>
        </VStack>
      </Stack>
    </>
  );
};

export default RegisterForm;
