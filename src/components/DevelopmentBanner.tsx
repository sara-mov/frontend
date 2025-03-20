"use client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function DevelopmentBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2  bg-yellow-500 text-black text-center py-2 text-sm font-semibold flex justify-between px-4 z-20">
      <span>
        🚧 This site is under development. Expect improvements soon! 🚀
      </span>
      <button onClick={() => setVisible(false)} className="ml-4">
        <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
      </button>
    </div>
  );
}
