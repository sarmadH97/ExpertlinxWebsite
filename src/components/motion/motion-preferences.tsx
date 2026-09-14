"use client";

import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import { REDUCED_MOTION_QUERY } from "@/lib/motion";

const MotionContext = createContext({ enabled: false, reduced: true, paused: false, toggle: () => {} });
function subscribe(callback: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export function MotionPreferences({ children }: { children: ReactNode }) {
  const reduced = useSyncExternalStore(subscribe, () => window.matchMedia(REDUCED_MOTION_QUERY).matches, () => true);
  const [paused, setPaused] = useState(false);
  const enabled = !reduced && !paused;
  return (
    <MotionContext.Provider value={{ enabled, reduced, paused, toggle: () => setPaused((value) => !value) }}>
      <div data-motion={enabled ? "on" : "off"}>{children}</div>
    </MotionContext.Provider>
  );
}

export const useMotionPreference = () => useContext(MotionContext);

export function MotionToggle() {
  const { enabled, reduced, toggle } = useMotionPreference();
  return (
    <button className="motion-toggle" onClick={toggle} disabled={reduced}
      aria-label={reduced ? "Reduced motion enabled by your system" : enabled ? "Pause animations" : "Enable animations"}>
      {enabled ? <Pause size={12} aria-hidden="true" /> : <Play size={12} aria-hidden="true" />}
      <span>{reduced ? "Reduced motion" : enabled ? "Motion on" : "Motion off"}</span>
    </button>
  );
}
