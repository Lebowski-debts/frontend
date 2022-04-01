import React from 'react';

export const Circle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => (
  <div
    {...props}
    style={{
      height: 16,
      width: 16,
      borderRadius: '50%',
      backgroundColor: props.color,
      ...props.style,
    }}
  >
    {children}
  </div>
);
