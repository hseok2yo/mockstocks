import { Routes, Route, Navigate } from 'react-router-dom';
import Ticker from '@/components/Ticker';
import AuthHeader from '@/components/AuthHeader';
import Hero from '@/components/Hero';
import PopularStocks from '@/components/PopularStocks';
import PersonaSection from '@/components/PersonaSection';
import StepsSection from '@/components/StepsSection';
import LivePanel from '@/components/LivePanel';
import Footer from '@/components/Footer';
import LoginPage from '@/components/LoginPage';
import SignupPage from '@/components/SignupPage';
import '@/css/App.css';
import { AuthProvider } from '@/components/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Ticker />
        <AuthHeader />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <PopularStocks />
                <PersonaSection />
                <StepsSection />
                <LivePanel />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;