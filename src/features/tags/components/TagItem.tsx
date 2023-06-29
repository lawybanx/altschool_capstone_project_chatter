import React from 'react';
import {
  Box,
  Text,
  Icon,
  Flex,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import { SlPlus, SlCheck } from 'react-icons/sl';
import { useAuth } from '../../../context/auth';
import useFollowTag from '../hooks/useFollowTag';

interface TagItemProps {
  tagName: string;
  publishedPosts?: number;
  profileData: any;
  profileDataLoading: boolean;
}

const TagItem: React.FC<TagItemProps> = ({
  tagName,
  publishedPosts,
  profileData,
  profileDataLoading,
}) => {
  const user = useAuth();
  const userId = user?.userId;

  const { followTagHandler, loading } = useFollowTag(profileData);

  const handleClickFollow = () => followTagHandler(tagName);

  const currentUserProfile = profileData?.find(
    (data: any) => data.id === userId
  );
  const alreadyFollow = currentUserProfile?.followingTags?.includes(tagName);

  return (
    <Box
      borderRadius='5px'
      bg={useColorModeValue('#f1f5f9', '#1e293b')}
      className='shadow'
      p={{ base: '.5rem', md: '1.5rem' }}
    >
      <Flex alignItems='center' justifyContent='space-between'>
        <Box>
          <Text>
            <Link
              style={{ textDecoration: 'none' }}
              _focus={{ boxShadow: 'none' }}
              href={`/tag/${tagName}`}
              mr='1rem'
              cursor='pointer'
              _hover={{ color: 'light.primary' }}
            >
              {tagName}
            </Link>
          </Text>
          {publishedPosts && (
            <Text fontSize='sm' color='gray.500'>
              {publishedPosts} post{publishedPosts > 1 ? 's' : ''}
            </Text>
          )}
        </Box>

        <Icon
          as={alreadyFollow ? SlCheck : SlPlus}
          color={alreadyFollow ? 'green.500' : 'blue.500'}
          fontSize={{ base: '1.5rem', md: '1.8rem' }}
          cursor='pointer'
          onClick={handleClickFollow}
          _hover={{
            color: 'gray.500',
          }}
        />
      </Flex>
    </Box>
  );
};

export default TagItem;
