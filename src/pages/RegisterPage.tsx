import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Check} from 'lucide-react';
import type {AgreementState} from '../types/auth';
import ShortLogo from "../components/ShortLogo.tsx";

const RegisterPage: React.FC = () => {
    const [agreements, setAgreements] = useState<AgreementState>({
        ageVerification: false,
        termsOfService: false,
        marketingMessages: false,
        promotionalContent: false,
    });

    const handleAgreementChange = (key: keyof AgreementState): void => {
        setAgreements(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleAgreeAll = (): void => {
        const allChecked = Object.values(agreements).every(Boolean);
        const newState = !allChecked;
        setAgreements({
            ageVerification: newState,
            termsOfService: newState,
            marketingMessages: newState,
            promotionalContent: newState,
        });
    };

    const canProceed = agreements.ageVerification && agreements.termsOfService;
    const allChecked = Object.values(agreements).every(Boolean);

    return (
        <div className="auth-page">
            <div className="auth-container">


                <div className="auth-card">
                    <div className="auth-logo">
                        <ShortLogo width={100} height="auto" />
                        <span style={{ marginTop: '0.5rem', color: '#009688', fontWeight: 600 }}>굿이즈굿</span>
                    </div>
                    <p style={{ fontSize: '1.125rem', color: '#6C757D', margin: 11, textAlign:"center"}}>채팅하고, 거래하고, 아이템을 모아보세요</p>

                    <div className="agreement-section">
                        <div className="agreement-item agree-all">
                            <label className="agreement-checkbox">
                                <input
                                    type="checkbox"
                                    checked={allChecked}
                                    onChange={handleAgreeAll}
                                />
                                <span className="checkmark">
                  {allChecked && <Check size={14}/>}
                </span>
                                <span className="agreement-text">전체 동의하기</span>
                            </label>
                        </div>

                        <div className="agreement-divider"></div>

                        <div className="agreement-item required">
                            <label className="agreement-checkbox">
                                <input
                                    type="checkbox"
                                    checked={agreements.ageVerification}
                                    onChange={() => handleAgreementChange('ageVerification')}
                                />
                                <span className="checkmark">
                  {agreements.ageVerification && <Check size={14}/>}
                </span>
                                <span className="agreement-text">
                  만 19세 이상입니다 <span className="required-mark">(필수)</span>
                </span>
                            </label>
                        </div>

                        <div className="agreement-item required">
                            <label className="agreement-checkbox">
                                <input
                                    type="checkbox"
                                    checked={agreements.termsOfService}
                                    onChange={() => handleAgreementChange('termsOfService')}
                                />
                                <span className="checkmark">
                  {agreements.termsOfService && <Check size={14}/>}
                </span>
                                <span className="agreement-text">
                  <a href="#" className="agreement-link">이용약관</a>에 동의합니다 <span className="required-mark">(필수)</span>
                </span>
                            </label>
                        </div>

                        <div className="agreement-item">
                            <label className="agreement-checkbox">
                                <input
                                    type="checkbox"
                                    checked={agreements.marketingMessages}
                                    onChange={() => handleAgreementChange('marketingMessages')}
                                />
                                <span className="checkmark">
                  {agreements.marketingMessages && <Check size={14}/>}
                </span>
                                <span className="agreement-text">
                  마케팅 정보 수신에 동의합니다 <span className="optional-mark">(선택)</span>
                </span>
                            </label>
                        </div>

                        <div className="agreement-item">
                            <label className="agreement-checkbox">
                                <input
                                    type="checkbox"
                                    checked={agreements.promotionalContent}
                                    onChange={() => handleAgreementChange('promotionalContent')}
                                />
                                <span className="checkmark">
                  {agreements.promotionalContent && <Check size={14}/>}
                </span>
                                <span className="agreement-text">
                  이벤트/프로모션 수신에 동의합니다 <span className="optional-mark">(선택)</span>
                </span>
                            </label>
                        </div>
                    </div>

                    <div className="privacy-notice">
                        회원님의 개인정보는 관련 법령에 따라 안전하게 처리됩니다.
                        <a href="#" className="privacy-link">개인정보 처리방침</a>을 확인하세요.
                    </div>

                    <Link
                        to="/register/step2"
                        className={`btn btn-primary w-full ${!canProceed ? 'disabled' : ''}`}
                        onClick={(e) => !canProceed && e.preventDefault()}
                    >
                        다음 단계로
                    </Link>

                    <div className="auth-footer">
                        이미 계정이 있으신가요? <Link to="/login" className="auth-link">로그인하기</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
