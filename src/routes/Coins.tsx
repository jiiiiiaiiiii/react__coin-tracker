import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import App from './../App';

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
	color: ${props => props.theme.bgColor};
	margin-bottom: 10px;
	border-radius: 15px;
	a {
		display: flex;
		align-items: center;
		padding: 20px;
		transition: color .2s ease-in;
	}
	&:hover {
		a {
			color: ${props => props.theme.accentColor};
		}
	}
`;

const Title = styled.h1`
font-size: 48px;
	color: ${props => props.theme.accentColor};
`;

interface CoinInterface {
	id: string,
	name: string,
	symbol: string,
	rank: number,
	is_new: boolean,
	is_active: boolean,
	type: string,
}

const Loader = styled.span`
	text-align: center;
	display: block;
`;

const Img = styled.img`
	width: 35px;
	height: 35px;
	margin-right: 10px;
`;

function Coins() {
	const [coins, setCoins] = useState<CoinInterface[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async() => {
			const response = await fetch('https://api.coinpaprika.com/v1/coins');
			const json = await response.json();
			setCoins(json.slice(0, 100));	// 앞에서부터 100개의 코인만 추출
			setLoading(false);
		})(); // 바로 실행
	}, []);	// 최초 실행 시에만

	return (
		<Container>
			<Header>
			<Title>Coin</Title>
			</Header>
			{loading 
			? <Loader>Loainding...</Loader>
			: <CoinsList>
				{coins.map(coin => 
					<Coin key={coin.id}>
						<Link to={{
							pathname: `/${coin.id}`,
							state: {name: coin.name},	// To send 'behind the scene' data --> #Coin에서 useLocation()으로 받음
							}}>
								<Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
								{coin.name} &rarr;
						</Link>
					</Coin>
				)}
			</CoinsList>}
		</Container>
	)
}

export default Coins;