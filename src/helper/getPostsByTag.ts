type Tag = {
  tagName: string;
};

type Post = {
  cvImg: string;
  id: string;
  title: string;
  tags: Tag[];
  MDEValue: string;
};
export const getPostsByTag = (tagNames: string[], posts: Post[]): Post[] => {
  return posts.filter(post => {
    for (const tagObj of post.tags) {
      if (tagNames.includes(tagObj.tagName)) {
        return true;
      }
    }
    return false;
  });
};
