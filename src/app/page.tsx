'use client';

import React, { useState } from "react";
import Image from "next/image";
import LocaleSwitcher from '@/lib/widgets/common/templates/LocaleSwitcher';
import ThemeSwitcher from '@/lib/widgets/common/templates/ThemeSwitcher';
import Carousel from "@/lib/composition/views/Carousel";
import Grid from "@/lib/composition/views/Grid";
import Modal from "@/lib/composition/views/Modal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center w-full max-w-screen-xl mx-auto min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <LocaleSwitcher />
      <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li className="mb-2">
          Get started by editing{" "}
          <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
            src/app/page.tsx
          </code>
          .
        </li>
        <li>Save and see your changes instantly.</li>
      </ol>

      {/* Carousel Showcase */}
      <h3 className="text-lg font-bold mb-4">Carousel</h3>
      <Carousel
        items={[
          <div
            key="widget-1" // Added key
            className="bg-red-500 h-40 flex items-center justify-center text-white font-bold"
          >
            Widget 1
          </div>,
          <div
            key="widget-2" // Added key
            className="bg-blue-500 h-40 flex items-center justify-center text-white font-bold"
          >
            Widget 2
          </div>,
          <div
            key="widget-3" // Added key
            className="bg-green-500 h-40 flex items-center justify-center text-white font-bold"
          >
            Widget 3
          </div>,
        ]}
      />

      {/* Grid Showcase */}
      <h3 className="text-lg font-bold mb-4">Grid</h3>
      <Grid columns={2} gap="gap-4">
        <div
          key="grid-widget-1" // Added key
          className="bg-red-500 h-20 flex items-center justify-center text-white font-bold"
        >
          Widget 1
        </div>
        <div
          key="grid-widget-2" // Added key
          className="bg-blue-500 h-20 flex items-center justify-center text-white font-bold"
        >
          Widget 2
        </div>
        <div
          key="grid-widget-3" // Added key
          className="bg-green-500 h-20 flex items-center justify-center text-white font-bold"
        >
          Widget 3
        </div>
      </Grid>

      {/* Modal Showcase */}
      <h3 className="text-lg font-bold mb-4">Modal</h3>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => setIsModalOpen(true)}
      >
        Open Modal
      </button>
      <Modal
        isOpen={isModalOpen}
        size="lg"
        onClose={() => setIsModalOpen(false)}
      >
        <div className="flex flex-col gap-4 p-6">
          <div
            key="modal-widget-1" // Added key
            className="bg-red-500 p-4 rounded-lg text-white font-bold"
          >
            Widget 1
          </div>
          <div
            key="modal-widget-2" // Added key
            className="bg-blue-500 p-4 rounded-lg text-white font-bold"
          >
            Widget 2
          </div>
        </div>
      </Modal>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <ThemeSwitcher />
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
