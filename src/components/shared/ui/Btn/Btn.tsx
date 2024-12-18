import { FC, ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons';

// Definimos las propiedades que aceptará nuestro botón
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconType;             // Para íconos opcionales
  variant?: 'primary' | 'secondary' | 'accent';  // Variantes de estilo
  size?: 'sm' | 'md' | 'lg';   // Tamaños disponibles
  isActive?: boolean;          // Estado activo/inactivo
}

export const Button: FC<ButtonProps> = ({ 
  children,
  icon: Icon,
  variant = 'primary',
  size = 'md',
  isActive = false,
  className = '',
  ...props // resto de propiedades de botón HTML
}) => {
  // Estilos base y variantes usando Tailwind
  const baseStyles = 'flex items-center justify-center gap-2 rounded-3xl transition-all duration-300';
  
  // Estilos según variante
  const variantStyles = {
    primary: 'bg-primary hover:bg-primary-dark text-text',
    secondary: 'bg-secondary hover:bg-secondary-dark text-accent',
    accent: 'bg-accent hover:bg-accent-dark text-text'
  };

  // Estilos según tamaño
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  // Estilos para estado activo
  const activeStyles = isActive ? 'ring-2 ring-accent' : '';

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${activeStyles}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
};