import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function SkeletonBlock() {
  return (
    <div>
      <Skeleton height={533} width={300} />
      <div>
        <Skeleton height={8} width={100} />
        <Skeleton height={9} width={200} />
        <Skeleton height={9} width={50} />
      </div>
    </div>
  );
}
