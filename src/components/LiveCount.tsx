"use client";

import { useEffect, useState } from "react";

export default function LiveCount({ initial }: { initial: number }) {
  const [count, setCount] = useState<number | null>(initial > 0 ? initial : null);

  useEffect(() => {
    fetch("/api/waitlist/count")
      .then((r) => r.json())
      .then((d) => typeof d.count === "number" && setCount(d.count))
      .catch(() => {});
  }, []);

  if (count === null) {
    return <span>Be the first</span>;
  }
  return <span>{count.toLocaleString()} people</span>;
}
