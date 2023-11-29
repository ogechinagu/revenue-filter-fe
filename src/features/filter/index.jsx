import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ExpandMore } from '../../assets/icons/svgs';
import { useState } from 'react';

const Filter = ({ isOpen, onClose }) => {
  const [transactionType, setTransactionType] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(false);

  return (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose} size='sm'>
      <DrawerOverlay />
      <DrawerContent m={[0, 4]} borderRadius='20px'>
        <DrawerCloseButton />
        <DrawerHeader>Filter</DrawerHeader>

        <DrawerBody>
          <Flex justify='space-between'>
            <Button mr={1} variant='outline' borderRadius='50px'>
              Today
            </Button>
            <Button mr={1} variant='outline' borderRadius='50px'>
              Last 7 days
            </Button>
            <Button mr={1} variant='outline' borderRadius='50px'>
              This month
            </Button>
            <Button mr={1} variant='outline' borderRadius='50px'>
              Last 3 months
            </Button>
          </Flex>

          <Box my={8}>
            <Text fontWeight={600} mb={2}>
              Date Range
            </Text>
            <HStack>
              <HStack w='50%' spacing={4} bg='#EFF1F6' borderRadius='12px'>
                <input
                  type='date'
                  name='date1'
                  id='date1'
                  style={{
                    width: '80%',
                    height: '48px',
                    padding: '5px 10px',
                    background: 'transparent',
                  }}
                />
                <Icon as={ExpandMore} mr={3} />
              </HStack>

              <HStack w='50%' spacing={4} bg='#EFF1F6' borderRadius='12px'>
                <input
                  type='date'
                  name='date2'
                  id='date2'
                  style={{
                    width: '80%',
                    height: '48px',
                    padding: '5px 10px',
                    background: 'transparent',
                  }}
                />
                <Icon as={ExpandMore} mr={3} />
              </HStack>
            </HStack>
          </Box>

          <Box my={8} position='relative'>
            <Text fontWeight={600} mb={2}>
              Transaction Type
            </Text>

            <HStack
              w='100%'
              h='48px'
              spacing={4}
              bg='#EFF1F6'
              borderRadius='12px'
              onClick={() => setTransactionType(!transactionType)}
            >
              <Text w='90%'></Text>
              <Icon as={ExpandMore} mr={3} />
            </HStack>
          </Box>
          {transactionType && (
            <Box
              p={4}
              bg='#FFF'
              w='87%'
              position='absolute'
              top={['35%']}
              right='30px'
              borderRadius={12}
              boxShadow='box-shadow: 0px 6px 12px 0px #5C738314;box-shadow: 0px 4px 8px 0px #5C738314;'
              zIndex='999'
            >
              <Stack spacing={6}>
                <Checkbox
                  size='lg'
                  colorScheme='gray'
                  color='#131313'
                  defaultChecked
                >
                  Store Transactions
                </Checkbox>
                <Checkbox
                  size='lg'
                  colorScheme='gray'
                  color='#131313'
                  defaultChecked
                >
                  Get Tipped
                </Checkbox>
                <Checkbox
                  size='lg'
                  colorScheme='gray'
                  color='#131313'
                  defaultChecked
                >
                  Withdrawals
                </Checkbox>
                <Checkbox
                  size='lg'
                  colorScheme='gray'
                  color='#131313'
                  defaultChecked
                >
                  Chargebacks
                </Checkbox>
                <Checkbox
                  size='lg'
                  colorScheme='gray'
                  color='#131313'
                  defaultChecked
                >
                  Cashbacks
                </Checkbox>
                <Checkbox
                  size='lg'
                  colorScheme='gray'
                  color='#131313'
                  defaultChecked
                >
                  Refer & Earn
                </Checkbox>
              </Stack>
            </Box>
          )}

          <Box my={8}>
            <Text fontWeight={600} mb={2}>
              Transaction Status
            </Text>

            <HStack
              w='100%'
              h='48px'
              spacing={4}
              bg='#EFF1F6'
              borderRadius='12px'
              onClick={() => setTransactionStatus(!transactionStatus)}
            >
              <Text w='90%'></Text>
              <Icon as={ExpandMore} mr={3} />
            </HStack>
          </Box>
          {transactionStatus && (
            <Box
              p={4}
              bg='#FFF'
              w='87%'
              position='absolute'
              top={['47%']}
              right='30px'
              borderRadius={12}
              boxShadow='box-shadow: 0px 6px 12px 0px #5C738314;box-shadow: 0px 4px 8px 0px #5C738314;'
              zIndex='999'
            >
              <Stack spacing={6}>
                <Checkbox
                  size='lg'
                  colorScheme='gray'
                  color='#131313'
                  defaultChecked
                >
                  Successful
                </Checkbox>
                <Checkbox
                  size='lg'
                  colorScheme='gray'
                  color='#131313'
                  defaultChecked
                >
                  Pending
                </Checkbox>
                <Checkbox
                  size='lg'
                  colorScheme='gray'
                  color='#131313'
                  defaultChecked
                >
                  Failed
                </Checkbox>
              </Stack>
            </Box>
          )}
        </DrawerBody>

        <DrawerFooter>
          <Button
            w='50%'
            variant='outline'
            mr={3}
            onClick={onClose}
            borderRadius='50px'
          >
            Clear
          </Button>
          <Button w='50%' colorScheme='gray' borderRadius='50px'>
            Apply
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

Filter.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Filter;
