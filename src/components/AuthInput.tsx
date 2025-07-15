import React from 'react';

interface AuthInputProps {
    type?: string;
    placeholder?: string;
    label?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    className?: string;
}

export const AuthInput: React.FC<AuthInputProps> = ({
                                                        type = 'text',
                                                        placeholder,
                                                        label,
                                                        value,
                                                        onChange,
                                                        error,
                                                        required = false,
                                                        className = ''
                                                    }) => {
    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2BA87C] focus:ring-2 focus:ring-[#2BA87C] focus:ring-opacity-20 transition-all duration-200 ${
                    error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                }`}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
};