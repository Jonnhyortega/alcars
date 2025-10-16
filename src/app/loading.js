// app/loading.js
"use client";

import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-50">
      <ClipLoader color="#3b82f6" size={60} />
    </div>
  );
}
