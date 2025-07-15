import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './pages/start/page';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/start" element={<StartPage />} />
      </Routes>
    </BrowserRouter>
  );
}
