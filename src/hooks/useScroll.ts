import { useState, useEffect } from 'react';

export function useScroll(threshold = 0) {
  const [didScroll, setDidScroll] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (!didScroll && window.scrollY > threshold) {
        setDidScroll(true);
      } else if (didScroll && window.scrollY <= threshold) {
        setDidScroll(false);
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return didScroll;
}
