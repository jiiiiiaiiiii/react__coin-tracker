import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import { isDarkAtom } from './../atoms';
import { useRecoilValue } from 'recoil';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.header<{isDark: boolean}>`
  height: 10vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.isDark ? props.theme.subColor : '#2f3640'};
  color: ${props => props.isDark ? props.theme.accentColor : props.theme.subColor};
  box-shadow: 10px 8px 15px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h1`
  font-size: 55px;
  font-weight: bold;
  text-shadow: 3px 1px 5px black;
`;

const CoinsList = styled.ul`
  /* max-width: 480px; */
  max-width: 70vw;
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
`;

const Coin = styled.li`
  background-color: ${props => props.theme.subColor};
  color: ${props => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 5px 5px 12px rgba(0, 0, 0, 0.5);
  font-size: 20px;
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
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <Container>
      <Helmet>
        <title>Coin Tracker</title>
      </Helmet>
      <Header isDark={isDark}>
        <Title>Coin Tracker</Title>
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
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
      {/* <ToggleModeBtn /> */}
    </Container>
  );
}

export default Coins;
