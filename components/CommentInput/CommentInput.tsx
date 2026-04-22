import { Comment } from '@/app/comments/page';
import { Dispatch, SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface CommentInputProps {
  id: string;
  comments: Comment[];
  setComments: Dispatch<SetStateAction<Comment[]>>;
  toggleInput: (id: string) => void;
}

export default function CommentInput({
  comments,
  id,
  setComments,
  toggleInput,
}: CommentInputProps) {
  const handleSubmit = (formData: FormData) => {
    const customId = uuidv4();
    const text = formData.get('user-comment') as string;
    if (!text.trim()) return;
    const newComment: Comment = {
      id: customId,
      text: text,
      likes: 0,
      replies: [],
    };

    const updateTree = (commentsArr: Comment[], commentId: string): Comment[] =>
      commentsArr.map(comment => {
        if (comment.id === commentId)
          return { ...comment, replies: [...comment.replies, newComment] };
        if (comment.replies.length > 0)
          return {
            ...comment,
            replies: updateTree(comment.replies, commentId),
          };
        return comment;
      });

    setComments(updateTree(comments, id));
    toggleInput(id);
  };

  return (
    <form action={handleSubmit}>
      <input type="text" placeholder="Enter a comment..." name="user-comment" />
      <button type="submit">Add reply</button>
    </form>
  );
}
