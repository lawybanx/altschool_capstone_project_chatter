import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../context/auth';
import { getUserProfileData } from '../../../helper/getUserProfileData';
import PostItem from '../../posts/components/PostItem';
import { getPostsByTag } from '../../../helper/getPostsByTag';
import { calcTotalDiscussion } from '../../comments/utils/calculateTotal';

const TagDetails = () => {
  const user = useAuth();
  const { tagname } = useParams<{ tagname: string }>();

  const tagnames = [tagname];

  const {
    modifiedData,
    modifiedDataLoading: loading,
    modifiedDataErr: err,
  } = useSelector((state: any) => state.modifiedData);

  const { profileData, profileDataLoading } = useSelector(
    (state: any) => state.profileData
  );

  let posts: any[] = [];

  if (modifiedData && !loading && !err) {
    posts = modifiedData.filter((postData: any) => !postData.draft);
  }

  const tagPosts = getPostsByTag(tagnames, posts);

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
          {tagname}
        </Heading>
        <Text fontSize='lg' color='gray.500'>
          {tagPosts.length} posts
        </Text>
      </Box>
      {tagPosts?.map((postData: any) => (
        <PostItem
          key={postData.id}
          name={postData.name}
          username={postData.username}
          profile={postData.profile}
          coverImg={postData.cvImg}
          id={postData.id}
          createdAt={postData.createdAt}
          title={postData.title}
          tags={postData.tags}
          readTime={postData.readTime}
          isUpdated={postData?.updated}
          userId={postData.userId}
          currentUserId={user?.userId}
          currentUserProfile={getUserProfileData(profileData, postData.userId)}
          bookmark={postData.bookmark}
          alreadyBookmarked={postData.bookmark?.includes(user?.userId)}
          likes={postData.likes}
          comments={calcTotalDiscussion(postData.comments)}
        />
      ))}
    </Box>
  );
};

export default TagDetails;
