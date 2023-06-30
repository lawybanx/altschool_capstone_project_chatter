import React, { useRef, useEffect } from 'react';
import {
  Box,
  Image,
  Flex,
  Text,
  Heading,
  HStack,
  Icon,
  useColorModeValue,
  Tag,
  Divider,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../context/auth';
import { AiOutlineRead } from 'react-icons/ai';
import { displayDate } from '../../../helper/calcTimestamp';
import CustomAvatar from '../../../shared/utils/CustomAvatar';
import ManagePost from '../utils/ManagePost';
import DetailCard from '../utils/DetailCard';
import MarkdownRenderer from '../utils/MarkdownRenderer';
import Discussion from '../../comments/containers/Discussion';
import AllComments from '../../comments/containers/AllComments';
import { calcTotalDiscussion } from '../../comments/utils/calculateTotal';

interface DetailContentProps {
  postDetail: any;
  loading: boolean;
  err: any;
  currentUserProfile: any;
}

const DetailContent: React.FC<DetailContentProps> = ({
  postDetail,
  loading,
  err,
  currentUserProfile,
}) => {
  const navigate = useNavigate();
  const user = useAuth();

  const discussionBoxRef = useRef<HTMLDivElement>(null);

  const { clickComment } = useSelector((state: any) => state.scrollDiscussion);

  // scroll to
  useEffect(() => {
    const scrollHeight =
      window.pageYOffset +
      (discussionBoxRef.current?.getBoundingClientRect().top || 0) -
      60;

    if (clickComment) {
      setTimeout(() => window.scrollTo({ top: scrollHeight }), 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [clickComment, postDetail.id]);

  const isAuthor = user?.userId === postDetail?.userId;

  const handleNavigateToProfile = (e: React.MouseEvent, username: string) => {
    e.stopPropagation();
    navigate(`/${username}`);
  };

  const dividerColor = useColorModeValue('light.cardBorder', 'dark.cardBorder');

  return (
    <Box w='900px' m='auto' maxW='100%'>
      {/* coverImgae */}
      {postDetail.cvImg && (
        <Image
          src={postDetail.cvImg}
          alt='cover_image'
          maxH='500px'
          width='100%'
          p={{ base: '1rem', md: '1.5rem' }}
          borderTopLeftRadius={{ base: 'none', md: '5px' }}
          borderTopRightRadius={{ base: 'none', md: '5px' }}
          objectFit='cover'
        />
      )}

      {/* title */}
      <Box p='1rem'>
        <Heading
          as='h1'
          fontSize={{ base: '1.5rem', md: '2.5rem' }}
          fontWeight='bold'
          lineHeight='1.5'
          color={useColorModeValue('light.heading', 'dark.heading')}
          mb='.2rem'
          alignSelf='center'
        >
          {postDetail.title}
        </Heading>
      </Box>

      {/* custom avatar, user name, date, readtime */}
      <Flex align='center' pb='1rem'>
        <HStack spacing='1rem' px='1rem'>
          <CustomAvatar
            profile={postDetail.profile}
            size='40px'
            onClick={e => handleNavigateToProfile(e, postDetail.username)}
          />
          <Box flex='1' pt='3px'>
            <Text
              fontWeight={600}
              cursor='pointer'
              lineHeight={1.25}
              onClick={() => navigate(`/${postDetail.username}`)}
            >
              {postDetail.name}
            </Text>
          </Box>
          {/* draft */}

          {postDetail.draft ? (
            <Tag bg='#F1C40F' size='sm' color='#000'>
              Draft
            </Tag>
          ) : (
            <>
              <Text fontSize='sm' color='gray.500'>
                {displayDate(postDetail.createdAt)}
              </Text>
              <Flex alignItems='center'>
                <Icon as={AiOutlineRead} color='blue.500' />
                <Text fontSize='xs' ml={1} color='gray.500'>
                  {postDetail.readTime} min read
                </Text>
              </Flex>
            </>
          )}
          {/* manage post if user */}
          {isAuthor && <ManagePost postId={postDetail.id} />}
        </HStack>
      </Flex>
      <Box px='1rem'>
        <DetailCard
          tags={postDetail.tags}
          userId={postDetail.userId}
          id={postDetail.id}
          currentUserId={user?.userId ?? ''}
          likes={postDetail.likes}
          comments={calcTotalDiscussion(postDetail.comments)}
          bookmark={postDetail.bookmark}
          alreadyBookmarked={postDetail.bookmark?.includes(user?.userId)}
          alreadyLiked={postDetail.likes?.includes(user?.userId)}
        />
      </Box>
      <MarkdownRenderer content={postDetail.MDEValue} />
      {postDetail.MDEValue.length <= 1 ? (
        ''
      ) : (
        <Box pt='2rem' px='1rem'>
          <DetailCard
            tags={postDetail.tags}
            userId={postDetail.userId}
            id={postDetail.id}
            currentUserId={user?.userId ?? ''}
            likes={postDetail.likes}
            comments={calcTotalDiscussion(postDetail.comments)}
            bookmark={postDetail.bookmark}
            alreadyBookmarked={postDetail.bookmark?.includes(user?.userId)}
            alreadyLiked={postDetail.likes?.includes(user?.userId)}
          />
        </Box>
      )}

      {!postDetail.draft && (
        <Divider mt={7} h='1px' bg={dividerColor} mx='auto' />
      )}

      {!postDetail.draft && (
        <Discussion
          discussionBoxRef={discussionBoxRef}
          postId={postDetail.id}
          comments={postDetail.comments}
        />
      )}

      {postDetail.comments.length !== 0 && (
        <AllComments postDetail={postDetail} />
      )}
    </Box>
  );
};

export default DetailContent;
