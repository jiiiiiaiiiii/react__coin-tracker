import styled from 'styled-components';
import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';

interface IChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

const PriceTable = styled.table`
  border-collapse: collapse;
  width: 80%;
  margin: 0 auto 100px;
`;

const PriceList = styled.thead`
  th {
    background-color: #f2f2f2;
    border: 1px solid #ddd;
    padding: 8px;
  }
`;

const Prices = styled.tbody`
td {
  border: 1px solid #ddd;
  padding: 6px;
	font-size: 10px;
}
`;

function Price({ coinId }: IChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(['price', coinId], () =>
    fetchCoinHistory(coinId)
  );

  const keys = typeof data === 'object' ? Object.keys(data?.[0]): [];
  const values = typeof data === 'object' ? Object.values(data?.[0]): [];
  
  return (
    <PriceTable>
      <PriceList>
        <tr>{keys.slice(2, 7)?.map(key => <th>{key}</th>)}</tr>
      </PriceList>
      <Prices>
        {data?.map((price, idx:number) => (
        <tr key={idx}>
          <td>{price.open}</td>
          <td>{price.high}</td>
          <td>{price.low}</td>
          <td>{price.close}</td>
          <td>{price.volume}</td>
        </tr>
        ))}
      </Prices>
        
    </PriceTable>
  );
}

export default Price;
