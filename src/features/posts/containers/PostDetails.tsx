import React from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DetailContent from '../components/DetailContent';

interface PostData {
  id: string;
  name: string;
  username: string;
  profile: string;
  cvImg: string;
  createdAt: string | undefined;
  title: string;
  draft: boolean;
  tags: { tagName: string }[];
  readTime: number;
  updated?: boolean;
  userId: string;
  bookmark?: string[];
  alreadyBookmarked?: boolean;
  likes: string[];
  comments: CommentData[];
}

interface CommentData {
  value: string;
  replies: Record<string, any>;
  createdAt: string;
  userId: string;
  commentId: string;
  likes: string[];
}

interface ProfileData {
  username: string;
  profile: null | object;
  name: string;
  createdAt: string;
  id: string;
  twitter: string;
  website: string;
  location: string;
  email: string;
  github: string;
  followers: Array<string>;
  following: Array<string>;
  followingTags: string[];
}

interface RootState {
  modifiedData: {
    modifiedData: PostData[];
    modifiedDataLoading: boolean;
    modifiedDataErr: Error | null;
  };
  profileData: {
    profileData: ProfileData[];
  };
}

const PostDetails: React.FC = () => {
  const { title } = useParams<{ title?: string | any }>();

  // get postId from (title + postId)
  const param = title.split('_');
  const postId = param[param.length - 1];

  const {
    modifiedData,
    modifiedDataLoading: loading,
    modifiedDataErr: err,
  } = useSelector((state: RootState) => state.modifiedData);

  const { profileData } = useSelector((state: RootState) => state.profileData);

  const postDetail = modifiedData?.find(
    (postData: PostData) => postData.id === postId
  );

  const currentUserProfile = profileData?.find(
    data => data.id === postDetail?.userId
  );

  return (
    <Box
      w='100%'
      maxW='1280px'
      justifyContent='center'
      mt='-.6rem'
      bg={useColorModeValue('light.cardBg', 'dark.cardBg')}
    >
      {!postDetail && loading ? (
        <Text>Loading...</Text>
      ) : (
        <DetailContent
          postDetail={postDetail}
          loading={loading}
          err={err}
          currentUserProfile={currentUserProfile}
        />
      )}
    </Box>
  );
};

export default PostDetails;
