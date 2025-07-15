import React from 'react';

interface AuthCardWrapperProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    className?: string;
}

export const AuthCardWrapper: React.FC<AuthCardWrapperProps> = ({
                                                                    children,
                                                                    title,
                                                                    subtitle,
                                                                    className = ''
                                                                }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FAF7F2] to-[#FDFCFB] flex items-center justify-center p-4">
            <div className={`w-full max-w-md bg-white rounded-2xl shadow-xl p-8 ${className}`}>
                {title && (
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
                        {subtitle && (
                            <p className="text-gray-600 text-sm">{subtitle}</p>
                        )}
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};