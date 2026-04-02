"use client";

import { useEffect, useRef } from "react";
import { SITE_DOCUMENT_TITLE, TAB_ATTENTION_TITLES } from "@/lib/siteTitle";

const ROTATE_MS = 2200;

export function TabAttentionTitle() {
  const seenVisibleRef = useRef(false);
  const indexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const clearRotation = () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const applyNextTitle = () => {
      const titles = TAB_ATTENTION_TITLES;
      document.title = titles[indexRef.current];
      indexRef.current = (indexRef.current + 1) % titles.length;
    };

    const startRotation = () => {
      clearRotation();
      applyNextTitle();
      intervalRef.current = setInterval(applyNextTitle, ROTATE_MS);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        if (seenVisibleRef.current) {
          startRotation();
        }
        return;
      }
      seenVisibleRef.current = true;
      clearRotation();
      indexRef.current = 0;
      document.title = SITE_DOCUMENT_TITLE;
    };

    if (!document.hidden) {
      seenVisibleRef.current = true;
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      clearRotation();
      document.title = SITE_DOCUMENT_TITLE;
    };
  }, []);

  return null;
}
