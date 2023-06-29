import { nanoid } from '@reduxjs/toolkit';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/auth';
import {
  getItemFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from '../../../helper/localStorage';
import { createPost, deletePost, draftPost, editPost } from '../../../lib/api';
import { setTitleToStore } from '../../../store/post/postData';

interface PostData {
  id: string;
  draft: any;
  cvImg: string;
  title: string;
  tags: string[];
  MDEValue: string;
  userId: string | undefined;
}

const useCreatePost = (currentPostDataToEdit: PostData | undefined) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useAuth();

  // Value from redux store
  const postDataFromStore = useSelector((state: any) => state.postData);

  const initialState = useMemo(
    () => ({
      cvImg: '',
      title: '',
      tags: [],
      MDEValue: '',
      userId: user?.userId,
    }),
    [user?.userId]
  );

  // States
  const [postData, setPostData] = useState<PostData>(
    currentPostDataToEdit ||
      JSON.parse(
        getItemFromLocalStorage('postDataToPublish') ||
          JSON.stringify(initialState)
      )
  );
  const [title, setTitle] = useState(postData?.title || '');
  const [uploadingImg, setUploadingImg] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);

  // Set title to store
  useEffect(() => {
    dispatch(setTitleToStore(title));
  }, [title, dispatch]);

  // Set postData state everytime postData from store changes
  useEffect(() => {
    const newData: Partial<PostData> = {
      cvImg: postDataFromStore.cvImg,
      title: postDataFromStore.title,
      tags: postDataFromStore.tags,
      MDEValue: postDataFromStore.MDEValue,
      userId: user?.userId,
    };

    setPostData(prevData => ({ ...prevData, ...newData }));
  }, [postDataFromStore, user?.userId]);

  // Save to localStorage
  useEffect(() => {
    saveToLocalStorage(
      currentPostDataToEdit ? 'postDataToManage' : 'postDataToPublish',
      JSON.stringify(postData)
    );
  }, [postData, currentPostDataToEdit]);

  const publishPostHandler = async () => {
    setPublishing(true);

    if (postData.draft) {
      await deletePost(postData.id);
    }

    // If post is a draft, it will have an id but it will be replaced with a Firebase auto-generated id when fetching data in [useGetData.js] file

    try {
      await createPost({ ...postData, draft: false });
      setPublishing(false);
      removeFromLocalStorage('postDataToPublish');
      // removeFromLocalStorage('postDataToManage');
      navigate('/dashboard');
      // console.log('created post successfully');
    } catch (err) {
      setPublishing(false);
      console.log(err);
    }
  };

  const draftPostHandler = async () => {
    setSavingDraft(true);

    const route = postData.draft ? '-1' : '/dashboard/drafts'; // Convert -1 to a string value

    try {
      await draftPost({
        ...postData,
        draft: true,
        id: postData.id || nanoid().replaceAll('_', '-'),
      });

      setSavingDraft(false);
      navigate(route); // Use the 'to' option with the route value
      removeFromLocalStorage('postDataToPublish');
      removeFromLocalStorage('postDataToManage');
      // console.log('drafted post successfully');
    } catch (err) {
      setSavingDraft(false);
      console.log(err);
    }
  };

  const editPostHandler = async () => {
    setPublishing(true);

    try {
      await editPost({ ...postData, updated: true });
      setPublishing(false);
      navigate(-1);
      removeFromLocalStorage('postDataToManage');
      // console.log('edited post successfully');
    } catch (err) {
      setPublishing(false);
      console.log(err);
    }
  };

  return {
    postData,
    title,
    setTitle,
    publishing,
    savingDraft,
    uploadingImg,
    setUploadingImg,
    publishPostHandler,
    draftPostHandler,
    editPostHandler,
  };
};

export default useCreatePost;
