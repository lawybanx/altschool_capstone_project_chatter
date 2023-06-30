import React, { useEffect } from 'react';
import { Box, Heading, HStack, useColorModeValue } from '@chakra-ui/react';
import { Timestamp } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DiscussionBox from './DiscussionBox';

interface Comment {
  commentId: string;
  value: string;
  createdAt: { seconds: number; nanoseconds: number };
  edited?: boolean;
  editedAt: { seconds: number; nanoseconds: number };
  likes: string[];
  userId: string;
  replies: Record<string, Reply>;
}

interface Reply {
  commentId: string;
  value: string;
  createdAt: { seconds: number; nanoseconds: number };
  edited?: boolean;
  editedAt: { seconds: number; nanoseconds: number };
  likes: string[];
  userId: string;
  repliedUserId: string;
}

const EditComment: React.FC = () => {
  // scroll top
  useEffect(() => window.scrollTo(0, 0), []);
  const navigate = useNavigate();

  const currentCommentItem = useSelector(
    (state: any) => state.currentComments.commentItem
  );

  const cardBg = useColorModeValue('light.cardBg', 'dark.cardBg');

  if (!currentCommentItem) {
    navigate(-1);
  }

  const valueToEdit = currentCommentItem.value;

  const onDismiss = () => {
    navigate(-1);
  };

  const transformedComments = (
    comments: Comment[] | any,
    MDEValue: string | any
  ) => {
    const externalComments = comments.map((comment: { commentId: any }) =>
      comment.commentId === currentCommentItem.commentId
        ? {
            ...comment,
            value: MDEValue,
            edited: true,
            editedAt: Timestamp.now(),
          }
        : comment
    );

    return externalComments.map(
      (comment: { replies: Record<string, Reply> }) => ({
        ...comment,
        replies: Object.values(comment.replies).map((cmt: Reply) =>
          cmt.commentId === currentCommentItem.commentId
            ? {
                ...cmt,
                value: MDEValue,
                edited: true,
                editedAt: Timestamp.now(),
              }
            : cmt
        ),
      })
    );
  };

  return (
    <HStack px={{ md: '.5rem' }} flex='1' w='100%' justify='center'>
      <Box
        p={['1rem .5rem', '1rem .5rem', '2rem 2.5rem']}
        maxW='900px'
        w='100%'
        borderRadius={{ md: '5px' }}
        bg={cardBg}
        className='shadow'
      >
        <Heading fontSize={['1.3rem', '1.7rem']} mb='1.5rem'>
          Editing comment
        </Heading>
        <DiscussionBox
          postId={currentCommentItem.postId}
          commentId={currentCommentItem.commentId}
          valueToEdit={valueToEdit}
          onDismiss={onDismiss}
          showDismiss={true}
          transformedComments={transformedComments}
        />
      </Box>
    </HStack>
  );
};

export default EditComment;
