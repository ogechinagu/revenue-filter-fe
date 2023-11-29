import { Outlet } from 'react-router-dom';
import Navbar from './navigation/navbar';
import Sidebar from './navigation/sidebar';
import { Box } from '@chakra-ui/react';

const Layout = () => {
  return (
    <Box position='relative' w='100vw' h='100vh' overflowX='hidden' zIndex={1}>
      <Navbar position='fixed' />

      <Box display='flex' overflow='auto'>
        <Box w='60px'>
          <Sidebar position='fixed' h='100%' overflow='auto' />
        </Box>
        <Box w='100%' mx={[6, 36]} mt='150px'>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
