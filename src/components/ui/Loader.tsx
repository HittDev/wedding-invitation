import React from 'react';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'spinner' | 'dots' | 'pulse' | 'bounce';
  size?: 'sm' | 'md' | 'lg';
}

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>((
  { className = '', variant = 'spinner', size = 'md', ...props },
  ref,
) => {
  const sizeClasses: Record<string, string> = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  if (variant === 'spinner') {
    return (
      <div
        ref={ref}
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-primary-gold border-t-transparent ${className}`}
        {...props}
      />
    );
  }

  if (variant === 'dots') {
    return (
      <div ref={ref} className={`flex gap-1 items-center ${className}`} {...props}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-full bg-primary-gold animate-pulse"
            style={{
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div
        ref={ref}
        className={`${sizeClasses[size]} rounded-full bg-primary-gold animate-pulse-soft ${className}`}
        {...props}
      />
    );
  }

  if (variant === 'bounce') {
    return (
      <div ref={ref} className={`flex gap-1 items-end h-6 ${className}`} {...props}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1 bg-primary-gold rounded-full animate-bounce-light"
            style={{
              height: `${(i + 1) * 8}px`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    );
  }

  return null;
});

Loader.displayName = 'Loader';

export { Loader };
