import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type {User, LoginCredentials, AuthContextType} from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is logged in (simulate checking localStorage/sessionStorage)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    try {
      // Simulate API call
      const mockUser: User = {
        id: 1,
        username: credentials.username,
        email: credentials.username + '@example.com',
        avatar: credentials.username.charAt(0).toUpperCase(),
        points: 300,
        joinDate: new Date().toISOString()
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = (): void => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   type ReactNode,
// } from 'react';
// import type {User, LoginCredentials, AuthContextType} from '../types';
// import {login as loginApi, logout as logoutApi} from '../apis/auth';
//
// const AuthContext = createContext<AuthContextType | undefined>(undefined);
//
// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
//
// interface AuthProviderProps {
//   children: ReactNode;
// }
//
// export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//
//   // 초기 로드 시 로그인 상태 확인
//   useEffect(() => {
//     const savedUser = localStorage.getItem('user');
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//     setIsLoading(false);
//   }, []);
//
//   const login = async (
//       credentials: LoginCredentials
//   ): Promise<{ success: boolean; error?: string }> => {
//     try {
//       const response = await loginApi(credentials.email, credentials.password);
//       const loggedInUser: User = response.data.user;
//
//       setUser(loggedInUser);
//       localStorage.setItem('user', JSON.stringify(loggedInUser));
//
//       return {success: true};
//     } catch (error: any) {
//       return {
//         success: false,
//         error: error.response?.data?.message || '로그인 실패',
//       };
//     }
//   };
//
//   const logout = async (): Promise<void> => {
//     try {
//       const refreshToken = ''; // 쿠키 기반이거나 저장 방식에 따라 추가 필요
//       await logoutApi(refreshToken);
//     } catch (error: any) {
//       // 무시하고 클라이언트 상태 정리
//     } finally {
//       setUser(null);
//       localStorage.removeItem('user');
//     }
//   };
//
//   const value: AuthContextType = {
//     user,
//     login,
//     logout,
//     isLoading,
//   };
//
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
