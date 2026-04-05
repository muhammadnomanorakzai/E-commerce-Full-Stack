import React from 'react';

const Card = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
  border = true,
  shadow = 'sm',
  ...props
}) => {
  const paddingClasses = {
    none: '',
    xs: 'p-3',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const classes = `
    bg-white rounded-xl
    ${border ? 'border border-gray-100' : ''}
    ${shadowClasses[shadow]}
    ${paddingClasses[padding]}
    ${hover ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1' : ''}
    ${className}
  `;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;