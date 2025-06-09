import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';

const App = lazy(() => import('./App.jsx'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <BrowserRouter
        future={{
          v7_relativeSplatPath: true,
        }}>
        <Suspense fallback={<div className="lazy_loading">Loading App...</div>}>
          <App />
        </Suspense>
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>
);

reportWebVitals();
