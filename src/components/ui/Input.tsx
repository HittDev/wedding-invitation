import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'w-full px-4 py-3 font-sans text-base transition-all duration-200 ease-out border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold focus:ring-offset-2 disabled:bg-gray-100 disabled:cursor-not-allowed placeholder:text-neutral-dark placeholder:text-opacity-50',
  {
    variants: {
      variant: {
        default: 'border-primary-gold border-opacity-30 focus:border-primary-gold',
        error: 'border-red-500 focus:border-red-600 focus:ring-red-200',
        success: 'border-green-500 focus:border-green-600 focus:ring-green-200',
      },
      size: {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-6 py-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>((
  { className, variant, size, ...props },
  ref,
) => (
  <input
    ref={ref}
    className={inputVariants({ variant, size, className })}
    {...props}
  />
));

Input.displayName = 'Input';

export { Input, inputVariants };
