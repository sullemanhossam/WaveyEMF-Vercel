import * as Headless from '@headlessui/react';
import { clsx } from 'clsx';

const variants = {
  primary: clsx(
    'inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)]',
    'rounded-full border border-transparent bg-gray-950 shadow-md',
    'whitespace-nowrap text-base font-medium text-white',
    'data-[disabled]:bg-gray-950 data-[hover]:bg-gray-800 data-[disabled]:opacity-40',
  ),
  secondary: clsx(
    'relative inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)]',
    'rounded-full border border-transparent bg-white/15 shadow-md ring-1 ring-[#D15052]/15',
    'after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_2px_1px_#ffffff4d]',
    'whitespace-nowrap text-base font-medium text-gray-950',
    'data-[disabled]:bg-white/15 data-[hover]:bg-white/20 data-[disabled]:opacity-40',
  ),
  outline: clsx(
    'inline-flex items-center justify-center px-2 py-[calc(theme(spacing.[1.5])-1px)]',
    'rounded-lg border border-transparent shadow ring-1 ring-black/10',
    'whitespace-nowrap text-sm font-medium text-gray-950',
    'data-[disabled]:bg-transparent data-[hover]:bg-gray-50 data-[disabled]:opacity-40',
  ),
};

type ButtonProps = {
  variant?: keyof typeof variants;
  href?: string;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Button component supporting different variants and hrefs.
 * - Renders as `<button>` by default.
 * - If `href` is provided, renders as an `<a>` for links.
 */
export function Button({
  variant = 'primary',
  className,
  href,
  disabled,
  ...props
}: ButtonProps) {
  className = clsx(className, variants[variant], {
    'cursor-not-allowed opacity-40': disabled,
  });

  if (href) {
    return (
      <a
        href={href}
        className={className}
        onClick={(e) => disabled && e.preventDefault()}
        {...props}
      >
        {props.children}
      </a>
    );
  }

  return (
    <button className={className} disabled={disabled} {...props}>
      {props.children}
    </button>
  );
}
