import React, { RefObject } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import DiscussionBox from '../components/DiscussionBox';
import { calcTotalDiscussion } from '../utils/calculateTotal';

interface DiscussionProps {
  postId: string;
  comments: Comment[];
  discussionBoxRef: RefObject<HTMLDivElement>;
}

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

const Discussion: React.FC<DiscussionProps> = ({
  postId,
  comments,
  discussionBoxRef,
}) => {
  return (
    <Box mt='1.5rem' ref={discussionBoxRef} p={{ base: '1rem', md: '1.5rem' }}>
      <Heading fontSize={{ base: '1.7rem', md: '2rem' }} mb={3}>
        Discussion ({calcTotalDiscussion(comments)})
      </Heading>
      <DiscussionBox postId={postId} />
    </Box>
  );
};

export default Discussion;
