import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-gold focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-primary-gold text-white hover:bg-opacity-90 active:scale-95',
        secondary: 'bg-primary-warm-beige text-white hover:bg-opacity-90 active:scale-95',
        outline: 'border-2 border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-white active:scale-95',
        ghost: 'text-primary-gold hover:bg-primary-gold hover:bg-opacity-10 active:scale-95',
        white: 'bg-white text-primary-dark hover:bg-opacity-90 shadow-sm active:scale-95',
      },
      size: {
        xs: 'px-3 py-1.5 text-xs rounded-sm',
        sm: 'px-4 py-2 text-sm rounded-md',
        md: 'px-6 py-3 text-base rounded-lg',
        lg: 'px-8 py-4 text-lg rounded-lg',
        xl: 'px-10 py-5 text-xl rounded-lg',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading,
      icon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({ variant, size, fullWidth, className })}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {children && <span>{children}</span>}
          </>
        ) : (
          <>
            {icon && <span className="flex items-center justify-center">{icon}</span>}
            {children}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
