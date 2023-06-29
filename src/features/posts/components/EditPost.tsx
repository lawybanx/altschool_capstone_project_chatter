import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreatePost from '../containers/CreatePost';

const EditPost: React.FC = () => {
  const currentPostData = useSelector(
    (state: any) => state.currentPost.currentPostData
  );

  const navigate = useNavigate();

  if (!currentPostData) {
    navigate(-1);
    return null;
  }

  return <CreatePost currentPostDataToEdit={currentPostData} />;
};

export default EditPost;
