import React from 'react';
import Comment from './Comment';
import { CommentProps } from './Comment'; // Import the type from Comment.tsx

interface CommentListProps {
  comments: Array<CommentProps>;
}
// Helper function to calculate the popularity score
const calculatePopularityScore = (points: number, timestamp: string) => {
  const now = new Date().getTime();
  const commentTime = new Date(timestamp).getTime();
  const timeElapsedInHours = (now - commentTime) / (1000 * 60 * 60); // Convert milliseconds to hours

  // Calculate popularity score based on points and time decay
  const score = points / Math.pow(timeElapsedInHours + 2, 1.5);

  return score;
};

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  // Sort comments by popularity score in descending order
  const sortedComments = [...comments].sort((a, b) => {
    const scoreA = calculatePopularityScore(a.points, a.timestamp);
    const scoreB = calculatePopularityScore(b.points, b.timestamp);
    return scoreB - scoreA; // Sort in descending order
  });

  return (
    <div>
      {sortedComments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
};

export default CommentList;
