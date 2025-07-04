import { useState } from "react";

const ExpandableText = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`w-full md:w-[50%] max-w-full text-justify cursor-pointer transition-all duration-300 ${
        isExpanded ? "" : "line-clamp-3 overflow-hidden"
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {text}
    </div>
  );
};

export default ExpandableText;
