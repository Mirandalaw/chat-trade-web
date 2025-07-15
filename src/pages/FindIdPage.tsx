import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCardWrapper } from '../components/AuthCardWrapper';
import { AuthInput } from '../components/AuthInput';
import { AuthButton } from '../components/AuthButton';
import { ArrowLeft, Search } from 'lucide-react';

interface FormData {
    name: string;
    phone: string;
}

export const FindIdPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        phone: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<{ found: boolean; userId?: string; message: string } | null>(null);

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (result) setResult(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.phone.trim()) {
            return;
        }

        setIsLoading(true);
        setResult(null);

        try {
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mock response - simulate found/not found
            const mockFound = formData.name.toLowerCase().includes('john') || formData.phone.includes('123');

            if (mockFound) {
                setResult({
                    found: true,
                    userId: 'user_' + Math.random().toString(36).substr(2, 9),
                    message: 'User found successfully!'
                });
            } else {
                setResult({
                    found: false,
                    message: 'No matching user found.'
                });
            }
        } catch (error) {
            setResult({
                found: false,
                message: 'An error occurred while searching. Please try again.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthCardWrapper
            title="Find Your ID"
            subtitle="Enter your information to find your account"
        >
            <div className="mb-6">
                <button
                    onClick={() => navigate('/login')}
                    className="flex items-center text-[#3A6F64] hover:text-[#2BA87C] text-sm"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to login
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <AuthInput
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                />

                <AuthInput
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                />

                <AuthButton
                    type="submit"
                    disabled={isLoading || !formData.name.trim() || !formData.phone.trim()}
                    className="mt-6"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
              <Search className="w-4 h-4 mr-2 animate-spin" />
              Searching...
            </span>
                    ) : (
                        'Find ID'
                    )}
                </AuthButton>

                {result && (
                    <div className={`p-4 rounded-lg border ${
                        result.found
                            ? 'bg-green-50 border-green-200'
                            : 'bg-red-50 border-red-200'
                    }`}>
                        <p className={`text-sm font-medium ${
                            result.found ? 'text-green-800' : 'text-red-800'
                        }`}>
                            {result.message}
                        </p>
                        {result.found && result.userId && (
                            <div className="mt-2 p-2 bg-white rounded border">
                                <p className="text-sm text-gray-700">
                                    Your ID is: <span className="font-mono font-bold">{result.userId}</span>
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {result?.found && (
                    <AuthButton
                        onClick={() => navigate('/login')}
                        variant="secondary"
                        className="mt-4"
                    >
                        Go to Login
                    </AuthButton>
                )}
            </form>
        </AuthCardWrapper>
    );
};