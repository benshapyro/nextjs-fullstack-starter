import { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';

// Common props type for components with children
export interface WithChildren {
  children: ReactNode;
}

// Common props for styled components
export interface WithClassName {
  className?: string;
}

// Combined common props
export type CommonProps = WithChildren & WithClassName;

// Button variants
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';

// Button sizes
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

// Common button props
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, WithClassName {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

// Input variants
export type InputVariant = 'default' | 'filled' | 'flushed' | 'unstyled';

// Common input props
export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, WithClassName {
  variant?: InputVariant;
  isInvalid?: boolean;
  errorMessage?: string;
  label?: string;
  helperText?: string;
}

// Common textarea props
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, WithClassName {
  isInvalid?: boolean;
  errorMessage?: string;
  label?: string;
  helperText?: string;
}

// Common select props
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, WithClassName {
  isInvalid?: boolean;
  errorMessage?: string;
  label?: string;
  helperText?: string;
  options?: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
}

// Common form props
export interface FormProps extends WithChildren, WithClassName {
  onSubmit: (e: React.FormEvent) => void;
  submitLabel?: string;
  isSubmitting?: boolean;
}

// Common card props
export interface CardProps extends WithClassName {
  title?: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

// Responsive props
export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

// Common layout props
export interface FlexProps extends WithChildren, WithClassName {
  direction?: ResponsiveValue<'row' | 'column' | 'row-reverse' | 'column-reverse'>;
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  gap?: number | string;
} 