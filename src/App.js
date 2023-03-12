import Homepage from './pages/Homepage'
import Pro from './pages/Projects2'
import {Routes, Route,BrowserRouter } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<Pro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
