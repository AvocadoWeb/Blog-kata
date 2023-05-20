import ReactDOM from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './redux'
import App from './components/App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)