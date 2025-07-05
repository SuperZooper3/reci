import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import UserPage from './pages/UserPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipes" element={<SearchPage />} />
      <Route path="/account/:id" element={<UserPage />} />
    </Routes>
  );
}
export default App
