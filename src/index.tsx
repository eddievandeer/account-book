import dva from 'dva';
// import createHistory from 'history/createHashHistory';
import {createBrowserHistory as createHistory} from 'history'
import 'antd/dist/antd.css';
import './index.css';

const app = dva({
  history: createHistory()
})

app.model(require('./model/account.ts').default)

app.router(require('./router').default)

app.start('#root')
