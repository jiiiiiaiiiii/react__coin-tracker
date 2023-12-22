import { useParams } from 'react-router-dom';

interface RouteParams {
	coinId: string
}

function Coin() {
	const { coinId } = useParams<RouteParams>();

	return (
		<div>Coin: {coinId}</div>
	)
}

export default Coin;