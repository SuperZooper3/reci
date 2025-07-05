import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import FollowingPage from './pages/FollowingPage'
import RecipePage from './pages/RecipePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipes" element={<SearchPage />} />
      <Route path="/account/:id/following" element={<FollowingPage />} />
      <Route path="/recipe/:id" element={<RecipePage />} />
    </Routes>
  );
}
export default App
