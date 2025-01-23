'use client';

import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function CommentEditor() {
  const [value, setValue] = useState<string>('');

  const modules = useMemo(() => {
    return {
      toolbar: [
        [{ header: [3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        ['clean'], // Remove formatting button
      ],
    };
  }, []);

  const handleSave = () => {
    alert('Content saved! Check console for the output.');
  };

  return (
    <div className="flex flex-col w-full mt-5">
      <ReactQuill
        modules={modules}
        theme="snow"
        value={value}
        onChange={(content) => setValue(content)}
        className="ql-editor"
      />
      <button
        onClick={handleSave}
        className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg text-sm hover:bg-blue-600 transition ease-in"
      >
        Save
      </button>
    </div>
  );
}
