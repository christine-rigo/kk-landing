"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold text-isar3-orange">Oops! Page not found.</h1>
      <p className="text-xl font-semibold mt-2"></p>
      <p className="text-gray-600 mt-1">The page you are looking for doesn’t exist.</p>
      <Link
        href="/"
        className="mt-6 px-6 py-2 text-white bg-kk-bright-teal-dark rounded-lg"
      >
        Go Home
      </Link>
    </div>
  );
}
