import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateComment } from '../../../lib/api';
import { setCurrentComments } from '../../../store/comment/currentComments';

interface ClickLikeToCommentHook {
  handleClickLike: (comments: Comment[], commentId: string) => void;
  updatingLike: boolean;
}

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

const useClickLikeToComment = (
  currentUserId: string,
  postId: string
): ClickLikeToCommentHook => {
  const dispatch = useDispatch();

  const [updatingLike, setUpdatingLike] = useState(false);

  const handleClickLike = (comments: Comment[], commentId: string) => {
    setUpdatingLike(true);

    const updatedComments = comments.map((comment: Comment) => {
      if (comment.commentId === commentId) {
        const updatedLikes = comment.likes.includes(currentUserId)
          ? comment.likes.filter((id: string) => id !== currentUserId)
          : [...comment.likes, currentUserId];

        return {
          ...comment,
          likes: updatedLikes,
        };
      } else {
        const updatedReplies = Object.values(comment.replies).map(
          (reply: Reply) => {
            if (reply.commentId === commentId) {
              const updatedReplyLikes = reply.likes.includes(currentUserId)
                ? reply.likes.filter((id: string) => id !== currentUserId)
                : [...reply.likes, currentUserId];

              return {
                ...reply,
                likes: updatedReplyLikes,
              };
            } else {
              return reply;
            }
          }
        );

        return {
          ...comment,
          replies: Object.fromEntries(
            updatedReplies.map((reply: Reply) => [reply.commentId, reply])
          ),
        };
      }
    });

    dispatch(setCurrentComments(updatedComments));

    updateComment(updatedComments, postId)
      .then(() => {
        setUpdatingLike(false);
        // console.log('updated like');
      })
      .catch((err: Error) => {
        setUpdatingLike(false);
        console.log(err);
      });
  };

  return { handleClickLike, updatingLike };
};

export default useClickLikeToComment;
