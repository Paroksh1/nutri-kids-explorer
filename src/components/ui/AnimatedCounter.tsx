
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1000,
  className,
  decimals = 0,
  prefix = '',
  suffix = '',
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  
  useEffect(() => {
    const startValue = displayValue;
    const endValue = value;
    const totalChange = endValue - startValue;
    
    if (totalChange === 0) return;
    
    const animateCount = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      
      const currentValue = startValue + totalChange * easedProgress;
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animateCount);
      }
    };
    
    frameRef.current = requestAnimationFrame(animateCount);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value, duration]);
  
  // Easing function for smooth animation
  const easeOutQuart = (x: number): number => {
    return 1 - Math.pow(1 - x, 4);
  };
  
  const formattedValue = prefix + displayValue.toFixed(decimals) + suffix;
  
  return (
    <span className={cn("font-mono transition-all duration-75", className)}>
      {formattedValue}
    </span>
  );
};

export default AnimatedCounter;
