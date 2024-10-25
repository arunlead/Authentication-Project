import React from "react";
import { useEffect } from "react";
import FloatingShape from "./components/FloatingShape";
import { Route, Routes,Navigate } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import DashboardPage from "./pages/DashboardPage";
import LoadingSpinner from "./components/LoadingSpinner";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from "./store/authStore";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

//redirect authenticated users to that home page
const RedirectAuthenticatedUser = ({children}) => {
  const{isAuthenticated,user} = useAuthStore();

  if(isAuthenticated && user.isVerified){
    return <Navigate to="/" replace />
  }
  return children;
}


function App() {
  const {isCheckingAuth,checkAuth}=useAuthStore();
  useEffect(() => {
   checkAuth();
  },[checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;
  
  return (
    <div
  className='min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900 flex items-center justify-center relative overflow-hidden'
> 
  {/* Floating shapes with subtle and professional colors */}
  <FloatingShape color='bg-blue-700' size='w-64 h-64' top='-5%' left='10%' delay={0} />
  <FloatingShape color='bg-gray-700' size='w-48 h-48' top='70%' left='80%' delay={5} />
  <FloatingShape color='bg-blue-600' size='w-32 h-32' top='40%' left='-10%' delay={2} />


 
      <Routes>
        <Route path="/" element={<ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>} />
        <Route path="/signup" element={
          <RedirectAuthenticatedUser>
            <SignUpPage />
          </RedirectAuthenticatedUser>
          } />
        <Route path="/login" element={
          <RedirectAuthenticatedUser>
            <LoginPage />
          </RedirectAuthenticatedUser>
        } />
        <Route path='/verify-email' element={<EmailVerificationPage />} />
        <Route
					path='/forgot-password'
					element={
						<RedirectAuthenticatedUser>
							<ForgotPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>
        <Route
					path='/reset-password/:token'
					element={
						<RedirectAuthenticatedUser>
							<ResetPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>
        {/* catch all routes */}
				<Route path='*' element={<Navigate to='/' replace />} />


      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
