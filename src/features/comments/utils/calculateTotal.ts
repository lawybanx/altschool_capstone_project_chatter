interface CommentItem {
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

export const calcTotalDiscussion = (comments: CommentItem[]): number => {
  return comments.reduce((count: number, item: CommentItem) => {
    return count + Object.values(item.replies).length + 1;
  }, 0);
};

export const calculateWrittenComments = (
  commentArr: CommentItem[],
  userId: string
): number => {
  let writtenComments = 0;

  commentArr.forEach(commentItem => {
    if (commentItem.userId === userId) {
      writtenComments++;
    }

    const repliedComments = Object.values(commentItem.replies);
    repliedComments.forEach(comment => {
      if (comment.userId === userId) {
        writtenComments++;
      }
    });
  });

  return writtenComments;
};
