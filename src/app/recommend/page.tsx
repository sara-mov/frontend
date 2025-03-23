import RecommendComponent from "@/components/RecommendComponent";
import { Suspense } from "react";

export default function RecommendPage() {
  return (
    <Suspense>
      <RecommendComponent />
    </Suspense>
  );
}
