import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ArrowLeft, Shield} from 'lucide-react';
import Logo from '../components/ShortLogo';
import '../styles/register-step2.css';

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    phone?: string;
}

export const RegisterStep2: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({...prev, [field]: value}));
        if (field === 'phone') {
            const digits = value.replace(/\D/g, '');
            let formatted = digits;
            if (digits.length <= 3) {
                formatted = digits;
            } else if (digits.length <= 7) {
                formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
            } else if (digits.length <= 11) {
                formatted = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
            }
            setFormData(prev => ({...prev, [field]: formatted}));
        } else {
            setFormData(prev => ({...prev, [field]: value}));
        }
        if (errors[field]) {
            setErrors(prev => ({...prev, [field]: undefined}));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = '이름을 입력해주세요.';
        }

        if (!formData.email.trim()) {
            newErrors.email = '이메일을 입력해주세요.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = '유효한 이메일 주소를 입력해주세요.';
        }

        if (!formData.password) {
            newErrors.password = '비밀번호를 입력해주세요.';
        } else if (formData.password.length < 8) {
            newErrors.password = '비밀번호는 최소 8자 이상이어야 합니다.';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = '비밀번호를 한 번 더 입력해주세요.';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = '휴대폰 번호를 입력해주세요.';
        } else if (!/^\d{10,11}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = '유효한 휴대폰 번호를 입력해주세요.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // On success, redirect to login
            navigate('/login', {
                state: {message: '회원가입이 완료되었습니다. 로그인해주세요.'}
            });
        } catch (error) {
            console.error('회원가입 실패:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-step2-container">
            <div className="register-step2-card">
                <div className="register-step2-header">
                    <div className="register-step2-logo">
                        <Logo style={{width: '4rem', height: '3.5rem'}}/>
                    </div>
                    <h1 className="register-step2-title">계정 만들기</h1>
                    <p className="register-step2-subtitle">2단계: 기본 정보를 입력하세요</p>
                </div>

                <button
                    onClick={() => navigate('/register')}
                    className="register-step2-back"
                >
                    <ArrowLeft className="register-step2-back-icon"/>
                    약관 동의로 돌아가기
                </button>

                <form onSubmit={handleSubmit} className="register-step2-form">
                    <div className="register-step2-input-group">
                        <label className="register-step2-label">
                            이름 <span className="register-step2-required">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="이름을 입력하세요"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                            className={`register-step2-input ${errors.name ? 'error' : ''}`}
                        />
                        {errors.name && (
                            <p className="register-step2-error">{errors.name}</p>
                        )}
                    </div>

                    <div className="register-step2-input-group">
                        <label className="register-step2-label">
                            이메일 주소 <span className="register-step2-required">*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="이메일을 입력하세요"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                            className={`register-step2-input ${errors.email ? 'error' : ''}`}
                        />
                        {errors.email && (
                            <p className="register-step2-error">{errors.email}</p>
                        )}
                    </div>

                    <div className="register-step2-input-group">
                        <label className="register-step2-label">
                            비밀번호 <span className="register-step2-required">*</span>
                        </label>
                        <input
                            type="password"
                            placeholder="비밀번호를 입력하세요"
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            required
                            className={`register-step2-input ${errors.password ? 'error' : ''}`}
                        />
                        {errors.password && (
                            <p className="register-step2-error">{errors.password}</p>
                        )}
                    </div>

                    <div className="register-step2-input-group">
                        <label className="register-step2-label">
                            비밀번호 확인 <span className="register-step2-required">*</span>
                        </label>
                        <input
                            type="password"
                            placeholder="비밀번호를 다시 입력하세요"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            required
                            className={`register-step2-input ${errors.confirmPassword ? 'error' : ''}`}
                        />
                        {errors.confirmPassword && (
                            <p className="register-step2-error">{errors.confirmPassword}</p>
                        )}
                    </div>

                    <div className="register-step2-input-group">
                        <label className="register-step2-label">
                            휴대폰 번호 <span className="register-step2-required">*</span>
                        </label>
                        <input
                            type="tel"
                            placeholder="휴대폰 번호를 입력하세요"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            required
                            className={`register-step2-input ${errors.phone ? 'error' : ''}`}
                        />
                        {errors.phone && (
                            <p className="register-step2-error">{errors.phone}</p>
                        )}
                    </div>

                    <div className="register-step2-verification">
                        <div className="register-step2-verification-header">
                            <Shield className="register-step2-verification-icon"/>
                            <h3 className="register-step2-verification-title">본인 인증 안내</h3>
                        </div>
                        <p className="register-step2-verification-text">
                            회원가입 완료 후 본인 인증이 진행됩니다. 보안 시스템을 통해 안전하게 처리됩니다.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="register-step2-submit"
                    >
                        {isLoading ? '계정 생성 중...' : '계정 만들기'}
                    </button>
                </form>
            </div>
        </div>
    );
};
