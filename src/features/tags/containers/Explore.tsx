import React from 'react';
import {
  Box,
  Heading,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  SimpleGrid,
} from '@chakra-ui/react';
import { nanoid } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../context/auth';
import { getPopularTags } from '../../../helper/getPopularTags';
import TagItem from '../components/TagItem';

const Explore = () => {
  const user = useAuth();

  const {
    modifiedData,
    modifiedDataLoading: loading,
    modifiedDataErr: err,
  } = useSelector((state: any) => state.modifiedData);

  const { profileData, profileDataLoading } = useSelector(
    (state: any) => state.profileData
  );

  const popularTags = getPopularTags(modifiedData);

  const followingTags =
    profileData?.find((userData: any) => userData.id === user?.userId)
      ?.followingTags || [];

  return (
    <Box flex='2' maxW={{ base: '100%', md: '650px' }}>
      <Box
        fontSize='2xl'
        fontWeight='bold'
        textAlign='center'
        p='5'
        border='1px solid #ccc'
        mb='5'
        borderRadius='lg'
      >
        <Heading as='h1' fontSize='2xl' fontWeight='bold'>
          Explore
        </Heading>
        <Text fontSize='lg' color='gray.500'>
          Discover new topics
        </Text>
      </Box>
      <Tabs isLazy isFitted>
        <TabList>
          <Tab>Trending Tags</Tab>
          <Tab>Tags you follow</Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={{ base: '0', md: '0 1rem' }}>
            {loading ? (
              <Box>
                <Text>Loading...</Text>
              </Box>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
                {popularTags.map((tag: any) => (
                  <TagItem
                    {...tag}
                    key={nanoid()}
                    profileData={profileData}
                    profileDataLoading={profileDataLoading}
                  />
                ))}
              </SimpleGrid>
            )}
          </TabPanel>
          <TabPanel px={{ base: '0', md: '0 1rem' }}>
            {loading ? (
              <Box>
                <Text>Loading...</Text>
              </Box>
            ) : (
              // tag current user follows
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
                {followingTags.map((tag: string) => (
                  <TagItem
                    tagName={tag}
                    key={nanoid()}
                    profileData={profileData}
                    profileDataLoading={profileDataLoading}
                  />
                ))}
              </SimpleGrid>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Explore;
