import React, { useState } from 'react';
import { User, Mail, Lock } from 'lucide-react';
import '../../styles/pages/Mypages/ProfileEdit.css';

const ProfileEdit: React.FC = () => {
    const [formData, setFormData] = useState({
        nickname: '굿즈러버',
        email: 'user@example.com'
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="profile-card">
            <div className="profile-header">
                <div className="profile-icon">
                    <User size={20} color="white" />
                </div>
                <h3 className="profile-title">개인정보 수정</h3>
            </div>

            <div className="profile-form">
                <div className="profile-field">
                    <label className="profile-label">
                        닉네임
                    </label>
                    <div className="profile-input-container">
                        <User className="profile-input-icon" size={16} />
                        <input
                            type="text"
                            value={formData.nickname}
                            onChange={(e) => handleInputChange('nickname', e.target.value)}
                            className="profile-input"
                            placeholder="닉네임을 입력하세요"
                        />
                    </div>
                </div>

                <div className="profile-field">
                    <label className="profile-label">
                        이메일
                    </label>
                    <div className="profile-input-container">
                        <Mail className="profile-input-icon" size={16} />
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="profile-input"
                            placeholder="이메일을 입력하세요"
                        />
                    </div>
                </div>

                <button className="profile-password-button">
                    <Lock size={16} />
                    비밀번호 변경
                </button>

                <button className="profile-save-button">
                    변경사항 저장
                </button>
            </div>
        </div>
    );
};

export default ProfileEdit;