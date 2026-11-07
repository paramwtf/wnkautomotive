import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  iconRight?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  loading = false,
  iconRight,
  disabled,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-mono font-normal tracking-[0.2px] transition-colors rounded-none focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'h-[38px] px-4 text-[12px] gap-2',
    md: 'h-[46px] px-5 text-[13px] gap-2.5',
    lg: 'h-[52px] px-6 text-[14px] gap-3',
  };

  const variantStyles = {
    primary: 'bg-ink text-white hover:bg-charcoal active:bg-ink border border-ink disabled:opacity-45 disabled:hover:bg-ink',
    secondary: 'bg-white text-ink border border-field hover:border-ink active:bg-surface disabled:opacity-45',
    outline: 'bg-transparent text-ink border border-ink hover:bg-ink hover:text-white disabled:opacity-45',
    ghost: 'bg-transparent text-ink hover:bg-surface disabled:opacity-45',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="inline-block size-4 border-2 border-current border-t-transparent animate-spin" />
      ) : (
        <>
          <span>{children}</span>
          {iconRight && <span className="shrink-0">{iconRight}</span>}
        </>
      )}
    </button>
  );
};

