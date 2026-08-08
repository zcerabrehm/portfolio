import { useEffect, useState } from "react";

export function useLocalTime(timeZone = "Asia/Manila") {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () => {
      try {
        setTime(
          new Intl.DateTimeFormat("en-GB", {
            timeZone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }).format(new Date()),
        );
      } catch {
        setTime(new Date().toLocaleTimeString());
      }
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
}
