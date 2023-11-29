import {
  Box,
  Center,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import {
  Chat,
  ExpandMore,
  MainstackLogo,
  MenuSVG,
  Notifications,
  Widgets,
} from '../../assets/icons/svgs';
import { AppRoutes } from '../../utils/routes';
import { Context } from '../../context/Context';
import { navItems, sideNavItems, userNavItems } from '../../../data';

const Navbar = ({ position }) => {
  const [hovered, setHovered] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { userData } = useContext(Context);

  const handleClick = (route) => {
    if (route === AppRoutes.apps) {
      setOpenDropDown(!openDropDown);
    } else {
      setOpenDropDown(false);
      navigate(route);
    }
  };

  const handleDropDownItemClick = (route) => {
    setOpenDropDown(false);
    navigate(route);
  };

  const handleMouseEnter = (name) => {
    if (name) {
      setHovered(true);
    } else {
      setHovered(false);
    }
  };

  const handleMouseLeave = (name) => {
    if (name) {
      setHovered(false);
    } else {
      setHovered(true);
    }
  };

  const initials = (firstName, lastName) => {
    if (firstName && lastName) {
      const firstInitial = firstName.charAt(0).toUpperCase();
      const lastInitial = lastName.charAt(0).toUpperCase();
      return `${firstInitial}${lastInitial}`;
    }
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      {openDropDown && location.pathname === AppRoutes.apps && (
        <Box
          p={4}
          bg='#FFF'
          position='absolute'
          top={['40%', '90px']}
          right={['30px', '30%']}
          borderRadius={12}
          boxShadow='box-shadow: 0px 6px 12px 0px #5C738314;box-shadow: 0px 4px 8px 0px #5C738314;'
          zIndex='998'
        >
          {sideNavItems?.map((item) => (
            <HStack
              key={item.name}
              px={4}
              py={2}
              my={2}
              spacing={8}
              _hover={{
                border: '1px solid #CCC',
                borderRadius: '12px',
              }}
              cursor='pointer'
              onClick={() => handleDropDownItemClick(item.route)}
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={() => handleMouseLeave(item.name)}
            >
              <Icon as={item.icon} boxSize={6} my={2} />
              <Box width='200px'>
                <Text fontWeight={600}>{item.name}</Text>
                <Text opacity={0.8}>{item.subText}</Text>
              </Box>
              <Icon
                as={ExpandMore}
                boxSize={6}
                my={2}
                transform='rotate(270deg)'
                pathcolor1={hovered ? '#1A202C' : 'white'}
              />
            </HStack>
          ))}
        </Box>
      )}

      {openMenu && (
        <Box
          p={4}
          bg='#FFF'
          position='absolute'
          top={['48%', '90px']}
          right='30px'
          borderRadius={12}
          boxShadow='box-shadow: 0px 6px 12px 0px #5C738314;box-shadow: 0px 4px 8px 0px #5C738314;'
          zIndex='999'
        >
          <HStack px={4} py={2} my={2} spacing={4}>
            <Center
              w='40px'
              h='40px'
              bgGradient='linear(to-r, #5C6670, #131316)'
              borderRadius='50%'
            >
              <Text
                bgGradient='linear(to-l, #FFFFFF, #F2F3F5)'
                bgClip='text'
                fontWeight={700}
              >
                {initials(userData?.first_name, userData?.last_name)}
              </Text>
            </Center>
            <Box>
              <Text fontSize='24px' fontWeight={700} lineHeight={1.2}>
                {userData?.first_name} {userData?.last_name}
              </Text>
              <Text fontSize='14px' color='#5C6670'>
                {userData?.email}
              </Text>
            </Box>
          </HStack>
          {userNavItems?.map((item) => (
            <HStack
              key={item.name}
              px={4}
              py={2}
              my={[1, 2]}
              spacing={4}
              cursor='pointer'
            >
              <Icon as={item.icon} boxSize={6} my={[0, 2]} />
              <Box width='200px'>
                <Text fontWeight={700}>{item.name}</Text>
              </Box>
            </HStack>
          ))}
        </Box>
      )}

      {openMobileMenu && isMobile && (
        <>
          <Stack
            bg='#FFF'
            direction={['column']}
            w='250px'
            p={4}
            position='absolute'
            top='90px'
            right='30px'
            borderRadius={12}
            boxShadow='box-shadow: 0px 6px 12px 0px #5C738314;box-shadow: 0px 4px 8px 0px #5C738314;'
            zIndex='990'
          >
            {navItems?.map((item) => (
              <HStack
                key={item.name}
                as={NavLink}
                to={item.route}
                align='center'
                px={4}
                py={2}
                bg={location.pathname === item.route ? '#000' : undefined}
                color={location.pathname === item.route ? '#FFF' : '#1A202C'}
                borderRadius='50px'
                _hover={{
                  bg: '#EFF1F6',
                  color: '#1A202C !important',
                  borderRadius: '50px',
                }}
                onClick={() => handleClick(item.route)}
              >
                <Icon as={item.icon} boxSize='20px' mr={2} />
                <Text fontWeight={600}>{item.name}</Text>
              </HStack>
            ))}
            <HStack
              as={NavLink}
              to={AppRoutes.apps}
              align='center'
              px={4}
              bg={location.pathname === AppRoutes.apps ? '#000' : undefined}
              color={location.pathname === AppRoutes.apps ? '#FFF' : '#1A202C'}
              borderRadius='50px'
              position='relative'
              _hover={{ bg: '#EFF1F6', borderRadius: '50px' }}
              onClick={() => handleClick(AppRoutes.apps)}
            >
              {openDropDown ? (
                <>
                  <HStack as='span'>
                    <Icon as={Widgets} boxSize='20px' mr={2} />
                    <Text fontWeight={600}>Apps</Text>
                    <Box h='15px' borderRight='1px solid #CCC'></Box>
                    <Text fontWeight={600}>Link to Bio</Text>
                    <Icon as={ExpandMore} boxSize='20px' fill='blue' mr={2} />
                  </HStack>
                </>
              ) : (
                <>
                  <Icon as={Widgets} boxSize='20px' mr={2} />
                  <Text fontWeight={600}>Apps</Text>
                </>
              )}
            </HStack>

            <Box w='100%' my={6} borderBottom='1px solid #EFF1F6'></Box>

            <Stack
              direction={['row']}
              spacing={6}
              align='center'
              className='user-details'
            >
              <Icon as={Notifications} boxSize='20px' cursor='pointer' />
              <Icon as={Chat} boxSize='20px' cursor='pointer' />

              <HStack
                py={2}
                px={4}
                bg='#EFF1F6'
                borderRadius={50}
                mr={3}
                onClick={() => setOpenMenu(!openMenu)}
              >
                <Center
                  w='32px'
                  h='32px'
                  bgGradient='linear(to-r, #5C6670, #131316)'
                  borderRadius='50%'
                >
                  <Text
                    bgGradient='linear(to-l, #FFFFFF, #F2F3F5)'
                    bgClip='text'
                    fontWeight={700}
                  >
                    {initials(userData?.first_name, userData?.last_name)}
                  </Text>
                </Center>
                <Icon as={MenuSVG} boxSize='25px' cursor='pointer' />
              </HStack>
            </Stack>
          </Stack>
        </>
      )}

      <Box
        w='100%'
        bg='#FFF'
        display='flex'
        align='center'
        position={position}
        zIndex={999}
      >
        <Flex
          my={4}
          w='100%'
          h='64px'
          mx={6}
          justify='space-between'
          align='center'
          borderRadius='100px'
          boxShadow='box-shadow: 0px 2px 4px 0px #2D3B430D;box-shadow: 0px 2px 6px 0px #2D3B430F;'
          zIndex={1000}
        >
          <Box className='nav-brand' pl={8}>
            <Icon as={MainstackLogo} boxSize='40px' />
          </Box>
          {isMobile ? (
            <Icon
              as={MenuSVG}
              mx={6}
              boxSize='30px'
              onClick={() => setOpenMobileMenu(!openMobileMenu)}
            />
          ) : (
            <>
              <Stack direction='row' className='nav-items'>
                {navItems?.map((item) => (
                  <HStack
                    key={item.name}
                    as={NavLink}
                    to={item.route}
                    align='center'
                    px={4}
                    py={2}
                    bg={location.pathname === item.route ? '#000' : undefined}
                    color={
                      location.pathname === item.route ? '#FFF' : '#1A202C'
                    }
                    borderRadius='50px'
                    _hover={{ bg: '#EFF1F6', borderRadius: '50px' }}
                    onClick={() => handleClick(item.route)}
                  >
                    <Icon as={item.icon} boxSize='20px' mr={2} />
                    <Text fontWeight={600}>{item.name}</Text>
                  </HStack>
                ))}
                <HStack
                  as={NavLink}
                  to={AppRoutes.apps}
                  align='center'
                  px={4}
                  bg={location.pathname === AppRoutes.apps ? '#000' : undefined}
                  color={
                    location.pathname === AppRoutes.apps ? '#FFF' : '#1A202C'
                  }
                  borderRadius='50px'
                  position='relative'
                  _hover={{ bg: '#EFF1F6', borderRadius: '50px' }}
                  onClick={() => handleClick(AppRoutes.apps)}
                >
                  {openDropDown ? (
                    <>
                      <HStack as='span'>
                        <Icon as={Widgets} boxSize='20px' mr={2} />
                        <Text fontWeight={600}>Apps</Text>
                        <Box h='15px' borderRight='1px solid #CCC'></Box>
                        <Text fontWeight={600}>Link to Bio</Text>
                        <Icon
                          as={ExpandMore}
                          boxSize='20px'
                          fill='blue'
                          mr={2}
                        />
                      </HStack>
                    </>
                  ) : (
                    <>
                      <Icon as={Widgets} boxSize='20px' mr={2} />
                      <Text fontWeight={600}>Apps</Text>
                    </>
                  )}
                </HStack>
              </Stack>
              <Stack
                direction='row'
                spacing={6}
                align='center'
                className='user-details'
              >
                <Icon as={Notifications} boxSize='20px' cursor='pointer' />
                <Icon as={Chat} boxSize='20px' cursor='pointer' />
                <HStack
                  py={2}
                  px={4}
                  bg='#EFF1F6'
                  borderRadius={50}
                  mr={3}
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  <Center
                    w='32px'
                    h='32px'
                    bgGradient='linear(to-r, #5C6670, #131316)'
                    borderRadius='50%'
                  >
                    <Text
                      bgGradient='linear(to-l, #FFFFFF, #F2F3F5)'
                      bgClip='text'
                      fontWeight={700}
                    >
                      {initials(userData?.first_name, userData?.last_name)}
                    </Text>
                  </Center>
                  <Icon as={MenuSVG} boxSize='25px' cursor='pointer' />
                </HStack>
              </Stack>
            </>
          )}
        </Flex>
      </Box>
    </>
  );
};

Navbar.propTypes = {
  position: PropTypes.string.isRequired,
};

export default Navbar;
