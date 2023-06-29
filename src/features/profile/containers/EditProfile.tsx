import React, { useRef, useState, useEffect } from 'react';
import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/auth';
import { PrimaryBtn } from '../../../shared/utils/Buttons';
import User from '../components/User';
import Basic from '../components/Basic';
import { EditProfileCard } from '../utils/EditProfileCard';
import { removeImage, updateProfileData } from '../../../lib/api';
import { useSelector } from 'react-redux';
import { getAuth, updateProfile } from 'firebase/auth';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from 'firebase/storage';
import { nanoid } from '@reduxjs/toolkit';
import { checkUsername } from '../../../helper/checkUsername';

interface ProfileData {
  id: string;
  profile: string;
  username: string;
  name: string;
}

interface RootState {
  profileData: {
    profileDataLoading: boolean;
    profileDataErr: string | null;
    profileData: ProfileData[];
  };
}

const EditProfile: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  const user = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const { profileData, profileDataLoading, profileDataErr } = useSelector(
    (state: RootState) => state.profileData
  );

  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const githubRef = useRef<HTMLInputElement>(null);
  const twitterRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);

  const nameColor = useColorModeValue('light.primary', 'dark.primary');

  if (!user) {
    return <Navigate to='/create-account' replace />;
  }

  let currentUserProfile: any = null;
  let authenticatedUsernames: string[] = [];
  if (profileData) {
    currentUserProfile = profileData.find(
      (data: any) => data.id === user.userId
    );

    authenticatedUsernames = profileData
      .filter((userData: any) => userData.id !== user.userId)
      .map((data: any) => data.username);
  }

  const storage = getStorage();
  const storageRef = ref(storage, `profiles/photo${nanoid()}`);

  const updateProfileHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const website = websiteRef.current?.value;
    const github = githubRef.current?.value;
    const twitter = twitterRef.current?.value;
    const location = locationRef.current?.value;
    const bio = bioRef.current?.value;
    const previewImg = previewImgRef.current?.title;

    const newData = {
      name,
      username,
      email,
      website,
      github,
      twitter,
      location,
      bio,
    };

    if (checkUsername(username!, authenticatedUsernames) !== 'valid') {
      usernameRef.current?.focus();
      return;
    }

    setLoading(true);

    if (name) {
      updateProfile(auth.currentUser!, {
        displayName: name,
      });
    }

    if (previewImg) {
      uploadString(storageRef, previewImg, 'data_url').then(() => {
        getDownloadURL(storageRef).then(url => {
          updateProfileData({ ...newData, profile: url }, user.userId)
            .then(() => {
              setLoading(false);
              setTimeout(() => navigate(`/${username}`), 300);
            })
            .catch(err => {
              setLoading(false);
              console.log(err);
            });

          updateProfile(auth.currentUser!, { photoURL: url });
        });
      });
      return;
    }

    updateProfileData(newData, user.userId)
      .then(() => {
        setLoading(false);
        setTimeout(() => navigate(`/${username}`), 300);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  const removeProfileImgHandler = (url: string) => {
    setLoading(true);

    removeImage(url);
    updateProfileData({ profile: '' }, user.userId)
      .then(() => {
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <Box maxW='1000px' w='100%' mt='1rem' px={{ md: '.5rem' }} flex='1'>
      <Heading fontSize={{ base: '1.3rem', md: '1.5rem' }} ps='.5rem'>
        Profile for
        <Text
          color={nameColor}
          as='span'
          cursor='pointer'
          onClick={() => navigate(`/${currentUserProfile?.username}`)}
        >
          @{currentUserProfile?.username}
        </Text>
      </Heading>

      <Box
        as='form'
        maxW='720px'
        mx='auto'
        mt='1rem'
        pos='relative'
        onSubmit={updateProfileHandler}
      >
        <User
          nameRef={nameRef}
          usernameRef={usernameRef}
          emailRef={emailRef}
          profileData={currentUserProfile}
          authenticatedUsernames={authenticatedUsernames}
          previewImgRef={previewImgRef}
          removeProfileImgHandler={removeProfileImgHandler}
        />

        <Basic
          websiteRef={websiteRef}
          githubRef={githubRef}
          twitterRef={twitterRef}
          locationRef={locationRef}
          bioRef={bioRef}
          profileData={currentUserProfile}
        />

        <EditProfileCard p='1rem' pos='sticky' bottom='0' zIndex='2' w='100%'>
          <PrimaryBtn
            bg='light.primary'
            w='100%'
            isLoading={loading}
            isLoadingText='Updating Profile'
            type='submit'
          >
            Update Profile Information.
          </PrimaryBtn>
        </EditProfileCard>
      </Box>
    </Box>
  );
};

export default EditProfile;
