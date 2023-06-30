import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileData } from '../../../helper/getUserProfileData';
import CommentItem from '../components/CommentItem';
import { setCurrentComments } from '../../../store/comment/currentComments';
import { useAuth } from '../../../context/auth';

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

interface UserProfileData {
  name: string;
  username: string;
}

interface PostDetail {
  id: string;
  userId: string;
  comments: Comment[];
}

const AllComments: React.FC<{ postDetail: PostDetail }> = ({ postDetail }) => {
  const dispatch = useDispatch();
  const user = useAuth();

  useEffect(() => {
    dispatch(setCurrentComments(postDetail.comments));
  }, [postDetail.comments, dispatch]);

  const { profileData } = useSelector((state: any) => state.profileData);
  const { currentComments } = useSelector(
    (state: any) => state.currentComments
  );

  const repliedComment = (replies: Record<string, Reply>) =>
    Object.values(replies).sort(
      (a: Reply, b: Reply) => a.createdAt.seconds - b.createdAt.seconds
    );

  return (
    <Box mt='2rem' pb='10rem' px='1rem'>
      {postDetail.comments.map((comment: Comment) => (
        <Box key={comment.commentId}>
          <CommentItem
            avatarSize='30px'
            footerPs='37px'
            comments={currentComments}
            authorId={postDetail.userId}
            currentUserId={user?.userId}
            likes={comment.likes}
            text={comment.value}
            createdAt={comment.createdAt}
            currentUserProfile={
              getUserProfileData(profileData, comment.userId) as UserProfileData
            }
            userId={comment.userId}
            postId={postDetail.id}
            commentId={comment.commentId}
            edited={comment.edited}
            editedAt={comment.editedAt}
          />
          {Object.values(comment.replies).length !== 0 &&
            repliedComment(comment.replies).map((item: Reply) => (
              <CommentItem
                key={item.commentId}
                comments={currentComments}
                authorId={postDetail.userId}
                currentUserId={user?.userId}
                likes={item.likes}
                ps='20px'
                avatarSize='28px'
                footerPs='35px'
                text={item.value}
                createdAt={item.createdAt}
                currentUserProfile={
                  getUserProfileData(
                    profileData,
                    item.userId
                  ) as UserProfileData
                }
                repliedUserName={
                  getUserProfileData(profileData, item.repliedUserId)?.name ||
                  ''
                }
                userId={item.userId}
                postId={postDetail.id}
                commentId={item.commentId}
                edited={item.edited}
                editedAt={item.editedAt}
                reply={true}
              />
            ))}
        </Box>
      ))}
    </Box>
  );
};

export default AllComments;
