import { createContext, useState, useEffect } from 'react';
import { sendRequest } from '../services/apiService';
import PropTypes from 'prop-types';

export const Context = createContext();

export const Provider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const [transactionsData, setTransactionsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const userData = await sendRequest('/user', 'GET');
        const walletData = await sendRequest('/wallet', 'GET');
        const transactionsData = await sendRequest('/transactions', 'GET');

        setUserData(userData);
        setWalletData(walletData);
        setTransactionsData(transactionsData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Context.Provider
      value={{ userData, walletData, transactionsData, loading }}
    >
      {children}
    </Context.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
