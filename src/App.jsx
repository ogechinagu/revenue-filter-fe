import { Routes, Route } from 'react-router-dom';
import { AppRoutes } from './components/routes';
import Layout from './layout';
import Home from './layout/pages/home';
import Analytics from './layout/pages/analytics';
import Revenue from './layout/pages/revenue';
import CRMPage from './layout/pages/crm';
import Apps from './layout/pages/Apps';

const App = () => {
  return (
    <Routes>
      <Route path={AppRoutes.home} element={<Layout />}>
        <Route exact element={<Home />} />
        <Route path={AppRoutes.analytics} element={<Analytics />} />
        <Route path={AppRoutes.revenue} element={<Revenue />} />
        <Route path={AppRoutes.crm} element={<CRMPage />} />
        <Route path={AppRoutes.apps} element={<Apps />} />
      </Route>
    </Routes>
  );
};

export default App;
