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
  Input,
  InputGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import { ExpandMore } from '../../assets/icons/svgs';
import { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import { sendRequest } from '../../services/apiService';

const Filter = ({ isOpen, onClose }) => {
  const { transactionsData, setTransactionsData } = useContext(Context);

  const [transactionType, setTransactionType] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(false);

  const [filter, setFilter] = useState({
    status: {
      successful: false,
      pending: false,
      failed: false,
    },
    type: {
      deposit: false,
      withdrawal: false,
      storeTransactions: false,
      getTipped: false,
      chargebacks: false,
      cashbacks: false,
      refer: false,
    },
    dateRange: {
      startDate: '',
      endDate: '',
    },
  });

  const applyFilters = () => {
    const filteredData = transactionsData.filter((transaction) => {
      // Filter by transaction status
      const { status } = filter;
      if (
        (status.successful && transaction.status !== 'successful') ||
        (status.pending && transaction.status !== 'pending') ||
        (status.failed && transaction.status !== 'failed')
      ) {
        return false;
      }

      // Filter by transaction type
      const { type } = filter;
      if (
        (type.deposit && transaction.type !== 'deposit') ||
        (type.withdrawal && transaction.type !== 'withdrawal')
      ) {
        return false;
      }

      // Filter by date range
      const { startDate, endDate } = filter.dateRange;
      const transactionDate = new Date(transaction.date);

      if (startDate && endDate) {
        if (
          transactionDate < new Date(startDate) ||
          transactionDate > new Date(endDate)
        ) {
          return false;
        }
      }

      return true;
    });

    setTransactionsData(filteredData);
    onClose();
  };

  const handleCheckboxChange = (e, category, value) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [category]: {
        ...prevFilter[category],
        [value]: e.target.checked,
      },
    }));
  };

  const handleDateRange = (range) => {
    const currentDate = new Date();
    let startDate = '';
    let endDate = '';

    if (range === 'today') {
      startDate = currentDate.toISOString().split('T')[0];
      endDate = currentDate.toISOString().split('T')[0];
    } else if (range === 'last7Days') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      startDate = sevenDaysAgo.toISOString().split('T')[0];
      endDate = currentDate.toISOString().split('T')[0];
    } else if (range === 'thisMonth') {
      startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
        .toISOString()
        .split('T')[0];
      endDate = currentDate.toISOString().split('T')[0];
    } else if (range === 'last3Months') {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      startDate = threeMonthsAgo.toISOString().split('T')[0];
      endDate = currentDate.toISOString().split('T')[0];
    }

    setFilter((prevFilter) => ({
      ...prevFilter,
      dateRange: { startDate, endDate },
    }));

    document.getElementById('startDate').value = startDate;
    document.getElementById('endDate').value = endDate;
  };

  const clearFilters = () => {
    setFilter({
      status: {
        successful: false,
        pending: false,
        failed: false,
      },
      type: {
        deposit: false,
        withdrawal: false,
        storeTransactions: false,
        getTipped: false,
        chargebacks: false,
        cashbacks: false,
        refer: false,
      },
      dateRange: {
        startDate: '',
        endDate: '',
      },
    });

    // Refetch transactionsData
    const refetchTransactions = async () => {
      try {
        const updatedTransactionsData = await sendRequest(
          '/transactions',
          'GET'
        );
        setTransactionsData(updatedTransactionsData);
      } catch (error) {
        console.error('Error refetching transactions:', error.message);
      }
    };

    refetchTransactions();
  };

  const isApplyDisabled = () => {
    // Check if any filter criteria is selected
    const { status, type, dateRange } = filter;
    const { startDate, endDate } = dateRange;

    return (
      Object.values(status).every((value) => !value) &&
      Object.values(type).every((value) => !value) &&
      (!startDate || !endDate)
    );
  };

  return (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose} size='sm'>
      <DrawerOverlay />
      <DrawerContent m={[0, 4]} borderRadius='20px'>
        <DrawerCloseButton />
        <DrawerHeader>Filter</DrawerHeader>

        <DrawerBody>
          <Flex justify='space-between'>
            <Button
              mr={1}
              variant='outline'
              borderRadius='50px'
              onClick={() => handleDateRange('today')}
            >
              Today
            </Button>
            <Button
              mr={1}
              variant='outline'
              borderRadius='50px'
              onClick={() => handleDateRange('last7Days')}
            >
              Last 7 days
            </Button>
            <Button
              mr={1}
              variant='outline'
              borderRadius='50px'
              onClick={() => handleDateRange('thisMonth')}
            >
              This month
            </Button>
            <Button
              mr={1}
              variant='outline'
              borderRadius='50px'
              onClick={() => handleDateRange('last3Months')}
            >
              Last 3 months
            </Button>
          </Flex>

          <Box my={8}>
            <Text fontWeight={600} mb={2}>
              Date Range
            </Text>
            <HStack>
              <HStack w='50%' spacing={4} bg='#EFF1F6' borderRadius='12px'>
                <InputGroup width='100%' height='48px' position='relative'>
                  <Input
                    type='date'
                    name='startDate'
                    id='startDate'
                    variant='unstyled'
                    _focus={{ borderColor: 'none' }}
                    _hover={{ borderColor: 'none' }}
                    sx={{
                      padding: '5px 10px',
                      background: 'transparent',
                      border: 'none',
                      zIndex: 1,
                    }}
                  />
                </InputGroup>
              </HStack>

              <HStack w='50%' spacing={4} bg='#EFF1F6' borderRadius='12px'>
                <InputGroup width='100%' height='48px' position='relative'>
                  <Input
                    type='date'
                    name='endDate'
                    id='endDate'
                    variant='unstyled'
                    _focus={{ borderColor: 'none' }}
                    _hover={{ borderColor: 'none' }}
                    sx={{
                      padding: '5px 10px',
                      background: 'transparent',
                      border: 'none',
                      zIndex: 1,
                    }}
                  />
                </InputGroup>
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
                  isChecked={filter.type.storeTransactions}
                  onChange={(e) =>
                    handleCheckboxChange(e, 'type', 'Store Transactions')
                  }
                >
                  Store Transactions
                </Checkbox>
                <Checkbox
                  size='lg'
                  colorScheme='gray'
                  color='#131313'
                  isChecked={filter.type.deposit}
                  onChange={(e) => handleCheckboxChange(e, 'type', 'deposit')}
                >
                  Deposit
                </Checkbox>
                <Checkbox
                  size='lg'
                  colorScheme='gray'
                  color='#131313'
                  isChecked={filter.type.getTipped}
                  onChange={(e) =>
                    handleCheckboxChange(e, 'type', 'Get Tipped')
                  }
                >
                  Get Tipped
                </Checkbox>
                <Checkbox
                  size='lg'
                  colorScheme='gray'
                  color='#131313'
                  isChecked={filter.type.withdrawal}
                  onChange={(e) =>
                    handleCheckboxChange(e, 'type', 'withdrawal')
                  }
                >
                  Withdrawals
                </Checkbox>
                <Checkbox
                  size='lg'
                  colorScheme='gray'
                  color='#131313'
                  isChecked={filter.type.chargebacks}
                  onChange={(e) =>
                    handleCheckboxChange(e, 'type', 'Chargebacks')
                  }
                >
                  Chargebacks
                </Checkbox>
                <Checkbox
                  size='lg'
                  colorScheme='gray'
                  color='#131313'
                  isChecked={filter.type.cashbacks}
                  onChange={(e) => handleCheckboxChange(e, 'type', 'Cashbacks')}
                >
                  Cashbacks
                </Checkbox>
                <Checkbox
                  size='lg'
                  colorScheme='gray'
                  color='#131313'
                  isChecked={filter.type.refer}
                  onChange={(e) =>
                    handleCheckboxChange(e, 'type', 'Refer & Earn')
                  }
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
                  isChecked={filter.status.successful}
                  onChange={(e) =>
                    handleCheckboxChange(e, 'status', 'successful')
                  }
                >
                  Successful
                </Checkbox>
                <Checkbox
                  size='lg'
                  colorScheme='gray'
                  color='#131313'
                  isChecked={filter.status.pending}
                  onChange={(e) => handleCheckboxChange(e, 'status', 'pending')}
                >
                  Pending
                </Checkbox>
                <Checkbox
                  size='lg'
                  colorScheme='gray'
                  color='#131313'
                  isChecked={filter.status.failed}
                  onChange={(e) => handleCheckboxChange(e, 'status', 'failed')}
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
            borderRadius='50px'
            onClick={clearFilters}
          >
            Clear
          </Button>
          <Button
            w='50%'
            bg='#131313'
            color='#FFF'
            colorScheme='gray'
            borderRadius='50px'
            onClick={applyFilters}
            isDisabled={isApplyDisabled}
          >
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
