import React from 'react';

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  variant?: 'solid' | 'dashed' | 'dotted';
  orientation?: 'horizontal' | 'vertical';
  thickness?: 'thin' | 'normal' | 'thick';
}

const Divider = React.forwardRef<HTMLHRElement, DividerProps>((
  {
    className = '',
    variant = 'solid',
    orientation = 'horizontal',
    thickness = 'normal',
    ...props
  },
  ref,
) => {
  const variantStyles: Record<string, string> = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };

  const thicknessStyles: Record<string, string> = {
    thin: 'border-t-1',
    normal: 'border-t-2',
    thick: 'border-t-4',
  };

  const baseStyles = `border-primary-gold border-opacity-20 ${variantStyles[variant]} ${thicknessStyles[thickness]}`;

  if (orientation === 'vertical') {
    return (
      <div
        ref={ref as any}
        className={`h-full w-px ${baseStyles.replace('border-t', 'border-l')} ${className}`}
        {...props}
      />
    );
  }

  return (
    <hr
      ref={ref}
      className={`${baseStyles} ${className}`}
      {...props}
    />
  );
});

Divider.displayName = 'Divider';

export { Divider };
