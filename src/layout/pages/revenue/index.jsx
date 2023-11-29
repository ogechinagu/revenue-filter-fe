import { Box, Button, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { useContext } from 'react';
import { Context } from '../../../context/Context';
import { Info } from '../../../assets/icons/svgs';
import Transactions from './transaction';
import TransactionChart from '../../../features/chart';

const Revenue = () => {
  const { walletData } = useContext(Context);

  function formatNumber(number) {
    if (typeof number !== 'number') {
      return 'Invalid input. Please provide a number.';
    }

    const formattedNumber = number
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
    return formattedNumber;
  }

  return (
    <>
      <Box>
        <Stack direction={['column', 'row']} spacing={[8, 32]}>
          <Box w={['100%', '60%']}>
            <HStack spacing={24}>
              <Box>
                <Text fontSize='14px' color='#56616B'>
                  Available Balance
                </Text>
                <Text fontSize='36px' fontWeight={700} color='#131316'>
                  USD {walletData?.balance}
                </Text>
              </Box>
              <Button
                bg='#131316'
                color='#FFFFFF'
                py={6}
                px={12}
                borderRadius='50px'
              >
                Withdraw
              </Button>
            </HStack>
            <TransactionChart />
          </Box>
          <Box w={['100%', '40%']}>
            <HStack align='start' spacing={24} mb={6}>
              <Box w='70%'>
                <Text fontSize='14px' color='#56616B'>
                  Ledger Balance
                </Text>
                <Text fontSize='28px' fontWeight={700} color='#131316'>
                  USD {formatNumber(walletData?.ledger_balance)}
                </Text>
              </Box>
              <Icon as={Info} mt={4} />
            </HStack>
            <HStack align='start' spacing={24} mb={6}>
              <Box w='70%'>
                <Text fontSize='14px' color='#56616B'>
                  Total Payout
                </Text>
                <Text fontSize='28px' fontWeight={700} color='#131316'>
                  USD {formatNumber(walletData?.total_payout)}
                </Text>
              </Box>
              <Icon as={Info} mt={4} />
            </HStack>

            <HStack align='start' spacing={24} mb={6}>
              <Box w='70%'>
                <Text fontSize='14px' color='#56616B'>
                  Total Revenue
                </Text>
                <Text fontSize='28px' fontWeight={700} color='#131316'>
                  USD {formatNumber(walletData?.total_revenue)}
                </Text>
              </Box>
              <Icon as={Info} mt={4} />
            </HStack>

            <HStack align='start' spacing={24} mb={6}>
              <Box w='70%'>
                <Text fontSize='14px' color='#56616B'>
                  Pending Payout
                </Text>
                <Text fontSize='28px' fontWeight={700} color='#131316'>
                  USD {formatNumber(walletData?.pending_payout)}
                </Text>
              </Box>
              <Icon as={Info} mt={4} />
            </HStack>
          </Box>
        </Stack>
        <Transactions />
      </Box>
    </>
  );
};

export default Revenue;
