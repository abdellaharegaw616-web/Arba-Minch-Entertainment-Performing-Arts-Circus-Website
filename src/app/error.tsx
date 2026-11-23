"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime route error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F7F3EA] text-[#17251F] py-16 px-4">
      <div className="max-w-md w-full bg-[#EBE5D6] p-8 rounded-2xl border border-[#D6A84F]/40 shadow-md text-center space-y-5">
        <div className="w-14 h-14 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto border border-red-200">
          <AlertCircle className="w-7 h-7" />
        </div>
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            Application Error
          </span>
          <h2 className="text-2xl font-extrabold text-[#17251F] mt-1">
            Something Went Wrong
          </h2>
          <p className="text-xs text-[#17251F]/70 mt-2">
            An unexpected error occurred while loading this page. You can try refreshing the stage.
          </p>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={() => reset()}
            className="w-full py-2.5 px-4 rounded bg-[#C64B24] text-[#F7F3EA] font-semibold text-xs hover:bg-[#A83C1A] transition-colors flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
          <Link
            href="/"
            className="w-full py-2 px-4 rounded border border-[#D6A84F]/40 text-[#17251F] font-semibold text-xs hover:bg-[#D6A84F]/20 transition-colors flex items-center justify-center gap-1"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
