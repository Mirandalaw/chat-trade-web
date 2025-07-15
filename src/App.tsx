import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './pages/Login';
import Home from './pages/Home';
import ChatRoom from './pages/ChatRoom';
import {ResetPasswordPage} from "./pages/ResetPasswordPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <ChatProvider>
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/reset-password" element={<ResetPasswordPage  />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/" element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        } />
                        <Route path="/chat/:chatId" element={
                            <ProtectedRoute>
                                <ChatRoom />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </Router>
            </ChatProvider>
        </AuthProvider>
    );
};

export default App;