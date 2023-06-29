import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  setModifiedData,
  setModifiedDataErr,
  setModifiedDataLoading,
} from '../../store/data/modifiedData';
import {
  setProfileData,
  setProfileDataErr,
  setProfileDataLoading,
} from '../../store/user/profileData';
import useGetData from './useGetData';

type PostData = {
  cvImg: string;
  id: string;
  title: string;
  tags: string[];
  MDEValue: string;
  userId: string;
};

type UserData = {
  id: string;
  name: string;
  username: string;
  profile: string | null;
  createdAt: string;
};

const useModifiedData = () => {
  const dispatch = useDispatch();

  const {
    data: allPostData,
    loading: postLoading,
    err: postErr,
  } = useGetData<PostData>('posts');

  const {
    data: userData,
    loading: userLoading,
    err: userErr,
  } = useGetData<UserData>('users');

  const loading = postLoading || userLoading;
  const err = postErr || userErr;

  useEffect(() => {
    // transform data logic
    let modifiedPostData: (PostData & UserData)[] | null = null;

    if (allPostData && userData && !loading && !err) {
      const changedPostData = allPostData.map(postData => {
        const userInfo = userData.find(data => data.id === postData.userId);

        return {
          ...postData,
          name: userInfo?.name,
          username: userInfo?.username,
          profile: userInfo?.profile,
        } as PostData & UserData; // Cast the object to (PostData & UserData) type
      });

      modifiedPostData = changedPostData;
    }
    // transform data logic end

    if (modifiedPostData !== null) {
      dispatch(setModifiedData(modifiedPostData));
    }
    dispatch(setModifiedDataLoading(loading));
    dispatch(setModifiedDataErr(err));
    dispatch(setProfileData(userData));
    dispatch(setProfileDataLoading(userLoading));
    dispatch(setProfileDataErr(userErr));
  }, [dispatch, allPostData, userData, loading, err, userLoading, userErr]);

  return {
    loading,
    err,
  };
};

export default useModifiedData;
