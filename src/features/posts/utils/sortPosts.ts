import { getPostsByTag } from '../../../helper/getPostsByTag';
import { calcTotalDiscussion } from '../../comments/utils/calculateTotal';

type Tag = {
  tagName: string;
};

interface Post {
  id: string;
  name: string;
  MDEValue: string;
  username: string;
  profile: string;
  cvImg: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  title: string;
  draft: boolean;
  tags: Tag[];
  readTime: number;
  updated: boolean | any;
  userId: string;
  bookmark?: string[];
  alreadyBookmarked?: boolean;
  likes: string[];
  comments: CommentData[];
}

interface CommentData {
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

export const sortPosts = (
  sort: string | any,
  posts: Post[],
  followingTags: string[]
): Post[] => {
  let sortedPosts: Post[] = [];

  switch (sort) {
    case 'latest':
      sortedPosts = posts.sort((a, b) => {
        const aDate = new Date(
          a.createdAt.seconds * 1000 + a.createdAt.nanoseconds / 1000000
        );
        const bDate = new Date(
          b.createdAt.seconds * 1000 + b.createdAt.nanoseconds / 1000000
        );
        return bDate.getTime() - aDate.getTime();
      });
      break;

    case 'followingTags':
      if (followingTags.length === 0) {
        // Randomize posts if there are no following tags
        sortedPosts = posts.sort(() => Math.random() - 0.5);
      } else {
        sortedPosts = getPostsByTag(followingTags, posts);
      }
      break;

    case 'top':
      sortedPosts = posts
        .map(post => {
          const totalLikes = post.likes.length;
          const totalComments = calcTotalDiscussion(post.comments);
          return { ...post, totalLikes, totalComments };
        })
        .sort(
          (a, b) =>
            b.totalLikes + b.totalComments - (a.totalLikes + a.totalComments)
        );
      break;

    default:
      sortedPosts = posts.sort((a, b) => {
        const aDate = new Date(
          a.createdAt.seconds * 1000 + a.createdAt.nanoseconds / 1000000
        );
        const bDate = new Date(
          b.createdAt.seconds * 1000 + b.createdAt.nanoseconds / 1000000
        );
        return bDate.getTime() - aDate.getTime();
      });
      break;
  }

  return sortedPosts;
};