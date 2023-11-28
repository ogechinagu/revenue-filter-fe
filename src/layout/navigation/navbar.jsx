import { Box, Center, Flex, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { AppRoutes } from '../../components/routes';
import {
  Chat,
  Group,
  Home,
  InsertChart,
  MainstackLogo,
  Menu,
  Notifications,
  Payments,
  Widgets,
} from '../../assets/icons/svgs';

const Navbar = () => {
  const navItems = [
    { name: 'Home', icon: Home, routes: AppRoutes.home },
    { name: 'Analytics', icon: InsertChart, routes: AppRoutes.analytics },
    { name: 'Revenue', icon: Payments, routes: AppRoutes.revenue },
    { name: 'CRM', icon: Group, routes: AppRoutes.crm },
    { name: 'Apps', icon: Widgets, routes: AppRoutes.apps },
  ];
  return (
    <>
      <Box
        m={4}
        h='64px'
        display='flex'
        align='center'
        borderRadius='100px'
        boxShadow='box-shadow: 0px 2px 4px 0px #2D3B430D;box-shadow: 0px 2px 6px 0px #2D3B430F;'
        zIndex={2}
      >
        <Flex w='100%' justify='space-between' align='center'>
          <Box className='nav-brand' pl={8}>
            <Icon as={MainstackLogo} boxSize='40px' />
          </Box>

          <Stack direction='row' className='nav-items'>
            {navItems?.map((item) => (
              <Flex
                key={item.name}
                align='center'
                px={4}
                py={2}
                cursor='pointer'
                _hover={{ bg: '#EFF1F6', borderRadius: '50px' }}
              >
                <Icon as={item.icon} boxSize='20px' mr={2} />
                <Text fontWeight={600}>{item.name}</Text>
              </Flex>
            ))}
          </Stack>
          <Stack
            direction='row'
            spacing={6}
            align='center'
            className='user-details'
          >
            <Icon as={Notifications} boxSize='20px' cursor='pointer' />
            <Icon as={Chat} boxSize='20px' cursor='pointer' />
            <HStack py={2} px={4} bg='#EFF1F6' borderRadius={50} mr={3}>
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
                  OJ
                </Text>
              </Center>
              <Icon as={Menu} boxSize='20px' />
            </HStack>
          </Stack>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
