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
