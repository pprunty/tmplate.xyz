"use client";

import React, { useEffect, useCallback, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { debounce } from 'lodash';

interface SnapScrollViewProps {
  children: React.ReactNode;
  items: { id: string }[];
  enableDynamicRouting?: boolean;
  onFetchMore: () => Promise<void>; // Callback to fetch more items
  fetchThreshold?: number; // /* num_of_items_in_api_return */
}

const SnapScrollView: React.FC<SnapScrollViewProps> = ({
  children,
  items,
  enableDynamicRouting = true,
  onFetchMore,
  fetchThreshold = 7,
}) => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [isFetching, setIsFetching] = useState(false); // State to track fetching new items

  const updateURL = useCallback(
    (index: number) => {
      if (enableDynamicRouting && index >= 0 && index < items.length) {
        const newPath = `/articles/${items[index].id}`;
        window.history.replaceState({ path: newPath }, '', newPath);
        console.log(`URL updated to: ${newPath}`);
      }
    },
    [enableDynamicRouting, items]
  );

  const handleScroll = useCallback(() => {
    const snapContainer = containerRef.current;
    if (snapContainer && !isLoading) {
      const index = Math.round(snapContainer.scrollTop / snapContainer.clientHeight);

      if (index !== currentIndex) {
        setCurrentIndex(index);
        updateURL(index);
        console.log(`Current index updated to: ${index}, items length: ${items.length}`);
      }

      if (index >= items.length - 1 && !isLoading && !isFetching) {
        setIsLoading(true);
        setIsFetching(true);
        onFetchMore()
          .then(() => {
            setIsLoading(false);
            setIsFetching(false);
          })
          .catch((error) => {
            console.error(`Error fetching more items: ${error.message || error}`);
            setIsLoading(false);
            setIsFetching(false);
          });
      }

      if (items.length - index <= fetchThreshold && index < items.length - 1 && !isFetching) {
        setIsFetching(true);
        onFetchMore()
          .then(() => setIsFetching(false))
          .catch((error) => {
            console.error(`Error fetching more items during pre-fetch: ${error.message || error}`);
            setIsFetching(false);
          });
      }
    }
  }, [currentIndex, updateURL, items, onFetchMore, fetchThreshold, isLoading, isFetching]);

  useEffect(() => {
    const container = containerRef.current;
    const debouncedHandleScroll = debounce(handleScroll, 100);
    if (container) {
      container.addEventListener('scroll', debouncedHandleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', debouncedHandleScroll);
      }
      debouncedHandleScroll.cancel();
    };
  }, [handleScroll]);

  useEffect(() => {
    if (enableDynamicRouting && pathname) {
      const articleId = pathname.split('/').pop();
      const index = items.findIndex((item) => item.id === articleId);
      const snapContainer = containerRef.current;
      if (snapContainer && index !== -1 && index !== currentIndex) {
        snapContainer.scrollTo({
          top: index * snapContainer.clientHeight,
          behavior: 'smooth',
        });
        setCurrentIndex(index);
      }
    }
  }, [pathname, items, currentIndex, enableDynamicRouting]);

  return (
    <div
      ref={containerRef}
      className={`flex flex-col h-screen ${
        isLoading ? 'justify-center overflow-hidden' : 'overflow-y-scroll'
      } scroll-smooth snap-y snap-mandatory no-scrollbar`}
    >
      {children}
      {isLoading && <div>Loading...</div>} {/* Replace with PageLoader when defined */}
    </div>
  );
};

interface SnapScrollViewItemProps {
  children: React.ReactNode;
}

const SnapScrollViewItem: React.FC<SnapScrollViewItemProps> = ({ children }) => {
  return (
    <div className="snap-start flex h-screen flex-shrink-0 items-start justify-center transition-transform duration-300 transform will-change-transform translate-z-0">
      {children}
    </div>
  );
};

export { SnapScrollView, SnapScrollViewItem };
