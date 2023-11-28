import { Outlet } from 'react-router-dom';
import Navbar from './navigation/navbar';
import Sidebar from './navigation/sidebar';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className='wrapper'>
        <div className='sidebar'>
          <Sidebar />
        </div>
        <div className='outlet'>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
