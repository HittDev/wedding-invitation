import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'rounded-lg bg-white transition-all duration-300 ease-out',
  {
    variants: {
      variant: {
        default: 'border border-primary-cream shadow-xs hover:shadow-md',
        elevated: 'shadow-md hover:shadow-lg',
        flat: 'bg-primary-light border border-primary-gold border-opacity-10',
        outline: 'border-2 border-primary-gold bg-transparent',
        ghost: 'bg-transparent hover:bg-primary-light',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cardVariants({ variant, padding, className })}
      {...props}
    />
  ),
);

Card.displayName = 'Card';

// Card.Header
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((
  { className, ...props },
  ref,
) => (
  <div
    ref={ref}
    className={`border-b border-primary-gold border-opacity-20 pb-4 mb-4 ${className || ''}`}
    {...props}
  />
));

CardHeader.displayName = 'CardHeader';

// Card.Title
const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>((
  { className, ...props },
  ref,
) => (
  <h2
    ref={ref}
    className={`text-2xl font-serif font-bold text-neutral-dark ${className || ''}`}
    {...props}
  />
));

CardTitle.displayName = 'CardTitle';

// Card.Description
const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>((
  { className, ...props },
  ref,
) => (
  <p
    ref={ref}
    className={`text-base text-neutral-dark text-opacity-70 ${className || ''}`}
    {...props}
  />
));

CardDescription.displayName = 'CardDescription';

// Card.Content
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((
  { className, ...props },
  ref,
) => (
  <div
    ref={ref}
    className={`${className || ''}`}
    {...props}
  />
));

CardContent.displayName = 'CardContent';

// Card.Footer
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((
  { className, ...props },
  ref,
) => (
  <div
    ref={ref}
    className={`flex items-center justify-between gap-4 border-t border-primary-gold border-opacity-20 pt-4 mt-4 ${className || ''}`}
    {...props}
  />
));

CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
};
