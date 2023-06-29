import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import {
  Box,
  HStack,
  Image,
  Text,
  VStack,
  Heading,
  Wrap,
  WrapItem,
  Flex,
  Link,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import CustomAvatar from '../../../shared/utils/CustomAvatar';
import { SecondaryBtn } from '../../../shared/utils/Buttons';
// import profilePopup from '../utils/profilePopup';
import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri';
import { AiOutlineRead } from 'react-icons/ai';
import { AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import useClickReactToPost from '../hooks/useClickReactToPost';
import Tag from '../../tags/utils/Tag';
import DisplayDate from '../utils/DisplayDate';
import { titleRoute } from '../../../helper/titleRoute';

interface PostItemProps {
  name?: string;
  username?: string;
  profile?: string;
  coverImg?: string;
  id: string | any;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  title?: string;
  tags: { tagName: string }[];
  readTime?: number;
  isUpdated: boolean;
  userId?: string;
  currentUserId?: string | null;
  currentUserProfile?: any;
  bookmark?: string[];
  alreadyBookmarked?: boolean;
  likes?: string[];
  comments?: number;
}

const PostItem: React.FC<PostItemProps> = ({
  name,
  username,
  profile,
  coverImg,
  id,
  createdAt,
  title,
  tags,
  readTime,
  isUpdated,
  userId,
  currentUserId,
  currentUserProfile,
  bookmark,
  alreadyBookmarked,
  likes,
  comments,
}) => {
  // const [showProfilePopup, setShowProfilePopup] = useState(false);

  const navigate = useNavigate();

  const { clickReactHandler: clickBookmark, updatingReact: updatingBookmark } =
    useClickReactToPost(bookmark, id, 'bookmark');

  const handleBookmarked = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    clickBookmark();
  };

  const handleNavigate = () => {
    navigate(`/${titleRoute(username, title, id)}`);
  };

  // const handleProfilePopup = (e: React.MouseEvent<HTMLDivElement>) => {
  //   e.stopPropagation();
  //   setShowProfilePopup(!showProfilePopup);
  // };

  const handleNavigateToProfile = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate(`/${username}`);
  };

  const handleClickTag = (tagName: string) => {
    navigate(`/tag/${tagName}`);
  };

  const colorTertiary = useColorModeValue(
    'light.colorTertiary',
    'dark.colorTertiary'
  );

  return (
    <Box
      as='article'
      bg={useColorModeValue('light.cardBg', 'dark.cardBg')}
      color={useColorModeValue('light.color', 'dark.color')}
      className='shadow'
      borderRadius={{ base: 0, md: '5px' }}
      mb='1rem'
    >
      {coverImg && (
        <Image
          src={coverImg}
          w='100%'
          h='100%'
          maxH='275px'
          objectFit='cover'
          cursor='pointer'
          borderTopLeftRadius={{ base: '0', md: '5px' }}
          borderTopRightRadius={{ base: '0', md: '5px' }}
          alt='cover_img'
          onClick={handleNavigate}
        />
      )}

      {/* below image */}
      <VStack p='1rem' align='flex-start'>
        <Flex justifyContent='space-between' w='100%'>
          <Flex alignItems='center'>
            <CustomAvatar
              profile={profile}
              size='40px'
              onClick={() => handleNavigateToProfile}
            />
            <Box ml={2}>
              <Text fontSize='sm' fontWeight='medium'>
                {name}
              </Text>
              <DisplayDate
                createdAt={createdAt}
                isUpdated={isUpdated}
                color={colorTertiary}
              />
            </Box>
          </Flex>
          {/* bookmark */}
          {userId !== currentUserId && (
            <Box ms='.5rem'>
              <SecondaryBtn
                disabled={updatingBookmark}
                onClick={() => handleBookmarked}
              >
                {alreadyBookmarked ? (
                  <RiBookmarkFill size={19} color={colorTertiary} />
                ) : (
                  <RiBookmarkLine size={19} color={colorTertiary} />
                )}
              </SecondaryBtn>
            </Box>
          )}
        </Flex>
        <VStack
          ml={{ base: 'none', md: 'calc(40px + .5rem)' }}
          align='flex-start'
        >
          <Flex alignItems='center'>
            <Icon as={AiOutlineRead} color='blue.500' />
            <Text fontSize='xs' ml={1}>
              {readTime} min read
            </Text>
          </Flex>
          <Box>
            <Link
              style={{ textDecoration: 'none' }}
              _focus={{ boxShadow: 'none' }}
              _hover={{ color: 'light.primary' }}
              onClick={handleNavigate}
            >
              <Heading fontSize='2xl'>{title}</Heading>
            </Link>
          </Box>

          {/* tags */}
          <Wrap mt={2}>
            {tags.map(tag => (
              <WrapItem
                key={nanoid()}
                onClick={() => handleClickTag(tag.tagName)}
              >
                <Link
                  style={{ textDecoration: 'none' }}
                  _focus={{ boxShadow: 'none' }}
                >
                  <Tag tag={tag} />
                </Link>
              </WrapItem>
            ))}
          </Wrap>

          {/* comment and likes */}
          <HStack mt={2}>
            {likes && (
              <HStack align='center'>
                <Icon as={AiOutlineHeart} fontSize='1.2rem' />
                <Text fontSize='sm'>
                  {likes.length} like
                  {likes.length > 1 || likes.length === 0 ? 's' : ''}
                </Text>
              </HStack>
            )}
            {comments && (
              <HStack>
                <Icon as={AiOutlineMessage} fontSize='1.2rem' />
                <Text fontSize='sm' fontWeight='medium'>
                  {comments} comment
                  {comments > 1 || comments === 0 ? 's' : ''}
                </Text>
              </HStack>
            )}
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default PostItem;
