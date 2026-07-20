import React from 'react';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>((
  { level = 1, variant, className = '', children, ...props },
  ref,
) => {
  const HeadingTag = (`h${level}` as const);
  const variantStyles: Record<number, string> = {
    1: 'text-5xl leading-tight tracking-tight',
    2: 'text-4xl leading-snug tracking-wide',
    3: 'text-3xl leading-snug tracking-wide',
    4: 'text-2xl leading-snug tracking-wide',
    5: 'text-xl leading-normal tracking-wide',
    6: 'text-lg leading-normal tracking-wide',
  };

  const baseStyles = 'font-serif font-bold text-neutral-dark';
  const sizeStyles = variantStyles[level];

  return (
    <HeadingTag
      ref={ref as any}
      className={`${baseStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {children}
    </HeadingTag>
  );
});

Heading.displayName = 'Heading';

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'body' | 'lead' | 'small' | 'muted' | 'quote';
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>((
  { variant = 'body', className = '', children, ...props },
  ref,
) => {
  const variantStyles: Record<string, string> = {
    body: 'text-base leading-relaxed',
    lead: 'text-lg leading-relaxed text-neutral-dark text-opacity-90',
    small: 'text-sm leading-normal',
    muted: 'text-sm text-neutral-dark text-opacity-60',
    quote: 'italic text-lg border-l-4 border-primary-gold pl-4 py-2',
  };

  const baseStyles = 'font-sans text-neutral-dark';
  const styleClass = variantStyles[variant];

  return (
    <p
      ref={ref}
      className={`${baseStyles} ${styleClass} ${className}`}
      {...props}
    >
      {children}
    </p>
  );
});

Text.displayName = 'Text';

interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
  required?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>((
  { htmlFor, required, className = '', children, ...props },
  ref,
) => (
  <label
    ref={ref}
    htmlFor={htmlFor}
    className={`block text-sm font-medium text-neutral-dark mb-2 ${className}`}
    {...props}
  >
    {children}
    {required && <span className="text-primary-gold ml-1">*</span>}
  </label>
));

Label.displayName = 'Label';

export { Heading, Text, Label };
