import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  useColorModeValue,
} from '@chakra-ui/react';
import { RiMoreLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveToLocalStorage } from '../../../helper/localStorage';
import {
  setcommentItem,
  setTransformedComments,
} from '../../../store/comment/currentComments';
import CustomMenuItem from '../../../shared/utils/CustomMenuItem';

interface ManageCommentProps {
  commentId: string;
  postId: string;
  comments: CommentData[];
}

interface CommentData {
  commentId: string;
  replies: Record<string, any>;
  createdAt: string;
}

const ManageComment: React.FC<ManageCommentProps> = ({
  commentId,
  postId,
  comments,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentComments = useSelector(
    (state: any) => state.currentComments.currentComments
  );

  // Helper functions
  const setCurrentCommentItemHandler = () => {
    let commentItem: any = {};

    currentComments.forEach((comment: any) => {
      if (comment.commentId === commentId) {
        commentItem = comment;
        return;
      }

      const innerComments = Object.values(comment.replies);
      if (innerComments.find((cmt: any) => cmt.commentId === commentId)) {
        commentItem = innerComments.find(
          (cmt: any) => cmt.commentId === commentId
        );
      }
    });

    dispatch(setcommentItem({ ...commentItem, postId }));

    saveToLocalStorage(
      'commentItemToManage',
      JSON.stringify({ ...commentItem, postId })
    );
  };

  const transformedCommentsHandler = () => {
    const filteredComments = comments.filter(
      (comment: CommentData) => comment.commentId !== commentId
    );

    const transformedCommennts = filteredComments.map(
      (comment: CommentData) => {
        const repliedComments = Object.values(comment.replies)
          .sort((a, b) => a.createdAt - b.createdAt)
          .filter((cmt: any) => cmt.commentId !== commentId);

        const commentIds = [
          comment.commentId,
          ...repliedComments.map((cmt: any) => cmt.commentId),
        ];

        repliedComments.forEach((cmt: any) => {
          if (!commentIds.includes(cmt.repliedCommentId)) {
            commentIds.splice(commentIds.indexOf(cmt.commentId), 1);
          }
        });

        const finalRepliedComments = repliedComments.filter((cmt: any) =>
          commentIds.includes(cmt.commentId)
        );

        return {
          ...comment,
          replies: {
            ...finalRepliedComments.reduce(
              (acc, cur) => ({ ...acc, [cur.commentId]: cur }),
              {}
            ),
          },
        };
      }
    );

    dispatch(setTransformedComments(transformedCommennts));
    saveToLocalStorage(
      'transformedComments',
      JSON.stringify(transformedCommennts)
    );
  };

  const goToEdit = () => {
    setCurrentCommentItemHandler();
    navigate('/edit-comment');
  };

  const goToDelete = () => {
    setCurrentCommentItemHandler();
    transformedCommentsHandler();
    navigate('/delete-comment');
  };

  const replyToColor = useColorModeValue('#8f8f8f', 'dark.colorTertiary');

  return (
    <Menu autoSelect={false} isLazy>
      <MenuButton
        bg='transparent'
        p='0 3px'
        h='24px'
        borderRadius='5px'
        _hover={{
          bg: useColorModeValue('light.secondary', 'dark.secondary'),
          color: useColorModeValue('light.primary', 'dark.primary'),
        }}
        color={replyToColor}
      >
        <RiMoreLine size={20} className='more-icon' />
      </MenuButton>
      <MenuList
        minW='0'
        w='170px'
        p='.5rem'
        bg={useColorModeValue('light.cardBg', 'dark.cardBg')}
      >
        <CustomMenuItem onClick={goToEdit}>Edit</CustomMenuItem>
        <CustomMenuItem onClick={goToDelete}>Delete</CustomMenuItem>
      </MenuList>
    </Menu>
  );
};

export default ManageComment;
