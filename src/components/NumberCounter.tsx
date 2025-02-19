import { useState, useEffect, useRef } from "react";

const NumberCounter = ({
  from,
  to,
  duration = 2000,
}: {
  from: number;
  to: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(from);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 } // Start when 50% of the component is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const updateCounter = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      setCount(Math.floor(from + (to - from) * progress));

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [isVisible, from, to, duration]);

  return (
    <span ref={ref} className="text-3xl font-bold">
      {count}
    </span>
  );
};

export default NumberCounter;
