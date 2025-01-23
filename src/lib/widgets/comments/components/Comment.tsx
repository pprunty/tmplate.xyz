'use client';

import React, { useState } from 'react';
import CommentEditor from './CommentEditor'; // Import the CommentEditor
import { formatDistanceToNow } from 'date-fns'; // Import date-fns

export interface CommentProps {
  id?: string;
  text: string;
  author: string;
  points: number;
  timestamp: string; // Added timestamp to calculate time ago
  replies?: CommentProps[];
}

const Comment: React.FC<CommentProps> = ({
  id,
  text,
  author,
  points,
  timestamp,
  replies,
}) => {
  const [showReplyEditor, setShowReplyEditor] = useState<boolean>(false);

  const deleteComment = () => {
    console.log(`Delete comment with ID: ${id}`);
  };

  const toggleReplyEditor = () => {
    setShowReplyEditor((prev) => !prev);
  };

  const postDate = new Date(timestamp);
  const timeAgo = formatDistanceToNow(postDate, { addSuffix: true });

  return (
    <div className="mb-3 border-l border-gray-300 bg-inherit">
      <div className="flex">
        <div className="flex flex-col items-center mr-3">
          <button className="bg-none border-none text-gray-500 hover:text-blue-600 cursor-pointer text-sm">
            ▲
          </button>
          <span className="text-sm text-gray-700 dark:text-[#999999] font-normal">
            {points}
          </span>
          <button className="bg-none border-none text-gray-500 hover:text-blue-600 cursor-pointer text-sm">
            ▼
          </button>
        </div>
        <div className="flex-1">
          <span className="ml-2 text-xs font-mono text-base font-bold">
            @{author}
            <span className="ml-2 text-xs font-mono text-gray-700 dark:text-[#999999] font-normal">
              {' '}
              {timeAgo}
            </span>
          </span>
          <p className="mt-2 text-[15px] text-gray-700 dark:text-[#999999]">
            {text}
          </p>
          <div className="mt-2 flex gap-3">
            <button
              onClick={toggleReplyEditor}
              className="bg-none border-none text-xs text-gray-500 hover:text-blue-600 cursor-pointer"
            >
              Reply
            </button>
            <button
              onClick={deleteComment}
              className="bg-none border-none text-xs text-red-500 hover:text-red-700 cursor-pointer"
            >
              Delete
            </button>
          </div>
          {showReplyEditor && <CommentEditor />}
        </div>
      </div>
      {replies && (
        <div className="ml-5 pl-4 mt-3">
          {replies.map((reply) => (
            <Comment key={reply.id} {...reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
