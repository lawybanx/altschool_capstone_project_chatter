import { useState } from 'react';
import { useAuth, User } from '../../../context/auth';
import { updatePostReaction } from '../../../lib/api';

type ReactionArr = string[] | undefined;

const useClickReactToPost = (
  reactionArr: ReactionArr,
  postId: string,
  reactType: string
) => {
  const user: User | null = useAuth();
  const [updatingReact, setUpdatingReact] = useState(false);

  const clickReactHandler = () => {
    setUpdatingReact(true);

    const prevReactionArr = reactionArr || [];
    const userId = user?.userId;

    if (!userId) {
      // User is not authenticated, handle accordingly
      return;
    }

    const transformedReact = prevReactionArr.includes(userId)
      ? prevReactionArr.filter(id => id !== userId)
      : [...prevReactionArr, userId];

    updatePostReaction({ [reactType]: transformedReact }, postId)
      .then(_ => {
        setUpdatingReact(false);
        // console.log('react added successfully');
      })
      .catch(err => {
        setUpdatingReact(false);
        console.log(err);
      });
  };

  return { clickReactHandler, updatingReact };
};

export default useClickReactToPost;
