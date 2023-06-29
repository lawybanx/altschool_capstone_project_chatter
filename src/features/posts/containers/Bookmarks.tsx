import { Box, Heading, Text } from '@chakra-ui/react';
import PostItem from '../components/PostItem';
import { getUserProfileData } from '../../../helper/getUserProfileData';
import { useAuth, User } from '../../../context/auth';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { calcTotalDiscussion } from '../../comments/utils/calculateTotal';

const Bookmarks = () => {
  const user = useAuth() as User;

  const {
    modifiedData,
    modifiedDataLoading: loading,
    modifiedDataError: err,
  } = useSelector((state: { modifiedData: any }) => state.modifiedData);

  const profileData = useSelector(
    (state: { profileData: any }) => state.profileData.profileData
  );

  let allPosts: any[] = [];

  if (modifiedData) {
    allPosts = modifiedData.filter((postItem: any) =>
      postItem.bookmark?.includes(user?.userId)
    );
  }

  const bookmarkedPostsData = allPosts.map((postItem: any) => {
    const { userId } = postItem;
    const currentUserProfile = getUserProfileData(profileData, userId);

    return {
      ...postItem,
      currentUserProfile,
    };
  });

  if (!user) {
    return <Navigate to='/create-account' replace />;
  }

  return (
    <Box flex='2'>
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
          Bookmarks
        </Heading>
        <Text fontSize='lg' color='gray.500'>
          All articles you have bookmarked
        </Text>
      </Box>

      {bookmarkedPostsData.length === 0 ? (
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
            No bookmarks yet
          </Heading>
          <Text fontSize='lg' color='gray.500'>
            You haven’t bookmarked any posts yet
          </Text>

          <Text fontSize='lg' color='gray.500'>
            When you do, they’ll show up here.
          </Text>
        </Box>
      ) : (
        bookmarkedPostsData.map((postData: any) => (
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
            currentUserProfile={getUserProfileData(
              profileData,
              postData.userId
            )}
            bookmark={postData.bookmark}
            alreadyBookmarked={postData.bookmark?.includes(user?.userId)}
            likes={postData.likes}
            comments={calcTotalDiscussion(postData.comments)}
          />
        ))
      )}
    </Box>
  );
};

export default Bookmarks;
