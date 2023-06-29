import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/auth';
import { updateProfileData } from '../../../lib/api';

interface UseFollowUserProps {
  profileData: any;
  userId: string;
}

interface UseFollowUserResult {
  handleClickFollow: () => void;
  loading: boolean;
}

const useFollowUser = ({
  profileData,
  userId,
}: UseFollowUserProps): UseFollowUserResult => {
  const user = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleClickFollow = () => {
    if (!user) {
      navigate('/create-account');
      return;
    }

    if (profileData?.id === userId) {
      navigate('/edit-profile');
    } else {
      setLoading(true);
      const followers = profileData.followers || [];
      const transformedFollowers = followers.includes(userId)
        ? followers.filter((id: string) => id !== userId)
        : [...followers, userId];

      updateProfileData({ followers: transformedFollowers }, profileData.id)
        .then(_ => {
          setLoading(false);
          // console.log('followed');
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  return { handleClickFollow, loading };
};

export default useFollowUser;
