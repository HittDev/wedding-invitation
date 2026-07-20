import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>((
  {
    size = 'lg',
    padding = 'md',
    className = '',
    children,
    ...props
  },
  ref,
) => {
  const sizeClasses: Record<string, string> = {
    sm: 'max-w-sm',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'w-full',
  };

  const paddingClasses: Record<string, string> = {
    none: 'p-0',
    sm: 'px-4 py-8 md:px-6',
    md: 'px-6 py-12 md:px-8',
    lg: 'px-8 py-16 md:px-12',
    xl: 'px-12 py-20 md:px-16',
  };

  return (
    <div
      ref={ref}
      className={`mx-auto w-full ${sizeClasses[size]} ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Container.displayName = 'Container';

export { Container };
