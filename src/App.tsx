import { BackTop } from 'antd'
import AppHeader from './components/AppHeader';
import AccountList from './routes/AccountList'
import AccountStatistic from './routes/AccountStatistic';
import BottomBar from './components/BottomBar';

function App() {
  return (
    <div className="App">
      <AppHeader>
        <AccountList></AccountList>
        <AccountStatistic></AccountStatistic>
      </AppHeader>
      <BottomBar />
      <BackTop />
    </div>
  );
}

export default App;
