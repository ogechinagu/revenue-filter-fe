import { Routes, Route } from 'react-router-dom';
import { AppRoutes } from './utils/routes';
import Layout from './layout';
import Home from './layout/pages/home';
import Analytics from './layout/pages/analytics';
import Revenue from './layout/pages/revenue';
import CRMPage from './layout/pages/crm';
import Apps from './layout/pages/Apps';
import NotFound from './layout/pages/notfound';
import BioLink from './layout/pages/Apps/bioLink';
import Invoicing from './layout/pages/Apps/invoicing';
import Store from './layout/pages/Apps/store';
import MediaKit from './layout/pages/Apps/mediaKit';

const App = () => {
  return (
    <Routes>
      <Route path={AppRoutes.home} element={<Layout />}>
        <Route path={AppRoutes.home} element={<Home />} />
        <Route path={AppRoutes.analytics} element={<Analytics />} />
        <Route path={AppRoutes.revenue} element={<Revenue />} />
        <Route path={AppRoutes.crm} element={<CRMPage />} />
        <Route path={AppRoutes.apps} element={<Apps />}>
          <Route path={AppRoutes.bio} element={<BioLink />} />
          <Route path={AppRoutes.media} element={<MediaKit />} />
          <Route path={AppRoutes.store} element={<Store />} />
          <Route path={AppRoutes.invoicing} element={<Invoicing />} />
        </Route>
      </Route>
      <Route path={AppRoutes.notfound} element={<NotFound />} />
    </Routes>
  );
};

export default App;
