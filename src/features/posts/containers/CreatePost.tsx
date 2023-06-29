import React from 'react';
import { Navigate } from 'react-router-dom';
import CreatePostForm from '../components/CreatePostForm';
import { useAuth, User } from '../../../context/auth';
import useCreatePost from '../hooks/useCreatePost';

interface Props {
  currentPostDataToEdit: any;
}

const CreatePost: React.FC<Props> = ({ currentPostDataToEdit }) => {
  const user = useAuth() as User;

  const {
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
  } = useCreatePost(currentPostDataToEdit);

  if (!user) {
    return <Navigate to='/create-account' replace />;
  }

  return (
    <CreatePostForm
      publishPostHandler={publishPostHandler}
      draftPostHandler={draftPostHandler}
      editPostHandler={editPostHandler}
      setPostTitle={setTitle}
      postTitle={title}
      postData={postData}
      pageTitle={currentPostDataToEdit ? 'Edit' : 'Create'}
      publishing={publishing}
      savingDraft={savingDraft}
      uploadingImg={uploadingImg}
      setUploadingImg={setUploadingImg}
      toEdit={!!currentPostDataToEdit}
    />
  );
};

export default CreatePost;
