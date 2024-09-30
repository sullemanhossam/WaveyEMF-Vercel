import React from 'react';
import './login.css';

export interface LoginProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the login be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Login contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Login = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: LoginProps) => {
  const mode = primary
    ? 'storybook-login--primary'
    : 'storybook-login--secondary';
  return (
    <login
      type="button"
      className={'bg-black rounded-md'}
      // style={{ backgroundColor }}
      // {...props}
    >
      {label}
    </login>
  );
};
