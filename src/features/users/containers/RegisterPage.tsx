import React, { useState } from 'react';
import {
  Flex,
  Image,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useAuth } from '../../../context/auth';

import { auth } from '../../../config/firebase';
import { useSelector } from 'react-redux';
import useGenerateUserName from '../hooks/useGenerateUserName';
import { createUser } from '../../../lib/api';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import login from '../../../assets/images/login.png';

const RegisterPage = () => {
  const user = useAuth();
  const { profileData } = useSelector((state: any) => state.profileData);
  const getUsername = useGenerateUserName();

  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!signingIn && user) {
    return <Navigate to='/' />;
  }

  const generateUsername = (userId: string, displayName: string | null) => {
    const authenticatedUser = profileData?.find(
      (userData: any) => userData.id === userId
    );

    return authenticatedUser
      ? authenticatedUser.username
      : getUsername(displayName || '', userId);
  };

  const handleAuthentication = async (
    email?: string | any,
    password?: string | any,
    fullName?: string | any,
    provider?: any
  ) => {
    try {
      setSigningIn(true);
      let res;

      if (provider) {
        res = await signInWithPopup(auth, provider);
      } else {
        res = await createUserWithEmailAndPassword(auth, email, password);
      }

      const { uid: userId, displayName, photoURL } = res.user;

      const username = generateUsername(userId, displayName || fullName);

      const userData = {
        name: displayName || fullName,
        username,
        profile: photoURL,
        createdAt: res.user.metadata.creationTime,
      };

      await createUser(userId, userData);

      // navigate(-1);
      // reload page to get the updated user data
      window.location.reload();

      console.log('created user successfully');
    } catch (err: any) {
      setSigningIn(false);
      setError(err.message);
      console.log('failed to create user:', err.message);
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      setSigningIn(true);
      await signInWithEmailAndPassword(auth, email, password);
      // navigate(-1);
      // reload page to get the updated user data
      window.location.reload();
      console.log('signed in successfully');
    } catch (err: any) {
      setSigningIn(false);
      setError(err.message);
      console.log('failed to sign in:', err.message);
    }
  };

  return (
    <Flex
      maxH='100vh'
      direction={{ base: 'column', md: 'row' }}
      align={{ base: 'center', md: 'center' }}
      justify='space-between'
    >
      <Image
        alt='Login Image'
        src={login}
        objectFit='cover'
        width={{ base: '100%', md: '50%' }}
        h={{ base: '50%', md: '100%' }}
      />

      <Flex
        direction='column'
        align='center'
        justify='center'
        w={{ base: '100%', md: '90%' }}
        p={{ base: '1rem', md: '2rem' }}
        h='100%'
      >
        <Tabs
          display='flex'
          flexDirection='column'
          align='center'
          justifyContent='space-between'
          // isFitted
          // h='100%'
        >
          <TabList
            justifyContent='space-between'
            // spacing={10}
            // mb={10}
            alignItems='center'
            w='80%'
            mx='auto'
            fontWeight='bold'
          >
            <Tab>REGISTER</Tab>
            <Tab>LOG IN</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <RegisterForm
                handleAuthentication={handleAuthentication}
                signingIn={signingIn}
                error={error}
                setError={setError}
              />
            </TabPanel>
            <TabPanel>
              <LoginForm
                handleSignIn={handleSignIn}
                signingIn={signingIn}
                error={error}
                setError={setError}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default RegisterPage;
