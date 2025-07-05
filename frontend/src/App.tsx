import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import UserPage from './pages/UserPage'
import RecipePage from './pages/RecipePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipes" element={<SearchPage />} />
      <Route path="/account/:id" element={<UserPage />} />
      <Route path="/recipe/:id" element={<RecipePage />} />
    </Routes>
  );
}
export default App
