import React, { useState, type FormEvent, type ChangeEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import type { LoginCredentials } from '../types';
import '../styles/Login.css';
import ShortLogo from "../components/ShortLogo.tsx";

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: ''
  });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login, user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!credentials.username || !credentials.password) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      setIsLoading(false);
      return;
    }

    const result = await login(credentials);

    if (!result.success) {
      setError(result.error || '로그인에 실패했습니다.');
    }

    setIsLoading(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
      <div className="login-container">
        <div className="login-background">
          <div className="background-pattern"></div>
        </div>

        <div className="login-content">
          <div className="login-card">
            <div className="login-header">
              <div className="logo">
                <ShortLogo width={100} height="auto" />
                <h1>굿이즈굿</h1>
              </div>
              <p className="tagline">채팅하고, 거래하고, 아이템을 모아보세요</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {error && <div className="error-message">{error}</div>}

              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  <User size={18} />
                  아이디
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="아이디를 입력하세요"
                    required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  <Lock size={18} />
                  비밀번호
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="비밀번호를 입력하세요"
                    required
                />
              </div>

              <button
                  type="submit"
                  className="btn btn-primary btn-lg login-button"
                  disabled={isLoading}
              >
                {isLoading ? '로그인 중...' : '로그인'}
              </button>

              <div className="login-footer">
                <p>처음이신가요? <a href="#register">회원가입</a></p>
                <p><a href="#forgot">비밀번호를 잊으셨나요?</a></p>
              </div>
            </form>
          </div>

          <div className="login-features">
            <h3>GoodIsGood을 선택하는 이유</h3>
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">🔒</div>
                <div>
                  <h4>안전한 거래</h4>
                  <p>종단간 암호화 및 보안 에스크로 시스템 제공</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <div>
                  <h4>실시간 채팅</h4>
                  <p>즉시 메시지를 주고받을 수 있는 기능</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📈</div>
                <div>
                  <h4>실시간 시세</h4>
                  <p>아이템의 실시간 거래 가격을 확인할 수 있어요</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;
// import React, { useState, type FormEvent, type ChangeEvent } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { Navigate } from 'react-router-dom';
// import { User, Lock } from 'lucide-react';
// import type { LoginCredentials } from '../types';
// import '../styles/Login.css';
// import ShortLogo from "../components/ShortLogo.tsx";
//
// const Login: React.FC = () => {
//   const [credentials, setCredentials] = useState<LoginCredentials>({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState<string>('');
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const { login, user } = useAuth();
//
//   if (user) {
//     return <Navigate to="/" replace />;
//   }
//
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);
//
//     if (!credentials.email || !credentials.password) {
//       setError('아이디와 비밀번호를 모두 입력해주세요.');
//       setIsLoading(false);
//       return;
//     }
//
//     const result = await login(credentials);
//
//     if (!result.success) {
//       setError(result.error || '로그인에 실패했습니다.');
//     }
//
//     setIsLoading(false);
//   };
//
//   const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
//     setCredentials({
//       ...credentials,
//       [e.target.name]: e.target.value
//     });
//   };
//
//   return (
//       <div className="login-container">
//         <div className="login-background">
//           <div className="background-pattern"></div>
//         </div>
//
//         <div className="login-content">
//           <div className="login-card">
//             <div className="login-header">
//               <div className="logo">
//                 <ShortLogo width={100} height="auto" />
//                 <h1>굿이즈굿</h1>
//               </div>
//               <p className="tagline">채팅하고, 거래하고, 아이템을 모아보세요</p>
//             </div>
//
//             <form onSubmit={handleSubmit} className="login-form">
//               {error && <div className="error-message">{error}</div>}
//
//               <div className="form-group">
//                 <label htmlFor="username" className="form-label">
//                   <User size={18} />
//                   아이디
//                 </label>
//                 <input
//                     type="text"
//                     id="username"
//                     name="username"
//                     value={credentials.email}
//                     onChange={handleChange}
//                     className="form-input"
//                     placeholder="아이디를 입력하세요"
//                     required
//                 />
//               </div>
//
//               <div className="form-group">
//                 <label htmlFor="password" className="form-label">
//                   <Lock size={18} />
//                   비밀번호
//                 </label>
//                 <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     value={credentials.password}
//                     onChange={handleChange}
//                     className="form-input"
//                     placeholder="비밀번호를 입력하세요"
//                     required
//                 />
//               </div>
//
//               <button
//                   type="submit"
//                   className="btn btn-primary btn-lg login-button"
//                   disabled={isLoading}
//               >
//                 {isLoading ? '로그인 중...' : '로그인'}
//               </button>
//
//               <div className="login-footer">
//                 <p>처음이신가요? <a href="#register">회원가입</a></p>
//                 <p><a href="#forgot">비밀번호를 잊으셨나요?</a></p>
//               </div>
//             </form>
//           </div>
//
//           <div className="login-features">
//             <h3>GoodIsGood을 선택하는 이유</h3>
//             <div className="features-list">
//               <div className="feature-item">
//                 <div className="feature-icon">🔒</div>
//                 <div>
//                   <h4>안전한 거래</h4>
//                   <p>종단간 암호화 및 보안 에스크로 시스템 제공</p>
//                 </div>
//               </div>
//               <div className="feature-item">
//                 <div className="feature-icon">⚡</div>
//                 <div>
//                   <h4>실시간 채팅</h4>
//                   <p>즉시 메시지를 주고받을 수 있는 기능</p>
//                 </div>
//               </div>
//               <div className="feature-item">
//                 <div className="feature-icon">📈</div>
//                 <div>
//                   <h4>실시간 시세</h4>
//                   <p>아이템의 실시간 거래 가격을 확인할 수 있어요</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//   );
// };
//
// export default Login;
