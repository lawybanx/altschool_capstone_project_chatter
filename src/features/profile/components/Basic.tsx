import React, { RefObject } from 'react';
import { Box, Input, Text, Textarea, VStack } from '@chakra-ui/react';
import { EditProfileCard, Label, titleStyles } from '../utils/EditProfileCard';

interface BasicProps {
  websiteRef?: RefObject<HTMLInputElement>;
  githubRef?: RefObject<HTMLInputElement>;
  twitterRef?: RefObject<HTMLInputElement>;
  locationRef?: RefObject<HTMLInputElement>;
  bioRef?: RefObject<HTMLTextAreaElement>;
  profileData?: {
    website?: string;
    github?: string;
    twitter?: string;
    location?: string;
    bio?: string;
  };
}

const Basic: React.FC<BasicProps> = ({
  websiteRef,
  githubRef,
  twitterRef,
  locationRef,
  bioRef,
  profileData,
}) => {
  return (
    <EditProfileCard>
      <Text {...titleStyles}>Basic</Text>

      <VStack spacing={3}>
        <Box w='100%'>
          <Label mb='.3rem'>Website URL</Label>
          <Input
            defaultValue={profileData?.website}
            placeholder='https://yoursite.com'
            type='url'
            ref={websiteRef}
          />
        </Box>

        <Box w='100%'>
          <Label mb='.3rem'>Github</Label>
          <Input
            defaultValue={profileData?.github}
            placeholder='https://github.com/username'
            type='url'
            ref={githubRef}
          />
        </Box>

        <Box w='100%'>
          <Label mb='.3rem'>Twitter</Label>
          <Input
            defaultValue={profileData?.twitter}
            placeholder='https://twitter.com/username'
            type='url'
            ref={twitterRef}
          />
        </Box>

        <Box w='100%'>
          <Label mb='.3rem'>Location</Label>
          <Input
            defaultValue={profileData?.location}
            placeholder='Lagos, Nigeria'
            type='text'
            ref={locationRef}
          />
        </Box>

        <Box w='100%'>
          <Label mb='.3rem'>Bio</Label>

          <Textarea
            defaultValue={profileData?.bio}
            placeholder='A Short Bio...'
            ref={bioRef}
          />
        </Box>
      </VStack>
    </EditProfileCard>
  );
};

export default Basic;
