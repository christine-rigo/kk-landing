'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const GameTracker: React.FC = () => {
  const startTimeRef = useRef<number | null>(null);
  const previousPathRef = useRef<string | null>(null);
  const pathname = usePathname();

  const isLobbyGamePage = (path: string | null) =>
    path !== null && /^\/lobby\/[^/]+\/[^/]+$/.test(path);

  useEffect(() => {
    const prevPath = previousPathRef.current;
    const now = Date.now();

    // Handle exit from previous tracked route
    if (isLobbyGamePage(prevPath) && !isLobbyGamePage(pathname)) {
      if (startTimeRef.current) {
        const timeSpent = now - startTimeRef.current;

        const existingData = localStorage.getItem('gameTimeTracker');
        const parsedData = existingData ? JSON.parse(existingData) : [];

        const existingEntry = parsedData.find((entry: any) => entry.url === prevPath);

        if (existingEntry) {
          existingEntry.timespent += timeSpent;
          existingEntry.created_at = new Date().toISOString(); // update timestamp to latest session
        } else {
          parsedData.push({
            timespent: timeSpent,
            url: prevPath,
            created_at: new Date().toISOString(),
          });
        }

        localStorage.setItem('gameTimeTracker', JSON.stringify(parsedData));
        console.log('Timer stopped..', { timeSpent, from: prevPath });

        startTimeRef.current = null;
      }
    }

    // Handle entry into a new tracked route
    if (isLobbyGamePage(pathname) && !isLobbyGamePage(prevPath)) {
      startTimeRef.current = now;
      console.log('Timer starts..', pathname);
    }

    // Update the previousPath
    previousPathRef.current = pathname;
  }, [pathname]);

  return null;
};

export default GameTracker;