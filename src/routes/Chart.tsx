import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';

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

interface IChartProps {
  coinId: string;
}

function Chart({coinId}:IChartProps) {
  // ohlcv: Open, High, Low, Close Value
  const {isLoading, data} = useQuery<IHistorical[]>(['ohlcv', coinId], () => fetchCoinHistory(coinId));
  const dataInfo = data && data?.map(price => Number(price.close));
  return <div>
    {isLoading 
    ? 'Loading Chart...' 
    : <ApexChart 
        type='line' 
        series={[
          {
            name: 'Price',
            data: dataInfo ?? [],
            // ??: Null 병합 연산자
            // - 앞에 오는 값이 null 또는 undefined이면 뒤에오는 값을 반환
            // null ?? true --> true / true ?? null --> true
          },
        ]}
        options={{
          theme: {
            mode: 'dark'
          },
          chart: {
            height: 300, 
            width: 500,
            background: 'transparent',
            toolbar: {
              show: false,
            }
          },
          stroke: {
            curve: 'smooth',
            width: 4,
          },
          fill: {
            type: 'gradient',
            gradient: {gradientToColors: ['#0be881'], stops: [0, 100]}, // 그라데이션 시작
          },
          colors: ['#0fbcf9'],  // 그라데이션 끝
          xaxis: {
            axisTicks: {show: false},
            axisBorder: {show: false},
            labels: {show: false},
            categories: data?.map((price) => new Date(price.time_close * 1000).toUTCString()),
          },
          yaxis: {show: false},
          tooltip: {  // 그래프에 마우스 hover 시
            y: {
              formatter: (value) => `$ ${value.toFixed(2)}`,  // 소숫점 2자리까지
            },
          }
        }}/>}
  </div>;
}

export default Chart;