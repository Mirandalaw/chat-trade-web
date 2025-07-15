import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import '../styles/reset-password.css';

interface FormData {
    email: string;
    newPassword: string;
    confirmPassword: string;
}

interface FormErrors {
    email?: string;
    newPassword?: string;
    confirmPassword?: string;
}

export const ResetPasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<'email' | 'password' | 'success'>('email');
    const [formData, setFormData] = useState<FormData>({
        email: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const validateEmail = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = '이메일을 입력해주세요.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = '유효한 이메일 형식을 입력해주세요.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePassword = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.newPassword) {
            newErrors.newPassword = '새 비밀번호를 입력해주세요.';
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = '비밀번호는 최소 8자 이상이어야 합니다.';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail()) return;

        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            const emailExists = formData.email.includes('@');
            if (emailExists) {
                setStep('password');
            } else {
                setErrors({ email: '해당 이메일을 찾을 수 없습니다.' });
            }
        } catch (error) {
            setErrors({ email: '오류가 발생했습니다. 다시 시도해주세요.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validatePassword()) return;

        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setStep('success');
        } catch (error) {
            setErrors({ newPassword: '비밀번호 재설정에 실패했습니다. 다시 시도해주세요.' });
        } finally {
            setIsLoading(false);
        }
    };

    const renderEmailStep = () => (
        <form onSubmit={handleEmailSubmit} className="reset-password-form">
            <div className="reset-password-step-header">
                <Mail className="reset-password-step-icon" />
                <p className="reset-password-step-text">
                    비밀번호를 재설정하려면 이메일 주소를 입력해주세요.
                </p>
            </div>

            <div className="reset-password-input-group">
                <label className="reset-password-label">
                    이메일 주소<span className="reset-password-required">*</span>
                </label>
                <input
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className={`reset-password-input ${errors.email ? 'error' : ''}`}
                />
                {errors.email && <p className="reset-password-error">{errors.email}</p>}
            </div>

            <button type="submit" disabled={isLoading} className="reset-password-submit">
                {isLoading ? '이메일 확인 중...' : '다음'}
            </button>
        </form>
    );

    const renderPasswordStep = () => (
        <form onSubmit={handlePasswordSubmit} className="reset-password-form">
            <div className="reset-password-step-header">
                <Lock className="reset-password-step-icon" />
                <p className="reset-password-step-text">
                    이메일 인증이 완료되었습니다. 새 비밀번호를 입력해주세요.
                </p>
            </div>

            <div className="reset-password-input-group">
                <label className="reset-password-label">
                    새 비밀번호<span className="reset-password-required">*</span>
                </label>
                <input
                    type="password"
                    placeholder="새 비밀번호 입력"
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                    required
                    className={`reset-password-input ${errors.newPassword ? 'error' : ''}`}
                />
                {errors.newPassword && <p className="reset-password-error">{errors.newPassword}</p>}
            </div>

            <div className="reset-password-input-group">
                <label className="reset-password-label">
                    비밀번호 확인<span className="reset-password-required">*</span>
                </label>
                <input
                    type="password"
                    placeholder="새 비밀번호 확인"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                    className={`reset-password-input ${errors.confirmPassword ? 'error' : ''}`}
                />
                {errors.confirmPassword && <p className="reset-password-error">{errors.confirmPassword}</p>}
            </div>

            <div className="reset-password-requirements">
                <p className="reset-password-requirements-title">비밀번호 설정 기준:</p>
                <ul className="reset-password-requirements-list">
                    <li>• 최소 8자 이상</li>
                    <li>• 대/소문자 조합 권장</li>
                    <li>• 숫자 및 특수문자 포함 시 보안 강화</li>
                </ul>
            </div>

            <button type="submit" disabled={isLoading} className="reset-password-submit">
                {isLoading ? '비밀번호 재설정 중...' : '비밀번호 재설정'}
            </button>
        </form>
    );

    const renderSuccessStep = () => (
        <div className="reset-password-success">
            <div className="reset-password-success-icon-container">
                <Lock className="reset-password-success-icon" />
            </div>

            <div className="reset-password-success-content">
                <h3>비밀번호가 성공적으로 변경되었습니다!</h3>
                <p>새 비밀번호로 로그인하실 수 있습니다.</p>
            </div>

            <button onClick={() => navigate('/login')} className="reset-password-login-button">
                로그인 하러 가기
            </button>
        </div>
    );

    return (
        <div className="reset-password-container">
            <div className="reset-password-card">
                <div className="reset-password-header">
                    <h1 className="reset-password-title">비밀번호 재설정</h1>
                    <p className="reset-password-subtitle">
                        {step === 'email'
                            ? '계정 이메일을 입력해주세요.'
                            : step === 'password'
                                ? '새 비밀번호를 설정해주세요.'
                                : '비밀번호 변경 완료'}
                    </p>
                </div>

                <button
                    onClick={() => (step === 'password' ? setStep('email') : navigate('/login'))}
                    className="reset-password-back"
                >
                    <ArrowLeft className="reset-password-back-icon" />
                    {step === 'password' ? '이메일 다시 입력' : '로그인으로 돌아가기'}
                </button>

                {step === 'email' && renderEmailStep()}
                {step === 'password' && renderPasswordStep()}
                {step === 'success' && renderSuccessStep()}
            </div>
        </div>
    );
};
