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
  value: string;
  replies: Record<string, any>;
  createdAt: string;
  userId: string;
  commentId: string;
  likes: string[];
}

export const getPostsByTag = (
  tagNames: string[] | any,
  posts: Post[]
): Post[] => {
  return posts.filter(post => {
    for (const tagObj of post.tags) {
      if (tagNames.includes(tagObj.tagName)) {
        return true;
      }
    }
    return false;
  });
};
