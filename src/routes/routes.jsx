import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Tasks from '../pages/Tasks';
import Archive from '../pages/Archive';
import Chat from '../pages/Chat';
import Settings from '../pages/Settings';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Tasks />,
      },
      {
        path: '/archive',
        element: <Archive />,
      },
      {
        path: '/chat',
        element: <Chat />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
]);

export default routes;
