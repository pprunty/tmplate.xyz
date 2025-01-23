import React from 'react';
import CommentList from '@/__samwise/modules/comments/components/CommentList';
import CommentEditor from '@/__samwise/modules/comments/components/CommentEditor';
import { commentData } from '@/__samwise/modules/comments/commentData';

const CommentsSection: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Comments:</h1>
      <CommentEditor />
      <CommentList comments={commentData} />
    </div>
  );
};

export default CommentsSection;
