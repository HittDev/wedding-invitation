'use client';

import React, { useEffect, useState } from 'react';
import { calculateCountdown, type CountdownData } from '@/utils/date';
import { COUNTDOWN_UPDATE_INTERVAL } from '@/lib/constants';

interface CountdownTimerProps {
  targetDate: Date;
  onExpired?: () => void;
  format?: 'full' | 'compact' | 'detailed';
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  onExpired,
  format = 'full',
  className = '',
}) => {
  const [countdown, setCountdown] = useState<CountdownData | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCountdown(calculateCountdown(targetDate));
  }, [targetDate]);

  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      const newCountdown = calculateCountdown(targetDate);
      setCountdown(newCountdown);

      if (newCountdown.isExpired && onExpired) {
        onExpired();
        clearInterval(interval);
      }
    }, COUNTDOWN_UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [targetDate, onExpired, isClient]);

  if (!countdown || !isClient) {
    return <div className={`animate-pulse bg-primary-gold bg-opacity-20 rounded-lg h-12 ${className}`} />;
  }

  if (countdown.isExpired) {
    return (
      <div className={`text-center ${className}`}>
        <p className="text-xl font-serif font-bold text-primary-gold">¡El gran día ha llegado!</p>
      </div>
    );
  }

  if (format === 'compact') {
    return (
      <div className={`text-center ${className}`}>
        <p className="text-3xl font-serif font-bold text-primary-gold">
          {countdown.days}d {countdown.hours}h {countdown.minutes}m
        </p>
      </div>
    );
  }

  if (format === 'detailed') {
    return (
      <div className={`grid grid-cols-4 gap-4 text-center ${className}`}>
        <div className="p-4 bg-primary-cream rounded-lg">
          <p className="text-3xl font-serif font-bold text-primary-gold">{countdown.days}</p>
          <p className="text-xs font-medium text-neutral-dark mt-1">Días</p>
        </div>
        <div className="p-4 bg-primary-cream rounded-lg">
          <p className="text-3xl font-serif font-bold text-primary-gold">{countdown.hours}</p>
          <p className="text-xs font-medium text-neutral-dark mt-1">Horas</p>
        </div>
        <div className="p-4 bg-primary-cream rounded-lg">
          <p className="text-3xl font-serif font-bold text-primary-gold">{countdown.minutes}</p>
          <p className="text-xs font-medium text-neutral-dark mt-1">Minutos</p>
        </div>
        <div className="p-4 bg-primary-cream rounded-lg">
          <p className="text-3xl font-serif font-bold text-primary-gold">{countdown.seconds}</p>
          <p className="text-xs font-medium text-neutral-dark mt-1">Segundos</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`text-center ${className}`}>
      <div className="flex items-center justify-center gap-8">
        <div>
          <p className="text-4xl font-serif font-bold text-primary-gold">{countdown.days}</p>
          <p className="text-sm font-medium text-neutral-dark mt-2">días</p>
        </div>
        <p className="text-2xl font-serif text-primary-gold opacity-50">:</p>
        <div>
          <p className="text-4xl font-serif font-bold text-primary-gold">
            {String(countdown.hours).padStart(2, '0')}
          </p>
          <p className="text-sm font-medium text-neutral-dark mt-2">horas</p>
        </div>
        <p className="text-2xl font-serif text-primary-gold opacity-50">:</p>
        <div>
          <p className="text-4xl font-serif font-bold text-primary-gold">
            {String(countdown.minutes).padStart(2, '0')}
          </p>
          <p className="text-sm font-medium text-neutral-dark mt-2">minutos</p>
        </div>
        <p className="text-2xl font-serif text-primary-gold opacity-50">:</p>
        <div>
          <p className="text-4xl font-serif font-bold text-primary-gold">
            {String(countdown.seconds).padStart(2, '0')}
          </p>
          <p className="text-sm font-medium text-neutral-dark mt-2">segundos</p>
        </div>
      </div>
    </div>
  );
};

export { CountdownTimer };
