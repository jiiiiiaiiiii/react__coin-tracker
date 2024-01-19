import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

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

function Chart({ coinId }: IChartProps) {
  // ohlcv: Open, High, Low, Close Value
  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId)
  );
  // const dataInfo = data?.map(price => Number(price.close));
  const isDark = useRecoilValue(isDarkAtom);

  const validData = data ?? [];
  const chartData = validData?.map(price => {
    return {
      x: new Date(price.time_close * 1000).toUTCString(),
      y: [price.open, price.high, price.low, price.close]
    };
  })

  return (
    <div>
      {isLoading ? (
        'Loading Chart...'
      ) : (
        <ApexChart
  type="candlestick"
  series={[
    {
      data: chartData,
    },
  ]}
  options={{
    theme: {
      mode: isDark ? 'dark' : 'light',
    },
    chart: {
      height: 500,
      width: 500,
      toolbar: {
        show: false
      },
      background: "transparent",
    },
    plotOptions: {
      candlestick: {
        wick: {
          useFillColor: true,
        },
      },
    },
    xaxis: {
      labels: {
        datetimeFormatter: {
          month: "mmm 'yy",
        },
      },
      type: "datetime",
      categories: data?.map(date => date.time_close),
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      y: {
        formatter: price => `$ ${price.toFixed(2)}`,
      },
    },
  }}
/>
      )}
    </div>
  );
}

export default Chart;

// line chart
/* <ApexChart 
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
            mode: isDark ? 'dark' : 'light',
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
        }}/> */
