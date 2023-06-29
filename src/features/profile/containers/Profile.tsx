import React, { useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/auth';
import ProfileBioCard from '../components/ProfileBioCard';
import PostItem from '../../posts/components/PostItem';
import Error from '../../../shared/components/Error';
import { calcTotalDiscussion } from '../../comments/utils/calculateTotal';

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

const Profile: React.FC = () => {
  const location = useLocation();
  const { username } = useParams<{ username: string }>();
  const user = useAuth();

  useEffect(() => window.scrollTo(0, 0), [location]);

  const { modifiedData } = useSelector((state: any) => state.modifiedData);

  const { profileData, profileDataLoading, profileDataErr } = useSelector(
    (state: RootState) => state.profileData
  );

  let currentUserProfile: ProfileData | null | undefined = null;
  let userId: string | undefined;
  let userPosts: any[] | null = null;

  if (profileData) {
    currentUserProfile = profileData.find(data => data.username === username);

    userId = currentUserProfile?.id;
  }

  if (!currentUserProfile && !profileDataLoading) {
    return <Error />;
  }

  if (modifiedData) {
    userPosts = modifiedData
      .filter(
        (postData: { userId: string | undefined; draft: any; pinned: any }) =>
          postData.userId === userId && !postData.draft && !postData.pinned
      )
      .sort(
        (a: { createdAt: number }, b: { createdAt: number }) =>
          b.createdAt - a.createdAt
      );
  }

  return (
    <Box mt='-.5rem !important' w='100%' flex='1'>
      <Box h={['7rem', '7rem', '9rem']} background={'#1e293b'} />
      <Box mx={{ base: 'none', md: '.5rem' }}>
        <Box maxW='1000px' mx='auto'>
          <ProfileBioCard profileData={currentUserProfile} />
          <Flex mt='2rem'>
            <Box
              flex={{ base: 'unset', md: '2' }}
              borderRadius='5px'
              w='100%'
              px='1rem'
            >
              {userPosts &&
                userPosts.map(postData => (
                  <PostItem
                    key={postData.id}
                    name={postData.name}
                    username={postData.username}
                    profile={postData.profile}
                    id={postData.id}
                    createdAt={postData.createdAt}
                    title={postData.title}
                    tags={postData.tags}
                    readTime={postData.readTime}
                    isUpdated={postData?.updated}
                    userId={postData.userId}
                    currentUserId={user?.userId}
                    currentUserProfile={currentUserProfile}
                    bookmark={postData.bookmark}
                    alreadyBookmarked={postData.bookmark?.includes(
                      user?.userId
                    )}
                    likes={postData.likes}
                    comments={calcTotalDiscussion(postData.comments)}
                  />
                ))}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
