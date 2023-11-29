import PropTypes from 'prop-types';
import {
  Box,
  Icon,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { sideNavItems } from '../../../data';

const Sidebar = ({ position }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <VStack
      position={position}
      bg='#FFF'
      p={4}
      top='40%'
      left='20px'
      borderRadius='30px'
      display={isMobile ? 'none' : 'block'}
      boxShadow='box-shadow: 0px 6px 12px 0px #5C738314;box-shadow: 0px 4px 8px 0px #5C738314;'
      zIndex={999}
    >
      {sideNavItems?.map((item) => (
        <Box key={item.name}>
          {/* <Tooltip hasArrow label={item.name} fontSize='md' placement='right'> */}
          <Icon as={item.icon} boxSize={6} my={2} />
          {/* </Tooltip> */}
        </Box>
      ))}
    </VStack>
  );
};

Sidebar.propTypes = {
  position: PropTypes.string.isRequired,
};

export default Sidebar;
