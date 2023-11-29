import { useContext, useState } from 'react';
import { Context } from '../../../../context/Context';
import { Box, Button, Flex, HStack, Icon, Text } from '@chakra-ui/react';
import {
  Download,
  ExpandMore,
  Inflow,
  Outflow,
} from '../../../../assets/icons/svgs';
import Filter from '../../../../features/filter';

const Transactions = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const { transactionsData } = useContext(Context);

  function toTitleCase(str) {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
      return match.toUpperCase();
    });
  }

  return (
    <Box my={12}>
      <Filter isOpen={openFilter} onClose={() => setOpenFilter(false)} />
      <Flex
        direction={['column', 'row']}
        justify={['start', 'space-between']}
        align={['start', 'center']}
      >
        <Box>
          <Text
            fontSize='24px'
            fontWeight={700}
            color='#131316'
            lineHeight={1.2}
          >
            {transactionsData?.length} Transactions
          </Text>
          <Text fontSize='14px' color='#56616B'>
            Your transactions for the last 7 days
          </Text>
        </Box>
        <Box>
          <Button
            mr={2}
            my={2}
            px={6}
            rightIcon={<ExpandMore />}
            colorScheme='gray'
            borderRadius='50px'
            onClick={() => setOpenFilter(true)}
          >
            Filter
          </Button>
          <Button
            px={[6]}
            my={2}
            rightIcon={<Download />}
            colorScheme='gray'
            borderRadius='50px'
          >
            Export list
          </Button>
        </Box>
      </Flex>
      <Box w='100%' my={6} borderBottom='1px solid #EFF1F6'></Box>
      {transactionsData?.map((item) => (
        <Flex
          key={item?.payment_reference}
          my={6}
          justify='space-between'
          align='center'
        >
          <HStack>
            <Flex
              w='48px'
              h='48px'
              borderRadius='50%'
              justify='center'
              align='center'
              bg={item?.type === 'deposit' ? '#E3FCF2' : '#F9E3E0'}
            >
              <Icon as={item?.type === 'deposit' ? Inflow : Outflow} />
            </Flex>
            <Box>
              <Text color='#131316'>
                {item?.type === 'deposit'
                  ? item?.metadata?.product_name || 'New Transaction'
                  : 'Cash Withdrawal'}
              </Text>
              <Text
                fontSize='14px'
                color={
                  item?.type === 'deposit'
                    ? '#56616B'
                    : item?.type === 'withdrawal' &&
                      item?.status === 'successful'
                    ? '#0EA163'
                    : '#A77A07'
                }
              >
                {toTitleCase(
                  item?.type === 'deposit' ? item?.metadata?.name : item?.status
                )}
              </Text>
            </Box>
          </HStack>
          <Box textAlign='right'>
            <Text color='#131316' fontWeight={700}>
              USD {item?.amount}
            </Text>
            <Text fontSize='14px' color='#56616B'>
              {item?.date}
            </Text>
          </Box>
        </Flex>
      ))}
    </Box>
  );
};

export default Transactions;
