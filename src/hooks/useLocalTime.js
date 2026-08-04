import { useEffect, useState } from "react";

/**
 * Live local clock string, updates every second.
 */
export function useLocalTime() {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          timeZoneName: "short",
        }),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}
