// Sample Refresher Component
// to be imported into SSR page
// needing a refresh after
// next.js appDir Link nav

"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Refresher() {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return <></>;
}
