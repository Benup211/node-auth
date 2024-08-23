import { FC, ReactElement, useEffect } from "react";
import FloatingShape from "./components/FloatingShape";
import { Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { Toaster } from "react-hot-toast";
import { useAuthState } from "./state/authState";
import { IRedirectAuthUserProps } from "./interface/IRedirectAuthUser";
import LoadingSpinner from "./components/LoadingSpinner";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
const ProtectedRoute: FC<IRedirectAuthUserProps> = ({ children }) => {
    const {isAuthenticated, user } = useAuthState();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    if (!user.isActive) {
        return <Navigate to="/email-verification" replace />;
    }
    return <>{children}</>;
};

const RedirectAuthUser: FC<IRedirectAuthUserProps> = ({ children }) => {
    const { isAuthenticated, user } = useAuthState();
    if (isAuthenticated && user.isActive) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
};
export const App: FC = (): ReactElement => {
    const { isCheckingAuth,checkAuth} = useAuthState();
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);
    if(isCheckingAuth) return <LoadingSpinner/>
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900  flex items-center justify-center relative overflow-hidden p-2">
                <FloatingShape
                    color="bg-green-500"
                    size="w-64 h-64"
                    top="-5%"
                    left="10%"
                    delay={0}
                />
                <FloatingShape
                    color="bg-emerald-500"
                    size="w-48 h-48"
                    top="70%"
                    left="80%"
                    delay={5}
                />
                <FloatingShape
                    color="bg-line-500"
                    size="w-32 h-32"
                    top="40%"
                    left="-10%"
                    delay={2}
                />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <HomePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <RedirectAuthUser>
                                <Signup />
                            </RedirectAuthUser>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <RedirectAuthUser>
                                <Login />
                            </RedirectAuthUser>
                        }
                    />
                    <Route
                        path="/email-verification"
                        element={
                            <ProtectedRoute>
                                <EmailVerificationPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/forgot-password" element={
                        <RedirectAuthUser>
                            <ForgetPasswordPage/>
                        </RedirectAuthUser>
                    }/>
                    <Route path="/reset-password/:resetPasswordToken" element={
                        <RedirectAuthUser>
                            <ResetPasswordPage/>
                        </RedirectAuthUser>
                    }/>
                </Routes>
                <Toaster />
            </div>
        </>
    );
};
