import { Suspense } from "react";
import { WallpaperGenerator } from "@/components/wallpaper-generator";

export default function Page() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <WallpaperGenerator />
    </Suspense>
  );
}
