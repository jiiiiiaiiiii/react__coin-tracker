import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import ToggleModeBtn from './../components/ToggleModeBtn';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: black;
  margin-bottom: 10px;
  border-radius: 15px;
  a {
    display: flex;
    align-items: center;
    padding: 20px; // link 클릭 범위 확장
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      font-weight: bold;
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);
  
  /*
	const [coins, setCoins] = useState<ICoin[]>([]);
	const [loading, setLoading] = useState(true);

	// 기본형: useEffect(() => {(async / await)()},[])
	useEffect(() => {
		(async() => {
			const response = await fetch('https://api.coinpaprika.com/v1/coins');
			const json = await response.json();
			setCoins(json.slice(0, 100));	// 앞에서부터 100개의 코인만 추출
			setLoading(false);
		})(); // 바로 실행
	}, []);	// component 최초 실행 시에만
	*/

  return (
    <Container>
      <Helmet>
        <title>Coin</title>
      </Helmet>

      <Header>
        <Title>Coin</Title>
      </Header>
      {isLoading ? (
        <Loader>Loainding...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name }, // To send 'behind the scene' data --> #Coin에서 useLocation()으로 받음
                }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
      <ToggleModeBtn />
    </Container>
  );
}

export default Coins;
