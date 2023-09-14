import React, { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};
export const SliderButton = ({
  className,
  children,
  disabled,
  active,
  onClick,
}: Props) => {
  const customClassName = cn('page-link', className, { active, disabled });

  return (
    <button className={customClassName} type="button" onClick={onClick}>
      {children}
    </button>
  );
};
