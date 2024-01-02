import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Coins from './routes/Coins';
import Coin from './routes/Coin';

interface ICoinsProps {
  isDark: boolean;
  toggleDark: () => void;
}

function Router({isDark, toggleDark}:ICoinsProps) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path='/:coinId'>
          <Coin isDark={isDark}/>
        </Route>
        <Route path='/'>
          <Coins toggleDark={toggleDark} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
