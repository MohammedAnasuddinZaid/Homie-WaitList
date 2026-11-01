"use client";

import { useCallback, useEffect, useState } from "react";
import { BASE_COUNT } from "@/lib/constants";

export default function LiveCount({ initial }: { initial: number }) {
  const [count, setCount] = useState(0);

  const animateTo = useCallback((end: number) => {
    const start = 0;
    const duration = 1600;
    const startTime = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(start + (end - start) * eased));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    fetch("/api/waitlist/count")
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.count === "number") {
          animateTo(BASE_COUNT + d.count);
        } else {
          animateTo(BASE_COUNT + (initial > 0 ? initial : 0));
        }
      })
      .catch(() => animateTo(BASE_COUNT + (initial > 0 ? initial : 0)));
  }, [animateTo, initial]);

  return <span>{count.toLocaleString()} people</span>;
}
