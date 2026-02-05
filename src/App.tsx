import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PreviousOrders from './pages/PreviousOrders.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/orders" element={<PreviousOrders />} />
        <Route path="/" element={<Navigate to="/orders" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
