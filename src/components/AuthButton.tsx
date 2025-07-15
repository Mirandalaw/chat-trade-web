import React from 'react';

interface AuthButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary';
    className?: string;
    type?: 'button' | 'submit';
}

export const AuthButton: React.FC<AuthButtonProps> = ({
                                                          children,
                                                          onClick,
                                                          disabled = false,
                                                          variant = 'primary',
                                                          className = '',
                                                          type = 'button'
                                                      }) => {
    const baseStyles = 'w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
        primary: 'bg-[#2BA87C] text-white hover:bg-[#249A6F] focus:ring-2 focus:ring-[#2BA87C] focus:ring-opacity-50',
        secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50'
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
            {children}
        </button>
    );
};