import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Layout from './pages/Layout';

function App() {
  return (
    <div className="App">
      <Router>

        <Routes>

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>

        </Routes>

      </Router>

      <ToastContainer position="top-right" newestOnTop />
    </div>
  );
}

export default App;
