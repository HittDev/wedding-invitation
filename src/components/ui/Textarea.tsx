import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'error' | 'success';
  size?: 'sm' | 'md' | 'lg';
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((
  { className = '', variant = 'default', size = 'md', ...props },
  ref,
) => {
  const baseStyles = 'w-full font-sans text-base transition-all duration-200 ease-out border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-gold focus:ring-offset-2 disabled:bg-gray-100 disabled:cursor-not-allowed placeholder:text-neutral-dark placeholder:text-opacity-50';

  const variantStyles: Record<string, string> = {
    default: 'border-primary-gold border-opacity-30 focus:border-primary-gold',
    error: 'border-red-500 focus:border-red-600 focus:ring-red-200',
    success: 'border-green-500 focus:border-green-600 focus:ring-green-200',
  };

  const sizeStyles: Record<string, string> = {
    sm: 'px-3 py-2 text-sm min-h-20',
    md: 'px-4 py-3 text-base min-h-32',
    lg: 'px-6 py-4 text-lg min-h-40',
  };

  return (
    <textarea
      ref={ref}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export { Textarea };
