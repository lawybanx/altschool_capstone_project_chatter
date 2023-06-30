import React, { useState } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { PrimaryBtn, SecondaryBtn } from '../../../shared/utils/Buttons';
import { updateComment } from '../../../lib/api';
import { useSelector } from 'react-redux';
import { Timestamp } from 'firebase/firestore';
import { useAuth } from '../../../context/auth';
import { nanoid } from '@reduxjs/toolkit';
import { removeFromLocalStorage } from '../../../helper/localStorage';
import MarkdownEditor from '../../posts/components/MarkdownEditor';

interface Comment {
  commentId: string;
  value: string;
  createdAt: { seconds: number; nanoseconds: number };
  edited?: boolean;
  editedAt?: { seconds: number; nanoseconds: number };
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

interface ModifiedData {
  id: string;
  comments: Comment[];
}

interface DiscussionBoxProps {
  postId: string;
  commentId?: string;
  showDismiss?: boolean;
  onDismiss?: () => void;
  valueToEdit?: string;
  transformedComments?: (comments: Comment[], MDEValue: string) => Comment[];
  repliedUserId?: string;
}

const DiscussionBox: React.FC<DiscussionBoxProps> = ({
  postId,
  commentId,
  showDismiss,
  onDismiss,
  valueToEdit,
  transformedComments,
  repliedUserId,
}) => {
  const user = useAuth();
  const { modifiedData } = useSelector((state: any) => state.modifiedData);

  const [submitting, setSubmitting] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [MDEValue, setMDEValue] = useState(valueToEdit || '');

  const comments = modifiedData?.find(
    (data: ModifiedData) => data.id === postId
  )?.comments;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const createdAt = Timestamp.now();
    const newComment: Comment = {
      value: MDEValue,
      replies: {},
      createdAt,
      userId: user?.userId ?? '',
      commentId: nanoid(),
      likes: [],
    };

    let modifiedComments: Comment[] = [];

    if (valueToEdit) {
      modifiedComments = transformedComments
        ? transformedComments(comments, MDEValue)
        : [];
    } else if (commentId) {
      modifiedComments = comments.map((comment: Comment) =>
        comment.commentId === commentId ||
        Object.values(comment.replies).find(
          (cmt: Reply) => cmt.commentId === commentId
        )
          ? {
              ...comment,
              replies: {
                ...comment.replies,
                [nanoid()]: {
                  ...newComment,
                  repliedUserId,
                  repliedCommentId: commentId,
                },
              },
            }
          : comment
      );
    } else {
      modifiedComments = [...comments, newComment];
    }

    updateComment(modifiedComments, postId)
      .then(() => {
        setSubmitting(false);
        setMDEValue('');
        onDismiss && setTimeout(onDismiss, 100); // need new state value ('submitting = false') to disable || enable to MDE after state change

        removeFromLocalStorage('commentItemToManage');
      })
      .catch(err => {
        setSubmitting(false);
        console.log(err);
      });
  };

  return (
    <Box>
      <Box w='100%' mt='1rem !important'>
        <MarkdownEditor
          MDEValue={MDEValue}
          setMDEValue={setMDEValue}
          isSubmitting={submitting}
          setUploadingImg={setUploadingImg}
          h='200px'
        />
      </Box>

      {/* buttons */}
      <HStack justify='flex-end' w='100%' my='.5rem'>
        {showDismiss && (
          <SecondaryBtn
            onClick={onDismiss}
            disabled={uploadingImg}
            isLoading={submitting}
          >
            Dismiss
          </SecondaryBtn>
        )}

        <PrimaryBtn
          onClick={() => handleSubmit}
          bg='light.primary'
          disabled={uploadingImg}
          isLoading={submitting}
          isLoadingText={'Submitting'}
        >
          Submit
        </PrimaryBtn>
      </HStack>
    </Box>
  );
};

export default DiscussionBox;
