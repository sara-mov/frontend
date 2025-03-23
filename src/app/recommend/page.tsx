import RecommendComponent from "@/components/RecommendComponent";
import { Suspense } from "react";

export default function RecommendPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecommendComponent />
    </Suspense>
  );
}
