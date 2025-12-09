// app/not-found.tsx
"use client";

import { ArrowLeft, Home, Ghost } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md w-full text-center">
        <div className="flex items-center justify-center mb-6">
          <Ghost className="w-20 h-20 text-indigo-500" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900">Page Not Found</h1>
        <p className="mt-3 text-gray-600 text-lg">
          Oops! The page you're looking for doesn’t exist or may have been
          moved.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl font-medium shadow-sm hover:bg-indigo-700 transition"
          >
            <Home className="w-5 h-5" />
            Back to Homepage
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-indigo-600 border border-indigo-300 rounded-xl font-medium hover:bg-indigo-100 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        <p className="text-sm text-gray-400 mt-8">Error 404</p>
      </div>
    </div>
  );
}
