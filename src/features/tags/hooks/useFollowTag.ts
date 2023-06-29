import { useState } from 'react';
import { useAuth } from '../../../context/auth';
import { updateProfileData } from '../../../lib/api';

interface ProfileData {
  id: string;
  followingTags: string[];
}

const useFollowTag = (profileData: ProfileData[]) => {
  const user = useAuth();
  const userId = user?.userId;

  const [loading, setLoading] = useState(false);

  const followTagHandler = async (tagName: string) => {
    setLoading(true);

    const currentUserProfile = profileData.find(data => data.id === userId);

    const tags = currentUserProfile?.followingTags || [];

    const transformedFollowingTags = tags.includes(tagName)
      ? tags.filter(tag => tag !== tagName)
      : [...tags, tagName];

    updateProfileData({ followingTags: transformedFollowingTags }, userId)
      .then(() => {
        setLoading(false);
        // console.log('followed tag successfully');
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  return { followTagHandler, loading };
};

export default useFollowTag;
