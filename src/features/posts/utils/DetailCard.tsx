import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import {
  Stack,
  Flex,
  Box,
  Wrap,
  WrapItem,
  Link,
  Text,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import { FiShare } from 'react-icons/fi';
import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri';
import Tag from '../../tags/utils/Tag';
import { useNavigate } from 'react-router-dom';
import useClickReactToPost from '../hooks/useClickReactToPost';
import { SecondaryBtn } from '../../../shared/utils/Buttons';

interface DetailCardProps {
  tags: { tagName: string }[];
  userId: string;
  id: string;
  currentUserId: string;
  likes: string[];
  comments: number;
  bookmark: string[];
  alreadyBookmarked: boolean;
  alreadyLiked: boolean;
}

const DetailCard: React.FC<DetailCardProps> = ({
  tags,
  userId,
  id,
  currentUserId,
  likes,
  comments,
  bookmark,
  alreadyBookmarked,
  alreadyLiked,
}) => {
  const navigate = useNavigate();

  const handleClickTag = (tagName: string) => {
    navigate(`/tag/${tagName}`);
  };

  const { clickReactHandler: clickBookmark, updatingReact: updatingBookmark } =
    useClickReactToPost(bookmark, id, 'bookmark');

  const { clickReactHandler: clickLike, updatingReact: updatingLike } =
    useClickReactToPost(likes, id, 'likes');

  const handleBookmarked = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    clickBookmark();
  };

  const handleLikes = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    clickLike();
  };

  const colorTertiary = useColorModeValue(
    'light.colorTertiary',
    'dark.colorTertiary'
  );

  return (
    <Stack pb='1rem'>
      <Wrap mt={2}>
        {tags &&
          tags.map(tag => (
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
      <Flex justify='space-between'>
        {/* likes and comments */}
        <HStack>
          <HStack>
            <Box>
              <SecondaryBtn disabled={updatingLike} onClick={handleLikes}>
                {alreadyLiked ? (
                  <AiFillHeart size={25} color={colorTertiary} />
                ) : (
                  <AiOutlineHeart size={25} color={colorTertiary} />
                )}
              </SecondaryBtn>
            </Box>
            <Text fontSize='md' fontWeight='medium'>
              {likes.length} like
              {likes.length > 1 || likes.length === 0 ? 's' : ''}
            </Text>
          </HStack>
          <HStack>
            <AiOutlineMessage size={25} color={colorTertiary} />
            <Text fontSize='md' fontWeight='medium'>
              {comments} comment
              {comments > 1 || comments === 0 ? 's' : ''}
            </Text>
          </HStack>
        </HStack>

        {/* bookmarks and share */}
        <HStack>
          {userId !== currentUserId && (
            <Box ms='.5rem'>
              <SecondaryBtn
                disabled={updatingBookmark}
                onClick={() => handleBookmarked}
              >
                {alreadyBookmarked ? (
                  <RiBookmarkFill size={25} color={colorTertiary} />
                ) : (
                  <RiBookmarkLine size={25} color={colorTertiary} />
                )}
              </SecondaryBtn>
            </Box>
          )}
          <Box>
            <SecondaryBtn>
              <FiShare size={25} color={colorTertiary} />
            </SecondaryBtn>
          </Box>
        </HStack>
      </Flex>
    </Stack>
  );
};

export default DetailCard;
