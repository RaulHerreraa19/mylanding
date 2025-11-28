import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

const App = () => (
<BrowserRouter>
    <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
</BrowserRouter>
);

export default App;
