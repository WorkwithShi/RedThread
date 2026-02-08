import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import LoveId from './pages/LoveId';
import Confess from './pages/Confess';
import Wishlist from './pages/Wishlist';
import DirectConfession from './pages/DirectConfession';
import Compatibility from './pages/Compatibility';
import Policy from './pages/Policy';
import About from './pages/About';
import RedThread from './components/RedThread';

function App() {
  return (
    <Router>
      <RedThread />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="love-card" element={<LoveId />} />
          <Route path="confessions" element={<Confess />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="love-note" element={<DirectConfession />} />
          <Route path="compatibility" element={<Compatibility />} />
          <Route path="policy" element={<Policy />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
