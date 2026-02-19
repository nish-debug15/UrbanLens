import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Splash } from './screens/Splash';
import { Login } from './screens/Login';
import { Home } from './screens/Home';
import { Capture } from './screens/Capture';
import { Preview } from './screens/Preview';
import { MapView } from './screens/MapView';
import { Reports } from './screens/Reports';
import { Analytics } from './screens/Analytics';
import { Profile } from './screens/Profile';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Splash },
      { path: 'login', Component: Login },
      { path: 'home', Component: Home },
      { path: 'capture', Component: Capture },
      { path: 'preview', Component: Preview },
      { path: 'map', Component: MapView },
      { path: 'reports', Component: Reports },
      { path: 'analytics', Component: Analytics },
      { path: 'profile', Component: Profile }
    ]
  }
]);
