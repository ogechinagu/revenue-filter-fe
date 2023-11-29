import { useContext } from 'react';
import { Context } from '../../context/Context';
import Chart from 'react-apexcharts';

const TransactionChart = () => {
  const { transactionsData } = useContext(Context);

  const dates = transactionsData?.map((transaction) => transaction.date);
  const amounts = transactionsData?.map((transaction) => transaction.amount);

  const chartOptions = {
    chart: {
      id: 'line-chart',
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: dates,
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
    },
    colors: ['#FF5403'],
    stroke: {
      width: 1,
    },
  };

  const chartSeries = [
    {
      name: 'Amount',
      data: amounts,
    },
  ];

  return (
    <div>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type='line'
        height={300}
      />
    </div>
  );
};

export default TransactionChart;
