import React from 'react';
import { Check } from 'lucide-react';

interface AgreementCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    required?: boolean;
    linkText?: string;
    onLinkClick?: () => void;
}

export const AgreementCheckbox: React.FC<AgreementCheckboxProps> = ({
                                                                        checked,
                                                                        onChange,
                                                                        label,
                                                                        required = false,
                                                                        linkText,
                                                                        onLinkClick
                                                                    }) => {
    return (
        <div className="flex items-start space-x-3 mb-3">
            <div className="flex items-center h-5">
                <button
                    type="button"
                    onClick={() => onChange(!checked)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                        checked
                            ? 'bg-[#2BA87C] border-[#2BA87C]'
                            : 'border-gray-300 hover:border-[#2BA87C]'
                    }`}
                >
                    {checked && <Check className="w-3 h-3 text-white" />}
                </button>
            </div>
            <div className="flex-1">
                <label className="text-sm text-gray-700 cursor-pointer" onClick={() => onChange(!checked)}>
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {linkText && (
                    <button
                        type="button"
                        onClick={onLinkClick}
                        className="text-[#3A6F64] text-sm underline hover:text-[#2BA87C] ml-1"
                    >
                        {linkText}
                    </button>
                )}
            </div>
        </div>
    );
};