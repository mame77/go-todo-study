import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import StartPage from '@/pages/start/page';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ / にアクセスされたら /start にリダイレクト */}
        <Route path="/" element={<Navigate to="/start" replace />} />

        {/* ✅ /start ページ */}
        <Route path="/start" element={<StartPage />} />
      </Routes>
    </BrowserRouter>
  );
}
