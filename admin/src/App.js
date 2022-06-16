import { useEffect } from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './pages/Layout';
import Login from './pages/Login';
import { useSelector, useDispatch } from 'react-redux';
import Protected from './pages/Protected';
import { allOrders } from './slices/orderSlice'
import { allUsers } from './slices/userSlice'
import { usersMessages } from './slices/messageSlice'
import Orders from './pages/Orders';
import Users from './pages/Users';
import Messages from './pages/Messages';

function App() {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(allOrders())
      dispatch(allUsers())
      dispatch(usersMessages())
    }
  }, [user, dispatch])

  return (
    <div className="App">
      <Router>

        <Routes>

          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Layout user={user} />}>
            <Route
              index
              element={
                <Protected user={user}>
                  <Home />
                </Protected>
              }
            />
            <Route
              path="orders"
              element={
                <Protected user={user}>
                  <Orders />
                </Protected>
              }
            />
            <Route
              path="users"
              element={
                <Protected user={user}>
                  <Users />
                </Protected>
              }
            />
            <Route
              path="messages"
              element={
                <Protected user={user}>
                  <Messages />
                </Protected>
              }
            />
          </Route>

        </Routes>

      </Router>

      <ToastContainer position="top-right" newestOnTop />
    </div>
  );
}

export default App;
