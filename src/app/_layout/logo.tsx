"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
// Import your config (default export)
import config from "@/app/config";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  // 1. Destructure branding info from config
  const { branding } = config;

  // 2. Pull out relevant fields
  const {
    logo_svg_path,
    show_brand_name,
    url,
    brand_name: {
      name = "",
      font_family = "sans-serif",
      font_weight = "normal",
    } = {},
  } = branding;

  // Optional: define any dynamic classes you want, e.g. if brand name is shown
  // This is up to you. For example:
  const showBrandingClasses = show_brand_name ? "flex" : "inline-block";

  return (
    <Link href={url || "/"}>
      <div
        className={`cursor-pointer ${className} ${showBrandingClasses} items-center space-x-2`}
      >
        {/* If `logo_svg_path` is defined, show that image; else show fallback SVG */}
        {logo_svg_path ? (
          <Image
            src={logo_svg_path}
            alt={`${name} logo`}
            width={40}
            height={40}
            className="w-10 h-10 sm:w-10 sm:h-10 fill-current text-black dark:text-white"
            priority
          />
        ) : (
          // Fallback hardcoded inline SVG
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 sm:w-10 sm:h-10 fill-current text-black dark:text-white"
            width="40"
            height="40"
            viewBox="0 0 300.000000 300.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,300.000000) scale(0.050000,-0.050000)"
              stroke="none"
            >
              <path d="M2232 5475 c-16 -25 -53 -126 -83 -225 -70 -235 -321 -914 -381 -1034 -63 -125 -65 -126 -565 -226 -769 -155 -769 -154 113 -542 365 -161 373 -169 433 -458 69 -336 256 -859 321 -902 92 -60 113 -25 250 412 230 733 238 746 560 810 608 123 900 237 900 353 0 57 -72 91 -494 236 -803 276 -744 226 -807 679 -21 155 -57 409 -78 564 -48 346 -98 444 -169 333z" />
              <path d="M4131 3261 c-7 -10 -49 -134 -94 -275 -253 -791 -314 -907 -497 -935 -214 -34 -654 -137 -695 -163 -92 -59 -70 -74 399 -291 428 -197 426 -196 488 -458 68 -288 204 -687 251 -737 67 -73 108 -27 178 203 104 338 240 703 277 740 21 22 124 55 273 86 793 167 900 293 389 459 -238 77 -645 231 -675 255 -38 31 -58 130 -124 618 -33 249 -66 468 -73 485 -13 35 -79 44 -97 13z" />
            </g>
          </svg>
        )}

        {/* Conditionally render the brand name if enabled */}
        {show_brand_name && (
          <span
            className="text-lg sm:text-lg"
            style={{ fontFamily: font_family, fontWeight: font_weight }}
          >
            {name}
          </span>
        )}
      </div>
    </Link>
  );
};

export default Logo;
