import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from '../../features/landing/containers/Landing';

const RegisterPage = lazy(
  () => import('../../features/users/containers/RegisterPage')
);

const DefaultLayout = lazy(() => import('./DefaultLayout'));
const HomeLayout = lazy(() => import('./HomeLayout'));

const Feeds = lazy(() => import('../../features/posts/containers/Feeds'));
const Explore = lazy(() => import('../../features/tags/containers/Explore'));
const Bookmarks = lazy(
  () => import('../../features/posts/containers/Bookmarks')
);

const TagDetails = lazy(
  () => import('../../features/tags/containers/TagDetails')
);

const Profile = lazy(() => import('../../features/profile/containers/Profile'));
const EditProfile = lazy(
  () => import('../../features/profile/containers/EditProfile')
);

const Dashboard = lazy(
  () => import('../../features/dashboard/containers/Dashboard')
);

const Posts = lazy(() => import('../../features/dashboard/components/Posts'));

const Drafts = lazy(() => import('../../features/dashboard/components/Drafts'));

const Followers = lazy(
  () => import('../../features/dashboard/components/Followers')
);

const Following = lazy(
  () => import('../../features/dashboard/components/Following')
);

const FollowingTags = lazy(
  () => import('../../features/dashboard/components/FollowingTags')
);

const PostDetails = lazy(
  () => import('../../features/posts/containers/PostDetails')
);

// const Search = lazy(() => import('../features/posts/containers/Search'));

const EditPost = lazy(() => import('../../features/posts/components/EditPost'));

const CreatePost = lazy(
  () => import('../../features/posts/containers/CreatePost')
);
const EditComment = lazy(
  () => import('../../features/comments/components/EditComment')
);

const DeleteComment = lazy(
  () => import('../../features/comments/utils/DeleteComment')
);

// const Contact = lazy(() => import('../shared/containers/Contact'));
// const About = lazy(() => import('../shared/containers/About'));
const Error = lazy(() => import('../components/Error'));

const ConfigRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<HomeLayout />}>
        <Route index element={<Feeds />} />
        <Route path='explore' element={<Explore />} />
        <Route path='bookmarks' element={<Bookmarks />} />
        <Route path='tag/:tagname' element={<TagDetails />} />
      </Route>

      <Route element={<DefaultLayout />}>
        <Route path='/:user/:title' element={<PostDetails />} />
        <Route path=':username' element={<Profile />} />
        <Route path='edit-profile' element={<EditProfile />} />
        <Route path='dashboard' element={<Dashboard />}>
          <Route index element={<Posts />} />
          <Route path='drafts' element={<Drafts />} />
          <Route path='followers' element={<Followers />} />
          <Route path='following' element={<Following />} />
          <Route path='following_tags' element={<FollowingTags />} />
        </Route>

        <Route path='delete-comment' element={<DeleteComment />} />
        <Route path='edit-comment' element={<EditComment />} />
        {/* <Route path='search' element={<Search />} /> */}
        {/* <Route path='contact' element={<Contact />} /> */}
        {/* <Route path='about' element={<About />} /> */}
      </Route>

      {/* Unauthorized routes */}
      <Route path='landing' element={<Landing />} />
      <Route path='create-account' element={<RegisterPage />} />
      <Route path='edit-post' element={<EditPost />} />
      <Route
        path='create-post'
        element={<CreatePost currentPostDataToEdit={undefined} />}
      />
      <Route path='*' element={<Error />} />
    </Routes>
  );
};

export default ConfigRoute;
