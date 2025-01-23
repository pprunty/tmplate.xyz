"use client";

import React, { useCallback } from "react";
import { SnapScrollView, SnapScrollViewItem } from "@/lib/composition/views/SnapScrollView";

const SnapScrollViewShowcase: React.FC = () => {
  const handleFetchMore = useCallback(async () => {
    console.log("Fetching more items...");
    // Simulate a delay for fetching
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }, []);

  const items = [
    { id: "1", content: "Widget 1", bgColor: "bg-red-500" },
    { id: "2", content: "Widget 2", bgColor: "bg-blue-500" },
    { id: "3", content: "Widget 3", bgColor: "bg-green-500" },
  ];

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <SnapScrollView
        items={items}
        enableDynamicRouting
        routePrefix="widgets"
        onFetchMore={handleFetchMore}
        fetchThreshold={2}
      >
        {items.map((item) => (
          <SnapScrollViewItem key={item.id}>
            <div
              className={`${item.bgColor} h-screen flex items-center justify-center text-white font-bold`}
            >
              {item.content}
            </div>
          </SnapScrollViewItem>
        ))}
      </SnapScrollView>
    </div>
  );
};

export default SnapScrollViewShowcase;
