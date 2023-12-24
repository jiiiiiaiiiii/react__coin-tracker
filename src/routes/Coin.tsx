import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

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

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const [loading, setLoading] = useState(true);
  const {state} = useLocation<RouteState>();  // from #Coins : Link to의 state를 받음
	// const location = useLocation();
	console.log(state.name);
	
  return (
    <Container>
      <Header>
        <Title>{state?.name || 'Loading...'}</Title>
      </Header>
      {loading ? <Loader>Loainding...</Loader> : null}
    </Container>
  );
}

export default Coin;
