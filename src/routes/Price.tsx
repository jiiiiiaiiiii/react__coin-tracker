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

const PriceContainer = styled.div``;

function Price({coinId}:IChartProps) {
  const {isLoading, data} = useQuery<IHistorical[]>(['price', coinId], () => fetchCoinHistory(coinId));

  return <PriceContainer></PriceContainer>;
}

export default Price;