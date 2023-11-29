import PropTypes from 'prop-types';
import {
  Box,
  Icon,
  Tooltip,
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
        <Tooltip hasArrow key={item.name} label={item.name} placement='right'>
          <Box>
            <Icon
              as={item.icon}
              boxSize={6}
              my={2}
              filter=' grayscale(100%)'
              _hover={{
                filter: 'grayscale(0%)',
              }}
              cursor='pointer'
            />
          </Box>
        </Tooltip>
      ))}
    </VStack>
  );
};

Sidebar.propTypes = {
  position: PropTypes.string.isRequired,
};

export default Sidebar;
